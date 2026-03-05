"use client";

import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "@/i18n";

const ICONS_1 = ["🚰", "🛒", "🍱", "🚭"];
const ICONS_2 = ["🛍️", "🤔", "♻️", "📦", "🗑️"];

export default function Tips() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-cream-light overflow-hidden">
      <div className="absolute top-20 right-[-200px] w-[500px] h-[500px] bg-river-blue/5 blob pointer-events-none" />
      <div className="absolute bottom-40 left-[-150px] w-[400px] h-[400px] bg-sage-green/5 blob-2 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24">
        {/* Alert banner */}
        <ScrollReveal className="w-full max-w-4xl mx-auto mb-8">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-rose-500 shadow-lg shadow-red-500/20 px-6 sm:px-10 py-8 text-center">
            <span className="absolute top-3 left-4 text-2xl opacity-30 select-none">🌊</span>
            <span className="absolute bottom-3 right-4 text-2xl opacity-30 select-none">🌊</span>
            <span className="absolute top-3 right-12 text-xl opacity-20 select-none">🐟</span>
            <span className="absolute bottom-3 left-12 text-xl opacity-20 select-none">🐟</span>

            <p className="text-white/95 font-semibold text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {t.tips.alertBefore}
            </p>
            <p className="mt-3 mb-3">
              <span className="text-white font-black text-4xl sm:text-5xl drop-shadow-md">
                {t.tips.alertStat}
              </span>
            </p>
            <p className="text-white/95 font-semibold text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {t.tips.alertAfter}
            </p>
            <p className="mt-3 text-white/50 text-xs tracking-wide">
              ({t.tips.alertSource})
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="w-full max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-slate-dark/5 bg-white">
            <div className="h-1.5 bg-gradient-to-r from-forest-green via-river-blue to-forest-green" />

            {/* Title row */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="px-8 sm:px-10 pt-8 pb-4 md:border-r border-slate-dark/8">
                <h3 className="text-lg sm:text-xl font-bold text-deep-navy leading-snug">
                  {t.tips.card1Title}
                </h3>
              </div>
              <div className="px-8 sm:px-10 pt-8 pb-4 hidden md:block">
                <h3 className="text-lg sm:text-xl font-bold text-deep-navy leading-snug">
                  {t.tips.card2Title}
                </h3>
              </div>
            </div>

            {/* Content row */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="px-8 sm:px-10 pb-8 md:border-r border-slate-dark/8">
                <ul className="space-y-4">
                  {t.tips.card1Tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 text-lg leading-none mt-0.5">{ICONS_1[i]}</span>
                      <span className="text-slate-dark/70 text-[15px] leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-8 sm:px-10 pb-8 border-t md:border-t-0 border-slate-dark/8">
                {/* Mobile-only title */}
                <h3 className="text-lg font-bold text-deep-navy leading-snug mb-4 md:hidden pt-6">
                  {t.tips.card2Title}
                </h3>
                <ul className="space-y-4">
                  {t.tips.card2Tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 text-lg leading-none mt-0.5">{ICONS_2[i]}</span>
                      <span className="text-slate-dark/70 text-[15px] leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
