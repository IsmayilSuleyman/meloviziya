import type { Metadata } from "next";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = { title: "Ölkələr — Meloviziya" };

export default function CountriesPage() {
  return <Placeholder title="Ölkələr" empty="Hələ iddia yoxdur" accent="blue" />;
}
