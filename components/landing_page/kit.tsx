/**
 * Shared building blocks for the homepage sections: containers, headers,
 * cards, button recipes and tool logos, so every section uses the same rules.
 */
import * as React from "react";
import { cn } from "@/lib/utils";
import { TOOLS, type ToolSlug } from "./content";

/** Page-width container used by every section. */
export function Container({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-4", className)}>
      {children}
    </div>
  );
}

/** Faint 24px graph-paper lines behind a section or card. */
export function GridOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]",
        className,
      )}
    />
  );
}

/** Small purple label with a pinging dot, above section headings. */
export function EyebrowPill({ children }: React.PropsWithChildren) {
  return (
    <span className="inline-flex items-center gap-2 border border-primary-purple/30 bg-primary-purple/10 px-3 py-1">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-purple opacity-50" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-purple" />
      </span>
      <span className="text-xs font-medium uppercase tracking-widest text-primary-purple">{children}</span>
    </span>
  );
}

/** Plain uppercase label used in the "why us" blocks. */
export function Kicker({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <p className={cn("text-[11px] font-semibold uppercase tracking-[0.18em] text-text-soft", className)}>
      {children}
    </p>
  );
}

/** Italic purple emphasis inside a heading. */
export function Purple({ children }: React.PropsWithChildren) {
  return <span className="italic text-primary-purple">{children}</span>;
}

/**
 * Centred section header: pill, big heading (gradient or solid) and subtitle.
 * `title` is the first line, `accent` the purple italic second line.
 */
export function SectionHeader({
  eyebrow,
  title,
  accent,
  summary,
  gradient = true,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  accent?: React.ReactNode;
  summary?: React.ReactNode;
  gradient?: boolean;
  align?: "center" | "left";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={cn("reveal mb-16", centered && "text-center", className)}>
      {eyebrow && (
        <div className="mb-6">
          <EyebrowPill>{eyebrow}</EyebrowPill>
        </div>
      )}
      <h2 className="mb-6 text-3xl font-medium leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        <span
          className={cn(
            gradient
              ? "bg-linear-to-br from-foreground to-foreground/50 bg-clip-text text-transparent dark:from-white dark:to-white/20"
              : "text-foreground",
          )}
        >
          {title}
        </span>
        {accent && (
          <>
            {" "}
            <Purple>{accent}</Purple>
          </>
        )}
      </h2>
      {summary && (
        <p
          className={cn(
            "max-w-3xl text-lg font-medium leading-relaxed text-muted-foreground md:text-xl",
            centered && "mx-auto",
          )}
        >
          {summary}
        </p>
      )}
    </div>
  );
}

/** Standard section shell: border, padding, optional grid overlay. */
export function Section({
  id,
  className,
  grid = false,
  children,
}: React.PropsWithChildren<{ id?: string; className?: string; grid?: boolean }>) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 overflow-hidden border-t border-border py-24 text-foreground transition-colors duration-500 sm:py-32",
        className,
      )}
    >
      {grid && <GridOverlay />}
      {children}
    </section>
  );
}

/** Square card with hover corner ticks and a soft purple glow. */
export function TickCard({
  className,
  children,
  as: Tag = "div",
}: React.PropsWithChildren<{ className?: string; as?: "div" | "li" | "article" }>) {
  return (
    <Tag
      className={cn(
        "group relative overflow-hidden border border-border bg-card transition-all duration-300 hover:border-primary-purple/50",
        className,
      )}
    >
      <span className="pointer-events-none absolute left-0 top-0 z-20 h-[3px] w-[3px] border-l border-t border-primary-purple/50 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-0 right-0 z-20 h-[3px] w-[3px] border-b border-r border-primary-purple/50 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="pointer-events-none absolute right-0 top-0 h-40 w-40 bg-primary-purple/5 opacity-0 blur-[80px] transition-all duration-300 group-hover:bg-primary-purple/10 group-hover:opacity-100" />
      {children}
    </Tag>
  );
}

/** Button recipes. Apply to <a> or <button>; corners are square throughout. */
export const btn = {
  heroPrimary:
    "group relative z-20 inline-flex w-full items-center justify-center gap-3 bg-foreground px-8 py-4 text-xs font-bold uppercase text-background transition-all hover:bg-primary-purple hover:text-white sm:w-auto sm:min-w-[250px] sm:px-12 sm:py-6",
  heroSecondary:
    "group relative z-20 inline-flex w-full items-center justify-center gap-3 bg-secondary px-8 py-4 text-xs font-bold uppercase text-foreground transition-all hover:bg-secondary/80 hover:text-primary-purple sm:w-auto sm:min-w-[250px] sm:px-12 sm:py-6",
  outline:
    "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden border border-border bg-background px-8 py-3 text-base font-medium text-foreground transition-all duration-300 hover:border-primary-purple hover:bg-muted",
  navOutline:
    "inline-flex h-10 items-center justify-center gap-2 border border-border bg-background px-4 text-sm font-medium shadow-xs transition-all hover:bg-accent dark:border-input dark:bg-input/30",
  navGold:
    "relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden border-2 border-yellow-400 bg-background px-5 text-sm font-medium text-foreground shadow-[0_0_20px_rgba(255,215,0,0.2),0_0_40px_rgba(255,215,0,0.1)] transition-all duration-300 hover:scale-105 hover:border-yellow-300",
  purple:
    "group relative inline-flex items-center justify-center gap-3 bg-primary-purple px-8 py-4 text-base font-bold text-white shadow-[0_14px_40px_-12px_rgba(128,130,193,0.7)] ring-1 ring-inset ring-white/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-700",
  gold: "group relative inline-flex items-center justify-center gap-3 bg-gold-500 px-8 py-4 text-base font-bold uppercase tracking-wide text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(251,191,36,0.5)] sm:px-12 sm:py-5 sm:text-lg",
};

