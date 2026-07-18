import { Hero } from "@/components/hero/Hero";
import { CollectionsSection } from "@/components/sections/collections/CollectionsSection";
import { ProductShowcase } from "@/components/sections/showcase/ProductShowcase";
import { MaterialLibrary } from "@/components/sections/materials/MaterialLibrary";
import { ProjectsSection } from "@/components/sections/projects/ProjectsSection";
import { DifferenceSection } from "@/components/sections/difference/DifferenceSection";
import { ProcessSection } from "@/components/sections/process/ProcessSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CollectionsSection />
      <ProductShowcase />
      <MaterialLibrary />
      <ProjectsSection />
      <DifferenceSection />
      <ProcessSection />
      {/* Future sections will go here */}
    </div>
  );
}
