"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1F1F1F] min-h-screen text-white">
      <div className="flex flex-col items-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-medium tracking-[0.2em] mb-4 text-white">
          NOVA KITCHENS
        </h2>
        <div className="w-16 h-[1px] bg-[#C46A3C]" />
      </div>
    </div>
  );
}
