"use client";

import * as React from "react";
import { Ember, type EmberPose } from "@/components/mascot/Ember";
import {
  easeIn,
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
 * Ember walks the hero: drops onto the pilot-program line and lights each
 * word as it passes, then flies over to the example run and hops down the
 * timeline, reacting to every step. Ends waving at the "see it live" box;
 * clicking Ember replays the walk.
 *
 * Stops are found by data attributes inside the parent section:
 * data-ember="floor" (the line to walk), data-ember="word" (words to light)
 * and data-ember="step" (timeline rows, in order; the last one is home).
 */

// Pose Ember takes at each timeline step, in order.
const STEP_POSES: EmberPose[] = ["building", "surprised", "happy", "idle", "waving"];

const LIT = "ember-lit";
const ACTIVE = "ember-step-active";
const DONE = "ember-step-done";

export function HeroEmberWalk() {
  const layerRef = React.useRef<HTMLDivElement>(null);
  const emberRef = React.useRef<HTMLDivElement>(null);
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const runRef = React.useRef<AbortController | null>(null);

  const [pose, setPose] = React.useState<EmberPose>("surprised");
  const [walking, setWalking] = React.useState(false);
  const [boosting, setBoosting] = React.useState(false);
  const [home, setHome] = React.useState(false);
  const [size, setSize] = React.useState(48);

  const run = React.useCallback((animate: boolean) => {
    runRef.current?.abort();
    const controller = new AbortController();
    runRef.current = controller;
    const { signal } = controller;

    const layer = layerRef.current;
    const ember = emberRef.current;
    const section = layer?.parentElement;
    if (!layer || !ember || !section) return;

    const emberSize = window.innerWidth >= 1024 ? 48 : 36;
    setSize(emberSize);

    const words = Array.from(section.querySelectorAll<HTMLElement>('[data-ember="word"]'));
    const steps = Array.from(section.querySelectorAll<HTMLElement>('[data-ember="step"]'));
    const floor = section.querySelector<HTMLElement>('[data-ember="floor"]');
    if (!floor || steps.length === 0) return;

    const rel = (el: HTMLElement) => {
      const base = section.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return { left: r.left - base.left, top: r.top - base.top, right: r.right - base.left, bottom: r.bottom - base.top };
    };
    // Ember stands at the right end of a step, inside its padding.
    const stepPoint = (el: HTMLElement): Point => {
      const r = rel(el);
      return { x: r.right - 12 - emberSize / 2, y: r.bottom - 5 };
    };

    let pos: Point = { x: 0, y: 0 };
    const place = (p: Point) => {
      pos = p;
      ember.style.transform = `translate3d(${p.x - emberSize / 2}px, ${p.y - emberSize}px, 0)`;
    };
    const squash = (sx: number, sy: number, ms = 280) =>
      bodyRef.current?.animate(
        [{ transform: `scale(${sx}, ${sy})` }, { transform: "scale(1, 1)" }],
        { duration: ms / EMBER_SPEED, easing: "cubic-bezier(.3,1.6,.5,1)" },
      );
    const spark = (p: Point) =>
      spawnSpark(layer, { x: p.x, y: p.y - emberSize * 0.15 }, emberSize * 0.4);

    const reset = () => {
      words.forEach((w) => w.classList.remove(LIT));
      steps.forEach((s) => s.classList.remove(ACTIVE, DONE));
      layer.querySelectorAll(".ember-trail").forEach((d) => d.remove());
      setHome(false);
      setWalking(false);
      setBoosting(false);
    };
    const settle = () => {
      reset();
      steps.slice(0, -1).forEach((s) => s.classList.add(DONE));
      steps[steps.length - 1].classList.add(ACTIVE);
      if (animate) words.forEach((w) => w.classList.add(LIT));
      place(stepPoint(steps[steps.length - 1]));
      ember.style.opacity = "1";
      setPose("waving");
      setHome(true);
    };

    if (!animate) {
      settle();
      return;
    }

    (async () => {
      reset();
      ember.style.opacity = "0";
      // Wait for the line to be on screen and its reveal transition to end.
      await whenVisible(floor, signal);
      await sleep(800, signal);
      const f = rel(floor);
      const start: Point = { x: f.left + emberSize / 2, y: f.top };
      const lastWord = words.length ? rel(words[words.length - 1]) : f;
      const end: Point = { x: Math.min(f.right, lastWord.right) - emberSize / 2, y: f.top };

      // 1. Drop onto the line.
      setPose("surprised");
      place({ x: start.x, y: start.y - 220 });
      ember.style.opacity = "1";
      await tween(520, (t) => place({ x: start.x, y: lerp(start.y - 220, start.y, t) }), signal, easeIn);
      squash(1.25, 0.75);
      setPose("idle");
      await beat(450, signal);

      // 2. Walk the line, lighting each word on the way.
      setWalking(true);
      const distance = end.x - start.x;
      await tween(
        Math.max(1200, (distance / 260) * 1000),
        (t) => {
          place({ x: lerp(start.x, end.x, t), y: start.y });
          for (const w of words) {
            const r = rel(w);
            if (pos.x >= r.left + 4) w.classList.add(LIT);
          }
        },
        signal,
        linear,
      );
      setWalking(false);
      setPose("thinking");
      await beat(1000, signal);
      // On stacked layouts the card is further down: think until it's in view.
      await whenVisible(steps[0], signal);
      await sleep(steps[0].getBoundingClientRect().top > window.innerHeight * 0.4 ? 800 : 0, signal);

      // 3. Crouch, flare up and fly to the first timeline step.
      setPose("idle");
      squash(1.12, 0.82, 220);
      await beat(200, signal);
      setBoosting(true);
      const from = { ...pos };
      const to = stepPoint(steps[0]);
      const control = { x: lerp(from.x, to.x, 0.5), y: Math.min(from.y, to.y) - 180 };
      let lastSpark = 0;
      await tween(
        1150,
        (t) => {
          const u = 1 - t;
          place({
            x: u * u * from.x + 2 * u * t * control.x + t * t * to.x,
            y: u * u * from.y + 2 * u * t * control.y + t * t * to.y,
          });
          const now = performance.now();
          if (now - lastSpark > 28) {
            lastSpark = now;
            spark(pos);
          }
        },
        signal,
      );
      setBoosting(false);
      squash(1.2, 0.8);

      // 4. Hop down the timeline, reacting at each step.
      for (let i = 0; i < steps.length; i++) {
        if (i > 0) {
          steps[i - 1].classList.replace(ACTIVE, DONE);
          const a = { ...pos };
          const b = stepPoint(steps[i]);
          await tween(
            420,
            (t) => place({ x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) - Math.sin(Math.PI * t) * 34 }),
            signal,
          );
          squash(1.15, 0.85);
        }
        steps[i].classList.add(ACTIVE);
        setPose(STEP_POSES[Math.min(i, STEP_POSES.length - 1)]);
        if (i < steps.length - 1) await beat(1150, signal);
      }

      setPose("waving");
      setHome(true);
    })().catch((error) => {
      if (!isAbort(error)) throw error;
    });
  }, []);

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Let the hero's reveal transitions finish before measuring stops.
    const id = setTimeout(() => run(!reduced), reduced ? 0 : 500);

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
            walking={walking}
            boosting={boosting}
            className="h-full w-full overflow-visible drop-shadow-[0_6px_14px_rgba(255,60,0,0.35)]"
          />
        </div>
      </div>
    </div>
  );
}
