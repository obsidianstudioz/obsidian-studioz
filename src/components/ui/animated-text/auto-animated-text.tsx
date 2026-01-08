import { motion } from "motion/react";

// Animated text component that reveals each character automatically on mount
export function AutoAnimatedText({
  text,
  className,
  disableAnimation = false,
  staggerDelay = 0.03,
  initialDelay = 0,
}: {
  text: string;
  className?: string;
  disableAnimation?: boolean;
  staggerDelay?: number;
  initialDelay?: number;
}) {
  if (disableAnimation) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => {
            // Calculate total character index across all words
            const totalCharIndex =
              words.slice(0, wordIndex).join("").length + charIndex;

            return (
              <AnimatedChar
                key={`${wordIndex}-${charIndex}`}
                char={char}
                delay={initialDelay + totalCharIndex * staggerDelay}
              />
            );
          })}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

function AnimatedChar({ char, delay }: { char: string; delay: number }) {
  return (
    <motion.span
      className="inline-block"
      initial={{
        opacity: 0,
        y: 80,
        rotateX: -90,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom easing for smooth effect
      }}
      dangerouslySetInnerHTML={{ __html: char }}
    >
      {/* {char} */}
    </motion.span>
  );
}

// Example usage component
export function ExampleUsage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black p-8">
      <div className="max-w-4xl text-center">
        <h1 className="mb-8 text-4xl font-bold md:text-6xl">
          <AutoAnimatedText
            text="Welcome to the future"
            className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
          />
        </h1>

        <p className="text-xl text-gray-300 md:text-3xl">
          <AutoAnimatedText
            text="Every character animates beautifully"
            className="font-light"
            staggerDelay={0.02}
            initialDelay={0.8}
          />
        </p>

        <div className="mt-12">
          <AutoAnimatedText
            text="STUNNING ANIMATIONS"
            className="text-2xl font-black tracking-tight text-white uppercase md:text-4xl"
            staggerDelay={0.04}
            initialDelay={1.5}
          />
        </div>
      </div>
    </div>
  );
}
