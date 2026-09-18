import * as React from "react";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-3xl border border-dashed border-white/12 bg-white/[0.02] px-6 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <SearchX className="h-6 w-6 text-white/50" aria-hidden="true" />
      </div>

      <div className="space-y-2">
        <h3 className="text-display text-2xl font-medium text-white">
          No products match those filters
        </h3>
        <p className="mx-auto max-w-md text-sm leading-6 text-white/55">
          Try a different search term, or widen the category and format filters
          to see more of the catalogue.
        </p>
      </div>

      <Button variant="outline" size="sm" onClick={onReset}>
        Clear all filters
      </Button>
    </div>
  );
}
