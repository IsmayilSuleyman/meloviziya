import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";

export const metadata: Metadata = { title: "Arxiv — Meloviziya" };

export default function ArchivePage() {
  return <SectionPage title="Arxiv" empty="Arxiv boşdur" accent="amber" />;
}
