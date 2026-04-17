import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const fontSans = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
});

const fontSerif = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Elora • Your Daily Celestial Guide",
  description: "Experience the universe's wisdom with a minimalist, AI-powered horoscope.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontSerif.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
