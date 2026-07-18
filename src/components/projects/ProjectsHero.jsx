"use client";

import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

import React, { useRef, useEffect } from "react";
export function ProjectsHero() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    registerGSAP();
    let ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        y: 40, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power3.out",
        delay: 0.2
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#FBF8F4] pt-40 pb-20 sm:pt-48 sm:pb-24">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        <div ref={textRef} className="max-w-4xl">
          <span className="mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Our Portfolio
          </span>
          <h1 className="mb-8 font-heading text-5xl sm:text-7xl lg:text-8xl font-medium leading-[1.1] text-heading">
            Selected Works
          </h1>
          <p className="font-sans text-lg sm:text-xl text-[#5F6368] leading-relaxed max-w-2xl">
            A curated selection of our finest architectural kitchens, outdoor cooking spaces, and premium storage solutions designed for extraordinary living.
          </p>
        </div>
      </div>
    </section>
  );
}
