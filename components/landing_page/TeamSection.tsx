import Image from "next/image";
import { Users } from "lucide-react";
import { Accent, PlaceholderTag, SectionShell } from "./SectionShell";
import { TEAM, TEAM_EXTRA } from "./content";

export function TeamSection() {
  return (
    <SectionShell
      id="team"
      eyebrow="Our team"
      title={
        <>
          The minds behind <Accent>the agents.</Accent>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((member, i) => (
          <div key={i} className="reveal overflow-hidden rounded-3xl border border-border bg-surface-2">
            <div className="relative aspect-4/5 bg-linear-to-br from-surface-4 to-surface-1">
              {member.photo ? (
                <Image src={member.photo} alt={member.name} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
              ) : (
                <span className="text-display absolute inset-0 flex items-center justify-center text-6xl font-bold text-foreground/10">
                  {member.name.replace(/[^A-Za-z]/g, "").charAt(0)}
                </span>
              )}
              {member.placeholder && (
                <span className="absolute left-4 top-4">
                  <PlaceholderTag />
                </span>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
              <p className="font-mono text-[11px] uppercase tracking-widest text-lavender">{member.role}</p>
              <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
            </div>
          </div>
        ))}

        <div className="reveal flex flex-col justify-between rounded-3xl border border-primary/25 bg-linear-to-br from-primary/20 to-surface-2 p-6">
          <div className="flex items-center justify-between">
            <Users className="h-6 w-6 text-indigo-400" aria-hidden="true" />
            {TEAM_EXTRA.placeholder && <PlaceholderTag />}
          </div>
          <div>
            <p className="text-display text-6xl font-bold tracking-tighter text-foreground">{TEAM_EXTRA.value}</p>
            <p className="mt-2 text-muted-foreground">{TEAM_EXTRA.label}</p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
