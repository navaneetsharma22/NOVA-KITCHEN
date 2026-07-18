"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CaseStudyHero({ project }) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Image Parallax
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Content Fade Up
      gsap.from(contentRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-black">
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-[130%] -top-[15%]">
        <Image
          ref={imageRef}
          src={project.image}
          alt={project.title}
          fill
          className="object-cover opacity-70"
          priority
          sizes="100vw"
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 pb-16 sm:pb-24">
          <div ref={contentRef} className="max-w-4xl text-white">
            
            <div className="flex items-center space-x-4 mb-6">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                {project.location}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#C46A3C]" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
                {project.category}
              </span>
            </div>

            <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-medium leading-[1.1] mb-8 text-white">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/20 pt-6">
              <div className="flex flex-col">
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">Area</span>
                <span className="font-sans text-sm font-medium">{project.area}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">Completed</span>
                <span className="font-sans text-sm font-medium">{project.completed}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">Materials</span>
                <span className="font-sans text-sm font-medium">{project.materials}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
