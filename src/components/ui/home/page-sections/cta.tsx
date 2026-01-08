import React from "react";
import { ScrollAnimatedText } from "../../animated-text";

export function CTA() {
  return (
    <section className="flex min-h-[40vh] flex-col items-center justify-center px-4 py-16 text-center md:mx-auto md:max-w-7xl">
      <ScrollAnimatedText
        text="Thats just the tip of the iceberg"
        className="text-3xl font-black tracking-tight text-orange-500 uppercase sm:text-5xl md:text-9xl"
        // disableAnimation={disableTextAnimation}
      />
    </section>
  );
}
