import type { Metadata } from "next";
import { Fraunces, DM_Sans, Space_Mono } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import ChatWidgetLazy from "@/components/chat/ChatWidgetLazy";
import TealCursor from "@/components/TealCursor";
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
    default: "Hone Studio",
    template: "%s | Hone Studio",
  },
  description:
    "Fractional ops & tech partner — strategy, systems, and websites with zero overhead.",
  metadataBase: new URL("https://honestudio.cv"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Hone Studio",
    title: "Hone Studio",
    description:
      "Fractional ops & tech partner — strategy, systems, and websites with zero overhead.",
  },
  twitter: {
    card: "summary_large_image",
  },
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
      </head>
      <body>
        <ThemeProvider>
          <NavBar />
          <main>{children}</main>
          <Footer />
          <ChatWidgetLazy />
          <TealCursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
