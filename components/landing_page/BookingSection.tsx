import { Check, Mail } from "lucide-react";
import { LeadForm } from "./LeadForm";
import { Eyebrow, PlaceholderTag } from "./SectionShell";
import { BOOKING, CONTACT_EMAIL } from "./content";

export function BookingSection() {
  return (
    <section id="book" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal grid gap-10 rounded-3xl border border-border bg-surface-1 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-14">
          <div>
            <Eyebrow>Free consultation</Eyebrow>
            <h2 className="text-display text-gradient mt-4 text-4xl font-bold leading-[1.02] tracking-tighter sm:text-5xl">
              {BOOKING.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{BOOKING.body}</p>

            <ul className="mt-8 space-y-3">
              {BOOKING.checklist.map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground/85">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15">
                    <Check className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-4 rounded-2xl border border-border bg-surface-2 p-4">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-surface-4 font-mono text-lavender">
                {BOOKING.host.role.charAt(0)}
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-surface-2 bg-emerald-400" />
              </span>
              <span className="flex-1">
                <span className="block font-medium text-foreground">{BOOKING.host.name}</span>
                <span className="block text-sm text-muted-foreground">{BOOKING.host.role}</span>
              </span>
              {BOOKING.host.placeholder && <PlaceholderTag />}
            </div>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Prefer email? {CONTACT_EMAIL}
            </a>
          </div>

          <LeadForm />
        </div>
      </div>
    </section>
  );
}
