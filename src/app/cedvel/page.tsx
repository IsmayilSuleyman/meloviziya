import type { Metadata } from "next";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = { title: "Cədvəl — Meloviziya" };

export default function ScoreboardPage() {
  return <Placeholder title="Cədvəl" empty="Nəticələr açıqlama günü burada görünəcək" accent="violet" />;
}
