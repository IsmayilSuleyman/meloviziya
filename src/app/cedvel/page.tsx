import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";
import { SEASON_LABEL } from "@/lib/season-facts";

export const metadata: Metadata = { title: "Cədvəl — Meloviziya" };

export default function ScoreboardPage() {
  return (
    <SectionPage
      title="Cədvəl"
      eyebrow={SEASON_LABEL}
      empty="Nəticələr açıqlama günü burada görünəcək"
      accent="violet"
    />
  );
}
