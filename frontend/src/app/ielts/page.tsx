import Link from "next/link";
import {
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Trophy,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { MainNavbar } from "@/components/layout/main-navbar";
import { MainFooter } from "@/components/layout/main-footer";

export default function IELTSOverviewPage() {
  const modules = [
    {
      title: "Full IELTS Mock Test",
      href: "/ielts/full-mock",
      icon: Trophy,
      badge: "Exam Simulation",
      desc: "Take a complete IELTS mock test across modules with real-time auto-save, timer persistence, and band score estimation.",
    },
    {
      title: "IELTS Reading",
      href: "/ielts/reading",
      icon: BookOpen,
      badge: "Passages & 13 Types",
      desc: "Practice academic reading passages in timed or untimed mode with instant marking and bilingual explanations.",
    },
    {
      title: "IELTS Listening",
      href: "/ielts/listening",
      icon: Headphones,
      badge: "Sections 1–4 Audio",
      desc: "Train your ear for form completion, note completion, multiple choice, and distractor corrections.",
    },
    {
      title: "IELTS Writing",
      href: "/ielts/writing",
      icon: PenTool,
      badge: "Task 1 & Task 2",
      desc: "Write essays with a live word counter, 20/40-minute timer, automatic draft saving, and submission history.",
    },
    {
      title: "IELTS Speaking",
      href: "/ielts/speaking",
      icon: Mic,
      badge: "Parts 1, 2 & 3",
      desc: "Practice Part 1 questions, Part 2 cue cards (1-min prep + 2-min talk), and Part 3 discussions with browser voice recording.",
    },
    {
      title: "Question Types Practice",
      href: "/ielts/question-types",
      icon: Layers,
      badge: "Filter by Difficulty",
      desc: "Focus specifically on Matching Headings, True/False/Not Given, or Note Completion filtered by Easy, Medium, or Hard.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <MainNavbar />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            IELTS Preparation Hub
          </span>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
            Structured IELTS Practice & Full Mock Tests
          </h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Move systematically from individual question type drills to timed module tests and full IELTS exam simulations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.href}
                href={m.href}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs hover:border-blue-500 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                      {m.badge}
                    </span>
                  </div>
                  <h2 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-700">
                    {m.title}
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
                  <span>Open Module</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <MainFooter />
    </div>
  );
}
