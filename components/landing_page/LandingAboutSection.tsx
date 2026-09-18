"use client";

import { ABOUT_LINES } from "../constants";
import { SectionShell } from "./SectionShell";

export function LandingAboutSection() {
  return (
    <SectionShell
      id="about"
      eyebrow="07 - About"
      title="A studio of four, on purpose."
      summary="Four lines. That's enough."
    >
      <ol className="grid gap-4">
        {ABOUT_LINES.map((line, index) => (
          <li
            key={line}
            className="reveal flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-white/3 p-5 sm:flex-row sm:items-center sm:gap-8 sm:p-6"
          >
            <span className="text-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
              0{index + 1}
            </span>
            <p className="text-display text-2xl font-medium leading-snug text-white sm:text-3xl">
              {line}
            </p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
