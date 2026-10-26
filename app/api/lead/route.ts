import Anthropic from "@anthropic-ai/sdk";
import { FALLBACK_REPLY, structuredReply } from "@/lib/autopilot";

/**
 * Lead Autopilot, running on Aethon Lab's own contact form.
 *
 * 1. Claude writes an instant reply to the visitor and qualifies the lead.
 * 2. The lead + qualification is appended to a Google Sheet via Composio
 *    (COMPOSIO_CONSUMER_KEY + LEADS_SPREADSHEET_ID), and optionally forwarded to
 *    LEAD_WEBHOOK_URL (n8n, Make, or a Google Apps Script).
 */

const FORM_INSTRUCTIONS = `A visitor has just submitted the contact form on aethonslab.com. Write the reply they will see on screen immediately:
- Address them by first name if given. Warm, direct, plain English, 60-110 words.
- Answer what they actually asked. If they describe their business, say concretely how Lead Autopilot would help it.
- End by inviting them to a 15-minute call and say a human from Aethon Lab will follow up by email within one business day.
- Mention, in one short sentence, that this reply was written by the same Autopilot they would get.

Then qualify the lead for the owner.`;

const OUTPUT_SCHEMA = {
  type: "object",
  properties: {
    reply: { type: "string", description: "Reply shown to the visitor." },
    score: {
      type: "string",
      enum: ["hot", "warm", "cold", "spam"],
      description:
        "hot = clear need and urgency, warm = interested, cold = vague or just browsing.",
    },
    summary: {
      type: "string",
      description: "One sentence for the owner: who they are and what they want.",
    },
    next_step: {
      type: "string",
      description: "Recommended next action for the owner.",
    },
  },
  required: ["reply", "score", "summary", "next_step"],
  additionalProperties: false,
};

type Lead = {
  name: string;
  email: string;
  business: string;
  message: string;
};

type Qualification = {
  reply: string;
  score: "hot" | "warm" | "cold" | "spam";
  summary: string;
  next_step: string;
};

const LIMITS = { name: 120, email: 200, business: 200, message: 3000 };

// Best-effort per-instance rate limit: 5 submissions per IP per 10 minutes.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const hits = (recentSubmissions.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS,
  );
  hits.push(now);
  recentSubmissions.set(ip, hits);
  return hits.length > RATE_MAX;
}

function parseLead(body: unknown): Lead | null {
  if (!body || typeof body !== "object") return null;
  const raw = body as Record<string, unknown>;
  const field = (key: keyof typeof LIMITS) =>
    typeof raw[key] === "string" ? (raw[key] as string).trim() : "";

  const lead = {
    name: field("name"),
    email: field("email"),
    business: field("business"),
    message: field("message"),
  };

  if (!lead.name || !lead.message) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return null;
  for (const key of Object.keys(LIMITS) as (keyof typeof LIMITS)[]) {
    if (lead[key].length > LIMITS[key]) return null;
  }
  return lead;
}

async function qualify(lead: Lead): Promise<Qualification | null> {
  return structuredReply<Qualification>(
    FORM_INSTRUCTIONS,
    `<lead>
<name>${lead.name}</name>
<email>${lead.email}</email>
<business>${lead.business || "(not given)"}</business>
<message>${lead.message}</message>
</lead>`,
    OUTPUT_SCHEMA,
  );
}

async function forwardToWebhook(lead: Lead, result: Qualification | null) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        score: result?.score ?? "unknown",
        summary: result?.summary ?? "",
        next_step: result?.next_step ?? "Reply manually - AI step failed.",
        reply_sent: result?.reply ?? FALLBACK_REPLY,
        received_at: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error("Lead webhook failed", error);
  }
}

// Composio's MCP endpoint, authenticated with the account's consumer key
// (dashboard > Settings > Sessions & API Key). It runs tools on the apps
// connected to that account, here Google Sheets.
const COMPOSIO_MCP_URL = "https://connect.composio.dev/mcp";

