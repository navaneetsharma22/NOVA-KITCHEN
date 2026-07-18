"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ArticleContent({ content }) {
  const contentRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Gentle fade in for content blocks as they scroll into view
      gsap.utils.toArray('.article-block').forEach((block) => {
        gsap.from(block, {
          y: 40, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 85%" }
        });
      });
    }, contentRef);
    return () => ctx.revert();
  }, [content]);

  if (!content) return null;

  return (
    <article ref={contentRef} className="w-full">
      {content.map((block, idx) => {
        
        if (block.type === "paragraph") {
          return (
            <p key={idx} className="article-block font-sans text-lg sm:text-xl text-[#3A3B3C] leading-[1.8] mb-8 font-light max-w-[65ch]">
              {block.text}
            </p>
          );
        }

        if (block.type === "heading") {
          return (
            <h2 key={idx} id={block.id} className="article-block font-heading text-3xl sm:text-4xl text-heading font-medium mt-16 mb-8 pt-8 border-t border-[#EAE5DF]">
              {block.text}
            </h2>
          );
        }

        if (block.type === "quote") {
          return (
            <div key={idx} className="article-block my-16 py-8 border-y border-[#EAE5DF] relative">
              <Quote className="absolute top-8 left-0 w-12 h-12 text-[#C46A3C]/10 -translate-x-6 -translate-y-6" />
              <p className="font-heading text-2xl sm:text-3xl text-heading leading-[1.4] font-medium italic relative z-10 pl-6 border-l-4 border-[#C46A3C]">
                "{block.text}"
              </p>
            </div>
          );
        }

        if (block.type === "gallery") {
          return (
            <div key={idx} className="article-block my-16 -mx-6 sm:-mx-12 lg:-mx-24 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {block.images.map((img, i) => (
                <div key={i} className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-[#FBF8F4]">
                  <Image src={img} alt="Article Gallery Image" fill className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              ))}
            </div>
          );
        }

        return null;
      })}
    </article>
  );
}
