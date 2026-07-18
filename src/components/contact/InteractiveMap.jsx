"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function InteractiveMap() {
  const mapRef = useRef(null);
  const pinRef = useRef(null);
  const pulseRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal the map block
      gsap.from(mapRef.current, {
        y: 40, opacity: 0, duration: 1.5, ease: "power3.out",
        scrollTrigger: { trigger: mapRef.current, start: "top 80%" }
      });

      // Animate the pin dropping in
      gsap.from(pinRef.current, {
        y: -30, opacity: 0, duration: 1, ease: "bounce.out", delay: 0.5,
        scrollTrigger: { trigger: mapRef.current, start: "top 80%" }
      });

      // Create continuous pulse effect around the pin
      gsap.to(pulseRef.current, {
        scale: 2.5, opacity: 0, duration: 2, repeat: -1, ease: "power1.out"
      });
      
    }, mapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        
        <div ref={mapRef} className="relative w-full aspect-[4/3] sm:aspect-[21/9] rounded-[32px] overflow-hidden bg-[#1F1F1F] flex items-center justify-center">
          
          {/* Simulated Dark Mode Map Graphic (Using an abstract architectural image for this demo) */}
          <div className="absolute inset-0 opacity-40 mix-blend-luminosity">
             <Image 
               src="/images/process/process_manufacturing_1784363051208.png" 
               alt="Map Graphic" 
               fill 
               className="object-cover filter grayscale blur-[2px]" 
               sizes="100vw"
             />
          </div>
          
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Grid overlay for tech/map feel */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* Location Pin */}
          <div className="relative z-10 flex flex-col items-center">
            
            <div className="relative w-12 h-12 flex items-center justify-center">
              {/* Pulse Ring */}
              <div ref={pulseRef} className="absolute inset-0 rounded-full bg-[#C46A3C]/40" />
              {/* Solid Pin */}
              <div ref={pinRef} className="relative w-4 h-4 rounded-full bg-[#C46A3C] shadow-[0_0_20px_rgba(196,106,60,0.8)] border-2 border-[#1F1F1F]" />
            </div>
            
            <div className="mt-4 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-white">
                Milan Flagship Studio
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
