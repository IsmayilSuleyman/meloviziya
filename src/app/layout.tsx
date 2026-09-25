import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { PillLink } from "@/components/PillLink";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

const display = localFont({
  src: "./fonts/Unbounded[wght].woff2",
  weight: "200 900",
  display: "swap",
  variable: "--font-unbounded",
});

export const metadata: Metadata = {
  title: "Meloviziya",
  description: "Aylıq onlayn mahnı müsabiqəsi",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL;

  return (
    <html lang="az" className={`${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a href="#esas-mezmun" className="skip-link">
          Əsas məzmuna keç
        </a>
        <header className="stage">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 pt-4 pb-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-3">
            <Link href="/" className="wordmark self-start">
              Meloviziya
            </Link>
            <SiteNav />
          </div>
          <div className="stripe" aria-hidden />
        </header>
        <main id="esas-mezmun" tabIndex={-1} className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
          {children}
        </main>
        <footer className="border-t border-rule text-ink-2">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-body-sm sm:px-6">
            <p>Meloviziya Avropa Yayım Birliyi ilə əlaqəli deyil.</p>
            {telegramUrl ? (
              <PillLink href={telegramUrl} variant="secondary" external>
                Telegram qrupu
              </PillLink>
            ) : null}
          </div>
        </footer>
      </body>
    </html>
  );
}
