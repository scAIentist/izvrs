"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { rivers } from "../data/rivers";
import { partners } from "../data/partners";
import { riverColors } from "../data/riverPaths";
import { useTranslation } from "@/i18n";

/* Lazy-load the Leaflet map so SSR doesn't break */
const RiversMapLeaflet = dynamic(() => import("./RiversMapLeaflet"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] rounded-2xl bg-cream/50 flex items-center justify-center text-slate-dark/40 text-sm">
      Nalaganje zemljevida...
    </div>
  ),
});

export default function RiversMap() {
  const { t } = useTranslation();
  const [selectedRiver, setSelectedRiver] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* River selector buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {rivers.map((river) => {
          const isActive = selectedRiver === river.id;
          const color = riverColors[river.id] || "#2AABE0";
          const label = river.name.split("/")[0].trim();
          return (
            <button
              key={river.id}
              onClick={() => setSelectedRiver(isActive ? null : river.id)}
              className="relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer border-2 hover:scale-105 hover:shadow-md"
              style={{
                borderColor: color,
                background: isActive ? color : "transparent",
                color: isActive ? "white" : color,
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Leaflet map */}
      <div className="max-w-4xl mx-auto">
        <RiversMapLeaflet selectedRiver={selectedRiver} />
      </div>

      {/* Partners — infinite scrolling logo carousel */}
      <div className="mt-16 max-w-5xl mx-auto">
        <h4 className="text-sm font-semibold text-slate-dark/50 uppercase tracking-widest mb-3 text-center">
          {t.about.partnersTitle}
        </h4>
        <div className="relative overflow-hidden mask-fade">
          <div className="flex w-max animate-scroll-logos items-center py-4">
            {/* Duplicate the list for seamless infinite loop */}
            {[...partners, ...partners].map((p, i) => {
              /* Per-logo height tweaks so all look balanced */
              const sizeClass =
                p.id === "izvrs"
                  ? "h-10 sm:h-12"       /* wide banner — keep smaller */
                  : p.id === "ki"
                    ? "h-20 sm:h-24"     /* square — needs bigger */
                    : p.id === "capljina" || p.id === "metkovic"
                      ? "h-10 sm:h-12"  /* coat of arms — smaller */
                      : p.id === "mio"
                        ? "h-12 sm:h-14" /* MIO — a bit smaller */
                        : "h-16 sm:h-20"; /* default */
              const widthClass =
                p.id === "izvrs"
                  ? "w-[230px] sm:w-[270px]"   /* wide banner — wider container */
                  : "w-[140px] sm:w-[180px]";
              return (
                <div
                  key={`${p.id}-${i}`}
                  className={`flex-shrink-0 ${widthClass} flex items-center justify-center h-20 sm:h-24 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-opacity duration-300`}
                  title={p.name}
                >
                  <Image
                    src={p.logo}
                    alt={p.name}
                    width={200}
                    height={96}
                    className={`${sizeClass} w-auto object-contain`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
