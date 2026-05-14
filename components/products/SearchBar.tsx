"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  value: string;
  onChange: (next: string) => void;
  placeholder: string;
  ariaLabel: string;
  clearLabel: string;
};

/**
 * Compact search input used in the catalog header (top-right).
 *
 * Controlled — owns no internal state. The parent (`ProductsCatalog`)
 * owns the query so search + filter + URL stay aligned.
 */
export function SearchBar({
  value,
  onChange,
  placeholder,
  ariaLabel,
  clearLabel,
}: SearchBarProps) {
  return (
    <div className="relative w-full md:w-80 lg:w-96">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-foreground/45 dark:text-white/45" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={cn(
          "h-10 w-full rounded-full border bg-card pl-10 pr-10 text-sm text-foreground placeholder:text-foreground/45",
          "border-border shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-300",
          "focus-visible:border-[var(--brand-solid)]/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-solid)]",
          "dark:bg-white/[0.04] dark:border-white/10 dark:text-white dark:placeholder:text-white/40 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        )}
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label={clearLabel}
          className={cn(
            "absolute top-1/2 right-2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-foreground/55 transition-colors duration-200",
            "hover:text-foreground hover:bg-foreground/[0.06]",
            "dark:text-white/60 dark:hover:text-white dark:hover:bg-white/[0.08]",
          )}
        >
          <X className="h-3.5 w-3.5" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="9" cy="9" r="6" />
      <path d="m17 17-3.5-3.5" />
    </svg>
  );
}
