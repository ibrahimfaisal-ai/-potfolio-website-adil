import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const corpta = localFont({
  src: "../public/fonts/Corpta DEMO.otf",
  variable: "--font-corpta",
  display: "swap",
});

const title = "Muhammad Adil | AI Commercials Expert · Seedance Video Ads";
const description =
  "Most AI ads look fake. Mine don't. Scroll-stopping UGC-style video ads and AI commercials made with Seedance for e-commerce brands on Meta, TikTok and Instagram, backed by a Master's in Psychology.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "AI commercials expert",
    "Seedance video ads",
    "AI commercials",
    "UGC video ads",
    "e-commerce video ads",
    "TikTok ads",
    "Meta ads",
    "Instagram ads",
    "Muhammad Adil",
  ],
  authors: [{ name: "Muhammad Adil" }],
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/work/ugc/knitwear-try-on.jpg", width: 1280, height: 720 }],
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${corpta.variable} antialiased`}
    >
      <body className="font-sans transition-colors relative">
        {children}
      </body>
    </html>
  );
}
