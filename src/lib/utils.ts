import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared vertical rhythm — keep start/end of every section identical. */
export const pageStartPad = "pt-8 sm:pt-10 lg:pt-12";
export const sectionPadY = "py-16 sm:py-20 lg:py-24";
export const sectionPadTop = "pt-16 sm:pt-20 lg:pt-24";
export const sectionPadBottom = "pb-16 sm:pb-20 lg:pb-24";
/** @deprecated alias — prefer sectionPadY */
export const sectionPad = sectionPadY;

export const eyebrowClass =
  "text-[12px] font-medium uppercase tracking-[0.18em] text-muted sm:text-[13px]";

/**
 * One shared lift shadow — buttons on page cream, header bar, panels.
 * Do not use on controls sitting on light surface / header chrome.
 */
export const liftShadow =
  "shadow-[0_4px_10px_rgba(28,24,21,0.14),0_10px_22px_rgba(28,24,21,0.2)]";

/** @deprecated alias — use liftShadow */
export const btnSurfaceShadow = liftShadow;

export const btnPrimaryClass =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-barber px-5 text-[12px] font-medium uppercase tracking-[0.16em] text-surface transition-transform duration-200 hover:-translate-y-0.5 hover:bg-barber-deep";

export const btnSecondaryClass =
  `inline-flex min-h-12 items-center justify-center rounded-full border border-ink bg-surface px-5 text-[12px] font-medium uppercase tracking-[0.16em] text-ink transition-transform duration-200 hover:-translate-y-0.5 ${liftShadow}`;

export const btnInkClass =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-5 text-[12px] font-medium uppercase tracking-[0.16em] text-surface transition-transform duration-200 hover:-translate-y-0.5";
