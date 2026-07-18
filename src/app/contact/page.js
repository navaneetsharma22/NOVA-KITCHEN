"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" }
      });
      gsap.from([formRef.current, infoRef.current], {
        y: 60, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <section
        ref={sectionRef}
        className="w-full bg-[#FBF8F4] pt-40 pb-24 sm:pb-32"
        aria-label="Contact Us"
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8">

          {/* Header */}
          <div ref={headerRef} className="mx-auto max-w-[760px] text-center mb-16 sm:mb-24 flex flex-col items-center">
            <span className="mb-4 sm:mb-6 block font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C46A3C]">
              Get In Touch
            </span>
            <h1 className="mb-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] text-heading">
              Let's Start A Conversation
            </h1>
            <p className="font-sans text-base sm:text-lg leading-relaxed text-[#5F6368] max-w-2xl">
              Whether you have a question, want to schedule a consultation, or simply want to explore possibilities, our team is ready to help.
            </p>
          </div>

          {/* Two-Column Layout */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16 xl:gap-24">

            {/* Left: Contact Form (60%) */}
            <div ref={formRef} className="w-full lg:w-[60%]">
              <form className="flex flex-col space-y-6 bg-white rounded-[32px] p-8 sm:p-12 shadow-[0_20px_40px_rgba(31,31,31,0.04)] border border-[#EAE5DF]/50" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2">
                    <label className="font-sans text-xs font-semibold uppercase tracking-widest text-[#5F6368]">Full Name</label>
                    <input type="text" placeholder="John Doe" className="h-14 bg-[#FBF8F4] border border-[#EAE5DF] rounded-2xl px-5 font-sans text-sm text-heading placeholder:text-[#5F6368]/50 focus:outline-none focus:border-[#C46A3C] focus:ring-1 focus:ring-[#C46A3C] transition-all" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="font-sans text-xs font-semibold uppercase tracking-widest text-[#5F6368]">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="h-14 bg-[#FBF8F4] border border-[#EAE5DF] rounded-2xl px-5 font-sans text-sm text-heading placeholder:text-[#5F6368]/50 focus:outline-none focus:border-[#C46A3C] focus:ring-1 focus:ring-[#C46A3C] transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2">
                    <label className="font-sans text-xs font-semibold uppercase tracking-widest text-[#5F6368]">Phone</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" className="h-14 bg-[#FBF8F4] border border-[#EAE5DF] rounded-2xl px-5 font-sans text-sm text-heading placeholder:text-[#5F6368]/50 focus:outline-none focus:border-[#C46A3C] focus:ring-1 focus:ring-[#C46A3C] transition-all" />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="font-sans text-xs font-semibold uppercase tracking-widest text-[#5F6368]">Project Type</label>
                    <select className="h-14 bg-[#FBF8F4] border border-[#EAE5DF] rounded-2xl px-5 font-sans text-sm text-heading focus:outline-none focus:border-[#C46A3C] focus:ring-1 focus:ring-[#C46A3C] transition-all appearance-none">
                      <option>Modular Kitchen</option>
                      <option>Walk-in Wardrobe</option>
                      <option>Kitchen Island</option>
                      <option>Pantry Solution</option>
                      <option>Complete Renovation</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="font-sans text-xs font-semibold uppercase tracking-widest text-[#5F6368]">Message</label>
                  <textarea rows={5} placeholder="Tell us about your project..." className="bg-[#FBF8F4] border border-[#EAE5DF] rounded-2xl px-5 py-4 font-sans text-sm text-heading placeholder:text-[#5F6368]/50 focus:outline-none focus:border-[#C46A3C] focus:ring-1 focus:ring-[#C46A3C] transition-all resize-none" />
                </div>
                <button type="submit" className="self-start h-14 inline-flex items-center justify-center rounded-full bg-heading px-10 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-black hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(31,31,31,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heading">
                  Send Message
                </button>
              </form>
            </div>

            {/* Right: Contact Info (40%) */}
            <div ref={infoRef} className="w-full lg:w-[40%] flex flex-col space-y-8 lg:sticky lg:top-32">
              <div className="bg-white rounded-[32px] p-8 sm:p-10 shadow-[0_20px_40px_rgba(31,31,31,0.04)] border border-[#EAE5DF]/50">
                <h3 className="font-heading text-2xl font-medium text-heading mb-8">Contact Information</h3>
                <div className="flex flex-col space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#F5EBE1] flex items-center justify-center flex-shrink-0 mt-1">
                      <Phone className="w-4 h-4 text-[#C46A3C]" />
                    </div>
                    <div>
                      <span className="block font-sans text-xs uppercase tracking-widest text-[#5F6368] mb-1">Phone</span>
                      <a href="tel:+910000000000" className="font-sans text-sm text-heading hover:text-[#C46A3C] transition-colors font-medium">+91 XXX XXX XXXX</a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#F5EBE1] flex items-center justify-center flex-shrink-0 mt-1">
                      <Mail className="w-4 h-4 text-[#C46A3C]" />
                    </div>
                    <div>
                      <span className="block font-sans text-xs uppercase tracking-widest text-[#5F6368] mb-1">Email</span>
                      <a href="mailto:hello@novakitchens.com" className="font-sans text-sm text-heading hover:text-[#C46A3C] transition-colors font-medium">hello@novakitchens.com</a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#F5EBE1] flex items-center justify-center flex-shrink-0 mt-1">
                      <MapPin className="w-4 h-4 text-[#C46A3C]" />
                    </div>
                    <div>
                      <span className="block font-sans text-xs uppercase tracking-widest text-[#5F6368] mb-1">Studio</span>
                      <address className="font-sans text-sm text-heading not-italic leading-relaxed font-medium">Studio 205, Design Avenue,<br/>New Delhi, India</address>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#F5EBE1] flex items-center justify-center flex-shrink-0 mt-1">
                      <Clock className="w-4 h-4 text-[#C46A3C]" />
                    </div>
                    <div>
                      <span className="block font-sans text-xs uppercase tracking-widest text-[#5F6368] mb-1">Hours</span>
                      <span className="font-sans text-sm text-heading font-medium">Mon – Sat, 9:00 AM – 7:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden bg-[#EAE5DF]">
                <Image
                  src="/images/process/process_consultation_1784363019295.png"
                  alt="Our Studio"
                  fill
                  className="object-cover opacity-80"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="font-sans text-xs font-semibold uppercase tracking-widest text-white">Nova Kitchens Studio</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
