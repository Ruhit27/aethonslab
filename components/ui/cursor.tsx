"use client";

import { useEffect, useRef } from "react";

function InteractiveCursor() {
  const outerCursorRef = useRef<HTMLDivElement | null>(null);
  const innerCursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (isCoarsePointer) {
      return undefined;
    }

    let animationFrameId = 0;
    let mouseX = 0;
    let mouseY = 0;
    let isPointerActive = false;

    const renderCursor = () => {
      const outerCursor = outerCursorRef.current;
      const innerCursor = innerCursorRef.current;

      if (outerCursor) {
        const outerSize = isPointerActive ? 28 : 20;
        outerCursor.style.transform = `translate3d(${mouseX - outerSize / 2}px, ${mouseY - outerSize / 2}px, 0)`;
        outerCursor.style.width = `${outerSize}px`;
        outerCursor.style.height = `${outerSize}px`;
      }

      if (innerCursor) {
        const innerSize = isPointerActive ? 12 : 8;
        innerCursor.style.transform = `translate3d(${mouseX - innerSize / 2}px, ${mouseY - innerSize / 2}px, 0)`;
        innerCursor.style.width = `${innerSize}px`;
        innerCursor.style.height = `${innerSize}px`;
      }

      animationFrameId = window.requestAnimationFrame(renderCursor);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseDown = () => {
      isPointerActive = true;
    };

    const handleMouseUp = () => {
      isPointerActive = false;
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (
        target?.closest(
          "a, button, [role='button'], input, textarea, select, summary",
        )
      ) {
        isPointerActive = true;
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const relatedTarget = event.relatedTarget as HTMLElement | null;

      if (
        !relatedTarget?.closest(
          "a, button, [role='button'], input, textarea, select, summary",
        )
      ) {
        isPointerActive = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    animationFrameId = window.requestAnimationFrame(renderCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-9999 hidden md:block"
    >
      <div
        ref={outerCursorRef}
        className="fixed rounded-full border border-primary/80 bg-primary/10 shadow-[0_0_18px_#FF3C00,0_0_36px_rgba(255,60,0,0.35)] transition-[width,height,transform] duration-150 ease-out"
        style={{ width: 40, height: 40 }}
      />
      <div
        ref={innerCursorRef}
        className="fixed rounded-full bg-primary shadow-[0_0_10px_#FF3C00] transition-[width,height,transform] duration-75 ease-out"
        style={{ width: 8, height: 8 }}
      />
    </div>
  );
}

export default InteractiveCursor;
