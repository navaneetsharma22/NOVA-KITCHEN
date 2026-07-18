import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { CaseStudyHero } from "@/components/projects/CaseStudyHero";
import { CaseStudyOverview } from "@/components/projects/CaseStudyOverview";
import { CaseStudyGallery } from "@/components/projects/CaseStudyGallery";
import { CaseStudyTimeline } from "@/components/projects/CaseStudyTimeline";
import { BeforeAfter } from "@/components/projects/BeforeAfter";
import { ClientStory } from "@/components/projects/ClientStory";
import { RelatedCaseStudies } from "@/components/projects/RelatedCaseStudies";
import { CTASection } from "@/components/sections/cta/CTASection";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectCaseStudyPage({ params }) {
  const { slug } = await params;
  
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CaseStudyHero project={project} />
      <CaseStudyOverview project={project} />
      <CaseStudyGallery project={project} />
      <BeforeAfter project={project} />
      <CaseStudyTimeline project={project} />
      <ClientStory project={project} />
      <RelatedCaseStudies project={project} />
      <CTASection />
    </div>
  );
}
