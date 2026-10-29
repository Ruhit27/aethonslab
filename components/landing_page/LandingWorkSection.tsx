import Image from "next/image";
import { Ember } from "@/components/mascot/Ember";
import { WORK, type WorkItem } from "../constants";

function ProjectLogo({ item }: { item: WorkItem }) {
  const mark = item.logo ? (
    <Image
      src={item.logo}
      alt={item.title}
      width={160}
      height={48}
      className="h-10 w-auto object-contain opacity-60 brightness-0 invert transition-opacity group-hover:opacity-100"
    />
  ) : (
    <span
      className={`whitespace-nowrap text-white/55 transition-colors group-hover:text-white ${item.wordmarkClass}`}
    >
      {item.title}
    </span>
  );

  const body = (
    <>
      {mark}
      <span className="whitespace-nowrap text-mono text-[10px] uppercase tracking-[0.24em] text-white/30 transition-colors group-hover:text-white/55">
        {item.category.split(" - ")[0]}
      </span>
    </>
  );

  const className =
    "group flex h-24 shrink-0 flex-col items-center justify-center gap-2 px-10 sm:px-14";

  return item.href ? (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      title={`${item.title} - visit site`}
      className={className}
    >
      {body}
    </a>
  ) : (
    <div title={item.title} className={className}>
      {body}
    </div>
  );
}

export function LandingWorkSection() {
  return (
    <section id="work" aria-label="Selected work" className="py-12 sm:py-16">
      <div className="reveal relative">
        {/* Ember walks on the strip while the logos slide under it. */}
        <Ember
          pose="idle"
          walking
          className="absolute bottom-full left-[14%] z-10 -mb-px h-9 w-9 overflow-visible sm:h-10 sm:w-10"
        />
        <div className="marquee overflow-hidden border-y border-white/10 mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {/* Two copies side by side; the track slides left by half for a seamless loop. */}
          <div className="marquee-track flex w-max">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 items-center divide-x divide-white/10"
                aria-hidden={copy === 1}
                inert={copy === 1}
              >
                {WORK.map((item) => (
                  <ProjectLogo key={item.id} item={item} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
