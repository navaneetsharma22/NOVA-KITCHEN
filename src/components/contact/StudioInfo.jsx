"use client";

import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function StudioInfo() {
  return (
    <div className="w-full flex flex-col space-y-16">
      
      {/* Introduction */}
      <div>
        <h2 className="font-heading text-4xl sm:text-5xl font-medium text-heading mb-6">
          Global Design Studio
        </h2>
        <p className="font-sans text-lg text-[#5F6368] leading-relaxed max-w-md">
          Experience our materials and engineering firsthand. Our flagship studio is a fully immersive environment designed to inspire your next architectural project.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        
        {/* Address */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-3 mb-4 text-[#C46A3C]">
            <MapPin className="w-5 h-5" />
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#A8A39D]">Location</span>
          </div>
          <address className="not-italic font-sans text-base text-heading leading-[1.8] font-medium">
            Nova Kitchens Flagship<br/>
            42 Design District Blvd<br/>
            Milan, Italy 20121
          </address>
        </div>

        {/* Hours */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-3 mb-4 text-[#C46A3C]">
            <Clock className="w-5 h-5" />
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#A8A39D]">Hours</span>
          </div>
          <ul className="font-sans text-base text-heading leading-[1.8] font-medium space-y-1">
            <li className="flex justify-between w-48"><span>Mon - Fri</span> <span>09:00 - 18:00</span></li>
            <li className="flex justify-between w-48"><span>Saturday</span> <span>10:00 - 15:00</span></li>
            <li className="flex justify-between w-48 text-[#A8A39D]"><span>Sunday</span> <span>Closed</span></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col sm:col-span-2 border-t border-[#EAE5DF] pt-8">
          <div className="flex items-center space-x-3 mb-4 text-[#C46A3C]">
            <Phone className="w-5 h-5" />
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#A8A39D]">Direct Lines</span>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#A8A39D]">Client Concierge</span>
              <a href="tel:+390212345678" className="font-sans text-lg text-heading hover:text-[#C46A3C] transition-colors font-medium">
                +39 02 1234 5678
              </a>
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#A8A39D]">General Enquiries</span>
              <a href="mailto:studio@novakitchens.com" className="font-sans text-lg text-heading hover:text-[#C46A3C] transition-colors font-medium">
                studio@novakitchens.com
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
