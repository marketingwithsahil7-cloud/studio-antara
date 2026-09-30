"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function ImageReveal({
  children,
  className,
  parallax = true,
}: {
  children: ReactNode;
  className?: string;
  parallax?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    registerGsap();
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set(wrap, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(inner, { scale: 1 });
      return;
    }

    gsap.set(wrap, { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(inner, { scale: 1.25 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: wrap, start: "top 85%" },
    });
    tl.to(wrap, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "main" }, 0).to(
      inner,
      { scale: 1, duration: 1.8, ease: "main" },
      0,
    );

    if (parallax) {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          inner,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }
  }, [parallax]);

  return (
    <div ref={wrapRef} className={cn("overflow-hidden", className)}>
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
