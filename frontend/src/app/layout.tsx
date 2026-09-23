import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toast";
import { ReactQueryProvider } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MasterEnglish — AI-Powered English Learning & IELTS Preparation",
    template: "%s | MasterEnglish",
  },
  description:
    "Master English from beginner (CEFR A1) to advanced (C1) and ace the IELTS exam with AI-powered personalized coaching, instant essay grading, and speaking interview simulation.",
  keywords: [
    "IELTS preparation",
    "English grammar",
    "CEFR learning",
    "AI speaking practice",
    "IELTS writing evaluation",
    "English vocabulary SRS",
  ],
  authors: [{ name: "MasterEnglish Team" }],
  creator: "MasterEnglish",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    title: "MasterEnglish — AI-Powered English Learning & IELTS Preparation",
    description:
      "Master English from beginner to advanced and ace your IELTS exam.",
    siteName: "MasterEnglish",
  },
  twitter: {
    card: "summary_large_image",
    title: "MasterEnglish — AI-Powered English Learning & IELTS Preparation",
    description:
      "Master English from beginner to advanced and ace your IELTS exam.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={inter.variable}
      suppressHydrationWarning
    >
      <body className="font-sans bg-gray-50 text-gray-900 antialiased dark:bg-gray-950 dark:text-white min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <ReactQueryProvider>
            {children}
            <Toaster />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
