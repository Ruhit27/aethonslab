"use client";

import * as React from "react";
import { FilterBar } from "./FilterBar";
import { ProductGrid } from "./ProductGrid";
import { EmptyState } from "./EmptyState";
import { filterProducts } from "@/lib/digital-products/data";
import type {
  Category,
  DigitalProduct,
  FileFormat,
} from "@/lib/digital-products/types";

/**
 * Owns search and filter state for the listing page. Filtering runs in memory
 * over the catalogue passed in, so swapping the data source for a fetch later
 * only changes the caller.
 */
export function MarketplaceBrowser({
  products,
}: {
  products: DigitalProduct[];
}) {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState<Category | "All">("All");
  const [format, setFormat] = React.useState<FileFormat | "All">("All");

  const visibleProducts = React.useMemo(
    () => filterProducts(products, { search, category, format }),
    [products, search, category, format],
  );

  const reset = React.useCallback(() => {
    setSearch("");
    setCategory("All");
    setFormat("All");
  }, []);

  return (
    <div className="space-y-10">
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        format={format}
        onFormatChange={setFormat}
        onReset={reset}
        resultCount={visibleProducts.length}
        totalCount={products.length}
      />

      {visibleProducts.length > 0 ? (
        <ProductGrid products={visibleProducts} />
      ) : (
        <EmptyState onReset={reset} />
      )}
    </div>
  );
}
