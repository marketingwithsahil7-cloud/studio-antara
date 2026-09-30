"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, registerGsap } from "@/lib/gsap";

export function TextReveal({
  as: Tag = "div",
  children,
  className,
  start = "top 85%",
  stagger = 0.09,
  delay = 0,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  start?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const split = new SplitText(el, { type: "lines", mask: "lines", autoSplit: true });

    gsap.set(split.lines, { yPercent: 105 });
    gsap.to(split.lines, {
      yPercent: 0,
      duration: 1.1,
      ease: "antara",
      stagger,
      delay,
      scrollTrigger: { trigger: el, start },
    });

    return () => split.revert();
  }, [start, stagger, delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
