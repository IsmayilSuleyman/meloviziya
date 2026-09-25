import { PageHeader } from "@/components/PageHeader";
import { PillLink } from "@/components/PillLink";
import { PosterTile } from "@/components/PosterTile";

export default function NotFound() {
  return (
    <>
      <PageHeader title="Səhifə tapılmadı" accent="amber" eyebrow="404" />
      <PosterTile accent="amber" tall>
        <p aria-hidden className="numeral tnum">
          404
        </p>
        <div className="mt-8">
          <PillLink href="/">Ana səhifəyə qayıt</PillLink>
        </div>
      </PosterTile>
    </>
  );
}
