import { formatDistanceToNow, format } from "date-fns";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}

export function formatDate(dateString: string): string {
  return format(new Date(dateString), "MMMM d, yyyy");
}

export function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n.toString();
}

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function categoryColor(category: string): string {
  const map: Record<string, string> = {
    National: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Politics: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    Entertainment: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    Metro: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    Sport: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Opinion: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Business: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  };
  return map[category] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
}