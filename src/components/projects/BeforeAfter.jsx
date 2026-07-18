"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveHorizontal } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function BeforeAfter({ project }) {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(sliderRef.current, {
        y: 40, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  if (!project.beforeAfter) return null;

  return (
    <section ref={sectionRef} className="w-full bg-[#FBF8F4] py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 flex flex-col items-center">
        
        <div className="mb-16 text-center">
          <span className="mb-4 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Transformation
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-medium text-heading">
            Before & After
          </h2>
        </div>

        <div 
          ref={sliderRef}
          className="relative w-full max-w-5xl aspect-[4/3] sm:aspect-[16/9] rounded-[32px] overflow-hidden bg-gray-200 cursor-ew-resize select-none"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
        >
          {/* AFTER Image (Background) */}
          <Image
            src={project.beforeAfter.after}
            alt="After Transformation"
            fill
            className="object-cover pointer-events-none"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute top-6 right-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white font-sans text-xs font-bold uppercase tracking-widest pointer-events-none">
            After
          </div>

          {/* BEFORE Image (Clipped overlay) */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <Image
              src={project.beforeAfter.before}
              alt="Before Transformation"
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="absolute top-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white font-sans text-xs font-bold uppercase tracking-widest pointer-events-none">
              Before
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white pointer-events-none flex items-center justify-center shadow-lg"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-[#5F6368]">
              <MoveHorizontal className="w-5 h-5" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