/** The left-to-right purple wash that goes inside `btn.outline` buttons. */
export function OutlineWipe() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 -translate-x-full bg-primary-purple/5 transition-transform duration-500 group-hover/btn:translate-x-0"
    />
  );
}

const DARK_BRANDS = new Set<ToolSlug>(["anthropic", "github", "nextdotjs", "notion", "vercel", "typeform"]);

/** A tool's logo in its brand colour, from the single-colour SVG in /public/logos. */
export function ToolLogo({ slug, className, color }: { slug: ToolSlug; className?: string; color?: string }) {
  const tool = TOOLS[slug];
  return (
    <span
      role="img"
      aria-label={tool.title}
      data-dark-invert={DARK_BRANDS.has(slug) && !color ? "" : undefined}
      className={cn("tool-logo h-6 w-6 shrink-0", className)}
      style={
        {
          "--logo-url": `url(/logos/${slug}.svg)`,
          "--logo-color": color ?? tool.hex,
        } as React.CSSProperties
      }
    />
  );
}

/**
 * Pixel-art landscape. With `src` (and optional `darkSrc` for dark mode) it
 * shows the generated artwork from scripts/generate-hero-art.mjs; without,
 * it falls back to a simple SVG scene.
 */
export function PixelScene({ className, src, darkSrc }: { className?: string; src?: string; darkSrc?: string }) {
  if (src) {
    const layer = "bg-cover bg-center bg-no-repeat [image-rendering:pixelated]";
    return (
      <>
        <div
          aria-hidden="true"
          className={cn(layer, darkSrc && "dark:hidden", className)}
          style={{ backgroundImage: `url(${src})` }}
        />
        {darkSrc && (
          <div
            aria-hidden="true"
            className={cn(layer, "hidden dark:block", className)}
            style={{ backgroundImage: `url(${darkSrc})` }}
          />
        )}
      </>
    );
  }
  const hill = (base: number, amp: number, step: number, seed: number) => {
    let d = `M0 ${base}`;
    for (let x = 0; x <= 320; x += step) {
      const y = base - Math.round((Math.sin((x + seed) / 23) + Math.sin((x + seed * 2) / 9) * 0.4) * amp);
      d += ` H${x} V${y}`;
    }
    return `${d} H320 V180 H0 Z`;
  };
  const clouds = [
    [30, 28, 34], [120, 18, 26], [210, 34, 38], [270, 14, 22], [80, 52, 20],
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      className={className}
    >
      <defs>
        <linearGradient id="px-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fb7ee" />
          <stop offset="0.55" stopColor="#d7defa" />
          <stop offset="1" stopColor="#fbe7d6" />
        </linearGradient>
        <pattern id="px-dither" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="1" height="1" fill="#ffffff" opacity="0.35" />
          <rect x="2" y="2" width="1" height="1" fill="#ffffff" opacity="0.35" />
        </pattern>
      </defs>
      <rect width="320" height="180" fill="url(#px-sky)" />
      <rect x="44" y="64" width="20" height="20" fill="#f6a77c" />
      <rect x="40" y="68" width="28" height="12" fill="#f6a77c" />
      {clouds.map(([x, y, w]) => (
        <g key={`${x}-${y}`} fill="#fdf8f2">
          <rect x={x} y={y + 3} width={w} height="5" />
          <rect x={x + 4} y={y} width={w - 10} height="4" />
          <rect x={x + 8} y={y - 3} width={w / 3} height="4" />
        </g>
      ))}
      <path d={hill(118, 16, 4, 11)} fill="#b9b4e6" />
      <path d={hill(134, 14, 4, 47)} fill="#9d97d9" />
      {/* City skyline on the middle ridge */}
      <g fill="#8a84c8">
        <rect x="196" y="98" width="4" height="40" />
        <rect x="203" y="98" width="4" height="40" />
        <rect x="199" y="90" width="5" height="10" />
        <rect x="186" y="112" width="6" height="26" />
        <rect x="212" y="108" width="7" height="30" />
        <rect x="224" y="118" width="5" height="20" />
      </g>
      <path d={hill(150, 10, 4, 83)} fill="#7f9c6c" />
      <path d={hill(164, 7, 4, 131)} fill="#5f7f55" />
      <rect width="320" height="180" fill="url(#px-dither)" />
    </svg>
  );
}
