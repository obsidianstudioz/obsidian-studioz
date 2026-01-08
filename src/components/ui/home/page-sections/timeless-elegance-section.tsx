import React from "react";
import { ScrollAnimatedText } from "../../animated-text";

interface TimelessEleganceSectionProps {
  disableTextAnimation: boolean;
}

export function TimelessEleganceSection({
  disableTextAnimation,
}: TimelessEleganceSectionProps) {
  return (
    <section className="mx-auto flex min-h-[20vh] max-w-7xl flex-col px-4 py-8 md:min-h-screen md:flex-row md:py-0">
      {/* Patterns - hidden on mobile */}
      <div className="hidden flex-col md:flex">
        <div className="pattern-1 h-120 w-120 rotate-90"></div>
        <div className="pattern-2 h-40 w-40"></div>
        <div className="pattern-1 relative left-40 h-40 w-40"></div>
        <div className="pattern-3 relative left-80 h-40 w-40"></div>
      </div>
      <div className="flex flex-col justify-center text-center md:p-5 md:text-left">
        <ScrollAnimatedText
          text="Timeless Elegance"
          className="text-3xl font-black tracking-tight text-orange-500 uppercase sm:text-5xl md:text-9xl"
          disableAnimation={disableTextAnimation}
        />
        <br />
        <ScrollAnimatedText
          text="Where innovation meets artistry, crafting designs that transcend the ordinary and resonate with eternal beauty"
          className="font-title text-lg leading-relaxed font-extralight tracking-wide text-white sm:text-2xl md:text-5xl"
          disableAnimation={disableTextAnimation}
        />
      </div>
    </section>
  );
}
