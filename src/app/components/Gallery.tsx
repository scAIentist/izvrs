"use client";

import { useState, useMemo } from "react";
import { galleryItems, type GalleryItem } from "../data/gallery";
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

export default function Gallery() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const INITIAL_COUNT = 15;   // 3 rows on desktop — fills ~1 screen
  const LOAD_MORE = 20;       // each click loads 20 more
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const filtered = useMemo(
    () =>
      activeFilter
        ? galleryItems.filter((item) => item.grade === activeFilter)
        : galleryItems,
    [activeFilter]
  );

  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const navigateLightbox = (direction: 1 | -1) => {
    if (!lightboxItem) return;
    const currentIndex = filtered.findIndex((i) => i.id === lightboxItem.id);
    const nextIndex =
      (currentIndex + direction + filtered.length) % filtered.length;
    setLightboxItem(filtered[nextIndex]);
  };

  return (
    <section id="galerija" className="py-20 bg-sage-green-light/20 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-deep-navy mb-4">
            {t.gallery.title}
          </h2>
          <div className="w-16 h-1 bg-sage-green mx-auto rounded-full mt-3" />
          <p className="text-slate-dark/60 max-w-lg mx-auto">
            {t.gallery.subtitle}
          </p>
        </ScrollReveal>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {([
            { label: t.gallery.filterAll, value: null },
            { label: `3. ${t.gallery.filterGrade}`, value: 3 },
            { label: `4. ${t.gallery.filterGrade}`, value: 4 },
            { label: `5. ${t.gallery.filterGrade}`, value: 5 },
          ] as const).map((filter) => (
            <button
              key={filter.label}
              onClick={() => { setActiveFilter(filter.value); setVisibleCount(INITIAL_COUNT); }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.value
                  ? "bg-sage-green text-white shadow-md"
                  : "bg-white text-slate-dark/60 hover:bg-sage-green/10 border border-slate-dark/10"
              }`}
            >
              {filter.label}
              <span className="ml-1.5 text-xs opacity-60">
                (
                {filter.value
                  ? galleryItems.filter((i) => i.grade === filter.value).length
                  : galleryItems.length}
                )
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {visibleItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="group cursor-pointer text-left"
              onClick={() => setLightboxItem(item)}
              aria-label={`${t.gallery.openDrawing} #${item.id}`}
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-sm group-hover:shadow-lg transition-shadow">
                <img
                  src={`/gallery-thumbs/${gradeFolders[item.grade]}/${item.id}.webp`}
                  alt={`${t.gallery.drawingAlt} #${item.id}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Grade badge */}
                <span
                  className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${gradeColors[item.grade]}`}
                >
                  {item.grade}. {t.gallery.gradeShort}
                </span>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-medium transition-opacity">
                    #{item.id}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Load more / Collapse */}
        <div className="text-center mt-8 flex justify-center gap-3">
          {hasMore && (
            <button
              onClick={() => setVisibleCount((c) => c + LOAD_MORE)}
              className="px-8 py-3 bg-sage-green text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              {`${t.gallery.loadMore} (${filtered.length - visibleCount})`}
            </button>
          )}
          {visibleCount > INITIAL_COUNT && (
            <button
              onClick={() => setVisibleCount(INITIAL_COUNT)}
              className="px-6 py-3 bg-white text-slate-dark/70 font-semibold rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all border border-slate-dark/10"
            >
              {t.gallery.showLess}
            </button>
          )}
        </div>
      </div>

      {/* Lightbox — keeps AnimatePresence (only 1 item, fine) */}
      <Lightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
        onPrev={() => navigateLightbox(-1)}
        onNext={() => navigateLightbox(1)}
      />
    </section>
  );
}
