"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journalArticles } from "@/data/journal";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function JournalSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const featuredRef = useRef(null);
  const sideListRef = useRef(null);

  const featuredArticle = journalArticles[0];
  const sideArticles = journalArticles.slice(1, 5); // Display next 4 articles

  useEffect(() => {
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
      
      // Featured Article Reveal
      gsap.from(featuredRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
      
      // Side Articles Stagger Reveal
      gsap.from(sideListRef.current.children, {
        x: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
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
      className="w-full bg-[#FBF8F4] py-24 sm:py-32 overflow-hidden"
      aria-label="Editorial Journal"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        
        {/* Section Header */}
        <div 
          ref={headerRef}
          className="mx-auto max-w-[760px] text-center mb-16 sm:mb-24 flex flex-col items-center"
        >
          <span className="mb-4 sm:mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Editorial Journal
          </span>
          <h2 className="mb-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-heading">
            Insights, Inspiration & Modern Living
          </h2>
          <p className="font-sans text-base sm:text-lg leading-relaxed text-[#5F6368] max-w-2xl">
            Discover expert insights, design trends and practical ideas to help you create timeless kitchens, elegant storage solutions and beautifully functional living spaces.
          </p>
        </div>

        {/* Magazine Layout */}
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-12 xl:gap-16">
          
          {/* Left: Featured Article (60%) */}
          <div ref={featuredRef} className="w-full lg:w-[60%] flex flex-col group">
            <Link href={`/journal/${featuredArticle.slug}`} className="relative flex flex-col h-full bg-white rounded-[32px] overflow-hidden shadow-[0_20px_40px_rgba(31,31,31,0.04)] transition-shadow duration-500 hover:shadow-[0_30px_60px_rgba(31,31,31,0.08)]">
              
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/10] overflow-hidden">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                {/* Category Badge overlay on image */}
                <div className="absolute top-6 left-6 sm:top-8 sm:left-8 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full">
                  <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-heading">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="flex flex-col flex-grow p-8 sm:p-10 lg:p-12">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="font-sans text-[10px] sm:text-xs uppercase tracking-widest text-[#5F6368]">
                    {featuredArticle.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#EAE5DF]" />
                  <span className="flex items-center font-sans text-[10px] sm:text-xs uppercase tracking-widest text-[#C46A3C]">
                    <Clock className="w-3 h-3 mr-1.5" />
                    {featuredArticle.readingTime}
                  </span>
                </div>
                
                <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-medium text-heading mb-6 transition-colors duration-300 group-hover:text-primary leading-[1.2]">
                  {featuredArticle.title}
                </h3>
                
                <p className="font-sans text-base sm:text-lg text-[#5F6368] leading-relaxed mb-10">
                  {featuredArticle.shortDescription}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-[#EAE5DF] pt-8">
                  <span className="font-sans text-xs font-semibold uppercase tracking-widest text-heading">
                    By {featuredArticle.author}
                  </span>
                  <span className="inline-flex h-12 items-center justify-center rounded-full bg-transparent border border-[#EAE5DF] px-8 font-sans text-sm font-semibold text-heading transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                    Read Article
                  </span>
                </div>
              </div>
              
            </Link>
          </div>

          {/* Right: Side Articles (40%) */}
          <div ref={sideListRef} className="w-full lg:w-[40%] flex flex-col space-y-4 sm:space-y-6">
            {sideArticles.map((article) => (
              <Link 
                key={article.id} 
                href={`/journal/${article.slug}`}
                className="group flex items-center bg-white rounded-[24px] p-4 pr-6 sm:p-5 sm:pr-8 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(31,31,31,0.05)] hover:-translate-y-1 border border-transparent hover:border-[#EAE5DF]/50"
              >
                {/* Thumbnail */}
                <div className="relative flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-[16px] overflow-hidden mr-6 shadow-sm">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                    sizes="(max-width: 640px) 96px, 128px"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col flex-grow min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-sans text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-[#C46A3C]">
                      {article.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#EAE5DF]" />
                    <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-widest text-[#5F6368]">
                      {article.readingTime}
                    </span>
                  </div>
                  
                  <h4 className="font-heading text-lg sm:text-xl font-medium text-heading leading-tight mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-primary">
                    {article.title}
                  </h4>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 ml-4">
                  <ArrowRight className="w-5 h-5 text-[#EAE5DF] transition-all duration-300 group-hover:text-primary group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
