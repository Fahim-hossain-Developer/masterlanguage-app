import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm placeholder:text-gray-400",
          "transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-primary-500",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
          "dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500",
          "dark:focus-visible:ring-primary-400",
          error &&
            "border-danger-500 focus-visible:ring-danger-500 dark:border-danger-500",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
