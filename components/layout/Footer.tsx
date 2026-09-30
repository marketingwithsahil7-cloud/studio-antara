"use client";

import { site } from "@/config/site";
import { TransitionLink } from "./TransitionLink";
import { useLenis } from "@/lib/lenis-provider";

export function Footer() {
  const { scrollTo } = useLenis();

  return (
    <footer className="border-t border-line bg-ink px-[clamp(1.25rem,4vw,4.5rem)] pb-8 pt-[clamp(4rem,10vw,7rem)] text-cream">
      <div className="grid gap-12 sm:grid-cols-4">
        <div>
          <span className="font-display block text-base uppercase tracking-[0.35em]">
            {site.name}
          </span>
          <span className="mt-1 block font-sans text-[10px] uppercase tracking-[0.16em] text-muted">
            Architecture &amp; Interiors
          </span>
        </div>

        <div className="flex flex-col gap-2 font-sans text-xs uppercase tracking-[0.14em] text-muted">
          <span className="text-cream/70">Studio</span>
          {site.contact.addressLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>

        <div className="flex flex-col gap-2 font-sans text-xs uppercase tracking-[0.14em] text-muted">
          <span className="text-cream/70">Contact</span>
          <a href={`mailto:${site.contact.email}`} className="text-cream hover:text-brass-soft">
            {site.contact.email}
          </a>
          <span>{site.contact.phone}</span>
          <a
            href={site.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream hover:text-brass-soft"
          >
            Instagram
          </a>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2 font-sans text-xs uppercase tracking-[0.14em] text-muted">
          <span className="text-cream/70">Sitemap</span>
          {site.nav.map((item) => (
            <TransitionLink
              key={item.href}
              href={item.href}
              data-cursor="link"
              className="text-cream hover:text-brass-soft"
            >
              {item.label}
            </TransitionLink>
          ))}
          <TransitionLink href="/credits" data-cursor="link" className="text-cream hover:text-brass-soft">
            Image credits
          </TransitionLink>
        </nav>
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-sans text-[10px] uppercase tracking-[0.14em] text-muted">
        <span>{site.demo.badge}</span>
        <button
          type="button"
          onClick={() => scrollTo(0, { duration: 1.2 })}
          className="text-cream hover:text-brass-soft"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
