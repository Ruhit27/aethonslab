import { cn } from "@/lib/utils";

/** Aethon Lab wordmark: purple mark with a bold "A", then the name. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 md:gap-2.5", className)}>
      <span
        aria-hidden="true"
        className="flex h-7 w-7 items-center justify-center bg-primary-purple text-sm font-bold text-white md:h-9 md:w-9 md:text-base"
      >
        A
      </span>
      <span className="text-base font-semibold tracking-tight text-foreground md:text-xl">
        Aethon<span className="text-primary-purple">Lab</span>
      </span>
    </span>
  );
}
