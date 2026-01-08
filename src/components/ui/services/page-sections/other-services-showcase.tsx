"use client";

import { useDeviceProfile } from "@/components/hooks";

const SERVICES = [
  { num: "#4", label: "Video Editing" },
  { num: "#5", label: "Logo Designing" },
  { num: "#6", label: "Social Media Management" },
  { num: "#7", label: "Card / Catalogue Design" },
];

export function OtherServicesShowcase() {
  const { isMobile } = useDeviceProfile();

  return (
    <section className="w-full py-10">
      {isMobile ? (
        /* Mobile: Simple elegant list - no heavy grid */
        <div className="flex flex-col gap-4 px-4">
          {SERVICES.map(({ num, label }) => (
            <div
              key={num}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm"
            >
              <span className="font-title text-2xl font-bold text-orange-400">
                {num}
              </span>
              <span className="text-sm font-semibold tracking-widest text-white uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>
      ) : (
        /* Desktop: Grid with overlays */
        <div className="relative mx-auto max-w-5xl overflow-hidden border-2 border-dotted border-white/25 bg-white/5 p-4 shadow-[0_10px_60px_-35px_rgba(0,0,0,0.6)]">
          {/* Base grid */}
          <div className="grid grid-cols-12 gap-0">
            {Array.from({ length: 144 }).map((_, idx) => (
              <div
                key={`cell-${idx}`}
                className="aspect-square border border-dotted border-white/20 bg-linear-to-r from-orange-500/90 to-orange-500 bg-size-[0%_100%] bg-left bg-no-repeat transition-[background-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-size-[100%_100%]"
              />
            ))}
          </div>

          {/* Merged cells overlay */}
          <div className="pointer-events-none absolute inset-4 grid grid-cols-12 grid-rows-12 gap-0">
            {[
              {
                label: "Video Editing",
                number: "#4",
                col: "2 / span 3",
                row: "2 / span 2",
              },
              {
                label: "Logo Designing",
                number: "#5",
                col: "8 / span 4",
                row: "4 / span 2",
              },
              {
                label: "Social Media Management",
                number: "#6",
                col: "3 / span 6",
                row: "7 / span 2",
              },
              {
                label: "Card / Catalogue Design",
                number: "#7",
                col: "9 / span 3",
                row: "10 / span 2",
              },
            ].map((item) => (
              <div
                key={item.number}
                style={{ gridColumn: item.col, gridRow: item.row }}
                className="pointer-events-auto flex flex-col items-start justify-center gap-3 rounded-xl border border-dotted border-white/40 bg-black/60 px-3 py-2 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-sm"
              >
                <span className="font-title text-6xl font-bold text-orange-400">
                  {item.number}
                </span>
                <span className="text-lg font-semibold tracking-[0.2em] text-white uppercase">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
