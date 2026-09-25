import type { CSSProperties } from "react";

/**
 * Each section has a flat poster "spot" colour (--n-<accent> in globals.css, the
 * same in both schemes, always carrying ink text) and a text-safe shade of it for
 * use on the page background (--c-<accent>).
 */
export type Accent = "rose" | "teal" | "orange" | "magenta" | "violet" | "green" | "blue" | "amber";

export type NavItem = { href: string; label: string; accent: Accent };

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "Ana səhifə", accent: "rose" },
  { href: "/qaydalar", label: "Qaydalar", accent: "teal" },
  { href: "/teqvim", label: "Təqvim", accent: "orange" },
  { href: "/movsum", label: "Mövsüm", accent: "magenta" },
  { href: "/cedvel", label: "Cədvəl", accent: "violet" },
  { href: "/reyestr", label: "Reyestr", accent: "green" },
  { href: "/olkeler", label: "Ölkələr", accent: "blue" },
  { href: "/arxiv", label: "Arxiv", accent: "amber" },
];

export function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Readable section colour for text on the page background. */
export function accentVar(accent: Accent): string {
  return `var(--c-${accent})`;
}

/** Flat spot colour of the section: poster tiles, the active nav tab, swatches. */
export function neonVar(accent: Accent): string {
  return `var(--n-${accent})`;
}

/** Inline style that hands a section's spot colour and text shade to the CSS classes. */
export function spotStyle(accent: Accent): CSSProperties {
  return { "--spot": neonVar(accent), "--spot-text": accentVar(accent) } as CSSProperties;
}
