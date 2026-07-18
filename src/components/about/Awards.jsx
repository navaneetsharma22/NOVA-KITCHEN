"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutData } from "@/data/about";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Awards() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
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
      
      // List Reveal
      gsap.from(listRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
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
      className="w-full bg-[#FAFAF9] py-24 sm:py-32 overflow-hidden"
      aria-label="Awards and Recognition"
    >
      <div className="mx-auto max-w-[1000px] px-6 sm:px-8">
        
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="text-center mb-16 sm:mb-24 flex flex-col items-center"
        >
          <span className="mb-4 sm:mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Recognition
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-medium leading-[1.1] text-heading">
            Global Acclaim
          </h2>
        </div>

        {/* Minimalist List */}
        <div ref={listRef} className="flex flex-col border-t border-[#EAE5DF]">
          {aboutData.awards.map((award, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-8 sm:py-10 border-b border-[#EAE5DF] transition-colors duration-500 hover:bg-white hover:px-6 cursor-default -mx-6 px-6"
            >
              
              <div className="flex items-start sm:items-center space-x-6 sm:space-x-12 mb-4 sm:mb-0">
                <span className="font-sans text-sm sm:text-base font-semibold text-[#C46A3C] transition-colors duration-300 group-hover:text-heading">
                  {award.year}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-medium text-heading transition-transform duration-500 group-hover:translate-x-2">
                  {award.title}
                </h3>
              </div>

              <span className="font-sans text-sm text-[#5F6368] uppercase tracking-widest pl-12 sm:pl-0 transition-opacity duration-300 group-hover:text-heading">
                {award.category}
              </span>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
