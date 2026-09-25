import type { ReactNode } from "react";
import type { Tone } from "@/lib/nav";
import { PosterTile } from "@/components/PosterTile";

/** An empty-state string from CLAUDE.md, verbatim, as a tall poster tile in the section colour. */
export function EmptyState({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <PosterTile tone={tone} tall>
      <p className="poster-text">{children}</p>
    </PosterTile>
  );
}
