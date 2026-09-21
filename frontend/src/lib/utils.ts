import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines clsx and tailwind-merge for conditional class management.
 * Ensures Tailwind classes are properly merged without conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number with commas as thousands separator
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

/**
 * Truncate a string to a given length
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

/**
 * Get user initials from full name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Sleep for a given number of milliseconds (useful for testing)
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if a value is a valid email
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Convert bytes to human-readable file size
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Get a color class for band score
 */
export function getBandColor(score: number): string {
  if (score >= 8) return "text-success-500";
  if (score >= 6.5) return "text-secondary-500";
  if (score >= 5) return "text-warning-500";
  return "text-danger-500";
}

/**
 * Get JLPT level color
 */
export function getJLPTColor(level: string): string {
  const colors: Record<string, string> = {
    N1: "bg-red-500",
    N2: "bg-orange-500",
    N3: "bg-yellow-500",
    N4: "bg-green-500",
    N5: "bg-blue-500",
  };
  return colors[level] ?? "bg-gray-500";
}
