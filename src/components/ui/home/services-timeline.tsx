"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "motion/react";
import { useDeviceProfile } from "@/components/hooks";

export interface ServiceTimelineItem {
  id: string;
  label: string;
  title: string;
  description: string;
  deliverable: string;
  /** Optional GitHub link */
  link?: string;
  /** Optional live demo link */
  depLink?: string;
}

interface ServicesTimelineProps {
  items: ServiceTimelineItem[];
  className?: string;
}

function ProgressTrack({ progress }: { progress: MotionValue<string> }) {
  return (
    <div className="absolute right-6 left-6 z-0 h-1 overflow-hidden rounded-full bg-white/5 sm:right-16 sm:left-16">
      <motion.div
        className="h-full bg-linear-to-r from-orange-400 via-amber-300 to-yellow-200"
        style={{ width: progress }}
      />
    </div>
  );
}

function ServiceCard({
  item,
  index,
}: {
  item: ServiceTimelineItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
      }}
      className="group relative flex w-60 shrink-0 flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-xl will-change-transform sm:w-72 lg:w-80"
    >
      <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-white/10 via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute -inset-1 rounded-[28px] bg-linear-to-br from-orange-400/25 to-yellow-300/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70" />

      <div className="relative flex items-center gap-3 text-xs tracking-[0.3em] text-white/50 uppercase">
        <span className="text-white/70">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-6 bg-white/20" />
        <span>{item.label}</span>
      </div>

      <div className="relative">
        <h3 className="font-title text-2xl font-light text-zinc-50">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300">
          {item.description}
        </p>
      </div>

      <div className="relative mt-auto rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-amber-200/90">
        {item.deliverable}
      </div>

      {/* Project links */}
      {(item.link ?? item.depLink) && (
        <div className="relative flex flex-wrap gap-2">
          {item.depLink && (
            <a
              href={item.depLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-4 py-1.5 text-xs font-semibold tracking-wide text-black uppercase transition hover:bg-orange-400"
            >
              <span>Live Demo</span>
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          )}
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/80 uppercase transition hover:bg-white/10 hover:text-white"
            >
              <span>GitHub</span>
              <svg
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

export function ServicesTimeline({
  items,
  className = "",
}: ServicesTimelineProps) {
  const { isMobile } = useDeviceProfile();

  // On mobile, render a simple vertical list (no scroll hijacking)
  if (isMobile) {
    return (
      <section className={`mdpy-8 relative mt-42 px-4 md:mt-0 ${className}`}>
        <div className="flex flex-col items-center gap-6 md:items-start">
          {items.map((item, index) => (
            <ServiceCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </section>
    );
  }

  // Desktop: horizontal scroll-linked timeline
  return <DesktopTimeline items={items} className={className} />;
}

function DesktopTimeline({ items, className = "" }: ServicesTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const calculateScrollRange = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setScrollRange(Math.max(0, trackWidth - viewportWidth + 100));
      }
    };

    calculateScrollRange();
    window.addEventListener("resize", calculateScrollRange);
    return () => window.removeEventListener("resize", calculateScrollRange);
  }, [items.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const x = useSpring(xRaw, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const progressRaw = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progress = useSpring(progressRaw, { stiffness: 100, damping: 30 });

  if (!items.length) return null;

  return (
    <section
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: `${Math.max(items.length * 60, 200)}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="relative flex flex-1 items-center">
          <ProgressTrack progress={progress} />

          <motion.div
            ref={trackRef}
            className="relative z-10 flex items-stretch gap-8 px-8 will-change-transform sm:gap-10 sm:px-16"
            style={{ x }}
          >
            <div className="w-[5vw] shrink-0" aria-hidden="true" />

            {items.map((item, index) => (
              <ServiceCard key={item.id} item={item} index={index} />
            ))}

            <div className="w-[25vw] shrink-0" aria-hidden="true" />
          </motion.div>
        </div>

        <p className="shrink-0 px-8 pb-8 text-center text-xs tracking-[0.4em] text-white/40 uppercase">
          Keep scrolling to unveil the craft
        </p>
      </div>
    </section>
  );
}
