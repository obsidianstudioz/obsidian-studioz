import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function CyclingWords({
  words = ["STUNNING", "SEXY", "AMAZING", "AWESOME", "INCREDIBLE", "GORGEOUS"],
  className = "",
  interval = 2000,
}: {
  words?: string[];
  className?: string;
  interval?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  // Find the longest word to reserve space and prevent layout shift
  const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), "");

  return (
    <div className={`relative inline-grid overflow-hidden ${className}`}>
      {/* Invisible placeholder to reserve width */}
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {longestWord}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{
            x: -60,
            opacity: 0,
            filter: "blur(8px)",
            scale: 0.85,
          }}
          animate={{
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
          }}
          exit={{
            x: 60,
            opacity: 0,
            filter: "blur(8px)",
            scale: 1.1,
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="col-start-1 row-start-1 inline-block w-fit text-center whitespace-nowrap md:text-start"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
