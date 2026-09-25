"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, isActive, neonVar } from "@/lib/nav";

export function SiteNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // On a narrow screen the nav scrolls sideways; centre the current section.
  // Setting scrollLeft (rather than scrollIntoView) leaves the keyboard focus
  // starting point alone, so the first Tab still reaches the skip link.
  useEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!nav || !active) return;
    nav.scrollLeft = active.offsetLeft - (nav.clientWidth - active.offsetWidth) / 2;
  }, [pathname]);

  return (
    <nav
      ref={navRef}
      aria-label="Əsas menyu"
      className="-mx-4 overflow-x-auto px-4 py-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
    >
      <ul className="flex gap-1.5 whitespace-nowrap text-sm font-medium">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href, pathname);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                style={{ "--spot": neonVar(item.accent) } as CSSProperties}
                className={active ? "nav-pill nav-pill-active" : "nav-pill"}
              >
                <span aria-hidden className="nav-swatch" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
