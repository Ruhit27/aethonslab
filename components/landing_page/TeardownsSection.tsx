"use client";

import * as React from "react";
import { Check, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "./SectionShell";
import { TEARDOWNS } from "./content";

type Status = "idle" | "sending" | "done" | "error";

/**
 * Newsletter signup. Goes through /api/lead (which needs a name and message),
 * so the subscription lands in the same leads sheet, tagged by its message.
 */
export function TeardownsSection() {
  const [status, setStatus] = React.useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Teardowns subscriber",
          email,
          business: "",
          message: "Newsletter signup: subscribe me to the automation teardowns.",
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal grid gap-10 rounded-3xl border border-border bg-surface-2 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <Eyebrow>Free teardowns</Eyebrow>
            <h2 className="text-display mt-4 text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
              {TEARDOWNS.title}
            </h2>
            <p className="mt-4 text-muted-foreground">{TEARDOWNS.body}</p>
          </div>

          <div>
            {status === "done" ? (
              <p className="flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-300">
                <Check className="h-4 w-4" aria-hidden="true" />
                You&apos;re on the list. The next teardown lands in your inbox.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="teardowns-email">
                  Work email
                </label>
                <input
                  id="teardowns-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="h-12 flex-1 rounded-full border border-input bg-surface-1 px-5 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
                />
                <Button type="submit" size="lg" disabled={status === "sending"} className="shrink-0 whitespace-nowrap">
                  {status === "sending" && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
                  {TEARDOWNS.cta}
                </Button>
              </form>
            )}
            {status === "error" && (
              <p role="alert" className="mt-3 text-sm text-red-300">
                Something went wrong. Please try again.
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Built with
              </span>
              {TEARDOWNS.tools.map((tool) => (
                <span key={tool} className="text-display text-sm font-semibold text-foreground/60">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
