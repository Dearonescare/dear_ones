/**
 * Small, dependency-free class-name joiner (like a trimmed `clsx`).
 * Accepts strings and falsy values so conditional classes stay readable.
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
