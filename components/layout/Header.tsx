"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { site } from "@/config/site";
import { TransitionLink } from "./TransitionLink";
import { Magnetic } from "@/components/ui/Magnetic";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    registerGsap();
    const header = headerRef.current;
    if (!header) return;

    let lastY = 0;

    const trigger = ScrollTrigger.create({
      start: 0,
      onUpdate: (self) => {
        const y = self.scroll();
        if (menuOpen) return;
        if (y > lastY && y > 140) {
          gsap.to(header, { yPercent: -100, duration: 0.6, ease: "main" });
        } else {
          gsap.to(header, { yPercent: 0, duration: 0.6, ease: "main" });
        }
        lastY = y;
      },
    });

    return () => trigger.kill();
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      gsap.to(headerRef.current, { yPercent: 0, duration: 0.3, ease: "main" });
    }
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[clamp(1.25rem,4vw,4.5rem)] py-6"
      >
        <TransitionLink
          href="/"
          className="block text-cream [mix-blend-mode:difference]"
          onClick={() => setMenuOpen(false)}
        >
          <span className="font-display block text-lg uppercase tracking-[0.35em]">
            {site.name}
          </span>
          <span className="mt-1 block font-sans text-[10px] uppercase tracking-[0.16em] text-cream/60">
            Architecture &amp; Interiors
          </span>
        </TransitionLink>

        <div className="hidden items-center gap-9 lg:flex">
          <nav className="flex items-center gap-8 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-cream [mix-blend-mode:difference]">
            {site.nav.map((item) => (
              <TransitionLink
                key={item.href}
                href={item.href}
                data-cursor="link"
                className="group relative py-1"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-[var(--ease-main)] group-hover:scale-x-100" />
              </TransitionLink>
            ))}
          </nav>
          <Magnetic maxPull={8}>
            <TransitionLink
              href="/contact"
              data-cursor="link"
              className="inline-flex h-12 items-center rounded-full bg-brass px-6 font-sans text-xs font-medium uppercase tracking-[0.08em] text-ink transition-colors duration-300 hover:bg-brass-soft"
            >
              {site.cta.primary}
            </TransitionLink>
          </Magnetic>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="relative z-[80] flex h-11 w-11 items-center justify-center text-cream [mix-blend-mode:difference] lg:hidden"
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <div className="flex w-6 flex-col gap-[5px]">
            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                menuOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                menuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </header>

      <MobileMenu id="mobile-menu" open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
