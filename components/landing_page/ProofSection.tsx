import { Plus } from "lucide-react";
import { Container, GridOverlay, Section, SectionHeader } from "./kit";
import { BOOK_HREF, PARTNERS, STATS, WORK } from "./content";

const tileClass =
  "group relative flex min-h-24 items-center justify-center overflow-hidden border border-border bg-card px-4 py-4 transition-all duration-300 hover:border-primary-purple/50 hover:bg-muted/50 sm:min-h-28 sm:px-6 sm:py-5 md:min-h-32";

/** Logo wall of clients and past builds, then headline stats. */
export function ProofSection() {
  return (
    <Section grid className="bg-background/50">
      <Container>
        <SectionHeader eyebrow={PARTNERS.eyebrow} title={PARTNERS.title} accent={PARTNERS.accent} gradient={false} />

        <div className="mb-24 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 md:gap-6">
          {WORK.map((item) => {
            const content = (
              <>
                <GridOverlay />
                <span className="pointer-events-none absolute left-0 top-0 h-[3px] w-[3px] border-l border-t border-transparent group-hover:border-primary-purple/50" />
                <span className="pointer-events-none absolute bottom-0 right-0 h-[3px] w-[3px] border-b border-r border-transparent group-hover:border-primary-purple/50" />
                <span
                  className={`relative z-10 text-center text-foreground/70 transition-colors group-hover:text-foreground ${item.wordmarkClass}`}
                >
                  {item.title}
                </span>
              </>
            );
            return item.href ? (
              <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer" className={`reveal ${tileClass}`}>
                {content}
              </a>
            ) : (
              <div key={item.id} className={`reveal ${tileClass}`}>
                {content}
              </div>
            );
          })}
          <a href={BOOK_HREF} className={`reveal ${tileClass} border-dashed`}>
            <span className="relative z-10 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary-purple">
              <Plus className="h-4 w-4" aria-hidden="true" />
              {PARTNERS.nextTile}
            </span>
          </a>
        </div>

        <div className="mt-12 text-center sm:mt-16">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8 sm:gap-12">
                {i > 0 && <span aria-hidden="true" className="hidden h-8 w-px bg-border sm:block" />}
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary-purple sm:text-3xl">{stat.value}</span>
                  <span className="font-medium text-muted-foreground">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
          {STATS.some((s) => s.placeholder) && (
            <p className="mt-3 text-[11px] uppercase tracking-widest text-amber-600 dark:text-amber-300/80">
              Placeholder numbers: replace in content.ts
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}
