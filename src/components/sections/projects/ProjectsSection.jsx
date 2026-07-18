"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import { CoverflowCarousel } from "./CoverflowCarousel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectsSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const carouselRef = useRef(null);

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
      
      // Carousel Reveal
      gsap.from(carouselRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-white py-24 sm:py-32 overflow-hidden"
      aria-label="Signature Projects"
    >
      {/* Section Header */}
      <div 
        ref={headerRef}
        className="mx-auto max-w-[760px] text-center mb-16 sm:mb-24 px-6 sm:px-8 flex flex-col items-center"
      >
        <span className="mb-4 sm:mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
          Signature Projects
        </span>
        <h2 className="mb-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-heading">
          Crafting Spaces That Define Modern Living
        </h2>
        <p className="font-sans text-base sm:text-lg leading-relaxed text-[#5F6368] max-w-2xl">
          Explore a curated selection of our finest modular kitchens, wardrobes and bespoke storage spaces designed with exceptional craftsmanship and timeless elegance.
        </p>
      </div>

      {/* Full-width Carousel Area */}
      <div ref={carouselRef} className="w-full">
        <CoverflowCarousel projects={projects} />
      </div>
      
    </section>
  );
}
