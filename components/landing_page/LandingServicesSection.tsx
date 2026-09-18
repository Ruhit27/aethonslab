"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionShell } from "./SectionShell";
import { SERVICES } from "../constants";

export function LandingServicesSection() {
  return (
    <SectionShell
      id="services"
      eyebrow="02 - Services"
      title="What we forge, end to end."
      summary="Three lanes. Zero fluff."
    >
      <div className="grid gap-1 overflow-hidden rounded-4xl border border-white/10 bg-white/10 lg:grid-cols-3">
        {SERVICES.map((service, index) => (
          <Card
            key={service.id}
            className="reveal group relative rounded-none border-0 bg-black/20 p-0 transition-colors duration-300 hover:bg-white/4.5"
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <CardHeader className="gap-8 p-6 sm:p-8">
              <div className="flex items-center justify-between text-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
                <span>{service.id}</span>
                <Badge
                  variant="secondary"
                  className="bg-emerald-400/15 text-emerald-300"
                >
                  Available
                </Badge>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-primary">
                {service.icon}
              </div>

              <CardTitle className="text-display text-4xl font-medium text-white">
                {service.title}
              </CardTitle>
              <CardDescription className="max-w-sm text-base leading-7 text-white/60">
                {service.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-wrap gap-2 p-6 pt-0 sm:p-8 sm:pt-0">
              {service.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-white/10 bg-transparent text-[10px] text-white/55"
                >
                  {tag}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
