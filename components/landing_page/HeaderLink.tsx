import * as React from "react";
import Link from "next/link";

export function HeaderLink({
  href,
  children,
}: React.PropsWithChildren<{ href: string }>) {
  const className =
    "text-mono text-[11px] uppercase tracking-[0.24em] text-white/50 transition-colors hover:text-white";

  // Same-page anchors stay plain <a>; real routes go through the router so
  // navigation is client-side and prefetched.
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
