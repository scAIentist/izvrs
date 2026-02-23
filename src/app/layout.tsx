import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Izvrstna",
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
    title: "Izvrstna",
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
      <body className={`${roboto.variable} font-sans antialiased`}>
        <Providers>
          <Navigation />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
