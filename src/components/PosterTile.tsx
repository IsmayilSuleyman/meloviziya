import type { ReactNode } from "react";
import { type Accent, spotStyle } from "@/lib/nav";

/** A flat block in the section's spot colour with ink text: the poster tile. */
export function PosterTile({
  accent,
  tall = false,
  children,
}: {
  accent: Accent;
  /** Stretch to poster height and push the content to the bottom edge. */
  tall?: boolean;
  children: ReactNode;
}) {
  return (
    <section style={spotStyle(accent)} className={tall ? "poster poster-tall" : "poster"}>
      {children}
    </section>
  );
}
