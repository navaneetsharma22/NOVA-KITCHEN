"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CollectionGallery({ collection }) {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const images = galleryRef.current.querySelectorAll(".gallery-img-container");
      
      gsap.from(images, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { gallery } = collection;
  if (!gallery || gallery.length === 0) return null;

  return (
    <section ref={sectionRef} className="w-full bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        
        <div className="text-center mb-16 sm:mb-24 flex flex-col items-center">
          <span className="mb-4 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Gallery
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-medium text-heading">
            Architectural Details
          </h2>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
          
          {/* Image 1 (Full width or large) */}
          {gallery[0] && (
            <div className="gallery-img-container md:col-span-12 group relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[32px] overflow-hidden shadow-sm">
              <Image
                src={gallery[0]}
                alt={`${collection.title} Detail 1`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/5 transition-opacity duration-500 group-hover:opacity-0" />
            </div>
          )}

          {/* Image 2 (Medium left) */}
          {gallery[1] && (
            <div className="gallery-img-container md:col-span-7 group relative w-full h-[300px] sm:h-[400px] lg:h-[600px] rounded-[32px] overflow-hidden shadow-sm">
              <Image
                src={gallery[1]}
                alt={`${collection.title} Detail 2`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-black/5 transition-opacity duration-500 group-hover:opacity-0" />
            </div>
          )}

          {/* Image 3 (Small right) */}
          {gallery[2] && (
            <div className="gallery-img-container md:col-span-5 group relative w-full h-[300px] sm:h-[400px] lg:h-[600px] rounded-[32px] overflow-hidden shadow-sm">
              <Image
                src={gallery[2]}
                alt={`${collection.title} Detail 3`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-black/5 transition-opacity duration-500 group-hover:opacity-0" />
            </div>
          )}

          {/* Image 4 (Full width below) */}
          {gallery[3] && (
            <div className="gallery-img-container md:col-span-12 group relative w-full aspect-[16/9] rounded-[32px] overflow-hidden shadow-sm">
              <Image
                src={gallery[3]}
                alt={`${collection.title} Detail 4`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/5 transition-opacity duration-500 group-hover:opacity-0" />
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
