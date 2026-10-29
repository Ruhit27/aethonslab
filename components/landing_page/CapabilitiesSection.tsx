import * as React from "react";
import {
  BarChart3,
  Check,
  Clock,
  Code2,
  Compass,
  Gauge,
  Layers,
  RefreshCw,
  Search,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, GridOverlay, PixelScene, Section, SectionHeader, TickCard, ToolLogo } from "./kit";
import { AGENT_SNIPPET, CAPABILITIES, CAPABILITIES_HEADER, HERO_ART } from "./content";

/**
 * Five-card bento. One grid that reflows: 1 column on phones, 2 on tablets
 * (strategy spans both), 3 on desktop (workflows spans two).
 */
export function CapabilitiesSection() {
  const c = CAPABILITIES;
  return (
    <Section id="services" grid className="bg-background/50">
      <Container>
        <SectionHeader {...CAPABILITIES_HEADER} />
        <div className="grid grid-cols-1 pl-px pt-px md:grid-cols-2 lg:min-h-[600px] lg:grid-cols-3">
          <BentoCard title={c.tasks.title} body={c.tasks.body}>
            <TaskList />
          </BentoCard>
          <BentoCard title={c.workflows.title} body={c.workflows.body} className="lg:col-span-2">
            <LogoCloud />
          </BentoCard>
          <BentoCard title={c.agents.title} body={c.agents.body}>
            <CodeWindow />
          </BentoCard>
          <BentoCard title={c.intelligence.title} body={c.intelligence.body}>
            <ResearchMock />
          </BentoCard>
          <BentoCard title={c.strategy.title} body={c.strategy.body} className="md:col-span-2 lg:col-span-1">
            <StrategyArt />
          </BentoCard>
        </div>
      </Container>
    </Section>
  );
}

function BentoCard({
  title,
  body,
  className,
  children,
}: React.PropsWithChildren<{ title: string; body: string; className?: string }>) {
  return (
    <TickCard className={cn("reveal -ml-px -mt-px min-h-[400px]", className)}>
      <GridOverlay />
      <div className="relative z-10 flex h-full flex-col p-4 sm:p-6">
        <div className="flex flex-1 items-center justify-center">{children}</div>
        <div className="space-y-2 pt-6 text-left">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
          <p className="text-sm font-medium tracking-tight text-muted-foreground">{body}</p>
        </div>
      </div>
    </TickCard>
  );
}

function TaskList() {
  const icon = {
    done: <Check className="h-4 w-4 text-green-600" aria-hidden="true" />,
    running: <RefreshCw className="h-4 w-4 animate-spin text-primary-purple [animation-duration:2.5s]" aria-hidden="true" />,
    queued: <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />,
  };
  return (
    <ul className="w-full max-w-md space-y-3">
      {CAPABILITIES.tasks.rows.map((row) => (
        <li
          key={row.label}
          className={cn(
            "flex items-center gap-3 border border-border bg-muted/40 p-3",
            row.state === "queued" && "opacity-80 [filter:blur(0.8px)]",
          )}
        >
          {icon[row.state as keyof typeof icon]}
          <span className={cn("flex-1 text-sm", row.state === "running" ? "font-medium text-foreground" : "text-muted-foreground")}>
            {row.label}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{row.state}</span>
        </li>
      ))}
    </ul>
  );
}

function LogoCloud() {
  return (
    <ul className="grid w-full grid-cols-5 gap-3 sm:grid-cols-7 lg:grid-cols-9">
      {CAPABILITIES.workflows.tools.map((slug, i) => (
        <li
          key={slug}
          className="reveal flex aspect-square items-center justify-center border border-border bg-white/95 shadow-lg transition-transform hover:scale-110 dark:bg-white/90"
          style={{ transitionDelay: `${(i % 9) * 40 + Math.floor(i / 9) * 80}ms` }}
        >
          <ToolLogo slug={slug} className="h-1/2 w-1/2" />
        </li>
      ))}
    </ul>
  );
}

function CodeWindow() {
  const lines = AGENT_SNIPPET.split("\n");
  return (
    <div className="w-full max-w-lg border border-border">
      <div className="flex items-center justify-between border-b border-border bg-muted/80 p-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-primary-purple" />
        </div>
        <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          {CAPABILITIES.agents.file}
          <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
      <div className="bg-muted/40 p-4 font-mono text-sm">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-3">
            <span className="w-4 shrink-0 text-right text-xs leading-5 text-muted-foreground/40">{i + 1}</span>
            <pre className="overflow-hidden text-xs font-medium leading-5 text-primary-purple">{line || " "}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResearchMock() {
  const icons = [TrendingUp, Users, BarChart3];
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="flex items-center gap-2 border border-border bg-card p-2 pl-3">
        <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <span className="flex-1 text-sm text-muted-foreground">{CAPABILITIES.intelligence.placeholder}</span>
        <span className="border border-border bg-muted px-2.5 py-1 text-xs font-medium">Research</span>
      </div>
      {CAPABILITIES.intelligence.rows.map((row, i) => {
        const Icon = icons[i % icons.length];
        return (
          <div key={row} className="flex items-center gap-3 border border-border bg-muted/40 p-3">
            <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span className="flex-1 text-sm font-medium">{row}</span>
            <TrendingUp className="h-3.5 w-3.5 text-primary-purple" aria-hidden="true" />
          </div>
        );
      })}
    </div>
  );
}

/** Ring of strategy steps around a central node, over the pixel landscape. */
function StrategyArt() {
  const nodes = [Search, Target, Layers, Gauge, Compass];
  return (
    <div className="relative h-[250px] w-full overflow-hidden border border-border">
      <PixelScene src={HERO_ART.light} darkSrc={HERO_ART.dark} className="absolute inset-0 h-full w-full opacity-70" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-44 w-44">
          <div className="absolute inset-4 rounded-full border-2 border-dashed border-primary-purple/40" />
          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-border bg-card font-bold text-primary-purple shadow-xl">
            AI
          </span>
          {nodes.map((Icon, i) => {
            const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <span
                key={i}
                className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-primary-purple shadow-lg"
                style={{ left: `${50 + Math.cos(angle) * 40}%`, top: `${50 + Math.sin(angle) * 40}%` }}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
