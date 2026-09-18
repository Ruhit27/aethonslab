import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/digital-products/data";
import type { DigitalProduct } from "@/lib/digital-products/types";

export function ProductCard({
  product,
  preload = false,
}: {
  product: DigitalProduct;
  preload?: boolean;
}) {
  return (
    <Link
      href={`/digital-products/${product.slug}`}
      className="group block focus-visible:outline-none"
    >
      <Card className="h-full overflow-hidden border-white/10 bg-white/3 p-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/20 group-focus-visible:ring-2 group-focus-visible:ring-ring">
        <div className="relative aspect-4/3 overflow-hidden border-b border-white/10">
          <Image
            src={product.thumbnail}
            alt=""
            fill
            preload={preload}
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <Badge
            variant="secondary"
            className="absolute right-3 top-3 bg-black/70 text-[10px] text-white/80 backdrop-blur-sm"
          >
            {product.format}
          </Badge>
        </div>

        <CardContent className="flex flex-col gap-3 p-5">
          <span className="text-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
            {product.category}
          </span>

          <h3 className="text-display text-xl font-medium leading-snug text-white">
            {product.title}
          </h3>

          <p className="line-clamp-2 text-sm leading-6 text-white/60">
            {product.shortDescription}
          </p>

          <div className="mt-1 flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-display text-lg font-medium text-white">
              {formatPrice(product.price)}
            </span>
            <span className="inline-flex items-center gap-1 text-mono text-[10px] uppercase tracking-[0.2em] text-white/45 transition-colors group-hover:text-primary">
              View
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
