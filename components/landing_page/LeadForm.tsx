"use client";

import * as React from "react";
import { Bot, LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status =
  | { kind: "idle" }
  | { kind: "sending"; startedAt: number }
  | { kind: "replied"; reply: string; seconds: number }
  | { kind: "error"; message: string };

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-base text-white placeholder:text-white/35 outline-none transition-colors focus:border-primary/60 focus:bg-white/6";

export function LeadForm() {
  const [status, setStatus] = React.useState<Status>({ kind: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const startedAt = Date.now();
    setStatus({ kind: "sending", startedAt });

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok || !json.reply) {
        setStatus({
          kind: "error",
          message: json.error ?? "Something went wrong. Please email us instead.",
        });
        return;
      }
      setStatus({
        kind: "replied",
        reply: json.reply,
        seconds: Math.max(1, Math.round((Date.now() - startedAt) / 1000)),
      });
      form.reset();
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Please email us instead.",
      });
    }
  }

  if (status.kind === "replied") {
    return (
      <div className="rounded-4xl border border-white/10 bg-white/4 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-mono text-[11px] uppercase tracking-[0.24em] text-white/55">
          <span className="inline-flex items-center gap-2 text-primary">
            <Bot className="h-4 w-4" aria-hidden="true" /> Lead Autopilot
          </span>
          <span>Replied in {status.seconds}s</span>
        </div>
        <p className="mt-6 whitespace-pre-line text-lg leading-8 text-white/85">
          {status.reply}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-8 rounded-full border-white/12 bg-white/5 text-white hover:bg-white/10"
          onClick={() => setStatus({ kind: "idle" })}
        >
          Send another message
        </Button>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-4xl border border-white/10 bg-white/3 p-6 sm:grid-cols-2 sm:p-8"
    >
      <label className="grid gap-2 text-sm text-white/60">
        Name
        <input name="name" required maxLength={120} autoComplete="name" className={inputClass} placeholder="Your name" />
      </label>
      <label className="grid gap-2 text-sm text-white/60">
        Email
        <input name="email" type="email" required maxLength={200} autoComplete="email" className={inputClass} placeholder="you@business.com" />
      </label>
      <label className="grid gap-2 text-sm text-white/60 sm:col-span-2">
        Business (optional)
        <input name="business" maxLength={200} autoComplete="organization" className={inputClass} placeholder="e.g. Dental clinic in Lisbon" />
      </label>
      <label className="grid gap-2 text-sm text-white/60 sm:col-span-2">
        Message
        <textarea
          name="message"
          required
          maxLength={3000}
          rows={4}
          className={inputClass}
          placeholder="How do you handle customer inquiries today? What would you like automated?"
        />
      </label>
      {/* Honeypot for bots; hidden from people and screen readers. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button
          type="submit"
          size="lg"
          disabled={sending}
          className="rounded-full bg-primary text-black hover:bg-primary/90"
        >
          {sending ? (
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
          {sending ? "Autopilot is replying..." : "Send and watch it reply"}
        </Button>
        {status.kind === "error" && (
          <p role="alert" className="text-sm text-red-300">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
