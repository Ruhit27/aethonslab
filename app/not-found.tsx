import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/landing_page/Logo";
import { btn, EyebrowPill, OutlineWipe } from "@/components/landing_page/kit";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 py-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href="/" aria-label="Aethon Lab home">
            <Logo />
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-32 text-center">
        <EyebrowPill>404</EyebrowPill>
        <h1 className="mt-8 text-4xl font-bold leading-[1.05] tracking-tighter sm:text-6xl">
          This page <span className="italic text-primary-purple">isn&apos;t here.</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg text-muted-foreground">
          The link may be out of date, or the page may have moved.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={btn.heroPrimary}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
          <Link href="/#consultation" className={btn.outline}>
            <span className="relative z-10 flex items-center gap-2">
              Book a call
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
            <OutlineWipe />
          </Link>
        </div>
      </main>
    </div>
  );
}
