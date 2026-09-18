import * as React from "react";
import type { DocBlock, DocumentPageContent } from "@/lib/digital-products/types";

function Block({ block }: { block: DocBlock }) {
  switch (block.type) {
    case "heading": {
      const level = block.level ?? 2;
      const className =
        level === 1
          ? "text-display text-[1.6rem] font-medium leading-tight text-neutral-900 sm:text-[2rem]"
          : level === 2
            ? "text-display text-lg font-medium text-neutral-900 sm:text-xl"
            : "text-display text-base font-medium text-neutral-900";

      if (level === 1) return <h3 className={className}>{block.text}</h3>;
      if (level === 2) return <h4 className={className}>{block.text}</h4>;
      return <h5 className={className}>{block.text}</h5>;
    }

    case "paragraph":
      return (
        <p className="text-[0.9rem] leading-7 text-neutral-700">{block.text}</p>
      );

    case "list": {
      const items = block.items.map((item, index) => (
        <li key={index} className="pl-1.5 text-[0.9rem] leading-7 text-neutral-700">
          {item}
        </li>
      ));

      return block.ordered ? (
        <ol className="list-decimal space-y-1.5 pl-5 marker:text-neutral-400">
          {items}
        </ol>
      ) : (
        <ul className="list-disc space-y-1.5 pl-5 marker:text-neutral-400">
          {items}
        </ul>
      );
    }

    case "table":
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[0.8rem]">
            <thead>
              <tr>
                {block.headers.map((header) => (
                  <th
                    key={header}
                    className="border border-neutral-300 bg-neutral-100 px-3 py-2 font-medium text-neutral-800"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border border-neutral-300 px-3 py-2 align-top text-neutral-700"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "callout":
      return (
        <div className="border-l-2 border-neutral-800 bg-neutral-100 px-4 py-3">
          <div className="text-mono text-[0.65rem] uppercase tracking-[0.18em] text-neutral-500">
            {block.label}
          </div>
          <p className="mt-1.5 text-[0.85rem] leading-6 text-neutral-700">
            {block.text}
          </p>
        </div>
      );

    case "fields":
      return (
        <dl className="space-y-3">
          {block.items.map((field) => (
            <div key={field.label} className="flex items-baseline gap-3">
              <dt className="shrink-0 text-[0.8rem] font-medium text-neutral-800">
                {field.label}
              </dt>
              <dd className="min-w-0 flex-1 border-b border-dotted border-neutral-400 pb-0.5 text-[0.85rem] text-neutral-600">
                {field.value || " "}
              </dd>
            </div>
          ))}
        </dl>
      );
  }
}

/**
 * A single sheet of a document, rendered light like real paper regardless of
 * the surrounding dark theme.
 */
export function DocumentPage({ page }: { page: DocumentPageContent }) {
  return (
    <article className="mx-auto w-full max-w-[52rem] bg-white px-6 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:px-12 sm:py-14">
      <div className="space-y-5">
        {page.blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-neutral-200 pt-4">
        <span className="text-mono text-[0.6rem] uppercase tracking-[0.2em] text-neutral-400">
          Preview sample
        </span>
        <span className="text-mono text-[0.65rem] text-neutral-400">
          {page.number}
        </span>
      </div>
    </article>
  );
}
