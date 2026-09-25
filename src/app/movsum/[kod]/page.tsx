import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionPage } from "@/components/SectionPage";

const SEASON_CODE = /^\d{4}-(0[1-9]|1[0-2])$/;

export async function generateMetadata({ params }: PageProps<"/movsum/[kod]">): Promise<Metadata> {
  const { kod } = await params;
  return { title: `Mövsüm ${kod} — Meloviziya` };
}

export default async function SeasonPage({ params }: PageProps<"/movsum/[kod]">) {
  const { kod } = await params;
  if (!SEASON_CODE.test(kod)) notFound();

  // The title already carries the code, so the eyebrow is the site name, not the season label.
  return <SectionPage title={`Mövsüm ${kod}`} eyebrow="Meloviziya" empty="Hələ iddia yoxdur" accent="magenta" />;
}
