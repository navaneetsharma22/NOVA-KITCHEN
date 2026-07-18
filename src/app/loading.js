"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1F1F1F] min-h-screen">
      <div className="flex flex-col items-center animate-pulse">
        <h2 className="font-heading text-4xl sm:text-5xl font-medium tracking-wide text-white mb-4">
          NOVA
        </h2>
        <div className="w-16 h-[1px] bg-[#C46A3C] opacity-80" />
      </div>
    </div>
  );
}
