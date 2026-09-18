import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Download, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MarketplaceHeader } from "@/components/digital_products/MarketplaceHeader";
import { ProductPreview } from "@/components/digital_products/preview/ProductPreview";
import {
  formatPrice,
  getAllSlugs,
  getProductBySlug,
} from "@/lib/digital-products/data";

type PageProps = { params: Promise<{ slug: string }> };

/** The catalogue is a fixed set, so anything else is a genuine 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found | Aethon Lab" };
  }

  return {
    title: `${product.title} | Aethon Lab`,
    description: product.shortDescription,
  };
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/10 py-3">
      <dt className="text-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
        {label}
      </dt>
      <dd className="text-right text-sm text-white/80">{value}</dd>
    </div>
  );
}

export default async function DigitalProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const extentLabel = product.format === "CSV" ? "Structure" : "Length";
  const extentValue =
    product.format === "CSV"
      ? `${product.preview.kind === "csv" ? product.preview.data.totalColumns : 0} columns`
      : `${product.pageCount} pages`;

  return (
    <div className="min-h-screen">
      <MarketplaceHeader />

      <main className="mx-auto max-w-360 px-6 pb-24 pt-10 sm:px-8 sm:pb-32 lg:px-12">
        <Link
          href="/digital-products"
          className="inline-flex items-center gap-2 text-mono text-[11px] uppercase tracking-[0.24em] text-white/45 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          All products
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
          <div className="min-w-0 space-y-10">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge
                  variant="outline"
                  className="border-white/12 bg-white/5 text-[10px] text-white/70"
                >
                  {product.category}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-primary/15 text-[10px] text-primary"
                >
                  {product.format}
                </Badge>
              </div>

              <h1 className="text-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.02] tracking-tighter text-white">
                {product.title}
              </h1>

              <p className="max-w-2xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                {product.description}
              </p>
            </div>

            <section className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-display text-2xl font-medium text-white">
                  Preview
                </h2>
                <span className="text-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Sample only
                </span>
              </div>

              <ProductPreview product={product} />

              {product.format === "CSV" && product.csvStructure && (
                <p className="text-sm leading-6 text-white/55">
                  <span className="text-white/75">File structure: </span>
                  {product.csvStructure}
                </p>
              )}
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/3">
              <div className="relative aspect-4/3 border-b border-white/10">
                <Image
                  src={product.thumbnail}
                  alt=""
                  fill
                  preload
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="space-y-6 p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-display text-4xl font-medium text-white">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    One-time
                  </span>
                </div>

                <Button
                  size="lg"
                  className="w-full rounded-full bg-primary text-black hover:bg-primary/90"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Buy and download
                </Button>

                <p className="text-center text-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                  Demo only &middot; no payment is taken
                </p>

                <dl className="border-t border-white/10 pt-2">
                  <SpecRow label="Format" value={product.format} />
                  <SpecRow label={extentLabel} value={extentValue} />
                  <SpecRow label="File size" value={product.fileSize} />
                  <SpecRow label="Updated" value={product.updatedAt} />
                </dl>

                <ul className="space-y-2.5">
                  {[
                    "Instant download after checkout",
                    "Free updates for twelve months",
                    "Personal and commercial use",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-6 text-white/60"
                    >
                      <Check
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2.5 border-t border-white/10 pt-5 text-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                  <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                  {product.format} &middot; {product.fileSize}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
