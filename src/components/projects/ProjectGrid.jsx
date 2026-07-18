"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectGrid({ projects }) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!projects || projects.length === 0) return;

    let ctx = gsap.context(() => {
      // Create a staggered reveal for all cards currently in the DOM
      gsap.from(gridRef.current.children, {
        y: 60, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { 
          trigger: gridRef.current, 
          start: "top 85%",
        }
      });
    }, gridRef);

    return () => ctx.revert();
  }, [projects]); // Re-run when projects array changes (e.g., from filtering)

  if (!projects || projects.length === 0) {
    return (
      <div className="w-full py-24 sm:py-32 flex justify-center items-center">
        <p className="font-sans text-lg text-[#5F6368]">No projects found in this category.</p>
      </div>
    );
  }

  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        
        {/* Strict 2-Column Symmetrical Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16 lg:gap-y-24">
          
          {projects.map((project) => (
            <Link 
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group block w-full"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-6 sm:mb-8 bg-[#FBF8F4]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Subtle dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
              </div>

              {/* Content Header */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#5F6368]">
                  {project.location}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#EAE5DF]" />
                <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
                  {project.category}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-heading text-2xl sm:text-3xl font-medium text-heading mb-4 transition-colors group-hover:text-[#C46A3C]">
                {project.title}
              </h3>
              
              <p className="font-sans text-sm sm:text-base text-[#5F6368] leading-relaxed mb-6 max-w-lg">
                {project.shortDescription}
              </p>

              {/* Specs Footer */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#EAE5DF] pt-6">
                <div className="flex flex-col">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#A8A39D] mb-1">Materials</span>
                  <span className="font-sans text-xs sm:text-sm font-medium text-heading">{project.materials}</span>
                </div>
                <div className="hidden sm:flex flex-col border-l border-[#EAE5DF] pl-6">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#A8A39D] mb-1">Completed</span>
                  <span className="font-sans text-xs sm:text-sm font-medium text-heading">{project.completed}</span>
                </div>
                
                <div className="ml-auto flex items-center justify-center w-10 h-10 rounded-full border border-[#EAE5DF] bg-[#FBF8F4] transition-all duration-300 group-hover:bg-[#C46A3C] group-hover:border-[#C46A3C] group-hover:text-white text-heading">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
          
        </div>

      </div>
    </section>
  );
}
