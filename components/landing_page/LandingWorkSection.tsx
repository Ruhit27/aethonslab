"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { SectionShell } from "./SectionShell";
import { WORK } from "../constants";
import { cnCardLink } from "../../lib/cn";

export function LandingWorkSection() {
  return (
    <SectionShell
      id="work"
      eyebrow="04 - Selected Work"
      title="Nothing here is a template."
      summary="A small, deliberate portfolio."
    >
      <div className="grid gap-6 lg:grid-cols-6">
        {WORK.map((item, index) => {
          const wide = index === 0 || index === 3;
          const external = Boolean(item.href);

          return (
            <a
              key={item.id}
              href={item.href ?? "#contact"}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className={cnCardLink(wide ? "lg:col-span-4" : "lg:col-span-2")}
            >
              <Card className="reveal group overflow-hidden border-white/10 bg-white/3 p-0 transition-transform duration-300 hover:-translate-y-1">
                <div
                  className="relative overflow-hidden border-b border-white/10"
                  style={{ aspectRatio: item.ratio }}
                >
                  <Image
                    src={item.image}
                    alt={`${item.title} portfolio preview`}
                    fill
                    preload={index === 0}
                    sizes={
                      wide
                        ? "(min-width: 1024px) 66vw, 100vw"
                        : "(min-width: 1024px) 33vw, 100vw"
                    }
                    className="object-cover transition duration-700 group-hover:scale-[1.03] group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.28))]" />
                  <span className="absolute left-4 top-4 text-mono text-[11px] uppercase tracking-[0.24em] text-white/60">
                    {item.label}
                  </span>
                  <span className="absolute bottom-4 right-4 text-mono text-[11px] uppercase tracking-[0.24em] text-white/60">
                    {item.ratio}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity duration-300 group-hover:bg-black/60 group-hover:opacity-100">
                    <span className="text-mono text-[11px] uppercase tracking-[0.3em] text-white">
                      {external ? "Visit site" : "View case"}
                    </span>
                  </div>
                </div>

                <CardContent className="grid gap-2 p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3 text-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
                    <span>{item.id}</span>
                    <span>{item.year}</span>
                  </div>
                  <div className="text-display text-2xl font-medium text-white">
                    {item.title}
                  </div>
                  <div className="text-sm leading-6 text-white/60">
                    {item.category}
                  </div>
                </CardContent>
              </Card>
            </a>
          );
        })}
      </div>
    </SectionShell>
  );
}
