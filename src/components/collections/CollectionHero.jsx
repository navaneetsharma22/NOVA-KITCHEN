"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CollectionHero({ collection }) {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Background Parallax
      gsap.to(heroRef.current, {
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Text Reveal
      gsap.from(textRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full h-[70vh] sm:h-[85vh] flex items-end overflow-hidden bg-black">
      {/* Background Image with Parallax */}
      <div ref={heroRef} className="absolute inset-[-10%] w-[120%] h-[120%]">
        <Image
          src={collection.heroImage}
          alt={collection.title}
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 pb-16 sm:pb-24">
        
        <Link 
          href="/collections" 
          className="inline-flex items-center font-sans text-xs uppercase tracking-widest text-white/70 mb-8 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3 h-3 mr-2" />
          All Collections
        </Link>
        
        <div ref={textRef} className="flex flex-col max-w-4xl">
          <span className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C] mb-4">
            {collection.label}
          </span>
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-8xl font-medium text-white leading-[1.05] mb-6">
            {collection.title}
          </h1>
          <p className="font-sans text-lg sm:text-xl lg:text-2xl text-white/80 italic leading-relaxed">
            "{collection.tagline}"
          </p>
        </div>
        
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 right-6 sm:right-8 opacity-70">
        <div className="w-[1px] h-16 bg-white/30 overflow-hidden">
          <div className="w-full h-full bg-white animate-scroll-down origin-top" />
        </div>
      </div>
    </section>
  );
}
