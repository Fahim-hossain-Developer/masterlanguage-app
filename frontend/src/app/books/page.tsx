"use client";

import { useState } from "react";
import Link from "next/link";
import { Library, BookOpen, ArrowRight } from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import { BOOKS_DB } from "@/lib/question-bank";

export default function BooksLibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Grammar", "IELTS Strategy", "Vocabulary", "Reading"];

  const filteredBooks = BOOKS_DB.filter(
    (b) => selectedCategory === "All" || b.category === selectedCategory
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <Library className="h-3.5 w-3.5" />
            Digital English Book Library
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            English & IELTS Study Books
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Read authorized original handbooks directly in your browser with page navigation, zoom, search, and fullscreen support.
          </p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
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
                  <div className="text-[11px] text-blue-200">{book.author}</div>
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
          ))}
        </div>
      </main>

      <MainFooter />
    </div>
  );
}
