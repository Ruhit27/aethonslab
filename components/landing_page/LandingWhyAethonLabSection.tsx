"use client";

import * as React from "react";

export function LandingWhyAethonLabSection() {
  return (
    <section className="border-y border-white/10 py-24 sm:py-32">
      <div className="mx-auto max-w-360 px-6 sm:px-8 lg:px-12">
        <span className="reveal text-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
          03 - Why Aethon Lab
        </span>
        <p className="reveal mt-8 max-w-4xl text-display text-[clamp(2.6rem,6vw,5.8rem)] leading-[0.98] tracking-[-0.04em] text-white">
          Most studios ship what you asked for.
          <br />
          We ship what you actually needed.
        </p>
      </div>
    </section>
  );
}
