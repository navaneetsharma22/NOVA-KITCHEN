"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export function BlogNewsletter() {
  return (
    <section className="w-full bg-[#1F1F1F] py-24 sm:py-32">
      <div className="mx-auto max-w-[800px] px-6 sm:px-8 text-center flex flex-col items-center">
        
        <span className="mb-4 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
          The Private List
        </span>
        <h2 className="font-heading text-4xl sm:text-5xl font-medium text-white mb-6">
          Architectural Insights Delivered
        </h2>
        <p className="font-sans text-base sm:text-lg text-[#A8A39D] mb-12 max-w-lg">
          Join our curated newsletter for exclusive design trends, material deep dives, and project reveals.
        </p>

        <form className="w-full max-w-md relative flex items-center" onSubmit={(e) => e.preventDefault()}>
          <input suppressHydrationWarning
            type="email"
            placeholder="Enter your email address"
            className="w-full h-14 bg-transparent border-b border-white/20 text-white font-sans text-sm placeholder:text-white/40 focus:outline-none focus:border-white transition-colors pl-2 pr-12"
            required
          />
          <button suppressHydrationWarning 
            type="submit"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-[#C46A3C] hover:text-white transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

      </div>
    </section>
  );
}
