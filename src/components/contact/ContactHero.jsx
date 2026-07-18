"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export function ContactHero() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        y: 40, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power3.out",
        delay: 0.2
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#1F1F1F] pt-40 pb-20 sm:pt-48 sm:pb-24 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        <div ref={textRef} className="max-w-4xl text-white">
          <span className="mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Private Consultation
          </span>
          <h1 className="mb-8 font-heading text-5xl sm:text-7xl lg:text-8xl font-medium leading-[1.1]">
            Let's Discuss Your Vision
          </h1>
          <p className="font-sans text-lg sm:text-xl text-[#A8A39D] leading-relaxed max-w-2xl">
            Whether you are beginning a complete architectural build or refining a single space, our design team is available for private appointments at our studio or on-site.
          </p>
        </div>
      </div>
    </section>
  );
}
