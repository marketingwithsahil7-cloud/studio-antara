"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";

export function Counter({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };

    const tween = gsap.to(obj, {
      val: value,
      duration: 1.8,
      ease: "main",
      scrollTrigger: { trigger: el, start: "top 85%" },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
      },
    });

    return () => tween.kill();
  }, [value, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
