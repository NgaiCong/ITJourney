import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
});


export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "IT Journey",
  description: "IT Journey - The ultimate interactive roadmap to rebuild your IT foundation from scratch. From C++ fundamentals to full-stack engineering. No shortcuts. Just pure engineering mastery.",
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
    url: "https://it-journey.vercel.app",
    siteName: "IT Journey",
    title: "IT Journey",
    description: "IT Journey - The ultimate interactive roadmap to rebuild your IT foundation from scratch.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IT Journey - Interactive Learning Roadmap",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Journey",
    description: "IT Journey - The ultimate interactive roadmap to rebuild your IT foundation from scratch.",
    images: ["/og-image.png"],
    creator: "@tworicestudio",
  },
  icons: {
    icon: [
      { url: "/icons/icon.png", sizes: "any" },
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
import { Providers } from "@/components/providers/Providers";
import ClickSpark from "@/components/ui/ClickSpark";

import Footer from "@/components/common/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-black text-white`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg"
        >
          Skip to main content
        </a>

        <Providers>
          <ClickSpark
            sparkColor='#fff'
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
          >
            <Navigation />
            {children}
            <Footer />
          </ClickSpark>
        </Providers>
      </body>
    </html>
  );
}
