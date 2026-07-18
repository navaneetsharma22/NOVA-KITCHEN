"use client";

import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { collectionsDetailed } from "@/data/collectionsDetailed";
import { cn } from "@/lib/utils";

export default function CollectionsPage() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    registerGSAP();
    let ctx = gsap.context(() => {
      gsap.from(heroRef.current.children, {
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out"
      });

      gsap.from(gridRef.current.children, {
        y: 60, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Collections Index Hero */}
      <section className="w-full bg-[#FBF8F4] pt-40 pb-16 sm:pb-24">
        <div ref={heroRef} className="mx-auto max-w-[760px] px-6 sm:px-8 text-center flex flex-col items-center">
          <span className="mb-4 sm:mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Our Collections
          </span>
          <h1 className="mb-6 font-heading text-4xl sm:text-5xl lg:text-7xl font-medium leading-[1.1] text-heading">
            Spaces Designed Around Your Lifestyle
          </h1>
          <p className="font-sans text-base sm:text-lg lg:text-xl leading-relaxed text-[#5F6368] max-w-2xl">
            Explore our curated range of bespoke kitchens, wardrobes, and storage solutions — each crafted with precision, premium materials, and timeless design.
          </p>
        </div>
      </section>

      {/* Collections Grid — Alternating Editorial Layout */}
      <section className="w-full bg-[#FBF8F4] pb-24 sm:pb-32">
        <div ref={gridRef} className="mx-auto max-w-[1440px] px-6 sm:px-8 flex flex-col space-y-16 sm:space-y-24">
          {collectionsDetailed.map((collection, idx) => {
            const isReversed = idx % 2 !== 0;

            return (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="group block"
              >
                <div className={cn(
                  "flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-12 bg-white rounded-[32px] overflow-hidden shadow-[0_20px_40px_rgba(31,31,31,0.04)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(31,31,31,0.08)] border border-transparent hover:border-[#EAE5DF]/50",
                  isReversed && "lg:flex-row-reverse"
                )}>
                  {/* Image Side (55%) */}
                  <div className="relative w-full lg:w-[55%] aspect-[4/3] lg:aspect-auto overflow-hidden">
                    <Image
                      src={collection.heroImage}
                      alt={collection.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  {/* Content Side (45%) */}
                  <div className="w-full lg:w-[45%] flex flex-col justify-center p-8 sm:p-10 lg:p-14 xl:p-16">
                    <span className="mb-3 sm:mb-4 block font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#C46A3C]">
                      {collection.label}
                    </span>
                    <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-heading mb-4 leading-[1.15] transition-colors duration-300 group-hover:text-[#C46A3C]">
                      {collection.title}
                    </h2>
                    <p className="font-sans text-sm italic text-[#5F6368] mb-6">
                      "{collection.tagline}"
                    </p>
                    <p className="font-sans text-base text-[#5F6368] leading-relaxed mb-8 line-clamp-3">
                      {collection.overview}
                    </p>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-4 mb-10">
                      {collection.specs.slice(0, 4).map((spec, sIdx) => (
                        <div key={sIdx}>
                          <span className="block font-sans text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-[#5F6368] mb-0.5">
                            {spec.label}
                          </span>
                          <span className="font-sans text-sm text-heading font-medium">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center">
                      <span className="inline-flex items-center font-sans text-sm font-semibold text-heading transition-colors duration-300 group-hover:text-[#C46A3C]">
                        Explore Collection
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
