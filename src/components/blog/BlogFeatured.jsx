"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function BlogFeatured({ article }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!article) return;
    
    let ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
      );

      gsap.from(contentRef.current.children, {
        y: 40, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.3
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [article]);

  if (!article) return null;

  return (
    <section ref={sectionRef} className="w-full bg-[#FBF8F4] pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        
        <div className="flex flex-col mb-12">
          <span className="mb-4 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Cover Story
          </span>
        </div>

        <Link href={`/blog/${article.slug}`} className="group block relative w-full aspect-[4/3] sm:aspect-[21/9] rounded-[32px] overflow-hidden mb-12 sm:mb-16 bg-[#EAE5DF]">
          <Image
            ref={imageRef}
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.02]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
        </Link>

        <div ref={contentRef} className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="flex items-center space-x-3 mb-6">
            <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
              {article.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#EAE5DF]" />
            <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#5F6368]">
              {article.readingTime}
            </span>
          </div>

          <Link href={`/blog/${article.slug}`} className="group">
            <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-medium leading-[1.1] text-heading mb-6 transition-colors group-hover:text-[#C46A3C]">
              {article.title}
            </h2>
          </Link>

          <p className="font-sans text-base sm:text-lg lg:text-xl text-[#5F6368] leading-relaxed max-w-2xl mb-8">
            {article.shortDescription}
          </p>

          <div className="flex items-center justify-center space-x-6 border-t border-[#EAE5DF] pt-8 w-full max-w-md">
            <div className="flex flex-col text-center">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#A8A39D] mb-1">Author</span>
              <span className="font-sans text-xs font-medium text-heading">{article.author}</span>
            </div>
            <div className="w-[1px] h-8 bg-[#EAE5DF]" />
            <div className="flex flex-col text-center">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#A8A39D] mb-1">Published</span>
              <span className="font-sans text-xs font-medium text-heading">{article.date}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
