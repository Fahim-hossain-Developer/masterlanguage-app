"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "./layout-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((v) => !v)}
        />
      </div>

      {/* Header */}
      <Header
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={() => setSidebarCollapsed((v) => !v)}
      />

      {/* Main content */}
      <main
        className={cn(
          "min-h-screen pt-16 pb-20 md:pb-0 transition-all duration-250",
          "md:pl-64",
          sidebarCollapsed && "md:pl-[72px]"
        )}
      >
        <div className="h-full p-4 md:p-6 lg:p-8">{children}</div>
      </main>

      {/* Mobile bottom navigation */}
      <MobileNav />
    </div>
  );
}
