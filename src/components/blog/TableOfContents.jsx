"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px" } // Trigger when heading is near top
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) {
      // Offset for sticky nav
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-32 space-y-4">
      <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#A8A39D] mb-4 block">
        On This Page
      </span>
      <ul className="space-y-3 border-l border-[#EAE5DF]">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={cn(
                "block text-left pl-4 font-sans text-sm transition-colors duration-300 relative focus-visible:outline-none",
                activeId === heading.id
                  ? "text-heading font-semibold"
                  : "text-[#A8A39D] hover:text-heading"
              )}
            >
              {/* Active Indicator Line */}
              {activeId === heading.id && (
                <span className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-[#C46A3C]" />
              )}
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
