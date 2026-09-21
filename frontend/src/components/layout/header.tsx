"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Bell, Sun, Moon, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/auth.store";
import { useAuth } from "@/hooks/use-auth";
import { getInitials } from "@/lib/utils";
import { Sidebar } from "@/app/(dashboard)/layout-sidebar";

interface HeaderProps {
  sidebarCollapsed: boolean;
  onSidebarToggle: () => void;
}

export function Header({ sidebarCollapsed, onSidebarToggle }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      {mobileSidebarOpen && (
        <div className="fixed left-0 top-0 z-40 h-full w-64 md:hidden">
          <Sidebar
            collapsed={false}
            onToggle={() => setMobileSidebarOpen(false)}
          />
        </div>
      )}

      <header className="fixed top-0 right-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80 transition-all duration-250"
        style={{
          left: sidebarCollapsed ? "72px" : "256px",
        }}
      >
        {/* Left: Mobile menu + Search */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="hidden md:flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 w-64">
            <Search className="h-4 w-4 text-gray-400 shrink-0" />
            <input
              type="search"
              placeholder="Search lessons, tests…"
              className="bg-transparent text-sm text-gray-700 dark:text-gray-300 placeholder:text-gray-400 outline-none w-full"
            />
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button variant="ghost" size="icon-sm" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger-500 ring-2 ring-white dark:ring-gray-950" />
          </Button>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors outline-none">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user?.profile?.avatarUrl}
                    alt={user?.profile?.name}
                  />
                  <AvatarFallback className="text-xs">
                    {user?.profile?.name
                      ? getInitials(user.profile.name)
                      : "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white leading-none">
                    {user?.profile?.name ?? "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {user?.role ?? "STUDENT"}
                  </p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {user?.profile?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href="/dashboard/settings">⚙️ Settings</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/dashboard/subscription">💎 Subscription</a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-danger-600 dark:text-danger-400 focus:text-danger-600"
                onClick={logout}
              >
                🚪 Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}
