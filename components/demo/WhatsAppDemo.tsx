"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Bot, Check, CheckCheck, Send } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string; time: string };

const SUGGESTIONS = [
  "Hi, I run a dental clinic in Kuala Lumpur",
  "আমার একটা অনলাইন কাপড়ের দোকান আছে",
  "How much does it cost?",
  "Am I talking to a bot?",
];

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/**
 * The WhatsApp-style chat with Lead Autopilot. Used full-page on /demo and in
 * the floating chat popup on the landing page. `className` sets the size;
 * `headerAction` adds buttons to the right of the chat header.
 */
export function DemoChat({
  className = "",
  headerAction,
}: {
  className?: string;
  headerAction?: React.ReactNode;
}) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [draft, setDraft] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const [notice, setNotice] = React.useState<string | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Scroll only the message list, never the page around it (matters in the popup).
    const list = scrollRef.current;
    list?.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || typing) return;

    const next = [...messages, { role: "user" as const, content, time: now() }];
    setMessages(next);
    setDraft("");
    setTyping(true);
    setNotice(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      });
      const json = (await res.json()) as {
        reply?: string;
        error?: string;
        degraded?: boolean;
      };
      if (!res.ok || !json.reply) {
        setNotice(json.error ?? "Something went wrong. Try again.");
        return;
      }
      if (json.degraded) {
        setNotice("AI is offline (no API key yet), so this is the fallback reply.");
      }
      setMessages((current) => [
        ...current,
        { role: "assistant", content: json.reply!, time: now() },
      ]);
    } catch {
      setNotice("Network error. Try again.");
    } finally {
      setTyping(false);
    }
  }

  return (
    <div
      className={`flex w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b141a] text-white shadow-2xl ${className}`}
    >
      <header className="flex items-center gap-3 bg-[#202c33] px-4 py-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8082c1] text-white ring-1 ring-[#25D366]/50">
          <Bot className={`h-5 w-5 ${typing ? "animate-pulse" : ""}`} aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <div className="truncate font-medium">Aethon Lab</div>
          <div className="text-xs text-white/55">
            {typing ? "typing…" : "Lead Autopilot · usually replies instantly"}
          </div>
        </div>
        {headerAction && <div className="ml-auto flex items-center gap-1">{headerAction}</div>}
      </header>

      <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto bg-[#0b141a] px-3 py-4">
        <p className="mx-auto mb-3 max-w-xs rounded-lg bg-[#182229] px-3 py-2 text-center text-xs leading-5 text-[#e9edef]/70">
          This is the same AI your customers would talk to on WhatsApp. Say
          hi, describe a business, or ask anything.
        </p>

        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                "max-w-[85%] whitespace-pre-line rounded-lg px-3 py-2 text-[15px] leading-6 " +
                (m.role === "user" ? "bg-[#005c4b] text-[#e9edef]" : "bg-[#202c33] text-[#e9edef]")
              }
            >
              {m.content}
              <span className="ml-2 inline-flex translate-y-1 items-center gap-1 text-[11px] text-white/50">
                {m.time}
                {m.role === "user" &&
                  (i < messages.length - 1 || !typing ? (
                    <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" aria-hidden="true" />
                  ) : (
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  ))}
              </span>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-[#202c33] px-4 py-3" aria-label="Aethon Lab is typing">
              <span className="inline-flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/50 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/50 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/50" />
              </span>
            </div>
          </div>
        )}

        {messages.length === 0 && (
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border border-[#25D366]/40 px-3 py-1.5 text-sm text-[#25D366] transition-colors hover:bg-[#25D366]/10"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {notice && (
        <p role="status" className="bg-[#202c33] px-4 pt-2 text-xs text-amber-300">
          {notice}
        </p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
        className="flex items-center gap-2 bg-[#202c33] px-3 py-3"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={2000}
          placeholder="Type a message"
          aria-label="Message"
          className="min-w-0 flex-1 rounded-full bg-[#2a3942] px-4 py-2.5 text-[15px] text-[#e9edef] placeholder:text-white/40 outline-none"
        />
        <button
          type="submit"
          disabled={!draft.trim() || typing}
          aria-label="Send"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-[#073B1F] transition-opacity disabled:opacity-40"
        >
          <Send className="h-5 w-5" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}

export function WhatsAppDemo() {
  return (
    <div className="flex min-h-dvh flex-col items-center bg-[#0b141a] px-4 py-6 text-white sm:py-10">
      <div className="mb-4 flex w-full max-w-md items-center justify-between text-sm text-white/60">
        <Link href="/" className="inline-flex items-center gap-2 hover:text-white">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Aethon Lab
        </Link>
        <span>Live demo</span>
      </div>
      <DemoChat className="h-[min(760px,calc(100dvh-7rem))] max-w-md" />
    </div>
  );
}
