import { Container, GridOverlay, Section, SectionHeader, TickCard, ToolLogo } from "./kit";
import { TOOL_CARDS, TOOLS_HEADER } from "./content";

/** "Powerful tools" row: tool cards scrolling left on a loop, paused on hover. */
export function ToolsMarquee() {
  return (
    <Section id="our-services" grid className="bg-background/50">
      <Container>
        <SectionHeader title={TOOLS_HEADER.title} accent={TOOLS_HEADER.accent} summary={TOOLS_HEADER.summary} />
      </Container>

      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-8 bg-linear-to-r from-background to-transparent sm:w-20" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-8 bg-linear-to-l from-background to-transparent sm:w-20" />
        {/* Two copies side by side; the track slides left by half for a seamless loop. */}
        <div className="flex w-max animate-infinite-scroll gap-6 py-4">
          {[0, 1].map((copy) =>
            TOOL_CARDS.map((tool) => (
              <TickCard
                key={`${copy}-${tool.slug}`}
                className="flex h-96 w-80 shrink-0 flex-col shadow-sm sm:w-96"
              >
                <GridOverlay />
                <div
                  aria-hidden={copy === 1}
                  className="relative flex h-64 w-full items-center justify-center gap-4 overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${tool.from}, ${tool.to})` }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-size-[8px_8px]" />
                  <ToolLogo slug={tool.slug} color="#ffffff" className="relative h-14 w-14 drop-shadow-lg" />
                  <span className="relative text-2xl font-bold text-white drop-shadow">{tool.title}</span>
                </div>
                <div className="relative flex flex-1 flex-col justify-between p-4" aria-hidden={copy === 1}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center border border-border bg-muted">
                      <ToolLogo slug={tool.slug} className="h-4 w-4" />
                    </span>
                    <span className="text-lg font-semibold">{tool.title}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{tool.body}</p>
                </div>
              </TickCard>
            )),
          )}
        </div>
      </div>
    </Section>
  );
}
