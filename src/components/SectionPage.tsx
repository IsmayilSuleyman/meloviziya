import type { Accent } from "@/lib/nav";
import { PageHeader } from "@/components/PageHeader";
import { PosterTile } from "@/components/PosterTile";

/** A section page before its data exists: header plus its empty state as a poster tile. */
export function SectionPage({ title, empty, accent }: { title: string; empty: string; accent: Accent }) {
  return (
    <>
      <PageHeader title={title} accent={accent} />
      <PosterTile accent={accent} tall>
        <p className="poster-text">{empty}</p>
      </PosterTile>
    </>
  );
}
