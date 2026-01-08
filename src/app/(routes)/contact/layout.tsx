import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Obsidian Studioz",
  description:
    "Get in touch with Obsidian Studioz. Reach out via email, phone, WhatsApp, or social media. We're ready to discuss your next project.",
  keywords: [
    "contact",
    "email",
    "phone",
    "WhatsApp",
    "social media",
    "inquiry",
  ],
  alternates: {
    canonical: "https://obsidianstudioz.vercel.app/contact",
  },
  openGraph: {
    title: "Contact Us | Obsidian Studioz",
    description: "Let's create something extraordinary together",
    url: "https://obsidianstudioz.vercel.app/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
