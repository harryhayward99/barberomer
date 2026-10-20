import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Top padding aligned with the homepage hero eyebrow. */
export const pageStartPad = "pt-8 sm:pt-10 lg:pt-14";
export const sectionPad = "py-20 lg:py-28";
export const sectionPadBottom = "pb-20 lg:pb-28";
