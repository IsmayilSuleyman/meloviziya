import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";

export const metadata: Metadata = { title: "Ölkələr — Meloviziya" };

export default function CountriesPage() {
  return <SectionPage title="Ölkələr" empty="Hələ iddia yoxdur" accent="blue" />;
}
