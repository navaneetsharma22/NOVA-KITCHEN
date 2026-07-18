"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Floating Header Wrapper */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 md:px-8 pointer-events-none">
        <div 
          className={cn(
            "mx-auto max-w-[1440px] pointer-events-auto rounded-full border border-[#DAD5CF]/40 backdrop-blur-[20px] transition-all duration-300 ease-out flex items-center justify-between px-6 sm:px-8",
            isScrolled 
              ? "h-[68px] bg-[#FBF8F4]/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)]" 
              : "h-[80px] bg-[#FBF8F4]/78 shadow-[0_4px_20px_rgb(0,0,0,0.02)]"
          )}
        >
          {/* Logo - Left */}
          <Link 
            href="/" 
            className={cn(
              "flex flex-col justify-center transition-transform duration-300 ease-out",
              isScrolled ? "scale-95" : "scale-100"
            )}
          >
            <span className="font-heading text-heading font-medium tracking-wide leading-none text-xl sm:text-2xl">
              NOVA
            </span>
            <span className="font-sans text-primary text-[10px] sm:text-xs tracking-[0.2em] font-semibold uppercase mt-0.5">
              Kitchens
            </span>
          </Link>

          {/* Desktop Links - Center */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 font-sans text-sm font-medium transition-all duration-300 ease-out hover:-translate-y-0.5 group",
                    isActive ? "text-primary" : "text-body hover:text-heading"
                  )}
                >
                  {link.name}
                  {/* Active Indicator */}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions - Right */}
          <div className="hidden lg:flex items-center space-x-6">
            <a 
              href="tel:+919876543210" 
              className="flex items-center space-x-2 text-heading group transition-all duration-300"
            >
              <span className="bg-surface p-2 rounded-full border border-border/50 group-hover:border-primary/30 transition-colors">
                <Phone className="w-4 h-4 text-primary" strokeWidth={1.5} />
              </span>
              <span className="font-sans text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
                +91 98765 43210
              </span>
            </a>

            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-7 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-[#b35f34] hover:shadow-[0_8px_20px_rgba(196,106,60,0.25)] hover:scale-[1.02]"
            >
              Book Free Consultation
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button suppressHydrationWarning 
            className="lg:hidden p-2 text-heading -mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Drawer */}
      <div 
        className={cn(
          "fixed inset-0 z-[100] bg-background/80 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div 
          className={cn(
            "flex flex-col h-full w-full px-6 py-8 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-75",
            mobileMenuOpen ? "translate-y-0" : "translate-y-8"
          )}
        >
          <div className="flex items-center justify-between mb-16">
            <Link 
              href="/" 
              className="flex flex-col"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="font-heading text-heading font-medium tracking-wide text-2xl">
                NOVA
              </span>
              <span className="font-sans text-primary text-xs tracking-[0.2em] font-semibold uppercase mt-0.5">
                Kitchens
              </span>
            </Link>
            <button suppressHydrationWarning 
              className="p-3 bg-surface rounded-full border border-border text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex flex-col space-y-6 flex-1">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-heading text-4xl sm:text-5xl font-medium tracking-tight text-heading hover:text-primary transition-colors flex items-center group"
                >
                  <span className={cn(
                    "transition-all duration-300",
                    isActive ? "text-primary" : "group-hover:translate-x-4"
                  )}>
                    {link.name}
                  </span>
                  {isActive && (
                    <span className="ml-6 h-[2px] w-12 bg-primary rounded-full hidden sm:block" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto flex flex-col space-y-6 pt-8 border-t border-border/50">
            <a 
              href="tel:+919876543210" 
              className="flex items-center space-x-3 text-heading"
            >
              <span className="bg-surface p-3 rounded-full border border-border">
                <Phone className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </span>
              <span className="font-sans text-lg font-medium">
                +91 98765 43210
              </span>
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-14 w-full items-center justify-center rounded-2xl bg-primary font-sans text-base font-semibold text-white transition-all active:scale-95"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
