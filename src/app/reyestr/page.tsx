import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";

export const metadata: Metadata = { title: "Reyestr — Meloviziya" };

export default function LedgerPage() {
  return <SectionPage title="Reyestr" empty="Mövsüm hələ başlamayıb" accent="green" />;
}
