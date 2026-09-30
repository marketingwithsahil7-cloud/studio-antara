"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    const bar = barRef.current;
    if (!bar) return;

    gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-px bg-transparent">
      <div ref={barRef} className="h-full w-full bg-brass" />
    </div>
  );
}
