import { ArrowRight } from "lucide-react";
import { MoatTyping } from "./MoatTyping";
import { btn, Kicker, PixelScene, Purple, ToolLogo } from "./kit";
import { BOOK_HREF, BUILDS, HERO_ART, MID_CTA, MODEL, MODEL_KICKER, STACK, STACK_HEADER, TOOLS } from "./content";

/** Left-aligned 7/5 heading row used by the blocks in this section. */
function SplitHeader({
  kicker,
  title,
  accent,
  summary,
  as: Tag = "h2",
}: {
  kicker: string;
  title: string;
  accent: string;
  summary: string;
  as?: "h2" | "h3";
}) {
  return (
    <div className="reveal mb-14 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <Kicker className="mb-5">{kicker}</Kicker>
        <Tag
          className={
            Tag === "h2"
              ? "text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl"
              : "text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-4xl lg:text-5xl"
          }
        >
          {title} <Purple>{accent}</Purple>
        </Tag>
      </div>
      <p className="text-base leading-snug text-text-muted md:text-lg lg:col-span-5">{summary}</p>
    </div>
  );
}

export function WhyUsSection() {
  return (
    <section id="why-us" className="relative border-t border-border-strong bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-6 sm:pt-32 lg:px-8 xl:px-4">
        <BuildCards />
        <MoatTyping />
        <StackList />
        <ModelList />
        <CtaBanner />
      </div>
    </section>
  );
}

function BuildCards() {
  return (
    <div id="work" className="scroll-mt-24">
      <SplitHeader kicker={BUILDS.kicker} title={BUILDS.title} accent={BUILDS.accent} summary={BUILDS.summary} />
      <div className="mb-20 grid grid-cols-1 gap-5 md:grid-cols-3">
        {BUILDS.items.map((item) => (
          <a
            key={item.title}
            href="#services"
            className="reveal group relative overflow-hidden border border-border-strong bg-card transition-all duration-300 hover:border-primary-purple/40"
          >
            <div className="flex items-center gap-2 border-b border-border-subtle px-3.5 py-2.5">
              <span className="size-2 rounded-full bg-red-500/70" />
              <span className="size-2 rounded-full bg-yellow-500/70" />
              <span className="size-2 rounded-full bg-green-500/70" />
              <span className="ml-2 truncate font-mono text-[10px] tracking-tight text-text-soft">{item.url}</span>
              <span className="ml-auto flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-text-soft">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                </span>
                Live
              </span>
            </div>
            <div className="relative aspect-4/3 overflow-hidden bg-black">
              <video
                src={item.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <p className="p-4 text-sm font-semibold leading-snug">{item.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

function StackList() {
  return (
    <section className="mb-20 border-t border-border-subtle pt-10">
      <SplitHeader as="h3" {...STACK_HEADER} />
      <ul className="divide-y divide-border-strong border-y border-border-strong">
        {STACK.map((row) => (
          <li key={row.category} className="grid grid-cols-1 gap-6 py-8 md:py-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-3">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-text-soft">Category</p>
              <h4 className="text-xl font-bold leading-tight tracking-[-0.01em] md:text-2xl">{row.category}</h4>
              <span className="mt-4 inline-flex items-center gap-2 border border-primary-purple/25 bg-primary-purple/10 px-2.5 py-1 text-[11px] font-semibold text-primary-purple">
                {row.badge}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-9">
              {row.tools.map((tool) => (
                <div
                  key={tool.slug}
                  className="group relative border border-border-strong bg-card p-5 transition-colors hover:border-primary-purple/40"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center">
                      <ToolLogo slug={tool.slug} className="h-7 w-7" />
                    </span>
                    <span className="text-base font-bold leading-tight">{TOOLS[tool.slug].title}</span>
                  </div>
                  <p className="text-[13px] leading-snug text-text-muted">{tool.note}</p>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ModelList() {
  return (
    <div className="mb-16 border-t border-border-subtle pt-10">
      <Kicker className="mb-10">{MODEL_KICKER}</Kicker>
      <ul className="divide-y divide-border-strong border-y border-border-strong">
        {MODEL.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="reveal grid grid-cols-1 items-center gap-6 py-8 md:py-10 lg:grid-cols-12 lg:gap-10">
              <span className="text-2xl font-extrabold leading-none tracking-tight tabular-nums text-text-soft md:text-3xl lg:col-span-1">
                {item.id}
              </span>
              <div className="lg:col-span-8">
                <h4 className="text-2xl font-bold leading-tight tracking-[-0.02em] md:text-4xl">{item.title}</h4>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">{item.body}</p>
              </div>
              <div className="flex lg:col-span-3 lg:justify-end">
                <div className="relative aspect-square w-full max-w-[260px] overflow-hidden border border-border-strong md:max-w-[300px] lg:max-w-[220px]">
                  <PixelScene src={HERO_ART.light} darkSrc={HERO_ART.dark} className="absolute inset-0 h-full w-full" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-20 w-20 items-center justify-center border border-border bg-card/90 text-primary-purple shadow-xl backdrop-blur-sm">
                      <Icon className="h-9 w-9" aria-hidden="true" />
                    </span>
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CtaBanner() {
  return (
    <div className="reveal relative overflow-hidden border border-foreground/10 bg-foreground text-background">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(700px_350px_at_70%_50%,rgba(128,130,193,0.25),transparent_70%)]" />
      <div className="relative grid grid-cols-1 items-center gap-8 px-7 py-12 md:px-12 md:py-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h3 className="text-3xl font-bold leading-[1.05] tracking-[-0.02em] md:text-5xl">{MID_CTA.title}</h3>
          <p className="mt-5 max-w-2xl text-base leading-snug text-background/70 md:text-lg">{MID_CTA.body}</p>
        </div>
        <div className="lg:col-span-4 lg:text-right">
          <a href={BOOK_HREF} className={btn.purple}>
            <span className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-500/60 to-transparent" />
            {MID_CTA.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
