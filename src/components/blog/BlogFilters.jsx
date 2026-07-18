"use client";

import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function BlogFilters({ categories, activeCategory, onCategoryChange, searchQuery, onSearchChange }) {
  return (
    <div className="sticky top-20 z-40 w-full bg-white/90 backdrop-blur-md border-y border-[#EAE5DF] py-4 transition-all duration-300">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Categories */}
          <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto no-scrollbar py-2">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={cn(
                    "flex-shrink-0 px-5 py-2 rounded-full font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none",
                    isActive 
                      ? "bg-heading text-white shadow-sm" 
                      : "bg-[#FBF8F4] text-[#5F6368] hover:bg-[#EAE5DF] hover:text-heading border border-[#EAE5DF]/50"
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <input 
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-full bg-[#FBF8F4] border border-[#EAE5DF] font-sans text-sm text-heading placeholder:text-[#A8A39D] focus:outline-none focus:border-[#C46A3C] transition-colors"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A39D]" />
          </div>

        </div>
      </div>
    </div>
  );
}
