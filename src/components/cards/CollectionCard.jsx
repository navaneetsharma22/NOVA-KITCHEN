import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CollectionCard({ collection, className }) {
  return (
    <Link 
      href={collection.href}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-[28px] sm:rounded-[32px] bg-[#EEF1F4] h-[450px] sm:h-[500px] lg:h-[600px] w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(31,31,31,0.08)] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4",
        className
      )}
      aria-label={`Explore ${collection.title}`}
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={collection.image}
          alt={collection.title}
          fill
          sizes="(max-w-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
        />
        {/* Soft dark gradient at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
      </div>

      {/* Glass Information Panel */}
      <div className="relative z-10 m-4 sm:m-6 overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-white/10 p-5 sm:p-6 backdrop-blur-md transition-colors duration-500 group-hover:bg-white/20 group-hover:border-white/30">
        
        {/* Category Label */}
        <span className="mb-2 block font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#FBF8F4]/80">
          {collection.label}
        </span>
        
        {/* Title */}
        <h3 className="mb-2 sm:mb-3 font-heading text-2xl sm:text-3xl font-medium text-white">
          {collection.title}
        </h3>
        
        {/* Description */}
        <p className="mb-4 sm:mb-6 line-clamp-2 font-sans text-sm leading-relaxed text-[#EAE5DF]">
          {collection.description}
        </p>
        
        {/* Explore Button */}
        <div className="flex items-center space-x-3">
          <span className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
            Explore Collection
          </span>
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-white transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-2" strokeWidth={1.5} />
        </div>
      </div>
    </Link>
  );
}
