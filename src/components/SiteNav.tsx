"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, isActive, spotStyle } from "@/lib/nav";

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
      className="nav-scroller -mx-4 overflow-x-auto px-4 py-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
      // Browsers only scroll a fully hidden tab into view on focus; a half-cut one
      // would keep its label and focus ring clipped, so scroll it ourselves.
      onFocus={(e) => e.target.scrollIntoView({ block: "nearest", inline: "nearest" })}
    >
      {/* inline-flex keeps the scroller's end padding, so the last tab never sits flush with the edge. */}
      <ul className="nav-tabs whitespace-nowrap text-body-sm font-medium">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive(item.href, pathname) ? "page" : undefined}
              style={spotStyle(item.accent)}
              className="nav-tab"
            >
              <span aria-hidden className="nav-swatch" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
