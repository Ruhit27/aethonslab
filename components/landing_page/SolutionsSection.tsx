import { ArrowRight, CircleCheck } from "lucide-react";
import { btn, Container, EyebrowPill, OutlineWipe, PixelScene, Purple, Section } from "./kit";
import { BOOK_HREF, HERO_ART, SOLUTIONS, SOLUTIONS_HEADER } from "./content";

export function SolutionsSection() {
  const h = SOLUTIONS_HEADER;
  return (
    <Section id="how-we-do-it" className="bg-background">
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary-purple/5 opacity-50 blur-[120px] dark:opacity-100" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent-500/5 opacity-50 blur-[120px] dark:opacity-100" />
      <Container>
        <div className="reveal mb-16 text-center">
          <div className="mb-6">
            <EyebrowPill>{h.eyebrow}</EyebrowPill>
          </div>
          <h2 className="mb-6 text-3xl font-medium leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-foreground">{h.lineOne}</span> <Purple>{h.lineOneAccent}</Purple>
            <br />
            <span className="text-foreground">{h.lineTwo}</span>{" "}
            <span className="italic text-accent-500 line-through decoration-destructive/50 decoration-2">{h.struck}</span>
            <span className="ml-4 text-primary-purple">{h.fixed}</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">{h.summary}</p>
        </div>

        <div className="mb-16 grid gap-4 md:grid-cols-3 lg:gap-6">
          {SOLUTIONS.map((solution, i) => {
            const Icon = solution.icon;
            return (
              <div key={solution.title} className="reveal group flex h-full flex-col">
                <div className="relative mb-8 aspect-4/3 w-full overflow-hidden border border-border bg-muted/30">
                  <PixelScene
                    src={HERO_ART.light}
                    darkSrc={HERO_ART.dark}
                    className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle,var(--border)_1px,transparent_1px)] bg-size-[7px_7px] opacity-15" />
                  {/* Little app window, different per column */}
                  <div
                    className="absolute w-3/5 border border-border bg-card/95 shadow-xl backdrop-blur-sm"
                    style={{ left: `${12 + i * 8}%`, top: `${18 + (i % 2) * 8}%` }}
                  >
                    <div className="flex gap-1 border-b border-border px-2 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-purple" />
                    </div>
                    <div className="flex items-center gap-3 p-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary-purple text-white">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="flex-1 space-y-1.5">
                        <span className="block h-1.5 w-full bg-muted" />
                        <span className="block h-1.5 w-4/5 bg-muted" />
                        <span className="block h-1.5 w-3/5 bg-primary-purple/40" />
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-foreground">{solution.title}</h3>
                <p className="mb-6 text-sm font-medium leading-relaxed text-muted-foreground">{solution.body}</p>
                <ul className="mt-auto space-y-3">
                  {solution.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary-purple" aria-hidden="true" />
                      <span className="text-sm font-medium leading-relaxed text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a href={BOOK_HREF} className={btn.outline}>
            <span className="relative z-10 flex items-center gap-2">
              {h.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
            <OutlineWipe />
          </a>
        </div>
      </Container>
    </Section>
  );
}
