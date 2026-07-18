import { Hero } from "@/components/hero/Hero";
import { CollectionsSection } from "@/components/sections/collections/CollectionsSection";
import { ProductShowcase } from "@/components/sections/showcase/ProductShowcase";
import { MaterialLibrary } from "@/components/sections/materials/MaterialLibrary";
import { ProjectsSection } from "@/components/sections/projects/ProjectsSection";
import { DifferenceSection } from "@/components/sections/difference/DifferenceSection";
import { ProcessSection } from "@/components/sections/process/ProcessSection";
import { JournalSection } from "@/components/sections/journal/JournalSection";
import { TestimonialSection } from "@/components/sections/testimonials/TestimonialSection";
import { FAQSection } from "@/components/sections/faq/FAQSection";
import { CTASection } from "@/components/sections/cta/CTASection";

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
      <JournalSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
      {/* Future sections will go here */}
    </div>
  );
}
