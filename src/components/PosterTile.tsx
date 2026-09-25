import type { CSSProperties, ReactNode } from "react";
import { type Accent, neonVar } from "@/lib/nav";

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
    <section
      style={{ "--spot": neonVar(accent) } as CSSProperties}
      className={tall ? "poster poster-tall" : "poster"}
    >
      {children}
    </section>
  );
}
