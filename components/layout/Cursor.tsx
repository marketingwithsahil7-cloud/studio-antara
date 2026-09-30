"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type CursorState = "default" | "link" | "view";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    registerGsap();
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!mq.matches || reduceMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("cursor-none");

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    function onMove(e: MouseEvent) {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      setVisible(true);

      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      const type = target?.getAttribute("data-cursor");
      setState(type === "view" ? "view" : type === "link" ? "link" : "default");
    }

    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[95] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream [mix-blend-mode:difference] lg:block",
          visible ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[94] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-300 lg:flex",
          state === "view"
            ? "h-24 w-24 border-brass bg-brass"
            : state === "link"
              ? "h-12 w-12 border-cream bg-transparent [mix-blend-mode:difference]"
              : "h-7 w-7 border-cream/70 bg-transparent [mix-blend-mode:difference]",
          visible ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      >
        {state === "view" && (
          <span className="font-sans text-[10px] font-medium uppercase tracking-[0.1em] text-ink">
            View
          </span>
        )}
      </div>
    </>
  );
}
