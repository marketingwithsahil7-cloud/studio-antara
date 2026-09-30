"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, registerGsap } from "@/lib/gsap";
import { site } from "@/config/site";
import { useLenis } from "@/lib/lenis-provider";
import { TransitionLink } from "./TransitionLink";

export function MobileMenu({
  id,
  open,
  onClose,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const pathname = usePathname();
  const { stop, start } = useLenis();

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useGSAP(() => {
    registerGsap();
    const panel = panelRef.current;
    if (!panel) return;

    if (open) {
      stop();
      gsap.set(panel, { autoAlpha: 1 });
      gsap.fromTo(
        panel,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "main" },
      );

      const splits = linksRef.current.map(
        (el) => new SplitText(el, { type: "lines", mask: "lines" }),
      );
      const lines = splits.flatMap((s) => s.lines);
      gsap.fromTo(
        lines,
        { yPercent: 105 },
        { yPercent: 0, duration: 1, ease: "antara", stagger: 0.09, delay: 0.2 },
      );

      return () => splits.forEach((s) => s.revert());
    } else {
      start();
      gsap.to(panel, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.5,
        ease: "main",
        onComplete: () => gsap.set(panel, { autoAlpha: 0 }),
      });
    }
  }, [open]);

  return (
    <div
      id={id}
      ref={panelRef}
      className="invisible fixed inset-0 z-[65] flex flex-col justify-center bg-ink px-[clamp(1.25rem,4vw,4.5rem)]"
      style={{ clipPath: "inset(0 0 100% 0)" }}
      aria-hidden={!open}
    >
      <nav className="flex flex-col gap-1">
        {site.nav.map((item, i) => (
          <TransitionLink
            key={item.href}
            href={item.href}
            ref={(el) => {
              if (el) linksRef.current[i] = el;
            }}
            className="font-display text-[clamp(2.5rem,11vw,5rem)] leading-[1.05] text-cream"
          >
            {item.label}
          </TransitionLink>
        ))}
        <TransitionLink
          href="/contact"
          ref={(el) => {
            if (el) linksRef.current[site.nav.length] = el;
          }}
          className="font-display text-[clamp(2.5rem,11vw,5rem)] italic leading-[1.05] text-brass-soft"
        >
          {site.cta.primary}
        </TransitionLink>
      </nav>
    </div>
  );
}
