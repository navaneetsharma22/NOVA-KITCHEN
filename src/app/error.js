"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 min-h-[70vh] flex flex-col items-center justify-center bg-white text-center px-6">
      <span className="mb-4 block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
        System Error
      </span>
      <h2 className="font-heading text-4xl sm:text-5xl font-medium text-heading mb-6">
        An unexpected error occurred.
      </h2>
      <p className="font-sans text-[#5F6368] max-w-md mb-8">
        We apologize for the inconvenience. Our technical team has been notified.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="h-12 inline-flex items-center justify-center rounded-full bg-[#1F1F1F] px-8 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-[#C46A3C]"
        >
          Try Again
        </button>
        <Link 
          href="/"
          className="group h-12 inline-flex items-center justify-center rounded-full bg-transparent border border-heading/20 px-8 font-sans text-sm font-semibold text-heading transition-all duration-300 hover:border-heading hover:bg-heading hover:text-white"
        >
          Return Home
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
