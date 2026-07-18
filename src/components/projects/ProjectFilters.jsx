"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function ProjectFilters({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="sticky top-20 z-40 w-full bg-[#FBF8F4]/90 backdrop-blur-md border-b border-[#EAE5DF] py-4 transition-all duration-300">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto no-scrollbar py-2">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={cn(
                  "flex-shrink-0 px-6 py-2.5 rounded-full font-sans text-sm font-medium transition-all duration-300 focus-visible:outline-none",
                  isActive 
                    ? "bg-heading text-white shadow-[0_4px_12px_rgba(31,31,31,0.15)]" 
                    : "bg-transparent text-[#5F6368] hover:bg-[#EAE5DF] hover:text-heading"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
