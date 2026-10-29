import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { btn, PixelScene } from "./kit";
import { BOOK_HREF, HERO, HERO_ART } from "./content";

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden pt-20 text-foreground transition-colors duration-500 xl:h-screen xl:max-h-screen xl:pt-0"
    >
      {/* Layers, back to front: artwork, wash, dot grid, line grid, centre vignette. */}
      <PixelScene
        src={HERO_ART.light}
        darkSrc={HERO_ART.dark}
        className="absolute inset-0 -z-10 h-full w-full opacity-90 dark:opacity-50"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background/15 via-background/10 to-background/20" />
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "radial-gradient(circle, var(--hero-dot-color) 1.2px, transparent 1.2px)",
          backgroundSize: "7px 7px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 10%, rgba(0,0,0,.7) 30%, rgba(0,0,0,.3) 50%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(var(--hero-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--hero-grid-color) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(to top, black, transparent 60%)",
        }}
      />
      {/* Soft glow just behind the text; wider on phones, where the text spans the screen. */}
      <div
        className="absolute inset-0 -z-10 [--glow-w:90%] md:[--glow-w:50%]"
        style={{
          background:
            "radial-gradient(ellipse var(--glow-w) 42% at 50% 50%, color-mix(in srgb, var(--background) 95%, transparent) 0%, color-mix(in srgb, var(--background) 85%, transparent) 40%, color-mix(in srgb, var(--background) 45%, transparent) 75%, transparent 100%)",
        }}
      />
      <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-border to-transparent opacity-30" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center px-4 py-10 sm:py-16 md:px-6 md:py-20 xl:px-4 xl:py-8">
        <div className="mx-auto max-w-5xl shrink-0 pt-6 text-center sm:pt-16 md:pt-24 xl:pt-8">
          <h1 className="mb-4 text-4xl font-bold leading-none sm:mb-8 sm:text-6xl md:text-8xl lg:text-9xl xl:mb-6 xl:text-7xl">
            <span className="mb-2 block bg-linear-to-br from-foreground to-foreground/70 bg-clip-text tracking-tighter text-transparent sm:mb-4 xl:mb-2 dark:from-white dark:to-white/40">
              {HERO.lineOne}
            </span>
            <span className="my-3 block font-semibold tracking-tighter text-primary-purple sm:my-6 xl:my-4">
              {HERO.big}
            </span>
            <span className="relative mx-auto mt-3 block w-fit text-xl font-normal tracking-normal text-muted-foreground sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl xl:mt-2 xl:text-3xl">
              {HERO.lineThree}
              <svg
                aria-hidden="true"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-2.5 w-full text-primary-purple"
              >
                <path d="M2 8 C 60 2, 120 11, 180 6 S 270 3, 298 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mx-auto mb-6 max-w-2xl text-sm font-medium leading-relaxed text-muted-foreground sm:mb-10 sm:text-lg md:text-xl xl:mb-6">
            {HERO.summary}
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6 xl:gap-4">
            <a href={BOOK_HREF} className={btn.heroPrimary}>
              {HERO.primaryCta}
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#services" className={btn.heroSecondary}>
              {HERO.secondaryCta}
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <p className="mt-4 text-[11px] font-medium uppercase tracking-widest text-muted-foreground/70">{HERO.micro}</p>
          <Link
            href="#newsletter"
            className="mt-5 inline-block text-xs font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-primary-purple"
          >
            {HERO.teardownsLink}
          </Link>
        </div>
      </div>
    </section>
  );
}
