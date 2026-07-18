"use client";

import React, { useRef, useEffect } from "react";
import { Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ClientStory({ project }) {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(quoteRef.current, {
        y: 40, opacity: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!project.caseStudy.testimonial) return null;

  return (
    <section ref={sectionRef} className="w-full bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[900px] px-6 sm:px-8 text-center flex flex-col items-center">
        <Quote className="w-12 h-12 text-[#C46A3C]/20 mb-8" />
        <div ref={quoteRef}>
          <p className="font-heading text-3xl sm:text-4xl lg:text-5xl text-heading leading-[1.3] font-medium italic mb-8">
            "{project.caseStudy.testimonial.quote}"
          </p>
          <span className="block font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#C46A3C]">
            — {project.caseStudy.testimonial.author}
          </span>
        </div>
      </div>
    </section>
  );
}
