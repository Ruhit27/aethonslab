import * as React from "react";
import { CsvPreview } from "./CsvPreview";
import { PagedPreview } from "./PagedPreview";
import type { DigitalProduct } from "@/lib/digital-products/types";

/** Picks the preview renderer for a product's format. */
export function ProductPreview({ product }: { product: DigitalProduct }) {
  if (product.preview.kind === "csv") {
    return <CsvPreview data={product.preview.data} />;
  }

  return (
    <PagedPreview
      pages={product.preview.pages}
      totalPages={product.preview.totalPages}
      format={product.format}
    />
  );
}
