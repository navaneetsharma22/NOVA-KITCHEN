"use client";

import React, { useMemo } from "react";
import { projects as allProjects } from "@/data/projects";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export function RelatedCaseStudies({ project }) {
  // Find related project objects based on slugs
  const relatedProjects = useMemo(() => {
    if (!project.relatedProjects || project.relatedProjects.length === 0) return [];
    return allProjects.filter(p => project.relatedProjects.includes(p.slug));
  }, [project.relatedProjects]);

  if (relatedProjects.length === 0) return null;

  return (
    <section className="w-full bg-[#FBF8F4] py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
        <div className="mb-12">
          <span className="mb-4 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
            Inspiration
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-medium text-heading">
            Related Projects
          </h2>
        </div>
      </div>
      
      {/* We reuse the ProjectGrid but override its outer padding by wrapping it */}
      <div className="-mt-16 sm:-mt-24">
        <ProjectGrid projects={relatedProjects} />
      </div>
    </section>
  );
}
