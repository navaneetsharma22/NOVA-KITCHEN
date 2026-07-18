"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, Quote } from "lucide-react";
import gsap from "gsap";

export function CaseStudyModal({ project, isOpen, onClose }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!modalRef.current) return;

    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = "hidden";
      
      const tl = gsap.timeline();
      
      // Animate overlay fade in
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        display: "block"
      });
      
      // Animate modal slide up and fade
      tl.fromTo(modalRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.8, ease: "power4.out" },
        "<0.1"
      );

    } else {
      // Restore body scroll
      document.body.style.overflow = "";
      
      const tl = gsap.timeline();
      
      // Animate modal slide down
      tl.to(modalRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.6,
        ease: "power3.in"
      });
      
      // Fade out overlay
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        display: "none"
      }, "<0.2");
    }
    
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!project) return null;

  return (
    <>
      {/* Dark Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm hidden opacity-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Fullscreen Modal */}
      <div 
        ref={modalRef}
        className="fixed inset-x-0 bottom-0 top-0 sm:top-10 z-[101] flex flex-col bg-[#FBF8F4] sm:rounded-t-[40px] overflow-hidden translate-y-full opacity-0 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 sm:top-8 sm:right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/10 backdrop-blur-md text-heading transition-transform duration-300 hover:scale-110 hover:bg-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Close case study"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Scrollable Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto overflow-x-hidden">
          
          {/* Hero Banner */}
          <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-8 sm:p-12 lg:p-20">
              <span className="block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C] mb-4">
                Case Study
              </span>
              <h2 id="modal-title" className="font-heading text-4xl sm:text-5xl lg:text-7xl font-medium text-white mb-6">
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-6 text-white/80 font-sans text-sm">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Location</span>
                  <span>{project.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Area</span>
                  <span>{project.area}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Completed</span>
                  <span>{project.completed}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Case Study Content */}
          <div className="mx-auto max-w-4xl px-6 sm:px-12 py-16 sm:py-24">
            
            {/* Overview */}
            <div className="mb-16">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-primary mb-6">Overview</h3>
              <p className="font-heading text-2xl sm:text-3xl lg:text-4xl leading-relaxed text-heading">
                {project.caseStudy.overview}
              </p>
            </div>

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 mb-24 border-t border-[#EAE5DF] pt-16">
              <div>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-primary mb-4">The Challenge</h3>
                <p className="font-sans text-base leading-relaxed text-[#5F6368]">
                  {project.caseStudy.challenge}
                </p>
              </div>
              <div>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-primary mb-4">The Solution</h3>
                <p className="font-sans text-base leading-relaxed text-[#5F6368]">
                  {project.caseStudy.solution}
                </p>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_20px_40px_rgba(31,31,31,0.05)] mb-24 relative overflow-hidden">
              <Quote className="absolute top-6 left-6 sm:top-10 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 text-primary/10" />
              <div className="relative z-10 pl-6 sm:pl-16">
                <p className="font-heading text-xl sm:text-2xl leading-relaxed text-heading mb-8 italic">
                  "{project.caseStudy.testimonial.quote}"
                </p>
                <span className="font-sans text-sm font-semibold uppercase tracking-widest text-primary">
                  — {project.caseStudy.testimonial.author}
                </span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#EAE5DF] pt-12 pb-12">
              <div className="flex flex-col mb-6 sm:mb-0 text-center sm:text-left">
                <span className="font-heading text-2xl text-heading mb-2">Ready to start your project?</span>
                <span className="font-sans text-sm text-[#5F6368]">Our design team is ready to assist you.</span>
              </div>
              <Link href="/contact" className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-10 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-hover hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(196,106,60,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                Book Consultation
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
