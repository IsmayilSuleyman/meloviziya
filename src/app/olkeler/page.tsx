import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";
import { SEASON_LABEL } from "@/lib/season-facts";

export const metadata: Metadata = { title: "Ölkələr — Meloviziya" };

export default function CountriesPage() {
  return <SectionPage title="Ölkələr" eyebrow={SEASON_LABEL} empty="Hələ iddia yoxdur" accent="blue" />;
}
