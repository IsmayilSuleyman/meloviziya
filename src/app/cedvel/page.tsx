import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";

export const metadata: Metadata = { title: "Cədvəl — Meloviziya" };

export default function ScoreboardPage() {
  return <SectionPage title="Cədvəl" empty="Nəticələr açıqlama günü burada görünəcək" accent="violet" />;
}
