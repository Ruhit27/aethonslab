"use client";

import { ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LandingHeroSection() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden border-b border-white/10"
    >
      <div className="pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%,transparent_72%,rgba(0,0,0,0.14))]" />

      <div className="mx-auto grid w-full max-w-360 gap-14 px-6 pb-24 pt-32 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:pb-32 lg:pt-36">
        <div className="space-y-8">
          <div className="reveal flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-white/55">
            <span>[ 01 / Aethon Lab ]</span>
            <span>Lisbon - Remote</span>
          </div>

          <div className="space-y-6">
            <h1 className="reveal text-display max-w-5xl text-[clamp(3.75rem,7vw,7.8rem)] font-medium leading-[0.88] tracking-tighter text-white">
              We do not just build.
              <br />
              We think first.
            </h1>

            <p className="reveal max-w-2xl text-lg leading-8 text-white/68 sm:text-xl">
              A strategy-first studio building websites, mobile apps, and AI
              systems for teams that want precision over noise.
            </p>
          </div>

          <div className="reveal flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary text-black hover:bg-primary/90"
            >
              <a href="#contact">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Start a project
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/12 bg-white/5 text-white hover:bg-white/10"
            >
              <a href="#work">
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
                See the work
              </a>
            </Button>
          </div>

          <div className="reveal flex flex-wrap gap-3 border-t border-dashed border-white/10 pt-4 font-mono text-[11px] uppercase tracking-[0.24em] text-white/55">
            <span className="text-primary">Currently forging</span>
            <span>AI ops platform for a fintech</span>
            <span>Mobile app for a sports club</span>
            <span>Marketing site for a startup</span>
          </div>
        </div>

        <Card className="reveal relative overflow-hidden border-white/10 bg-white/4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,60,0,0.14),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(104,167,255,0.12),transparent_42%)]" />
          <CardHeader className="relative gap-3 border-b border-white/10 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <Badge
                variant="secondary"
                className="bg-white/8 text-[10px] text-white/70"
              >
                Live brief
              </Badge>
              <span className="text-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
                03 active engagements
              </span>
            </div>
            <CardTitle className="text-3xl text-white">
              Strategy that ships without losing intent.
            </CardTitle>
            <CardDescription className="max-w-md text-white/62">
              The studio keeps design, engineering, and systems work on the same
              roadmap so decisions stay connected.
            </CardDescription>
          </CardHeader>

          <CardContent className="relative space-y-6 p-6 sm:p-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-white/55">
                <span className="text-mono">Focus</span>
                <span>74%</span>
              </div>
              <div className="h-2 rounded-full bg-white/8">
                <div className="h-2 w-[74%] rounded-full bg-primary shadow-[0_0_20px_rgba(255,60,0,.4)]" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["01", "Web"],
                ["02", "App"],
                ["03", "AI"],
              ].map(([index, label]) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/3 p-4"
                >
                  <div className="text-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
                    {index}
                  </div>
                  <div className="mt-2 text-display text-xl font-medium text-white">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
              Booking window: Q3 2026
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
