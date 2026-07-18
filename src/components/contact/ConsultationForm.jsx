"use client";

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function ConsultationForm() {
  const [formState, setFormState] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    projectType: "New Build",
    timeline: "Within 3 Months",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const projectTypes = ["New Build", "Full Renovation", "Single Room Upgrade", "Commercial"];
  const timelines = ["ASAP", "Within 3 Months", "3-6 Months", "Planning Phase"];

  if (isSuccess) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-1000">
        <div className="w-16 h-16 rounded-full bg-[#C46A3C]/10 flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-[#C46A3C]" />
        </div>
        <h3 className="font-heading text-3xl font-medium text-heading mb-4">Request Received</h3>
        <p className="font-sans text-[#5F6368] max-w-sm">
          Thank you for reaching out. A dedicated design consultant will contact you within 24 hours to schedule your private appointment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
      
      {/* Name Row */}
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="relative w-full">
          <input suppressHydrationWarning type="text" name="firstName" id="firstName" required value={formState.firstName} onChange={handleChange}
            className="peer w-full h-12 border-b border-[#EAE5DF] bg-transparent text-heading font-sans text-base placeholder-transparent focus:outline-none focus:border-[#C46A3C] transition-colors" placeholder="First Name" />
          <label htmlFor="firstName" className="absolute left-0 -top-3.5 text-xs font-sans font-bold uppercase tracking-widest text-[#A8A39D] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-[#A8A39D] peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-[#C46A3C]">
            First Name
          </label>
        </div>
        <div className="relative w-full">
          <input suppressHydrationWarning type="text" name="lastName" id="lastName" required value={formState.lastName} onChange={handleChange}
            className="peer w-full h-12 border-b border-[#EAE5DF] bg-transparent text-heading font-sans text-base placeholder-transparent focus:outline-none focus:border-[#C46A3C] transition-colors" placeholder="Last Name" />
          <label htmlFor="lastName" className="absolute left-0 -top-3.5 text-xs font-sans font-bold uppercase tracking-widest text-[#A8A39D] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-[#A8A39D] peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-[#C46A3C]">
            Last Name
          </label>
        </div>
      </div>

      {/* Contact Row */}
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="relative w-full">
          <input suppressHydrationWarning type="email" name="email" id="email" required value={formState.email} onChange={handleChange}
            className="peer w-full h-12 border-b border-[#EAE5DF] bg-transparent text-heading font-sans text-base placeholder-transparent focus:outline-none focus:border-[#C46A3C] transition-colors" placeholder="Email Address" />
          <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs font-sans font-bold uppercase tracking-widest text-[#A8A39D] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-[#A8A39D] peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-[#C46A3C]">
            Email Address
          </label>
        </div>
        <div className="relative w-full">
          <input suppressHydrationWarning type="tel" name="phone" id="phone" value={formState.phone} onChange={handleChange}
            className="peer w-full h-12 border-b border-[#EAE5DF] bg-transparent text-heading font-sans text-base placeholder-transparent focus:outline-none focus:border-[#C46A3C] transition-colors" placeholder="Phone Number (Optional)" />
          <label htmlFor="phone" className="absolute left-0 -top-3.5 text-xs font-sans font-bold uppercase tracking-widest text-[#A8A39D] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-[#A8A39D] peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-[#C46A3C]">
            Phone Number (Optional)
          </label>
        </div>
      </div>

      {/* Project Type Multi-Select (Simulated with pills) */}
      <div className="flex flex-col gap-4 mt-4">
        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#A8A39D]">Project Type</span>
        <div className="flex flex-wrap gap-3">
          {projectTypes.map(type => (
            <button key={type} suppressHydrationWarning type="button" onClick={() => setFormState({...formState, projectType: type})}
              className={cn("px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm transition-all focus-visible:outline-none",
                formState.projectType === type ? "bg-[#1F1F1F] text-white" : "bg-[#FBF8F4] text-[#5F6368] hover:bg-[#EAE5DF]"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Multi-Select */}
      <div className="flex flex-col gap-4 mt-2">
        <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#A8A39D]">Estimated Timeline</span>
        <div className="flex flex-wrap gap-3">
          {timelines.map(time => (
            <button key={time} suppressHydrationWarning type="button" onClick={() => setFormState({...formState, timeline: time})}
              className={cn("px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm transition-all focus-visible:outline-none",
                formState.timeline === time ? "bg-[#1F1F1F] text-white" : "bg-[#FBF8F4] text-[#5F6368] hover:bg-[#EAE5DF]"
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Message Area */}
      <div className="relative w-full mt-4">
        <textarea name="message" id="message" rows="4" value={formState.message} onChange={handleChange}
          className="peer w-full border-b border-[#EAE5DF] bg-transparent text-heading font-sans text-base placeholder-transparent focus:outline-none focus:border-[#C46A3C] transition-colors resize-none py-2" placeholder="Project Details" />
        <label htmlFor="message" className="absolute left-0 -top-3.5 text-xs font-sans font-bold uppercase tracking-widest text-[#A8A39D] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-[#A8A39D] peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-[#C46A3C]">
          Project Details (Optional)
        </label>
      </div>

      {/* Submit Button */}
      <button 
        suppressHydrationWarning
        type="submit" 
        disabled={isSubmitting}
        className="group relative h-14 w-full sm:w-auto inline-flex items-center justify-center overflow-hidden rounded-full bg-[#1F1F1F] px-8 font-sans text-sm font-semibold text-white transition-all hover:bg-[#C46A3C] focus-visible:outline-none disabled:opacity-70 mt-6"
      >
        <span className="mr-2 relative z-10">{isSubmitting ? "Submitting..." : "Request Appointment"}</span>
        {!isSubmitting && <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />}
      </button>

    </form>
  );
}
