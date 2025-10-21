import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LifeXP - Gamify Your Life",
  description: "Track your personal growth with a gamified XP system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}


