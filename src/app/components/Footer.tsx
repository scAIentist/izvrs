"use client";

import Image from "next/image";
import { useTranslation } from "@/i18n";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="relative bg-deep-navy overflow-hidden">
      {/* Subtle top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-river-blue/30 to-transparent" />

      {/* Decorative blobs */}
      <div className="absolute top-0 left-[-100px] w-[300px] h-[300px] bg-river-blue/3 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-50px] w-[200px] h-[200px] bg-forest-green/3 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Logos */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
          <a href="https://tethys4adrion.interreg-ipa-adrion.eu/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/footer-logos.png"
              alt="Interreg IPA ADRION — Co-funded by the European Union — TETHYS4ADRION"
              width={500}
              height={80}
              className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </a>
          <a href="https://www.izvrs.si/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/izvrs-logo.png"
              alt="IzVRS — Inštitut za vode Republike Slovenije"
              width={200}
              height={50}
              className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </a>
        </div>

        {/* EU disclaimer + copyright */}
        <div className="border-t border-white/5 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            {t.footer.euText}
          </p>
          <p className="text-white/25 text-xs">
            &copy; {new Date().getFullYear()} IzVRS
          </p>
        </div>
      </div>
    </footer>
  );
}
