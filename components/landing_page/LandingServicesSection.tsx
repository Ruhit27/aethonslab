"use client";

import * as React from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionShell } from "./SectionShell";
import { ServicesEmberWalk } from "./ServicesEmberWalk";
import { SERVICES } from "../constants";

export function LandingServicesSection() {
  return (
    <SectionShell
      id="services"
      eyebrow="02 - Services"
      title="From first search to booked job."
      summary="Four services. One pipeline. One team."
    >
      <div className="relative">
        <div className="grid gap-px overflow-hidden rounded-4xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <article
              key={service.id}
              data-ember="card"
              className="reveal group relative flex flex-col bg-[#0b0c11] p-6 pt-16 transition-[background-color,box-shadow] duration-500 hover:bg-[#101219] sm:p-8 sm:pt-20"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Where the pipeline line crosses this card; Ember stops here. */}
              <span
                data-ember="node"
                aria-hidden="true"
                className="absolute left-0 top-8 sm:top-10 lg:left-10"
              />

              <div className="flex items-center justify-between gap-3">
                <span className="text-mono text-[11px] uppercase tracking-[0.24em] text-white/45 transition-colors duration-500 group-[.service-lit]:text-primary">
                  {service.id} · {service.stage}
                </span>
                {service.flagship && (
                  <Badge className="bg-primary/15 text-[10px] text-primary">
                    Flagship
                  </Badge>
                )}
              </div>

              <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-all duration-500 group-hover:-translate-y-0.5 group-[.service-lit]:border-primary/50 group-[.service-lit]:bg-primary group-[.service-lit]:text-black group-[.service-lit]:shadow-[0_0_30px_rgba(255,60,0,0.35)]">
                {service.icon}
              </div>

              <h3 className="mt-8 text-display text-3xl font-medium tracking-tight text-white">
                {service.title}
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-white/60">
                {service.description}
              </p>

              <ul className="mt-6 space-y-2.5">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-white/75">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-white/35 transition-colors duration-500 group-[.service-lit]:text-primary"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <div className="border-t border-dashed border-white/10 pt-4 text-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  Measured on
                  <span className="mt-1.5 block text-[11px] text-white/80 transition-colors duration-500 group-[.service-lit]:text-primary">
                    {service.measure}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <ServicesEmberWalk />
      </div>

      <div className="reveal mt-6 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/3 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <p className="max-w-xl text-base leading-7 text-white/70">
          Pick one stage or run the whole pipeline. Same team, one weekly
          report, judged on booked jobs.
        </p>
        <Button
          asChild
          size="lg"
          className="shrink-0 rounded-full bg-primary text-black hover:bg-primary/90"
        >
          <a href="#contact">
            Plan my pipeline
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </SectionShell>
  );
}
