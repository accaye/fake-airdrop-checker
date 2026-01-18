// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Define font FIRST before using it
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Am I Eligible? - Fake Airdrop Checker",
  description: "Check if you're eligible for the $FAKE token airdrop! Just for fun.",
  // Base App ID verification
  other: {
    'base:app_id': '6968d7444991800a6d9d64b9', // Ganti dengan ID sebenarnya
  },
};

// HANYA SATU default export yang diperbolehkan
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}