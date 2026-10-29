"use client";

import * as React from "react";
import { ArrowUpRight, CalendarDays, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "./LeadForm";
import { WHATSAPP_LINK } from "../constants";

export function LandingContactSection() {
  return (
    <section id="contact" className="border-t border-white/10 py-24 sm:py-32">
      <div className="mx-auto max-w-360 px-6 sm:px-8 lg:px-12">
        <span className="reveal text-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
          04 - Contact
        </span>
        <h2 className="reveal mt-8 max-w-4xl text-display text-[clamp(3rem,8vw,7.2rem)] leading-[0.9] tracking-tighter text-white">
          Don&apos;t take our word.
          <br />
          Watch it reply.
        </h2>
        <p className="reveal mt-6 max-w-2xl text-lg leading-8 text-white/68">
          This form runs Lead Autopilot. Tell us about your business and
          you&apos;ll get the same instant reply your customers would.
        </p>

        <div className="reveal mt-10 max-w-3xl">
          <LeadForm />
        </div>

        <div className="reveal mt-10 flex flex-wrap gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary text-black hover:bg-primary/90"
          >
            <a href="mailto:hello@aethonlab.studio">
              <Mail className="h-4 w-4" aria-hidden="true" />
              hello@aethonlab.studio
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white/12 bg-white/5 text-white hover:bg-white/10"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white/12 bg-white/5 text-white hover:bg-white/10"
          >
            <a
              href="https://instagram.com/aethonlab"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Instagram DM
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>

        <div className="reveal mt-8 flex flex-wrap gap-4 text-mono text-[11px] uppercase tracking-[0.24em] text-white/55">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4" aria-hidden="true" /> Avg reply
            under 2 hours
          </span>
          <span>Mon - Fri | 09:00 - 19:00 MYT</span>
        </div>
        <div className="reveal mt-6 text-mono text-[15px] text-white/80 tracking-tighter">
          <div>Address: Seri Kembangan, Kuala Lumpur, Malaysia</div>
        </div>
      </div>
    </section>
  );
}
