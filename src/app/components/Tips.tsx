"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "@/i18n";

/* ───── Flip Card ───── */
function FlipCard({
  front,
  back,
  color,
  isFlipped,
  onFlip,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  color: "green" | "blue";
  isFlipped: boolean;
  onFlip: () => void;
}) {
  const bg = color === "green" ? "bg-forest-green" : "bg-river-blue";
  const bgLight = color === "green" ? "bg-forest-green/10" : "bg-river-blue/10";

  return (
    <div
      className="cursor-pointer select-none"
      style={{ perspective: "800px" }}
      onClick={onFlip}
    >
      <motion.div
        className="relative w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
      >
        {/* FRONT */}
        <div
          className={`${bg} rounded-2xl p-5 flex flex-col items-center justify-center gap-2 min-h-[120px] shadow-md`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {!isFlipped && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1"
            >
              {front}
              <span className="text-white/70 text-[11px] font-medium">?</span>
            </motion.div>
          )}
        </div>

        {/* BACK */}
        <div
          className={`${bgLight} rounded-2xl p-5 flex items-start gap-3 min-h-[120px] absolute inset-0 border-2 ${
            color === "green" ? "border-forest-green/20" : "border-river-blue/20"
          }`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="flex-shrink-0 text-lg mt-0.5">✅</span>
          <span className="text-deep-navy/80 font-semibold text-sm leading-snug">
            {back}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* ───── Progress Bar ───── */
function ProgressBar({
  revealed,
  total,
  color,
  label,
}: {
  revealed: number;
  total: number;
  color: "green" | "blue";
  label: string;
}) {
  const pct = (revealed / total) * 100;
  const barColor = color === "green" ? "bg-forest-green" : "bg-river-blue";
  const trackColor = color === "green" ? "bg-forest-green/15" : "bg-river-blue/15";

  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-deep-navy/50 text-xs font-semibold whitespace-nowrap">
        {label} ({revealed}/{total})
      </span>
      <div className={`flex-1 h-2 ${trackColor} rounded-full overflow-hidden`}>
        <motion.div
          className={`h-full ${barColor} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}

/* ───── Main Tips Section ───── */
export default function Tips() {
  const { t } = useTranslation();
  const [flipped1, setFlipped1] = useState<Set<number>>(new Set());
  const [flipped2, setFlipped2] = useState<Set<number>>(new Set());

  const tips1 = t.tips.card1Tips;
  const tips2 = t.tips.card2Tips;
  const icons1 = ["🚰", "🛒", "🍱", "🚬", "🧹"];
  const icons2 = ["🛍️", "🤔", "🚫", "♻️", "🗑️"];

  const allCard1Done = flipped1.size === tips1.length;
  const allCard2Done = flipped2.size === tips2.length;
  const allDone = allCard1Done && allCard2Done;

  const mascotSrc = useMemo(() => {
    const total = flipped1.size + flipped2.size;
    if (allDone) return "/mascot-opt/happy.webp";
    if (total >= 7) return "/mascot-opt/surprised.webp";
    if (total >= 3) return "/mascot-opt/satisfied.webp";
    return "/mascot-opt/happy.webp";
  }, [flipped1.size, flipped2.size, allDone]);

  const toggleFlip1 = (i: number) => {
    setFlipped1((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const toggleFlip2 = (i: number) => {
    setFlipped2((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section className="relative bg-cream-light overflow-hidden py-20">
      {/* Decorative blobs */}
      <div className="absolute top-[-100px] right-[-200px] w-[500px] h-[500px] bg-sage-green/5 blob pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-150px] w-[400px] h-[400px] bg-river-blue/5 blob-2 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* ── Card 1: Praktični nasveti ── */}
          <ScrollReveal>
            <div className="relative bg-sage-green-light/40 rounded-3xl p-6 sm:p-8 h-full overflow-hidden">
              <h3 className="text-lg sm:text-xl font-extrabold text-deep-navy leading-tight mb-4 uppercase tracking-wide">
                {t.tips.card1Title}
              </h3>

              <ProgressBar
                revealed={flipped1.size}
                total={tips1.length}
                color="green"
                label={t.tips.discover}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {tips1.map((tip, i) => (
                  <FlipCard
                    key={i}
                    color="green"
                    isFlipped={flipped1.has(i)}
                    onFlip={() => toggleFlip1(i)}
                    front={
                      <span className="text-3xl">{icons1[i]}</span>
                    }
                    back={tip}
                  />
                ))}
              </div>

              {/* Celebration */}
              <AnimatePresence>
                {allCard1Done && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center text-forest-green font-bold text-sm mb-2"
                  >
                    {t.tips.discoveredAll}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mascot */}
              <div className="flex justify-center mt-2">
                <motion.div
                  key={mascotSrc}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-24 h-24 sm:w-28 sm:h-28"
                >
                  <Image
                    src={mascotSrc}
                    alt="Izvrstna"
                    width={112}
                    height={112}
                    className="object-contain drop-shadow-lg"
                  />
                </motion.div>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Card 2: Kaj lahko naredim? ── */}
          <ScrollReveal delay={0.15}>
            <div className="relative bg-sage-green-light/40 rounded-3xl p-6 sm:p-8 h-full overflow-hidden">
              <h3 className="text-lg sm:text-xl font-extrabold text-deep-navy leading-tight mb-4 uppercase tracking-wide">
                {t.tips.card2Title}
              </h3>

              <ProgressBar
                revealed={flipped2.size}
                total={tips2.length}
                color="blue"
                label={t.tips.discover}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {tips2.map((tip, i) => (
                  <FlipCard
                    key={i}
                    color="blue"
                    isFlipped={flipped2.has(i)}
                    onFlip={() => toggleFlip2(i)}
                    front={
                      <span className="text-3xl">{icons2[i]}</span>
                    }
                    back={tip}
                  />
                ))}
              </div>

              {/* Celebration */}
              <AnimatePresence>
                {allCard2Done && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center text-river-blue font-bold text-sm"
                  >
                    {t.tips.discoveredAll}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>

        {/* All done celebration */}
        <AnimatePresence>
          {allDone && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <span className="inline-block bg-forest-green/10 text-forest-green font-bold text-base px-6 py-3 rounded-full">
                🌍 {t.tips.discoveredAll}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
