"use client";

import { useState, useMemo } from "react";
import { galleryItems, type GalleryItem } from "../data/gallery";
import Lightbox from "./Lightbox";
import ScrollReveal from "./ScrollReveal";

const filters = [
  { label: "Vsi", value: null },
  { label: "3. razred", value: 3 },
  { label: "4. razred", value: 4 },
  { label: "5. razred", value: 5 },
] as const;

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
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filtered = useMemo(
    () =>
      activeFilter
        ? galleryItems.filter((item) => item.grade === activeFilter)
        : galleryItems,
    [activeFilter]
  );

  const navigateLightbox = (direction: 1 | -1) => {
    if (!lightboxItem) return;
    const currentIndex = filtered.findIndex((i) => i.id === lightboxItem.id);
    const nextIndex =
      (currentIndex + direction + filtered.length) % filtered.length;
    setLightboxItem(filtered[nextIndex]);
  };

  return (
    <section id="galerija" className="py-20 bg-sage-green-light/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-deep-navy mb-4">
            Galerija risb
          </h2>
          <div className="w-20 h-1 bg-sage-green mx-auto rounded-full mb-4" />
          <p className="text-slate-dark/60 max-w-lg mx-auto">
            Risbe učencev, ki sodelujejo v projektu TETHYS4ADRION. Skupaj
            ozaveščamo o odpadkih v naših rekah.
          </p>
        </ScrollReveal>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.label}
              onClick={() => setActiveFilter(filter.value)}
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

        {/* Grid — plain divs, no Framer Motion */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer"
              onClick={() => setLightboxItem(item)}
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-sm group-hover:shadow-lg transition-shadow">
                {/* Native img with pre-optimized 300px thumbnail */}
                <img
                  src={`/gallery-thumbs/${gradeFolders[item.grade]}/${item.id}.webp`}
                  alt={`Risba #${item.id}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Grade badge */}
                <span
                  className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${gradeColors[item.grade]}`}
                >
                  {item.grade}. r
                </span>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/20 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-medium transition-opacity">
                    #{item.id}
                  </span>
                </div>
              </div>
            </div>
          ))}
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
