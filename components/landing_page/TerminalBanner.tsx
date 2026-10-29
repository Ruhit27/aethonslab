import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BOOK_HREF, TERMINAL } from "./content";

export function TerminalBanner() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal relative overflow-hidden rounded-3xl border border-primary/25 bg-surface-0">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/25 blur-[100px]" />

          {/* Window chrome */}
          <div className="relative flex items-center gap-2 border-b border-border px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400/70" />
            <span className="h-3 w-3 rounded-full bg-amber-400/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
            <span className="ml-3 font-mono text-[11px] text-muted-foreground">aethon@automation-gateway ~</span>
          </div>

          <div className="relative px-6 py-10 sm:px-12 sm:py-14">
            <div className="space-y-1.5 font-mono text-sm">
              {TERMINAL.lines.map((line) => (
                <p key={line.key} className="text-muted-foreground">
                  <span className="text-primary">&gt;</span> {line.key}:{" "}
                  <span className={cn(line.tone === "ok" ? "text-emerald-400" : "text-amber-300")}>
                    {line.value}
                  </span>
                </p>
              ))}
            </div>

            <p className="text-display mt-8 font-mono text-4xl font-bold uppercase tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {TERMINAL.title}
              <span className="caret ml-1 text-indigo-400">_</span>
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="font-mono">
                <a href={BOOK_HREF}>
                  {TERMINAL.primaryCta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-mono">
                <a href={BOOK_HREF}>{TERMINAL.secondaryCta}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
