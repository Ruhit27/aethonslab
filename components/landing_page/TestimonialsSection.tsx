"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./kit";
import { REVIEWS_HEADER, TESTIMONIALS, type Testimonial } from "./content";

/** Desktop coverflow slot for an offset from the centre card. */
const SLOTS: Record<number, { x: number; scale: number; z: number; opacity: number }> = {
  0: { x: 0, scale: 1, z: 20, opacity: 1 },
  1: { x: 280, scale: 0.72, z: 10, opacity: 0.95 },
  2: { x: 470, scale: 0.6, z: 5, opacity: 0.8 },
};

export function TestimonialsSection() {
  const [active, setActive] = React.useState(Math.floor(TESTIMONIALS.length / 2));
  const total = TESTIMONIALS.length;
  const go = (step: number) => setActive((i) => (i + step + total) % total);

  // Signed shortest distance from the active card, so the ring wraps around.
  const offset = (i: number) => {
    let d = i - active;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  return (
    <section className="w-full bg-background py-16 transition-colors duration-500 sm:py-20">
      <div className="px-4">
        <SectionHeader
          eyebrow={REVIEWS_HEADER.eyebrow}
          title={REVIEWS_HEADER.title}
          accent={REVIEWS_HEADER.accent}
          summary={REVIEWS_HEADER.summary}
          gradient={false}
          className="mb-12"
        />
      </div>

      {/* Mobile: one card in focus, neighbours peeking. */}
      <div className="w-full overflow-hidden sm:hidden">
        <div
          className="flex"
          style={{
            transform: `translateX(calc(12vw - ${active} * 78vw))`,
            transition: "transform .45s cubic-bezier(.32,.72,0,1)",
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="mr-[2vw] aspect-9/16 shrink-0 transition-opacity duration-300"
              style={{ width: "76vw", opacity: i === active ? 1 : 0.45 }}
              onClick={() => setActive(i)}
            >
              <ReviewCard t={t} />
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex gap-3">
            <RoundButton label="Previous review" onClick={() => go(-1)}>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </RoundButton>
            <RoundButton label="Next review" onClick={() => go(1)}>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </RoundButton>
          </div>
        </div>
      </div>

      {/* Desktop: coverflow; click a side card to bring it to the centre. */}
      <div className="relative hidden h-[500px] items-center justify-center overflow-x-clip sm:flex lg:h-[560px]">
        {TESTIMONIALS.map((t, i) => {
          const d = offset(i);
          const slot = SLOTS[Math.abs(d)];
          if (!slot) return null;
          return (
            <button
              key={i}
              type="button"
              aria-label={d === 0 ? `Review from ${t.name}` : `Show review from ${t.name}`}
              aria-current={d === 0}
              onClick={() => setActive(i)}
              className={cn("absolute aspect-9/16 w-[240px] lg:w-[280px]", d === 0 ? "cursor-default" : "cursor-pointer")}
              style={{
                transform: `translateX(${Math.sign(d) * slot.x}px) scale(${slot.scale})`,
                zIndex: slot.z,
                opacity: slot.opacity,
                transition: "transform .5s cubic-bezier(.32,.72,0,1), opacity .4s",
              }}
            >
              <ReviewCard t={t} focused={d === 0} />
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show review ${i + 1}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === active ? "w-6 bg-primary-purple" : "w-2 bg-border hover:bg-muted-foreground",
            )}
          />
        ))}
      </div>
    </section>
  );
}

function ReviewCard({ t, focused = true }: { t: Testimonial; focused?: boolean }) {
  return (
    <div className="relative flex h-full flex-col text-left">
      {/* Purple corner brackets */}
      <span className="absolute left-0 top-0 z-20 h-5 w-5 border-l-2 border-t-2 border-primary-purple" />
      <span className="absolute right-0 top-0 z-20 h-5 w-5 border-r-2 border-t-2 border-primary-purple" />
      <span className="absolute bottom-0 left-0 z-20 h-5 w-5 border-b-2 border-l-2 border-primary-purple" />
      <span className="absolute bottom-0 right-0 z-20 h-5 w-5 border-b-2 border-r-2 border-primary-purple" />

      <div className="relative min-h-0 flex-1 overflow-hidden bg-linear-to-b from-primary-700 to-primary-900">
        {t.photo ? (
          <Image src={t.photo} alt={t.name} fill className="object-cover" sizes="280px" />
        ) : (
          <div className="absolute inset-0 flex flex-col p-5 pt-8 text-white">
            <Quote className="h-6 w-6 shrink-0 text-white/50" aria-hidden="true" />
            <p className={cn("mt-4 font-medium leading-snug text-white/90", focused ? "text-base" : "text-sm")}>{t.quote}</p>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        {t.video && focused && (
          <a
            href={t.video}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Play video from ${t.name}`}
            className="absolute inset-0 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/40 shadow-xl backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/60">
              <Play className="ml-0.5 h-6 w-6 fill-white text-white" aria-hidden="true" />
            </span>
          </a>
        )}

        {t.placeholder && (
          <span className="absolute right-3 top-3 border border-dashed border-amber-300/70 px-1.5 py-0.5 text-[9px] uppercase tracking-widest text-amber-200">
            Placeholder
          </span>
        )}

        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-xs font-semibold text-white drop-shadow sm:text-sm">{t.name}</p>
          <p className="text-[10px] text-white/75 sm:text-xs">
            {t.role} · {t.company}
          </p>
        </div>
      </div>
    </div>
  );
}

function RoundButton({ label, onClick, children }: React.PropsWithChildren<{ label: string; onClick: () => void }>) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-primary-purple hover:text-primary-purple"
    >
      {children}
    </button>
  );
}
