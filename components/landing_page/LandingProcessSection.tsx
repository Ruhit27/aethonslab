"use client";

import * as React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionShell } from "./SectionShell";
import { STEPS } from "../constants";

export function LandingProcessSection() {
  return (
    <section id="process" className="border-t border-white/10 py-24 sm:py-32">
      <div className="overflow-hidden border-y border-white/10 py-4 text-display text-4xl font-medium tracking-[-0.04em] text-white/35 sm:text-6xl">
        <div className="marquee-track flex w-[200%] items-center gap-8 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="flex items-center gap-8 pr-8">
              <span>THINK</span>
              <span className="text-primary">◆</span>
              <span>FORGE</span>
              <span className="text-primary">◆</span>
              <span>LAUNCH</span>
              <span className="text-primary">◆</span>
            </div>
          ))}
        </div>
      </div>

      <SectionShell
        eyebrow="06 - Process"
        title="Think. Forge. Launch."
        summary="Three steps. No theater."
        compact
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {STEPS.map((step, index) => (
            <Card
              key={step.id}
              className="reveal border-white/10 bg-white/3 p-0"
            >
              <CardHeader className="gap-8 p-6 sm:p-8">
                <div className="flex items-center justify-between text-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
                  <span>{step.id}</span>
                  <span>Step {index + 1}</span>
                </div>
                <CardTitle className="text-display text-4xl font-medium text-white">
                  {step.title}
                </CardTitle>
                <CardDescription className="text-base leading-7 text-white/62">
                  {step.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </SectionShell>
    </section>
  );
}
