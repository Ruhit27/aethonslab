import { createHmac, timingSafeEqual } from "node:crypto";
import Anthropic from "@anthropic-ai/sdk";
import { FALLBACK_REPLY, WHATSAPP_INSTRUCTIONS, chatReply, type ChatTurn } from "@/lib/autopilot";

/**
 * Lead Autopilot on WhatsApp through the Twilio Sandbox, a quick way to test
 * on a real phone without Meta's test number. Twilio posts each incoming
 * message here and sends whatever TwiML we return as the reply.
 *
 * Env:
 *   TWILIO_AUTH_TOKEN    Twilio Console > Account info > Auth token
 *   TWILIO_WEBHOOK_URL   the exact public URL set in the sandbox's
 *                        "When a message comes in" field
 */

const HISTORY_LIMIT = 12;
// In-memory: resets on restart, fine for a sandbox test.
const conversations = new Map<string, ChatTurn[]>();

/** Twilio's signature: HMAC-SHA1 of URL + sorted key/value pairs, base64. */
function isFromTwilio(params: URLSearchParams, signature: string | null) {
  const token = process.env.TWILIO_AUTH_TOKEN;
  const url = process.env.TWILIO_WEBHOOK_URL;
  if (!token || !url || !signature) return false;

  const data = [...params.keys()]
    .sort()
    .reduce((acc, key) => acc + key + params.get(key), url);
  const expected = createHmac("sha1", token).update(data).digest("base64");
  if (expected.length !== signature.length) return false;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

function escapeXml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function twiml(message: string) {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escapeXml(message)}</Message></Response>`,
    { headers: { "Content-Type": "text/xml" } },
  );
}

export async function POST(request: Request) {
  const params = new URLSearchParams(await request.text());

  if (!isFromTwilio(params, request.headers.get("x-twilio-signature"))) {
    return new Response("Invalid signature", { status: 401 });
  }

  const from = params.get("From") ?? "";
  const body = (params.get("Body") ?? "").trim();
  if (!body) {
    return twiml("Thanks! I can only read text messages for now. Could you type your question?");
  }

  const history = conversations.get(from) ?? [];
  history.push({ role: "user", content: body.slice(0, 3000) });

  let reply: string | null = null;
  try {
    reply = await chatReply(WHATSAPP_INSTRUCTIONS, history);
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      console.error(`Claude API error ${error.status}:`, error.message);
    } else {
      console.error("Twilio WhatsApp reply failed", error);
    }
  }

  const text = reply ?? FALLBACK_REPLY;
  history.push({ role: "assistant", content: text });
  conversations.set(from, history.slice(-HISTORY_LIMIT));

  return twiml(text);
}
