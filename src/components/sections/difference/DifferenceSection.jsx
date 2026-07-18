"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { novaDifference, novaStats } from "@/data/difference";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function DifferenceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = novaDifference[activeIndex];
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const contentContainerRef = useRef(null);
  
  const imageRef = useRef(null);
  const expandedInfoRef = useRef(null);

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
      
      // Image & Content Reveal
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
      
      gsap.from(contentContainerRef.current, {
        x: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // State Change Animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Image Crossfade
      tl.fromTo(imageRef.current,
        { opacity: 0.4, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        0
      );
      
      // Expanded Text Reveal
      if (expandedInfoRef.current) {
        tl.fromTo(expandedInfoRef.current.children,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          0.1
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-[#FBF8F4] py-24 sm:py-32 overflow-hidden"
      aria-label="The Nova Difference"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="mx-auto max-w-[720px] text-center mb-16 sm:mb-24 flex flex-col items-center"
        >
          <span className="mb-4 sm:mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Why Choose Nova
          </span>
          <h2 className="mb-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-heading">
            Craftsmanship Built Into Every Detail
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-[#5F6368] max-w-2xl">
            Every Nova Kitchen is thoughtfully designed using premium materials, precision engineering and timeless craftsmanship to create spaces that elevate everyday living.
          </p>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-12 lg:gap-16 xl:gap-24">
          
          {/* Left: Large Editorial Image (45%) */}
          <div ref={imageContainerRef} className="w-full lg:w-[45%] flex-shrink-0 order-1 lg:order-none">
            <div className="sticky top-12 lg:top-32 w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(31,31,31,0.08)] bg-white">
              <div className="relative w-full h-full">
                <Image
                  ref={imageRef}
                  src={activeFeature.image}
                  alt={activeFeature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right: Interactive Content (55%) */}
          <div ref={contentContainerRef} className="w-full lg:w-[55%] flex flex-col order-2 lg:order-none">
            
            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-16">
              {novaDifference.map((feature, idx) => {
                const isActive = activeIndex === idx;
                const Icon = feature.icon;
                
                return (
                  <button
                    key={feature.id}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "group relative flex flex-col text-left p-6 sm:p-8 rounded-[24px] border transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary overflow-hidden",
                      isActive 
                        ? "bg-white border-transparent shadow-[0_20px_40px_rgba(31,31,31,0.06)]" 
                        : "bg-transparent border-[#EAE5DF] hover:border-transparent hover:bg-white/60 hover:shadow-[0_10px_30px_rgba(31,31,31,0.03)]"
                    )}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-start justify-between w-full mb-6">
                      <div className={cn(
                        "w-12 h-12 flex items-center justify-center rounded-2xl transition-colors duration-500",
                        isActive ? "bg-[#FBF8F4] text-primary" : "bg-white text-[#5F6368] group-hover:bg-[#FBF8F4]"
                      )}>
                        <Icon className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                      <ArrowRight className={cn(
                        "w-5 h-5 transition-all duration-500",
                        isActive ? "text-primary opacity-100 translate-x-0" : "text-[#5F6368] opacity-0 -translate-x-4 group-hover:opacity-50"
                      )} />
                    </div>
                    
                    <h3 className={cn(
                      "font-heading text-xl sm:text-2xl mb-2 transition-colors duration-500",
                      isActive ? "text-heading font-medium" : "text-heading"
                    )}>
                      {feature.title}
                    </h3>
                    <p className="font-sans text-sm text-[#5F6368] leading-relaxed">
                      {feature.shortDesc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Expanded Description & Stats (Below Cards) */}
            <div ref={expandedInfoRef} className="flex flex-col bg-white rounded-[32px] p-8 sm:p-12 shadow-[0_20px_40px_rgba(31,31,31,0.04)] border border-[#EAE5DF]/50 mt-auto">
              
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#C46A3C] mb-4 block">
                {activeFeature.title}
              </span>
              
              <p className="font-sans text-base sm:text-lg text-heading leading-relaxed mb-12">
                {activeFeature.expandedDesc}
              </p>

              {/* Supporting Statistics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 pt-10 border-t border-[#EAE5DF] mb-12">
                {novaStats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-heading mb-2">
                      {stat.value}
                    </span>
                    <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#5F6368]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Premium CTA */}
              <div className="mt-auto">
                <button className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-10 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-hover hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(196,106,60,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  Discover Our Process
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
