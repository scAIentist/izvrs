import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Izvrstna | TETHYS4ADRION",
  description:
    "Spoznajte Izvrstno, soško postrv, ki ozavešča o plastičnih odpadkih v rekah. Projekt TETHYS4ADRION — sledenje odpadkom v 5 rekah Jadransko-jonske regije.",
  keywords: [
    "TETHYS4ADRION",
    "Soča",
    "plastični odpadki",
    "reke",
    "Jadransko morje",
    "GPS sledilniki",
    "energetska revščina",
  ],
  openGraph: {
    title: "Izvrstna | TETHYS4ADRION",
    description:
      "Spoznajte Izvrstno, soško postrv, ki ozavešča o plastičnih odpadkih v rekah.",
    type: "website",
    locale: "sl_SI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sl" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
