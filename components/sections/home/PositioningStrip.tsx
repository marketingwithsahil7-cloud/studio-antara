"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { copy } from "@/content/copy";

export function PositioningStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    registerGsap();
    const section = sectionRef.current;
    const el = textRef.current;
    if (!section || !el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const split = new SplitText(el, { type: "words" });

    if (reduceMotion) {
      gsap.set(split.words, { opacity: 1 });
      return () => split.revert();
    }

    gsap.set(split.words, { opacity: 0.2 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      end: "bottom 50%",
      scrub: true,
      onUpdate: (self) => {
        const active = self.progress * split.words.length;
        split.words.forEach((word, i) => {
          gsap.set(word, { opacity: i < active ? 1 : 0.2 });
        });
      },
    });

    return () => {
      trigger.kill();
      split.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-ink px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(5.5rem,12vw,10rem)] text-center text-cream"
    >
      <p ref={textRef} className="font-display mx-auto max-w-4xl text-h2 font-normal leading-[1.2]">
        {copy.positioning}
      </p>
    </section>
  );
}
