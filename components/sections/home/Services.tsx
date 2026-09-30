"use client";

import { useRef, useState, type MouseEvent } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { services } from "@/content/services";
import { assetPath } from "@/lib/utils";

export function Services() {
  const previewRef = useRef<HTMLDivElement>(null);
  const quickToRef = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [openMobile, setOpenMobile] = useState<number | null>(null);

  useGSAP(() => {
    registerGsap();
    const preview = previewRef.current;
    if (!preview) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (hover: hover)", () => {
      quickToRef.current = {
        x: gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3" }),
        y: gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3" }),
      };
    });

    return () => mm.revert();
  }, []);

  function onMove(e: MouseEvent) {
    quickToRef.current?.x(e.clientX);
    quickToRef.current?.y(e.clientY);
  }

  return (
    <section
      onMouseMove={onMove}
      className="relative bg-ink px-[clamp(1.25rem,4vw,4.5rem)] py-[clamp(5.5rem,12vw,10rem)] text-cream"
    >
      <div className="border-t border-line">
        {services.map((service, i) => (
          <div key={service.index} className="border-b border-line">
            <button
              type="button"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setOpenMobile(openMobile === i ? null : i)}
              className={`group flex w-full items-center justify-between gap-6 px-1 py-8 text-left transition-colors duration-300 lg:px-6 ${
                hovered === i ? "bg-cream text-ink" : ""
              } ${hovered !== null && hovered !== i ? "lg:opacity-40" : "opacity-100"}`}
            >
              <span className="flex items-baseline gap-6">
                <span className="font-sans text-xs text-muted">{service.index}</span>
                <span
                  className={`font-display text-h3 font-normal transition-transform duration-300 ease-[var(--ease-main)] ${
                    hovered === i ? "lg:translate-x-6" : ""
                  }`}
                >
                  {service.title}
                </span>
              </span>
              <span className="hidden font-sans text-[11px] uppercase tracking-[0.14em] text-muted sm:inline">
                {service.descriptor}
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 16 16"
                fill="none"
                className={`shrink-0 transition-transform duration-300 ${
                  openMobile === i ? "rotate-90 sm:rotate-0" : ""
                }`}
              >
                <path
                  d="M2 8H14M14 8L9 3M14 8L9 13"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {openMobile === i && (
              <p className="px-1 pb-6 text-sm text-muted sm:hidden">{service.descriptor}</p>
            )}
          </div>
        ))}
      </div>

      <div
        ref={previewRef}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-40 w-32 -translate-x-1/2 -translate-y-1/2 overflow-hidden lg:block"
        style={{ opacity: hovered !== null ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        {hovered !== null && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={assetPath(services[hovered].image)} alt="" className="h-full w-full object-cover" />
        )}
      </div>
    </section>
  );
}
