"use client";

import * as React from "react";
import { Ember, type EmberPose } from "@/components/mascot/Ember";
import {
  easeIn,
  easeInOut,
  isAbort,
  lerp,
  linear,
  beat,
  EMBER_SPEED,
  sleep,
  spawnSpark,
  tween,
  whenVisible,
  type Point,
} from "@/components/mascot/motion";

/**
 * Ember lights the services pipeline like a fuse: it drops onto the first
 * stage, then walks (side by side on desktop) or slides (stacked on mobile)
 * from stage to stage. The line burns orange behind it and each service lights
 * up as Ember reaches it, with a pose to match. Clicking Ember replays.
 *
 * Stages are found by data attributes inside the parent element:
 * data-ember="card" (each service) and data-ember="node" (its stop).
 */

// Pose at each stage: searching, clicks rolling in, building, booked.
const STAGE_POSES: EmberPose[] = ["thinking", "surprised", "building", "happy"];
const LIT = "service-lit";

export function ServicesEmberWalk() {
  const layerRef = React.useRef<HTMLDivElement>(null);
  const emberRef = React.useRef<HTMLDivElement>(null);
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const fillRef = React.useRef<HTMLDivElement>(null);
  const runRef = React.useRef<AbortController | null>(null);

  const [nodes, setNodes] = React.useState<Point[]>([]);
  const [litCount, setLitCount] = React.useState(0);
  const [pose, setPose] = React.useState<EmberPose>("surprised");
  const [walking, setWalking] = React.useState(false);
  const [home, setHome] = React.useState(false);
  const [size, setSize] = React.useState(44);

  const run = React.useCallback((animate: boolean) => {
    runRef.current?.abort();
    const controller = new AbortController();
    runRef.current = controller;
    const { signal } = controller;

    const layer = layerRef.current;
    const ember = emberRef.current;
    const fill = fillRef.current;
    const container = layer?.parentElement;
    if (!layer || !ember || !fill || !container) return;

    const cards = Array.from(container.querySelectorAll<HTMLElement>('[data-ember="card"]'));
    const anchors = Array.from(container.querySelectorAll<HTMLElement>('[data-ember="node"]'));
    if (anchors.length < 2) return;

    const emberSize = window.innerWidth >= 1024 ? 44 : 32;
    setSize(emberSize);

    const measure = () => {
      const base = container.getBoundingClientRect();
      const points = anchors.map((a) => {
        const r = a.getBoundingClientRect();
        return { x: r.left - base.left, y: r.top - base.top };
      });
      setNodes(points);
      return points;
    };
    let points = measure();
    const horizontal = () => Math.abs(points[1].x - points[0].x) > Math.abs(points[1].y - points[0].y);

    let pos: Point = points[0];
    const place = (p: Point) => {
      pos = p;
      ember.style.transform = `translate3d(${p.x - emberSize / 2}px, ${p.y - emberSize}px, 0)`;
      // The burnt part of the fuse runs from the first stage to Ember.
      const start = points[0];
      if (horizontal()) {
        Object.assign(fill.style, { left: `${start.x}px`, top: `${start.y - 1}px`, width: `${Math.max(0, p.x - start.x)}px`, height: "2px" });
      } else {
        Object.assign(fill.style, { left: `${start.x - 1}px`, top: `${start.y}px`, width: "2px", height: `${Math.max(0, p.y - start.y)}px` });
      }
    };
    const squash = (sx: number, sy: number, ms = 280) =>
      bodyRef.current?.animate(
        [{ transform: `scale(${sx}, ${sy})` }, { transform: "scale(1, 1)" }],
        { duration: ms / EMBER_SPEED, easing: "cubic-bezier(.3,1.6,.5,1)" },
      );
    const light = (count: number) => {
      setLitCount(count);
      cards.forEach((card, i) => card.classList.toggle(LIT, i < count));
    };

    const settle = () => {
      light(cards.length);
      points = measure();
      place(points[points.length - 1]);
      ember.style.opacity = "1";
      setWalking(false);
      setPose("waving");
      setHome(true);
    };

    if (!animate) {
      settle();
      return;
    }

    (async () => {
      light(0);
      setHome(false);
      ember.style.opacity = "0";
      place(points[0]);

      // Wait for the first service to be on screen and revealed.
      await whenVisible(cards[0], signal);
      await sleep(900, signal);
      points = measure();

      // Drop onto the first stage.
      const first = points[0];
      setPose("surprised");
      place({ x: first.x, y: first.y - 200 });
      ember.style.opacity = "1";
      await tween(480, (t) => place({ x: first.x, y: lerp(first.y - 200, first.y, t) }), signal, easeIn);
      place(first);
      squash(1.25, 0.75);

      for (let i = 0; i < points.length; i++) {
        light(i + 1);
        setPose(STAGE_POSES[Math.min(i, STAGE_POSES.length - 1)]);
        if (i === points.length - 1) break;
        await beat(1300, signal);

        // On stacked layouts, wait until the next service is in view.
        await whenVisible(cards[i + 1], signal);
        points = measure();
        const from = { ...pos };
        const to = points[i + 1];
        const distance = Math.hypot(to.x - from.x, to.y - from.y);
        const side = horizontal();

        setPose(side ? "idle" : "surprised");
        setWalking(side);
        let lastSpark = 0;
        await tween(
          side ? (distance / 240) * 1000 : Math.max(700, (distance / 520) * 1000),
          (t) => {
            place({ x: lerp(from.x, to.x, t), y: lerp(from.y, to.y, t) });
            const now = performance.now();
            if (now - lastSpark > 45) {
              lastSpark = now;
              spawnSpark(layer, pos, emberSize * 0.3);
            }
          },
          signal,
          side ? linear : easeInOut,
        );
        setWalking(false);
        squash(1.2, 0.8);
      }

      await beat(1400, signal);
      setPose("waving");
      setHome(true);
    })().catch((error) => {
      if (!isAbort(error)) throw error;
    });
  }, []);

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

  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  const horizontal = first && last && Math.abs(last.x - first.x) > Math.abs(last.y - first.y);

  return (
    <div ref={layerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
      {first && last && (
        <div
          className="absolute border-dashed border-white/20"
          style={
            horizontal
              ? { left: first.x, top: first.y, width: last.x - first.x, borderTopWidth: 1.5 }
              : { left: first.x, top: first.y, height: last.y - first.y, borderLeftWidth: 1.5 }
          }
        />
      )}
      <div
        ref={fillRef}
        className="absolute rounded-full bg-primary shadow-[0_0_12px_rgba(255,60,0,0.8)]"
      />
      {nodes.map((node, i) => (
        <span
          key={i}
          className={
            "absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-500 " +
            (i < litCount
              ? "border-primary bg-primary shadow-[0_0_14px_rgba(255,60,0,0.9)]"
              : "border-white/30 bg-[#0b0c11]")
          }
          style={{ left: node.x, top: node.y }}
        />
      ))}

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
            walking={walking}
            className="h-full w-full overflow-visible drop-shadow-[0_6px_14px_rgba(255,60,0,0.35)]"
          />
        </div>
      </div>
    </div>
  );
}
