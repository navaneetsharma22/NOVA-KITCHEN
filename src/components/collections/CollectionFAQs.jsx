"use client";

import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function CollectionFAQs({ collection }) {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);

  const { faqs } = collection;

  useEffect(() => {
    registerGSAP();
    let ctx = gsap.context(() => {
      gsap.from(sectionRef.current.children, {
        y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="w-full bg-white py-24 sm:py-32">
      <div ref={sectionRef} className="mx-auto max-w-[800px] px-6 sm:px-8">
        
        <div className="text-center mb-16">
          <span className="mb-4 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Questions
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-medium text-heading">
            {collection.label} FAQs
          </h2>
        </div>

        <div className="flex flex-col space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            
            return (
              <div 
                key={item.id}
                className={cn(
                  "group bg-white rounded-[24px] transition-all duration-500 overflow-hidden border",
                  isOpen 
                    ? "border-[#C46A3C]/20 shadow-sm" 
                    : "border-[#EAE5DF]/50 hover:border-[#EAE5DF]"
                )}
              >
                <button suppressHydrationWarning
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between text-left px-6 sm:px-8 py-6 focus-visible:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={cn(
                    "font-heading text-lg sm:text-xl pr-8 transition-colors duration-300",
                    isOpen ? "text-heading font-medium" : "text-[#5F6368] group-hover:text-heading"
                  )}>
                    {item.question}
                  </span>
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500",
                    isOpen ? "bg-[#C46A3C] text-white rotate-180" : "bg-[#FBF8F4] text-[#5F6368]"
                  )}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <div 
                  className={cn(
                    "grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                      <p className="font-sans text-sm sm:text-base text-[#5F6368] leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
