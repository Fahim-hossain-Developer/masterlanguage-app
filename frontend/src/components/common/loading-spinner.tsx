import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  label?: string;
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-4",
  xl: "h-16 w-16 border-4",
};

export function LoadingSpinner({
  size = "md",
  className,
  label,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3", className)}
      role="status"
      aria-label={label ?? "Loading…"}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-primary-200 border-t-primary-600",
          sizeMap[size]
        )}
      />
      {label && (
        <span className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
          {label}
        </span>
      )}
      <span className="sr-only">{label ?? "Loading…"}</span>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary-100 border-t-primary-600" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-primary-600 font-bold text-sm">ML</span>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm animate-pulse">
          Loading MasterLanguage…
        </p>
      </div>
    </div>
  );
}
