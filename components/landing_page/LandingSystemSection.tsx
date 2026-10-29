import Image from "next/image";
import { Check, X } from "lucide-react";
import type { EmberPose } from "@/components/mascot/Ember";
import { EmberRail } from "@/components/mascot/EmberRail";

const AETHON_POINTS = [
  "Measured on booked jobs and revenue, not clicks",
  "No lock-in agreements. Cancel anytime",
  "Every enquiry answered in under a minute, day or night",
  "One team for your website, ads, SEO and automations",
  "Clear numbers you can check anytime, in plain English",
];

// Ember's reaction as it checks off each Aethon point, in order.
const POINT_POSES: EmberPose[] = ["surprised", "happy", "building", "thinking", "happy"];

const AGENCY_POINTS = [
  "No clear results. Just “give it more time”",
  "Locked into long contracts",
  "You chase every enquiry yourself",
  "Focus on clicks and leads, not booked work",
  "Separate vendors for site, ads and SEO who never talk",
];

export function LandingSystemSection() {
  return (
    <section className="border-t border-white/10 py-24 sm:py-32">
      <div className="mx-auto max-w-360 px-6 sm:px-8 lg:px-12">
        <span className="reveal text-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
          03 - The difference
        </span>
        <h2 className="reveal mx-auto mt-8 max-w-4xl text-center text-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.98] tracking-tighter text-white">
          What happens when you use a system, not an agency.
        </h2>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2 md:items-start">
          <div className="reveal relative rounded-4xl bg-linear-to-br from-primary via-primary/30 to-primary/80 p-1.5 shadow-[0_0_70px_rgba(255,60,0,0.18)]">
            <div className="h-full rounded-[1.6rem] bg-[#0e0c0b] p-6 sm:p-8">
              <div className="flex items-center justify-center gap-3 text-display text-2xl font-medium tracking-tight text-white">
                <Image src="/mascot/ember-mark.svg" alt="" width={30} height={30} />
                Aethon Lab
              </div>
              <ul className="mt-6 divide-y divide-white/10">
                {AETHON_POINTS.map((point) => (
                  <li
                    key={point}
                    data-ember="stop"
                    className="flex items-start gap-3 py-4 text-base leading-7 text-white/60 transition-colors duration-500"
                  >
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary/35 transition-colors duration-500" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <EmberRail poses={POINT_POSES} endPose="happy" />
          </div>

          <div className="reveal rounded-4xl border border-white/10 bg-white/3 p-6 sm:p-8">
            <div className="text-center text-display text-2xl font-medium tracking-tight text-white/70">
              Typical agencies
            </div>
            <ul className="mt-6 divide-y divide-white/10">
              {AGENCY_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 py-4 text-base leading-7 text-white/55">
                  <X className="mt-1 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
