"use client";

import React, { useState, useMemo } from "react";
import { projects } from "@/data/projects";
import { ProjectsHero } from "@/components/projects/ProjectsHero";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { FeaturedCaseStudy } from "@/components/projects/FeaturedCaseStudy";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { CTASection } from "@/components/sections/cta/CTASection";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Derive categories dynamically from the data
  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, []);

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Separate the first project as the featured case study
  const featuredProject = filteredProjects.length > 0 ? filteredProjects[0] : null;
  
  // The rest go into the standard grid
  const remainingProjects = filteredProjects.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ProjectsHero />
      
      <ProjectFilters 
        categories={categories} 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      
      <main className="flex-1 w-full flex flex-col">
        {featuredProject && (
          <FeaturedCaseStudy project={featuredProject} />
        )}
        
        {remainingProjects.length > 0 && (
          <ProjectGrid projects={remainingProjects} />
        )}
        
        {/* Load More Button (Simulated for aesthetics) */}
        {remainingProjects.length > 0 && (
          <div className="w-full bg-white pb-24 sm:pb-32 flex justify-center">
            <button className="h-14 inline-flex items-center justify-center rounded-full bg-transparent border border-heading/20 px-10 font-sans text-sm font-semibold text-heading transition-all duration-300 hover:border-heading hover:bg-heading hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heading">
              Load More Projects
            </button>
          </div>
        )}
      </main>

      <CTASection />
    </div>
  );
}
