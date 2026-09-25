import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";
import { SEASON_LABEL } from "@/lib/season-facts";

export const metadata: Metadata = { title: "Reyestr — Meloviziya" };

export default function LedgerPage() {
  return <SectionPage title="Reyestr" eyebrow={SEASON_LABEL} empty="Mövsüm hələ başlamayıb" accent="green" />;
}
