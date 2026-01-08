import { Footer, Navbar, SmoothScroll } from "@/components/layout";
import "@/styles/globals.css";
import "lenis/dist/lenis.css";
import { Analytics } from "@vercel/analytics/next"
import { Geist, Playfair_Display } from "next/font/google";

// export const metadata: Metadata = {
//   title: "Obsidian Studioz",
//   description: "",
//   icons: [{ rel: "icon", url: "/favicon.ico" }],
// };

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const titleFont = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-viaoda-libre",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${titleFont.variable}`}>
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
