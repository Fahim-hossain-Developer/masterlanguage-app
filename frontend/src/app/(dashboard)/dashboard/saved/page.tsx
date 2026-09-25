"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bookmark, Trash2, ArrowRight } from "lucide-react";
import {
  getSavedBookmarks,
  toggleBookmarkItem,
  type SavedBookmarkItem,
} from "@/lib/test-engine";

export default function SavedBookmarksPage() {
  const [items, setItems] = useState<SavedBookmarkItem[]>([]);

  useEffect(() => {
    setItems(getSavedBookmarks());
  }, []);

  const handleRemove = (item: SavedBookmarkItem) => {
    toggleBookmarkItem(item);
    setItems(getSavedBookmarks());
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
          <Bookmark className="h-3.5 w-3.5" />
          Saved Items
        </span>
        <h1 className="mt-1.5 text-2xl font-extrabold text-slate-900">
          Bookmarked Questions, Lessons, Books & Tips
        </h1>
        <p className="text-xs text-slate-600 mt-0.5">
          Quickly revisit items you saved during tests or study sessions.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-sm font-semibold text-slate-700">
            You haven&apos;t bookmarked any items yet.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Click the &ldquo;Save&rdquo; button on any question, lesson, book, or tip to keep it here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                    {item.type}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {item.subtitle}
                  </span>
                </div>
                <Link
                  href={item.href}
                  className="text-sm font-bold text-slate-900 hover:text-blue-700"
                >
                  {item.title}
                </Link>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 rounded-xl bg-slate-100 hover:bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700"
                >
                  <span>Open</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleRemove(item)}
                  aria-label="Remove Bookmark"
                  className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:text-rose-600 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
