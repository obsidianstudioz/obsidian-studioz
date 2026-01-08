import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AutoAnimatedText, CyclingWords } from "../../animated-text";

type IconProps = {
  path: string;
};

const MenuIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const AppLogo = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C25.4967 42 26.9438 41.8153 28.3283 41.4746C31.0694 40.7985 33.5135 39.3175 35.4545 37.2474C37.3955 35.1772 38.75 32.5977 39.3758 29.756C39.7915 27.8033 40 25.7537 40 23.6364C40 13.8943 32.835 6 24 6Z"
      fill="url(#paint0_linear_1_2)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1_2"
        x1="6"
        y1="6"
        x2="40"
        y2="42"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0.7" />
      </linearGradient>
    </defs>
  </svg>
);

const FeatureIcon = ({ path }: IconProps) => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d={path}
    />
  </svg>
);

const NavIcon = ({ path }: IconProps) => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d={path}
    />
  </svg>
);

const PHONE_FEATURES = [
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Lightning Fast",
  },
  {
    icon: "M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5zm0 6l-8 8-4-4 1.5-1.5L4 16l6.5-6.5L12 11z",
    title: "Beautiful Design",
  },
  {
    icon: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z",
    title: "Secure & Private",
  },
];

const PHONE_THEMES = {
  dark: {
    frame: "border-gray-700 bg-gray-950",
    screenBorder: "border-gray-800 bg-gray-900",
    screenBg: "bg-linear-to-br from-gray-900 via-black to-gray-800",
    statusText: "text-white",
    iconButton: "bg-white/10 text-white hover:bg-white/20",
    featureBorder: "border-white/10 bg-white/5 hover:bg-white/10",
    featureText: "text-white",
    featureAccent:
      "bg-linear-to-br from-orange-500/20 to-amber-600/20 text-orange-400",
    navBorder: "border-white/10 bg-white/5",
    navText: "text-gray-400",
    navHover: "hover:bg-orange-500/20 hover:text-orange-400",
    indicator: "bg-white/30",
  },
  light: {
    frame: "border-gray-200 bg-white",
    screenBorder: "border-gray-200 bg-gray-50",
    screenBg: "bg-linear-to-br from-gray-50 via-white to-gray-100",
    statusText: "text-gray-900",
    iconButton: "bg-black/5 text-gray-800 hover:bg-black/10",
    featureBorder: "border-black/10 bg-black/5 hover:bg-black/10",
    featureText: "text-gray-900",
    featureAccent:
      "bg-linear-to-br from-orange-500/20 to-amber-600/20 text-orange-600",
    navBorder: "border-black/10 bg-black/5",
    navText: "text-gray-500",
    navHover: "hover:bg-orange-500/20 hover:text-orange-500",
    indicator: "bg-black/20",
  },
} as const;

