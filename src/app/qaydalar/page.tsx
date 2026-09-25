import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";

export const metadata: Metadata = { title: "Qaydalar — Meloviziya" };

export default function RulesPage() {
  return <SectionPage title="Qaydalar" eyebrow="Meloviziya" empty="Mövsüm hələ başlamayıb" accent="teal" />;
}
