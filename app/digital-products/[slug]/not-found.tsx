import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MarketplaceHeader } from "@/components/digital_products/MarketplaceHeader";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen">
      <MarketplaceHeader />

      <main className="mx-auto flex max-w-360 flex-col items-start px-6 py-32 sm:px-8 lg:px-12">
        <span className="text-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
          404
        </span>
        <h1 className="mt-5 max-w-2xl text-display text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.02] tracking-tighter text-white">
          That product does not exist.
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-8 text-white/60">
          The link may be out of date, or the product may have been removed from
          the catalogue.
        </p>

        <Button asChild size="lg" className="mt-10 rounded-full">
          <Link href="/digital-products">Browse all products</Link>
        </Button>
      </main>
    </div>
  );
}
