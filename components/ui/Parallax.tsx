"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";

export function Parallax({
  children,
  depth = 12,
  className,
}: {
  children: ReactNode;
  depth?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.fromTo(
        el,
        { yPercent: -depth },
        {
          yPercent: depth,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });

    return () => mm.revert();
  }, [depth]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
