"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { gsap, ScrollTrigger, registerGsap } from "./gsap";

type LenisContextValue = {
  lenis: Lenis | null;
  stop: () => void;
  start: () => void;
  scrollTo: (target: string | number | HTMLElement, opts?: Record<string, unknown>) => void;
};

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  stop: () => {},
  start: () => {},
  scrollTo: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    registerGsap();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: false,
    });
    lenisRef.current = lenis;
    forceUpdate((n) => n + 1);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const value: LenisContextValue = {
    lenis: lenisRef.current,
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
    scrollTo: (target, opts) => lenisRef.current?.scrollTo(target as never, opts),
  };

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}
