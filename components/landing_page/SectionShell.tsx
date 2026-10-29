import * as React from "react";
import { cn } from "@/lib/utils";

/** Mono "> label" line that sits above section headings. */
export function Eyebrow({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={cn(
        "font-mono text-xs uppercase tracking-widest text-lavender",
        className,
      )}
    >
      <span aria-hidden="true" className="text-primary">
        &gt;{" "}
      </span>
      {children}
    </span>
  );
}

/** Marks a slot still waiting for real content (see content.ts). */
export function PlaceholderTag() {
  return (
    <span className="inline-flex items-center rounded-full border border-dashed border-amber-400/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-amber-300/80">
      Placeholder
    </span>
  );
}

/** Serif accent word inside a heading. */
export function Accent({ children }: React.PropsWithChildren) {
  return (
    <span className="font-serif font-normal italic text-indigo-400">
      {children}
    </span>
  );
}

export function SectionShell({
  id,
  eyebrow,
  title,
  summary,
  children,
  center = false,
  className,
}: React.PropsWithChildren<{
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  summary?: React.ReactNode;
  center?: boolean;
  className?: string;
}>) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "reveal mb-12 max-w-3xl sm:mb-16",
            center && "mx-auto text-center",
          )}
        >
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-display text-gradient mt-4 text-4xl font-bold leading-[1.02] tracking-tighter sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          {summary && (
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {summary}
            </p>
          )}
        </div>

        {children}
      </div>
    </section>
  );
}
