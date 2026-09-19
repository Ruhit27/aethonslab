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
          <span className="text-mono text-[19px] uppercase tracking-[0.24em] text-white/45">
            Digital Products
          </span>
        
        </div>

        <div className="mt-14 border-t border-white/10 pt-10 sm:mt-16">
          <MarketplaceBrowser products={PRODUCTS} />
        </div>
      </main>
    </div>
  );
}
