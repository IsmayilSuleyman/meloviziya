import { PillLink } from "@/components/PillLink";
import { PosterTile } from "@/components/PosterTile";
import { CLAIMS_OPEN_LABEL, SEASON_LABEL, SEASON_NUMERAL } from "@/lib/season-facts";

export default function HomePage() {
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL;

  return (
    <PosterTile accent="rose">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="badge tnum">{SEASON_LABEL}</p>
          <h1 className="hero-title mt-6">Meloviziya</h1>
          <p className="mt-4 text-lg font-medium">Aylıq onlayn mahnı müsabiqəsi</p>
        </div>
        <p aria-hidden className="numeral numeral-ghost tnum md:pr-2">
          {SEASON_NUMERAL}
        </p>
      </div>
      <hr className="rule" />
      <p className="poster-text">Mövsüm hələ başlamayıb</p>
      <p className="mt-4 max-w-prose text-lg">
        İddia dövrü başlayır: <span className="tnum font-semibold">{CLAIMS_OPEN_LABEL}</span> (Bakı vaxtı).
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
