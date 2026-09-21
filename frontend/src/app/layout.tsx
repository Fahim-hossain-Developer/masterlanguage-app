import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toast";
import { ReactQueryProvider } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "MasterLanguage — AI-Powered IELTS & Japanese Learning",
    template: "%s | MasterLanguage",
  },
  description:
    "Master IELTS and Japanese with AI-powered personalized learning. Practice speaking, writing, reading, and listening with instant AI feedback.",
  keywords: [
    "IELTS preparation",
    "Japanese learning",
    "JLPT",
    "AI language learning",
    "English test prep",
  ],
  authors: [{ name: "MasterLanguage Team" }],
  creator: "MasterLanguage",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    title: "MasterLanguage — AI-Powered IELTS & Japanese Learning",
    description:
      "Master IELTS and Japanese with AI-powered personalized learning.",
    siteName: "MasterLanguage",
  },
  twitter: {
    card: "summary_large_image",
    title: "MasterLanguage — AI-Powered IELTS & Japanese Learning",
    description:
      "Master IELTS and Japanese with AI-powered personalized learning.",
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
      className={`${inter.variable} ${notoSansJP.variable}`}
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
