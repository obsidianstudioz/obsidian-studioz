"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { AutoAnimatedText } from "../../animated-text";
import { useDeviceProfile } from "@/components/hooks";

const GoldenCube = dynamic(() => import("@/components/three-d/golden-cube"), {
  ssr: false,
  loading: () => null,
});

function StaticCubeFallback() {
  return (
    <div className="flex h-64 w-64 items-center justify-center">
      <div className="relative h-32 w-32 rotate-45 rounded-2xl bg-linear-to-br from-orange-400 via-orange-500 to-amber-600 shadow-2xl shadow-orange-500/40">
        <div className="absolute inset-2 rounded-xl bg-linear-to-br from-orange-300/30 to-transparent" />
      </div>
    </div>
  );
}

export function ThreeDShowcase() {
  const { isMobile, isLowPower } = useDeviceProfile();
  const show3D = !isMobile && !isLowPower;

  return (
    <>
      <div className="my-20 flex flex-col items-center gap-16 md:gap-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="pattern-2 relative h-40 w-40 rotate-45 sm:h-52 sm:w-52 md:h-64 md:w-64"
        >
          <div className="font-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 text-center text-6xl font-bold text-white sm:text-7xl md:text-9xl">
            #3
          </div>
        </motion.div>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row-reverse md:gap-20">
          <div className="flex flex-col items-center font-extralight text-orange-500 md:items-end">
            <AutoAnimatedText
              text="3D"
              className="text-end text-4xl font-extrabold sm:text-6xl md:text-9xl"
            />
            <AutoAnimatedText
              text="Models"
              className="text-end text-4xl font-extrabold sm:text-6xl md:text-9xl"
            />
          </div>
          <div className="flex h-64 flex-col items-center justify-center sm:h-96">
            {show3D ? (
              <GoldenCube size={2} className="h-full w-full" />
            ) : (
              <StaticCubeFallback />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
