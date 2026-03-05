"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "@/i18n";

export default function Tips() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-cream-light overflow-hidden py-20">
      <div className="absolute top-[-100px] right-[-200px] w-[500px] h-[500px] bg-sage-green/5 blob pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-150px] w-[400px] h-[400px] bg-river-blue/5 blob-2 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Card 1 */}
          <ScrollReveal>
            <div className="relative bg-sage-green-light/40 rounded-3xl p-8 sm:p-10 h-full overflow-hidden">
              <h3 className="text-xl sm:text-2xl font-extrabold text-deep-navy leading-tight mb-8 uppercase tracking-wide">
                {t.tips.card1Title}
              </h3>

              <ol className="space-y-4 relative z-10">
                {t.tips.card1Tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-forest-green text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-deep-navy/80 font-semibold text-[15px] leading-relaxed">
                      {tip}
                    </span>
                  </li>
                ))}
              </ol>

              {/* Mascot — decorative corner */}
              <div className="absolute bottom-3 right-3 w-32 h-32 sm:w-40 sm:h-40 opacity-20 pointer-events-none">
                <Image
                  src="/mascot-opt/happy.webp"
                  alt=""
                  width={160}
                  height={160}
                  className="object-contain"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2 */}
          <ScrollReveal delay={0.15}>
            <div className="relative bg-sage-green-light/40 rounded-3xl p-8 sm:p-10 h-full overflow-hidden">
              <h3 className="text-xl sm:text-2xl font-extrabold text-deep-navy leading-tight mb-8 uppercase tracking-wide">
                {t.tips.card2Title}
              </h3>

              <ol className="space-y-4 relative z-10">
                {t.tips.card2Tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-river-blue text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-deep-navy/80 font-semibold text-[15px] leading-relaxed">
                      {tip}
                    </span>
                  </li>
                ))}
              </ol>

              {/* Mascot — decorative corner */}
              <div className="absolute bottom-3 right-3 w-32 h-32 sm:w-40 sm:h-40 opacity-20 pointer-events-none">
                <Image
                  src="/mascot-opt/satisfied.webp"
                  alt=""
                  width={160}
                  height={160}
                  className="object-contain"
                />
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
