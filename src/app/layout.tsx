import type { Metadata } from "next";
import { Suspense } from "react";
import { Fraunces, DM_Sans, Space_Mono } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import ChatWidgetLazy from "@/components/chat/ChatWidgetLazy";
import QuizPrompt from "@/components/QuizPrompt";
import TealCursor from "@/components/TealCursor";
import PageLoadingIndicator from "@/components/PageLoadingIndicator";
import JsonLd from "@/components/JsonLd";
import ErrorLogger from "@/components/ErrorLogger";
import "@/styles/globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
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
      className={`dark ${fraunces.variable} ${dmSans.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("hone-theme");if(t==="light"){document.documentElement.classList.remove("dark")}else if(!t&&window.matchMedia("(prefers-color-scheme:light)").matches){document.documentElement.classList.remove("dark")}}catch(e){}})()`,
          }}
        />
        
        <JsonLd />
      </head>
      <body>
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
