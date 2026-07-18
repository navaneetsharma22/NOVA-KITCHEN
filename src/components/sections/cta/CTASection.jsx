"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Check, Phone, Mail, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const trustPills = [
  "Free Design Consultation",
  "Custom 3D Visualization",
  "Premium Materials",
  "Professional Installation"
];

export function CTASection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const illustrationRef = useRef(null);
  const infoRef = useRef(null);
  const pillsRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Content Stagger Reveal
      gsap.from(contentRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
      
      // Trust Pills Reveal
      gsap.from(pillsRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pillsRef.current,
          start: "top 90%",
        }
      });

      // Quick Info Reveal
      gsap.from(infoRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 95%",
        }
      });

      // Subtle Parallax on Background Illustration
      gsap.to(illustrationRef.current, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
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
      className="relative w-full bg-[#F5EBE1] py-32 sm:py-40 lg:py-48 overflow-hidden"
      aria-label="Start Your Journey"
    >
      {/* Premium Background Architecture */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBF8F4]/50 to-transparent" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/clean-textile.png")' }} />
      
      {/* Massive Abstract Architectural SVG Outline (Low Opacity Blueprint) */}
      <div 
        ref={illustrationRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[120%] min-w-[1200px] pointer-events-none opacity-[0.04] text-[#C46A3C]"
      >
        <svg viewBox="0 0 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto stroke-current" strokeWidth="1">
          {/* Abstract Kitchen Island & Cabinetry Floorplan Lines */}
          <rect x="200" y="150" width="600" height="150" />
          <line x1="200" y1="200" x2="800" y2="200" />
          <line x1="400" y1="150" x2="400" y2="300" />
          <line x1="600" y1="150" x2="600" y2="300" />
          <rect x="250" y="50" width="500" height="60" />
          <circle cx="300" cy="80" r="15" />
          <circle cx="700" cy="80" r="15" />
          <path d="M 100 350 L 900 350" strokeDasharray="10 10" />
          <path d="M 500 50 L 500 150" strokeDasharray="5 5" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[900px] px-6 sm:px-8 flex flex-col items-center text-center">
        
        {/* Main Content */}
        <div ref={contentRef} className="flex flex-col items-center mb-16">
          <span className="mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Start Your Journey
          </span>
          <h2 className="mb-8 font-heading text-4xl sm:text-5xl lg:text-7xl font-medium leading-[1.1] text-heading">
            Let's Create Your Dream Space
          </h2>
          <p className="font-sans text-base sm:text-lg lg:text-xl leading-relaxed text-[#5F6368] max-w-2xl mb-12">
            Whether you're planning a bespoke modular kitchen, a luxury wardrobe or a complete storage solution, our design specialists are ready to transform your vision into a timeless living experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Link href="/contact" className="w-full sm:w-auto h-14 inline-flex items-center justify-center rounded-full bg-heading px-10 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-black hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(31,31,31,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heading">
              Book Free Consultation
            </Link>
            <Link href="/collections" className="group w-full sm:w-auto h-14 inline-flex items-center justify-center rounded-full bg-transparent border border-heading/20 px-10 font-sans text-sm font-semibold text-heading transition-all duration-300 hover:border-heading hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heading">
              <span>Explore Our Collections</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Contact Quick Info */}
        <div ref={infoRef} className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-20 border-t border-b border-heading/10 py-8 w-full max-w-3xl">
          <div className="flex items-center space-x-3 text-heading">
            <Phone className="w-4 h-4 text-[#C46A3C]" />
            <span className="font-sans text-sm font-medium">+91 XXX XXX XXXX</span>
          </div>
          <div className="flex items-center space-x-3 text-heading">
            <Mail className="w-4 h-4 text-[#C46A3C]" />
            <span className="font-sans text-sm font-medium">hello@novakitchens.com</span>
          </div>
          <div className="flex items-center space-x-3 text-heading">
            <Clock className="w-4 h-4 text-[#C46A3C]" />
            <div className="flex flex-col text-left">
              <span className="font-sans text-sm font-medium">Mon – Sat</span>
              <span className="font-sans text-[10px] text-[#5F6368] uppercase tracking-widest">9:00 AM – 7:00 PM</span>
            </div>
          </div>
        </div>

        {/* Trust Indicators (Pills) */}
        <div ref={pillsRef} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {trustPills.map((pill, idx) => (
            <div 
              key={idx}
              className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-white/40 px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-sm"
            >
              <div className="w-4 h-4 rounded-full bg-[#FBF8F4] flex items-center justify-center flex-shrink-0">
                <Check className="w-2.5 h-2.5 text-[#C46A3C]" strokeWidth={3} />
              </div>
              <span className="font-sans text-xs sm:text-sm font-medium text-heading">
                {pill}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
