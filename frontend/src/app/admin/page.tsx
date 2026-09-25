"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Library,
  Lightbulb,
  CalendarCheck,
  GraduationCap,
  HelpCircle,
  Plus,
  Trash2,
  Upload,
  CheckCircle2,
  ExternalLink,
  RotateCcw,
  Settings,
} from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";
import { useCMSContent, getDefaultCMSData } from "@/lib/cms-store";
import type {
  BookItem,
  TipArticleItem,
  DailyPracticeSetItem,
  EnglishLessonItem,
  QuestionItem,
  DifficultyLevel,
  IELTSQuestionType,
} from "@/lib/question-bank";

type AdminTab = "books" | "tips" | "daily" | "english" | "questions";

export default function AdminContentManagerPage() {
  const { data, updateStore } = useCMSContent();
  const [activeTab, setActiveTab] = useState<AdminTab>("books");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  const notify = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // ============================================================
  // 1. BOOK FORM STATE
  // ============================================================
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("Fahim Hossain");
  const [bookCategory, setBookCategory] = useState<BookItem["category"]>("Grammar");
  const [bookLevel, setBookLevel] = useState<BookItem["level"]>("Basic");
  const [bookDesc, setBookDesc] = useState("");
  const [bookPdfUrl, setBookPdfUrl] = useState("");
  const [bookChapterTitle, setBookChapterTitle] = useState("Chapter 1");
  const [bookChapterContent, setBookChapterContent] = useState("");

  const handleUploadPdfFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFile(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.url) {
        setBookPdfUrl(json.url);
        if (!bookTitle) {
          setBookTitle(file.name.replace(/\.pdf$/i, ""));
        }
        notify(`Uploaded PDF: ${file.name}`);
      }
    } catch {
      notify("Upload failed. Please try again.");
    } finally {
      setUploadingFile(false);
    }
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookTitle.trim()) return;
    const slug = `${bookTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}-${Date.now().toString().slice(-4)}`;

    const paragraphs = bookChapterContent
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);

    const newBook: BookItem = {
      id: `book-${Date.now()}`,
      slug,
      title: bookTitle.trim(),
      author: bookAuthor.trim() || "Admin",
      description: bookDesc.trim() || "Uploaded via Admin Panel.",
      category: bookCategory,
      level: bookLevel,
      pages: 1,
      source: "Original",
      pdfUrl: bookPdfUrl.trim(),
      chapters: [
        {
          page: 1,
          title: bookChapterTitle.trim() || bookTitle.trim(),
          content:
            paragraphs.length > 0
              ? paragraphs
              : [
                  bookPdfUrl
                    ? `PDF Book attached (${bookPdfUrl}). Use the PDF viewer tab above to read the full uploaded PDF.`
                    : "Book content added by Admin.",
                ],
        },
      ],
    };

    await updateStore((prev) => ({
      ...prev,
      books: [newBook, ...prev.books],
    }));

    setBookTitle("");
    setBookDesc("");
    setBookPdfUrl("");
    setBookChapterContent("");
    notify("New Book published to English Books Library!");
  };

  const handleDeleteBook = async (id: string) => {
    await updateStore((prev) => ({
      ...prev,
      books: prev.books.filter((b) => b.id !== id),
    }));
    notify("Book removed.");
  };

  // ============================================================
  // 2. TIPS & TRICKS FORM STATE
  // ============================================================
  const [tipTitle, setTipTitle] = useState("");
  const [tipCategory, setTipCategory] =
    useState<TipArticleItem["category"]>("Reading");
  const [tipReadTime, setTipReadTime] = useState("4 min read");
  const [tipSummary, setTipSummary] = useState("");
  const [tipContent, setTipContent] = useState("");
  const [tipPracticeUrl, setTipPracticeUrl] = useState("/ielts/reading");
  const [tipPracticeLabel, setTipPracticeLabel] = useState(
    "Start Related IELTS Practice"
  );

  const handleAddTip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipTitle.trim()) return;
    const slug = `${tipTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}-${Date.now().toString().slice(-4)}`;

    const paragraphs = tipContent
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);

    const newTip: TipArticleItem = {
      id: `tip-${Date.now()}`,
      slug,
      title: tipTitle.trim(),
      category: tipCategory,
      readTime: tipReadTime.trim() || "4 min read",
      summary: tipSummary.trim() || tipTitle.trim(),
      content:
        paragraphs.length > 0 ? paragraphs : [tipSummary.trim() || tipTitle.trim()],
      relatedPracticeUrl: tipPracticeUrl.trim() || "/ielts",
      relatedPracticeLabel:
        tipPracticeLabel.trim() || "Start Related Practice",
    };

    await updateStore((prev) => ({
      ...prev,
      tips: [newTip, ...prev.tips],
    }));

    setTipTitle("");
    setTipSummary("");
    setTipContent("");
    notify("New Article published to IELTS Tips & Tricks!");
  };

  const handleDeleteTip = async (id: string) => {
    await updateStore((prev) => ({
      ...prev,
      tips: prev.tips.filter((t) => t.id !== id),
    }));
    notify("Tip article removed.");
  };

  // ============================================================
  // 3. DAILY PRACTICE SETS FORM STATE
  // ============================================================
  const [dailyTitle, setDailyTitle] = useState("");
  const [dailyCategory, setDailyCategory] =
    useState<DailyPracticeSetItem["category"]>("IELTS");
  const [dailyDifficulty, setDailyDifficulty] =
    useState<DifficultyLevel>("Medium");
  const [dailyDuration, setDailyDuration] = useState(10);
  const [dailyDesc, setDailyDesc] = useState("");
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);

  const toggleSelectQuestionForDaily = (qId: string) => {
    setSelectedQuestionIds((prev) =>
      prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]
    );
  };

  const handleAddDailySet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dailyTitle.trim()) return;

    const qIds =
      selectedQuestionIds.length > 0
        ? selectedQuestionIds
        : data.questions.slice(0, 3).map((q) => q.question_id);

    const newSet: DailyPracticeSetItem = {
      id: `daily-${Date.now()}`,
      title: dailyTitle.trim(),
      category: dailyCategory,
      difficulty: dailyDifficulty,
      durationMinutes: Number(dailyDuration) || 10,
      description:
        dailyDesc.trim() ||
        `Custom ${dailyCategory} daily practice set (${qIds.length} questions).`,
      questionIds: qIds,
    };

    await updateStore((prev) => ({
      ...prev,
      dailyPractice: [newSet, ...prev.dailyPractice],
    }));

    setDailyTitle("");
    setDailyDesc("");
    setSelectedQuestionIds([]);
    notify("New Daily Practice Set published!");
  };

  const handleDeleteDailySet = async (id: string) => {
    await updateStore((prev) => ({
      ...prev,
      dailyPractice: prev.dailyPractice.filter((d) => d.id !== id),
    }));
    notify("Daily Practice Set removed.");
  };

  // ============================================================
  // 4. ENGLISH LEARNING LESSON FORM STATE
  // ============================================================
  const [lessonLevel, setLessonLevel] =
    useState<EnglishLessonItem["level"]>("basic");
  const [lessonSkill, setLessonSkill] =
    useState<EnglishLessonItem["skill"]>("Grammar");
  const [lessonTopic, setLessonTopic] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonSummary, setLessonSummary] = useState("");
  const [lessonEn, setLessonEn] = useState("");
  const [lessonBn, setLessonBn] = useState("");
  const [exampleEn, setExampleEn] = useState("");
  const [exampleBn, setExampleBn] = useState("");
  const [exampleNote, setExampleNote] = useState("");

  const LEVEL_LABELS: Record<EnglishLessonItem["level"], string> = {
    basic: "Basic",
    elementary: "Elementary",
    intermediate: "Intermediate",
    "upper-intermediate": "Upper Intermediate",
    advanced: "Advanced",
  };

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle.trim()) return;

    const slug = `${lessonTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}-${Date.now().toString().slice(-4)}`;

    const newLesson: EnglishLessonItem = {
      id: `lesson-${Date.now()}`,
      slug,
      level: lessonLevel,
      levelLabel: LEVEL_LABELS[lessonLevel],
      skill: lessonSkill,
      topic: lessonTopic.trim() || lessonSkill,
      title: lessonTitle.trim(),
      summary: lessonSummary.trim() || lessonTitle.trim(),
      explanationEn: lessonEn.trim() || "Explanation added via Admin Panel.",
      explanationBn: lessonBn.trim() || "অ্যাডমিন প্যানেল থেকে যুক্ত করা পাঠ।",
      examples: exampleEn.trim()
        ? [
            {
              en: exampleEn.trim(),
              bn: exampleBn.trim(),
              note: exampleNote.trim() || undefined,
            },
          ]
        : [],
      questionIds: ["qb-gram-001"],
    };

    await updateStore((prev) => ({
      ...prev,
      lessons: [newLesson, ...prev.lessons],
    }));

    setLessonTopic("");
    setLessonTitle("");
    setLessonSummary("");
    setLessonEn("");
    setLessonBn("");
    setExampleEn("");
    setExampleBn("");
    setExampleNote("");
    notify(`New Lesson published to English Learning (${LEVEL_LABELS[lessonLevel]})!`);
  };

  const handleDeleteLesson = async (id: string) => {
    await updateStore((prev) => ({
      ...prev,
      lessons: prev.lessons.filter((l) => l.id !== id),
    }));
    notify("Lesson removed.");
  };

  // ============================================================
  // 5. QUESTION BANK FORM STATE
  // ============================================================
  const [qCategory, setQCategory] =
    useState<QuestionItem["category"]>("Reading");
  const [qType, setQType] = useState<IELTSQuestionType>(
    "True / False / Not Given"
  );
  const [qDifficulty, setQDifficulty] = useState<DifficultyLevel>("Medium");
  const [qTopic, setQTopic] = useState("");
  const [qText, setQText] = useState("");
  const [qOptionsRaw, setQOptionsRaw] = useState(
    "A: Option 1\nB: Option 2\nC: Option 3"
  );
  const [qCorrect, setQCorrect] = useState("");
  const [qExpEn, setQExpEn] = useState("");
  const [qExpBn, setQExpBn] = useState("");

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim() || !qCorrect.trim()) return;

    const parsedOptions = qOptionsRaw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, idx) => {
        const parts = line.split(":");
        if (parts.length >= 2) {
          return {
            label: parts[0].trim(),
            text: parts.slice(1).join(":").trim(),
          };
        }
        return { label: String.fromCharCode(65 + idx), text: line };
      });

    const newQ: QuestionItem = {
      question_id: `qb-custom-${Date.now()}`,
      module:
        qCategory === "Reading"
          ? "IELTS_READING"
          : qCategory === "Listening"
          ? "IELTS_LISTENING"
          : qCategory === "Grammar"
          ? "ENGLISH_GRAMMAR"
          : "ENGLISH_VOCABULARY",
      category: qCategory,
      question_type: qType,
      difficulty: qDifficulty,
      topic: qTopic.trim() || "General Practice",
      source: "Original",
      section: "Custom Admin Set",
      question_text: qText.trim(),
      options:
        qType === "Multiple Choice" ||
        qType === "Matching Headings" ||
        qType === "Meaning Selection"
          ? parsedOptions
          : qType === "True / False / Not Given"
          ? [
              { label: "TRUE", text: "TRUE" },
              { label: "FALSE", text: "FALSE" },
              { label: "NOT GIVEN", text: "NOT GIVEN" },
            ]
          : undefined,
      correct_answer: qCorrect.trim(),
      accepted_answers: [qCorrect.trim()],
      explanation: qExpEn.trim() || "Correct answer verified.",
      explanation_bn: qExpBn.trim() || undefined,
      created_at: new Date().toISOString().slice(0, 10),
    };

    await updateStore((prev) => ({
      ...prev,
      questions: [newQ, ...prev.questions],
    }));

    setQText("");
    setQCorrect("");
    setQExpEn("");
    setQExpBn("");
    notify("New Question added to Question Bank!");
  };

  const handleDeleteQuestion = async (qId: string) => {
    await updateStore((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.question_id !== qId),
    }));
    notify("Question deleted.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              <Settings className="h-3.5 w-3.5" />
              Content Management & Upload Studio
            </span>
            <h1 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Admin Panel — Manage Your Own Content
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Upload your own PDF Study Books, write IELTS Tips & Tricks, create Daily Practice Sets, and publish English Learning Lessons. Delete any default demo items anytime.
            </p>
          </div>

          <button
            type="button"
            onClick={async () => {
              await updateStore(() => getDefaultCMSData());
              notify("Restored default starter content.");
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-700 cursor-pointer shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset to Starter Defaults</span>
          </button>
        </div>

        {/* Status Toast Banner */}
        {statusMessage && (
          <div className="mb-6 flex items-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* 5 Module Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-4">
          {[
            {
              id: "books" as const,
              label: `English & IELTS Books (${data.books.length})`,
              icon: Library,
            },
            {
              id: "tips" as const,
              label: `IELTS Tips & Tricks (${data.tips.length})`,
              icon: Lightbulb,
            },
            {
              id: "daily" as const,
              label: `Daily Practice Sets (${data.dailyPractice.length})`,
              icon: CalendarCheck,
            },
            {
              id: "english" as const,
              label: `English Learning Lessons (${data.lessons.length})`,
              icon: GraduationCap,
            },
            {
              id: "questions" as const,
              label: `Question Bank (${data.questions.length})`,
              icon: HelpCircle,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold cursor-pointer transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-700 text-white shadow-xs"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ============================================================
            TAB 1: ENGLISH & IELTS STUDY BOOKS MANAGER
        ============================================================ */}
        {activeTab === "books" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Form: Upload / Add Book */}
            <form
              onSubmit={handleAddBook}
              className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 space-y-4 h-fit"
            >
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Plus className="h-4 w-4 text-blue-700" />
                Upload New English / IELTS Study Book
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Book Title *
                </label>
                <input
                  type="text"
                  required
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder="e.g. Complete IELTS Grammar & Writing Guide"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={bookAuthor}
                    onChange={(e) => setBookAuthor(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={bookCategory}
                    onChange={(e) =>
                      setBookCategory(e.target.value as BookItem["category"])
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold"
                  >
                    <option value="Grammar">Grammar</option>
                    <option value="Vocabulary">Vocabulary</option>
                    <option value="IELTS Strategy">IELTS Strategy</option>
                    <option value="Reading">Reading</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Level
                  </label>
                  <select
                    value={bookLevel}
                    onChange={(e) =>
                      setBookLevel(e.target.value as BookItem["level"])
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Elementary">Elementary</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Upper Intermediate">Upper Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={bookDesc}
                  onChange={(e) => setBookDesc(e.target.value)}
                  placeholder="What will students learn from this book?"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs"
                />
              </div>

              {/* Real PDF File Upload Box */}
              <div className="rounded-xl border border-dashed border-blue-300 bg-blue-50/50 p-4">
                <label className="block text-xs font-bold text-blue-900 mb-1.5">
                  Upload PDF Book File (Optional — or paste PDF URL below)
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 px-3.5 py-2 text-xs font-bold text-white cursor-pointer">
                    <Upload className="h-3.5 w-3.5" />
                    <span>
                      {uploadingFile ? "Uploading PDF..." : "Choose .PDF File"}
                    </span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleUploadPdfFile}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="text"
                    value={bookPdfUrl}
                    onChange={(e) => setBookPdfUrl(e.target.value)}
                    placeholder="Or paste PDF URL (e.g. /uploads/my-book.pdf)"
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs"
                  />
                </div>
              </div>

              {/* Readable Text / Chapter Content */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Readable Text Content (One paragraph per line for built-in reader)
                </label>
                <input
                  type="text"
                  value={bookChapterTitle}
                  onChange={(e) => setBookChapterTitle(e.target.value)}
                  placeholder="Chapter Title (e.g. Chapter 1: Introduction)"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold mb-2"
                />
                <textarea
                  rows={4}
                  value={bookChapterContent}
                  onChange={(e) => setBookChapterContent(e.target.value)}
                  placeholder="Paste your book text or chapter notes here..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-700 hover:bg-blue-800 py-3 text-xs font-bold text-white cursor-pointer"
              >
                Publish Book to Library
              </button>
            </form>

            {/* Right List: Current Books */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Published Books ({data.books.length})
                </h3>
                {data.books.length > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      updateStore((prev) => ({ ...prev, books: [] }))
                    }
                    className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                  >
                    Clear All Books
                  </button>
                )}
              </div>

              {data.books.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                        {b.category}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Level: {b.level}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      {b.title}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-1">
                      {b.description}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/books/${b.slug}`}
                      className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:text-blue-700"
                      title="View Book"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteBook(b.id)}
                      className="rounded-lg border border-slate-200 p-2 text-slate-400 hover:text-rose-600 cursor-pointer"
                      title="Delete Book"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================
            TAB 2: IELTS TIPS & TRICKS MANAGER
        ============================================================ */}
        {activeTab === "tips" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <form
              onSubmit={handleAddTip}
              className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 space-y-4 h-fit"
            >
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Plus className="h-4 w-4 text-blue-700" />
                Publish New IELTS Tip / Strategy Article
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={tipTitle}
                  onChange={(e) => setTipTitle(e.target.value)}
                  placeholder="e.g. 5 Proven Steps to Solve Matching Headings Fast"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={tipCategory}
                    onChange={(e) =>
                      setTipCategory(
                        e.target.value as TipArticleItem["category"]
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold"
                  >
                    {[
                      "Reading",
                      "Listening",
                      "Writing",
                      "Speaking",
                      "Vocabulary",
                      "Grammar",
                      "Time Management",
                      "Exam Strategy",
                      "Common Mistakes",
                    ].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={tipReadTime}
                    onChange={(e) => setTipReadTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Short Summary
                </label>
                <input
                  type="text"
                  value={tipSummary}
                  onChange={(e) => setTipSummary(e.target.value)}
                  placeholder="Brief 1-sentence summary shown on article cards"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Article Content * (One paragraph per line)
                </label>
                <textarea
                  rows={6}
                  required
                  value={tipContent}
                  onChange={(e) => setTipContent(e.target.value)}
                  placeholder="Write your full article paragraphs here (English & Bangla supported)..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Related Practice URL
                  </label>
                  <input
                    type="text"
                    value={tipPracticeUrl}
                    onChange={(e) => setTipPracticeUrl(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Related Button Text
                  </label>
                  <input
                    type="text"
                    value={tipPracticeLabel}
                    onChange={(e) => setTipPracticeLabel(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-700 hover:bg-blue-800 py-3 text-xs font-bold text-white cursor-pointer"
              >
                Publish Tip Article
              </button>
            </form>

            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Published Tips & Tricks ({data.tips.length})
                </h3>
                {data.tips.length > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      updateStore((prev) => ({ ...prev, tips: [] }))
                    }
                    className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                  >
                    Clear All Tips
                  </button>
                )}
              </div>

              {data.tips.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div>
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                      {t.category} · {t.readTime}
                    </span>
                    <div className="mt-1 text-sm font-bold text-slate-900">
                      {t.title}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-1">
                      {t.summary}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/tips/${t.slug}`}
                      className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteTip(t.id)}
                      className="rounded-lg border border-slate-200 p-2 text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================
            TAB 3: DAILY PRACTICE SETS MANAGER
        ============================================================ */}
        {activeTab === "daily" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <form
              onSubmit={handleAddDailySet}
              className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 space-y-4 h-fit"
            >
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Plus className="h-4 w-4 text-blue-700" />
                Create New Daily Practice Set
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Practice Set Title *
                </label>
                <input
                  type="text"
                  required
                  value={dailyTitle}
                  onChange={(e) => setDailyTitle(e.target.value)}
                  placeholder="e.g. Daily Reading & Grammar Challenge #5"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={dailyCategory}
                    onChange={(e) =>
                      setDailyCategory(
                        e.target.value as DailyPracticeSetItem["category"]
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold"
                  >
                    {[
                      "Grammar",
                      "Vocabulary",
                      "Reading",
                      "Listening",
                      "Writing",
                      "Speaking",
                      "IELTS",
                    ].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={dailyDifficulty}
                    onChange={(e) =>
                      setDailyDifficulty(e.target.value as DifficultyLevel)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Duration (Min)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    value={dailyDuration}
                    onChange={(e) => setDailyDuration(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={dailyDesc}
                  onChange={(e) => setDailyDesc(e.target.value)}
                  placeholder="Short description of this daily practice set"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs"
                />
              </div>

              {/* Select Questions from Question Bank */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Select Questions from Question Bank ({selectedQuestionIds.length}{" "}
                    selected)
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveTab("questions")}
                    className="text-[11px] font-bold text-blue-700 hover:underline cursor-pointer"
                  >
                    + Add New Question First
                  </button>
                </div>
                <div className="max-h-52 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-2 space-y-1.5">
                  {data.questions.map((q) => {
                    const checked = selectedQuestionIds.includes(q.question_id);
                    return (
                      <label
                        key={q.question_id}
                        className={`flex items-start gap-2.5 rounded-lg p-2 text-xs cursor-pointer ${
                          checked ? "bg-blue-50 font-semibold" : "bg-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            toggleSelectQuestionForDaily(q.question_id)
                          }
                          className="mt-0.5"
                        />
                        <div>
                          <span className="text-[10px] font-bold text-blue-700">
                            [{q.category} · {q.question_type} · {q.difficulty}]
                          </span>{" "}
                          <span className="text-slate-800">
                            {q.question_text}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-700 hover:bg-blue-800 py-3 text-xs font-bold text-white cursor-pointer"
              >
                Publish Daily Practice Set
              </button>
            </form>

            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Published Daily Practice Sets ({data.dailyPractice.length})
                </h3>
                {data.dailyPractice.length > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      updateStore((prev) => ({ ...prev, dailyPractice: [] }))
                    }
                    className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                  >
                    Clear All Daily Sets
                  </button>
                )}
              </div>

              {data.dailyPractice.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div>
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                      {d.category} · {d.difficulty} · {d.durationMinutes} min ·{" "}
                      {d.questionIds.length} Qs
                    </span>
                    <div className="mt-1 text-sm font-bold text-slate-900">
                      {d.title}
                    </div>
                    <div className="text-xs text-slate-500">{d.description}</div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/daily-practice?start=${d.id}`}
                      className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteDailySet(d.id)}
                      className="rounded-lg border border-slate-200 p-2 text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================
            TAB 4: ENGLISH LEARNING LESSONS MANAGER
        ============================================================ */}
        {activeTab === "english" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <form
              onSubmit={handleAddLesson}
              className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 space-y-4 h-fit"
            >
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Plus className="h-4 w-4 text-blue-700" />
                Add New English Learning Lesson (Basic → Advanced)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Level
                  </label>
                  <select
                    value={lessonLevel}
                    onChange={(e) =>
                      setLessonLevel(
                        e.target.value as EnglishLessonItem["level"]
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold"
                  >
                    <option value="basic">Basic</option>
                    <option value="elementary">Elementary</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="upper-intermediate">Upper Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Skill
                  </label>
                  <select
                    value={lessonSkill}
                    onChange={(e) =>
                      setLessonSkill(
                        e.target.value as EnglishLessonItem["skill"]
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold"
                  >
                    <option value="Grammar">Grammar</option>
                    <option value="Vocabulary">Vocabulary</option>
                    <option value="Reading">Reading</option>
                    <option value="Listening">Listening</option>
                    <option value="Speaking">Speaking</option>
                    <option value="Writing">Writing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Topic Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={lessonTopic}
                    onChange={(e) => setLessonTopic(e.target.value)}
                    placeholder="e.g. Tenses / Modals"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Lesson Title *
                </label>
                <input
                  type="text"
                  required
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  placeholder="e.g. Past Continuous Tense: Rules & Examples"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  English Explanation *
                </label>
                <textarea
                  rows={3}
                  required
                  value={lessonEn}
                  onChange={(e) => setLessonEn(e.target.value)}
                  placeholder="Write the clear English rule and explanation..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  সহজ বাংলা ব্যাখ্যা (Bangla Explanation)
                </label>
                <textarea
                  rows={3}
                  value={lessonBn}
                  onChange={(e) => setLessonBn(e.target.value)}
                  placeholder="বাংলায় সহজ ব্যাখ্যা লিখুন..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs"
                />
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-2">
                <div className="text-xs font-bold text-slate-700">
                  Example Sentence (English + Bangla)
                </div>
                <input
                  type="text"
                  value={exampleEn}
                  onChange={(e) => setExampleEn(e.target.value)}
                  placeholder="English example sentence..."
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs"
                />
                <input
                  type="text"
                  value={exampleBn}
                  onChange={(e) => setExampleBn(e.target.value)}
                  placeholder="বাংলা অর্থ..."
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-700 hover:bg-blue-800 py-3 text-xs font-bold text-white cursor-pointer"
              >
                Publish English Lesson
              </button>
            </form>

            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Published English Lessons ({data.lessons.length})
                </h3>
                {data.lessons.length > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      updateStore((prev) => ({ ...prev, lessons: [] }))
                    }
                    className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                  >
                    Clear All Lessons
                  </button>
                )}
              </div>

              {data.lessons.map((l) => (
                <div
                  key={l.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div>
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                      {l.levelLabel} · {l.skill} · {l.topic}
                    </span>
                    <div className="mt-1 text-sm font-bold text-slate-900">
                      {l.title}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-1">
                      {l.explanationBn || l.explanationEn}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/english/${l.level}`}
                      className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteLesson(l.id)}
                      className="rounded-lg border border-slate-200 p-2 text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================
            TAB 5: QUESTION BANK MANAGER
        ============================================================ */}
        {activeTab === "questions" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <form
              onSubmit={handleAddQuestion}
              className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 space-y-4 h-fit"
            >
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Plus className="h-4 w-4 text-blue-700" />
                Add Question to Unified Question Bank
              </h2>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={qCategory}
                    onChange={(e) =>
                      setQCategory(e.target.value as QuestionItem["category"])
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold"
                  >
                    <option value="Reading">Reading</option>
                    <option value="Listening">Listening</option>
                    <option value="Grammar">Grammar</option>
                    <option value="Vocabulary">Vocabulary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Question Type
                  </label>
                  <select
                    value={qType}
                    onChange={(e) =>
                      setQType(e.target.value as IELTSQuestionType)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold"
                  >
                    <option value="True / False / Not Given">
                      True / False / Not Given
                    </option>
                    <option value="Multiple Choice">Multiple Choice</option>
                    <option value="Matching Headings">Matching Headings</option>
                    <option value="Note Completion">Note Completion</option>
                    <option value="Sentence Completion">
                      Sentence Completion
                    </option>
                    <option value="Form Completion">Form Completion</option>
                    <option value="Fill in the Blank">Fill in the Blank</option>
                    <option value="Meaning Selection">Meaning Selection</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={qDifficulty}
                    onChange={(e) =>
                      setQDifficulty(e.target.value as DifficultyLevel)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Topic
                </label>
                <input
                  type="text"
                  value={qTopic}
                  onChange={(e) => setQTopic(e.target.value)}
                  placeholder="e.g. Environment, Tenses, Academic Vocab"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Question Text *
                </label>
                <textarea
                  rows={3}
                  required
                  value={qText}
                  onChange={(e) => setQText(e.target.value)}
                  placeholder="Enter the question statement or sentence with blank (__________)..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs"
                />
              </div>

              {(qType === "Multiple Choice" ||
                qType === "Matching Headings" ||
                qType === "Meaning Selection") && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Options (One per line, format: A: Option text)
                  </label>
                  <textarea
                    rows={4}
                    value={qOptionsRaw}
                    onChange={(e) => setQOptionsRaw(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-mono"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Correct Answer * (e.g. TRUE, B, ii, or exact word)
                </label>
                <input
                  type="text"
                  required
                  value={qCorrect}
                  onChange={(e) => setQCorrect(e.target.value)}
                  placeholder="e.g. TRUE or B or biomass"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Explanation (English)
                  </label>
                  <textarea
                    rows={2}
                    value={qExpEn}
                    onChange={(e) => setQExpEn(e.target.value)}
                    placeholder="Why is this answer correct?"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    বাংলা ব্যাখ্যা (Bangla Explanation)
                  </label>
                  <textarea
                    rows={2}
                    value={qExpBn}
                    onChange={(e) => setQExpBn(e.target.value)}
                    placeholder="উত্তরটির বাংলা ব্যাখ্যা..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-700 hover:bg-blue-800 py-3 text-xs font-bold text-white cursor-pointer"
              >
                Save Question to Question Bank
              </button>
            </form>

            <div className="lg:col-span-6 space-y-3 max-h-[700px] overflow-y-auto pr-1">
              <h3 className="text-sm font-extrabold text-slate-900">
                Questions in Bank ({data.questions.length})
              </h3>
              {data.questions.map((q) => (
                <div
                  key={q.question_id}
                  className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div>
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                      {q.category} · {q.question_type} · {q.difficulty}
                    </span>
                    <div className="mt-1 text-xs font-bold text-slate-900">
                      {q.question_text}
                    </div>
                    <div className="mt-1 text-[11px] text-emerald-700 font-semibold">
                      Answer: {q.correct_answer}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(q.question_id)}
                    className="rounded-lg border border-slate-200 p-2 text-slate-400 hover:text-rose-600 cursor-pointer shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <MainFooter />
    </div>
  );
}
