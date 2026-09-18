"use client";

import * as React from "react";

// This provider wraps content that uses the '.reveal' class for scroll-based animations.
// It initializes a single IntersectionObserver for all elements with the '.reveal' class
// within its children, ensuring the effect is managed globally for the wrapped content.
export function RevealOnScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []); // Empty dependency array ensures it runs once on mount

  return <>{children}</>;
}
