import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Obsidian Studioz",
  description:
    "Explore our comprehensive digital services including web development, app development, UI/UX design, video editing, logo design, and social media management.",
  keywords: [
    "services",
    "web development",
    "app development",
    "UI/UX design",
    "video editing",
    "logo design",
    "social media management",
    "branding",
    "digital services",
  ],
  alternates: {
    canonical: "https://obsidianstudioz.vercel.app/services",
  },
  openGraph: {
    title: "Our Services | Obsidian Studioz",
    description: "Premium digital services crafted with precision and artistry",
    url: "https://obsidianstudioz.vercel.app/services",
    type: "website",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
