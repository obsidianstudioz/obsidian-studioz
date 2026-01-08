import React from "react";

interface CraftedPrecisionSectionProps {
  isMobile: boolean;
}

export function CraftedPrecisionSection({
  isMobile,
}: CraftedPrecisionSectionProps) {
  return (
    <section className="mx-auto max-w-7xl py-10 md:py-16">
      <h2
        className={`font-title mb-4 text-3xl font-extralight text-orange-400 sm:text-5xl md:mb-8 md:text-7xl ${
          isMobile ? "text-center" : "text-center md:text-left"
        }`}
      >
        <span className="bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
          Crafted with Precision
        </span>
      </h2>
      <p
        className={`font-title mx-auto w-full max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-2xl md:text-4xl ${
          isMobile ? "text-center" : "text-center md:mx-0 md:w-1/2 md:text-left"
        }`}
      >
        We forge <span className="text-orange-400">digital masterpieces</span>{" "}
        that transcend the ordinary. Precision is not just our craft, it&apos;s
        our
        <i className="mx-1 rounded-sm bg-orange-400 px-1 text-lg text-black sm:mx-2 sm:px-2 sm:text-2xl md:text-4xl">
          legacy
        </i>
      </p>
      <br />
      {/* Patterns - hidden on mobile */}
      {!isMobile && (
        <div className="hidden flex-wrap gap-2 sm:flex">
          <div className="pattern-1 h-20 w-20 md:h-40 md:w-40"></div>
          <div className="pattern-2 h-20 w-20 md:h-40 md:w-40"></div>
          <div className="pattern-3 h-20 w-20 md:h-40 md:w-40"></div>
        </div>
      )}
    </section>
  );
}
