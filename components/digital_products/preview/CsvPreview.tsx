import * as React from "react";
import { Table2 } from "lucide-react";
import type { CsvPreviewData } from "@/lib/digital-products/types";

/** Tabular preview of a CSV, deliberately truncated. */
export function CsvPreview({ data }: { data: CsvPreviewData }) {
  const hiddenColumns = data.totalColumns - data.headers.length;

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/40">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <Table2 className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="text-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
            Data sample
          </span>
        </div>
        <span className="text-mono text-[11px] tabular-nums text-white/50">
          {data.totalRows.toLocaleString()} rows &middot; {data.totalColumns} columns
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <thead>
            <tr className="bg-white/[0.04]">
              {data.headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="whitespace-nowrap border-b border-white/10 px-4 py-3 text-mono text-[10px] uppercase tracking-[0.18em] text-white/55"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="transition-colors odd:bg-white/[0.015] hover:bg-white/[0.045]"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="whitespace-nowrap border-b border-white/5 px-4 py-2.5 text-[0.8rem] tabular-nums text-white/75"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-white/10 px-4 py-3 text-mono text-[10px] uppercase tracking-[0.2em] text-white/40 sm:px-5">
        Preview shows {data.rows.length} of {data.totalRows.toLocaleString()} rows
        {hiddenColumns > 0 ? ` and ${data.headers.length} of ${data.totalColumns} columns` : ""}
      </div>
    </div>
  );
}
