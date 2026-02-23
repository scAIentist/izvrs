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
      <section id="o-projektu" className="relative bg-cream-light overflow-hidden scroll-mt-20">
        <div className="absolute top-20 right-[-200px] w-[500px] h-[500px] bg-river-blue/5 blob pointer-events-none" />
        <div className="absolute bottom-40 left-[-150px] w-[400px] h-[400px] bg-sage-green/5 blob-2 pointer-events-none" />


        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 min-h-[70vh] flex flex-col items-center justify-center py-24">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-deep-navy mb-4">
              {t.about.title}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-river-blue to-forest-green mx-auto rounded-full" />
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="w-full max-w-4xl">
            <div className="rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-slate-dark/5 bg-white">
              {/* Accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-river-blue via-forest-green to-river-blue" />

              {/* Subtitle + mascot */}
              <div className="px-8 sm:px-10 pt-8 pb-6 flex items-start gap-5 border-b border-slate-dark/5">
                <div className="hidden sm:block flex-shrink-0 w-14 h-14 relative">
                  <Image
                    src="/mascot-opt/satisfied.webp"
                    alt={t.about.mascotAlt}
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-deep-navy leading-snug pt-1">
                  {t.about.subtitle}
                </h3>
              </div>

              {/* Body */}
              <div className="px-8 sm:px-10 py-8 space-y-4 text-slate-dark/70 leading-relaxed text-base">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <p>{t.about.p3}</p>
              </div>

              {/* Footer strip */}
              <div className="bg-slate-50 px-8 sm:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-dark/5">
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
        <div className="absolute top-[30%] left-[-250px] w-[500px] h-[500px] bg-forest-green/4 blob pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[-150px] w-[450px] h-[450px] bg-river-blue/5 blob-2 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-deep-navy mb-3">
              {t.about.mapTitle}
            </h2>
            <p className="text-slate-dark/60 max-w-xl mx-auto text-base">
              {t.about.mapSubtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <RiversMap />
          </ScrollReveal>

          {/* Tracker info + game link */}
          <ScrollReveal delay={0.2} className="mt-12 max-w-3xl mx-auto text-center space-y-8">
            <p className="text-slate-dark/70 text-base leading-relaxed">
              {t.about.trackersText}
            </p>
            <Link
              href="/igra"
              className="inline-flex items-center gap-2 px-6 py-3 bg-river-blue text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              {t.about.gameLink}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
