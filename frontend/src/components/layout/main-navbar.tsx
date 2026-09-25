"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronDown,
  Search,
  Menu,
  X,
  LayoutDashboard,
  GraduationCap,
  FileCheck2,
  Bookmark,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const IELTS_LINKS = [
  { label: "Full Mock Test", href: "/ielts/full-mock", desc: "Complete 4-module exam simulation" },
  { label: "Reading", href: "/ielts/reading", desc: "Passages, timed & untimed practice" },
  { label: "Listening", href: "/ielts/listening", desc: "Audio sections & form completion" },
  { label: "Writing", href: "/ielts/writing", desc: "Task 1 & Task 2 prompts & drafts" },
  { label: "Speaking", href: "/ielts/speaking", desc: "Part 1, 2 & 3 timers & audio recorder" },
  { label: "Question Types", href: "/ielts/question-types", desc: "Filter by type, difficulty & topic" },
];

const ENGLISH_LEVEL_LINKS = [
  { label: "Basic", href: "/english/basic", badge: "Level 1" },
  { label: "Elementary", href: "/english/elementary", badge: "Level 2" },
  { label: "Intermediate", href: "/english/intermediate", badge: "Level 3" },
  { label: "Upper Intermediate", href: "/english/upper-intermediate", badge: "Level 4" },
  { label: "Advanced", href: "/english/advanced", badge: "Level 5" },
];

export function MainNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ieltsOpen, setIeltsOpen] = useState(false);
  const [englishOpen, setEnglishOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700 text-white shadow-xs">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-slate-900 leading-none">
                Master<span className="text-blue-700">English</span>
              </span>
              <span className="text-[10px] font-medium text-slate-500 mt-0.5">
                English & IELTS Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                pathname === "/"
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              )}
            >
              Home
            </Link>

            {/* IELTS Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIeltsOpen(true)}
              onMouseLeave={() => setIeltsOpen(false)}
            >
              <Link
                href="/ielts"
                className={cn(
                  "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                  pathname.startsWith("/ielts")
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-700 hover:bg-slate-100"
                )}
              >
                <span>IELTS</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </Link>

              {ieltsOpen && (
                <div className="absolute left-0 top-full w-72 pt-1.5">
                  <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                    {IELTS_LINKS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-xl px-3.5 py-2.5 hover:bg-blue-50/70 transition-colors"
                      >
                        <div className="text-sm font-bold text-slate-900">
                          {item.label}
                        </div>
                        <div className="text-xs text-slate-500">{item.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* English Learning Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setEnglishOpen(true)}
              onMouseLeave={() => setEnglishOpen(false)}
            >
              <Link
                href="/english"
                className={cn(
                  "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                  pathname.startsWith("/english")
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-700 hover:bg-slate-100"
                )}
              >
                <span>English Learning</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </Link>

              {englishOpen && (
                <div className="absolute left-0 top-full w-64 pt-1.5">
                  <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                    {ENGLISH_LEVEL_LINKS.map((lvl) => (
                      <Link
                        key={lvl.href}
                        href={lvl.href}
                        className="flex items-center justify-between rounded-xl px-3.5 py-2.5 hover:bg-blue-50/70 transition-colors"
                      >
                        <span className="text-sm font-bold text-slate-900">
                          {lvl.label}
                        </span>
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                          {lvl.badge}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/books"
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                pathname.startsWith("/books")
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              )}
            >
              English Books
            </Link>

            <Link
              href="/tips"
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                pathname.startsWith("/tips")
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              )}
            >
              IELTS Tips & Tricks
            </Link>

            <Link
              href="/daily-practice"
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                pathname.startsWith("/daily-practice")
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              )}
            >
              Daily Practice
            </Link>
          </nav>
        </div>

        {/* Right Actions: Search, Results, Student Dashboard, Login */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-blue-300 hover:text-blue-700 transition-colors"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search</span>
          </Link>

          <Link
            href="/dashboard/results"
            className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <FileCheck2 className="h-3.5 w-3.5 text-blue-700" />
            <span>Results</span>
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-colors"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span>Student Dashboard</span>
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <User className="h-3.5 w-3.5" />
            <span>Account</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/search"
            aria-label="Search"
            className="rounded-lg border border-slate-200 p-2 text-slate-600"
          >
            <Search className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            className="rounded-lg border border-slate-200 p-2 text-slate-700"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-700 py-2.5 text-xs font-bold text-white"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              Student Dashboard
            </Link>
            <Link
              href="/dashboard/results"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-700"
            >
              <FileCheck2 className="h-3.5 w-3.5 text-blue-700" />
              My Results
            </Link>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              IELTS Preparation
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {IELTS_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              English Learning Levels
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {ENGLISH_LEVEL_LINKS.map((lvl) => (
                <Link
                  key={lvl.href}
                  href={lvl.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-800"
                >
                  {lvl.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            <Link
              href="/books"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700"
            >
              English Books
            </Link>
            <Link
              href="/tips"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700"
            >
              IELTS Tips
            </Link>
            <Link
              href="/daily-practice"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700"
            >
              Daily Practice
            </Link>
            <Link
              href="/dashboard/saved"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 flex items-center gap-1"
            >
              <Bookmark className="h-3 w-3" /> Saved
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
