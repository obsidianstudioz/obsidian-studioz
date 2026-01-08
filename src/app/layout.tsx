import { Footer, Navbar, SmoothScroll } from "@/components/layout";
import "@/styles/globals.css";
import "lenis/dist/lenis.css";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Playfair_Display } from "next/font/google";
import type { Metadata, Viewport } from "next";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const titleFont = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-viaoda-libre",
});

export const metadata: Metadata = {
  title: "Obsidian Studioz | Web Design & Digital Studio",
  description:
    "Obsidian Studioz is a premier digital design studio crafting extraordinary web experiences, apps, and digital masterpieces with precision and artistry.",
  keywords: [
    "web design",
    "digital studio",
    "UI/UX design",
    "web development",
    "app development",
    "logo design",
    "branding",
    "digital agency",
  ],
  authors: [
    {
      name: "Obsidian Studioz",
      url: "https://obsidianstudioz.vercel.app",
    },
  ],
  creator: "Obsidian Studioz",
  publisher: "Obsidian Studioz",
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  metadataBase: new URL("https://obsidianstudioz.vercel.app"),
  alternates: {
    canonical: "https://obsidianstudioz.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://obsidianstudioz.vercel.app",
    siteName: "Obsidian Studioz",
    title: "Obsidian Studioz | Web Design & Digital Studio",
    description:
      "Crafting digital masterpieces that transcend the ordinary. Where innovation meets artistry.",
    images: [
      {
        url: "https://obsidianstudioz.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Obsidian Studioz - Digital Design Studio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Obsidian Studioz | Web Design & Digital Studio",
    description: "Crafting digital masterpieces that transcend the ordinary",
    images: ["https://obsidianstudioz.vercel.app/og-image.png"],
    creator: "@obsidianstudioz",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
      sizes: "any",
    },
    {
      rel: "icon",
      url: "/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "mask-icon",
      url: "/favicon.svg",
      color: "#09090b",
    },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Obsidian Studioz",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${titleFont.variable}`}>
      <head>
        {/* PWA and mobile web app support */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Obsidian Studioz" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#09090b" />

        {/* Chrome web app support */}
        <meta name="application-name" content="Obsidian Studioz" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#09090b" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />

        {/* Preconnect to external services for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch for analytics and external services */}
        <link
          rel="dns-prefetch"
          href="https://vitals.web-dot-dev.appspot.com"
        />
      </head>
      <Analytics />
      <SmoothScroll />
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
