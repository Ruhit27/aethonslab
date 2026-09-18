import * as React from "react";

export function SectionShell({
  id,
  eyebrow,
  title,
  summary,
  children,
  compact = false,
}: React.PropsWithChildren<{
  id?: string;
  eyebrow: string;
  title: string;
  summary: string;
  compact?: boolean;
}>) {
  return (
    <section
      id={id}
      className={
        compact
          ? "border-t border-white/10 py-20 sm:py-24"
          : "border-t border-white/10 py-24 sm:py-32"
      }
    >
      <div className="mx-auto max-w-360 px-6 sm:px-8 lg:px-12">
        <div className="reveal mb-10 grid gap-4 lg:mb-14 lg:grid-cols-[1fr_1.6fr] lg:items-end">
          <div>
            <span className="text-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
              {eyebrow}
            </span>
            <div className="mt-3 text-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
              {summary}
            </div>
          </div>
          <h2 className="text-display text-[clamp(2.6rem,5vw,5rem)] leading-[0.94] tracking-tighter text-white">
            {title}
          </h2>
        </div>

        {children}
      </div>
    </section>
  );
}
