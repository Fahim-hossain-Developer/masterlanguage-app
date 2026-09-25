"use client";

import Link from "next/link";
import { Crown, Check, Sparkles, ArrowLeft } from "lucide-react";

export default function UpgradePremiumPage() {
  return (
    <div className="min-h-full bg-[#F8FAFC] dark:bg-gray-950 px-5 py-8 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
        </Link>

        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1 text-xs font-bold text-amber-700 mb-3">
            <Crown className="h-3.5 w-3.5 text-amber-500" />
            UNLIMITED IELTS & FOUNDATION ACCESS
          </span>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            বিকাশ পেমেন্টে ১ মাস আনলিমিটেড মক টেস্ট মাত্র ৩৯৯ টাকায়
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Unlock all Cambridge 15–21 Mock Tests, Instant AI Writing & Speaking Evaluation, and CEFR A1–C1 Foundation Track.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free Tier */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Free Starter</h3>
            <div className="mt-2 text-3xl font-black text-gray-900 dark:text-white">৳0 <span className="text-xs font-normal text-gray-400">/ forever</span></div>
            <ul className="mt-6 space-y-2.5 text-xs text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> 3 Speaking AI Mock Tests</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> 3 Writing AI Evaluations</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> CEFR Level Placement Test</li>
            </ul>
          </div>

          {/* Pro 399 BDT */}
          <div className="rounded-3xl border-2 border-blue-600 bg-white p-6 shadow-xl dark:bg-gray-900 relative">
            <span className="absolute -top-3 right-5 rounded-full bg-blue-600 px-3 py-0.5 text-[10px] font-bold uppercase text-white">
              MOST POPULAR (bKash / Nagad)
            </span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              MasterEnglish Pro <Sparkles className="h-4 w-4 text-amber-500" />
            </h3>
            <div className="mt-2 text-3xl font-black text-blue-600">৳৩৯৯ <span className="text-xs font-normal text-gray-400">/ ১ মাস</span></div>
            <ul className="mt-6 space-y-2.5 text-xs text-gray-700 dark:text-gray-200">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-600" /> Unlimited Full Mock Tests (Cambridge 15–21)</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-600" /> Unlimited AI Writing & Speaking Band Scoring</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-600" /> Complete Foundation English (A1–C1) Track</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-blue-600" /> Instant bKash / Nagad Activation</li>
            </ul>
            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-[#E2136E] hover:opacity-95 py-3 text-xs font-bold text-white shadow-md cursor-pointer"
            >
              Pay ৳399 with bKash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
