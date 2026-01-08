import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ScrollAnimatedText } from "../../animated-text";

export function BrowserMockup() {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // Transform scroll progress to animation values
  const width = useTransform(scrollYProgress, [0, 1], ["70%", "100%"]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["40px", "0px"]);

  return (
    <div
      ref={containerRef}
      className="flex h-180 items-center justify-center p-4 md:p-8"
    >
      <motion.div style={{ width, borderRadius }} className="w-full max-w-7xl">
        {/* Browser Window */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-gray-900 to-black shadow-2xl backdrop-blur-xl">
          {/* Browser Header */}
          <div className="border-b border-white/10 bg-gray-800/50 px-4 py-3">
            <div className="mb-3 flex items-center gap-2">
              {/* Traffic Lights */}
              <div className="flex gap-2">
                <div className="h-3 w-3 cursor-pointer rounded-full bg-red-500 transition-colors hover:bg-red-400"></div>
                <div className="h-3 w-3 cursor-pointer rounded-full bg-yellow-500 transition-colors hover:bg-yellow-400"></div>
                <div className="h-3 w-3 cursor-pointer rounded-full bg-green-500 transition-colors hover:bg-green-400"></div>
              </div>
            </div>

            {/* URL Bar */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <button className="transition-colors hover:text-white">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button className="transition-colors hover:text-white">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                <button className="transition-colors hover:text-white">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex flex-1 items-center gap-2 rounded-lg border border-white/5 bg-gray-900/50 px-4 py-2 transition-all hover:border-white/10">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span className="flex-1 text-sm text-gray-400">
                  your-cool-website.com
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <button className="rounded-lg p-1.5 transition-colors hover:bg-white/5 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
                <button className="rounded-lg p-1.5 transition-colors hover:bg-white/5 hover:text-white">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-3 -mb-3 flex items-center gap-2">
              <div className="flex min-w-[200px] items-center gap-2 rounded-t-lg border-x border-t border-white/10 bg-gray-900/70 px-4 py-2">
                <svg
                  className="h-4 w-4 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                <span className="flex-1 text-sm text-gray-300">
                  Your cool website
                </span>
                <button className="text-gray-500 transition-colors hover:text-white">
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <button className="p-1 text-gray-500 transition-colors hover:text-white">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Browser Content */}
          <div className="relative flex min-h-[500px] flex-col items-center justify-center bg-gradient-to-br from-gray-950 to-black p-8">
            {/* Google Logo */}
            <div className="mb-8 animate-pulse">
              <div className="flex items-center justify-center gap-1 text-6xl font-bold md:text-7xl">
                <ScrollAnimatedText
                  text="Your cool website"
                  className="font-title text-white"
                />
              </div>
            </div>
            {/* 
            <div className="w-full max-w-2xl">
Search Input 
              <div
                className={`flex items-center gap-3 border bg-gray-900/50 ${
                  isFocused
                    ? "border-blue-500/50 shadow-lg shadow-blue-500/20"
                    : "border-white/10"
                } rounded-full px-6 py-4 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10`}
              >
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Search Google or type a URL"
                  className="flex-1 bg-transparent text-lg text-white placeholder-gray-500 outline-none"
                />
                <svg
                  className="h-5 w-5 cursor-pointer text-gray-400 transition-colors hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </div>

              Buttons 
              <div className="mt-8 flex items-center justify-center gap-4">
                <button className="rounded-lg border border-white/10 bg-gray-800/50 px-6 py-3 text-gray-300 transition-all hover:border-white/20 hover:bg-gray-700/50">
                  Google Search
                </button>
                <button className="rounded-lg border border-white/10 bg-gray-800/50 px-6 py-3 text-gray-300 transition-all hover:border-white/20 hover:bg-gray-700/50">
                  I'm Feeling Lucky
                </button>
              </div>

              Language 
              <div className="mt-8 text-center">
                <span className="text-sm text-gray-500">
                  Google offered in:{" "}
                  <button className="text-blue-400 transition-colors hover:text-blue-300 hover:underline">
                    Français
                  </button>
                </span>
              </div>
            </div> */}

            {/* Footer */}
            <div className="absolute right-0 bottom-0 left-0 hidden border-t border-white/5 bg-gray-900/30 backdrop-blur-sm md:block">
              <div className="px-8 py-3">
                <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">
                  <div className="flex items-center gap-6">
                    <button className="transition-colors hover:text-white">
                      Advertising
                    </button>
                    <button className="transition-colors hover:text-white">
                      Business
                    </button>
                    <button className="transition-colors hover:text-white">
                      How Search works
                    </button>
                  </div>
                  <div className="flex items-center gap-6">
                    <button className="transition-colors hover:text-white">
                      Privacy
                    </button>
                    <button className="transition-colors hover:text-white">
                      Terms
                    </button>
                    <button className="transition-colors hover:text-white">
                      Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
