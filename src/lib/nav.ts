/** Each section has its own stage-light colour: --c-<accent> and --n-<accent> in globals.css. */
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

/** Readable section colour for text and borders on the page background. */
export function accentVar(accent: Accent): string {
  return `var(--c-${accent})`;
}

/** Bright version of the section colour for use on the dark header. */
export function neonVar(accent: Accent): string {
  return `var(--n-${accent})`;
}
