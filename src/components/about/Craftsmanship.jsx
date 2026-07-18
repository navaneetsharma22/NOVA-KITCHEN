"use client";

import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { aboutData } from "@/data/about";

export function Craftsmanship() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    registerGSAP();
    // Only apply horizontal scroll on desktop
    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 1024px)", () => {
      let ctx = gsap.context(() => {
        // Calculate the total width to scroll based on the track's scrollWidth minus the viewport width
        const getScrollAmount = () => {
          let trackWidth = trackRef.current.scrollWidth;
          return -(trackWidth - window.innerWidth);
        };

        const tween = gsap.to(trackRef.current, {
          x: getScrollAmount,
          ease: "none"
        });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          animation: tween,
          scrub: 1,
          invalidateOnRefresh: true
        });

      }, sectionRef);

      return () => ctx.revert();
    });

    // Simple fade in for mobile (stacked layout)
    matchMedia.add("(max-width: 1023px)", () => {
      let ctx = gsap.context(() => {
        gsap.from(trackRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => matchMedia.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-[#FAFAF9]"
      aria-label="Our Craftsmanship"
    >
      <div 
        ref={containerRef} 
        className="relative w-full lg:h-screen flex lg:items-center overflow-hidden py-24 lg:py-0"
      >
        
        {/* Absolute Header that stays put during the horizontal scroll (desktop) */}
        <div className="absolute top-24 lg:top-32 left-6 sm:left-8 lg:left-16 xl:left-24 z-10 pointer-events-none">
          <span className="mb-4 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Our Craftsmanship
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-medium leading-[1.1] text-heading">
            The Making Of A Masterpiece
          </h2>
        </div>

        {/* The Track that moves horizontally */}
        <div 
          ref={trackRef} 
          className="flex flex-col lg:flex-row gap-12 lg:gap-32 px-6 sm:px-8 lg:px-[30vw] pt-32 lg:pt-0"
        >
          {aboutData.craftsmanship.map((item, idx) => (
            <div 
              key={item.id} 
              className="flex flex-col lg:w-[60vw] xl:w-[50vw] flex-shrink-0"
            >
              <div className="relative w-full aspect-[4/3] lg:aspect-[16/9] rounded-[24px] overflow-hidden mb-8 sm:mb-12 shadow-[0_20px_40px_rgba(31,31,31,0.04)]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              
              <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-12 pl-4 lg:pl-12 border-l-2 border-[#C46A3C]">
                <span className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#EAE5DF] font-medium leading-none">
                  {item.id}
                </span>
                <div className="flex flex-col">
                  <h3 className="font-heading text-2xl sm:text-3xl font-medium text-heading mb-4">
                    {item.title}
                  </h3>
                  <p className="font-sans text-base sm:text-lg text-[#5F6368] leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
