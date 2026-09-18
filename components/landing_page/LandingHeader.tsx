"use client";

import * as React from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeaderLink } from "./HeaderLink";
import { cnHeader } from "../../lib/cn";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#products", label: "Products" },
  { href: "#process", label: "Process" },
  { href: "/digital-products", label: "Shop" },
  { href: "#contact", label: "Contact" },
];

export function LandingHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cnHeader(scrolled || menuOpen)}>
      <div className="max-w-360 mx-auto flex items-center justify-between px-6 py-5 sm:px-8 lg:px-12 ">
        <a
          href="#top"
          className="flex items-center gap-3 text-display text-lg font-medium tracking-tight"
        >
          <span className="h-2.5 w-2.5 rounded-sm bg-primary shadow-[0_0_16px_rgba(215,255,107,.55)]" />
          Aethon Lab
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <HeaderLink key={link.href} href={link.href}>
              {link.label}
            </HeaderLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="rounded-full border-white/12 bg-white/5"
          >
            <a href="#contact">
              Start a project
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>

        <Button
          size="sm"
          variant="ghost"
          className="md:hidden rounded-full px-3"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Menu className="h-4 w-4" aria-hidden="true" />
          )}
          {menuOpen ? "Close" : "Menu"}
        </Button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-5 border-t border-white/10 px-6 pb-6 pt-5 sm:px-8 md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          {NAV_LINKS.map((link) => (
            <HeaderLink key={link.href} href={link.href}>
              {link.label}
            </HeaderLink>
          ))}
          <Button
            asChild
            size="sm"
            variant="outline"
            className="mt-1 self-start rounded-full border-white/12 bg-white/5"
          >
            <a href="#contact">
              Start a project
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </nav>
      )}
    </header>
  );
}
