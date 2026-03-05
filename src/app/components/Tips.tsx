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
        <ScrollReveal className="w-full max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-slate-dark/5 bg-white">
            <div className="h-1.5 bg-gradient-to-r from-forest-green via-river-blue to-forest-green" />

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-dark/8">
              {/* Left — Praktični nasveti */}
              <div className="px-8 sm:px-10 py-8">
                <h3 className="text-lg sm:text-xl font-bold text-deep-navy leading-snug mb-6 md:min-h-[3.25rem]">
                  {t.tips.card1Title}
                </h3>
                <ul className="space-y-4">
                  {t.tips.card1Tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 text-lg leading-none mt-0.5">{ICONS_1[i]}</span>
                      <span className="text-slate-dark/70 text-[15px] leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — Kaj lahko naredim? */}
              <div className="px-8 sm:px-10 py-8">
                <h3 className="text-lg sm:text-xl font-bold text-deep-navy leading-snug mb-6 md:min-h-[3.25rem]">
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
