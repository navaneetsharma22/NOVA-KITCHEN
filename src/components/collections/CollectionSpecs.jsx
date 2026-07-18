"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CollectionSpecs({ collection }) {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from([leftRef.current, rightRef.current], {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#FAFAF9] py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left: Overview Statement */}
          <div ref={leftRef} className="w-full lg:w-1/2 flex flex-col">
            <span className="mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
              Design Overview
            </span>
            <p className="font-heading text-2xl sm:text-3xl lg:text-4xl font-medium text-heading leading-[1.3] mb-8">
              {collection.overview}
            </p>
          </div>

          {/* Right: Technical Specifications */}
          <div ref={rightRef} className="w-full lg:w-1/2 flex flex-col">
            <span className="mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
              Technical Specifications
            </span>
            <div className="flex flex-col border-t border-[#EAE5DF]">
              {collection.specs.map((spec, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-5 sm:py-6 border-b border-[#EAE5DF]">
                  <span className="font-sans text-xs sm:text-sm text-[#5F6368] uppercase tracking-widest mb-2 sm:mb-0">
                    {spec.label}
                  </span>
                  <span className="font-sans text-base font-medium text-heading">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
