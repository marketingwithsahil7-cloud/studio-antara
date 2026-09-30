"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { process } from "@/content/process";

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    registerGsap();
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set(line, { scaleY: 1 });
      gsap.set(stepsRef.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(line, { scaleY: 0, transformOrigin: "top" });
    gsap.to(line, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: { trigger: section, start: "top 70%", end: "bottom 65%", scrub: true },
    });

    gsap.set(stepsRef.current, { opacity: 0, y: 40 });
    stepsRef.current.forEach((step) => {
      gsap.to(step, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "antara",
        scrollTrigger: { trigger: step, start: "top 85%" },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(5.5rem,12vw,10rem)] text-cream"
    >
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-0 top-0 h-full w-px bg-line sm:left-4">
          <div ref={lineRef} className="h-full w-full bg-brass" />
        </div>

        <div className="flex flex-col gap-16">
          {process.steps.map((step, i) => (
            <div
              key={step.index}
              ref={(el) => {
                if (el) stepsRef.current[i] = el;
              }}
              className="pl-10 sm:pl-16"
            >
              <span className="font-sans text-xs uppercase tracking-[0.16em] text-brass-soft">
                {step.index}
              </span>
              <h3 className="font-display mt-3 text-h3 font-normal">{step.title}</h3>
              <p className="measure mt-3 text-cream/70">{step.body}</p>
            </div>
          ))}
        </div>

        <TransitionLink
          href="/contact"
          className="mt-16 inline-block pl-10 font-sans text-xs font-medium uppercase tracking-[0.1em] text-brass-soft transition-colors duration-300 hover:text-brass sm:pl-16"
        >
          {process.cta}
        </TransitionLink>
      </div>
    </section>
  );
}
