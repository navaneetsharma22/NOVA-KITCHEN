import { ContactHero } from "@/components/contact/ContactHero";
import { StudioInfo } from "@/components/contact/StudioInfo";
import { ConsultationForm } from "@/components/contact/ConsultationForm";
import { InteractiveMap } from "@/components/contact/InteractiveMap";
import { FAQSection } from "@/components/sections/faq/FAQSection";
import { CTASection } from "@/components/sections/cta/CTASection";

export const metadata = {
  title: "Private Consultation | Nova Kitchens",
  description: "Book a private design consultation at the Nova Kitchens flagship studio.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      <ContactHero />

      {/* Split Section: Info & Form */}
      <section className="w-full bg-[#FBF8F4] py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
            
            {/* Left: Studio Information */}
            <div className="w-full lg:w-5/12">
              <StudioInfo />
            </div>

            {/* Right: Consultation Form */}
            <div className="w-full lg:w-7/12">
              <div className="bg-white p-8 sm:p-12 rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-[#EAE5DF]">
                <h3 className="font-heading text-3xl font-medium text-heading mb-8">
                  Request Appointment
                </h3>
                <ConsultationForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      <InteractiveMap />
      
      {/* We reuse the global FAQ and CTA to finish the page structure beautifully */}
      <FAQSection />
      <CTASection />

    </div>
  );
}
