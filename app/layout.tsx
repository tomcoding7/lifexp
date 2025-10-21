import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hunter System - Level Up Your Life",
  description: "Solo Leveling inspired life tracker. Complete daily missions, gain XP, and evolve beyond your limits.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}


