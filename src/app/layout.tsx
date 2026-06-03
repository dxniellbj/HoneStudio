import type { Metadata } from "next";
import { Suspense } from "react";
import { Space_Grotesk, DM_Mono, Press_Start_2P } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ChatWidgetLazy from "@/components/chat/ChatWidgetLazy";
import QuizPrompt from "@/components/QuizPrompt";
import TealCursor from "@/components/TealCursor";
import PageLoadingIndicator from "@/components/PageLoadingIndicator";
import JsonLd from "@/components/JsonLd";
import ErrorLogger from "@/components/ErrorLogger";
import "@/styles/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "700"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400", "500"],
  display: "swap",
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  variable: "--font-press-start",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hone Studio: Custom Software & AI Tools, Built Solo",
    template: "%s | Hone Studio",
  },
  description:
    "Custom software and AI tools for founders and small teams without a developer to spare. Built by Niell Alfajora, a developer who thinks like an operator.",
  keywords: [
    "custom software development",
    "AI tools",
    "internal tools",
    "Next.js developer",
    "Firebase developer",
    "web development",
    "automation",
    "Kajabi",
    "Shopify",
    "small business",
    "startup",
    "freelance developer",
  ],
  authors: [{ name: "Niell Alfajora", url: "https://honestudio.cv/about" }],
  creator: "Niell Alfajora",
  publisher: "Hone Studio",
  metadataBase: new URL("https://honestudio.cv"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://honestudio.cv",
    siteName: "Hone Studio",
    title: "Hone Studio: Custom Software & AI Tools, Built Solo",
    description:
      "Custom software and AI tools for founders and small teams. Built by one developer who works out what your business needs first.",

  },
  twitter: {
    card: "summary_large_image",
    title: "Hone Studio: Custom Software & AI Tools, Built Solo",
    description:
      "Custom software and AI tools for founders and small teams. Built by one developer who works out what your business needs first.",
    creator: "@honestudio",
  },
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
  verification: {},
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmMono.variable} ${pressStart.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
      </head>
      <body>
        <Suspense fallback={null}>
          <PageLoadingIndicator />
        </Suspense>
        <NavBar />
        <main>{children}</main>
        <Footer />
        <ChatWidgetLazy />
        <QuizPrompt />
        <TealCursor />
        <ErrorLogger />
      </body>
    </html>
  );
}
