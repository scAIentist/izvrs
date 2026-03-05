"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { galleryItems, winnerItems, type GalleryItem } from "../data/gallery";
import Lightbox from "./Lightbox";
import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "@/i18n";

// Winners revealed at 12:00 CET on 6.3.2026
const WINNERS_REVEAL = new Date("2026-03-06T11:00:00Z").getTime();

const gradeColors: Record<number, string> = {
  3: "bg-river-blue text-white",
  4: "bg-forest-green text-white",
  5: "bg-amber text-white",
};

const gradeFolders: Record<number, string> = {
  3: "3-razred",
  4: "4-razred",
  5: "5-razred",
};

const filterColors: Record<string, { active: string; inactive: string }> = {
  winners: { active: "bg-gradient-to-r from-amber to-amber-light text-white shadow-lg shadow-amber/30", inactive: "bg-white/80 text-amber hover:bg-amber/10 border-2 border-amber/30" },
  all: { active: "bg-gradient-to-r from-forest-green to-sage-green text-white shadow-lg shadow-forest-green/30", inactive: "bg-white/80 text-forest-green hover:bg-forest-green/10 border-2 border-forest-green/30" },
  "3": { active: "bg-gradient-to-r from-river-blue to-river-blue-light text-white shadow-lg shadow-river-blue/30", inactive: "bg-white/80 text-river-blue-dark hover:bg-river-blue/10 border-2 border-river-blue/30" },
  "4": { active: "bg-gradient-to-r from-forest-green to-forest-green-light text-white shadow-lg shadow-forest-green/30", inactive: "bg-white/80 text-forest-green hover:bg-forest-green/10 border-2 border-forest-green/30" },
  "5": { active: "bg-gradient-to-r from-amber to-amber-light text-white shadow-lg shadow-amber/30", inactive: "bg-white/80 text-amber hover:bg-amber/10 border-2 border-amber/30" },
};

type FilterValue = "winners" | 3 | 4 | 5 | null;

export default function Gallery() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<FilterValue>(null);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [showWinners, setShowWinners] = useState(false);

  useEffect(() => {
    const check = () => setShowWinners(Date.now() >= WINNERS_REVEAL);
    check();
    const id = setInterval(check, 30_000);
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === "winners" && showWinners) return winnerItems;
    if (activeFilter === "winners") return galleryItems; // fallback if not revealed yet
    if (activeFilter) return galleryItems.filter((item) => item.grade === activeFilter);
    return galleryItems;
  }, [activeFilter, showWinners]);

  const navigateLightbox = (direction: 1 | -1) => {
    if (!lightboxItem) return;
    const currentIndex = filtered.findIndex((i) => i.id === lightboxItem.id);
    const nextIndex =
      (currentIndex + direction + filtered.length) % filtered.length;
    setLightboxItem(filtered[nextIndex]);
  };

  const getFilterKey = (value: FilterValue) => value === null ? "all" : String(value);

  return (
    <section id="galerija" className="pt-28 pb-20 min-h-screen" style={{ background: "linear-gradient(180deg, #c4f5f7 0%, #d4e8d4 50%, #c4f5f7 100%)" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <ScrollReveal playful className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-forest-green mb-4">
            🎨 {t.gallery.title}
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-river-blue via-forest-green to-amber mx-auto rounded-full mt-3" />
          <p className="text-slate-dark/60 max-w-4xl mx-auto text-base leading-relaxed text-justify mt-4">
            {t.gallery.subtitle}
          </p>
        </ScrollReveal>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {([
            ...(showWinners ? [{ label: `🏆 ${t.gallery.filterWinners}`, value: "winners" as FilterValue }] : []),
            { label: t.gallery.filterAll, value: null },
            { label: `3. ${t.gallery.filterGrade}`, value: 3 as FilterValue },
            { label: `4. ${t.gallery.filterGrade}`, value: 4 as FilterValue },
            { label: `5. ${t.gallery.filterGrade}`, value: 5 as FilterValue },
          ]).map((filter) => {
            const key = getFilterKey(filter.value);
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={key}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 ${
                  isActive ? filterColors[key].active : filterColors[key].inactive
                }`}
              >
                {filter.label}
                <span className="ml-1.5 text-xs opacity-70">
                  (
                  {filter.value === "winners"
                    ? winnerItems.length
                    : filter.value
                      ? galleryItems.filter((i) => i.grade === filter.value).length
                      : galleryItems.length}
                  )
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {activeFilter === "winners" && showWinners ? (
          <div className="space-y-8">
            {([3, 4, 5] as const).map((grade) => {
              const gradeWinners = filtered.filter((item) => item.grade === grade);
              if (gradeWinners.length === 0) return null;
              return (
                <div key={grade}>
                  <h3 className="text-lg font-bold text-deep-navy mb-3 flex items-center gap-2">
                    <span className="text-2xl">🏆</span> Top {gradeWinners.length}: {grade}. {t.gallery.filterGrade}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {gradeWinners.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="group cursor-pointer text-left"
                        onClick={() => setLightboxItem(item)}
                        aria-label={t.gallery.openDrawing}
                      >
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-md group-hover:shadow-xl group-hover:-rotate-1 group-hover:scale-[1.03] transition-all duration-300">
                          <Image
                            src={item.thumb ? item.thumb : `/gallery-thumbs/${gradeFolders[item.grade]}/${item.id}.webp`}
                            alt={item.name ? `${item.name} — ${t.gallery.drawingAlt}` : t.gallery.drawingAlt}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                            className="object-cover"
                          />
                          <span
                            className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${gradeColors[item.grade]}`}
                          >
                            {item.grade}. {t.gallery.gradeShort}
                          </span>
                          <div className="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/5 transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                className="group cursor-pointer text-left"
                onClick={() => setLightboxItem(item)}
                aria-label={t.gallery.openDrawing}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-md group-hover:shadow-xl group-hover:rotate-1 group-hover:scale-[1.03] transition-all duration-300">
                  <Image
                    src={
                      item.thumb
                        ? item.thumb
                        : `/gallery-thumbs/${gradeFolders[item.grade]}/${item.id}.webp`
                    }
                    alt={item.name ? `${item.name} — ${t.gallery.drawingAlt}` : t.gallery.drawingAlt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover"
                  />
                  <span
                    className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${gradeColors[item.grade]}`}
                  >
                    {item.grade}. {t.gallery.gradeShort}
                  </span>
                  <div className="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/5 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <Lightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
        onPrev={() => navigateLightbox(-1)}
        onNext={() => navigateLightbox(1)}
      />
    </section>
  );
}
