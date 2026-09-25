import type { Accent } from "@/lib/nav";
import { PageHeader } from "@/components/PageHeader";
import { PosterTile } from "@/components/PosterTile";

/** A section page before its data exists: header plus its empty state as a poster tile. */
export function SectionPage({
  title,
  eyebrow,
  empty,
  accent,
}: {
  title: string;
  eyebrow: string;
  /** One of the empty-state strings from CLAUDE.md, verbatim. */
  empty: string;
  accent: Accent;
}) {
  return (
    <>
      <PageHeader title={title} eyebrow={eyebrow} accent={accent} />
      <PosterTile accent={accent} tall>
        <p className="poster-text">{empty}</p>
      </PosterTile>
    </>
  );
}
