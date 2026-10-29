import Anthropic from "@anthropic-ai/sdk";
import {
  FALLBACK_REPLY,
  CHAT_INSTRUCTIONS,
  chatReply,
  createRateLimiter,
  type ChatTurn,
} from "@/lib/autopilot";

/**
 * Backs the on-site chat (the "Ask us anything" widget and /demo). The browser
 * keeps the conversation and sends it each turn.
 */

const MAX_TURNS = 20;
const MAX_CHARS = 2000;
const isRateLimited = createRateLimiter(30, 10 * 60 * 1000);

function parseHistory(body: unknown): ChatTurn[] | null {
  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const messages = raw.slice(-MAX_TURNS).flatMap((m) => {
    const role = (m as { role?: unknown })?.role;
    const content = (m as { content?: unknown })?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return [];
    const text = content.trim().slice(0, MAX_CHARS);
    return text ? [{ role, content: text } as ChatTurn] : [];
  });

  // The API needs the conversation to start with the user and end with them.
  while (messages[0]?.role === "assistant") messages.shift();
  if (messages.at(-1)?.role !== "user") return null;
  return messages;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (isRateLimited(ip)) {
    return Response.json(
      { error: "You're sending messages quickly. Try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = parseHistory(body);
  if (!messages) {
    return Response.json({ error: "Send a message first." }, { status: 400 });
  }

  try {
    const reply = await chatReply(CHAT_INSTRUCTIONS, messages);
    return Response.json({ reply: reply ?? FALLBACK_REPLY });
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      console.error(`Claude API error ${error.status}:`, error.message);
    } else {
      console.error("Chat demo failed", error);
    }
    return Response.json({ reply: FALLBACK_REPLY, degraded: true });
  }
}
