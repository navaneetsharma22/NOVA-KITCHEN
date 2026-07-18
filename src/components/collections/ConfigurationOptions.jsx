"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ConfigurationOptions({ collection }) {
  const [activeTab, setActiveTab] = useState(0);
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  const { configurations } = collection;

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" }
      });

      gsap.from(contentRef.current, {
        y: 60, opacity: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Handle crossfade on tab change
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(imageRef.current, 
        { opacity: 0.4, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out", overwrite: true }
      );
    }
  }, [activeTab]);

  if (!configurations || configurations.length === 0) return null;

  return (
    <section ref={sectionRef} className="w-full bg-[#1F1F1F] py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        
        <div ref={headerRef} className="mb-16 sm:mb-24">
          <span className="mb-4 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Customization
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-medium text-white">
            Configuration Options
          </h2>
        </div>

        <div ref={contentRef} className="flex flex-col lg:flex-row lg:items-stretch gap-12 lg:gap-24">
          
          {/* Left: Interactive Tabs */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center">
            <div className="flex flex-col space-y-4">
              {configurations.map((config, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={config.id}
                    onClick={() => setActiveTab(idx)}
                    className={cn(
                      "group flex flex-col text-left py-6 border-b border-[#3A3632] transition-colors focus-visible:outline-none",
                      isActive ? "border-white" : "hover:border-[#5F6368]"
                    )}
                  >
                    <div className="flex items-center justify-between w-full mb-3">
                      <h3 className={cn(
                        "font-heading text-2xl sm:text-3xl transition-colors duration-300",
                        isActive ? "text-white" : "text-[#A8A39D] group-hover:text-white"
                      )}>
                        {config.title}
                      </h3>
                      <ArrowRight className={cn(
                        "w-5 h-5 transition-all duration-300",
                        isActive ? "text-[#C46A3C] opacity-100 translate-x-0" : "text-[#A8A39D] opacity-0 -translate-x-4 group-hover:opacity-100"
                      )} />
                    </div>
                    
                    <div className={cn(
                      "grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}>
                      <div className="overflow-hidden">
                        <p className="font-sans text-sm sm:text-base text-[#D1CFCD] leading-relaxed max-w-md">
                          {config.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Dynamic Image */}
          <div className="w-full lg:w-[60%] h-[400px] lg:h-[600px]">
            <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-[#2A2623]">
              <Image
                ref={imageRef}
                src={configurations[activeTab].image}
                alt={configurations[activeTab].title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
