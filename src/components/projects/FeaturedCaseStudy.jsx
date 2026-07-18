"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FeaturedCaseStudy({ project }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    
    let ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
      });
      
      gsap.fromTo(imageRef.current, 
        { scale: 1.05, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [project]);

  if (!project) return null;

  return (
    <section ref={sectionRef} className="w-full bg-[#FAFAF9] py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        
        <div className="mb-12 flex items-center justify-between">
          <span className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Featured Case Study
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left: Huge Image */}
          <div className="w-full lg:w-[60%]">
            <Link href={`/projects/${project.slug}`} className="group block relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-[32px] overflow-hidden bg-[#EAE5DF]">
              <Image
                ref={imageRef}
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
            </Link>
          </div>

          {/* Right: Content Deep Dive */}
          <div ref={contentRef} className="w-full lg:w-[40%] flex flex-col justify-center">
            <div className="flex items-center space-x-4 mb-6">
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#5F6368]">
                {project.location}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#C46A3C]" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#5F6368]">
                {project.category}
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl font-medium text-heading mb-8">
              {project.title}
            </h2>

            <div className="space-y-6 mb-12">
              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-heading mb-2">The Challenge</h4>
                <p className="font-sans text-sm sm:text-base text-[#5F6368] leading-relaxed">
                  {project.caseStudy.challenge}
                </p>
              </div>
              <div>
                <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-heading mb-2">The Solution</h4>
                <p className="font-sans text-sm sm:text-base text-[#5F6368] leading-relaxed">
                  {project.caseStudy.solution}
                </p>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE5DF] mb-12 relative">
              <Quote className="absolute top-6 left-6 w-8 h-8 text-[#C46A3C]/20" />
              <p className="font-sans text-sm sm:text-base text-heading leading-relaxed font-medium italic mb-4 relative z-10 pl-10">
                "{project.caseStudy.testimonial.quote}"
              </p>
              <span className="block font-sans text-xs font-bold uppercase tracking-widest text-[#C46A3C] pl-10">
                — {project.caseStudy.testimonial.author}
              </span>
            </div>

            <Link 
              href={`/projects/${project.slug}`}
              className="group inline-flex items-center font-sans text-sm font-semibold text-heading transition-colors hover:text-[#C46A3C]"
            >
              Read Full Case Study
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
