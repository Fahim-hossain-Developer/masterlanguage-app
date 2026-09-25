"use client";

import { useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Search,
} from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import { BOOKS_DB } from "@/lib/question-bank";
import { toggleBookmarkItem, isItemBookmarked } from "@/lib/test-engine";

export default function BookReaderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const book = BOOKS_DB.find((b) => b.slug === slug) || BOOKS_DB[0];

  const [currentPage, setCurrentPage] = useState(1);
  const [zoomPct, setZoomPct] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [saved, setSaved] = useState(() => isItemBookmarked(book.id));

  const currentChapter =
    book.chapters[currentPage - 1] || book.chapters[0];

  const handleBookmark = () => {
    const next = toggleBookmarkItem({
      id: book.id,
      type: "Book",
      title: book.title,
      subtitle: `${book.category} · ${book.level}`,
      href: `/books/${book.slug}`,
    });
    setSaved(next);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {!isFullscreen && <MainNavbar />}

      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {!isFullscreen && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <Link
                href="/books"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Book Library
              </Link>
              <h1 className="mt-1.5 text-2xl font-extrabold text-slate-900">
                {book.title}
              </h1>
              <p className="text-xs text-slate-500">
                {book.category} · Level: {book.level} · Source: {book.source}
              </p>
            </div>

            <button
              type="button"
              onClick={handleBookmark}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold cursor-pointer ${
                saved
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>{saved ? "Bookmarked" : "Save Book"}</span>
            </button>
          </div>
        )}

        {/* Built-in Responsive PDF / Document Viewer Wrapper */}
        <div
          className={`rounded-3xl border border-slate-300 bg-white shadow-sm overflow-hidden ${
            isFullscreen ? "fixed inset-3 z-50 flex flex-col" : ""
          }`}
        >
          {/* Reader Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-900 px-4 py-3 text-white">
            {/* Page Navigation */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="rounded-lg bg-slate-800 p-1.5 hover:bg-slate-700 disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs font-bold">
                Page {currentPage} of {book.chapters.length}
              </span>
              <button
                type="button"
                disabled={currentPage >= book.chapters.length}
                onClick={() =>
                  setCurrentPage((p) => Math.min(book.chapters.length, p + 1))
                }
                className="rounded-lg bg-slate-800 p-1.5 hover:bg-slate-700 disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* In-Book Search */}
            <div className="relative w-48 sm:w-64">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search in page..."
                className="w-full rounded-lg bg-slate-800 pl-8 pr-3 py-1 text-xs text-white placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            {/* Zoom & Fullscreen */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomPct((z) => Math.max(80, z - 10))}
                aria-label="Zoom Out"
                className="rounded-lg bg-slate-800 p-1.5 hover:bg-slate-700 cursor-pointer"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="text-xs font-mono font-bold w-11 text-center">
                {zoomPct}%
              </span>
              <button
                type="button"
                onClick={() => setZoomPct((z) => Math.min(140, z + 10))}
                aria-label="Zoom In"
                className="rounded-lg bg-slate-800 p-1.5 hover:bg-slate-700 cursor-pointer"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                aria-label="Toggle Fullscreen"
                className="ml-1 rounded-lg bg-blue-700 px-2.5 py-1.5 text-xs font-bold hover:bg-blue-600 cursor-pointer flex items-center gap-1"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span>{isFullscreen ? "Exit" : "Fullscreen"}</span>
              </button>
            </div>
          </div>

          {/* Document Canvas */}
          <div className="flex-1 overflow-y-auto bg-slate-100 p-4 sm:p-10">
            <div
              className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-12 shadow-xs transition-all"
              style={{ fontSize: `${zoomPct}%` }}
            >
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-slate-100 pb-3 mb-6">
                <span>{book.title}</span>
                <span>Page {currentChapter.page}</span>
              </div>

              <h2 className="text-xl font-extrabold text-slate-900 mb-4">
                {currentChapter.title}
              </h2>

              <div className="space-y-4 leading-8 text-slate-800">
                {currentChapter.content.map((para, idx) => {
                  const matchesSearch =
                    searchTerm.trim() &&
                    para.toLowerCase().includes(searchTerm.toLowerCase());
                  return (
                    <p
                      key={idx}
                      className={`rounded-lg p-2 ${
                        matchesSearch ? "bg-amber-100 font-semibold" : ""
                      }`}
                    >
                      {para}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      {!isFullscreen && <MainFooter />}
    </div>
  );
}
