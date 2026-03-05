"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { type GalleryItem } from "../data/gallery";
import { useTranslation } from "@/i18n";

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const { t } = useTranslation();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [item, onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    if (item) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown, item]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-deep-navy/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl z-10 w-10 h-10 flex items-center justify-center"
            aria-label={t.lightbox.close}
          >
            &times;
          </button>

          {/* Prev arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl z-10 w-12 h-12 flex items-center justify-center"
            aria-label={t.lightbox.prev}
          >
            &#8249;
          </button>

          {/* Next arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl z-10 w-12 h-12 flex items-center justify-center"
            aria-label={t.lightbox.next}
          >
            &#8250;
          </button>

          {/* Image */}
          <motion.div
            key={item.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-4xl max-h-[85vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={item.file}
              alt={`${t.lightbox.drawing} — ${item.grade}. ${t.lightbox.grade}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </motion.div>

          {/* Info bar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full px-5 py-2 text-white text-sm">
            {item.grade}. {t.lightbox.grade}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
