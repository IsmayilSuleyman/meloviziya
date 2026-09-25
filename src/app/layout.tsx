import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meloviziya",
  description: "Aylıq onlayn mahnı müsabiqəsi",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL;

  return (
    <html lang="az" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <header className="stage">
          <div className="mx-auto max-w-4xl px-4 pt-5 pb-4">
            <Link href="/" className="wordmark text-3xl">
              Meloviziya
            </Link>
            <div className="mt-3">
              <SiteNav />
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6">{children}</main>
        <footer className="site-footer">
          <div className="mx-auto max-w-4xl space-y-1 px-4 py-4 text-sm">
            {telegramUrl ? (
              <p>
                <a href={telegramUrl} className="font-semibold text-white underline decoration-[#ff3d8b] decoration-2 underline-offset-4" rel="noopener noreferrer">
                  Telegram qrupu
                </a>
              </p>
            ) : null}
            <p>Meloviziya Avropa Yayım Birliyi ilə əlaqəli deyil.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
