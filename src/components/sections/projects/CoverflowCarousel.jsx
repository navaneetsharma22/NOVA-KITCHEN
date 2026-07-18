"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CaseStudyModal } from "./CaseStudyModal";

export function CoverflowCarousel({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Interaction State
  const touchState = useRef({ startX: null, endX: null });
  const isDragging = useRef(false);
  const dragState = useRef({ startX: null, endX: null });
  const wheelTimeout = useRef(null);

  const total = projects.length;

  const wrapIndex = useCallback((index) => {
    if (index < 0) return total - 1;
    if (index >= total) return 0;
    return index;
  }, [total]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => wrapIndex(prev + 1));
  }, [wrapIndex]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => wrapIndex(prev - 1));
  }, [wrapIndex]);

  // Keyboard Events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) return;
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goPrev, goNext, isModalOpen]);

  // Mouse Wheel Events (Debounced)
  const handleWheel = (e) => {
    if (isModalOpen) return;
    if (wheelTimeout.current) return;
    
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 20) goNext();
      else if (e.deltaX < -20) goPrev();
    } else {
      if (e.deltaY > 20) goNext();
      else if (e.deltaY < -20) goPrev();
    }
    
    wheelTimeout.current = setTimeout(() => {
      wheelTimeout.current = null;
    }, 400); // 400ms debounce
  };

  // Touch Events (Mobile)
  const handleTouchStart = (e) => {
    touchState.current.startX = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchState.current.endX = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    const { startX, endX } = touchState.current;
    if (!startX || !endX) return;
    const distance = startX - endX;
    if (distance > 50) goNext();
    if (distance < -50) goPrev();
    touchState.current = { startX: null, endX: null };
  };

  // Pointer Events (Mouse Drag)
  const handlePointerDown = (e) => {
    isDragging.current = true;
    dragState.current.startX = e.clientX;
  };
  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    dragState.current.endX = e.clientX;
  };
  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const { startX, endX } = dragState.current;
    if (!startX || !endX) return;
    const distance = startX - endX;
    if (distance > 50) goNext();
    if (distance < -50) goPrev();
    dragState.current = { startX: null, endX: null };
  };

  const activeProject = projects[activeIndex];

  return (
    <div className="w-full flex flex-col">
      
      {/* Premium Crossfade Slider Stage */}
      <div 
        className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden touch-none"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {projects.map((project, i) => {
          const isActive = i === activeIndex;
          const isPrev = i === wrapIndex(activeIndex - 1);
          const isNext = i === wrapIndex(activeIndex + 1);
          
          let positionClass = "";
          let visibilityClass = "";
          let zIndexClass = "z-0";

          if (isActive) {
            positionClass = "left-1/2 -translate-x-1/2 scale-100";
            visibilityClass = "opacity-100 blur-0";
            zIndexClass = "z-20";
          } else if (isPrev) {
            positionClass = "left-[-20%] sm:left-[-10%] lg:left-[5%] scale-[0.85]";
            visibilityClass = "opacity-45 blur-[8px]";
            zIndexClass = "z-10";
          } else if (isNext) {
            positionClass = "right-[-20%] sm:right-[-10%] lg:right-[5%] scale-[0.85]";
            visibilityClass = "opacity-45 blur-[8px]";
            zIndexClass = "z-10";
          } else {
            // Hidden slides sit directly behind the active slide, invisible.
            positionClass = "left-1/2 -translate-x-1/2 scale-[0.85]";
            visibilityClass = "opacity-0 blur-[8px] pointer-events-none";
            zIndexClass = "z-0";
          }

          return (
            <div
              key={project.id}
              // CRITICAL: We restrict transition strictly to opacity and filter to prevent translation/zoom animations during swaps.
              style={{ transitionProperty: "opacity, filter" }}
              className={`absolute w-[85%] max-w-[900px] aspect-[16/10] sm:aspect-[16/9] cursor-grab active:cursor-grabbing rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(31,31,31,0.15)] duration-500 ease-in-out ${positionClass} ${visibilityClass} ${zIndexClass}`}
              onClick={() => {
                if (!isActive) setActiveIndex(i);
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover pointer-events-none"
                sizes="(max-width: 1024px) 100vw, 80vw"
                priority={true}
              />
            </div>
          );
        })}

        {/* Shift Buttons */}
        <button suppressHydrationWarning 
          onClick={goPrev}
          className="absolute left-4 sm:left-8 z-[200] w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-heading shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
          aria-label="Previous Project"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button suppressHydrationWarning 
          onClick={goNext}
          className="absolute right-4 sm:right-8 z-[200] w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-heading shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
          aria-label="Next Project"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Active Project Details */}
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 mt-12 sm:mt-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-16">
          
          {/* Info Block */}
          <div className="flex-1 flex flex-col max-w-2xl">
            <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#5F6368] mb-4">
              Project {activeIndex + 1} of {total}
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-heading mb-6">
              {activeProject.title}
            </h3>
            <p className="font-sans text-base sm:text-lg text-[#5F6368] leading-relaxed mb-8">
              {activeProject.shortDescription}
            </p>
            
            {/* Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-[#FBF8F4] p-6 rounded-2xl">
              <div>
                <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-[#5F6368] mb-1">Location</span>
                <span className="font-sans text-sm text-heading font-medium">{activeProject.location}</span>
              </div>
              <div>
                <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-[#5F6368] mb-1">Area</span>
                <span className="font-sans text-sm text-heading font-medium">{activeProject.area}</span>
              </div>
              <div>
                <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-[#5F6368] mb-1">Completed</span>
                <span className="font-sans text-sm text-heading font-medium">{activeProject.completed}</span>
              </div>
              <div>
                <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-[#5F6368] mb-1">Materials</span>
                <span className="font-sans text-sm text-heading font-medium truncate block max-w-full" title={activeProject.materials}>
                  {activeProject.materials.split(',')[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Action Block */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:pb-2">
            <button suppressHydrationWarning 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex h-14 items-center justify-center rounded-full bg-heading px-10 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-black hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(31,31,31,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heading"
            >
              View Case Study
            </button>
            <Link href="/contact" className="inline-flex h-14 items-center justify-center space-x-2 rounded-full bg-transparent border border-[#EAE5DF] px-8 font-sans text-sm font-semibold text-heading transition-all duration-300 hover:bg-[#FBF8F4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heading">
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      {/* Case Study Modal Overlay */}
      <CaseStudyModal 
        project={activeProject} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
