export type NavItem = { href: string; label: string };

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "Ana səhifə" },
  { href: "/qaydalar", label: "Qaydalar" },
  { href: "/teqvim", label: "Təqvim" },
  { href: "/movsum", label: "Mövsüm" },
  { href: "/cedvel", label: "Cədvəl" },
  { href: "/reyestr", label: "Reyestr" },
  { href: "/olkeler", label: "Ölkələr" },
  { href: "/arxiv", label: "Arxiv" },
];

export function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
