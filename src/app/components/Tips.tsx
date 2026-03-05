"use client";

import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "@/i18n";

export default function Tips() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-cream-light overflow-hidden">
      <div className="absolute top-20 right-[-200px] w-[500px] h-[500px] bg-river-blue/5 blob pointer-events-none" />
      <div className="absolute bottom-40 left-[-150px] w-[400px] h-[400px] bg-sage-green/5 blob-2 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 min-h-[70vh] flex flex-col items-center justify-center py-24">
        {/* ── Praktični nasveti ── */}
        <ScrollReveal className="w-full max-w-4xl mb-16">
          <div className="rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-slate-dark/5 bg-white">
            <div className="h-1.5 bg-gradient-to-r from-forest-green via-sage-green to-forest-green" />
            <div className="px-8 sm:px-10 pt-8 pb-2">
              <h3 className="text-lg sm:text-xl font-bold text-deep-navy leading-snug">
                {t.tips.card1Title}
              </h3>
            </div>
            <div className="px-8 sm:px-10 py-6 space-y-3 text-slate-dark/70 leading-relaxed text-base">
              {t.tips.card1Tips.map((tip, i) => (
                <p key={i}>{tip}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ── Kaj lahko naredim? ── */}
        <ScrollReveal className="w-full max-w-4xl">
          <div className="rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-slate-dark/5 bg-white">
            <div className="h-1.5 bg-gradient-to-r from-river-blue via-sky-400 to-river-blue" />
            <div className="px-8 sm:px-10 pt-8 pb-2">
              <h3 className="text-lg sm:text-xl font-bold text-deep-navy leading-snug">
                {t.tips.card2Title}
              </h3>
            </div>
            <div className="px-8 sm:px-10 py-6 space-y-3 text-slate-dark/70 leading-relaxed text-base">
              {t.tips.card2Tips.map((tip, i) => (
                <p key={i}>{tip}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
