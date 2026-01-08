import React from "react";
import { ScrollAnimatedText } from "../../animated-text";
import {
  ServicesTimeline,
  type ServiceTimelineItem,
} from "../services-timeline";

interface ServicesSectionProps {
  disableTextAnimation: boolean;
}

const servicesTimelineItems: ServiceTimelineItem[] = [
  {
    id: "algodoodle",
    label: "Education",
    title: "AlgoDoodle",
    description:
      "Learn Data Structures and Algorithms through interactive visualizations. Complex concepts become intuitive with playful animations and hands-on engagement.",
    deliverable: "Interactive DSA learning platform",
    link: "https://github.com/parv141206/algodoodle",
    depLink: "https://algodoodle.vercel.app/",
  },
  {
    id: "circuitsim",
    label: "Simulation",
    title: "CircuitSIM",
    description:
      "A complete 8085 microprocessor simulator featuring all registers and memory. Dive deep into microprocessor architecture with hands-on experimentation.",
    deliverable: "Full 8085 emulation environment",
    link: "https://github.com/parv141206/circuit-sim",
    depLink: "https://circuit-sim.vercel.app/",
  },
  {
    id: "mongui",
    label: "Developer Tools",
    title: "mongui",
    description:
      "Visually design Mongoose models and export clean, production-ready code. Streamline your database schema workflow with drag-and-drop simplicity.",
    deliverable: "Visual model builder → code export",
    link: "https://github.com/parv141206/mongui",
    depLink: "https://mongui.vercel.app/",
  },
  {
    id: "kontra",
    label: "Library",
    title: "kontra",
    description:
      "A C++ library for building sleek terminal UIs. Clean code, styled boxes, smooth input handling, and full control over your CLI experience.",
    deliverable: "Terminal UI framework for C++",
    link: "https://github.com/parv141206/kontra",
    depLink: "https://kontralib.vercel.app/",
  },
  {
    id: "blazekit",
    label: "Code Generation",
    title: "blazekit",
    description:
      "Accelerate development with automatic TypeScript types, database controllers, and Next.js API routes. Ship faster without the boilerplate.",
    deliverable: "Full-stack code generator",
    link: "https://github.com/parv141206/blazekit",
    depLink: "https://blaze-kit.vercel.app/",
  },
  {
    id: "knot",
    label: "Language",
    title: "knot",
    description:
      "A minimal, custom-built language for writing and visualizing mathematical expressions. Simple, lightweight, and delightfully fun to use.",
    deliverable: "Custom math expression language",
    link: "https://github.com/parv141206/knot",
  },
];

export function ServicesSection({
  disableTextAnimation,
}: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="font-title relative mx-auto flex w-full flex-col gap-12 px-4 pt-12 pb-8 text-center md:gap-16 md:px-0 md:pb-0"
    >
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-4 text-center md:items-end md:text-right">
        <ScrollAnimatedText
          text="Experience our"
          className="font-title text-3xl font-extralight tracking-wide text-orange-500 sm:text-5xl md:text-8xl"
          disableAnimation={disableTextAnimation}
        />
        <ScrollAnimatedText
          text="Creations"
          className="font-title text-3xl font-extralight tracking-wide text-orange-500 sm:text-5xl md:text-8xl"
          disableAnimation={disableTextAnimation}
        />
        {/* <p className="font-sans text-base text-zinc-400 sm:text-lg">
          Scroll through the obsidian timeline—each marker reveals another layer
          of the craft, forged in glass, gold, and precision.
        </p> */}
        <div className="absolute -bottom-45 flex">
          <div className="pattern-1 h-32 w-64"></div>
        </div>
      </div>
      <div className="full-bleed">
        <ServicesTimeline items={servicesTimelineItems} />
      </div>
    </section>
  );
}
