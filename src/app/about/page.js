import { AboutHero } from "@/components/about/AboutHero";
import { OurStory } from "@/components/about/OurStory";
import { Philosophy } from "@/components/about/Philosophy";
import { Craftsmanship } from "@/components/about/Craftsmanship";
import { Designers } from "@/components/about/Designers";
import { Awards } from "@/components/about/Awards";
import { CTASection } from "@/components/sections/cta/CTASection";

export const metadata = {
  title: "About Us | Nova Kitchens",
  description: "Discover the philosophy, craftsmanship, and team behind Nova Kitchens.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AboutHero />
      <OurStory />
      <Philosophy />
      <Craftsmanship />
      <Designers />
      <Awards />
      <CTASection />
    </div>
  );
}
