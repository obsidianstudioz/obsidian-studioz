import React from "react";

interface HeroSectionProps {
  isMobile: boolean;
}

export function HeroSection({ isMobile }: HeroSectionProps) {
  return (
    <section
      className={`relative mx-auto flex min-h-screen max-w-7xl flex-col pt-28 pb-16 sm:pt-32 md:pt-0 md:pb-0 ${
        isMobile
          ? "items-center justify-center text-center"
          : "items-start justify-end text-left"
      }`}
    >
      <h1
        className={`font-title mb-6 bg-linear-to-r from-orange-400 via-orange-400 to-orange-500 bg-clip-text text-4xl leading-tight font-extralight text-transparent uppercase sm:text-6xl md:text-9xl`}
      >
        Obsidian <br /> Studioz
      </h1>

      {/* Mobile: Centered taglines below title */}
      {isMobile && (
        <div className="font-title flex flex-col gap-1 text-xl text-orange-400">
          <span>MASTERY</span>
          <span>EXCELLENCE</span>
          <span>VISION</span>
        </div>
      )}

      {/* Desktop: Decorative box in corner */}
      {!isMobile && (
        <div className="font-title absolute top-0 right-0 m-20 border-t border-r border-orange-400 p-5 text-end text-5xl text-orange-400">
          <div>MASTERY</div>
          <div>EXCELLENCE</div>
          <div>VISION</div>
        </div>
      )}
    </section>
  );
}
