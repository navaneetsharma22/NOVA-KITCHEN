"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { journalArticles as allArticles } from "@/data/journal";

export function RelatedJournalArticles({ article }) {
  const relatedArticles = useMemo(() => {
    if (!article.relatedArticles || article.relatedArticles.length === 0) return [];
    return allArticles.filter(a => article.relatedArticles.includes(a.slug)).slice(0, 2);
  }, [article.relatedArticles]);

  if (relatedArticles.length === 0) return null;

  return (
    <section className="w-full bg-[#FBF8F4] py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        
        <div className="mb-12">
          <span className="mb-4 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Keep Reading
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-medium text-heading">
            Related Articles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {relatedArticles.map(rel => (
            <Link key={rel.id} href={`/blog/${rel.slug}`} className="group block">
              <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden mb-6 bg-white">
                <Image src={rel.image} alt={rel.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">{rel.category}</span>
                <span className="w-1 h-1 rounded-full bg-[#EAE5DF]" />
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5F6368]">{rel.readingTime}</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-medium text-heading mb-4 transition-colors group-hover:text-[#C46A3C]">
                {rel.title}
              </h3>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
