/**
 * Keeps pages that were designed for the old dark site dark, whatever theme
 * the homepage toggle is on. Remove once those pages get the light redesign.
 */
export function DarkScope({ children }: { children: React.ReactNode }) {
  return <div className="dark min-h-screen bg-background text-foreground">{children}</div>;
}
