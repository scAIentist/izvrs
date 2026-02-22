"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import RiversMap from "./RiversMap";
import { useTranslation } from "@/i18n";

export default function About() {
  const { t } = useTranslation();
  return (
    <>
      {/* ═══════════════════════════════════════════════
          SCREEN 1: O projektu
          ═══════════════════════════════════════════════ */}
      <section id="o-projektu" className="relative bg-warm-white overflow-hidden scroll-mt-20">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-[-200px] w-[500px] h-[500px] bg-river-blue/5 blob pointer-events-none" />
        <div className="absolute bottom-40 left-[-150px] w-[400px] h-[400px] bg-sage-green/5 blob-2 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 min-h-[70vh] flex flex-col items-center justify-center py-24">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-deep-navy mb-4">
              {t.about.title}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-river-blue to-forest-green mx-auto rounded-full" />
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="w-full max-w-3xl">
            <div className="relative bg-white rounded-2xl p-8 sm:p-10 shadow-lg shadow-black/5 border border-slate-dark/5 overflow-hidden">
              {/* Mascot peeking in bottom-right corner */}
              <div className="absolute -bottom-2 -right-3 w-28 h-28 sm:w-36 sm:h-36 opacity-20 pointer-events-none select-none">
                <Image
                  src="/mascot-opt/satisfied.webp"
                  alt={t.about.mascotAlt}
                  width={144}
                  height={144}
                  className="object-contain"
                  aria-hidden="true"
                />
              </div>

              <h3 className="text-lg font-bold text-deep-navy mb-4 leading-snug">
                {t.about.subtitle}
              </h3>

              <div className="space-y-3 text-slate-dark/70 leading-relaxed text-[15px] relative z-10">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <p>{t.about.p3}</p>
              </div>

              {/* EU strip */}
              <div className="mt-6 pt-5 border-t border-slate-dark/5 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
                <div className="flex items-center gap-2 text-xs text-slate-dark/40">
                  <span className="text-base">🇪🇺</span>
                  {t.about.euText}
                </div>
                <a
                  href="https://tethys4adrion.interreg-ipa-adrion.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-river-blue hover:text-river-blue-dark text-xs font-semibold transition-colors"
                >
                  {t.about.projectLink}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SCREEN 2: Zemljevid regije
          ═══════════════════════════════════════════════ */}
      <section className="relative bg-cream-light overflow-hidden">
        <div className="absolute top-[-100px] left-[-200px] w-[600px] h-[600px] bg-forest-green/4 blob pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[-150px] w-[450px] h-[450px] bg-river-blue/5 blob-2 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-deep-navy mb-3">
              {t.about.mapTitle}
            </h2>
            <p className="text-slate-dark/60 max-w-xl mx-auto">
              {t.about.mapSubtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <RiversMap />
          </ScrollReveal>
        </div>

        {/* Wave to dark tracker section */}
        <div className="relative h-24 -mb-1">
          <svg viewBox="0 0 1440 100" fill="none" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0 50 Q360 85 720 50 T1440 50 V100 H0Z" fill="#0D1B2A" />
          </svg>
        </div>
      </section>
    </>
  );
}
