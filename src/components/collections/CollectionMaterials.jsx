"use client";

import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CollectionMaterials({ collection }) {
  const [activeMat, setActiveMat] = useState(0);
  
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  const { materials } = collection;

  useEffect(() => {
    registerGSAP();
    let ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 80%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out", overwrite: true }
      );
    }
  }, [activeMat]);

  if (!materials || materials.length === 0) return null;

  return (
    <section ref={sectionRef} className="w-full bg-[#FAFAF9] py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-24">
          
          {/* Left: Swatch Selector */}
          <div ref={contentRef} className="w-full lg:w-1/2 flex flex-col">
            <span className="mb-4 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
              Materials
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-medium text-heading mb-6">
              Tactile Brilliance
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#5F6368] leading-relaxed mb-12 max-w-xl">
              Select from our curated palette of authentic European veneers, high-density lacquers, and premium architectural stones.
            </p>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {materials.map((mat, idx) => {
                const isActive = activeMat === idx;
                return (
                  <button suppressHydrationWarning
                    key={idx}
                    onClick={() => setActiveMat(idx)}
                    className={cn(
                      "flex items-center space-x-4 p-4 rounded-2xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-left",
                      isActive ? "bg-white border-[#C46A3C] shadow-sm" : "bg-transparent border-[#EAE5DF] hover:bg-white hover:border-[#EAE5DF]"
                    )}
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-[#EAE5DF]">
                      <Image
                        src={mat.image}
                        alt={mat.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#5F6368] mb-0.5">Finish</span>
                      <span className={cn(
                        "font-sans text-sm font-medium transition-colors",
                        isActive ? "text-[#C46A3C]" : "text-heading"
                      )}>
                        {mat.name}
                      </span>
                    </div>
                    {isActive && (
                      <Check className="w-4 h-4 text-[#C46A3C] ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Macro Image Display */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-[32px] overflow-hidden shadow-[0_20px_40px_rgba(31,31,31,0.06)] bg-[#EAE5DF]">
              <Image
                ref={imageRef}
                src={materials[activeMat].image}
                alt={materials[activeMat].name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
