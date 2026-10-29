"use client";

import * as React from "react";
import { Ember, type EmberPose } from "./Ember";
import {
  easeIn,
  easeInOut,
  beat,
  EMBER_SPEED,
  isAbort,
  lerp,
  sleep,
  spawnSpark,
  tween,
  whenVisible,
  type Point,
} from "./motion";

/**
 * Ember rides down the left edge of its parent, stopping beside each
 * data-ember="stop" element in turn and adding the `rail-lit` class to it, so
 * a list can be "checked off" one row at a time. Render it as the last child
 * of a positioned element. Clicking Ember at the end replays the ride.
 */
export function EmberRail({
  poses,
  endPose = "waving",
  inset = 3,
}: {
  /** Pose at each stop, in order; the last one repeats if there are more stops. */
  poses: EmberPose[];
  endPose?: EmberPose;
  /** Distance of the rail from the parent's left edge, in px. */
  inset?: number;
}) {
  const layerRef = React.useRef<HTMLDivElement>(null);
  const emberRef = React.useRef<HTMLDivElement>(null);
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const runRef = React.useRef<AbortController | null>(null);

  const [pose, setPose] = React.useState<EmberPose>("surprised");
  const [home, setHome] = React.useState(false);
  const [size, setSize] = React.useState(32);
  // Compare poses by value so a new array with the same poses doesn't restart the ride.
  const poseKey = poses.join(",");

  const run = React.useCallback(
    (animate: boolean) => {
      runRef.current?.abort();
      const controller = new AbortController();
      runRef.current = controller;
      const { signal } = controller;

      const layer = layerRef.current;
      const ember = emberRef.current;
      const container = layer?.parentElement;
      if (!layer || !ember || !container) return;

      const stopPoses = poseKey.split(",") as EmberPose[];
      const stops = Array.from(container.querySelectorAll<HTMLElement>('[data-ember="stop"]'));
      if (stops.length === 0) return;

      const emberSize = window.innerWidth >= 640 ? 36 : 28;
      setSize(emberSize);

      // Ember stands on the rail, vertically centred on the stop.
      const stopPoint = (el: HTMLElement): Point => {
        const base = container.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        return { x: inset, y: r.top - base.top + r.height / 2 + emberSize / 2 };
      };
      let pos: Point = stopPoint(stops[0]);
      const place = (p: Point) => {
        pos = p;
        ember.style.transform = `translate3d(${p.x - emberSize / 2}px, ${p.y - emberSize}px, 0)`;
      };
      const squash = () =>
        bodyRef.current?.animate(
          [{ transform: "scale(1.2, 0.8)" }, { transform: "scale(1, 1)" }],
          { duration: 260 / EMBER_SPEED, easing: "cubic-bezier(.3,1.6,.5,1)" },
        );

      if (!animate) {
        stops.forEach((s) => s.classList.add("rail-lit"));
        place(stopPoint(stops[stops.length - 1]));
        ember.style.opacity = "1";
        setPose(endPose);
        setHome(true);
        return;
      }

      (async () => {
        stops.forEach((s) => s.classList.remove("rail-lit"));
        setHome(false);
        ember.style.opacity = "0";

        await whenVisible(stops[0], signal);
        await sleep(800, signal);

        const first = stopPoint(stops[0]);
        setPose("surprised");
        place({ x: first.x, y: first.y - 160 });
        ember.style.opacity = "1";
        await tween(420, (t) => place({ x: first.x, y: lerp(first.y - 160, first.y, t) }), signal, easeIn);
        squash();

        for (let i = 0; i < stops.length; i++) {
          if (i > 0) {
            await whenVisible(stops[i], signal);
            const from = { ...pos };
            const to = stopPoint(stops[i]);
            setPose("idle");
            let lastSpark = 0;
            await tween(
              480,
              (t) => {
                // Swing out from the edge a little on the way down.
                place({ x: from.x - Math.sin(Math.PI * t) * 14, y: lerp(from.y, to.y, t) });
                const now = performance.now();
                if (now - lastSpark > 50) {
                  lastSpark = now;
                  spawnSpark(layer, pos, emberSize * 0.3);
                }
              },
              signal,
              easeInOut,
            );
            squash();
          }
          stops[i].classList.add("rail-lit");
          setPose(stopPoses[Math.min(i, stopPoses.length - 1)]);
          await beat(900, signal);
        }

        setPose(endPose);
        setHome(true);
      })().catch((error) => {
        if (!isAbort(error)) throw error;
      });
    },
    [poseKey, endPose, inset],
  );

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setTimeout(() => run(!reduced), 300);

    let width = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      run(false);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", onResize);
      runRef.current?.abort();
    };
  }, [run]);

  return (
    <div ref={layerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
      <div
        ref={emberRef}
        onClick={home ? () => run(true) : undefined}
        title={home ? "Play again" : undefined}
        className={
          "absolute left-0 top-0 opacity-0 will-change-transform " +
          (home ? "pointer-events-auto cursor-pointer" : "")
        }
        style={{ width: size, height: size }}
      >
        <div ref={bodyRef} className="h-full w-full origin-bottom">
          <Ember
            pose={pose}
            className="h-full w-full overflow-visible drop-shadow-[0_6px_14px_rgba(255,60,0,0.35)]"
          />
        </div>
      </div>
    </div>
  );
}
