"use client";

import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { aboutData } from "@/data/about";
import { cn } from "@/lib/utils";

export function Designers() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    registerGSAP();
    let ctx = gsap.context(() => {
      // Header Reveal
      gsap.from(headerRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        }
      });
      
      // Grid Reveal
      gsap.from(gridRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-white py-24 sm:py-32 overflow-hidden"
      aria-label="Meet The Designers"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="mx-auto max-w-[760px] text-center mb-16 sm:mb-24 flex flex-col items-center"
        >
          <span className="mb-4 sm:mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Our Team
          </span>
          <h2 className="mb-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-heading">
            The Minds Behind The Architecture
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-[#5F6368] max-w-2xl">
            A collective of award-winning architects, material scientists, and industrial engineers dedicated to reshaping domestic living.
          </p>
        </div>

        {/* Editorial Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12"
        >
          {aboutData.designers.map((designer, idx) => {
            const initials = designer.name.split(" ").map(n => n[0]).join("");
            
            return (
              <div key={idx} className="group flex flex-col items-center text-center">
                
                {/* Portrait / Placeholder */}
                <div className="relative w-full aspect-[3/4] mb-8 overflow-hidden rounded-sm bg-[#F5EBE1]">
                  {designer.image ? (
                    <Image
                      src={designer.image}
                      alt={designer.name}
                      fill
                      className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                      <span className="font-heading text-6xl text-heading/10 font-medium">
                        {initials}
                      </span>
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-center justify-center">
                    <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 delay-100">
                      View Profile
                    </span>
                  </div>
                </div>

                {/* Details */}
                <h3 className="font-heading text-2xl sm:text-3xl font-medium text-heading mb-2">
                  {designer.name}
                </h3>
                <span className="font-sans text-sm font-semibold text-[#C46A3C] uppercase tracking-widest mb-3 block">
                  {designer.role}
                </span>
                <span className="font-sans text-xs text-[#5F6368]">
                  {designer.credentials}
                </span>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
