"use client";

import { Moon, Sun } from "lucide-react";

/**
 * Sun/moon button that flips the `dark` class on <html> and remembers it.
 * Which icon shows is pure CSS, so it is right before hydration too.
 */
export function ThemeToggle() {
  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Private mode: the choice just won't persist.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark theme"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-primary-purple transition-colors hover:text-foreground"
    >
      <Sun className="h-4 w-4 dark:hidden" aria-hidden="true" />
      <Moon className="hidden h-4 w-4 dark:block" aria-hidden="true" />
    </button>
  );
}
