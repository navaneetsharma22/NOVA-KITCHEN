"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { heroSlides } from "@/data/heroSlides";
import { cn } from "@/lib/utils";
import gsap from "gsap";

const AUTOPLAY_DELAY = 7;

// --- Sub-components for better Code Organization ---

const SliderControls = memo(({ onPrev, onNext }) => (
  <div className="absolute z-30 bottom-8 sm:bottom-10 right-6 sm:right-12 flex space-x-2 sm:space-x-3">
    <button suppressHydrationWarning 
      onClick={onPrev}
      className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-heading hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      aria-label="Previous Slide"
      aria-controls="hero-slider"
    >
      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} aria-hidden="true" />
    </button>
    <button suppressHydrationWarning 
      onClick={onNext}
      className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-heading hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      aria-label="Next Slide"
      aria-controls="hero-slider"
    >
      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} aria-hidden="true" />
    </button>
  </div>
));
SliderControls.displayName = "SliderControls";

const ProgressBar = memo(({ currentIndex, total, progressRef }) => (
  <div className="absolute z-30 bottom-10 sm:bottom-12 left-6 sm:left-8 lg:left-8 xl:left-[calc(50vw-720px+32px)] max-w-full flex items-center space-x-3 sm:space-x-4" aria-hidden="true">
    <span className="text-white font-sans text-xs sm:text-sm font-medium w-3 sm:w-4">
      0{currentIndex + 1}
    </span>
    <div className="w-24 sm:w-64 h-[2px] bg-white/20 relative overflow-hidden rounded-full">
      <div 
        ref={progressRef}
        className="h-full bg-white absolute top-0 left-0 w-full"
        style={{ willChange: "transform" }}
      />
    </div>
    <span className="text-white/50 font-sans text-xs sm:text-sm font-medium w-3 sm:w-4">
      0{total}
    </span>
  </div>
));
ProgressBar.displayName = "ProgressBar";

