"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { useTranslation } from "@/i18n";

/* ═══════════════════════════════════════════
   Custom SVG icons — project color palette
   ═══════════════════════════════════════════ */

function IconBottle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect x="16" y="4" width="16" height="6" rx="2" fill="currentColor" opacity="0.3" />
      <path d="M18 10v4l-4 6v18a4 4 0 004 4h12a4 4 0 004-4V20l-4-6v-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 26h20" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <path d="M14 32h20" stroke="currentColor" strokeWidth="2" opacity="0.25" />
    </svg>
  );
}

function IconBag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <path d="M12 18h24l-2 22a2 2 0 01-2 2H16a2 2 0 01-2-2L12 18z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M18 18v-4a6 6 0 0112 0v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 28l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
    </svg>
  );
}

function IconLunchbox({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <rect x="6" y="16" width="36" height="22" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <path d="M6 24h36" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <rect x="18" y="10" width="12" height="6" rx="2" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="30" r="2.5" fill="currentColor" opacity="0.25" />
      <circle cx="24" cy="30" r="2.5" fill="currentColor" opacity="0.25" />
      <circle cx="32" cy="30" r="2.5" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

function IconNoLitter({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" />
      <line x1="11" y1="11" x2="37" y2="37" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 16c0-1 .5-2 2-2s2 1 2 2v3h-4v-3z" fill="currentColor" opacity="0.35" />
      <path d="M20 19h8l-1 13a2 2 0 01-2 2h-2a2 2 0 01-2-2l-1-13z" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function IconCleanup({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <path d="M14 42l2-20h16l2 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 22h28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 6v6M18 8l2 5M30 8l-2 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M20 28h8M20 34h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

function IconRefuseBag({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <path d="M16 14c-2 4-4 10-4 16 0 4 2 8 6 10h12c4-2 6-6 6-10 0-6-2-12-4-16" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <path d="M16 14h16c0 0 2-4 0-6s-6-2-8-2-6 0-8 2-2 6 0 6z" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <path d="M12 12l24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M36 12L12 36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function IconThink({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="26" r="14" stroke="currentColor" strokeWidth="2.5" />
      <path d="M20 24h0M28 24h0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 30c1.5 2 6.5 2 8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 12l2-4M34 16l4-1M18 12l-2-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function IconReducePlastic({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <path d="M18 8h12l2 6H16l2-6z" stroke="currentColor" strokeWidth="2" />
      <path d="M16 14l-2 26a2 2 0 002 2h16a2 2 0 002-2l-2-26" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M30 20l-12 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <path d="M18 30l12-14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function IconReuse({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <path d="M24 6l8 8-8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 14H20a10 10 0 00-10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 42l-8-8 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 34h12a10 10 0 0010-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function IconRecycle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none">
      <path d="M24 6l6 10H18l6-10z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M30 16l8 14H28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 16l-8 14h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 30l6 10h16l6-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ICONS_1 = [IconBottle, IconBag, IconLunchbox, IconNoLitter, IconCleanup] as const;
const ICONS_2 = [IconRefuseBag, IconThink, IconReducePlastic, IconReuse, IconRecycle] as const;

/* ═══════════════════════════════════════════
   Tip Row — icon + text
   ═══════════════════════════════════════════ */

function TipRow({
  icon: Icon,
  text,
  accent,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  accent: "green" | "blue";
  index: number;
}) {
  const iconBg = accent === "green" ? "bg-forest-green/10" : "bg-river-blue/10";
  const iconColor = accent === "green" ? "text-forest-green" : "text-river-blue";

  return (
    <ScrollReveal delay={index * 0.06}>
      <div className="flex items-start gap-4 group">
        {/* Icon circle */}
        <div
          className={`flex-shrink-0 w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center transition-transform group-hover:scale-110`}
        >
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        {/* Text */}
        <p className="text-deep-navy/75 text-[15px] leading-relaxed font-medium pt-2">
          {text}
        </p>
      </div>
    </ScrollReveal>
  );
}

/* ═══════════════════════════════════════════
   Main Tips Section
   ═══════════════════════════════════════════ */

export default function Tips() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-cream-light overflow-hidden py-20">
      {/* Decorative blobs */}
      <div className="absolute top-[-100px] right-[-200px] w-[500px] h-[500px] bg-sage-green/5 blob pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-150px] w-[400px] h-[400px] bg-river-blue/5 blob-2 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">

          {/* ── Card 1: Praktični nasveti ── */}
          <ScrollReveal>
            <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg shadow-black/[0.04] border border-sage-green/15 p-7 sm:p-9 h-full overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-forest-green to-sage-green rounded-t-3xl" />

              <h3 className="text-lg sm:text-xl font-extrabold text-deep-navy leading-tight mb-6 uppercase tracking-wide">
                {t.tips.card1Title}
              </h3>

              <div className="space-y-5 mb-8">
                {t.tips.card1Tips.map((tip, i) => (
                  <TipRow key={i} icon={ICONS_1[i]} text={tip} accent="green" index={i} />
                ))}
              </div>

              {/* Mascot */}
              <div className="flex justify-end">
                <div className="w-24 h-24 sm:w-28 sm:h-28 opacity-90">
                  <Image
                    src="/mascot-opt/happy.webp"
                    alt="Izvrstna"
                    width={112}
                    height={112}
                    className="object-contain drop-shadow-md"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Card 2: Kaj lahko naredim? ── */}
          <ScrollReveal delay={0.15}>
            <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg shadow-black/[0.04] border border-river-blue/15 p-7 sm:p-9 h-full overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-river-blue to-sky-400 rounded-t-3xl" />

              <h3 className="text-lg sm:text-xl font-extrabold text-deep-navy leading-tight mb-6 uppercase tracking-wide">
                {t.tips.card2Title}
              </h3>

              <div className="space-y-5">
                {t.tips.card2Tips.map((tip, i) => (
                  <TipRow key={i} icon={ICONS_2[i]} text={tip} accent="blue" index={i} />
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