/**
 * Appends the lead as a row in the "Aethon Lab Leads" Google Sheet through
 * Composio. Columns: Received at, Name, Email, Business, Message, Score,
 * Summary, Next step, Reply sent.
 */
async function appendToSheet(lead: Lead, result: Qualification | null) {
  const consumerKey = process.env.COMPOSIO_CONSUMER_KEY;
  const spreadsheetId = process.env.LEADS_SPREADSHEET_ID;
  if (!consumerKey || !spreadsheetId) {
    console.warn(
      "Lead not saved to Google Sheet: set COMPOSIO_CONSUMER_KEY and LEADS_SPREADSHEET_ID in .env.local",
    );
    return;
  }

  // "2026-10-26 16:59:20" in the sheet's time zone, which Sheets reads as a
  // real date and shows with the column's date format.
  const receivedAt = new Intl.DateTimeFormat("sv-SE", {
    timeZone: process.env.LEADS_TIMEZONE || "Asia/Dhaka",
    dateStyle: "short",
    timeStyle: "medium",
  }).format(new Date());

  // A leading apostrophe keeps text literal, so a visitor typing "=..." can't
  // inject a formula and numbers or dates they type aren't reinterpreted.
  const asText = (value: string) => (value ? `'${value}` : "");

  const row = [
    receivedAt,
    asText(lead.name),
    asText(lead.email),
    asText(lead.business),
    asText(lead.message),
    result?.score ?? "unknown",
    asText(result?.summary ?? ""),
    asText(result?.next_step ?? "Reply manually - AI step failed."),
    asText(result?.reply ?? FALLBACK_REPLY),
  ];

  try {
    const res = await fetch(COMPOSIO_MCP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
        "x-consumer-api-key": consumerKey,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: {
          name: "COMPOSIO_MULTI_EXECUTE_TOOL",
          arguments: {
            sync_response_to_workbench: false,
            tools: [
              {
                tool_slug: "GOOGLESHEETS_SPREADSHEETS_VALUES_APPEND",
                arguments: {
                  spreadsheetId,
                  range: "Sheet1!A:I",
                  valueInputOption: "USER_ENTERED",
                  // Fill the next empty row, which already carries the
                  // sheet's formatting (wrapping, date format, score colours).
                  insertDataOption: "OVERWRITE",
                  values: [row],
                },
              },
            ],
          },
        },
      }),
    });

    // The endpoint answers as a server-sent event: "data: {json-rpc response}".
    const raw = await res.text();
    const payload = raw
      .split("\n")
      .find((line) => line.startsWith("data: "))
      ?.slice("data: ".length);
    const rpc = payload ? JSON.parse(payload) : null;
    const text: string | undefined = rpc?.result?.content?.[0]?.text;
    const outcome = text ? JSON.parse(text) : null;

    if (!res.ok || rpc?.result?.isError || !outcome?.successful || outcome.data?.error_count) {
      console.error("Lead sheet append failed", res.status, rpc?.error ?? text ?? raw.slice(0, 500));
    }
  } catch (error) {
    console.error("Lead sheet append failed", error);
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many messages. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if ((body as Record<string, unknown>)?.website) {
    return Response.json({ reply: FALLBACK_REPLY });
  }

  const lead = parseLead(body);
  if (!lead) {
    return Response.json(
      { error: "Please add your name, a valid email, and a message." },
      { status: 400 },
    );
  }

  let result: Qualification | null = null;
  try {
    result = await qualify(lead);
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      console.error(`Claude API error ${error.status}:`, error.message);
    } else {
      console.error("Lead qualification failed", error);
    }
  }

  await Promise.all([forwardToWebhook(lead, result), appendToSheet(lead, result)]);

  const reply = result && result.score !== "spam" ? result.reply : FALLBACK_REPLY;
  return Response.json({ reply });
}
