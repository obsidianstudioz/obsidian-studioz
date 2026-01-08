import { useEffect, useState } from "react";

interface DeviceProfile {
  isMobile: boolean;
  isLowPower: boolean;
  prefersReducedMotion: boolean;
}

const DEFAULT_PROFILE: DeviceProfile = {
  isMobile: false,
  isLowPower: false,
  prefersReducedMotion: false,
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function useDeviceProfile(breakpoint = 768) {
  const [profile, setProfile] = useState<DeviceProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mobileQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    const computeProfile = () => {
      const isMobile = mobileQuery.matches;
      const prefersReducedMotion = reducedMotionQuery.matches;

      const hardwareConcurrency =
        typeof navigator !== "undefined" && navigator.hardwareConcurrency
          ? navigator.hardwareConcurrency
          : undefined;
      const navWithMemory = navigator as Navigator & { deviceMemory?: number };
      const deviceMemory = navWithMemory?.deviceMemory;

      const lowCores =
        typeof hardwareConcurrency === "number" && hardwareConcurrency <= 4;
      const lowMemory = typeof deviceMemory === "number" && deviceMemory <= 4;

      const isLowPower =
        isMobile || prefersReducedMotion || lowCores || lowMemory;

      setProfile({ isMobile, prefersReducedMotion, isLowPower });
    };

    computeProfile();

    const handleResize = () => computeProfile();
    window.addEventListener("resize", handleResize);

    const addChangeListener = (query: MediaQueryList) => {
      if (typeof query.addEventListener === "function") {
        query.addEventListener("change", computeProfile);
        return () => query.removeEventListener("change", computeProfile);
      }
      if (typeof query.addListener === "function") {
        query.addListener(computeProfile);
        return () => query.removeListener(computeProfile);
      }
      return () => undefined;
    };

    const cleanupMobile = addChangeListener(mobileQuery);
    const cleanupReduced = addChangeListener(reducedMotionQuery);

    return () => {
      window.removeEventListener("resize", handleResize);
      cleanupMobile();
      cleanupReduced();
    };
  }, [breakpoint]);

  return profile;
}
