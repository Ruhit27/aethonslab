import Anthropic from "@anthropic-ai/sdk";
import Groq from "groq-sdk";

/**
 * Shared "brain" for Lead Autopilot. Every channel (website form, WhatsApp,
 * on-site demo) uses the same business facts so answers stay consistent.
 * Edit BUSINESS_CONTEXT when the offer or pricing changes.
 */

export const MODEL = "claude-opus-5-5";

export const BUSINESS_CONTEXT = `You are Lead Autopilot for Aethon Lab, a small studio that builds AI automations and websites for small businesses.
Aethon Lab is based in Seri Kembangan, Kuala Lumpur, Malaysia, and works with clients remotely.

Aethon Lab's offer:
- Lead Autopilot: every inquiry from a business's website, WhatsApp or email gets an instant reply in their tone, is qualified, logged to a sheet or CRM, and followed up automatically. Live in 7 days.
- Pilot pricing for the first clients: a small one-time setup fee plus a low monthly fee, in exchange for a testimonial.
- Websites with Lead Autopilot built in, and custom automations (booking, invoicing, reporting).

Rules:
- Never quote exact prices; say pricing depends on the setup and is covered on a short call.
- Never invent clients, case studies, or results.
- If someone asks for something Aethon Lab doesn't do, say so plainly.`;

/** Tone for chat channels: WhatsApp (Meta or Twilio) and the on-site chat demo. */
export const WHATSAPP_INSTRUCTIONS = `You are chatting with someone on WhatsApp who messaged Aethon Lab.
- Write like a friendly person texting: short (1-4 sentences), no headings, no markdown, at most one emoji.
- Reply in the language the person writes in (English, Bangla, Portuguese, etc.).
- Find out what business they run and how they handle customer messages today, one question at a time.
- When they seem interested, offer a 15-minute call and ask what day suits them; a human from Aethon Lab will confirm.
- If they ask whether they're talking to a bot, say yes: this is Aethon Lab's Lead Autopilot, the same thing their customers would get.`;

export const FALLBACK_REPLY =
  "Thanks for reaching out to Aethon Lab! We've got your message and a human will reply within one business day.";

export type ChatTurn = { role: "user" | "assistant"; content: string };

/**
 * Which AI writes the replies. Claude if ANTHROPIC_API_KEY is set, otherwise
 * Groq if GROQ_API_KEY is set. Force one with AI_PROVIDER=anthropic|groq.
 */
export function activeProvider(): "anthropic" | "groq" {
  const forced = process.env.AI_PROVIDER;
  if (forced === "anthropic" || forced === "groq") return forced;
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (process.env.GROQ_API_KEY) return "groq";
  return "anthropic";
}

const GROQ_MODEL = "openai/gpt-oss-120b";

/** Fallbacks to another model if this one declines; see Claude API docs. */
const FALLBACK_OPTIONS: Pick<
  Anthropic.Beta.MessageCreateParamsNonStreaming,
  "betas" | "fallbacks"
> = {
  betas: ["server-side-fallback-2026-07-01"],
  fallbacks: "default",
};

/**
 * Multi-turn chat reply (WhatsApp and the on-site demo). Returns null when
 * the model declines or the response is unusable, so callers can send
 * FALLBACK_REPLY.
 */
export async function chatReply(
  channelInstructions: string,
  messages: ChatTurn[],
): Promise<string | null> {
  const system = `${BUSINESS_CONTEXT}\n\n${channelInstructions}`;

  if (activeProvider() === "groq") {
    const completion = await new Groq().chat.completions.create({
      model: GROQ_MODEL,
      max_completion_tokens: 2000,
      messages: [{ role: "system", content: system }, ...messages],
    });
    const choice = completion.choices[0];
    if (choice?.finish_reason !== "stop") return null;
    return choice.message.content?.trim() || null;
  }

  const response = await new Anthropic().beta.messages.create({
    model: MODEL,
    max_tokens: 2000,
    ...FALLBACK_OPTIONS,
    output_config: { effort: "low" },
    system,
    messages,
  });

  if (response.stop_reason !== "end_turn") return null;
  const text = response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("")
    .trim();
  return text || null;
}

/**
 * One-shot structured answer matching `schema` (website form qualification).
 * The schema must list every property in `required` and set
 * additionalProperties: false. Returns null on refusal or unusable output.
 */
export async function structuredReply<T>(
  instructions: string,
  userContent: string,
  schema: { [key: string]: unknown },
): Promise<T | null> {
  const system = `${BUSINESS_CONTEXT}\n\n${instructions}`;

  if (activeProvider() === "groq") {
    const completion = await new Groq().chat.completions.create({
      model: GROQ_MODEL,
      max_completion_tokens: 2000,
      messages: [
        { role: "system", content: system },
        { role: "user", content: userContent },
      ],
      response_format: {
        type: "json_schema",
        json_schema: { name: "lead_result", strict: true, schema },
      },
    });
    const choice = completion.choices[0];
    if (choice?.finish_reason !== "stop" || !choice.message.content) return null;
    return JSON.parse(choice.message.content) as T;
  }

  const response = await new Anthropic().beta.messages.create({
    model: MODEL,
    max_tokens: 2000,
    ...FALLBACK_OPTIONS,
    output_config: { effort: "low", format: { type: "json_schema", schema } },
    system,
    messages: [{ role: "user", content: userContent }],
  });

  if (response.stop_reason !== "end_turn") return null;
  const text = response.content.find((block) => block.type === "text");
  if (!text || text.type !== "text") return null;
  return JSON.parse(text.text) as T;
}

// Best-effort per-instance rate limit for public endpoints that call Claude.
export function createRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return function isLimited(key: string) {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(key, recent);
    return recent.length > max;
  };
}
