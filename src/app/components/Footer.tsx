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

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 mb-8">
          {/* Logo & mascot */}
          <div className="flex items-center gap-3">
            <Image
              src="/mascot-opt/happy.webp"
              alt="Izvrstna"
              width={44}
              height={44}
              className="opacity-80"
            />
            <div>
              <span className="text-white font-bold text-lg block leading-tight">
                Izvrstna
              </span>
              <span className="text-white/30 text-xs">
                {t.footer.mascotSubtitle}
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://tethys4adrion.interreg-ipa-adrion.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-river-blue text-sm transition-colors duration-200"
            >
              TETHYS4ADRION
            </a>
            <a
              href="https://www.izvrs.si/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-river-blue text-sm transition-colors duration-200"
            >
              IzVRS
            </a>
            <a
              href="https://www.ki.si/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-river-blue text-sm transition-colors duration-200"
            >
              {t.footer.chemInstitute}
            </a>
          </div>
        </div>

        {/* EU disclaimer */}
        <div className="border-t border-white/5 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-white/25 text-xs">
              <span className="text-lg">🇪🇺</span>
              <span>{t.footer.euText}</span>
            </div>
            <p className="text-white/20 text-xs">
              &copy; {new Date().getFullYear()} TETHYS4ADRION
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
