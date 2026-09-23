"use client";

import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Flame,
  Clock,
  ClipboardList,
  ChevronRight,
  Play,
  ArrowRight,
  Bot,
  Target,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/common/stat-card";
import { SkeletonStatCard, SkeletonList } from "@/components/ui/skeleton";
import { useAuthStore } from "@/stores/auth.store";
import api from "@/lib/api";
import type { UserStats, WeakArea, StudyActivity, StudyPlanItem } from "@/types";
import { format } from "date-fns";

// ─── Mock data for preview (replace with real API calls) ──────────────────────
const MOCK_STATS: UserStats = {
  totalStudyHours: 127,
  studyStreak: 12,
  longestStreak: 24,
  totalPoints: 4850,
  testsCompleted: 34,
  lessonsCompleted: 89,
  currentBand: 6.5,
  weeklyGoalMinutes: 300,
  weeklyStudiedMinutes: 210,
};

const MOCK_WEAK_AREAS: WeakArea[] = [
  { category: "IELTS Writing Task 2 (Coherence)", score: 55, maxScore: 100 },
  { category: "Complex Tenses & Prepositions (B1)", score: 62, maxScore: 100 },
  { category: "IELTS Speaking Part 3 (Fluency)", score: 68, maxScore: 100 },
  { category: "Academic Vocabulary & Collocations", score: 71, maxScore: 100 },
];

