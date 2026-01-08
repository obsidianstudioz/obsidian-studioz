import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// Animated text component that reveals each character based on scroll progress
// Only animates on desktop, simple fade on mobile
export function ScrollAnimatedText({
  text,
  className,
  disableAnimation = false,
}: {
  text: string;
  className?: string;
  disableAnimation?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.45"],
  });

  if (disableAnimation) {
    return (
      <span ref={ref} className={className}>
        {text}
      </span>
    );
  }

  // Desktop: Full animation
  const words = text.split(" ");
  const totalChars = text.replace(/ /g, "").length;
  let charIndex = 0;

  return (
    <span ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char) => {
            const start = charIndex / totalChars;
            const end = (charIndex + 1) / totalChars;
            charIndex++;

            return (
              <ScrollChar
                key={`${wordIndex}-${charIndex}`}
                char={char}
                scrollYProgress={scrollYProgress}
                start={start}
                end={end}
              />
            );
          })}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

function ScrollChar({
  char,
  scrollYProgress,
  start,
  end,
}: {
  char: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [80, 0]);
  const rotateX = useTransform(scrollYProgress, [start, end], [-90, 0]);
  const scale = useTransform(scrollYProgress, [start, end], [0.5, 1]);

  return (
    <motion.span
      className="inline-block"
      style={{ opacity, y, rotateX, scale }}
    >
      {char}
    </motion.span>
  );
}
