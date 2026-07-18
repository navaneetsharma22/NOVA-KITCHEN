"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { showcaseProducts } from "@/data/showcase";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = showcaseProducts[activeIndex];
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const rightPanelRef = useRef(null);
  const imageRef = useRef(null);
  const detailsRef = useRef(null);

  // Initial Scroll Reveal
  useEffect(() => {
    let ctx = gsap.context(() => {
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
      
      gsap.from(rightPanelRef.current, {
        opacity: 0,
        x: 40,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animation on Product Change
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Animate Image
      tl.fromTo(imageRef.current, 
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
        0
      );
      
      // Stagger Details
      if (detailsRef.current) {
        tl.fromTo(detailsRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          0.2
        );
      }
    }, rightPanelRef);
    
    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-white py-24 sm:py-32 overflow-hidden"
      aria-label="Interactive Product Showcase"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="mx-auto max-w-[700px] text-center mb-16 sm:mb-24 flex flex-col items-center"
        >
          <span className="mb-4 sm:mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Featured Products
          </span>
          <h2 className="mb-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-heading">
            Explore Every Detail Before You Build
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-[#5F6368] max-w-2xl">
            Discover thoughtfully designed kitchens and storage solutions engineered with premium materials, intelligent layouts and timeless craftsmanship.
          </p>
        </div>

        {/* Showcase Layout */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 xl:gap-20">
          
          {/* Left Panel: Vertical Selector (Desktop) / Accordion (Mobile/Tablet) */}
          <div className="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0 flex flex-col">
            {showcaseProducts.map((product, idx) => {
              const isActive = activeIndex === idx;
              
              return (
                <div key={product.id} className="group relative border-b border-[#EAE5DF] last:border-0">
                  <button
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "w-full flex items-start text-left py-6 sm:py-8 transition-colors duration-500 hover:bg-[#FBF8F4]/50 focus-visible:outline-none focus-visible:bg-[#FBF8F4]",
                      isActive ? "bg-transparent" : "opacity-60 hover:opacity-100"
                    )}
                    aria-expanded={isActive}
                    aria-controls={`product-details-${product.id}`}
                  >
                    {/* Active Indicator Line */}
                    <div 
                      className={cn(
                        "absolute left-0 top-0 bottom-0 w-1 bg-primary transition-transform duration-500 origin-top",
                        isActive ? "scale-y-100" : "scale-y-0"
                      )} 
                    />
                    
                    <div className="pl-6 sm:pl-8 flex w-full">
                      <span className="font-sans text-xs sm:text-sm font-semibold text-primary mr-6 sm:mr-8 mt-1 block w-4">
                        0{idx + 1}
                      </span>
                      <div className="flex flex-col">
                        <h3 className={cn(
                          "font-heading text-2xl sm:text-3xl transition-colors duration-500",
                          isActive ? "text-heading font-medium" : "text-[#5F6368]"
                        )}>
                          {product.name}
                        </h3>
                        {isActive && (
                          <p className="mt-2 font-sans text-sm text-[#5F6368] hidden lg:block animate-in fade-in slide-in-from-top-2 duration-500">
                            {product.shortDesc}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Mobile/Tablet Accordion Content */}
                  <div 
                    id={`product-details-${product.id}`}
                    className={cn(
                      "block lg:hidden overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                      isActive ? "max-h-[2500px] opacity-100 pb-8" : "max-h-0 opacity-0"
                    )}
                  >
                    {isActive && (
                      <div className="px-6 sm:px-8 pt-4">
                        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_40px_rgba(31,31,31,0.08)] mb-8">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 0vw"
                            priority
                          />
                        </div>
                        <ProductDetails product={product} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Panel: Large Image & Details (Desktop Only) */}
          <div ref={rightPanelRef} className="hidden lg:block w-full flex-grow pl-0 xl:pl-4">
            
            {/* Image Container */}
            <div className="relative w-full aspect-[16/10] xl:aspect-[16/9] rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(31,31,31,0.12)] mb-12 bg-[#FBF8F4]">
              <Image
                ref={imageRef}
                src={activeProduct.image}
                alt={activeProduct.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 66vw, 0vw"
                priority
              />
            </div>

            {/* Details Container */}
            <div ref={detailsRef}>
              <ProductDetails product={activeProduct} />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// Sub-component for product details to reuse in mobile and desktop layouts
function ProductDetails({ product }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12">
      {/* Description & Specs */}
      <div className="xl:col-span-7 flex flex-col">
        <h4 className="font-heading text-3xl font-medium text-heading mb-4">
          {product.name}
        </h4>
        <p className="font-sans text-base leading-relaxed text-[#5F6368] mb-8">
          {product.description}
        </p>
        
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <span className="block font-sans text-xs font-semibold uppercase tracking-widest text-[#5F6368] mb-2">
              Materials
            </span>
            <span className="font-sans text-sm text-heading">
              {product.materials}
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-semibold uppercase tracking-widest text-[#5F6368] mb-2">
              Lead Time
            </span>
            <span className="font-sans text-sm text-heading">
              {product.completion}
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-auto pt-4 border-t border-[#EAE5DF]">
          <button className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-hover hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(196,106,60,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            {product.primaryCta}
          </button>
          <button className="inline-flex h-12 items-center justify-center space-x-2 rounded-full bg-transparent px-8 font-sans text-sm font-semibold text-heading transition-all duration-300 hover:bg-[#FBF8F4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            <span>{product.secondaryCta}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Features List */}
      <div className="xl:col-span-5 bg-[#FBF8F4] p-8 rounded-[24px]">
        <h5 className="font-sans text-xs font-semibold uppercase tracking-widest text-heading mb-6">
          Key Features
        </h5>
        <ul className="flex flex-col space-y-4">
          {product.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm">
                <Check className="w-3 h-3 text-primary" strokeWidth={3} />
              </span>
              <span className="font-sans text-sm text-[#5F6368]">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
