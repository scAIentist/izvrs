"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "@/i18n";

/* ═══════════════════════════════════════════
   Custom SVG icons — project color palette
   ═══════════════════════════════════════════ */

function IconBottle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="4" width="16" height="6" rx="2" fill="currentColor" opacity="0.3" />
      <path d="M18 10v4l-4 6v18a4 4 0 004 4h12a4 4 0 004-4V20l-4-6v-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 26h20" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <path d="M14 32h20" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <circle cx="24" cy="22" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function IconBag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 18h24l-2 22a2 2 0 01-2 2H16a2 2 0 01-2-2L12 18z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M18 18v-4a6 6 0 0112 0v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 28l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
    </svg>
  );
}

function IconLunchbox({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="16" width="36" height="22" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <path d="M6 24h36" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <rect x="18" y="10" width="12" height="6" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="30" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="24" cy="30" r="2.5" fill="currentColor" opacity="0.3" />
      <circle cx="32" cy="30" r="2.5" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function IconNoLitter({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" />
      <line x1="11" y1="11" x2="37" y2="37" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 16c0-1 .5-2 2-2s2 1 2 2v3h-4v-3z" fill="currentColor" opacity="0.4" />
      <path d="M20 19h8l-1 13a2 2 0 01-2 2h-2a2 2 0 01-2-2l-1-13z" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

function IconCleanup({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 42l2-20h16l2 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 22h28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 6v6M18 8l2 5M30 8l-2 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M20 28h8M20 34h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

function IconRefuseBag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 14c-2 4-4 10-4 16 0 4 2 8 6 10h12c4-2 6-6 6-10 0-6-2-12-4-16" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <path d="M16 14h16c0 0 2-4 0-6s-6-2-8-2-6 0-8 2-2 6 0 6z" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <path d="M12 12l24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M36 12L12 36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function IconThink({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="26" r="14" stroke="currentColor" strokeWidth="2.5" />
      <path d="M20 24h0M28 24h0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 30c1.5 2 6.5 2 8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 12l2-4M34 16l4-1M18 12l-2-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function IconReducePlastic({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 8h12l2 6H16l2-6z" stroke="currentColor" strokeWidth="2" />
      <path d="M16 14l-2 26a2 2 0 002 2h16a2 2 0 002-2l-2-26" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M14 24h20" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <path d="M30 20l-12 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <path d="M18 30l12-14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function IconReuse({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 6l8 8-8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 14H20a10 10 0 00-10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 42l-8-8 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 34h12a10 10 0 0010-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function IconRecycle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 6l6 10H18l6-10z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M30 16l8 14H28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 16l-8 14h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 30l6 10h16l6-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 36l4 6 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
      <path d="M7 12.5l3 3 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconQuestion({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <path d="M9 9.5a3 3 0 015.5 1.5c0 2-3 2.5-3 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}

const ICONS_1 = [IconBottle, IconBag, IconLunchbox, IconNoLitter, IconCleanup];
const ICONS_2 = [IconRefuseBag, IconThink, IconReducePlastic, IconReuse, IconRecycle];

/* ═══════════════════════════════════════════
   Flip Card
   ═══════════════════════════════════════════ */

function FlipCard({
  icon: Icon,
  back,
  color,
  isFlipped,
  onFlip,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>;
  back: string;
  color: "green" | "blue";
  isFlipped: boolean;
  onFlip: () => void;
  index: number;
}) {
  const gradients = {
    green: "from-forest-green to-emerald-600",
    blue: "from-river-blue to-sky-600",
  };
  const bgLight = color === "green" ? "bg-white" : "bg-white";
  const borderColor = color === "green" ? "border-forest-green/25" : "border-river-blue/25";
  const textColor = color === "green" ? "text-forest-green" : "text-river-blue";
  const checkColor = color === "green" ? "text-forest-green" : "text-river-blue";

  return (
    <motion.div
      className="cursor-pointer select-none"
      style={{ perspective: "900px" }}
      onClick={onFlip}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        className="relative w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      >
        {/* FRONT — gradient bg, SVG icon, subtle question mark */}
        <div
          className={`bg-gradient-to-br ${gradients[color]} rounded-2xl p-5 flex flex-col items-center justify-center gap-2.5 min-h-[130px] shadow-lg shadow-black/10`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {!isFlipped && (
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: index * 0.3 }}
              className="flex flex-col items-center gap-1.5"
            >
              <Icon className="w-10 h-10 text-white drop-shadow-sm" />
              <IconQuestion className="w-5 h-5 text-white/60" />
            </motion.div>
          )}
        </div>

        {/* BACK — clean white card with colored accent */}
        <div
          className={`${bgLight} rounded-2xl min-h-[130px] absolute inset-0 border-2 ${borderColor} shadow-md overflow-hidden`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Top accent stripe */}
          <div className={`h-1.5 bg-gradient-to-r ${gradients[color]}`} />
          <div className="p-4 flex items-start gap-3">
            <IconCheck className={`flex-shrink-0 w-6 h-6 ${checkColor} mt-0.5`} />
            <span className="text-deep-navy/80 font-semibold text-[13px] sm:text-sm leading-snug">
              {back}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Progress Bar
   ═══════════════════════════════════════════ */

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
  const gradient = color === "green"
    ? "bg-gradient-to-r from-forest-green to-emerald-500"
    : "bg-gradient-to-r from-river-blue to-sky-500";
  const trackColor = color === "green" ? "bg-forest-green/10" : "bg-river-blue/10";

  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-deep-navy/50 text-xs font-bold whitespace-nowrap tracking-wide">
        {label} ({revealed}/{total})
      </span>
      <div className={`flex-1 h-2.5 ${trackColor} rounded-full overflow-hidden`}>
        <motion.div
          className={`h-full ${gradient} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Main Tips Section
   ═══════════════════════════════════════════ */

export default function Tips() {
  const { t } = useTranslation();
  const [flipped1, setFlipped1] = useState<Set<number>>(new Set());
  const [flipped2, setFlipped2] = useState<Set<number>>(new Set());

  const tips1 = t.tips.card1Tips;
  const tips2 = t.tips.card2Tips;

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
        {/* Tap hint */}
        <ScrollReveal className="text-center mb-8">
          <p className="text-deep-navy/40 text-sm font-medium">
            {t.tips.tapToReveal}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* ── Card 1: Praktični nasveti ── */}
          <ScrollReveal>
            <div className="relative bg-sage-green-light/40 rounded-3xl p-6 sm:p-8 h-full">
              <h3 className="text-lg sm:text-xl font-extrabold text-deep-navy leading-tight mb-4 uppercase tracking-wide">
                {t.tips.card1Title}
              </h3>

              <ProgressBar
                revealed={flipped1.size}
                total={tips1.length}
                color="green"
                label={t.tips.discover}
              />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                {tips1.map((tip, i) => (
                  <FlipCard
                    key={i}
                    color="green"
                    icon={ICONS_1[i]}
                    isFlipped={flipped1.has(i)}
                    onFlip={() => toggleFlip1(i)}
                    back={tip}
                    index={i}
                  />
                ))}
              </div>

              {/* Celebration */}
              <AnimatePresence>
                {allCard1Done && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
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
            <div className="relative bg-sage-green-light/40 rounded-3xl p-6 sm:p-8 h-full">
              <h3 className="text-lg sm:text-xl font-extrabold text-deep-navy leading-tight mb-4 uppercase tracking-wide">
                {t.tips.card2Title}
              </h3>

              <ProgressBar
                revealed={flipped2.size}
                total={tips2.length}
                color="blue"
                label={t.tips.discover}
              />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                {tips2.map((tip, i) => (
                  <FlipCard
                    key={i}
                    color="blue"
                    icon={ICONS_2[i]}
                    isFlipped={flipped2.has(i)}
                    onFlip={() => toggleFlip2(i)}
                    back={tip}
                    index={i}
                  />
                ))}
              </div>

              {/* Celebration */}
              <AnimatePresence>
                {allCard2Done && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
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
              className="mt-10 text-center"
            >
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block bg-gradient-to-r from-forest-green to-river-blue text-white font-bold text-base px-8 py-3.5 rounded-full shadow-lg"
              >
                {t.tips.discoveredAll}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
