"use client";

import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Check, Phone } from "lucide-react";
import { faqQuestions } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // First question open by default
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);

  useEffect(() => {
    registerGSAP();
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
      
      // Panels Reveal
      gsap.from([leftPanelRef.current, rightPanelRef.current], {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-[#FAFAF9] py-24 sm:py-32 overflow-hidden"
      aria-label="Frequently Asked Questions"
    >
      {/* Background Soft Gradient & Noise Texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAF9] via-[#FDFCFB] to-[#F5EBE1]/40 opacity-70" />
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8">
        
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="mx-auto max-w-[760px] text-center mb-16 sm:mb-24 flex flex-col items-center"
        >
          <span className="mb-4 sm:mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Frequently Asked Questions
          </span>
          <h2 className="mb-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-heading">
            Everything You Need To Know Before Starting
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-[#5F6368] max-w-2xl">
            We've answered the most common questions about our design process, materials, timelines and installation to help you make informed decisions with confidence.
          </p>
        </div>

        {/* 40/60 Layout */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16 xl:gap-20">
          
          {/* Left: Consultation Panel (40%) */}
          <div ref={leftPanelRef} className="w-full lg:w-[40%] flex-shrink-0 lg:sticky lg:top-32">
            <div className="flex flex-col bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_20px_40px_rgba(31,31,31,0.04)] border border-[#EAE5DF]/50">
              
              <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-8">
                <Image
                  src="/images/process/process_consultation_1784363019295.png"
                  alt="Design Consultation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-medium text-heading mb-4">
                Need Personal Guidance?
              </h3>
              
              <p className="font-sans text-sm sm:text-base text-[#5F6368] leading-relaxed mb-8">
                Our design consultants are here to help you plan your dream kitchen with expert recommendations tailored to your space and lifestyle.
              </p>

              <div className="flex flex-col space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[#F5EBE1] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#C46A3C]" strokeWidth={3} />
                  </div>
                  <span className="font-sans text-sm text-heading font-medium">Free Design Consultation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[#F5EBE1] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#C46A3C]" strokeWidth={3} />
                  </div>
                  <span className="font-sans text-sm text-heading font-medium">Premium Material Guidance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[#F5EBE1] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#C46A3C]" strokeWidth={3} />
                  </div>
                  <span className="font-sans text-sm text-heading font-medium">Transparent Pricing</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 mt-auto">
                <Link href="/contact" className="flex-1 h-14 inline-flex items-center justify-center rounded-full bg-heading px-8 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-black hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(31,31,31,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heading">
                  Book Free Consultation
                </Link>
                <a href="tel:+919876543210" className="flex-1 h-14 inline-flex items-center justify-center rounded-full bg-transparent border border-[#EAE5DF] px-8 font-sans text-sm font-semibold text-heading transition-all duration-300 hover:bg-[#FBF8F4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heading">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Our Design Team
                </a>
              </div>

            </div>
          </div>

          {/* Right: Premium Accordion (60%) */}
          <div ref={rightPanelRef} className="w-full lg:w-[60%] flex flex-col space-y-4">
            {faqQuestions.map((item, idx) => {
              const isOpen = openIndex === idx;
              
              return (
                <div 
                  key={item.id}
                  className={cn(
                    "group bg-white rounded-[24px] transition-all duration-500 overflow-hidden border",
                    isOpen 
                      ? "border-[#C46A3C]/20 shadow-[0_20px_40px_rgba(31,31,31,0.03)]" 
                      : "border-[#EAE5DF]/50 hover:border-[#EAE5DF] hover:shadow-[0_10px_30px_rgba(31,31,31,0.02)]"
                  )}
                >
                  <button suppressHydrationWarning
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="w-full flex items-center justify-between text-left px-6 sm:px-8 py-6 focus-visible:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className={cn(
                      "font-heading text-lg sm:text-xl pr-8 transition-colors duration-300",
                      isOpen ? "text-heading font-medium" : "text-[#5F6368] group-hover:text-heading"
                    )}>
                      {item.question}
                    </span>
                    <div className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500",
                      isOpen ? "bg-[#C46A3C] text-white rotate-180" : "bg-[#FBF8F4] text-[#5F6368]"
                    )}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <div 
                    className={cn(
                      "grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                        <p className="font-sans text-sm sm:text-base text-[#5F6368] leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
