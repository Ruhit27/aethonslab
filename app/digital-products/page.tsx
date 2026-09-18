import type { Metadata } from "next";
import { MarketplaceBrowser } from "@/components/digital_products/MarketplaceBrowser";
import { MarketplaceHeader } from "@/components/digital_products/MarketplaceHeader";
import { PRODUCTS } from "@/lib/digital-products/data";

export const metadata: Metadata = {
  title: "Digital Products | Aethon Lab",
  description:
    "Templates, trackers and study guides as instant downloads. Preview every product before you buy.",
};

export default function DigitalProductsPage() {
  return (
    <div className="min-h-screen">
      <MarketplaceHeader />

      <main className="mx-auto max-w-360 px-6 pb-24 pt-14 sm:px-8 sm:pb-32 lg:px-12">
        <div className="max-w-3xl">
          <span className="text-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
            Digital Products
          </span>
          <h1 className="mt-5 text-display text-[clamp(2.75rem,6vw,4.75rem)] font-medium leading-[0.95] tracking-tighter text-white">
            Work that ships
            <br />
            the moment you buy it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Guides, trackers and templates built from real client work. Every
            product previews before purchase, so you know exactly what you are
            getting.
          </p>
        </div>

        <div className="mt-14 border-t border-white/10 pt-10 sm:mt-16">
          <MarketplaceBrowser products={PRODUCTS} />
        </div>
      </main>
    </div>
  );
}
