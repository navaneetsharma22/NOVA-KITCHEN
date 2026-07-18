"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CaseStudyTimeline({ project }) {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(timelineRef.current.children, {
        x: -40, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!project.timeline) return null;

  return (
    <section ref={sectionRef} className="w-full bg-[#1F1F1F] py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        
        <div className="mb-16">
          <span className="mb-4 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Execution
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-medium text-white">
            Project Timeline
          </h2>
        </div>

        <div ref={timelineRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-6 left-6 right-6 h-[1px] bg-white/10" />

          {project.timeline.map((step, idx) => (
            <div key={idx} className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#2A2623] border border-white/20 flex items-center justify-center mb-6 text-[#C46A3C]">
                <Check className="w-5 h-5" />
              </div>
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-white/50 mb-2 block">
                {step.duration}
              </span>
              <h4 className="font-heading text-2xl font-medium text-white mb-3">
                {step.phase}
              </h4>
              <p className="font-sans text-sm text-[#A8A39D] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
