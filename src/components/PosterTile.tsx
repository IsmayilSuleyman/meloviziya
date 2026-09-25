import type { ReactNode } from "react";
import { type Tone, toneProps } from "@/lib/nav";

/** A flat block in the section's spot colour (or ink) with contrasting text: the poster tile. */
export function PosterTile({
  tone,
  tall = false,
  children,
}: {
  tone: Tone;
  /** Stretch to poster height and push the content to the bottom edge. */
  tall?: boolean;
  children: ReactNode;
}) {
  const { className, style } = toneProps(tone);
  return (
    <section style={style} className={["poster", tall ? "poster-tall" : "", className ?? ""].join(" ").trim()}>
      {children}
    </section>
  );
}
