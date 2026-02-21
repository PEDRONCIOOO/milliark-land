import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import "@/styles/globals.css";
import Seo from "@/components/Seo";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Milliark Investments - The Future of Financial Growth",
  description: "Discover the investment strategies of Christiano Trotta. Milliark is among the world's top investment firms, offering premium financial solutions.",
  keywords: ["Investments", "Finance", "Wealth Management", "Milliark", "Christiano Trotta"],
  authors: [{ name: "Pedro Trotta", url: "github.com/PEDRONCIOOO" }],
  applicationName: "Milliark Investments",
  robots: "index, follow",
  alternates: {
    canonical: "https://milliark.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://milliark.com",
    title: "Milliark Investments - Elevate Your Financial Future",
    description: "Explore the financial expertise of Christiano Trotta.",
    siteName: "Milliark Investments",
    images: [{ url: "https://milliark.com/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@milliark",
    creator: "@christianotrotta",
    title: "Milliark Investments - Your Trusted Financial Partner",
    description: "Join Christiano Trotta and Milliark in shaping the future of investments.",
    images: ["https://milliark.com/twitter-card.jpg"],
  },
};

// Anti-FOUC: reads stored theme before React hydrates
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={twMerge(inter.className, "bg-skin-bg text-skin-base antialiased transition-colors duration-300")}
      >
        <ThemeProvider>
          <Seo />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
