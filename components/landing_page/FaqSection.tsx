import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionShell } from "./SectionShell";
import { CONTACT_EMAIL, FAQ } from "./content";

export function FaqSection() {
  return (
    <SectionShell id="faq" eyebrow="FAQ" title="Questions, answered.">
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="reveal divide-y divide-border rounded-3xl border border-border bg-surface-2">
          {FAQ.map((item, i) => (
            <details key={item.q} className="group px-6" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-lg font-medium text-foreground">
                {item.q}
                <Plus
                  className="h-5 w-5 shrink-0 text-indigo-400 transition-transform group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-6 leading-7 text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>

        <div className="reveal flex h-fit flex-col rounded-3xl border border-border bg-surface-2 p-8">
          <h3 className="text-display text-2xl font-semibold text-foreground">Still have questions?</h3>
          <p className="mt-3 text-muted-foreground">
            Ask us anything. A real person replies within one business day.
          </p>
          <Button asChild size="lg" variant="outline" className="mt-8 self-start">
            <a href={`mailto:${CONTACT_EMAIL}`}>Ask a question</a>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
