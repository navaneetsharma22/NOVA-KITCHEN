"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { materials } from "@/data/materials";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function MaterialLibrary() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMaterial = materials[activeIndex];
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const displayRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  // Initial Entry Animation
  useEffect(() => {
    let ctx = gsap.context(() => {
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
      
      gsap.from(displayRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: displayRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // State Change Animation
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Image Crossfade & Scale
      tl.fromTo(imageRef.current,
        { opacity: 0.2, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
        0
      );
      
      // Details Text Reveal
      if (contentRef.current) {
        tl.fromTo(contentRef.current.children,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "power3.out" },
          0.1
        );
      }
    }, displayRef);
    
    return () => ctx.revert();
  }, [activeIndex]);

  // Durability Stars Render
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={cn(
          "w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-500", 
          i < rating ? "fill-primary text-primary" : "fill-[#EAE5DF] text-[#EAE5DF]"
        )} 
      />
    ));
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-[#1F1F1F] py-24 sm:py-32 overflow-hidden text-white"
      aria-label="Premium Material Library"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="mx-auto max-w-[720px] text-center mb-16 sm:mb-24 flex flex-col items-center"
        >
          <span className="mb-4 sm:mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Premium Materials
          </span>
          <h2 className="mb-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-white">
            Crafted With The Finest Materials
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-[#EAE5DF] max-w-2xl">
            Every Nova Kitchen is built using carefully selected materials that combine timeless beauty, durability and exceptional craftsmanship. Explore finishes designed to elevate modern living.
          </p>
        </div>

        {/* Layout Container */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16 xl:gap-24">
          
          {/* Left Panel: Material Selector (35%) */}
          <div className="w-full lg:w-[35%] flex-shrink-0">
            {/* Desktop Vertical List */}
            <div className="hidden lg:flex flex-col">
              {materials.map((mat, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button suppressHydrationWarning
                    key={mat.id}
                    onClick={() => setActiveIndex(idx)}
                    className="group relative flex items-center w-full text-left py-6 border-b border-white/10 last:border-0 focus-visible:outline-none focus-visible:bg-white/5"
                    aria-selected={isActive}
                  >
                    {/* Active Line Indicator */}
                    <div className={cn(
                      "absolute left-0 top-0 bottom-0 w-[3px] bg-primary transition-transform duration-500 origin-top",
                      isActive ? "scale-y-100" : "scale-y-0"
                    )} />
                    
                    <div className="pl-8 flex flex-col transition-transform duration-500 group-hover:translate-x-2">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-primary font-semibold mb-1">
                        {mat.category}
                      </span>
                      <span className={cn(
                        "font-heading text-2xl transition-colors duration-500",
                        isActive ? "text-white font-medium" : "text-white/40 group-hover:text-white/70"
                      )}>
                        {mat.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile/Tablet Horizontal Scroll */}
            <div className="flex lg:hidden overflow-x-auto pb-6 -mx-6 px-6 snap-x snap-mandatory hide-scrollbar gap-4">
              {materials.map((mat, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button suppressHydrationWarning
                    key={mat.id}
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "flex-shrink-0 snap-start flex flex-col items-start px-6 py-4 rounded-2xl border transition-all duration-300",
                      isActive ? "bg-white/10 border-primary shadow-[0_0_20px_rgba(196,106,60,0.15)]" : "bg-transparent border-white/10 opacity-70"
                    )}
                  >
                    <span className="font-sans text-[10px] uppercase tracking-widest text-primary font-semibold mb-1">
                      {mat.category}
                    </span>
                    <span className="font-heading text-xl whitespace-nowrap">
                      {mat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Material Display (65%) */}
          <div ref={displayRef} className="w-full lg:w-[65%] flex-grow bg-white/5 rounded-[32px] overflow-hidden border border-white/10 p-4 sm:p-8 lg:p-10">
            
            {/* Material Image */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[3/2] rounded-[24px] overflow-hidden mb-10 shadow-2xl">
              <Image
                ref={imageRef}
                src={activeMaterial.image}
                alt={activeMaterial.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 65vw"
                priority
              />
            </div>

            {/* Material Information */}
            <div ref={contentRef} className="flex flex-col">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-8 mb-8 gap-6">
                <div>
                  <span className="block font-sans text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                    {activeMaterial.category} Collection
                  </span>
                  <h3 className="font-heading text-3xl sm:text-4xl font-medium text-white">
                    {activeMaterial.name}
                  </h3>
                </div>
                <div className="flex flex-col space-y-2 sm:items-end">
                  <span className="font-sans text-xs uppercase tracking-widest text-white/50">
                    Durability
                  </span>
                  <div className="flex space-x-1">
                    {renderStars(activeMaterial.durability)}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="font-sans text-base sm:text-lg text-[#EAE5DF] leading-relaxed mb-10 max-w-2xl">
                {activeMaterial.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10 bg-white/5 p-6 rounded-2xl">
                <div>
                  <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-2">
                    Finish Type
                  </span>
                  <span className="font-sans text-sm font-medium">
                    {activeMaterial.finish}
                  </span>
                </div>
                <div>
                  <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-2">
                    Maintenance Level
                  </span>
                  <span className="font-sans text-sm font-medium">
                    {activeMaterial.maintenance}
                  </span>
                </div>
                <div>
                  <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-2">
                    Best Used For
                  </span>
                  <span className="font-sans text-sm font-medium">
                    {activeMaterial.bestUsedFor}
                  </span>
                </div>
              </div>

              {/* Highlights List */}
              <div className="pt-2">
                <span className="block font-sans text-xs font-semibold uppercase tracking-widest text-white/60 mb-6">
                  Material Highlights
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {activeMaterial.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="font-sans text-sm text-[#EAE5DF]">
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
      
      {/* CSS for hiding scrollbar on mobile horizontal scroll */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
