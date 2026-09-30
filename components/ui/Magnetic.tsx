"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

export function Magnetic({
  children,
  maxPull = 12,
  radius = 90,
  className,
}: {
  children: ReactNode;
  maxPull?: number;
  radius?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)",
      () => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" });

        function onMove(e: MouseEvent) {
          const rect = el!.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.hypot(dx, dy);
          if (dist < radius + rect.width / 2) {
            const pullX = gsap.utils.clamp(-maxPull, maxPull, dx * 0.25);
            const pullY = gsap.utils.clamp(-maxPull, maxPull, dy * 0.25);
            xTo(pullX);
            yTo(pullY);
          } else {
            xTo(0);
            yTo(0);
          }
        }

        function onLeave() {
          xTo(0);
          yTo(0);
        }

        window.addEventListener("mousemove", onMove);
        el!.addEventListener("mouseleave", onLeave);

        return () => {
          window.removeEventListener("mousemove", onMove);
          el!.removeEventListener("mouseleave", onLeave);
        };
      },
    );

    return () => mm.revert();
  }, [maxPull, radius]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
