"use client";

import Image from "next/image";
import WaveDivider from "./WaveDivider";
import { useTranslation } from "@/i18n";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="relative overflow-hidden">
      {/* Wave transition from content to footer */}
      <WaveDivider from="#c4f5f7" to="#d4e8d4" />

      <div className="relative z-10 py-10" style={{ background: "linear-gradient(180deg, #d4e8d4 0%, #c4f5f7 100%)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Logos */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
            <a href="https://tethys4adrion.interreg-ipa-adrion.eu/" target="_blank" rel="noopener noreferrer">
              <Image
                src="/footer-logos.png"
                alt="Interreg IPA ADRION — Co-funded by the European Union — TETHYS4ADRION"
                width={500}
                height={80}
                className="h-28 sm:h-36 w-auto opacity-85 hover:opacity-100 transition-opacity"
              />
            </a>
            <a href="https://www.izvrs.si/" target="_blank" rel="noopener noreferrer" className="mt-3 sm:mt-6">
              <Image
                src="/izvrs-logo.png"
                alt="IzVRS — Inštitut za vode Republike Slovenije"
                width={200}
                height={50}
                className="h-10 w-auto opacity-85 hover:opacity-100 transition-opacity"
              />
            </a>
          </div>

          {/* EU disclaimer + copyright */}
          <div className="border-t border-forest-green/15 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-forest-green/50 text-xs">
              {t.footer.euText}
            </p>
            <p className="text-forest-green/50 text-xs">
              &copy; {new Date().getFullYear()} IzVRS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
