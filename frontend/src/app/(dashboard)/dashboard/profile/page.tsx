"use client";

import { useState } from "react";
import Link from "next/link";
import { User, CheckCircle2, LogOut } from "lucide-react";

export default function StudentProfilePage() {
  const [name, setName] = useState("Fahim Hossain");
  const [email, setEmail] = useState("fahim@masterenglish.bd");
  const [level, setLevel] = useState("Intermediate");
  const [targetBand, setTargetBand] = useState("7.5");
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
          <User className="h-3.5 w-3.5" />
          Student Account
        </span>
        <h1 className="mt-1.5 text-2xl font-extrabold text-slate-900">
          My Profile & Study Preferences
        </h1>
      </div>

      <form
        onSubmit={handleSave}
        className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4"
      >
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Current English Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900"
            >
              <option>Basic</option>
              <option>Elementary</option>
              <option>Intermediate</option>
              <option>Upper Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Target IELTS Band
            </label>
            <select
              value={targetBand}
              onChange={(e) => setTargetBand(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-900"
            >
              <option>6.5</option>
              <option>7.0</option>
              <option>7.5</option>
              <option>8.0</option>
              <option>8.5</option>
            </select>
          </div>
        </div>

        {savedMsg && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-700">
            <CheckCircle2 className="h-4 w-4" /> Profile updated successfully!
          </div>
        )}

        <div className="pt-3 flex items-center justify-between border-t border-slate-100">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:underline"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </Link>

          <button
            type="submit"
            className="rounded-xl bg-blue-700 hover:bg-blue-800 px-5 py-2.5 text-xs font-bold text-white cursor-pointer"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
