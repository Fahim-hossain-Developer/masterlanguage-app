"use client";

import { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Bookmark, ArrowRight, Layers } from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import { useCMSContent } from "@/lib/cms-store";
import { toggleBookmarkItem, isItemBookmarked } from "@/lib/test-engine";

export default function TipArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data } = useCMSContent();
  const article = data.tips.find((t) => t.slug === slug) || data.tips[0];
  const [saved, setSaved] = useState(() =>
    article ? isItemBookmarked(article.id) : false
  );

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <MainNavbar />
        <main className="flex-1 mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-sm font-bold text-slate-700">Tip article not found.</p>
          <Link
            href="/tips"
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white"
          >
            Back to Tips
          </Link>
        </main>
        <MainFooter />
      </div>
    );
  }

  const handleBookmark = () => {
    const next = toggleBookmarkItem({
      id: article.id,
      type: "Tip",
      title: article.title,
      subtitle: `${article.category} · ${article.readTime}`,
      href: `/tips/${article.slug}`,
    });
    setSaved(next);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />

      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/tips"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to IELTS Tips & Tricks
        </Link>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                {article.category}
              </span>
              <span className="text-xs text-slate-400">{article.readTime}</span>
            </div>

            <button
              type="button"
              onClick={handleBookmark}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold cursor-pointer ${
                saved
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>{saved ? "Saved" : "Bookmark Tip"}</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {article.title}
          </h1>
          <p className="mt-3 text-sm font-medium text-slate-600 border-b border-slate-100 pb-6">
            {article.summary}
          </p>

          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-800">
            {article.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Related Practice CTA */}
          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50/70 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-blue-700">
                <Layers className="h-3.5 w-3.5" /> Apply What You Just Learned
              </span>
              <h3 className="mt-1 text-sm font-extrabold text-slate-900">
                {article.relatedPracticeLabel}
              </h3>
            </div>
            <Link
              href={article.relatedPracticeUrl}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 px-5 py-2.5 text-xs font-bold text-white shrink-0"
            >
              <span>Practice Now</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </article>
      </main>

      <MainFooter />
    </div>
  );
}
