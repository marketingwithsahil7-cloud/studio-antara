"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, Flip, registerGsap } from "@/lib/gsap";
import { assetPath } from "@/lib/utils";
import type { GalleryItem } from "@/content/gallery";

function getThumbEl(id: string): HTMLElement | null {
  return document.querySelector(`[data-gallery-id="${CSS.escape(id)}"]`);
}

export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const indexRef = useRef(index);
  indexRef.current = index;

  const open = index !== null;
  const item = open ? items[index] : null;

  const close = useCallback(() => {
    const currentIndex = indexRef.current;
    const overlay = overlayRef.current;
    const imgWrap = imgWrapRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const closingItem = currentIndex !== null ? items[currentIndex] : null;
    const thumb = closingItem ? getThumbEl(closingItem.id) : null;

    if (!thumb || !imgWrap || !overlay || reduceMotion) {
      onClose();
      return;
    }

    registerGsap();
    const state = Flip.getState(imgWrap);
    gsap.to(overlay, {
      backgroundColor: "rgba(20,18,16,0)",
      duration: 0.6,
      ease: "main",
    });
    gsap.to(
      overlay.querySelectorAll("[data-lightbox-chrome]"),
      { autoAlpha: 0, duration: 0.3 },
    );
    Flip.from(state, {
      targets: thumb,
      duration: 0.7,
      ease: "main",
      scale: true,
      absolute: true,
      onComplete: () => {
        gsap.set(overlay, { autoAlpha: 0 });
        onClose();
      },
    });
  }, [items, onClose]);

  // Open / entrance morph
  useGSAP(() => {
    registerGsap();
    const overlay = overlayRef.current;
    const imgWrap = imgWrapRef.current;
    if (!overlay || !imgWrap) return;

    if (open && !wasOpenRef.current) {
      const openingItem = items[index];
      const thumb = getThumbEl(openingItem.id);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set(overlay, { autoAlpha: 1, backgroundColor: "rgba(20,18,16,0.97)" });
      gsap.set(overlay.querySelectorAll("[data-lightbox-chrome]"), { autoAlpha: 1 });

      if (thumb && !reduceMotion) {
        const state = Flip.getState(thumb);
        Flip.from(state, {
          targets: imgWrap,
          duration: 0.8,
          ease: "main",
          scale: true,
          absolute: true,
        });
      } else {
        gsap.fromTo(imgWrap, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.5 });
      }
      closeBtnRef.current?.focus();
    }

    wasOpenRef.current = open;
  }, [open, index]);

  // Keyboard nav + focus trap
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
      } else if (e.key === "ArrowRight") {
        onNavigate(((indexRef.current ?? 0) + 1) % items.length);
      } else if (e.key === "ArrowLeft") {
        onNavigate(((indexRef.current ?? 0) - 1 + items.length) % items.length);
      } else if (e.key === "Tab") {
        const focusables = overlayRef.current?.querySelectorAll<HTMLElement>(
          "button, [href]",
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, items.length, onNavigate, close]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 60) {
      if (delta < 0) onNavigate(((indexRef.current ?? 0) + 1) % items.length);
      else onNavigate(((indexRef.current ?? 0) - 1 + items.length) % items.length);
    }
    touchStartX.current = null;
  }

  if (!open || !item) return null;

  return (
    // Click-outside-to-close on the backdrop is a convenience on top of the
    // real interactive affordances (Escape key handler above, visible Close
    // button below) — not a substitute for them, so no keyboard handler needed here.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-10"
      style={{ backgroundColor: "rgba(20,18,16,0.97)" }}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — ${item.category}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        ref={closeBtnRef}
        type="button"
        onClick={close}
        aria-label="Close"
        data-lightbox-chrome
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center text-cream transition-colors hover:text-brass-soft sm:right-8 sm:top-8"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => onNavigate(((index ?? 0) - 1 + items.length) % items.length)}
        aria-label="Previous image"
        data-lightbox-chrome
        className="absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center text-cream transition-colors hover:text-brass-soft sm:left-6 sm:flex"
      >
        <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L4 8L10 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => onNavigate(((index ?? 0) + 1) % items.length)}
        aria-label="Next image"
        data-lightbox-chrome
        className="absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center text-cream transition-colors hover:text-brass-soft sm:right-6 sm:flex"
      >
        <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
          <path d="M6 3L12 8L6 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        ref={imgWrapRef}
        className="relative max-h-[75vh] w-full max-w-4xl"
        style={{ aspectRatio: item.ratio.replace("/", " / ") }}
      >
        <Image
          src={assetPath(item.src)}
          alt={item.title}
          fill
          sizes="90vw"
          className="object-contain"
          priority
        />
      </div>

      <div
        data-lightbox-chrome
        className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-4 font-sans text-[11px] uppercase tracking-[0.14em] text-cream/80 sm:bottom-8 sm:left-8 sm:right-8"
      >
        <div>
          <p className="text-cream">{item.title}</p>
          <p className="mt-1 text-muted">
            {item.location} · {item.year} — {item.caption}
          </p>
        </div>
        <p className="text-brass-soft">
          {String(index! + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}

export { getThumbEl };
