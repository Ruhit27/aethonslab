import * as React from "react";
import { ProductCard } from "./ProductCard";
import type { DigitalProduct } from "@/lib/digital-products/types";

export function ProductGrid({ products }: { products: DigitalProduct[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard
          key={product.slug}
          product={product}
          preload={index < 3}
        />
      ))}
    </div>
  );
}
