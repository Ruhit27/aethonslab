import { createHmac, timingSafeEqual } from "node:crypto";
import { after } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { FALLBACK_REPLY, WHATSAPP_INSTRUCTIONS, chatReply, type ChatTurn } from "@/lib/autopilot";

/**
 * Lead Autopilot on WhatsApp (WhatsApp Business Platform / Cloud API).
 *
 * Meta calls this webhook for every incoming message. We answer 200
 * immediately, then ask Claude for a reply and send it back through the
 * Cloud API. Setup steps: docs/whatsapp-setup.md
 *
 * Env:
 *   WHATSAPP_VERIFY_TOKEN     any random string, also pasted into Meta's webhook settings
 *   WHATSAPP_APP_SECRET       Meta app secret, used to check requests really come from Meta
 *   WHATSAPP_ACCESS_TOKEN     system-user (or temporary) access token
 *   WHATSAPP_PHONE_NUMBER_ID  ID of the business number, from WhatsApp > API Setup
 */

const GRAPH_URL = "https://graph.facebook.com/v26.0";


// In-memory state. Resets on restart and isn't shared between server
// instances; fine for a demo, swap for a database before real client use.
const HISTORY_LIMIT = 12;
const conversations = new Map<string, ChatTurn[]>();
const seenMessageIds = new Set<string>();

type IncomingMessage = {
  from: string;
  id: string;
  type: string;
  text?: { body: string };
};

type WebhookBody = {
  object?: string;
  entry?: {
    changes?: {
      field?: string;
      value?: { messages?: IncomingMessage[] };
    }[];
  }[];
};

/** Meta's one-time webhook verification handshake. */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (
    verifyToken &&
    params.get("hub.mode") === "subscribe" &&
    params.get("hub.verify_token") === verifyToken
  ) {
    return new Response(params.get("hub.challenge") ?? "", { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

export async function POST(request: Request) {
  const rawBody = await request.text();

  if (!isFromMeta(rawBody, request.headers.get("x-hub-signature-256"))) {
    return new Response("Invalid signature", { status: 401 });
  }

  let body: WebhookBody;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const messages =
    body.entry?.flatMap(
      (entry) =>
        entry.changes?.flatMap((change) =>
          change.field === "messages" ? (change.value?.messages ?? []) : [],
        ) ?? [],
    ) ?? [];

  // Reply after acknowledging, so Meta doesn't time out and retry.
  after(async () => {
    for (const message of messages) {
      if (seenMessageIds.has(message.id)) continue;
      if (seenMessageIds.size > 1000) seenMessageIds.clear();
      seenMessageIds.add(message.id);
      await handleMessage(message);
    }
  });

  return new Response("OK", { status: 200 });
}

function isFromMeta(rawBody: string, signatureHeader: string | null) {
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (!secret || !signatureHeader?.startsWith("sha256=")) return false;

  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const received = signatureHeader.slice("sha256=".length);
  if (received.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(received), Buffer.from(expected));
}

async function handleMessage(message: IncomingMessage) {
  if (message.type !== "text" || !message.text?.body) {
    await sendText(
      message.from,
      "Thanks! I can only read text messages for now. Could you type your question?",
    );
    return;
  }

  const history = conversations.get(message.from) ?? [];
  history.push({ role: "user", content: message.text.body.slice(0, 3000) });

  let reply: string | null = null;
  try {
    reply = await chatReply(WHATSAPP_INSTRUCTIONS, history);
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      console.error(`Claude API error ${error.status}:`, error.message);
    } else {
      console.error("WhatsApp reply failed", error);
    }
  }

  const text = reply ?? FALLBACK_REPLY;
  history.push({ role: "assistant", content: text });
  conversations.set(message.from, history.slice(-HISTORY_LIMIT));

  await sendText(message.from, text);
}

async function sendText(to: string, body: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId) {
    console.error("WhatsApp is not configured: missing access token or phone number ID");
    return;
  }

  const res = await fetch(`${GRAPH_URL}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: `+${to.replace(/^\+/, "")}`,
      type: "text",
      text: { preview_url: false, body },
    }),
  });

  if (!res.ok) {
    console.error("WhatsApp send failed", res.status, await res.text());
  }
}
