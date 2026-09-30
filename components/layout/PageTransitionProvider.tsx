"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, registerGsap } from "@/lib/gsap";
import { useLenis } from "@/lib/lenis-provider";

type TransitionContextValue = {
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const { stop, start, scrollTo } = useLenis();

  useEffect(() => {
    registerGsap();
  }, []);

  // Runs after the route has actually changed: exit-wipe the panel upward
  // and hand scroll control back to Lenis at the top of the new page.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const panel = panelRef.current;
    scrollTo(0, { immediate: true });
    start();

    if (!panel) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(panel, { x: 0, y: 0, yPercent: 100 });
      return;
    }

    gsap.to(panel, { x: 0, y: 0, yPercent: -100, duration: 0.9, ease: "main" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function navigate(href: string) {
    if (href === pathname) return;
    const panel = panelRef.current;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !panel) {
      router.push(href);
      return;
    }

    stop();
    gsap.set(panel, { x: 0, y: 0, yPercent: 100 });
    gsap.to(panel, {
      x: 0,
      y: 0,
      yPercent: 0,
      duration: 0.7,
      ease: "main",
      onComplete: () => router.push(href),
    });
  }

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={panelRef}
        className="pointer-events-none fixed inset-0 z-[70] translate-y-full bg-ink"
        aria-hidden="true"
      />
    </TransitionContext.Provider>
  );
}
