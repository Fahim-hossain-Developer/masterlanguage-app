import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
        <ReactQueryProvider>
          {children}
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
