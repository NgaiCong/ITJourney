import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "The Re-Engineer Path | 12-Month IT Transformation Journey",
  description: "An interactive 12-month roadmap to rebuild your IT foundation from scratch. From C++ fundamentals to full-stack engineering. No shortcuts. No AI cheating. Just pure engineering mastery.",
  keywords: ["IT roadmap", "programming learning path", "C++ tutorial", "DSA", "software engineering", "career development", "coding bootcamp"],
  authors: [{ name: "Tworice Studio" }],
  creator: "Tworice Studio",
  publisher: "Tworice Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://re-engineer-path.vercel.app",
    siteName: "The Re-Engineer Path",
    title: "The Re-Engineer Path | 12-Month IT Transformation Journey",
    description: "An interactive 12-month roadmap to rebuild your IT foundation from scratch. From Knowledge Debt to Engineering Mastery.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Re-Engineer Path - Interactive Learning Roadmap",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Re-Engineer Path | 12-Month IT Transformation",
    description: "An interactive 12-month roadmap to rebuild your IT foundation from scratch.",
    images: ["/og-image.png"],
    creator: "@tworicestudio",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://re-engineer-path.vercel.app",
  },
};

import Navigation from "@/components/common/Navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white`}
      >
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg"
        >
          Skip to main content
        </a>
        
        <Navigation />
        {children}
      </body>
    </html>
  );
}
