import React from "react";
import { BrowserMockup } from "./browser-mockup";
import { motion } from "motion/react";
import { CyclingWords, AutoAnimatedText } from "../../animated-text";

export function WebShowcase() {
  return (
    <>
      <div className="flex flex-col items-center gap-5 md:flex-row">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="pattern-2 relative h-40 w-40 sm:h-52 sm:w-52 md:h-64 md:w-64"
        >
          <div className="font-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-6xl font-bold text-white sm:text-7xl md:text-9xl">
            #1
          </div>
        </motion.div>
        <div className="flex flex-col items-center font-extralight text-orange-500 md:items-start">
          <AutoAnimatedText
            text="Web"
            className="font-title text-4xl sm:text-6xl md:text-9xl"
          />
          <AutoAnimatedText
            text="Applications"
            className="font-title text-4xl sm:text-6xl md:text-9xl"
          />
        </div>
      </div>
      <div className="flex flex-col items-center text-2xl sm:flex-row sm:flex-wrap sm:justify-end sm:text-4xl md:text-7xl">
        <AutoAnimatedText
          text="with"
          className="font-black tracking-tight text-white uppercase"
          disableAnimation={false}
        />
        <CyclingWords
          words={["STUNNING", "SEXY", "AMAZING", "AWESOME"]}
          className="bg-orange-500 px-2 font-black text-black uppercase sm:mx-2"
          interval={1800}
        />
        <AutoAnimatedText
          text="animations"
          className="font-black tracking-tight text-white uppercase"
          disableAnimation={false}
        />
      </div>
      <BrowserMockup />
    </>
  );
}
