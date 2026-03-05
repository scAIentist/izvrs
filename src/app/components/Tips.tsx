"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "@/i18n";

export default function Tips() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-cream-light overflow-hidden py-20">
      {/* Decorative blobs */}
      <div className="absolute top-[-100px] right-[-200px] w-[500px] h-[500px] bg-sage-green/5 blob pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-150px] w-[400px] h-[400px] bg-river-blue/5 blob-2 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Praktični nasveti */}
          <ScrollReveal>
            <div className="relative bg-sage-green-light/40 rounded-3xl p-8 sm:p-10 h-full overflow-hidden">
              <h3 className="text-xl sm:text-2xl font-extrabold text-deep-navy leading-tight mb-6 uppercase tracking-wide">
                {t.tips.card1Title}
              </h3>
              <ul className="space-y-4 mb-20">
                {t.tips.card1Tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-forest-green/15 flex items-center justify-center text-forest-green text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-deep-navy/80 font-semibold text-[15px] leading-snug">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
              {/* Mascot */}
              <div className="absolute bottom-4 right-4 w-28 h-28 sm:w-36 sm:h-36">
                <Image
                  src="/mascot-opt/happy.webp"
                  alt="Izvrstna"
                  width={144}
                  height={144}
                  className="object-contain drop-shadow-lg"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Kaj lahko naredim? */}
          <ScrollReveal delay={0.15}>
            <div className="relative bg-sage-green-light/40 rounded-3xl p-8 sm:p-10 h-full overflow-hidden">
              <h3 className="text-xl sm:text-2xl font-extrabold text-deep-navy leading-tight mb-6 uppercase tracking-wide">
                {t.tips.card2Title}
              </h3>
              <ul className="space-y-4">
                {t.tips.card2Tips.map((tip, i) => {
                  const icons = ["🛍️", "🤔", "🚫", "♻️", "🗑️"];
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-river-blue/15 flex items-center justify-center text-sm">
                        {icons[i]}
                      </span>
                      <span className="text-deep-navy/80 font-semibold text-[15px] leading-snug">
                        {tip}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
