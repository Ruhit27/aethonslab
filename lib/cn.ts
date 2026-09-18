import { cn } from "./utils";

export { cn };

export function cnHeader(scrolled: boolean) {
  return cn(
    "fixed left-0 right-0 top-0 z-50",
    "border-b border-transparent transition-all duration-300",
    scrolled ? "glass-panel border-white/10" : "bg-transparent",
  );
}

export function cnCardLink(extra: string) {
  return cn("group block", extra);
}

export function cnProductCard(extra: string) {
  return cn("reveal group overflow-hidden", extra);
}