export type PhoneMockupProps = {
  variant?: "dark" | "light";
  className?: string;
};

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  variant = "dark",
  className,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    variant === "dark" ? [-10, -2] : [12, 4],
  );
  const y = useTransform(scrollYProgress, [0, 1], [30, -10]);
  const theme = PHONE_THEMES[variant];

  return (
    <motion.div
      ref={ref}
      style={{ rotateZ: rotate, y }}
      className={`relative w-64 will-change-transform sm:w-40 md:w-72 ${className ?? ""}`}
    >
      <div
        className={`rounded-[48px] border-4 ${theme.frame} p-2 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.75)]`}
      >
        <div
          className={`relative aspect-[9/19.5] w-full overflow-hidden rounded-[40px] border ${theme.screenBorder}`}
        >
          <div className="absolute top-0 z-20 w-full px-5 pt-4 pb-2">
            <div
              className={`flex items-center justify-between text-xs ${theme.statusText}`}
            >
              <span className="font-semibold">9:41</span>
              <div className="flex items-center gap-2 text-current">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 3.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V4.25A.75.75 0 0110 3.5zM6.31 6.31a.75.75 0 001.06-1.06L6.31 6.31zM3.5 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H4.25a.75.75 0 01-.75-.75zM6.31 13.69a.75.75 0 00-1.06 1.06l-1.06-1.06zM10 16.5a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75zM13.69 13.69a.75.75 0 001.06 1.06l1.06-1.06zM16.5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM13.69 6.31a.75.75 0 00-1.06-1.06l1.06 1.06z" />
                </svg>
                <svg
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 10a9 9 0 1118 0 9 9 0 01-18 0zm13.22-3.22a.75.75 0 01.06 1.06l-4.5 6a.75.75 0 01-1.12 0l-2.25-3a.75.75 0 111.12-1.06l1.69 2.25 3.94-5.25a.75.75 0 011.06-.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className={`absolute inset-0 flex flex-col ${theme.screenBg}`}>
            <div className="mt-8 flex items-center justify-between px-5 py-4">
              <button
                className={`flex items-center justify-center rounded-full transition-colors md:h-10 md:w-10 ${theme.iconButton}`}
              >
                <MenuIcon />
              </button>
              <div className="h-10 w-10 rounded-full bg-linear-to-br from-orange-500 to-amber-500" />
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-orange-500 via-orange-600 to-amber-600 shadow-2xl shadow-orange-500/40">
                <AppLogo />
              </div>
              <h1 className={`mb-3 font-bold md:text-4xl ${theme.featureText}`}>
                Project Fusion
              </h1>
              <p className="mb-6 max-w-xs text-base text-gray-400">
                Experience the future of seamless integration.
              </p>
              <button className="rounded-full bg-linear-to-r from-orange-500 to-amber-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/40 transition hover:shadow-orange-500/60">
                Get Started
              </button>

              <div className="mt-8 w-full space-y-2">
                {PHONE_FEATURES.map((feature) => (
                  <div
                    key={`${variant}-${feature.title}`}
                    className={`flex items-center gap-4 rounded-2xl border p-4 backdrop-blur-sm transition-colors ${theme.featureBorder}`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${theme.featureAccent}`}
                    >
                      <FeatureIcon path={feature.icon} />
                    </div>
                    <span className={`font-medium ${theme.featureText}`}>
                      {feature.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-5 pb-6">
              <div
                className={`flex items-center justify-around rounded-full border p-2 backdrop-blur-sm ${theme.navBorder}`}
              >
                {[
                  {
                    path: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                  },
                  { path: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
                  { path: "M12 4v16m8-8H4" },
                  {
                    path: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                  },
                ].map((item, index) => (
                  <button
                    key={`${variant}-nav-${index}`}
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-all ${theme.navText} ${theme.navHover}`}
                  >
                    <NavIcon path={item.path} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center pb-2">
              <div className={`h-1.5 w-32 rounded-full ${theme.indicator}`} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function IPhoneMockup() {
  return (
    // <section className="relative overflow-hidden rounded-[48px] border border-white/10 bg-linear-to-br from-[#05070d] via-[#0b0f1c] to-[#020308] px-6 py-12 shadow-[0_60px_140px_-50px_rgba(0,0,0,0.85)] sm:px-10 md:px-16">
    <section className="px-4 sm:px-6 md:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute right-0 -bottom-32 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
        {/* <div className="absolute inset-y-0 left-1/2 hidden w-px bg-white/5 lg:block" /> */}
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-14 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8 text-white">
          <div className="flex flex-col flex-wrap items-center gap-4 sm:gap-6 md:flex-row">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="pattern-2 relative h-32 w-32 rounded-4xl sm:h-40 sm:w-40 md:h-48 md:w-48"
            >
              <div className="font-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-5xl font-bold text-white sm:text-6xl md:text-8xl">
                #2
              </div>
            </motion.div>
            <div className="flex flex-col items-center font-extralight text-orange-500 md:items-start">
              <AutoAnimatedText
                text="Mobile"
                className="font-title text-3xl sm:text-5xl md:text-7xl"
              />
              <AutoAnimatedText
                text="Applications"
                className="font-title text-3xl sm:text-5xl md:text-7xl"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xl leading-tight sm:gap-3 sm:text-3xl md:text-5xl">
            <AutoAnimatedText
              text="crafted with"
              className="font-black tracking-tight text-white uppercase"
            />
            <CyclingWords
              words={["NATIVE", "BUTTERY", "HAPTIC", "OFFLINE-FIRST"]}
              className="rounded-full bg-orange-500 px-3 py-1 font-black text-black uppercase sm:px-4"
              interval={1400}
            />
            <AutoAnimatedText
              text="precision"
              className="font-black tracking-tight text-white uppercase"
            />
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-semibold text-black sm:gap-3 sm:text-sm">
            {[
              "SwiftUI",
              "Kotlin",
              "React Native",
              "Expo",
              "Flutter",
              "Supabase",
            ].map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-white/90 px-3 py-1 tracking-[0.2em] text-gray-900 uppercase sm:px-4 sm:tracking-[0.3em]"
              >
                {chip}
              </span>
            ))}
          </div>
          {/* 
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Launch cadence",
                value: "Every 2 weeks",
                detail: "Product sprints with QA + polish",
              },
              {
                title: "Average rating",
                value: "4.9★",
                detail: "Across the last 6 mobile drops",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <p className="text-xs tracking-[0.35em] text-white/60 uppercase">
                  {card.title}
                </p>
                <p className="text-3xl font-semibold text-white">
                  {card.value}
                </p>
                <p className="text-sm text-white/70">{card.detail}</p>
              </div>
            ))}
          </div> */}
        </div>

        <div className="relative flex min-h-[320px] items-center justify-center sm:min-h-[360px]">
          <div className="absolute inset-0 -z-10 rounded-[40px] border border-white/5 bg-white/5 blur-3xl" />

          {/* Single phone on mobile, stacked on larger screens */}
          <div className="relative sm:hidden">
            <PhoneMockup
              variant="dark"
              className="drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Stacked phones on sm+ */}
          <div className="hidden items-center justify-center gap-6 sm:flex">
            <PhoneMockup
              variant="dark"
              className="z-20 translate-y-20 -rotate-6 drop-shadow-[0_45px_90px_rgba(0,0,0,0.6)]"
            />
            <PhoneMockup
              variant="light"
              className="z-10 -translate-y-20 rotate-6 drop-shadow-[0_45px_90px_rgba(0,0,0,0.45)]"
            />
          </div>

          {/* <div className="absolute -top-6 right-4 rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-xs tracking-[0.3em] text-white uppercase backdrop-blur">
            Sprint ready
          </div>
          <div className="absolute bottom-4 left-3 rounded-2xl border border-white/20 bg-black/50 px-4 py-3 text-sm text-white backdrop-blur">
            Native + RN handoff
          </div> */}
        </div>
      </div>
    </section>
  );
}
