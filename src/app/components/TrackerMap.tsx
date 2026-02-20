"use client";

import dynamic from "next/dynamic";
import ScrollReveal from "./ScrollReveal";

const MapContent = dynamic(() => import("./MapContent"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] rounded-xl bg-slate-dark/50 flex items-center justify-center">
      <div className="text-white/50 text-sm">Nalaganje zemljevida...</div>
    </div>
  ),
});

export default function TrackerMap() {
  return (
    <section id="sledilci" className="py-20 bg-deep-navy">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            GPS Sledilci v Soči
          </h2>
          <div className="w-20 h-1 bg-forest-green mx-auto rounded-full mb-4" />
          <p className="text-white/60 max-w-2xl mx-auto">
            Spremljanje potovanja 12 GPS sledilnikov po reki Soči v živo. Vsak
            sledilnik nosi risbo enega od učencev, ki sodelujejo v projektu.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {/* Legend */}
          <div className="flex justify-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#27AE60]" />
              <span className="text-white/60 text-sm">Aktiven</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#888888]" />
              <span className="text-white/60 text-sm">Neaktiven</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#C0392B]" />
              <span className="text-white/60 text-sm">Ustavljen</span>
            </div>
          </div>

          <MapContent />
        </ScrollReveal>
      </div>
    </section>
  );
}
