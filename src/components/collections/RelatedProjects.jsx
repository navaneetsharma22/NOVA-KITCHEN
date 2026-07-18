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

export function RelatedProjects({ collection }) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const { relatedProjects } = collection;

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(gridRef.current.children, {
        y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!relatedProjects || relatedProjects.length === 0) return null;

  return (
    <section ref={sectionRef} className="w-full bg-[#FBF8F4] py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 sm:mb-24 gap-6">
          <div>
            <span className="mb-4 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
              Inspiration
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-medium text-heading">
              Related Projects
            </h2>
          </div>
          <Link 
            href="/projects" 
            className="group inline-flex items-center font-sans text-sm font-semibold text-heading transition-colors hover:text-[#C46A3C]"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {relatedProjects.map((project, idx) => (
            <Link 
              key={idx}
              href={project.href}
              className="group block"
            >
              <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden mb-6 bg-white shadow-sm">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#5F6368] mb-2">
                  {project.location}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-medium text-heading transition-colors group-hover:text-[#C46A3C]">
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
