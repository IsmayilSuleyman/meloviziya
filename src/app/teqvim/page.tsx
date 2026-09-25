import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";

export const metadata: Metadata = { title: "Təqvim — Meloviziya" };

export default function CalendarPage() {
  return <SectionPage title="Təqvim" empty="Mövsüm hələ başlamayıb" accent="orange" />;
}
