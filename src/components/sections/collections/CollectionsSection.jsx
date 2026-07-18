"use client";

import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

import React, { useRef, useEffect } from "react";
import { collections } from "@/data/collections";
import { CollectionCard } from "@/components/cards/CollectionCard";

// Register ScrollTrigger for scroll-based animations


export function CollectionsSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    registerGSAP();
    // Clean up function context
    let ctx = gsap.context(() => {
      // 1. Header Reveal Animation
      gsap.from(headerRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%", // Triggers when the top of header hits 85% of viewport
        },
      });

      // 2. Cards Staggered Reveal
      const cards = gsap.utils.toArray(".collection-card-wrapper");
      
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1, // Smooth sequence
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="w-full bg-[#FBF8F4] py-24 sm:py-32 overflow-hidden" 
      aria-label="Our Collections"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        
        {/* Section Header */}
        <div 
          ref={headerRef} 
          className="mx-auto max-w-[720px] text-center mb-16 sm:mb-24 flex flex-col items-center"
        >
          <span className="mb-4 sm:mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Our Collections
          </span>
          <h2 className="mb-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-[#1F1F1F]">
            Discover Spaces Designed Around Your Lifestyle
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-[#5F6368] max-w-2xl">
            Explore our curated collection of bespoke kitchens, wardrobes, and storage solutions, crafted with precision, premium materials, and timeless design.
          </p>
        </div>

        {/* Collections Grid */}
        <div 
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          {collections.map((collection) => (
            <div key={collection.id} className="collection-card-wrapper h-full w-full">
              <CollectionCard collection={collection} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
