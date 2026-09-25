import { PillLink } from "@/components/PillLink";
import { PosterTile } from "@/components/PosterTile";
import { CLAIMS_OPEN_LABEL, SEASON_LABEL, SEASON_NUMERAL } from "@/lib/season-facts";

export default function HomePage() {
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL;

  return (
    <PosterTile accent="rose">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="badge num">{SEASON_LABEL}</p>
          <h1 className="hero-title mt-6">Meloviziya</h1>
          <p className="mt-4 text-body-lg font-medium">Aylıq onlayn mahnı müsabiqəsi</p>
        </div>
        {/* The ghosted season numeral anchors the title on wide screens only. */}
        <p aria-hidden className="numeral numeral-ghost num hidden md:block md:pr-2">
          {SEASON_NUMERAL}
        </p>
      </div>
      <hr className="rule" />
      <p className="text-heading-md font-semibold">Mövsüm hələ başlamayıb</p>
      <p className="mt-3 max-w-prose text-body-lg">
        İddia dövrü başlayır: <span className="num font-semibold">{CLAIMS_OPEN_LABEL}</span> (Bakı vaxtı).
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <PillLink href="/qaydalar">Qaydalar</PillLink>
        {telegramUrl ? (
          <PillLink href={telegramUrl} variant="secondary" external>
            Telegram qrupu
          </PillLink>
        ) : null}
      </div>
    </PosterTile>
  );
}
