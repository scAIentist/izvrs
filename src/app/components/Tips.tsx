"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "@/i18n";

const BADGE_COLORS = [
  "bg-river-blue text-white",
  "bg-forest-green-light text-white",
  "bg-amber text-white",
  "bg-river-blue-dark text-white",
  "bg-forest-green text-white",
  "bg-amber-light text-deep-navy",
  "bg-river-blue text-white",
  "bg-sage-green text-deep-navy",
  "bg-river-blue-dark text-white",
];

export default function Tips() {
  const { t, lang } = useTranslation();

  return (
    <section id="odpadki" className="relative overflow-hidden scroll-mt-20" style={{ background: "linear-gradient(180deg, #c4f5f7 0%, #d4e8d4 100%)" }}>
      {/* Decorative blobs */}
      <div className="absolute top-10 right-[-150px] w-[400px] h-[400px] bg-river-blue/15 blob pointer-events-none" />
      <div className="absolute bottom-20 left-[-120px] w-[350px] h-[350px] bg-sage-green/15 blob-2 pointer-events-none" />
      <div className="absolute top-[50%] left-[50%] w-[300px] h-[300px] bg-amber/8 blob pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24">
        {/* 1. Alert banner */}
        <ScrollReveal playful className="w-full max-w-4xl mx-auto mb-12">
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

        {/* 2. Trash composition chart (language-dependent) */}
        <ScrollReveal playful delay={0.05} className="w-full max-w-5xl mx-auto mb-12">
          <Image
            src={lang === "en" ? "/smeti-chart-en.png" : "/smeti-chart-sl.png"}
            alt={lang === "en" ? "Composition of waste in rivers" : "Sestava odpadkov v rekah"}
            width={800}
            height={450}
            className="w-full h-auto"
          />
        </ScrollReveal>

        {/* 3. Images */}
        <ScrollReveal playful delay={0.1} className="w-full max-w-3xl mx-auto mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-xl shadow-black/10">
              <Image
                src="/smeti.png"
                alt="Odpadki v vodnih ekosistemih"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl shadow-black/10">
              <Image
                src="/smeti2.png"
                alt="Posledice plastike v naravi"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* 3. "Kaj lahko naredim?" — big section heading */}
        <ScrollReveal playful delay={0.15} className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-forest-green">
            {t.tips.heading}
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-river-blue via-forest-green to-amber mx-auto rounded-full mt-4" />
        </ScrollReveal>

        {/* 4. Combined tips list */}
        <ScrollReveal playful delay={0.2} className="w-full max-w-3xl mx-auto">
          <h3 className="text-lg sm:text-xl font-bold text-forest-green mb-6 text-center">
            🌿 {t.tips.tipsTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {t.tips.allTips.map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-3 group hover:bg-white/50 rounded-xl px-4 py-3 transition-colors"
              >
                <span className={`flex-shrink-0 w-8 h-8 rounded-full ${BADGE_COLORS[i]} flex items-center justify-center text-sm font-bold shadow-sm group-hover:scale-110 transition-transform`}>
                  {i + 1}
                </span>
                <span className="text-slate-dark/80 text-[15px] leading-relaxed font-medium pt-1">{tip}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
