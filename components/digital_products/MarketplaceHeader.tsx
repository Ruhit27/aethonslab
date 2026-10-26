"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Products", href: "/digital-products" },
  { label: "Blogs", href: "/digital-products/blogs" },
];

/**
 * Header for the marketplace routes. The landing page header is not reused
 * because its nav is built from same-page hash anchors.
 */
export function MarketplaceHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-360 items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-3 text-display text-lg font-medium tracking-tight text-white"
        >
          <span className="h-2.5 w-2.5 rounded-sm bg-primary shadow-[0_0_16px_rgba(255,60,0,.55)]" />
          Aethon Lab
        </Link>

        <nav aria-label="Digital products" className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/digital-products"
                ? pathname === item.href ||
                  (pathname.startsWith("/digital-products/") &&
                    !pathname.startsWith("/digital-products/blogs"))
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-mono text-[11px] uppercase tracking-[0.24em] transition-colors",
                  active ? "text-primary" : "text-white/50 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/"
          className="hidden items-center gap-2 text-mono text-[11px] uppercase tracking-[0.24em] text-white/50 transition-colors hover:text-white sm:inline-flex"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to site
        </Link>
      </div>
    </header>
  );
}
