"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CATEGORIES,
  FILE_FORMATS,
  type Category,
  type FileFormat,
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
  search,
  onSearchChange,
  category,
  onCategoryChange,
  format,
  onFormatChange,
  onReset,
  resultCount,
  totalCount,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  category: Category | "All";
  onCategoryChange: (value: Category | "All") => void;
  format: FileFormat | "All";
  onFormatChange: (value: FileFormat | "All") => void;
  onReset: () => void;
  resultCount: number;
  totalCount: number;
}) {
  const hasActiveFilters =
    search.trim().length > 0 || category !== "All" || format !== "All";

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
          aria-hidden="true"
        />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search products by name or keyword"
          aria-label="Search digital products"
          className="h-12 w-full rounded-full border border-white/12 bg-white/[0.03] pl-11 pr-11 text-sm text-white placeholder:text-white/35 transition-colors focus:border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
        {search.length > 0 && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        <span className="block text-mono text-[4px] uppercase tracking-[0.06em] text-white/40">
          Category
        </span>
        <div className="flex flex-wrap gap-1">
          <FilterChip
            active={category === "All"}
            onClick={() => onCategoryChange("All")}
          >
            All
          </FilterChip>
          {CATEGORIES.map((item) => (
            <FilterChip
              key={item}
              active={category === item}
              onClick={() => onCategoryChange(item)}
            >
              {item}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <span className="block text-mono text-[4px] uppercase tracking-[0.06em] text-white/40">
          File format
        </span>
        <div className="flex flex-wrap gap-1">
          <FilterChip
            active={format === "All"}
            onClick={() => onFormatChange("All")}
          >
            All
          </FilterChip>
          {FILE_FORMATS.map((item) => (
            <FilterChip
              key={item}
              active={format === item}
              onClick={() => onFormatChange(item)}
            >
              {item}
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
