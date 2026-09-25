import type { Metadata } from "next";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = { title: "Arxiv — Meloviziya" };

export default function ArchivePage() {
  return <Placeholder title="Arxiv" empty="Arxiv boşdur" accent="amber" />;
}
