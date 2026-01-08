import React from "react";
import {
  AppShowcase,
  OtherServicesShowcase,
  ThreeDShowcase,
  WebShowcase,
} from "./page-sections";

export function ServicesPageContent() {
  return (
    <div className="mx-auto my-32 flex w-full max-w-7xl flex-col gap-5 px-4 sm:px-6 md:gap-20">
      <WebShowcase />
      <AppShowcase />
      <ThreeDShowcase />
      <OtherServicesShowcase />
    </div>
  );
}
