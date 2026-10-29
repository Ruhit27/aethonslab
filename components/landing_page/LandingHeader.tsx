"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { btn, PixelScene } from "./kit";
import {
  BOOK_HREF,
  FLAGSHIP_OFFER,
  HERO_ART,
  NAV_FEATURED,
  RESOURCE_GROUPS,
  SERVICE_GROUPS,
} from "./content";

type MenuId = "services" | "resources";

type MenuGroup = {
  name: string;
  items: { href: string; title: string; blurb: string; icon?: React.ComponentType<{ className?: string }> }[];
};

const MENUS: Record<MenuId, MenuGroup[]> = {
  services: SERVICE_GROUPS.map((group) => ({
    name: group.name,
    items: group.services.map((s) => ({ href: "#services", title: s.title, blurb: s.blurb, icon: s.icon })),
  })),
  resources: RESOURCE_GROUPS,
};

export function LandingHeader() {
  const [openMenu, setOpenMenu] = React.useState<MenuId | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setDrawerOpen(false);
      }
    };
    // Taps outside the bar close an open menu (touch has no mouseleave).
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <nav ref={navRef} className="fixed left-0 right-0 top-0 z-50 w-full" onMouseLeave={() => setOpenMenu(null)}>
      <div className="relative">
        <div className="border-b border-border bg-background/80 px-4 py-4 backdrop-blur-md transition-colors duration-300 md:px-6 lg:px-8 xl:px-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <a href="#top" aria-label="Aethon Lab home" className="md:ml-4">
              <Logo />
            </a>

            <div className="hidden items-center space-x-8 lg:flex">
              {(["services", "resources"] as const).map((id) => {
                const open = openMenu === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-expanded={open}
                    aria-controls={`${id}-menu`}
                    onMouseEnter={() => setOpenMenu(id)}
                    // Hover already opened it, so a mouse click keeps it open.
                    // Keyboard activation (detail 0) toggles.
                    onClick={(event) => setOpenMenu(open && event.detail === 0 ? null : id)}
                    className={cn(
                      "flex items-center gap-1 font-medium capitalize transition-colors",
                      open ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {id}
                    <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
                  </button>
                );
              })}
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <ThemeToggle />
              <a href={BOOK_HREF} className={btn.navOutline}>
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Book a Call
              </a>
              <a href={BOOK_HREF} className={btn.navGold}>
                <span aria-hidden="true" className="absolute inset-0 animate-pulse bg-linear-to-r from-yellow-400/10 via-transparent to-yellow-400/10" />
                <span className="relative z-10 flex items-center gap-2">
                  {FLAGSHIP_OFFER.label}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
            </div>

            <div className="flex items-center gap-1.5 lg:hidden">
              <ThemeToggle />
              <a
                href={BOOK_HREF}
                className="inline-flex items-center gap-1.5 whitespace-nowrap border border-border px-2.5 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary-purple"
              >
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                Book a Call
              </a>
              <button
                type="button"
                aria-expanded={drawerOpen}
                aria-controls="mobile-nav"
                aria-label={drawerOpen ? "Close menu" : "Open menu"}
                onClick={() => setDrawerOpen((v) => !v)}
                className="p-2 text-muted-foreground hover:text-foreground"
              >
                {drawerOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {(["services", "resources"] as const).map((id) => (
          <MegaPanel key={id} id={id} open={openMenu === id} onNavigate={() => setOpenMenu(null)} />
        ))}

        {drawerOpen && <MobileDrawer onNavigate={() => setDrawerOpen(false)} />}
      </div>
    </nav>
  );
}

function MegaPanel({ id, open, onNavigate }: { id: MenuId; open: boolean; onNavigate: () => void }) {
  const Featured = NAV_FEATURED.icon;
  return (
    <div
      id={`${id}-menu`}
      inert={!open}
      className={cn(
        "absolute left-0 right-0 top-full z-100 hidden transition-opacity duration-150 lg:block",
        open ? "visible opacity-100" : "pointer-events-none invisible opacity-0",
      )}
    >
      <div className="px-4 pb-6 pt-2 md:px-6 lg:px-8 xl:px-4">
        <div className="mx-auto grid max-h-[calc(100vh-6.5rem)] max-w-7xl grid-cols-12 overflow-y-auto border border-border bg-background shadow-xl">
          <div className="col-span-12 border-r border-border lg:col-span-8">
            {MENUS[id].map((group) => (
              <div key={group.name}>
                <p className="border-b border-border bg-muted/40 px-5 py-2 text-[11px] uppercase tracking-widest text-muted-foreground">
                  {group.name}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {group.items.map((item, i) => {
                    const Icon = item.icon;
                    const external = !item.href.startsWith("#");
                    const Comp = external ? Link : "a";
                    return (
                      <Comp
                        key={item.title}
                        href={item.href}
                        onClick={onNavigate}
                        className={cn(
                          "group flex items-start gap-4 border-b border-border px-5 py-4 transition-colors hover:bg-muted/30",
                          i % 2 === 0 && "md:border-r",
                        )}
                      >
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center text-muted-foreground transition-colors group-hover:text-primary-purple">
                          {Icon && <Icon className="h-4 w-4" />}
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-foreground transition-colors group-hover:text-primary-purple">
                            {item.title}
                          </span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{item.blurb}</span>
                        </span>
                      </Comp>
                    );
                  })}
                  {group.items.length % 2 === 1 && <div aria-hidden="true" className="hidden border-b border-border md:block" />}
                </div>
              </div>
            ))}
          </div>

          <a href={BOOK_HREF} onClick={onNavigate} className="group col-span-12 flex flex-col bg-card lg:col-span-4">
            <p className="border-b border-border bg-muted/40 px-5 py-2 text-[11px] uppercase tracking-widest text-muted-foreground">
              {NAV_FEATURED.kicker} content
            </p>
            <div className="relative aspect-16/10 overflow-hidden bg-[radial-gradient(circle_at_50%_40%,color-mix(in_srgb,var(--primary-purple)_24%,transparent),transparent_70%)]">
              <PixelScene
                src={HERO_ART.light}
                darkSrc={HERO_ART.dark}
                className="absolute inset-0 h-full w-full opacity-80 transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center bg-card/90 text-primary-purple shadow-lg">
                  <Featured className="h-7 w-7" />
                </span>
              </span>
            </div>
            <div className="px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary-purple/70">{NAV_FEATURED.kicker}</p>
              <h3 className="mt-1 text-base font-semibold text-foreground">{NAV_FEATURED.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{NAV_FEATURED.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary-purple underline-offset-4 group-hover:underline">
                {NAV_FEATURED.cta}
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

function MobileDrawer({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div
      id="mobile-nav"
      className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-border bg-background px-4 pb-6 lg:hidden"
    >
      {(["services", "resources"] as const).map((id) => (
        <details key={id} className="group border-b border-border py-3">
          <summary className="flex cursor-pointer list-none items-center justify-between text-base font-medium capitalize">
            {id}
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="mt-3 space-y-4">
            {MENUS[id].map((group) => (
              <div key={group.name}>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{group.name}</p>
                <ul className="mt-2 space-y-2">
                  {group.items.map((item) => (
                    <li key={item.title}>
                      <Link href={item.href} onClick={onNavigate} className="text-sm text-foreground/80 hover:text-primary-purple">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      ))}
      <a href={BOOK_HREF} onClick={onNavigate} className={cn(btn.navGold, "mt-5 w-full")}>
        <span className="relative z-10">{FLAGSHIP_OFFER.label}</span>
      </a>
    </div>
  );
}
