"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CATEGORIES,
  type Category,
} from "@/lib/digital-products/types";

function FilterChip({
  active,
  children,
  onClick,
}: React.PropsWithChildren<{ active: boolean; onClick: () => void }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-[3px] py-[1px] text-mono text-[2px] uppercase tracking-[0.05em] transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active
          ? "border-primary/40 bg-primary/15 text-primary"
          : "border-white/12 bg-white/[0.03] text-white/55 hover:border-white/25 hover:text-white/80",
      )}
    >
      {children}
    </button>
  );
}

export function FilterBar({
  category,
  onCategoryChange,
  onReset,
  resultCount,
  totalCount,
}: {
  category: Category | "All";
  onCategoryChange: (value: Category | "All") => void;
  onReset: () => void;
  resultCount: number;
  totalCount: number;
}) {
  const hasActiveFilters = category !== "All";

  return (
    <div className="space-y-6">
      <div className="space-y-3">
       
        <div className="flex flex-wrap text-[12px]  gap-1">
          <FilterChip
            active={category === "All"}
            onClick={() => onCategoryChange("All")}
          >
<p className="p-2">All</p>          </FilterChip>
          {CATEGORIES.map((item) => (
            <FilterChip
              key={item}
              active={category === item}
              onClick={() => onCategoryChange(item)}
            >
              <p className="p-2">{item}</p>
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
        <span
          className="text-mono text-[11px] uppercase tracking-[0.2em] text-white/45"
          aria-live="polite"
        >
          {resultCount} of {totalCount} products
        </span>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
