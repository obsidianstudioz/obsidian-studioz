import React from "react";
import { PhoneMockup } from "./i-phone-mockup";
import type { PhoneMockupProps } from "./i-phone-mockup";

type LightMockupProps = Omit<PhoneMockupProps, "variant">;

export function IPhoneMockupLight(props: LightMockupProps) {
  return <PhoneMockup variant="light" {...props} />;
}
