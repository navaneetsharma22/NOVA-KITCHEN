import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 min-h-[70vh] flex flex-col items-center justify-center bg-[#FBF8F4] text-center px-6 py-24">
      <span className="mb-4 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
        Error 404
      </span>
      <h2 className="font-heading text-5xl sm:text-7xl font-medium text-heading mb-6">
        Page Not Found
      </h2>
      <p className="font-sans text-lg text-[#5F6368] max-w-md mb-12">
        The architectural layout or collection you are looking for does not exist or has been moved.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/projects"
          className="group h-14 inline-flex items-center justify-center rounded-full bg-[#1F1F1F] px-8 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-[#C46A3C]"
        >
          View Portfolio
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <Link 
          href="/"
          className="h-14 inline-flex items-center justify-center rounded-full bg-transparent border border-heading/20 px-8 font-sans text-sm font-semibold text-heading transition-all duration-300 hover:border-heading hover:bg-heading hover:text-white"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
