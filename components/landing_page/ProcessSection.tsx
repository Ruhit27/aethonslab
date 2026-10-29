"use client";

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionShell } from "./SectionShell";
import { BOOK_HREF, PROCESS } from "./content";

export function ProcessSection() {
  const [active, setActive] = React.useState(0);
  const step = PROCESS[active];

  return (
    <SectionShell
      id="process"
      eyebrow="How we work"
      title="From first call to running in production."
      summary="Four steps, with clear deliverables at each one. You always know what's next."
    >
      <div className="reveal grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div role="tablist" aria-label="Process steps" className="flex flex-col gap-2">
          {PROCESS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              id={`process-tab-${s.id}`}
              aria-selected={i === active}
              aria-controls="process-panel"
              onClick={() => setActive(i)}
              className={cn(
                "flex items-center gap-5 rounded-2xl border p-5 text-left transition-colors",
                i === active
                  ? "border-primary/40 bg-primary/10"
                  : "border-border bg-surface-2 hover:bg-surface-3",
              )}
            >
              <span
                className={cn(
                  "text-display text-3xl font-bold tracking-tighter",
                  i === active ? "text-indigo-400" : "text-foreground/25",
                )}
              >
                {s.id}
              </span>
              <span className="flex-1">
                <span className="block text-lg font-semibold text-foreground">{s.name}</span>
                <span className="block text-sm text-muted-foreground">{s.summary}</span>
              </span>
              <span className="hidden shrink-0 font-mono text-[11px] uppercase tracking-widest text-lavender sm:block">
                {s.when}
              </span>
            </button>
          ))}
        </div>

        <div
          id="process-panel"
          role="tabpanel"
          aria-labelledby={`process-tab-${step.id}`}
          className="rounded-3xl border border-border bg-surface-2 p-8"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-lavender">
            Step {step.id} · {step.when}
          </span>
          <h3 className="text-display mt-3 text-3xl font-bold tracking-tight text-foreground">{step.name}</h3>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface-1 p-4">
              <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Deliverable</dt>
              <dd className="mt-1.5 text-sm text-foreground">{step.deliverable}</dd>
            </div>
            <div className="rounded-2xl border border-border bg-surface-1 p-4">
              <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Your time</dt>
              <dd className="mt-1.5 text-sm text-foreground">{step.involvement}</dd>
            </div>
          </dl>

          <ul className="mt-8 space-y-3">
            {step.activities.map((activity) => (
              <li key={activity} className="flex items-center gap-2.5 text-foreground/85">
                <Check className="h-4 w-4 text-indigo-400" aria-hidden="true" />
                {activity}
              </li>
            ))}
          </ul>

          <p className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
            <span className="font-mono text-[11px] uppercase tracking-widest text-lavender">Next</span>
            <span className="mt-1 block text-foreground/85">{step.next}</span>
          </p>
        </div>
      </div>

      <div className="reveal mt-10 text-center">
        <Button asChild size="lg">
          <a href={BOOK_HREF}>
            Start with the free audit
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </SectionShell>
  );
}
