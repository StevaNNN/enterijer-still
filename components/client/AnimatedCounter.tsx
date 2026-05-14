"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Drives one or more numeric counters from 0 to their target value in a
 * single shared elapsed-time loop, so multiple counters with different
 * end values still finish at the exact same moment.
 *
 * Used by `ReferencesSection` to animate the "partners count" and
 * "clients count" in lockstep when the section scrolls into view.
 *
 * Accessibility:
 *  - Counter values are rendered with `aria-live="polite"` so screen
 *    readers can announce the final value without spamming during the
 *    in-between frames.
 *  - When the user has `prefers-reduced-motion: reduce`, the counters
 *    snap straight to their final values (no tween).
 */
export type AnimatedStat = {
  /** Target end value, e.g. 26. */
  value: number;
  /** Visible label below the number, already translated. */
  label: string;
  /** Optional suffix appended after the number (e.g. "+"). */
  suffix?: string;
};

export default function AnimatedCounter({
  items,
  durationMs = 2200,
  className,
}: {
  items: readonly AnimatedStat[];
  /** Total animation duration shared by all items. Default 2200ms. */
  durationMs?: number;
  className?: string;
}) {
  const [values, setValues] = useState<number[]>(() => items.map(() => 0));
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDListElement | null>(null);

  // Kick off the animation only when the counter scrolls into view.
  // Honor `prefers-reduced-motion: reduce` by skipping the tween and
  // snapping to the final value (still deferred through rAF so we never
  // setState synchronously inside the effect body).
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      const rafId = window.requestAnimationFrame(() => {
        setValues(items.map((it) => it.value));
        setHasStarted(true);
      });
      return () => window.cancelAnimationFrame(rafId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [items]);

  // Run a single rAF loop that drives every counter from 0 -> target on
  // the same `durationMs` timeline; eased with easeOutCubic so the numbers
  // decelerate naturally into their final values.
  useEffect(() => {
    if (!hasStarted) return;

    let rafId = 0;
    let startTs = 0;
    const targets = items.map((it) => it.value);

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeOutCubic(progress);
      const next = targets.map((target) => Math.round(target * eased));
      setValues(next);
      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [hasStarted, items, durationMs]);

  return (
    <dl
      ref={containerRef}
      aria-live="polite"
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-10 gap-y-3 md:gap-x-16",
        className,
      )}
    >
      {items.map((item, index) => (
        <div
          key={item.label}
          className="flex flex-col items-center text-center"
        >
          <dt className="text-5xl font-bold tracking-tight text-[var(--brand)] md:text-6xl lg:text-7xl tabular-nums">
            {values[index] ?? 0}
            {item.suffix ?? "+"}
          </dt>
          <dd className="mt-2 text-xs font-medium uppercase tracking-[0.28em] text-foreground/60 md:text-sm">
            {item.label}
          </dd>
          {index < items.length - 1 ? null : null}
        </div>
      ))}
    </dl>
  );
}
