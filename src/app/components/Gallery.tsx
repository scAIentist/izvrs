"use client";

import { useState, useMemo } from "react";
import { galleryItems, winnerItems, type GalleryItem } from "../data/gallery";
import Lightbox from "./Lightbox";
import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "@/i18n";

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

type FilterValue = "winners" | 3 | 4 | 5 | null;

export default function Gallery() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<FilterValue>(null);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filtered = useMemo(() => {
    if (activeFilter === "winners") return winnerItems;
    if (activeFilter) return galleryItems.filter((item) => item.grade === activeFilter);
    return galleryItems;
  }, [activeFilter]);

  const navigateLightbox = (direction: 1 | -1) => {
    if (!lightboxItem) return;
    const currentIndex = filtered.findIndex((i) => i.id === lightboxItem.id);
    const nextIndex =
      (currentIndex + direction + filtered.length) % filtered.length;
    setLightboxItem(filtered[nextIndex]);
  };

  return (
    <section id="galerija" className="pt-28 pb-20 bg-sage-green-light/20 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-deep-navy mb-4">
            {t.gallery.title}
          </h2>
          <div className="w-16 h-1 bg-sage-green mx-auto rounded-full mt-3" />
          <p className="text-slate-dark/60 max-w-4xl mx-auto text-base leading-relaxed text-justify mt-4">
            {t.gallery.subtitle}
          </p>
        </ScrollReveal>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {([
            { label: t.gallery.filterWinners, value: "winners" as FilterValue },
            { label: t.gallery.filterAll, value: null },
            { label: `3. ${t.gallery.filterGrade}`, value: 3 as FilterValue },
            { label: `4. ${t.gallery.filterGrade}`, value: 4 as FilterValue },
            { label: `5. ${t.gallery.filterGrade}`, value: 5 as FilterValue },
          ]).map((filter) => (
            <button
              key={String(filter.value)}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.value
                  ? filter.value === "winners"
                    ? "bg-amber text-white shadow-md"
                    : "bg-sage-green text-white shadow-md"
                  : "bg-white text-slate-dark/60 hover:bg-sage-green/10 border border-slate-dark/10"
              }`}
            >
              {filter.label}
              <span className="ml-1.5 text-xs opacity-60">
                (
                {filter.value === "winners"
                  ? winnerItems.length
                  : filter.value
                    ? galleryItems.filter((i) => i.grade === filter.value).length
                    : galleryItems.length}
                )
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              className="group cursor-pointer text-left"
              onClick={() => setLightboxItem(item)}
              aria-label={t.gallery.openDrawing}
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-sm group-hover:shadow-lg transition-shadow">
                <img
                  src={
                    item.thumb
                      ? item.thumb
                      : `/gallery-thumbs/${gradeFolders[item.grade]}/${item.id}.webp`
                  }
                  alt={item.name ? `${item.name} — ${t.gallery.drawingAlt}` : t.gallery.drawingAlt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Winner name badge */}
                {item.winner && item.name && (
                  <span className="absolute bottom-2 left-2 right-2 text-center bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-lg truncate">
                    {item.name}
                  </span>
                )}
                {/* Grade badge */}
                <span
                  className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${gradeColors[item.grade]}`}
                >
                  {item.grade}. {t.gallery.gradeShort}
                </span>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/10 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
        onPrev={() => navigateLightbox(-1)}
        onNext={() => navigateLightbox(1)}
      />
    </section>
  );
}
