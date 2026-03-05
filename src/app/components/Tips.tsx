"use client";

import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "@/i18n";

const BADGE_COLORS_1 = [
  "bg-river-blue text-white",
  "bg-forest-green-light text-white",
  "bg-amber text-white",
  "bg-river-blue-dark text-white",
];

const BADGE_COLORS_2 = [
  "bg-forest-green text-white",
  "bg-amber-light text-deep-navy",
  "bg-river-blue text-white",
  "bg-sage-green text-deep-navy",
  "bg-river-blue-dark text-white",
];

export default function Tips() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #c4f5f7 0%, #d4e8d4 100%)" }}>
      {/* Decorative blobs — more visible now */}
      <div className="absolute top-10 right-[-150px] w-[400px] h-[400px] bg-river-blue/15 blob pointer-events-none" />
      <div className="absolute bottom-20 left-[-120px] w-[350px] h-[350px] bg-sage-green/15 blob-2 pointer-events-none" />
      <div className="absolute top-[50%] left-[50%] w-[300px] h-[300px] bg-amber/8 blob pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24">
        {/* Alert banner */}
        <ScrollReveal playful className="w-full max-w-4xl mx-auto mb-10">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-rose-400 via-red-400 to-rose-400 shadow-xl shadow-rose-400/20 px-6 sm:px-10 py-8 text-center">
            <span className="absolute top-3 left-4 text-3xl opacity-40 select-none animate-float-slow">🌊</span>
            <span className="absolute bottom-3 right-4 text-3xl opacity-40 select-none animate-float">🌊</span>
            <span className="absolute top-4 right-10 text-2xl opacity-30 select-none animate-wiggle-slow">🐟</span>
            <span className="absolute bottom-4 left-10 text-2xl opacity-30 select-none animate-wiggle-slow">🐟</span>

            <p className="text-white/95 font-semibold text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {t.tips.alertBefore}
            </p>
            <p className="mt-3 mb-3">
              <span className="text-white font-black text-5xl sm:text-6xl drop-shadow-lg animate-pulse-glow">
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

        {/* Tips card */}
        <ScrollReveal playful delay={0.15} className="w-full max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-xl shadow-black/8 border border-white/50" style={{ background: "linear-gradient(135deg, #d4e8d4 0%, #ffffff 40%, #ffffff 60%, #c4f5f7 100%)" }}>
            <div className="h-2 bg-gradient-to-r from-forest-green via-river-blue to-amber" />

            {/* Title row */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="px-8 sm:px-10 pt-8 pb-4 md:border-r border-sage-green/20">
                <h3 className="text-lg sm:text-xl font-bold text-forest-green leading-snug flex items-center gap-2">
                  <span className="text-2xl">🌿</span> {t.tips.card1Title}
                </h3>
              </div>
              <div className="px-8 sm:px-10 pt-8 pb-4 hidden md:block">
                <h3 className="text-lg sm:text-xl font-bold text-river-blue-dark leading-snug flex items-center gap-2">
                  <span className="text-2xl">💡</span> {t.tips.card2Title}
                </h3>
              </div>
            </div>

            {/* Content row */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="px-8 sm:px-10 pb-8 md:border-r border-sage-green/20">
                <ul className="space-y-4">
                  {t.tips.card1Tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 group hover:bg-white/60 rounded-xl px-3 py-2 -mx-3 transition-colors">
                      <span className={`flex-shrink-0 w-7 h-7 rounded-full ${BADGE_COLORS_1[i]} flex items-center justify-center text-xs font-bold shadow-sm group-hover:scale-110 transition-transform`}>
                        {i + 1}
                      </span>
                      <span className="text-slate-dark/80 text-[15px] leading-relaxed font-medium">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-8 sm:px-10 pb-8 border-t md:border-t-0 border-sage-green/20">
                <h3 className="text-lg font-bold text-river-blue-dark leading-snug mb-4 md:hidden pt-6 flex items-center gap-2">
                  <span className="text-2xl">💡</span> {t.tips.card2Title}
                </h3>
                <ul className="space-y-4">
                  {t.tips.card2Tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 group hover:bg-white/60 rounded-xl px-3 py-2 -mx-3 transition-colors">
                      <span className={`flex-shrink-0 w-7 h-7 rounded-full ${BADGE_COLORS_2[i]} flex items-center justify-center text-xs font-bold shadow-sm group-hover:scale-110 transition-transform`}>
                        {i + 1}
                      </span>
                      <span className="text-slate-dark/80 text-[15px] leading-relaxed font-medium">{tip}</span>
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
