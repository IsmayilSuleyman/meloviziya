import type { ReactNode } from "react";
import type { Accent } from "@/lib/nav";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";

/**
 * A section page: header plus its body. Without children the body is the
 * empty state as a poster tile; once a page has data it passes its content as
 * children and keeps the same header.
 */
export function SectionPage({
  title,
  eyebrow,
  empty,
  accent,
  children,
}: {
  title: string;
  eyebrow: string;
  /** One of the empty-state strings from CLAUDE.md, verbatim. */
  empty: string;
  accent: Accent;
  children?: ReactNode;
}) {
  return (
    <>
      <PageHeader title={title} eyebrow={eyebrow} tone={accent} />
      {children ?? <EmptyState tone={accent}>{empty}</EmptyState>}
    </>
  );
}
