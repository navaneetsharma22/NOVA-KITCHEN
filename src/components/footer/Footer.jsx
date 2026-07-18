"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const footerRef = useRef(null);
  const topRef = useRef(null);
  const columnsRef = useRef(null);
  const newsletterRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Top Section Reveal
      gsap.from(topRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: topRef.current,
          start: "top 90%",
        }
      });
      
      // Columns Stagger
      gsap.from(columnsRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: columnsRef.current,
          start: "top 85%",
        }
      });

      // Newsletter Reveal
      gsap.from(newsletterRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: newsletterRef.current,
          start: "top 90%",
        }
      });

      // Bottom Bar Reveal
      gsap.from(bottomRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bottomRef.current,
          start: "top 95%",
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative w-full bg-[#FBF8F4] pt-24 sm:pt-32 pb-8 overflow-hidden"
    >
      {/* Subtle Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8">
        
        {/* Top Section */}
        <div ref={topRef} className="flex flex-col mb-20 sm:mb-24">
          <Link href="/" className="inline-block mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
            <span className="font-heading text-4xl font-medium tracking-tight text-heading">
              NOVA.
            </span>
          </Link>
          <p className="font-sans text-base sm:text-lg lg:text-xl text-[#5F6368] leading-relaxed max-w-[520px]">
            Designing timeless kitchens and bespoke living spaces with exceptional craftsmanship, premium materials and modern elegance.
          </p>
        </div>

        {/* Main 4-Column Layout */}
        <div ref={columnsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 mb-24">
          
          {/* Column 1: Navigation */}
          <div className="flex flex-col space-y-6">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#C46A3C]">
              Navigation
            </h4>
            <ul className="flex flex-col space-y-4">
              {['Home', 'About', 'Collections', 'Projects', 'Journal', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="group relative inline-flex font-sans text-sm text-heading transition-colors hover:text-[#C46A3C]">
                    <span className="relative z-10">{item}</span>
                    <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#C46A3C] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Collections */}
          <div className="flex flex-col space-y-6">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#C46A3C]">
              Collections
            </h4>
            <ul className="flex flex-col space-y-4">
              {['Modular Kitchens', 'Walk-in Wardrobes', 'Kitchen Islands', 'Pantry Solutions', 'TV Units', 'Utility Spaces'].map((item) => (
                <li key={item}>
                  <Link href={`/collections/${item.toLowerCase().replace(/\s+/g, '-')}`} className="group relative inline-flex font-sans text-sm text-[#5F6368] transition-colors hover:text-heading">
                    <span className="relative z-10">{item}</span>
                    <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-heading transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col space-y-6">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#C46A3C]">
              Company
            </h4>
            <ul className="flex flex-col space-y-4">
              {['About Us', 'Design Process', 'Materials', 'Careers', 'FAQs', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link href={`/company/${item.toLowerCase().replace(/\s+/g, '-')}`} className="group relative inline-flex font-sans text-sm text-[#5F6368] transition-colors hover:text-heading">
                    <span className="relative z-10">{item}</span>
                    <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-heading transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col space-y-6">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-[#C46A3C]">
              Contact
            </h4>
            <div className="flex flex-col space-y-6">
              
              <div className="flex flex-col space-y-1">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#5F6368]">Phone</span>
                <a href="tel:+910000000000" className="font-sans text-sm text-heading hover:text-[#C46A3C] transition-colors">
                  +91 XXX XXX XXXX
                </a>
              </div>

              <div className="flex flex-col space-y-1">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#5F6368]">Email</span>
                <a href="mailto:hello@novakitchens.com" className="font-sans text-sm text-heading hover:text-[#C46A3C] transition-colors">
                  hello@novakitchens.com
                </a>
              </div>

              <div className="flex flex-col space-y-1">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#5F6368]">Address</span>
                <address className="font-sans text-sm text-heading not-italic leading-relaxed">
                  Studio 205,<br/>Design Avenue,<br/>New Delhi, India
                </address>
              </div>

              <div className="flex flex-col space-y-1">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#5F6368]">Business Hours</span>
                <span className="font-sans text-sm text-heading">
                  Mon – Sat<br/>9:00 AM – 7:00 PM
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Newsletter & Socials */}
        <div ref={newsletterRef} className="flex flex-col lg:flex-row lg:items-end justify-between border-t border-[#EAE5DF] pt-16 sm:pt-20 pb-16 sm:pb-24 gap-12">
          
          {/* Newsletter */}
          <div className="flex flex-col max-w-[480px]">
            <h4 className="font-heading text-2xl sm:text-3xl font-medium text-heading mb-4">
              Design Inspiration Delivered Monthly
            </h4>
            <p className="font-sans text-sm text-[#5F6368] leading-relaxed mb-8">
              Receive curated design inspiration, material trends and project stories from Nova Kitchens.
            </p>
            <form className="flex w-full relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full h-14 bg-white border border-[#EAE5DF] rounded-full pl-6 pr-32 font-sans text-sm text-heading placeholder:text-[#5F6368]/60 focus:outline-none focus:border-[#C46A3C] focus:ring-1 focus:ring-[#C46A3C] transition-all"
                required
                aria-label="Email Address for Newsletter"
              />
              <button 
                type="submit" 
                className="absolute right-1.5 top-1.5 bottom-1.5 inline-flex items-center justify-center rounded-full bg-heading px-6 font-sans text-xs font-semibold text-white transition-all duration-300 hover:bg-[#C46A3C] hover:shadow-md focus-visible:outline-none"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6 sm:space-x-8">
            {['Instagram', 'Pinterest', 'LinkedIn', 'YouTube'].map((social) => (
              <a 
                key={social} 
                href={`#${social.toLowerCase()}`}
                className="group relative inline-flex font-sans text-xs sm:text-sm uppercase tracking-widest text-heading transition-colors hover:text-[#C46A3C]"
              >
                <span className="relative z-10">{social}</span>
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#C46A3C] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <div ref={bottomRef} className="flex flex-col sm:flex-row items-center justify-between border-t border-[#EAE5DF] pt-8 gap-4 text-center sm:text-left">
          <span className="font-sans text-[10px] sm:text-xs text-[#5F6368]">
            © 2026 Nova Kitchens. All Rights Reserved.
          </span>
          <span className="font-sans text-[10px] sm:text-xs text-[#5F6368]">
            Designed & Crafted by Nova Kitchens Studio
          </span>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link href="/privacy-policy" className="font-sans text-[10px] sm:text-xs text-[#5F6368] transition-colors hover:text-heading">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="font-sans text-[10px] sm:text-xs text-[#5F6368] transition-colors hover:text-heading">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
