"use client";

import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { clientStories, socialProofStats } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStory = clientStories[activeIndex];
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const storyContainerRef = useRef(null);
  const selectorRef = useRef(null);
  const statsRef = useRef(null);
  
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  // Initial Scroll Reveal
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
      
      // Layout Reveal
      gsap.from([storyContainerRef.current, selectorRef.current], {
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

      // Stats Reveal
      gsap.from(statsRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 90%",
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
        { opacity: 0.5, scale: 1.02 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out", overwrite: true },
        0
      );
      
      // Text Reveal
      if (contentRef.current) {
        tl.fromTo(contentRef.current.children,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power3.out" },
          0.1
        );
      }
    }, storyContainerRef);

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-white py-24 sm:py-32 overflow-hidden"
      aria-label="Client Stories"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="mx-auto max-w-[760px] text-center mb-16 sm:mb-24 flex flex-col items-center"
        >
          <span className="mb-4 sm:mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Client Stories
          </span>
          <h2 className="mb-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-heading">
            Spaces Loved By Every Family
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-[#5F6368] max-w-2xl">
            Every project is designed around our clients' lifestyles, resulting in beautiful spaces that combine functionality, craftsmanship and timeless elegance.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16 xl:gap-24 mb-24 sm:mb-32">
          
          {/* Left: Active Story (55%) */}
          <div ref={storyContainerRef} className="w-full lg:w-[55%] flex flex-col">
            
            {/* Project Image */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-[32px] overflow-hidden shadow-[0_20px_40px_rgba(31,31,31,0.06)] mb-10 sm:mb-12">
              <Image
                ref={imageRef}
                src={activeStory.image}
                alt={activeStory.project}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
              <div className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-heading">
                  Completed {activeStory.completed}
                </span>
              </div>
            </div>

            {/* Story Content */}
            <div ref={contentRef} className="flex flex-col">
              
              <div className="flex items-center space-x-3 mb-6">
                <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#C46A3C]">
                  {activeStory.project}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#EAE5DF]" />
                <span className="font-sans text-[10px] sm:text-xs uppercase tracking-widest text-[#5F6368]">
                  {activeStory.projectType}
                </span>
              </div>

              <div className="relative mb-8 sm:mb-10 pl-6 sm:pl-8 border-l-2 border-[#C46A3C]">
                <Quote className="absolute top-0 left-[-11px] w-5 h-5 text-white bg-[#C46A3C] p-[3px] rounded-full" />
                <p className="font-heading text-2xl sm:text-3xl lg:text-4xl font-medium text-heading leading-[1.3] mb-6">
                  "{activeStory.quote}"
                </p>
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-semibold text-heading">
                    {activeStory.client}
                  </span>
                  <span className="font-sans text-xs text-[#5F6368] mt-1">
                    Homeowner
                  </span>
                </div>
              </div>

              <p className="font-sans text-base sm:text-lg text-[#5F6368] leading-relaxed mb-10">
                {activeStory.overview}
              </p>

              {/* Project Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-[#FBF8F4] p-6 rounded-2xl">
                {activeStory.highlights.map((highlight, idx) => (
                  <div key={idx}>
                    <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-[#5F6368] mb-1">
                      {highlight.label}
                    </span>
                    <span className="font-sans text-sm text-heading font-medium truncate block max-w-full" title={highlight.value}>
                      {highlight.value}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Right: Client Selector (45%) */}
          <div ref={selectorRef} className="w-full lg:w-[45%] flex flex-col space-y-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-[#5F6368] mb-4 lg:mb-6 pl-4">
              Select A Story
            </h3>
            {clientStories.map((story, idx) => {
              const isActive = activeIndex === idx;
              
              return (
                <button suppressHydrationWarning
                  key={story.id}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "group relative flex items-center p-4 sm:p-5 rounded-[24px] text-left transition-all duration-500 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary border",
                    isActive 
                      ? "bg-[#FBF8F4] border-transparent shadow-[0_10px_20px_rgba(31,31,31,0.03)]" 
                      : "bg-transparent border-[#EAE5DF]/50 hover:bg-[#FBF8F4]/50 hover:border-transparent"
                  )}
                  aria-pressed={isActive}
                >
                  {/* Thumbnail */}
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-[12px] sm:rounded-[16px] overflow-hidden flex-shrink-0 mr-4 sm:mr-6">
                    <Image
                      src={story.image}
                      alt={story.client}
                      fill
                      className={cn(
                        "object-cover transition-transform duration-700",
                        isActive ? "scale-100" : "scale-110 group-hover:scale-105"
                      )}
                      sizes="64px"
                    />
                    <div className={cn(
                      "absolute inset-0 transition-colors duration-500",
                      isActive ? "bg-transparent" : "bg-white/20 group-hover:bg-transparent"
                    )} />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-grow min-w-0">
                    <h4 className={cn(
                      "font-heading text-lg sm:text-xl transition-colors duration-500 truncate",
                      isActive ? "text-heading font-medium" : "text-[#5F6368] group-hover:text-heading"
                    )}>
                      {story.project}
                    </h4>
                    <span className="font-sans text-xs text-[#5F6368] mt-1 truncate">
                      {story.client}
                    </span>
                  </div>

                  {/* Active Indicator Line */}
                  <div className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full bg-[#C46A3C] transition-all duration-500",
                    isActive ? "h-1/2 opacity-100" : "h-0 opacity-0"
                  )} />
                </button>
              );
            })}
          </div>

        </div>

        {/* Bottom: Social Proof Stats */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-12 border-t border-[#EAE5DF]"
        >
          {socialProofStats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-heading mb-2 sm:mb-4">
                {stat.value}
              </span>
              <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#5F6368]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
