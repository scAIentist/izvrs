"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getEvent, type EventPhoto } from "../../data/events";
import ScrollReveal from "../../components/ScrollReveal";
import { useTranslation } from "@/i18n";

/* ── Event photo lightbox ──────────────────────────────────────────── */
function EventLightbox({
  photos,
  current,
  onClose,
  onNav,
}: {
  photos: EventPhoto[];
  current: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const { t } = useTranslation();
  const photo = photos[current];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    },
    [onClose, onNav],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] bg-deep-navy/95 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl z-10 w-10 h-10 flex items-center justify-center"
          aria-label={t.lightbox.close}
        >
          &times;
        </button>

        {/* Prev */}
        <button
          onClick={(e) => { e.stopPropagation(); onNav(-1); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl z-10 w-12 h-12 flex items-center justify-center"
          aria-label={t.lightbox.prev}
        >
          &#8249;
        </button>

        {/* Next */}
        <button
          onClick={(e) => { e.stopPropagation(); onNav(1); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl z-10 w-12 h-12 flex items-center justify-center"
          aria-label={t.lightbox.next}
        >
          &#8250;
        </button>

        {/* Image */}
        <motion.div
          key={photo.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-4xl max-h-[85vh] w-full h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={photo.file}
            alt={`${t.events.photoAlt} ${current + 1}`}
            fill
            className="object-contain"
            sizes="90vw"
          />
        </motion.div>

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 text-white text-sm">
          {current + 1} / {photos.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Event page ────────────────────────────────────────────────────── */
export default function EventPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const event = getEvent(slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!event) {
    return (
      <main className="pt-28 pb-20 bg-deep-navy min-h-screen flex items-center justify-center">
        <p className="text-white/50">{t.events.notFound}</p>
      </main>
    );
  }

  return (
    <main>
      <section className="pt-28 pb-20 bg-deep-navy min-h-screen">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/izpust"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm mb-8 transition-colors"
          >
            &#8592; {t.events.backToList}
          </Link>

          {/* Header */}
          <ScrollReveal playful className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {t.events.launchTitle}
            </h2>
            <p className="text-white/50 text-lg">
              {event.date} — {event.location}
            </p>
            <div className="w-16 h-1 bg-river-blue mx-auto rounded-full mt-4" />
          </ScrollReveal>

          {/* YouTube Videos */}
          {event.videos.length > 0 && (
            <ScrollReveal delay={0.1} className="mb-14">
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                {t.events.videosTitle}
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {event.videos.map((url, i) => (
                  <div
                    key={i}
                    className="relative aspect-video rounded-2xl overflow-hidden shadow-xl bg-black/30"
                  >
                    <iframe
                      src={url}
                      title={`Video ${i + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* Photo Grid */}
          <ScrollReveal delay={0.2}>
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              {t.events.photosTitle}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {event.photos.map((photo, i) => (
                <button
                  key={photo.id}
                  type="button"
                  className="group cursor-pointer"
                  onClick={() => setLightboxIndex(i)}
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5 group-hover:scale-[1.03] transition-all duration-300">
                    <Image
                      src={photo.file}
                      alt={`${t.events.photoAlt} ${photo.id}`}
                      fill
                      sizes="(max-width:640px) 50vw, (max-width:768px) 33vw, (max-width:1024px) 25vw, 20vw"
                      className="object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <EventLightbox
          photos={event.photos}
          current={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNav={(dir) => {
            setLightboxIndex((prev) =>
              prev !== null
                ? (prev + dir + event.photos.length) % event.photos.length
                : null,
            );
          }}
        />
      )}
    </main>
  );
}
