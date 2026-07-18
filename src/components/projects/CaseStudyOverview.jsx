"use client";

import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

import React, { useRef, useEffect } from "react";
export function CaseStudyOverview({ project }) {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    registerGSAP();
    let ctx = gsap.context(() => {
      gsap.from(leftRef.current.children, {
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
      });
      gsap.from(rightRef.current.children, {
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left: Overview text */}
          <div ref={leftRef} className="w-full lg:w-1/2">
            <span className="mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
              Project Overview
            </span>
            <p className="font-sans text-xl sm:text-3xl text-heading leading-[1.4] font-medium">
              {project.caseStudy.overview}
            </p>
          </div>

          {/* Right: Challenge & Solution */}
          <div ref={rightRef} className="w-full lg:w-1/2 flex flex-col space-y-12">
            <div>
              <h3 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-heading mb-4 border-b border-[#EAE5DF] pb-4">
                The Challenge
              </h3>
              <p className="font-sans text-base sm:text-lg text-[#5F6368] leading-relaxed">
                {project.caseStudy.challenge}
              </p>
            </div>
            <div>
              <h3 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#C46A3C] mb-4 border-b border-[#EAE5DF] pb-4">
                The Solution
              </h3>
              <p className="font-sans text-base sm:text-lg text-[#5F6368] leading-relaxed">
                {project.caseStudy.solution}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
