"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentPage } from "./DocumentPage";
import type { DocumentPageContent, FileFormat } from "@/lib/digital-products/types";

/**
 * Viewer chrome shared by PDF and DOCX previews, so both formats read as the
 * same component with different content inside.
 */
export function PagedPreview({
  pages,
  totalPages,
  format,
}: {
  pages: DocumentPageContent[];
  totalPages: number;
  format: FileFormat;
}) {
  const [index, setIndex] = React.useState(0);
  const current = pages[index];

  if (!current) {
    return null;
  }

  const unit = format === "DOCX" ? "Section" : "Page";

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/40">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <FileText className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span className="truncate text-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
            {current.label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 gap-1 px-2.5"
            onClick={() => setIndex((value) => Math.max(0, value - 1))}
            disabled={index === 0}
            aria-label={`Previous ${unit.toLowerCase()}`}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Prev
          </Button>

          <span
            className="text-mono text-[11px] tabular-nums text-white/50"
            aria-live="polite"
          >
            {unit} {current.number} of {totalPages}
          </span>

          <Button
            size="sm"
            variant="ghost"
            className="h-8 gap-1 px-2.5"
            onClick={() =>
              setIndex((value) => Math.min(pages.length - 1, value + 1))
            }
            disabled={index === pages.length - 1}
            aria-label={`Next ${unit.toLowerCase()}`}
          >
            Next
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="max-h-[38rem] overflow-y-auto bg-[#0b0d12] p-4 sm:p-8">
        <DocumentPage page={current} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-4 py-3 sm:px-5">
        <span className="text-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          Showing {pages.length} of {totalPages} {unit.toLowerCase()}s
        </span>
        <div className="flex gap-1.5">
          {pages.map((page, pageIndex) => (
            <button
              key={page.number}
              type="button"
              onClick={() => setIndex(pageIndex)}
              aria-label={`${unit} ${page.number}`}
              aria-current={pageIndex === index}
              className={
                pageIndex === index
                  ? "h-1.5 w-6 rounded-full bg-primary transition-colors"
                  : "h-1.5 w-6 rounded-full bg-white/15 transition-colors hover:bg-white/30"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
