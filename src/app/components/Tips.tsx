"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "@/i18n";

export default function Tips() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-cream-light overflow-hidden">
      <div className="absolute top-[-100px] right-[-200px] w-[500px] h-[500px] bg-sage-green/5 blob pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-150px] w-[400px] h-[400px] bg-river-blue/5 blob-2 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24">
        {/* ── Praktični nasveti ── */}
        <ScrollReveal className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-deep-navy mb-8">
            {t.tips.card1Title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
            {t.tips.card1Tips.map((tip, i) => (
              <p key={i} className="text-deep-navy/70 text-base leading-relaxed pl-6 border-l-2 border-forest-green/30">
                {tip}
              </p>
            ))}
          </div>
        </ScrollReveal>

        {/* Divider */}
        <div className="w-16 h-1 bg-gradient-to-r from-river-blue to-forest-green mx-auto rounded-full mb-16" />

        {/* ── Kaj lahko naredim? ── */}
        <ScrollReveal>
          <h3 className="text-2xl sm:text-3xl font-bold text-deep-navy mb-8">
            {t.tips.card2Title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
            {t.tips.card2Tips.map((tip, i) => (
              <p key={i} className="text-deep-navy/70 text-base leading-relaxed pl-6 border-l-2 border-river-blue/30">
                {tip}
              </p>
            ))}
          </div>
        </ScrollReveal>

        {/* Mascot — bottom right decorative */}
        <div className="absolute bottom-6 right-6 w-28 h-28 sm:w-36 sm:h-36 opacity-15 pointer-events-none">
          <Image
            src="/mascot-opt/happy.webp"
            alt=""
            width={144}
            height={144}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
