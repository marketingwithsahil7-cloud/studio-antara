"use client";

import { useRef, useState, useCallback, useMemo, useEffect } from "react";
import { flushSync } from "react-dom";
import { useRouter, useSearchParams } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap, Flip, registerGsap } from "@/lib/gsap";
import { MediaBlock } from "@/components/ui/MediaBlock";
import { FilterBar } from "@/components/ui/FilterBar";
import { Lightbox } from "@/components/ui/Lightbox";
import { gallery, categoryCounts, type GalleryCategory } from "@/content/gallery";

const categories: GalleryCategory[] = [
  "Interiors",
  "Exteriors",
  "Material studies",
  "Modeling",
  "3D Walkthroughs",
];

const slugMap: Record<GalleryCategory, string> = {
  Interiors: "interiors",
  Exteriors: "exteriors",
  "Material studies": "material-studies",
  Modeling: "modeling",
  "3D Walkthroughs": "3d-walkthroughs",
};
const reverseSlugMap: Record<string, GalleryCategory> = Object.fromEntries(
  Object.entries(slugMap).map(([k, v]) => [v, k as GalleryCategory]),
);

type ActiveFilter = "All" | GalleryCategory;

export function ProjectsGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const initialActive: ActiveFilter =
    (urlCategory && reverseSlugMap[urlCategory]) || "All";

  const [active, setActive] = useState<ActiveFilter>(initialActive);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // useState's initial value only runs once on mount, so it misses browser
  // back/forward navigation (searchParams change without a remount). Re-sync
  // whenever the URL's category param changes from outside handleFilter.
  useEffect(() => {
    setActive((urlCategory && reverseSlugMap[urlCategory]) || "All");
  }, [urlCategory]);

  // One-time diagonal-wave entrance on first mount only. Filter changes are
  // handled separately by Flip (see handleFilter) — mixing a ScrollTrigger-based
  // reveal with Flip's repositioning caused already-revealed images to re-hide
  // and never re-trigger, since Flip's absolute-position pass happens after
  // the trigger's scroll point had already been passed.
  useGSAP(() => {
    registerGsap();
    const items = gridRef.current?.querySelectorAll("[data-gallery-id]");
    if (!items || items.length === 0) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.from(items, {
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: "antara",
      stagger: { each: 0.04, from: "start", grid: "auto" },
    });
  }, []);

  const filtered = useMemo(
    () => (active === "All" ? gallery : gallery.filter((g) => g.category === active)),
    [active],
  );

  const filterOptions = useMemo(
    () => [
      { value: "All" as ActiveFilter, label: "All", count: gallery.length },
      ...categories.map((c) => ({ value: c as ActiveFilter, label: c, count: categoryCounts[c] ?? 0 })),
    ],
    [],
  );

  function handleFilter(next: ActiveFilter) {
    if (next === active) return;
    const grid = gridRef.current;

    const url = next === "All" ? "/projects" : `/projects?category=${slugMap[next as GalleryCategory]}`;
    router.push(url, { scroll: false });

    if (!grid) {
      setActive(next);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setActive(next);
      return;
    }

    const state = Flip.getState(grid.children);
    flushSync(() => setActive(next));

    Flip.from(state, {
      duration: 0.7,
      ease: "main",
      stagger: 0.025,
      absolute: true,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 0.5, delay: 0.15, stagger: 0.03 },
        ),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.94, duration: 0.3 }),
    });
  }

  const openLightbox = useCallback((id: string) => {
    const idx = filtered.findIndex((g) => g.id === id);
    if (idx !== -1) setLightboxIndex(idx);
  }, [filtered]);

  return (
    <div>
      <div className="sticky top-0 z-30 -mx-[clamp(1.25rem,4vw,4.5rem)] border-b border-line bg-ink/95 px-[clamp(1.25rem,4vw,4.5rem)] py-5 backdrop-blur-sm">
        <FilterBar options={filterOptions} active={active} onChange={handleFilter} />
      </div>

      <div
        ref={gridRef}
        className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid"
      >
        {filtered.map((item) => (
          <button
            key={item.id}
            type="button"
            data-cursor="view"
            onClick={() => openLightbox(item.id)}
            className="group block w-full text-left"
            aria-label={`View ${item.title}`}
          >
            <div data-gallery-id={item.id}>
              <MediaBlock
                src={item.src}
                alt={item.title}
                ratio={item.ratio}
                className="transition-transform duration-500 ease-[var(--ease-main)] group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-3 flex items-baseline justify-between font-sans text-[11px] uppercase tracking-[0.14em] text-muted">
              <span>{item.title}</span>
              <span>{item.year}</span>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        items={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(i) => setLightboxIndex(i)}
      />
    </div>
  );
}
