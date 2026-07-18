"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export function GlobalPreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    // Only run once per session to not annoy users, or run every time for effect.
    // For luxury sites, we often run it once per session.
    const hasLoaded = sessionStorage.getItem("nova_preloader_played");
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    // Lock scroll
    document.body.style.overflow = "hidden";

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("nova_preloader_played", "true");
          setIsLoading(false);
          document.body.style.overflow = "auto";
        }
      });

      // 1. Initial state
      gsap.set(textRef.current, { y: 20, opacity: 0 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

      // 2. Animate In
      tl.to(textRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      })
      // 3. Draw line
      .to(lineRef.current, {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.inOut"
      }, "-=0.5")
      // 4. Animate Out
      .to([textRef.current, lineRef.current], {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in",
        delay: 0.2
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut"
      });

    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1F1F1F] text-white w-screen h-screen"
    >
      <div className="flex flex-col items-center">
        <h2 
          ref={textRef} 
          className="font-heading text-3xl sm:text-5xl font-medium tracking-[0.2em] mb-6 text-white"
        >
          NOVA KITCHENS
        </h2>
        <div className="w-24 sm:w-32 h-[1px] bg-white/20 relative">
          <div ref={lineRef} className="absolute inset-0 h-full bg-[#C46A3C]" />
        </div>
      </div>
    </div>
  );
}
