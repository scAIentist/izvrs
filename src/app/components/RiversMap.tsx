"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { rivers } from "../data/rivers";
import { partners } from "../data/partners";
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

  return (
    <div className="relative">
      {/* Leaflet map */}
      <div className="max-w-4xl mx-auto">
        <RiversMapLeaflet />
      </div>

      {/* Partners — infinite scrolling logo carousel */}
      <div className="mt-6 max-w-5xl mx-auto">
        <h4 className="text-xs font-semibold text-slate-dark/40 uppercase tracking-widest mb-5 text-center">
          {t.about.partnersTitle}
        </h4>
        <div className="relative overflow-hidden mask-fade">
          <div className="flex w-max animate-scroll-logos gap-12 sm:gap-16 items-center py-4">
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
              return (
                <div
                  key={`${p.id}-${i}`}
                  className="flex-shrink-0 flex items-center justify-center h-20 sm:h-24 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
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