const MOCK_ACTIVITIES: StudyActivity[] = [
  {
    id: "1",
    userId: "u1",
    type: "TEST_TAKEN",
    description: "Completed IELTS Reading Mock Test #8",
    points: 150,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "2",
    userId: "u1",
    type: "AI_FEEDBACK",
    description: "AI evaluated your Writing Task 2 essay (Band 6.5)",
    points: 50,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "3",
    userId: "u1",
    type: "LESSON_COMPLETED",
    description: "Finished: Grammar Lab - Conditionals & Modals (B1)",
    points: 80,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "4",
    userId: "u1",
    type: "VOCABULARY_PRACTICED",
    description: "Practiced 25 Oxford 3000 Academic Vocabulary cards",
    points: 40,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

const MOCK_STUDY_PLAN: StudyPlanItem[] = [
  {
    id: "sp1",
    title: "IELTS Writing Task 2 Practice",
    type: "WRITING_TASK",
    duration: 45,
    completed: true,
  },
  {
    id: "sp2",
    title: "Grammar Lab: Subject-Verb Agreement",
    type: "GRAMMAR_LAB",
    duration: 20,
    completed: false,
  },
  {
    id: "sp3",
    title: "IELTS Listening Section 3",
    type: "QUIZ",
    duration: 30,
    completed: false,
  },
  {
    id: "sp4",
    title: "AI Speaking Practice Session",
    type: "SPEAKING_PRACTICE",
    duration: 15,
    completed: false,
  },
];

const activityIconMap: Record<StudyActivity["type"], string> = {
  LESSON_COMPLETED: "📚",
  TEST_TAKEN: "📝",
  VOCABULARY_PRACTICED: "🔤",
  SPEAKING_SESSION: "🎙️",
  GRAMMAR_EXERCISE: "✍️",
  AI_FEEDBACK: "🤖",
};

function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function DashboardPage() {
  const { user } = useAuthStore();

  // In production these would be real API queries:
  // const { data: stats, isLoading } = useQuery({ queryKey: ['user-stats'], queryFn: () => api.get('/stats').then(r => r.data.data) });
  const stats = MOCK_STATS;
  const isLoadingStats = false;
  const weeklyProgress = Math.round(
    (stats.weeklyStudiedMinutes / stats.weeklyGoalMinutes) * 100
  );

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Welcome Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {greeting()}, {user?.profile?.name?.split(" ")[0] ?? "Learner"}! 👋
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {format(new Date(), "EEEE, MMMM d")} ·{" "}
            {user?.profile?.targetTrack
              ? `Track: ${user.profile.targetTrack.replace(/_/g, " ")}`
              : "Set your learning track in settings"}
            {user?.profile?.targetBand && ` · Goal: Band ${user.profile.targetBand}`}
            {user?.profile?.currentCEFR && ` · Level: ${user.profile.currentCEFR}`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" asChild>
            <a href="/dashboard/tests">
              <ClipboardList className="h-4 w-4" />
              Take a Test
            </a>
          </Button>
          <Button size="sm" asChild>
            <a href="/dashboard/ai-tutor">
              <Bot className="h-4 w-4" />
              AI Tutor
            </a>
          </Button>
        </div>
      </div>

      {/* ── Stats Grid ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoadingStats ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonStatCard key={i} />)
        ) : (
          <>
            <StatCard
              title="Current Band"
              value={`${stats.currentBand ?? "N/A"}`}
              icon={Target}
              description="IELTS Band Score"
              trend={{ value: 5, label: "vs last test", positive: true }}
              iconClassName="bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
            />
            <StatCard
              title="Study Streak"
              value={`${stats.studyStreak} days`}
              icon={Flame}
              description={`Best: ${stats.longestStreak} days`}
              iconClassName="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
            />
            <StatCard
              title="Study Hours"
              value={`${stats.totalStudyHours}h`}
              icon={Clock}
              description="Total time invested"
              trend={{ value: 12, label: "vs last week", positive: true }}
              iconClassName="bg-secondary-100 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400"
            />
            <StatCard
              title="Tests Taken"
              value={stats.testsCompleted}
              icon={ClipboardList}
              description={`${stats.lessonsCompleted} lessons done`}
              iconClassName="bg-success-100 text-success-600 dark:bg-green-900/30 dark:text-green-400"
            />
          </>
        )}
      </div>

      {/* ── Weekly Progress ───────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Weekly Study Goal</CardTitle>
            <Badge variant={weeklyProgress >= 100 ? "success" : "default"}>
              {weeklyProgress >= 100 ? "🎉 Completed!" : `${weeklyProgress}%`}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress
            value={weeklyProgress}
            indicatorClassName={
              weeklyProgress >= 100 ? "bg-success-500" : "bg-primary-500"
            }
            showLabel
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {stats.weeklyStudiedMinutes} / {stats.weeklyGoalMinutes} minutes studied
            this week
          </p>
        </CardContent>
      </Card>

      {/* ── Middle Grid: Study Plan + Weak Areas ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Study Plan */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Today&apos;s Study Plan</CardTitle>
              <Badge variant="ghost">
                {MOCK_STUDY_PLAN.filter((i) => i.completed).length}/
                {MOCK_STUDY_PLAN.length} done
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {MOCK_STUDY_PLAN.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                >
                  {item.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-success-500 shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-300 dark:text-gray-600 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium truncate ${
                        item.completed
                          ? "line-through text-gray-400"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.duration} min
                    </p>
                  </div>
                  {!item.completed && (
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label={`Start ${item.title}`}
                    >
                      <Play className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Weak Areas */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Weak Areas</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs" asChild>
                <a href="/dashboard/progress">
                  View all <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {MOCK_WEAK_AREAS.map((area) => (
                <li key={area.category} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {area.category}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {area.score}%
                    </span>
                  </div>
                  <Progress
                    value={(area.score / area.maxScore) * 100}
                    indicatorClassName={
                      area.score < 60
                        ? "bg-danger-500"
                        : area.score < 75
                        ? "bg-warning-500"
                        : "bg-success-500"
                    }
                  />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* ── Recent Activity ───────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {MOCK_ACTIVITIES.map((activity) => (
              <li
                key={activity.id}
                className="flex items-start gap-3 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-base shrink-0">
                  {activityIconMap[activity.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {formatRelativeTime(activity.createdAt)}
                  </p>
                </div>
                <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 shrink-0">
                  +{activity.points} pts
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* ── Quick Actions ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button size="lg" className="h-16 gap-3 text-base" asChild>
          <a href="/dashboard/tests">
            <ClipboardList className="h-6 w-6" />
            Start Mock Test
          </a>
        </Button>
        <Button size="lg" variant="outline" className="h-16 gap-3 text-base" asChild>
          <a href="/dashboard/ielts">
            <BookOpen className="h-6 w-6" />
            Continue Lesson
          </a>
        </Button>
        <Button size="lg" variant="secondary" className="h-16 gap-3 text-base" asChild>
          <a href="/dashboard/japanese">
            <span className="text-xl font-jp">語</span>
            Practice Vocab
          </a>
        </Button>
      </div>
    </div>
  );
}