// --- Main Hero Component ---

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Touch state
  const touchState = useRef({ startX: null, endX: null });
  
  // GSAP Refs
  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const contentRefs = useRef([]);
  const progressRef = useRef(null);
  const prevIndexRef = useRef(0);
  const progressTween = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  }, []);

  // Keyboard navigation & Accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle if we aren't focused inside a form or modal
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Touch swipe handlers optimized
  const handleTouchStart = useCallback((e) => {
    touchState.current.startX = e.targetTouches[0].clientX;
    touchState.current.endX = null;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchState.current.endX = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const { startX, endX } = touchState.current;
    if (!startX || !endX) return;
    
    const distance = startX - endX;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  }, [nextSlide, prevSlide]);

  // GSAP Autoplay Timer
  useEffect(() => {
    if (progressTween.current) progressTween.current.kill();
    
    progressTween.current = gsap.fromTo(
      progressRef.current,
      { xPercent: -100 },
      { 
        xPercent: 0, 
        duration: AUTOPLAY_DELAY, 
        ease: "none",
        onComplete: nextSlide
      }
    );
    
    if (isHovered) progressTween.current.pause();
    
    return () => progressTween.current?.kill();
  }, [currentIndex, nextSlide]);

  // Handle Pause on Hover
  useEffect(() => {
    if (progressTween.current) {
      isHovered ? progressTween.current.pause() : progressTween.current.play();
    }
  }, [isHovered]);

  // GSAP Slide Transitions optimized with hardware acceleration
  useEffect(() => {
    const prevIndex = prevIndexRef.current;
    const isInitial = prevIndex === currentIndex;
    
    let ctx = gsap.context(() => {
      const nextSlideEl = slideRefs.current[currentIndex];
      const nextContentEl = contentRefs.current[currentIndex];
      const prevSlideEl = !isInitial ? slideRefs.current[prevIndex] : null;
      const prevContentEl = !isInitial ? contentRefs.current[prevIndex] : null;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Clean state for unused slides
      slideRefs.current.forEach((el, i) => {
        if (i !== currentIndex && i !== prevIndex && el) {
          gsap.set(el, { opacity: 0, zIndex: -10 });
        }
      });
      contentRefs.current.forEach((el, i) => {
        if (i !== currentIndex && i !== prevIndex && el) {
          gsap.set(el, { opacity: 0, pointerEvents: "none", visibility: "hidden" });
        }
      });

      // Outgoing Slide
      if (prevSlideEl) {
        gsap.set(prevSlideEl, { zIndex: 1 });
        tl.to(prevSlideEl, { opacity: 0, duration: 1.2 }, 0);
        if (prevContentEl) {
          tl.to(prevContentEl, { opacity: 0, y: -20, duration: 0.8 }, 0);
        }
      }

      // Incoming Slide
      if (nextSlideEl) {
        gsap.set(nextSlideEl, { zIndex: 2 });
        const img = nextSlideEl.querySelector('img');
        const eyebrow = nextContentEl.querySelector('.eyebrow');
        const heading = nextContentEl.querySelector('.heading-text');
        const desc = nextContentEl.querySelector('.desc');
        const buttons = nextContentEl.querySelectorAll('.btn');

        gsap.set(nextContentEl, { opacity: 1, y: 0, pointerEvents: "auto", visibility: "visible" });

        tl.fromTo(nextSlideEl, { opacity: 0 }, { opacity: 1, duration: 1.2 }, 0);
        tl.fromTo(img, 
          { scale: 1.08 }, 
          { scale: 1, duration: 2.5, ease: "power2.out", clearProps: "transform" }, 
          0
        );
        
        tl.fromTo(heading, 
          { yPercent: 120 }, 
          { yPercent: 0, duration: 1.2, ease: "power4.out" }, 
          0.2
        );
        
        tl.fromTo([eyebrow, desc],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15 },
          0.4
        );
        
        tl.fromTo(buttons,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          0.6
        );
      }
    }, containerRef);
    
    prevIndexRef.current = currentIndex;
    return () => ctx.revert();
  }, [currentIndex]);

  return (
    <section 
      ref={containerRef}
      id="hero-slider"
      className="relative w-full h-[100vh] min-h-[700px] overflow-hidden bg-[#1F1F1F] group"
      aria-roledescription="carousel"
      aria-label="Nova Kitchens Showcase"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* SEO: Visually hidden h1 for screen readers and crawlers */}
      <h1 className="sr-only">Nova Kitchens - Luxury Modular Kitchens & Wardrobes</h1>

      {/* 1. Background Media Layer */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id}
            ref={(el) => (slideRefs.current[index] = el)}
            className="absolute inset-0 opacity-0 -z-10"
            style={{ willChange: "opacity" }}
            aria-hidden={currentIndex !== index}
          >
            <Image
              src={slide.image}
              alt={slide.heading}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              quality={90}
              sizes="100vw"
              className="object-cover"
              style={{ willChange: "transform" }}
            />
          </div>
        ))}
      </div>

      {/* 2. Overlay Layer (Performance optimized pointer-events-none) */}
      <div 
        className="absolute inset-0 z-10 opacity-90 mix-blend-multiply pointer-events-none" 
        style={{
          background: "linear-gradient(135deg, rgba(91,64,50,0.5) 0%, rgba(196,106,60,0.1) 40%, transparent 100%)"
        }}
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 z-10 opacity-70 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 40%, rgba(31,31,31,0.7) 100%)"
        }}
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 z-10 opacity-50 pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(31,31,31,0.6) 0%, transparent 50%)"
        }}
        aria-hidden="true"
      />

      {/* 3. Hero Content Layer */}
      <div className="relative z-20 mx-auto h-full w-full max-w-[1440px] px-6 sm:px-8">
        <div className="flex h-full w-full flex-col justify-end pb-[140px] sm:pb-40 lg:justify-center lg:pb-0 lg:pt-20 lg:w-[55%] xl:w-[50%]">
          <div className="relative h-[320px] sm:h-[350px] lg:h-[400px]">
            {heroSlides.map((slide, index) => (
              <div 
                key={`content-${slide.id}`}
                ref={(el) => (contentRefs.current[index] = el)}
                className="absolute inset-0 flex flex-col space-y-4 sm:space-y-6 opacity-0 pointer-events-none invisible"
                aria-hidden={currentIndex !== index}
              >
                {/* Eyebrow */}
                <span className="eyebrow font-sans text-[10px] sm:text-xs lg:text-sm font-semibold uppercase tracking-[0.2em] text-[#FBF8F4]/90">
                  {slide.eyebrow}
                </span>
                
                {/* SEO: Changed to h2 since the hidden h1 handles the main page title */}
                <h2 className="font-heading text-[42px] sm:text-6xl lg:text-7xl xl:text-[80px] leading-[1.05] font-medium tracking-tight text-white overflow-hidden pb-1 sm:pb-2">
                  <span className="heading-text block" style={{ willChange: "transform" }}>
                    {slide.heading}
                  </span>
                </h2>
                
                {/* Description */}
                <p className="desc font-sans text-sm sm:text-base lg:text-lg leading-relaxed text-[#EAE5DF] max-w-[90%] sm:max-w-md lg:max-w-lg">
                  {slide.description}
                </p>
                
                {/* Buttons (Keyboard accessible via focus styles) */}
                <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-3 sm:gap-4 pt-4 sm:pt-6">
                  <Link 
                    href="/collections"
                    tabIndex={currentIndex === index ? 0 : -1}
                    className="btn inline-flex w-full sm:w-auto h-12 lg:h-14 items-center justify-center rounded-full bg-primary px-8 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-hover hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(196,106,60,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    {slide.primaryCta}
                  </Link>
                  <Link 
                    href="/contact"
                    tabIndex={currentIndex === index ? 0 : -1}
                    className="btn inline-flex w-full sm:w-auto h-12 lg:h-14 items-center justify-center rounded-full bg-transparent border border-white/30 px-8 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-heading hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    {slide.secondaryCta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProgressBar currentIndex={currentIndex} total={heroSlides.length} progressRef={progressRef} />
      <SliderControls onPrev={prevSlide} onNext={nextSlide} />
      
    </section>
  );
}
