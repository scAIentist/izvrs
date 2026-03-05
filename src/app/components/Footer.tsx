"use client";

import Image from "next/image";
import { useTranslation } from "@/i18n";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="relative bg-white overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-river-blue via-forest-green to-amber" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Logos */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
          <a href="https://tethys4adrion.interreg-ipa-adrion.eu/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/footer-logos.png"
              alt="Interreg IPA ADRION — Co-funded by the European Union — TETHYS4ADRION"
              width={500}
              height={80}
              className="h-20 sm:h-28 w-auto opacity-85 hover:opacity-100 transition-opacity"
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
        <div className="border-t border-gray-200 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-xs">
            {t.footer.euText}
          </p>
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} IzVRS
          </p>
        </div>

        {/* Made by ScAIentist */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          <span className="text-gray-300 text-xs">made by</span>
          <a href="https://www.linkedin.com/company/scaientist/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/scaientist-logo.png"
              alt="ScAIentist"
              width={120}
              height={30}
              className="h-6 w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
