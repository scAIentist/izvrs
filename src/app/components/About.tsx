"use client";

import Image from "next/image";
import Link from "next/link";
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
      <section id="o-projektu" className="relative overflow-hidden scroll-mt-20" style={{ background: "linear-gradient(180deg, #d4e8d4 0%, #c4f5f7 60%, #fff4dc 100%)" }}>
        <div className="absolute top-20 right-[-200px] w-[500px] h-[500px] bg-river-blue/12 blob pointer-events-none" />
        <div className="absolute bottom-40 left-[-150px] w-[400px] h-[400px] bg-sage-green/12 blob-2 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 min-h-[70vh] flex flex-col items-center justify-center py-24">
          <ScrollReveal playful className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-forest-green mb-4">
              {t.about.title}
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-river-blue via-forest-green to-amber mx-auto rounded-full" />
          </ScrollReveal>

          <ScrollReveal playful delay={0.1} className="w-full max-w-4xl">
            <div className="rounded-2xl overflow-hidden shadow-xl shadow-black/8 border border-white/50" style={{ background: "linear-gradient(135deg, #ffffff 0%, #d4e8d4 100%)" }}>
              {/* Accent bar */}
              <div className="h-2 bg-gradient-to-r from-river-blue via-forest-green to-amber" />

              {/* Subtitle + mascot */}
              <div className="px-8 sm:px-10 pt-8 pb-6 flex items-start gap-5 border-b border-sage-green/20">
                <div className="hidden sm:block flex-shrink-0 w-20 h-20 relative animate-float-slow">
                  <Image
                    src="/mascot-opt/satisfied.webp"
                    alt={t.about.mascotAlt}
                    width={80}
                    height={80}
                    className="object-contain drop-shadow-md"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-forest-green leading-snug pt-1">
                  {t.about.subtitle}
                </h3>
              </div>

              {/* Body */}
              <div className="px-8 sm:px-10 py-8 space-y-4 text-slate-dark/80 leading-relaxed text-base font-medium">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <p>{t.about.p3}</p>
              </div>

              {/* Footer strip */}
              <div className="bg-sage-green-light/30 px-8 sm:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-sage-green/20">
                <div className="flex items-center gap-2 text-xs text-slate-dark/50">
                  <span className="text-base">🇪🇺</span>
                  {t.about.euText}
                </div>
                <a
                  href="https://tethys4adrion.interreg-ipa-adrion.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-river-blue-dark hover:text-river-blue text-xs font-semibold transition-colors"
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
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #fff4dc 0%, #fce8a5 50%, #ffffff 100%)" }}>
        <div className="absolute top-[30%] left-[-250px] w-[500px] h-[500px] bg-amber/10 blob pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[-150px] w-[450px] h-[450px] bg-river-blue/10 blob-2 pointer-events-none" />

        {/* Decorative fish */}
        <span className="absolute top-16 right-[10%] text-4xl opacity-15 animate-float-slow select-none pointer-events-none">🐟</span>
        <span className="absolute bottom-24 left-[8%] text-3xl opacity-15 animate-float select-none pointer-events-none">🐠</span>

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
          <ScrollReveal playful className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-amber mb-3">
              {t.about.mapTitle}
            </h2>
            <p className="text-slate-dark/60 max-w-xl mx-auto text-base">
              {t.about.mapSubtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal playful delay={0.15}>
            <RiversMap />
          </ScrollReveal>

          {/* Tracker info + game link */}
          <ScrollReveal playful delay={0.2} className="mt-12 max-w-3xl mx-auto text-center space-y-8">
            <p className="text-slate-dark/70 text-base leading-relaxed font-medium">
              {t.about.trackersText}
            </p>
            <Link
              href="/igra"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-river-blue to-river-blue-dark text-white font-bold text-lg rounded-full shadow-lg shadow-river-blue/30 hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition-all animate-bounce-gentle"
            >
              🎮 {t.about.gameLink}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
