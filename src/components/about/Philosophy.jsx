"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutData } from "@/data/about";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Philosophy() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Split text roughly by sentences or words to reveal them
      const words = textRef.current.children;
      
      gsap.from(words, {
        opacity: 0.1,
        duration: 1.5,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "center center",
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Simple split by word for the scrub reveal effect
  const words = aboutData.philosophy.statement.split(" ");

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-[#1F1F1F] py-32 sm:py-48 lg:py-64"
      aria-label="Our Philosophy"
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 text-center">
        <h2 
          ref={textRef}
          className="font-heading text-3xl sm:text-5xl lg:text-7xl font-medium leading-[1.2] text-white flex flex-wrap justify-center gap-x-3 sm:gap-x-5 lg:gap-x-6 gap-y-2 sm:gap-y-4"
        >
          {words.map((word, idx) => (
            <span key={idx} className="inline-block">{word}</span>
          ))}
        </h2>
      </div>
    </section>
  );
}
