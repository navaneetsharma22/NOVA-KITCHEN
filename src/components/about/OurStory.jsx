"use client";

import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { aboutData } from "@/data/about";
import { cn } from "@/lib/utils";

export function OurStory() {
  const sectionRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    registerGSAP();
    let ctx = gsap.context(() => {
      // Reveal entire section
      gsap.from(leftPanelRef.current, {
        opacity: 0,
        x: -40,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
      
      gsap.from(rightPanelRef.current.children, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      // Timeline Progress Indicator Logic
      const timelineItems = rightPanelRef.current.children;
      
      Array.from(timelineItems).forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            gsap.to(indicatorRef.current, {
              y: `${index * 100}%`,
              duration: 0.5,
              ease: "power3.out"
            });
            // Highlight active year
            gsap.to(`#year-${index}`, { color: "#C46A3C", duration: 0.3 });
          },
          onEnterBack: () => {
            gsap.to(indicatorRef.current, {
              y: `${index * 100}%`,
              duration: 0.5,
              ease: "power3.out"
            });
            gsap.to(`#year-${index}`, { color: "#C46A3C", duration: 0.3 });
          },
          onLeave: () => {
            gsap.to(`#year-${index}`, { color: "#5F6368", duration: 0.3 });
          },
          onLeaveBack: () => {
            gsap.to(`#year-${index}`, { color: "#5F6368", duration: 0.3 });
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-[#FAFAF9] py-24 sm:py-32 lg:py-48"
      aria-label="Our Story"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-24">
          
          {/* Left: Sticky Panel (40%) */}
          <div ref={leftPanelRef} className="w-full lg:w-[40%] flex-shrink-0 lg:sticky lg:top-48">
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-heading mb-6">
              Our Story
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#5F6368] leading-relaxed mb-12 max-w-md">
              A journey of uncompromising quality, relentless innovation, and a profound respect for architectural integrity.
            </p>

            {/* Timeline Years Index */}
            <div className="relative pl-6 border-l border-[#EAE5DF] flex flex-col space-y-6">
              {/* Active Indicator Bar */}
              <div 
                ref={indicatorRef} 
                className="absolute left-[-1px] top-0 w-[2px] h-6 bg-[#C46A3C]"
              />
              
              {aboutData.storyTimeline.map((item, idx) => (
                <div key={idx} id={`year-${idx}`} className="font-heading text-xl sm:text-2xl text-[#5F6368] transition-colors duration-300">
                  {item.year}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Scrolling Timeline Content (60%) */}
          <div ref={rightPanelRef} className="w-full lg:w-[60%] flex flex-col space-y-32">
            {aboutData.storyTimeline.map((item, idx) => (
              <div key={idx} className="flex flex-col group">
                <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-8 shadow-sm">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  {/* Subtle dark overlay for contrast */}
                  <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
                </div>
                
                <h3 className="font-heading text-3xl sm:text-4xl font-medium text-heading mb-4">
                  {item.title}
                </h3>
                <p className="font-sans text-base sm:text-lg text-[#5F6368] leading-relaxed max-w-xl">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
