import type { Metadata } from "next";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = { title: "Təqvim — Meloviziya" };

export default function CalendarPage() {
  return <Placeholder title="Təqvim" empty="Mövsüm hələ başlamayıb" />;
}
