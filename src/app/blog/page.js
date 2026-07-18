import { JournalSection } from "@/components/sections/journal/JournalSection";
import { CTASection } from "@/components/sections/cta/CTASection";

export const metadata = {
  title: "Blog | Nova Kitchens",
  description: "Read expert insights, design trends and inspiration from Nova Kitchens.",
};

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24">
      <JournalSection />
      <CTASection />
    </div>
  );
}
