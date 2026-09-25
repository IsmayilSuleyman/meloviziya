import { type Accent, accentVar } from "@/lib/nav";
import { SEASON_LABEL } from "@/lib/season-facts";

/** Eyebrow in the section colour above the page title in the display face. */
export function PageHeader({
  title,
  accent,
  eyebrow = SEASON_LABEL,
}: {
  title: string;
  accent: Accent;
  eyebrow?: string;
}) {
  return (
    <header className="mb-8 sm:mb-10">
      <p className="eyebrow tnum" style={{ color: accentVar(accent) }}>
        {eyebrow}
      </p>
      <h1 className="page-title mt-3">{title}</h1>
    </header>
  );
}
