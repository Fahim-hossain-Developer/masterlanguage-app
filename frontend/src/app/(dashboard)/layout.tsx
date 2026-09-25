"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "./layout-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";
import { X, ArrowRight, FileEdit } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [notesOpen, setNotesOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  return (
    <div className="min-h-screen bg-[#f8f9fb] dark:bg-gray-950">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((v) => !v)}
        />
      </div>

      {/* Main content area */}
      <div
        className={cn(
          "min-h-screen flex flex-col transition-all duration-200",
          "md:pl-[225px]",
          sidebarCollapsed && "md:pl-[68px]"
        )}
      >
        {/* Top BD bKash Promotional Banner */}
        {bannerVisible && (
          <div className="relative z-30 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-4 py-2 text-xs text-white shadow-sm">
            <p className="flex flex-wrap items-center justify-center gap-1.5 font-medium text-center">
              <span>🚀 বিকাশ পেমেন্টে</span>
              <span className="font-bold text-amber-300">
                ১ মাস আনলিমিটেড মক টেস্ট
              </span>
              <span>মাত্র</span>
              <span className="rounded bg-white/20 px-1.5 py-0.5 font-bold text-white">
                ৩৯৯ টাকায়
              </span>
              <span className="text-blue-100 text-[11px]">
                (অফারটি শুধুমাত্র বাংলাদেশীদের জন্য)
              </span>
            </p>
            <Link
              href="/dashboard/upgrade"
              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-blue-700 shadow-xs hover:bg-blue-50 transition shrink-0"
            >
              Upgrade <ArrowRight className="h-3 w-3" />
            </Link>
            <button
              onClick={() => setBannerVisible(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/70 hover:bg-white/10 hover:text-white transition"
              aria-label="Close banner"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 pb-20 md:pb-10">{children}</main>
      </div>

      {/* Floating Notes Drawer & Button (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40">
        {notesOpen && (
          <div className="mb-3 w-80 rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Quick Study Notes
              </span>
              <button
                onClick={() => setNotesOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Jot down vocabulary, essay ideas, or exam reminders..."
              className="h-36 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        )}
        <button
          onClick={() => setNotesOpen((v) => !v)}
          className="flex items-center gap-2 rounded-xl bg-[#1e2433] px-4 py-2.5 text-xs font-semibold text-white shadow-lg hover:bg-[#2a3246] transition"
        >
          <FileEdit className="h-3.5 w-3.5" />
          Notes
        </button>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNav />
    </div>
  );
}
