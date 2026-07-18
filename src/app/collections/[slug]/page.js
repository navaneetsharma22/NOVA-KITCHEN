"use client";

import React, { useRef, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { collectionsDetailed } from "@/data/collectionsDetailed";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CollectionDetailPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const collection = collectionsDetailed.find((c) => c.slug === slug);

  const heroRef = useRef(null);
  const overviewRef = useRef(null);
  const featuresRef = useRef(null);
  const galleryRef = useRef(null);
  const materialsRef = useRef(null);
  const specsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!collection) return;

    let ctx = gsap.context(() => {
      // Hero parallax
      gsap.to(heroRef.current, {
        y: "15%", ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true }
      });

      // Overview
      gsap.from(overviewRef.current.children, {
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: overviewRef.current, start: "top 80%" }
      });

      // Features
      gsap.from(featuresRef.current.children, {
        y: 40, opacity: 0, duration: 1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: featuresRef.current, start: "top 80%" }
      });

      // Gallery
      gsap.from(galleryRef.current.children, {
        y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: galleryRef.current, start: "top 85%" }
      });

      // Materials
      gsap.from(materialsRef.current.children, {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: materialsRef.current, start: "top 85%" }
      });

      // Specs
      gsap.from(specsRef.current.children, {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: specsRef.current, start: "top 90%" }
      });

      // CTA
      gsap.from(ctaRef.current.children, {
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 85%" }
      });
    });

    return () => ctx.revert();
  }, [collection]);

  if (!collection) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FBF8F4]">
        <div className="text-center">
          <h1 className="font-heading text-4xl text-heading mb-4">Collection Not Found</h1>
          <Link href="/collections" className="font-sans text-sm text-[#C46A3C] underline">Back to Collections</Link>
        </div>
      </div>
    );
  }

  // Find next/prev for navigation
  const currentIndex = collectionsDetailed.findIndex((c) => c.slug === slug);
  const prevCollection = collectionsDetailed[currentIndex - 1] || collectionsDetailed[collectionsDetailed.length - 1];
  const nextCollection = collectionsDetailed[currentIndex + 1] || collectionsDetailed[0];

  return (
    <div className="flex flex-col min-h-screen">

      {/* ==================== HERO ==================== */}
      <section className="relative w-full h-[70vh] sm:h-[80vh] flex items-end overflow-hidden bg-black">
        <div ref={heroRef} className="absolute inset-[-10%] w-[120%] h-[120%]">
          <Image
            src={collection.heroImage}
            alt={collection.title}
            fill priority
            className="object-cover opacity-70"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 pb-16 sm:pb-24">
          <Link href="/collections" className="inline-flex items-center font-sans text-xs uppercase tracking-widest text-white/70 mb-6 hover:text-white transition-colors">
            <ArrowLeft className="w-3 h-3 mr-2" />
            All Collections
          </Link>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-medium text-white leading-[1.1] mb-4">
            {collection.title}
          </h1>
          <p className="font-sans text-lg sm:text-xl text-white/80 max-w-xl italic">
            "{collection.tagline}"
          </p>
        </div>
      </section>

      {/* ==================== OVERVIEW ==================== */}
      <section className="w-full bg-[#FBF8F4] py-24 sm:py-32">
        <div ref={overviewRef} className="mx-auto max-w-[900px] px-6 sm:px-8 text-center flex flex-col items-center">
          <span className="mb-4 sm:mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Overview
          </span>
          <p className="font-heading text-2xl sm:text-3xl lg:text-4xl font-medium text-heading leading-[1.3]">
            {collection.overview}
          </p>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="w-full bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
          <div className="text-center mb-16">
            <span className="mb-4 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">Features</span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-heading">What Sets It Apart</h2>
          </div>
          <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {collection.features.map((feature, idx) => (
              <div key={idx} className="group flex flex-col p-8 rounded-[24px] bg-[#FBF8F4] border border-transparent transition-all duration-500 hover:border-[#EAE5DF] hover:shadow-[0_20px_40px_rgba(31,31,31,0.04)]">
                <div className="w-12 h-12 rounded-full bg-[#F5EBE1] flex items-center justify-center mb-6">
                  <span className="font-heading text-lg font-medium text-[#C46A3C]">0{idx + 1}</span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-medium text-heading mb-4">{feature.title}</h3>
                <p className="font-sans text-sm text-[#5F6368] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== GALLERY ==================== */}
      <section className="w-full bg-[#FBF8F4] py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
          <div className="text-center mb-16">
            <span className="mb-4 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">Gallery</span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-heading">Explore Every Detail</h2>
          </div>
          <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {collection.gallery.map((img, idx) => (
              <div key={idx} className="group relative aspect-[4/3] rounded-[24px] overflow-hidden shadow-sm">
                <Image
                  src={img}
                  alt={`${collection.title} Gallery ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MATERIALS & SPECS ==================== */}
      <section className="w-full bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

            {/* Materials */}
            <div className="flex-1">
              <span className="mb-4 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">Materials</span>
              <h3 className="font-heading text-3xl sm:text-4xl font-medium text-heading mb-10">Premium Selections</h3>
              <div ref={materialsRef} className="flex flex-wrap gap-3">
                {collection.materials.map((mat, idx) => (
                  <div key={idx} className="flex items-center space-x-2 bg-[#FBF8F4] border border-[#EAE5DF]/50 px-5 py-3 rounded-full transition-all duration-300 hover:bg-white hover:shadow-sm">
                    <div className="w-4 h-4 rounded-full bg-[#F5EBE1] flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#C46A3C]" strokeWidth={3} />
                    </div>
                    <span className="font-sans text-sm font-medium text-heading">{mat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="flex-1">
              <span className="mb-4 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">Specifications</span>
              <h3 className="font-heading text-3xl sm:text-4xl font-medium text-heading mb-10">Technical Details</h3>
              <div ref={specsRef} className="flex flex-col border-t border-[#EAE5DF]">
                {collection.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center justify-between py-5 border-b border-[#EAE5DF]">
                    <span className="font-sans text-sm text-[#5F6368] uppercase tracking-widest">{spec.label}</span>
                    <span className="font-sans text-sm font-medium text-heading">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== CONSULTATION CTA ==================== */}
      <section className="w-full bg-[#F5EBE1] py-24 sm:py-32">
        <div ref={ctaRef} className="mx-auto max-w-[760px] px-6 sm:px-8 text-center flex flex-col items-center">
          <span className="mb-4 sm:mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Ready To Begin?
          </span>
          <h2 className="mb-6 font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-heading leading-[1.1]">
            Book A Free Design Consultation
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#5F6368] leading-relaxed max-w-xl mb-10">
            Our specialists will guide you through the entire {collection.label} range, help you select the perfect materials, and create a personalised 3D visualisation.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Link href="/contact" className="w-full sm:w-auto h-14 inline-flex items-center justify-center rounded-full bg-heading px-10 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-black hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(31,31,31,0.2)]">
              Book Consultation
            </Link>
            <Link href="/collections" className="group w-full sm:w-auto h-14 inline-flex items-center justify-center rounded-full bg-transparent border border-heading/20 px-10 font-sans text-sm font-semibold text-heading transition-all duration-300 hover:border-heading hover:bg-white">
              <span>All Collections</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== PREV / NEXT NAVIGATION ==================== */}
      <section className="w-full bg-white border-t border-[#EAE5DF]">
        <div className="mx-auto max-w-[1440px] grid grid-cols-2">
          <Link href={`/collections/${prevCollection.slug}`} className="group flex flex-col p-8 sm:p-12 border-r border-[#EAE5DF] transition-colors hover:bg-[#FBF8F4]">
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#5F6368] mb-2">Previous</span>
            <span className="font-heading text-lg sm:text-2xl text-heading transition-colors group-hover:text-[#C46A3C]">{prevCollection.title}</span>
          </Link>
          <Link href={`/collections/${nextCollection.slug}`} className="group flex flex-col items-end text-right p-8 sm:p-12 transition-colors hover:bg-[#FBF8F4]">
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#5F6368] mb-2">Next</span>
            <span className="font-heading text-lg sm:text-2xl text-heading transition-colors group-hover:text-[#C46A3C]">{nextCollection.title}</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
