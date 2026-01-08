import React from "react";
import { useDeviceProfile } from "@/components/hooks";
import {
  HeroSection,
  CraftedPrecisionSection,
  EtherealBeautySection,
  TimelessEleganceSection,
  ServicesSection,
  CTA,
} from "./page-sections";

interface PageContentProps {
  isMobile?: boolean;
}

export function PageContent({ isMobile: isMobileProp }: PageContentProps) {
  const { isMobile: isMobileHook, prefersReducedMotion } = useDeviceProfile();
  const isMobile = isMobileProp ?? isMobileHook;
  const disableTextAnimation = isMobile || prefersReducedMotion;

  return (
    <div className="relative z-20 mx-auto px-4 md:px-0">
      <HeroSection isMobile={isMobile} />
      <CraftedPrecisionSection isMobile={isMobile} />
      <EtherealBeautySection
        disableTextAnimation={disableTextAnimation}
        isMobile={isMobile}
      />
      <TimelessEleganceSection disableTextAnimation={disableTextAnimation} />
      <div className="mx-auto max-w-7xl">
        <ServicesSection disableTextAnimation={disableTextAnimation} />
      </div>
      <CTA />
    </div>
  );
}
