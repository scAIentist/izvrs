"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "@/i18n";

const MapContent = dynamic(() => import("./MapContent"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] rounded-xl bg-slate-dark/50 flex items-center justify-center">
      <div className="text-white/50 text-sm">...</div>
    </div>
  ),
});

export default function TrackerMap() {
  const { t } = useTranslation();
  return (
    <section id="sledilci" className="pt-28 pb-20 bg-deep-navy min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t.trackers.title}
          </h2>
          <div className="w-16 h-1 bg-forest-green mx-auto rounded-full mt-3" />
          <p className="text-white/60 text-base max-w-2xl mx-auto mt-4">
            {t.trackers.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {/* Legend */}
          <div className="flex justify-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#27AE60]" />
              <span className="text-white/60 text-sm">{t.trackers.active}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#888888]" />
              <span className="text-white/60 text-sm">{t.trackers.inactive}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 border-t-2 border-dashed border-[#2AABE0]" />
              <span className="text-white/60 text-sm">{t.trackers.path}</span>
            </div>
          </div>

          <MapContent />
        </ScrollReveal>
      </div>
    </section>
  );
}
