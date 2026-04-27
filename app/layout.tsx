import type { Metadata } from "next";
import "./globals.css";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Студия колористики Риды Яшиной — Уфа | Окрашивание волос",
  description:
    "Премиальный лендинг студии колористики Риды Яшиной в Уфе: окрашивание, тонирование, уход, отзывы и быстрая запись.",
  icons: {
    icon: `${base}/assets/brand/logo.webp`,
    shortcut: `${base}/assets/brand/logo.webp`,
    apple: `${base}/assets/brand/logo.webp`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
