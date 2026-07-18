"use client";

import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
export function CaseStudyGallery({ project }) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    registerGSAP();
    let ctx = gsap.context(() => {
      gsap.from(gridRef.current.children, {
        y: 60, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!project.gallery || project.gallery.length === 0) return null;

  return (
    <section ref={sectionRef} className="w-full bg-[#FAFAF9] py-16 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Item 1: Full width on mobile, half on desktop */}
          <div className="relative w-full aspect-[4/3] sm:aspect-square md:aspect-[4/5] rounded-[24px] overflow-hidden">
            <Image src={project.gallery[0]} alt="Gallery 1" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Item 2: Top half of second column */}
            <div className="relative w-full flex-1 min-h-[300px] rounded-[24px] overflow-hidden">
              <Image src={project.gallery[1]} alt="Gallery 2" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            
            {/* Item 3 & 4: Split bottom half of second column */}
            <div className="flex gap-6 sm:gap-8 flex-1 min-h-[300px]">
              <div className="relative w-1/2 rounded-[24px] overflow-hidden">
                <Image src={project.gallery[2]} alt="Gallery 3" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <div className="relative w-1/2 rounded-[24px] overflow-hidden">
                <Image src={project.gallery[3] || project.gallery[0]} alt="Gallery 4" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
