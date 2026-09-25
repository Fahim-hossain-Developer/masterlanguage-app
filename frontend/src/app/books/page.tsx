"use client";

import { useState } from "react";
import Link from "next/link";
import { Library, BookOpen, ArrowRight, Upload, FileText } from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import { useCMSContent } from "@/lib/cms-store";

export default function BooksLibraryPage() {
  const { data } = useCMSContent();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Grammar", "IELTS Strategy", "Vocabulary", "Reading"];

  const filteredBooks = data.books.filter(
    (b) => selectedCategory === "All" || b.category === selectedCategory
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              <Library className="h-3.5 w-3.5" />
              Digital English Book Library
            </span>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
              English & IELTS Study Books
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Read uploaded PDF books or digital handbooks directly in your browser with page navigation, zoom, search, and fullscreen support.
            </p>
          </div>

          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 px-4 py-2.5 text-xs font-bold text-emerald-700"
          >
            <Upload className="h-4 w-4" />
            <span>Upload / Manage Books (Admin)</span>
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-bold cursor-pointer ${
                selectedCategory === cat
                  ? "bg-blue-700 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-sm font-bold text-slate-700">
              No books found in this category.
            </p>
            <Link
              href="/admin"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-bold text-white"
            >
              <Upload className="h-3.5 w-3.5" /> Upload Your First Book in Admin Panel
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredBooks.map((book) => {
              const hasUploadedPdf = Boolean(
                book.pdfUrl &&
                  (book.pdfUrl.startsWith("/uploads/") ||
                    book.pdfUrl.startsWith("/api/files/") ||
                    book.pdfUrl.startsWith("http"))
              );
              return (
                <div
                  key={book.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs"
                >
                  <div>
                    {/* Clean Book Cover Graphic */}
                    <div className="mb-4 flex h-36 flex-col justify-between rounded-xl bg-gradient-to-br from-blue-800 to-slate-900 p-4 text-white">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-blue-200">
                        <span>{book.category}</span>
                        <span>{book.level}</span>
                      </div>
                      <div className="text-sm font-extrabold leading-snug">
                        {book.title}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-blue-200">
                        <span>{book.author}</span>
                        {hasUploadedPdf && (
                          <span className="inline-flex items-center gap-1 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-200">
                            <FileText className="h-3 w-3" /> PDF
                          </span>
                        )}
                      </div>
                    </div>

                    <h2 className="text-base font-extrabold text-slate-900">
                      {book.title}
                    </h2>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                      {book.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-slate-400">
                      Source: {book.source}
                    </span>
                    <Link
                      href={`/books/${book.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 px-4 py-2 text-xs font-bold text-white"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Read Book</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <MainFooter />
    </div>
  );
}
