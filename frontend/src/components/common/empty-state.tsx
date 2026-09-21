import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
    >
      {/* Illustration placeholder */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        {Icon ? (
          <Icon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
        ) : (
          <svg
            className="h-12 w-12 text-gray-400 dark:text-gray-500"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M24 8C15.163 8 8 15.163 8 24s7.163 16 16 16 16-7.163 16-16S32.837 8 24 8zm0 4c6.627 0 12 5.373 12 12s-5.373 12-12 12S12 30.627 12 24 17.373 12 24 12z"
              fill="currentColor"
              opacity="0.3"
            />
            <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.6" />
          </svg>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      {description && (
        <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400 mb-6">
          {description}
        </p>
      )}

      {action && (
        <Button onClick={action.onClick} size="lg">
          {action.label}
        </Button>
      )}
    </div>
  );
}
