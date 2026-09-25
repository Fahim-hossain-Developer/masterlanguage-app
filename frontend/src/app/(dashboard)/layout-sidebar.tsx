"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  LayoutGrid,
  FileCheck2,
  Trophy,
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Wand2,
  Keyboard,
  CalendarRange,
  Users,
  GraduationCap,
  Swords,
  Layers,
  Wrench,
  Moon,
  Sun,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight,
  ChevronDown,
  Crown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  hasSubmenu?: boolean;
}

const MAIN_NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Test Results", href: "/dashboard/results", icon: FileCheck2 },
];

const EXAM_MODULES_NAV: NavItem[] = [
  { label: "Full Mock Test", href: "/dashboard/full-mock", icon: Trophy },
  { label: "Reading", href: "/dashboard/reading", icon: BookOpen },
  { label: "Listening", href: "/dashboard/listening", icon: Headphones },
  { label: "Writing", href: "/dashboard/writing", icon: PenTool },
  { label: "Speaking", href: "/dashboard/speaking", icon: Mic },
];

const TOOLS_NAV: NavItem[] = [
  { label: "Foundation English", href: "/dashboard/foundation", icon: Sparkles, badge: "A1-C1" },
  { label: "Paraphraser", href: "/dashboard/paraphraser", icon: Wand2 },
  { label: "Typing Practice", href: "/dashboard/typing-practice", icon: Keyboard },
  { label: "Study Plan", href: "/dashboard/study-plan", icon: CalendarRange },
  { label: "Community", href: "/dashboard/community", icon: Users },
  { label: "Students/Teacher", href: "/dashboard/teachers", icon: GraduationCap },
  { label: "Band Battle", href: "/dashboard/band-battle", icon: Swords, badge: "NEW" },
  { label: "Question Types", href: "/dashboard/question-types", icon: Layers, badge: "NEW", hasSubmenu: true },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user } = useAuthStore();
  const [moreToolsOpen, setMoreToolsOpen] = useState(false);

  const displayName = user?.profile?.name || "Fahim Hossain";
  const initial = displayName.charAt(0).toUpperCase();

  const renderNavLink = (item: NavItem) => {
    const Icon = item.icon;
    const isActive =
      item.href === "/dashboard"
        ? pathname === "/dashboard"
        : pathname === item.href || pathname.startsWith(`${item.href}/`);

    return (
      <Link
        key={item.href}
        href={item.href}
        title={collapsed ? item.label : undefined}
        className={cn(
          "group flex items-center justify-between rounded-xl px-3 py-2 text-[13px] font-medium transition-all duration-150",
          isActive
            ? "bg-blue-50/90 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold"
            : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/60 dark:hover:text-gray-200",
          collapsed && "justify-center px-2"
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Icon
            className={cn(
              "h-4 w-4 shrink-0 transition-colors",
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300"
            )}
          />
          {!collapsed && <span className="truncate">{item.label}</span>}
        </div>

        {!collapsed && (
          <div className="flex items-center gap-1">
            {item.badge && (
              <span className="rounded-md bg-sky-500 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                {item.badge}
              </span>
            )}
            {item.hasSubmenu && (
              <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
            )}
          </div>
        )}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-gray-200/80 bg-white dark:border-gray-800 dark:bg-gray-950 transition-all duration-200 select-none",
        collapsed ? "w-[68px]" : "w-[225px]"
      )}
    >
      {/* Top Brand Header */}
      <div className="flex h-14 items-center justify-between px-3.5 border-b border-gray-100 dark:border-gray-800/80">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-sm">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="text-[15px] font-extrabold tracking-tight text-gray-900 dark:text-white">
              Master<span className="text-blue-600">English</span>
            </span>
          </Link>
        )}

        <div className={cn("flex items-center gap-1", collapsed && "mx-auto")}>
          {!collapsed && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800"
              title="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-3.5 w-3.5" />
              ) : (
                <Moon className="h-3.5 w-3.5" />
              )}
            </button>
          )}
          <button
            onClick={onToggle}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-3.5 w-3.5" />
            ) : (
              <PanelLeftClose className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-3 scrollbar-thin">
        {/* Section 1: Dashboard & Results */}
        <div className="space-y-0.5">{MAIN_NAV.map(renderNavLink)}</div>

        <div className="border-t border-gray-100 dark:border-gray-800/80" />

        {/* Section 2: IELTS Modules */}
        <div className="space-y-0.5">{EXAM_MODULES_NAV.map(renderNavLink)}</div>

        <div className="border-t border-gray-100 dark:border-gray-800/80" />

        {/* Section 3: Tools & Practice */}
        <div className="space-y-0.5">
          {TOOLS_NAV.map(renderNavLink)}

          {/* More Tools Collapsible */}
          <button
            onClick={() => setMoreToolsOpen((v) => !v)}
            className={cn(
              "w-full flex items-center justify-between rounded-xl px-3 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-100/80 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/60 transition-all",
              collapsed && "justify-center px-2"
            )}
          >
            <div className="flex items-center gap-2.5">
              <Wrench className="h-4 w-4 text-gray-400 shrink-0" />
              {!collapsed && <span>More Tools</span>}
            </div>
            {!collapsed && (
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-gray-400 transition-transform",
                  moreToolsOpen && "rotate-180"
                )}
              />
            )}
          </button>

          {moreToolsOpen && !collapsed && (
            <div className="pl-7 pr-2 py-1 space-y-1 text-xs text-gray-500 dark:text-gray-400">
              <Link
                href="/dashboard/foundation"
                className="block py-1.5 hover:text-blue-600 dark:hover:text-blue-400"
              >
                • Grammar Lab (A1–C1)
              </Link>
              <Link
                href="/dashboard/foundation?tab=vocab"
                className="block py-1.5 hover:text-blue-600 dark:hover:text-blue-400"
              >
                • Oxford 3000 Vocab SRS
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Unlock Premium & User Widget */}
      <div className="p-2.5 border-t border-gray-100 dark:border-gray-800 space-y-2.5">
        {!collapsed ? (
          <>
            <Link
              href="/dashboard/upgrade"
              className="flex items-center justify-between rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-2.5 text-white shadow-sm hover:opacity-95 transition"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/20">
                  <Crown className="h-3.5 w-3.5 text-amber-300" />
                </div>
                <div>
                  <p className="text-xs font-bold leading-none">Unlock Premium</p>
                  <p className="text-[10px] text-violet-100 mt-0.5">
                    Unlimited · AI feedback
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-white/80" />
            </Link>

            {/* Free plan usage bars */}
            <div className="px-1 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-gray-400">
                <div className="h-1.5 flex-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mr-2">
                  <div className="h-full w-1/12 bg-violet-500 rounded-full" />
                </div>
                <span>0/1</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-gray-400">
                <div className="h-1.5 flex-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mr-2">
                  <div className="h-full w-1/12 bg-violet-500 rounded-full" />
                </div>
                <span>0/1</span>
              </div>
            </div>
          </>
        ) : (
          <Link
            href="/dashboard/upgrade"
            className="flex h-9 w-9 mx-auto items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
            title="Unlock Premium"
          >
            <Crown className="h-4 w-4 text-amber-300" />
          </Link>
        )}

        {/* User Footer */}
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center justify-between rounded-xl px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition",
            collapsed && "justify-center"
          )}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-orange-500 text-xs font-bold text-white">
              {initial}
            </div>
            {!collapsed && (
              <span className="truncate text-xs font-semibold text-gray-800 dark:text-gray-200">
                {displayName}
              </span>
            )}
          </div>
          {!collapsed && <ChevronRight className="h-3.5 w-3.5 text-gray-400" />}
        </Link>
      </div>
    </aside>
  );
}
