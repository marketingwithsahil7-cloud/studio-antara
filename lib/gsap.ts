"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";
import { Observer } from "gsap/Observer";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip, CustomEase, Observer);
  CustomEase.create("antara", "0.16, 1, 0.3, 1");
  CustomEase.create("main", "0.65, 0, 0.35, 1");
  registered = true;
}

export { gsap, ScrollTrigger, SplitText, Flip, CustomEase, Observer };
