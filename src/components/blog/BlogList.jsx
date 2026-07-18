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

export function BlogList({ articles }) {
  const listRef = useRef(null);

  useEffect(() => {
    if (!articles || articles.length === 0) return;

    let ctx = gsap.context(() => {
      gsap.from(listRef.current.children, {
        y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { 
          trigger: listRef.current, 
          start: "top 85%" 
        }
      });
    }, listRef);

    return () => ctx.revert();
  }, [articles]);

  if (!articles || articles.length === 0) {
    return (
      <div className="w-full py-32 flex flex-col items-center justify-center text-center px-6">
        <h3 className="font-heading text-2xl font-medium text-heading mb-2">No articles found</h3>
        <p className="font-sans text-[#5F6368]">Try adjusting your search or category filters.</p>
      </div>
    );
  }

  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1000px] px-6 sm:px-8">
        
        <div ref={listRef} className="flex flex-col">
          {articles.map((article, idx) => (
            <article 
              key={article.id} 
              className={`group flex flex-col sm:flex-row items-center gap-8 lg:gap-16 py-12 sm:py-16 ${
                idx !== articles.length - 1 ? "border-b border-[#EAE5DF]" : ""
              }`}
            >
              
              {/* Thumbnail */}
              <Link href={`/blog/${article.slug}`} className="w-full sm:w-1/3 flex-shrink-0 relative aspect-[4/3] rounded-[24px] overflow-hidden bg-[#FBF8F4]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </Link>

              {/* Content */}
              <div className="w-full sm:w-2/3 flex flex-col justify-center">
                
                <div className="flex flex-wrap items-center space-x-3 mb-4">
                  <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
                    {article.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#EAE5DF]" />
                  <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#5F6368]">
                    {article.date}
                  </span>
                </div>

                <Link href={`/blog/${article.slug}`}>
                  <h3 className="font-heading text-3xl sm:text-4xl font-medium text-heading mb-4 transition-colors group-hover:text-[#C46A3C]">
                    {article.title}
                  </h3>
                </Link>

                <p className="font-sans text-sm sm:text-base text-[#5F6368] leading-relaxed mb-6">
                  {article.shortDescription}
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-auto">
                  <div className="flex flex-col">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#A8A39D] mb-1">Author</span>
                    <span className="font-sans text-xs font-medium text-heading">{article.author}</span>
                  </div>
                  <div className="hidden sm:flex flex-col border-l border-[#EAE5DF] pl-6">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#A8A39D] mb-1">Read Time</span>
                    <span className="font-sans text-xs font-medium text-heading">{article.readingTime}</span>
                  </div>
                  
                  <Link 
                    href={`/blog/${article.slug}`}
                    className="ml-auto flex items-center justify-center w-10 h-10 rounded-full border border-[#EAE5DF] bg-[#FBF8F4] transition-all duration-300 group-hover:bg-[#C46A3C] group-hover:border-[#C46A3C] group-hover:text-white text-heading"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
