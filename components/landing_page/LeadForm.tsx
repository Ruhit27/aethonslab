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
  "w-full rounded-2xl border border-input bg-surface-1 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-primary/60";

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

  return (
    <div className="relative">
      {status.kind === "replied" ? (
        <RepliedCard status={status} onReset={() => setStatus({ kind: "idle" })} />
      ) : (
        <form
          onSubmit={onSubmit}
          className="grid gap-4 rounded-3xl border border-border bg-surface-2 p-6 sm:grid-cols-2 sm:p-8"
        >
          <FormFields
            sending={status.kind === "sending"}
            error={status.kind === "error" ? status.message : null}
          />
        </form>
      )}
    </div>
  );
}

function RepliedCard({
  status,
  onReset,
}: {
  status: Extract<Status, { kind: "replied" }>;
  onReset: () => void;
}) {
  return (
    <div className="rounded-3xl border border-border bg-surface-2 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        <span className="inline-flex items-center gap-2 text-indigo-400">
          <Bot className="h-4 w-4" aria-hidden="true" /> Lead Autopilot
        </span>
        <span>Replied in {status.seconds}s</span>
      </div>
      <p className="mt-6 whitespace-pre-line text-lg leading-8 text-foreground/85">
        {status.reply}
      </p>
      <Button
        variant="outline"
        size="sm"
        className="mt-8"
        onClick={onReset}
      >
        Send another message
      </Button>
    </div>
  );
}

function FormFields({ sending, error }: { sending: boolean; error: string | null }) {
  return (
    <>
      <label className="grid gap-2 text-sm text-muted-foreground">
        Name
        <input name="name" required maxLength={120} autoComplete="name" className={inputClass} placeholder="Your name" />
      </label>
      <label className="grid gap-2 text-sm text-muted-foreground">
        Email
        <input name="email" type="email" required maxLength={200} autoComplete="email" className={inputClass} placeholder="you@business.com" />
      </label>
      <label className="grid gap-2 text-sm text-muted-foreground sm:col-span-2">
        Business (optional)
        <input name="business" maxLength={200} autoComplete="organization" className={inputClass} placeholder="e.g. 20-person logistics company" />
      </label>
      <label className="grid gap-2 text-sm text-muted-foreground sm:col-span-2">
        Message
        <textarea
          name="message"
          required
          maxLength={3000}
          rows={4}
          className={inputClass}
          placeholder="Which task eats most of your team's week? What would you like automated?"
        />
      </label>
      {/* Honeypot for bots; hidden from people and screen readers. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button
          type="submit"
          size="lg"
          disabled={sending}
        >
          {sending ? (
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
          {sending ? "Our agent is replying..." : "Send and get an instant reply"}
        </Button>
        {error && (
          <p role="alert" className="text-sm text-red-300">
            {error}
          </p>
        )}
      </div>
    </>
  );
}
