import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ScrollAnimatedText } from "../../animated-text";

interface EtherealBeautySectionProps {
  disableTextAnimation: boolean;
  isMobile: boolean;
}

export function EtherealBeautySection({
  disableTextAnimation,
  isMobile,
}: EtherealBeautySectionProps) {
  const section3Ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: section3Ref,
    offset: ["start end", "start start"],
  });

  // Transform scroll progress to animation values - only for desktop
  const width = useTransform(scrollYProgress, [0, 1], ["70%", "100vw"]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["40px", "0px"]);

  return (
    <div
      ref={section3Ref}
      className="flex min-h-[70vh] justify-center md:min-h-screen"
    >
      <motion.section
        style={isMobile ? {} : { width, borderRadius }}
        className="flex w-full flex-col items-center justify-center bg-orange-500 px-4 py-16 text-center md:px-12 md:text-left"
      >
        <div className="font-title mx-auto flex max-w-7xl flex-col items-center justify-center md:px-8">
          <h2 className="font-title mb-4 text-4xl font-extralight text-black sm:text-6xl md:mb-8 md:text-9xl">
            Ethereal Beauty
          </h2>
          <p className="mb-6 text-center leading-relaxed text-white/90">
            <span className="text-xl text-black sm:text-3xl md:text-5xl">
              We forge icons, websites that
            </span>{" "}
            <br />
            <br />
            <ScrollAnimatedText
              text="command awe, defy time, and echo with eternal beauty."
              className="text-xl font-black tracking-tight text-black uppercase sm:text-3xl md:text-5xl"
              disableAnimation={disableTextAnimation}
            />
            <br />
            <span className="mt-4 inline-block text-base text-black/80 italic sm:text-xl md:mt-8 md:text-3xl">
              This is the mark of Obsidian Studioz.
            </span>
          </p>
        </div>
      </motion.section>
    </div>
  );
}
