"use client";

import dynamic from "next/dynamic";
import { useScrollProgress, useDeviceProfile } from "@/components/hooks";
import { PageContent } from "@/components/ui/home";
import { PageGradientOverlay } from "@/components/layout";

const GlassRock = dynamic(() => import("@/components/three-d/glass-rock"), {
  ssr: false,
  loading: () => null,
});

export default function HomePage() {
  const { scrollProgress, mounted } = useScrollProgress();
  const { isMobile } = useDeviceProfile();

  // Only show 3D crystal on desktop - too heavy for phones
  const show3D = mounted && !isMobile;

  return (
    <main className="relative min-h-[500vh] bg-zinc-950">
      {show3D && <GlassRock scrollProgress={scrollProgress} />}
      <PageContent isMobile={isMobile} />
      <PageGradientOverlay />
    </main>
  );
}
