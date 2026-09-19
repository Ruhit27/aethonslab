"use client";

import * as React from "react";
import { FilterBar } from "./FilterBar";
import { ProductGrid } from "./ProductGrid";
import { EmptyState } from "./EmptyState";
import { filterProducts } from "@/lib/digital-products/data";
import type { Category, DigitalProduct } from "@/lib/digital-products/types";

/**
 * Owns category filter state for the listing page. Filtering runs in memory
 * over the catalogue passed in, so swapping the data source for a fetch later
 * only changes the caller.
 */
export function MarketplaceBrowser({
  products,
}: {
  products: DigitalProduct[];
}) {
  const [category, setCategory] = React.useState<Category | "All">("All");

  const visibleProducts = React.useMemo(
    () => filterProducts(products, { search: "", category, format: "All" }),
    [products, category],
  );

  const reset = React.useCallback(() => {
    setCategory("All");
  }, []);

  return (
    <div className="space-y-10">
      <FilterBar
        category={category}
        onCategoryChange={setCategory}
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
