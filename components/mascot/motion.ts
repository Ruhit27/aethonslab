/**
 * Small animation helpers shared by Ember's walks. Every wait takes an
 * AbortSignal so a walk can be cancelled (replay, resize, unmount).
 */

export type Point = { x: number; y: number };

/**
 * How many times faster than the original choreography Ember moves: every
 * tween, beat and squash is divided by it. The CSS loops (walk, hop, check
 * pop) read the matching --ember-speed in globals.css.
 */
export const EMBER_SPEED = 2;

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
export const easeIn = (t: number) => t * t;
export const linear = (t: number) => t;

/** A pause in Ember's choreography, sped up by EMBER_SPEED. */
export function beat(ms: number, signal: AbortSignal) {
  return sleep(ms / EMBER_SPEED, signal);
}

/** A real-time wait, for things Ember doesn't control (reveal transitions). */
export function sleep(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(id);
        reject(signal.reason);
      },
      { once: true },
    );
  });
}

export function tween(
  ms: number,
  onFrame: (t: number) => void,
  signal: AbortSignal,
  ease = easeInOut,
) {
  return new Promise<void>((resolve, reject) => {
    const start = performance.now();
    const duration = ms / EMBER_SPEED;
    let id = 0;
    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      onFrame(ease(t));
      if (t < 1) id = requestAnimationFrame(frame);
      else resolve();
    };
    id = requestAnimationFrame(frame);
    signal.addEventListener(
      "abort",
      () => {
        cancelAnimationFrame(id);
        reject(signal.reason);
      },
      { once: true },
    );
  });
}

// Resolves once `el` is comfortably on screen, so on small screens each part
// of a walk waits for the visitor to scroll to it.
export function whenVisible(el: HTMLElement, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          resolve();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    signal.addEventListener(
      "abort",
      () => {
        observer.disconnect();
        reject(signal.reason);
      },
      { once: true },
    );
  });
}

/** A spark that drifts down and fades, for flight and fuse trails. */
export function spawnSpark(layer: HTMLElement, p: Point, spread: number) {
  const dot = document.createElement("span");
  dot.className = "ember-trail";
  dot.style.left = `${p.x + (Math.random() - 0.5) * spread}px`;
  dot.style.top = `${p.y}px`;
  dot.style.setProperty("--dx", `${(Math.random() - 0.5) * 30}px`);
  dot.style.setProperty("--dy", `${12 + Math.random() * 26}px`);
  if (Math.random() < 0.25) dot.style.background = "#68A7FF";
  layer.appendChild(dot);
  dot.addEventListener("animationend", () => dot.remove(), { once: true });
}

export function isAbort(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}
