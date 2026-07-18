"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutData } from "@/data/about";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutHero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Split heading into words for staggered reveal
      const words = headingRef.current.children;
      
      gsap.from(words, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2
      });
      
      gsap.from(textRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.8
      });

      // Parallax Background
      gsap.to(bgRef.current, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image with Parallax */}
      <div 
        ref={bgRef}
        className="absolute inset-[-10%] w-[120%] h-[120%]"
      >
        <Image
          src="/images/hero/kitchen_island.png" // Reusing our best ultra-wide hero image
          alt="Nova Kitchens Architecture"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] px-6 sm:px-8 pt-20 flex flex-col items-center text-center">
        
        <div ref={textRef} className="flex flex-col items-center w-full max-w-[900px]">
          <span className="mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-[#C46A3C]">
            {aboutData.hero.label}
          </span>
          
          <h1 
            ref={headingRef}
            className="mb-8 font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.05] text-white flex flex-wrap justify-center gap-x-4 gap-y-2"
          >
            {aboutData.hero.heading.split(" ").map((word, idx) => (
              <span key={idx} className="inline-block">{word}</span>
            ))}
          </h1>
          
          <p className="font-sans text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl">
            {aboutData.hero.description}
          </p>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70">
        <span className="font-sans text-[10px] uppercase tracking-widest text-white mb-4">Discover</span>
        <div className="w-[1px] h-12 bg-white/30 overflow-hidden">
          <div className="w-full h-full bg-white animate-scroll-down origin-top" />
        </div>
      </div>
    </section>
  );
}
