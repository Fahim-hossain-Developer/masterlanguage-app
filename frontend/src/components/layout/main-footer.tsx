import Link from "next/link";
import { GraduationCap } from "lucide-react";

export function MainFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-700 text-white">
                <GraduationCap className="h-4 w-4" />
              </div>
              <span className="text-base font-extrabold tracking-tight text-slate-900">
                Master<span className="text-blue-700">English</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600">
              A fast, practical English learning and IELTS preparation platform designed for students in Bangladesh.
            </p>
            <p className="text-[11px] text-slate-400">
              All practice passages and questions carry explicit source metadata. Not affiliated with Cambridge University Press & Assessment.
            </p>
          </div>

          {/* Col 2: IELTS */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              IELTS Preparation
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/ielts/full-mock" className="hover:text-blue-700">Full Mock Test</Link></li>
              <li><Link href="/ielts/reading" className="hover:text-blue-700">IELTS Reading</Link></li>
              <li><Link href="/ielts/listening" className="hover:text-blue-700">IELTS Listening</Link></li>
              <li><Link href="/ielts/writing" className="hover:text-blue-700">IELTS Writing</Link></li>
              <li><Link href="/ielts/speaking" className="hover:text-blue-700">IELTS Speaking</Link></li>
              <li><Link href="/ielts/question-types" className="hover:text-blue-700">Question Types Practice</Link></li>
            </ul>
          </div>

          {/* Col 3: English Learning */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              English Learning
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/english/basic" className="hover:text-blue-700">Basic Level</Link></li>
              <li><Link href="/english/elementary" className="hover:text-blue-700">Elementary Level</Link></li>
              <li><Link href="/english/intermediate" className="hover:text-blue-700">Intermediate Level</Link></li>
              <li><Link href="/english/upper-intermediate" className="hover:text-blue-700">Upper Intermediate</Link></li>
              <li><Link href="/english/advanced" className="hover:text-blue-700">Advanced Level</Link></li>
            </ul>
          </div>

          {/* Col 4: Resources & Student Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Resources & Account
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/books" className="hover:text-blue-700">English Books Library</Link></li>
              <li><Link href="/tips" className="hover:text-blue-700">IELTS Tips & Tricks</Link></li>
              <li><Link href="/daily-practice" className="hover:text-blue-700">Daily Practice</Link></li>
              <li><Link href="/search" className="hover:text-blue-700">Global Search</Link></li>
              <li><Link href="/dashboard" className="hover:text-blue-700">Student Dashboard</Link></li>
              <li><Link href="/dashboard/results" className="hover:text-blue-700">Test Results & Review</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <span>© {new Date().getFullYear()} MasterEnglish Bangladesh. Built for practical learning.</span>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <Link href="/dashboard/saved" className="hover:text-blue-700">Saved Items</Link>
            <Link href="/dashboard/profile" className="hover:text-blue-700">Student Profile</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
