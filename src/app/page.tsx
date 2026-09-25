import { PillLink } from "@/components/PillLink";
import { PosterTile } from "@/components/PosterTile";
import { CLAIMS_OPEN_LABEL, SEASON_LABEL, SEASON_NUMERAL } from "@/lib/season-facts";

export default function HomePage() {
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL;

  return (
    <PosterTile tone="rose">
      <p className="badge num">{SEASON_LABEL}</p>
      <div className="mt-6 flex items-end justify-between gap-6">
        <h1 className="hero-title min-w-0">Meloviziya</h1>
        {/* The ghosted season numeral sits on the title's baseline, on wide screens only. */}
        <p aria-hidden className="numeral numeral-ghost num hidden shrink-0 lg:block lg:pr-2">
          {SEASON_NUMERAL}
        </p>
      </div>
      <p className="mt-4 text-body-lg font-medium">Aylıq onlayn mahnı müsabiqəsi</p>
      <hr className="rule" />
      <h2 className="poster-text">Mövsüm hələ başlamayıb</h2>
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
