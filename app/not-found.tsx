import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Ember } from "@/components/mascot/Ember";

export default function NotFound() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-360 items-center px-6 py-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-3 text-display text-lg font-medium tracking-tight text-white"
        >
          <Image src="/mascot/ember-mark.svg" alt="" width={28} height={28} />
          Aethon Lab
        </Link>
      </header>

      <main className="mx-auto flex max-w-360 flex-col items-start px-6 py-24 sm:px-8 lg:px-12">
        <Ember pose="oops" className="h-28 w-28 overflow-visible" />
        <span className="mt-8 text-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
          404
        </span>
        <h1 className="mt-5 max-w-2xl text-display text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.02] tracking-tighter text-white">
          Ember looked everywhere. This page isn&apos;t here.
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-8 text-white/60">
          The link may be out of date, or the page may have moved.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg" className="rounded-full bg-primary text-white hover:bg-primary/90">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white/12 bg-white/5 text-white hover:bg-white/10"
          >
            <Link href="/#contact">
              Contact us
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
