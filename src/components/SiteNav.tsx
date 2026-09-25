"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, isActive, neonVar } from "@/lib/nav";

export function SiteNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // On a narrow screen the nav scrolls sideways; keep the current section in view.
  useEffect(() => {
    navRef.current
      ?.querySelector('[aria-current="page"]')
      ?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [pathname]);

  return (
    <nav ref={navRef} aria-label="Əsas menyu" className="-mx-4 overflow-x-auto px-4 pb-1">
      <ul className="flex gap-1.5 whitespace-nowrap text-sm font-medium">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href, pathname);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                style={{ "--dot": neonVar(item.accent) } as CSSProperties}
                className={`nav-pill ${active ? "nav-pill-active" : ""}`}
              >
                <span aria-hidden className="nav-dot" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
