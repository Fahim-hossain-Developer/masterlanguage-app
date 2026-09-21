import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  iconClassName?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  iconClassName,
  className,
}: StatCardProps) {
  const isPositive = trend?.positive ?? (trend ? trend.value >= 0 : undefined);

  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-6 shadow-card",
        "dark:border-gray-700 dark:bg-gray-900",
        "transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1 flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {value}
          </p>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            "bg-primary-100 text-primary-600",
            "dark:bg-primary-900/30 dark:text-primary-400",
            iconClassName
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
              isPositive
                ? "bg-success-100 text-success-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-danger-100 text-danger-700 dark:bg-red-900/30 dark:text-red-400"
            )}
          >
            {isPositive ? "↑" : "↓"}
            {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {trend.label}
          </span>
        </div>
      )}
    </div>
  );
}
