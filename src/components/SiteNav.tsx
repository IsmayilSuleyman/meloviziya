"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, isActive } from "@/lib/nav";

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Əsas menyu" className="-mx-4 overflow-x-auto px-4">
      <ul className="flex gap-1 whitespace-nowrap text-sm">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href, pathname);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`block rounded px-2.5 py-1.5 ${
                  active ? "bg-accent text-accent-contrast" : "hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
