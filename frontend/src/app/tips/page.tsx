"use client";

import { useState } from "react";
import Link from "next/link";
import { Lightbulb, ArrowRight, Plus } from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import { useCMSContent } from "@/lib/cms-store";

const TIP_CATEGORIES = [
  "All",
  "Reading",
  "Listening",
  "Writing",
  "Speaking",
  "Vocabulary",
  "Grammar",
  "Time Management",
  "Exam Strategy",
  "Common Mistakes",
];

export default function TipsAndTricksPage() {
  const { data } = useCMSContent();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = data.tips.filter(
    (t) => selectedCategory === "All" || t.category === selectedCategory
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              <Lightbulb className="h-3.5 w-3.5" />
              IELTS Tips & Tricks
            </span>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
              Practical IELTS Exam Strategies & Guides
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Actionable guides connected directly to question-type practice sets.
            </p>
          </div>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 px-4 py-2.5 text-xs font-bold text-emerald-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add / Manage Tips (Admin)</span>
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TIP_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold cursor-pointer ${
                selectedCategory === cat
                  ? "bg-blue-700 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-sm font-bold text-slate-700">
              No tips found in this category.
            </p>
            <Link
              href="/admin"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-bold text-white"
            >
              <Plus className="h-3.5 w-3.5" /> Add Tip Article in Admin Panel
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((tip) => (
              <Link
                key={tip.id}
                href={`/tips/${tip.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs hover:border-blue-500 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-md bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                      {tip.category}
                    </span>
                    <span className="text-xs text-slate-400">{tip.readTime}</span>
                  </div>
                  <h2 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-700">
                    {tip.title}
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {tip.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
                  <span>Read Article & Practice</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <MainFooter />
    </div>
  );
}
