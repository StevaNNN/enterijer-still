"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { HOME_SECTION_HASHES } from "@/lib/home-section-anchors";

/** Pixels from viewport top; aligns with fixed navbar height. */
const SCROLL_SPY_TOP_OFFSET_PX = 96;

function computeActiveHash(): string {
  let next: string = HOME_SECTION_HASHES[0];
  for (const hash of HOME_SECTION_HASHES) {
    const el = document.querySelector(hash);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= SCROLL_SPY_TOP_OFFSET_PX) {
      next = hash;
    }
  }
  return next;
}

type ActiveSectionContextValue = {
  activeHash: string | null;
};

const ActiveSectionContext = createContext<ActiveSectionContextValue>({
  activeHash: null,
});

export function ActiveSectionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  const isHomePage = pathname === `/${locale}`;

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!isHomePage) {
        return () => {};
      }

      let rafId: number | null = null;
      const schedule = () => {
        if (rafId !== null) return;
        rafId = window.requestAnimationFrame(() => {
          rafId = null;
          onStoreChange();
        });
      };

      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      schedule();

      return () => {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        if (rafId !== null) {
          window.cancelAnimationFrame(rafId);
        }
      };
    },
    [isHomePage],
  );

  const getSnapshot = useCallback(() => {
    if (!isHomePage || typeof document === "undefined") {
      return null;
    }
    return computeActiveHash();
  }, [isHomePage]);

  const getServerSnapshot = useCallback(() => null, []);

  const activeHash = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <ActiveSectionContext.Provider value={{ activeHash }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSectionHash() {
  return useContext(ActiveSectionContext).activeHash;
}
