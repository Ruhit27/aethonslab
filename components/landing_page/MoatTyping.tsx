"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Kicker, Purple } from "./kit";
import { MOAT } from "./content";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Sticky block inside a 200vh runway: scrolling through it types out each
 * step's "before", then its "after", and fills the progress segments.
 */
export function MoatTyping() {
  const runwayRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const update = () => {
      const el = runwayRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      setProgress(span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const steps = MOAT.steps;
  const phases = steps.length * 2; // a before and an after per step
  const phaseFloat = Math.min(phases - 0.0001, progress * phases);
  const phase = Math.floor(phaseFloat);
  const step = Math.floor(phase / 2);
  const isAfter = phase % 2 === 1;
  const text = isAfter ? steps[step].after : steps[step].before;
  // Type over the first 60% of each phase, then hold the full line.
  const typed = text.slice(0, Math.ceil(text.length * Math.min(1, (phaseFloat - phase) / 0.6)));
  const stepProgress = (phaseFloat - step * 2) / 2;

  return (
    <section className="mb-12 border-t border-border-subtle pt-6">
      <div ref={runwayRef} className="relative" style={{ height: "200vh" }}>
        <div className="sticky top-0 pb-[4vh] pt-[14vh]">
          <div className="mx-auto w-full max-w-4xl text-center">
            <Kicker className="mb-6">{MOAT.kicker}</Kicker>
            <h3 className="text-balance text-4xl font-bold leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-[80px]">
              {MOAT.title} <Purple>{MOAT.accent}</Purple>.
            </h3>

            <div className="mx-auto mt-8 max-w-3xl">
              <div className="mb-4 flex items-baseline justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.18em]">
                <span className={isAfter ? "text-primary-purple" : "text-text-soft"}>
                  {isAfter ? "The after" : "The before"}
                </span>
                <span className="tabular-nums text-text-soft">
                  · {pad(step + 1)} / {pad(steps.length)}
                </span>
              </div>
              <p
                aria-live="polite"
                className={cn(
                  "text-xl font-medium leading-[1.4] tracking-[-0.01em] md:text-2xl lg:text-[28px]",
                  isAfter ? "text-foreground" : "text-text-muted",
                )}
                style={{ minHeight: "3.2em" }}
              >
                {typed}
                <span className="caret ml-[3px] inline-block h-[0.95em] w-[3px] bg-primary-purple align-[-2px]" />
              </p>
            </div>

            <div className="mx-auto mt-8 flex max-w-3xl gap-2">
              {steps.map((_, i) => (
                <div key={i} className="h-[2px] flex-1 overflow-hidden rounded-full bg-border-strong">
                  <div
                    className="h-full bg-primary-purple"
                    style={{
                      width: `${i < step ? 100 : i === step ? stepProgress * 100 : 0}%`,
                      transition: "width 600ms cubic-bezier(.25,.46,.45,.94)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
