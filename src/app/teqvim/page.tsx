import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";
import { SEASON_LABEL } from "@/lib/season-facts";

export const metadata: Metadata = { title: "Təqvim — Meloviziya" };

export default function CalendarPage() {
  return <SectionPage title="Təqvim" eyebrow={SEASON_LABEL} empty="Mövsüm hələ başlamayıb" accent="orange" />;
}
