"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  GraduationCap,
  Bot,
  Mic,
  Languages,
  ClipboardList,
  Star,
  Check,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Globe,
  TrendingUp,
  Users,
  BookOpen,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ─── Data ────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Bot,
    title: "AI Writing Evaluator",
    description:
      "Get instant band-score feedback on your IELTS essays. AI analyzes task achievement, coherence, lexical resource, and grammar with line-by-line annotations.",
    badge: "GPT-4 Powered",
    color: "bg-primary-500",
    lightBg: "bg-primary-50 dark:bg-primary-900/20",
    iconColor: "text-primary-600 dark:text-primary-400",
  },
  {
    icon: Mic,
    title: "Speaking Practice",
    description:
      "Simulate real IELTS speaking interviews and Japanese conversation with our AI examiner. Get pronunciation and fluency scores instantly.",
    badge: "Voice AI",
    color: "bg-secondary-500",
    lightBg: "bg-secondary-50 dark:bg-secondary-900/20",
    iconColor: "text-secondary-600 dark:text-secondary-400",
  },
  {
    icon: Languages,
    title: "JLPT Learning Path",
    description:
      "Structured N5 to N1 curriculum with kanji, grammar, vocabulary, and reading comprehension. Adaptive spaced repetition keeps you on track.",
    badge: "N5 → N1",
    color: "bg-warning-500",
    lightBg: "bg-warning-50 dark:bg-yellow-900/20",
    iconColor: "text-warning-600 dark:text-warning-400",
  },
  {
    icon: ClipboardList,
    title: "Full Mock Tests",
    description:
      "Timed, exam-accurate practice tests for all IELTS sections and JLPT levels. Detailed analytics show exactly where to improve.",
    badge: "Exam-Ready",
    color: "bg-success-500",
    lightBg: "bg-success-50 dark:bg-green-900/20",
    iconColor: "text-success-600 dark:text-success-400",
  },
];

const STATS = [
  { value: "10,000+", label: "Active Students", icon: Users },
  { value: "95%", label: "Success Rate", icon: TrendingUp },
  { value: "500+", label: "Practice Tests", icon: ClipboardList },
  { value: "4.9★", label: "Average Rating", icon: Star },
];

const TESTIMONIALS = [
  {
    name: "Tanaka Hiroshi",
    role: "IELTS Academic — Band 7.5",
    avatar: "TH",
    country: "🇯🇵",
    text: "MasterLanguage's AI writing evaluator is incredible. It gave me detailed feedback on every paragraph. I went from Band 6.0 to 7.5 in just 3 months!",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "JLPT N2 — Passed",
    avatar: "PS",
    country: "🇮🇳",
    text: "The JLPT learning path is so well-structured. The spaced repetition system helped me memorize over 2,000 kanji. Passed N2 on my first attempt!",
    rating: 5,
  },
  {
    name: "Ahmed Al-Rashid",
    role: "IELTS General — Band 8.0",
    avatar: "AR",
    country: "🇸🇦",
    text: "The AI speaking practice prepared me perfectly. I practiced daily for 6 weeks, and the real examiner felt just like the AI sessions. Band 8.0!",
    rating: 5,
  },
];

const PRICING = [
  {
    id: "FREE",
    name: "Free",
    price: 0,
    description: "Perfect to get started",
    features: [
      "5 AI writing evaluations/month",
      "10 mock test questions/day",
      "JLPT N5 & N4 content",
      "Basic progress tracking",
      "Community access",
    ],
    cta: "Start for Free",
    variant: "outline" as const,
  },
  {
    id: "PREMIUM",
    name: "Premium",
    price: 19,
    description: "For serious learners",
    highlighted: true,
    badge: "Most Popular",
    features: [
      "Unlimited AI writing evaluations",
      "Unlimited mock tests",
      "Full IELTS + JLPT content",
      "AI speaking practice",
      "Detailed analytics & weak areas",
      "Priority AI feedback",
      "Downloadable study materials",
    ],
    cta: "Start Premium",
    variant: "default" as const,
  },
  {
    id: "PRO",
    name: "Pro",
    price: 39,
    description: "For exam warriors",
    features: [
      "Everything in Premium",
      "1-on-1 AI coaching sessions",
      "Personalized study schedule",
      "Exam prediction reports",
      "Direct teacher Q&A access",
      "Exam-day simulation mode",
      "Score guarantee program",
    ],
    cta: "Go Pro",
    variant: "secondary" as const,
  },
];

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
];

