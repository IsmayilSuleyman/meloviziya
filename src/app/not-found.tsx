import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PillLink } from "@/components/PillLink";
import { PosterTile } from "@/components/PosterTile";

export const metadata: Metadata = { title: "Səhifə tapılmadı — Meloviziya" };

export default function NotFound() {
  return (
    <>
      <PageHeader title="Səhifə tapılmadı" tone="ink" eyebrow="Meloviziya" />
      <PosterTile tone="ink" tall>
        <p aria-hidden className="numeral num">
          404
        </p>
        <div className="mt-8">
          <PillLink href="/">Ana səhifəyə qayıt</PillLink>
        </div>
      </PosterTile>
    </>
  );
}
