"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ArticleHero({ article }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal Text
      gsap.from(textRef.current.children, {
        y: 40, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.2
      });

      // Reveal Image
      gsap.fromTo(imageRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.4 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#FBF8F4] pt-40 pb-16 sm:pt-48 sm:pb-24">
      <div className="mx-auto max-w-[1000px] px-6 sm:px-8 text-center mb-16 sm:mb-24">
        
        <div ref={textRef} className="flex flex-col items-center">
          <div className="flex items-center space-x-3 mb-8">
            <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
              {article.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#EAE5DF]" />
            <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#5F6368]">
              {article.readingTime}
            </span>
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl lg:text-8xl font-medium leading-[1.1] text-heading mb-12">
            {article.title}
          </h1>

          <div className="flex items-center justify-center space-x-8 border-t border-[#EAE5DF] pt-8 w-full max-w-md">
            <div className="flex flex-col">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#A8A39D] mb-1">Author</span>
              <span className="font-sans text-xs sm:text-sm font-medium text-heading">{article.author}</span>
            </div>
            <div className="w-[1px] h-8 bg-[#EAE5DF]" />
            <div className="flex flex-col">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#A8A39D] mb-1">Published</span>
              <span className="font-sans text-xs sm:text-sm font-medium text-heading">{article.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Massive Hero Image sitting below the text */}
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        <div className="relative w-full aspect-[4/3] sm:aspect-[21/9] rounded-[32px] overflow-hidden bg-[#EAE5DF]">
          <Image
            ref={imageRef}
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
