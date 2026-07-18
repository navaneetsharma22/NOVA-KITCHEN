"use client";

import React, { useState, useMemo } from "react";
import { journalArticles } from "@/data/journal";
import { BlogFeatured } from "@/components/blog/BlogFeatured";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { BlogList } from "@/components/blog/BlogList";
import { BlogNewsletter } from "@/components/blog/BlogNewsletter";
import { CTASection } from "@/components/sections/cta/CTASection";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(journalArticles.map((a) => a.category));
    return ["All", ...Array.from(cats)];
  }, []);

  // Filter articles by category and search
  const filteredArticles = useMemo(() => {
    return journalArticles.filter((article) => {
      const matchCategory = activeCategory === "All" || article.category === activeCategory;
      const matchSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // If no filters are active, feature the first article and list the rest.
  // If filters ARE active, don't show the featured block, just show the filtered list.
  const isFiltering = activeCategory !== "All" || searchQuery.trim() !== "";
  
  const featuredArticle = !isFiltering && filteredArticles.length > 0 ? filteredArticles[0] : null;
  const listArticles = !isFiltering ? filteredArticles.slice(1) : filteredArticles;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Featured Cover Story (Only visible when not filtering) */}
      {featuredArticle && <BlogFeatured article={featuredArticle} />}
      
      {/* If filtering, add a top spacer since Featured is gone */}
      {isFiltering && <div className="pt-32 sm:pt-40 bg-[#FBF8F4]" />}

      <BlogFilters 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main className="flex-1 w-full flex flex-col">
        <BlogList articles={listArticles} />
        
        {/* Load More Button (Simulated for aesthetics) */}
        {listArticles.length > 0 && (
          <div className="w-full bg-white pb-24 sm:pb-32 flex justify-center">
            <button className="h-14 inline-flex items-center justify-center rounded-full bg-transparent border border-heading/20 px-10 font-sans text-sm font-semibold text-heading transition-all duration-300 hover:border-heading hover:bg-heading hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heading">
              Load More Articles
            </button>
          </div>
        )}
      </main>

      <BlogNewsletter />
      <CTASection />
      
    </div>
  );
}
