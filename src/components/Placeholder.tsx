import type { CSSProperties } from "react";
import { type Accent, accentVar } from "@/lib/nav";

export function Placeholder({
  title,
  empty,
  accent,
}: {
  title: string;
  empty: string;
  accent: Accent;
}) {
  return (
    <div style={{ "--section": accentVar(accent) } as CSSProperties}>
      <h1 className="page-title">{title}</h1>
      <p className="empty-card mt-6">{empty}</p>
    </div>
  );
}
