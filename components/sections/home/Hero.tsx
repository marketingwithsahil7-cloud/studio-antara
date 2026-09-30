"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { MediaBlock } from "@/components/ui/MediaBlock";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";
import { copy } from "@/content/copy";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineColRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    registerGsap();
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.to(headlineColRef.current, {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(imageColRef.current, {
        yPercent: -5,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen flex-col justify-start overflow-hidden bg-ink px-[clamp(1.25rem,4vw,4.5rem)] pb-[clamp(2rem,6vw,4rem)] pt-32 text-cream lg:justify-end"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7" ref={headlineColRef}>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-brass-soft">
            {copy.hero.meta} · {copy.hero.established}
          </p>
          <h1 className="font-display mt-6 text-display-xl font-normal">
            <TextReveal as="span">
              {copy.hero.headline}{" "}
              <em className="font-display italic text-brass-soft">{copy.hero.headlineEmphasis}</em>.
            </TextReveal>
          </h1>
          <p className="text-body-l measure mt-8 max-w-[44ch] text-cream/80">{copy.hero.sub}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact">{site.cta.primary}</Button>
            <Button href="#featured-projects" variant="secondary">
              Selected work
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5" ref={imageColRef}>
          <ImageReveal>
            <MediaBlock src="/hero.jpg" alt="Studio Antara — warm interior, golden hour" ratio="3/4" priority />
          </ImageReveal>
        </div>
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-sans text-[10px] uppercase tracking-[0.16em] text-muted">
        <span>{copy.hero.meta}</span>
        <span>{copy.hero.established}</span>
        <span>Scroll ↓</span>
      </div>
    </section>
  );
}
