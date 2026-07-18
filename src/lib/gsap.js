"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Track whether we've already registered
let registered = false;

/**
 * Safely register GSAP plugins. Call this inside useEffect() only.
 * This ensures registration happens after hydration, avoiding
 * the removeChild DOM conflict with React/Next.js SSR.
 */
export function registerGSAP() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export { gsap, ScrollTrigger };