// ─── Components ───────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 shadow-glow group-hover:bg-primary-700 transition-colors">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Master<span className="text-primary-600">Language</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">
                Get Started Free
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-4 space-y-3"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            <Button variant="outline" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started Free</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-br from-primary-400/20 via-secondary-400/10 to-transparent blur-3xl animate-pulse-slow" />
          <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-secondary-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary-400/10 blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #6366F1 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/30 px-4 py-1.5 text-sm font-medium text-primary-700 dark:text-primary-300 mb-6"
          >
            <Sparkles className="h-4 w-4" />
            AI-Powered Language Learning — Now with GPT-4
            <ChevronRight className="h-3.5 w-3.5" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Master{" "}
            <span className="text-gradient">IELTS & Japanese</span>
            <br />
            with AI
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10"
          >
            Get personalized AI feedback on your writing and speaking, practice
            with authentic mock tests, and achieve your target score faster than
            ever before.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="xl" asChild className="shadow-glow">
              <Link href="/register">
                Start Learning Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="#features">
                <Zap className="h-5 w-5" />
                See How It Works
              </Link>
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["A", "B", "C", "D"].map((letter, i) => (
                  <div
                    key={i}
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white dark:border-gray-950 bg-primary-500 text-white text-xs font-bold"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <span>10,000+ learners enrolled</span>
            </div>
            <span className="hidden sm:inline text-gray-300 dark:text-gray-700">
              |
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-warning-400 text-warning-400"
                />
              ))}
              <span>4.9/5 from 2,400+ reviews</span>
            </div>
            <span className="hidden sm:inline text-gray-300 dark:text-gray-700">
              |
            </span>
            <div className="flex items-center gap-1.5">
              <Globe className="h-4 w-4" />
              <span>Available in 50+ countries</span>
            </div>
          </motion.div>

          {/* Hero image / mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 relative mx-auto max-w-5xl"
          >
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden">
              {/* Fake browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                <div className="h-3 w-3 rounded-full bg-danger-400" />
                <div className="h-3 w-3 rounded-full bg-warning-400" />
                <div className="h-3 w-3 rounded-full bg-success-400" />
                <div className="flex-1 mx-4">
                  <div className="h-5 rounded-md bg-gray-200 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400 flex items-center px-3">
                    app.masterlanguage.io/dashboard
                  </div>
                </div>
              </div>
              {/* Dashboard preview */}
              <div className="p-6 grid grid-cols-4 gap-4">
                {[
                  { label: "Band Score", value: "7.0", color: "bg-primary-100 dark:bg-primary-900/30" },
                  { label: "Streak", value: "12 days", color: "bg-orange-100 dark:bg-orange-900/30" },
                  { label: "Study Hours", value: "127h", color: "bg-secondary-100 dark:bg-secondary-900/30" },
                  { label: "Tests Done", value: "34", color: "bg-success-100 dark:bg-green-900/30" },
                ].map((stat) => (
                  <div key={stat.label} className={`${stat.color} rounded-xl p-4`}>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{stat.label}</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  </div>
                ))}
                <div className="col-span-2 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">AI Writing Feedback</div>
                  <div className="space-y-2">
                    {["Task Achievement", "Coherence", "Lexical Resource", "Grammar"].map((item, i) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="text-xs text-gray-600 dark:text-gray-400 w-28 shrink-0">{item}</div>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div
                            className="bg-primary-500 h-1.5 rounded-full"
                            style={{ width: `${70 + i * 5}%` }}
                          />
                        </div>
                        <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">{7 + i * 0.5}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-2 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">Today&apos;s Plan</div>
                  <div className="space-y-2">
                    {["✅ Writing Task 2", "⬜ JLPT Vocab Set 12", "⬜ Listening Mock"].map((item) => (
                      <div key={item} className="text-xs text-gray-700 dark:text-gray-300">{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30">
                    <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────── */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-4">
              <Sparkles className="h-3.5 w-3.5" /> Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Everything you need to{" "}
              <span className="text-gradient">ace your exam</span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
              Our AI-powered platform combines cutting-edge technology with
              proven pedagogical methods to maximize your learning efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${feature.lightBg} mb-6`}>
                    <Icon className={`h-7 w-7 ${feature.iconColor}`} />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <Badge variant="ghost" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-24 bg-gray-50 dark:bg-gray-900"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Your path to exam success
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Set Your Goal",
                description:
                  "Tell us your target exam (IELTS or JLPT), desired score, and exam date. We build a personalized study plan.",
                icon: Target,
              },
              {
                step: "02",
                title: "Study & Practice",
                description:
                  "Work through adaptive lessons, take mock tests, and practice speaking. AI adjusts difficulty to your level.",
                icon: BookOpen,
              },
              {
                step: "03",
                title: "Get AI Feedback",
                description:
                  "Receive instant, detailed feedback on every submission. Track your progress and conquer weak areas.",
                icon: Bot,
              },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="relative text-center"
                >
                  {i < 2 && (
                    <div className="hidden md:block absolute top-10 left-[calc(50%+3rem)] w-[calc(100%-6rem)] border-t-2 border-dashed border-primary-200 dark:border-primary-800" />
                  )}
                  <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-glow mb-6">
                    <Icon className="h-9 w-9" />
                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-gray-900 border-2 border-primary-600 text-xs font-bold text-primary-700 dark:text-primary-400">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <section id="testimonials" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-4">
              <Star className="h-3.5 w-3.5 fill-current" /> Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Real results from real students
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Join thousands who have already achieved their language goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-warning-400 text-warning-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-white text-sm font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {testimonial.country} {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────── */}
      <section
        id="pricing"
        className="py-24 bg-gray-50 dark:bg-gray-900"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Pricing</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Start free. Upgrade when you&apos;re ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {PRICING.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={cn(
                  "relative rounded-2xl p-8 border transition-all duration-300",
                  plan.highlighted
                    ? "border-primary-500 bg-primary-600 text-white shadow-glow scale-105"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:shadow-card-hover hover:-translate-y-1"
                )}
              >
                {plan.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-warning-400 px-3 py-1 text-xs font-bold text-white">
                    {plan.badge}
                  </span>
                )}

                <div className="mb-6">
                  <h3
                    className={cn(
                      "text-xl font-bold mb-1",
                      plan.highlighted ? "text-white" : "text-gray-900 dark:text-white"
                    )}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={cn(
                      "text-sm",
                      plan.highlighted ? "text-primary-200" : "text-gray-500 dark:text-gray-400"
                    )}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 mb-8">
                  <span
                    className={cn(
                      "text-5xl font-extrabold",
                      plan.highlighted ? "text-white" : "text-gray-900 dark:text-white"
                    )}
                  >
                    ${plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span
                      className={cn(
                        "text-sm",
                        plan.highlighted ? "text-primary-200" : "text-gray-500 dark:text-gray-400"
                      )}
                    >
                      /month
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        className={cn(
                          "h-4 w-4 shrink-0 mt-0.5",
                          plan.highlighted ? "text-primary-200" : "text-success-500"
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm",
                          plan.highlighted ? "text-primary-100" : "text-gray-600 dark:text-gray-400"
                        )}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlighted ? "ghost" : plan.variant}
                  size="lg"
                  className={cn(
                    "w-full",
                    plan.highlighted &&
                      "bg-white text-primary-700 hover:bg-primary-50 border-0"
                  )}
                  asChild
                >
                  <Link href="/register">
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl bg-gradient-to-r from-primary-600 to-secondary-500 p-12 text-center text-white overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            </div>
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                Ready to achieve your target score?
              </h2>
              <p className="text-primary-100 mb-8 text-lg max-w-xl mx-auto">
                Join 10,000+ students who are using MasterLanguage to pass
                IELTS and JLPT. Start free, no credit card required.
              </p>
              <Button
                size="xl"
                variant="ghost"
                className="bg-white text-primary-700 hover:bg-primary-50 border-0 shadow-lg"
                asChild
              >
                <Link href="/register">
                  Get Started — It&apos;s Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Master<span className="text-primary-600">Language</span>
                </span>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                AI-powered IELTS and Japanese learning for ambitious students worldwide.
              </p>
              <div className="flex gap-3">
                {["Twitter", "YouTube", "Discord"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-xs text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "IELTS Prep", "JLPT Prep", "AI Tutor"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Press", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400 dark:text-gray-600">
              © {new Date().getFullYear()} MasterLanguage. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-600">
              Made with ❤️ for language learners worldwide 🌏
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
