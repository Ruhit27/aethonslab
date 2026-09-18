"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionShell } from "./SectionShell";
import { PRODUCTS } from "../constants";
import { cnProductCard } from "../../lib/cn";

export function LandingProductsSection() {
  return (
    <SectionShell
      id="products"
      eyebrow="05 - Products"
      title="Built for us, shared with you."
      summary="Things we ship on our own time."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {PRODUCTS.map((product, index) => (
          <Card
            key={product.id}
            className={cnProductCard(
              product.featured
                ? "border-primary/25 bg-primary/5"
                : "bg-white/3",
            )}
            style={{ transitionDelay: `${index * 60}ms` }}
          >
            <CardHeader className="gap-6 p-6 sm:p-8">
              <div className="flex items-center justify-between text-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
                <span>{product.id}</span>
                <span>{product.tag}</span>
              </div>
              <CardTitle className="text-display text-4xl font-medium text-white">
                {product.name}
              </CardTitle>
              <CardDescription className="max-w-lg text-base leading-7 text-white/62">
                {product.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex items-center justify-between border-t border-white/10 p-6 sm:p-8">
              <span className="text-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
                Learn more
              </span>
              <ArrowUpRight
                className="h-5 w-5 text-white/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
