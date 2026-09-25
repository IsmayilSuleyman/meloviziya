import { type Accent, spotStyle } from "@/lib/nav";

/**
 * Eyebrow and title in the display face, lit by a spotlight in the section colour.
 * The eyebrow is the section's own descriptor: the season label on season-bound
 * pages, "Meloviziya" on site-level ones. Each page passes its own.
 */
export function PageHeader({ title, accent, eyebrow }: { title: string; accent: Accent; eyebrow: string }) {
  return (
    <div className="page-stage mb-8 sm:mb-10" style={spotStyle(accent)}>
      <p className="eyebrow num">{eyebrow}</p>
      <h1 className="page-title mt-3">{title}</h1>
    </div>
  );
}
