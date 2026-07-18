import { ProjectsSection } from "@/components/sections/projects/ProjectsSection";
import { CTASection } from "@/components/sections/cta/CTASection";

export const metadata = {
  title: "Projects | Nova Kitchens",
  description: "Browse our signature kitchen and wardrobe projects.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24">
      <ProjectsSection />
      <CTASection />
    </div>
  );
}
