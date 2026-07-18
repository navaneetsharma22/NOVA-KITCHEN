"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Plus, Minus, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { designProcess } from "@/data/process";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStage = designProcess[activeIndex];
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const accordionRef = useRef(null);
  
  const imageRef = useRef(null);

  // Initial Scroll Reveal
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
      
      // Image Reveal
      gsap.from(imageContainerRef.current, {
        x: -40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
      
      // Accordion Reveal
      gsap.from(accordionRef.current.children, {
        x: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Image Crossfade on state change
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        { opacity: 0.4, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out", overwrite: true }
      );
    }, imageContainerRef);

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-white py-24 sm:py-32 overflow-hidden"
      aria-label="Luxury Design Process"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="mx-auto max-w-[760px] text-center mb-16 sm:mb-24 flex flex-col items-center"
        >
          <span className="mb-4 sm:mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Our Process
          </span>
          <h2 className="mb-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-heading">
            From Vision To Reality
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-[#5F6368] max-w-2xl">
            Every Nova Kitchen is thoughtfully planned, designed and crafted through a seamless process that combines creativity, precision engineering and premium craftsmanship.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16 xl:gap-24 relative">
          
          {/* Left: Sticky Image Container */}
          <div ref={imageContainerRef} className="w-full lg:w-1/2 flex-shrink-0 order-1 lg:order-none">
            <div className="sticky top-12 lg:top-32 w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(31,31,31,0.12)] bg-[#FBF8F4]">
              <div className="relative w-full h-full">
                <Image
                  ref={imageRef}
                  src={activeStage.image}
                  alt={activeStage.stage}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right: Interactive Accordion List */}
          <div ref={accordionRef} className="w-full lg:w-1/2 flex flex-col order-2 lg:order-none">
            {designProcess.map((stage, idx) => {
              const isActive = activeIndex === idx;
              
              return (
                <div 
                  key={stage.id} 
                  className={cn(
                    "group relative border-b border-[#EAE5DF] last:border-0 transition-colors duration-500 overflow-hidden",
                    isActive ? "bg-[#FBF8F4] rounded-[24px] px-6 sm:px-8 border-transparent my-2 shadow-sm" : "bg-transparent py-4 sm:py-6"
                  )}
                  onMouseEnter={() => window.innerWidth >= 1024 && setActiveIndex(idx)}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => setActiveIndex(idx)}
                    className="w-full flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                    aria-expanded={isActive}
                    aria-controls={`stage-content-${stage.id}`}
                  >
                    <div className="flex items-center space-x-6 sm:space-x-8 py-4">
                      <span className={cn(
                        "font-sans text-sm sm:text-base font-semibold transition-colors duration-500",
                        isActive ? "text-[#C46A3C]" : "text-[#5F6368] group-hover:text-heading"
                      )}>
                        {stage.number}
                      </span>
                      <div className="flex flex-col">
                        <h3 className={cn(
                          "font-heading text-2xl sm:text-3xl transition-colors duration-500",
                          isActive ? "text-heading font-medium" : "text-[#5F6368] group-hover:text-heading"
                        )}>
                          {stage.stage}
                        </h3>
                        {/* Short Summary (Hidden when active, shown when collapsed) */}
                        <div className={cn(
                          "grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                          !isActive ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0 mt-0"
                        )}>
                          <p className="overflow-hidden font-sans text-sm text-[#5F6368]">
                            {stage.summary}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expand/Collapse Icon */}
                    <div className={cn(
                      "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ml-4",
                      isActive ? "bg-white text-[#C46A3C] shadow-sm" : "bg-transparent border border-[#EAE5DF] text-[#5F6368] group-hover:border-heading group-hover:text-heading"
                    )}>
                      {isActive ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </div>
                  </button>

                  {/* Accordion Expanded Content */}
                  <div 
                    id={`stage-content-${stage.id}`}
                    className={cn(
                      "grid transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                      isActive ? "grid-rows-[1fr] opacity-100 pb-8" : "grid-rows-[0fr] opacity-0 pb-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-2">
                        <p className="font-sans text-base sm:text-lg text-[#5F6368] leading-relaxed mb-8">
                          {stage.description}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                          <div>
                            <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-[#5F6368] mb-2">
                              Estimated Duration
                            </span>
                            <span className="font-sans text-sm font-medium text-heading">
                              {stage.duration}
                            </span>
                          </div>
                          <div>
                            <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-[#5F6368] mb-2">
                              Key Deliverables
                            </span>
                            <span className="font-sans text-sm font-medium text-heading">
                              {stage.deliverables}
                            </span>
                          </div>
                        </div>

                        {/* Supporting Features */}
                        <div>
                          <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-[#5F6368] mb-4">
                            Stage Highlights
                          </span>
                          <ul className="flex flex-col space-y-3">
                            {stage.features.map((feature, i) => (
                              <li key={i} className="flex items-center space-x-3">
                                <CheckCircle2 className="w-4 h-4 text-[#C46A3C] flex-shrink-0" />
                                <span className="font-sans text-sm text-[#5F6368]">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
