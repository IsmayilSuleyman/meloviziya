import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  /** External links open in the same tab but never leak the referrer. */
  external?: boolean;
};

/** Pill-shaped button link: filled ink (primary) or outlined in the current colour. */
export function PillLink({ href, children, variant = "primary", external = false }: Props) {
  const className = `btn btn-${variant}`;
  if (external) {
    return (
      <a href={href} className={className} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
