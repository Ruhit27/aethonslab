import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { btn } from "./kit";
import { BOOK_HREF, START_HERE, START_HERE_LABEL } from "./content";

/** The single centred CTA that sits between sections. */
export function CtaBand({ label = "Book a free automation audit" }: { label?: string }) {
  return (
    <div className="flex justify-center py-8">
      <a href={BOOK_HREF} className={btn.heroPrimary}>
        {label}
        <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}

export function StartHere() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 xl:px-4">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">{START_HERE_LABEL}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {START_HERE.map((tile) => (
          <Link
            key={tile.title}
            href={tile.href}
            className="group block border border-border p-4 transition-colors hover:border-foreground"
          >
            <span className="block text-sm font-semibold transition-colors group-hover:text-primary-purple">{tile.title}</span>
            <span className="mt-1 block text-xs text-muted-foreground">{tile.body}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
