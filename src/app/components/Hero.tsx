"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SpeechBubble from "./SpeechBubble";
import { useTranslation } from "@/i18n";

/* ── Decorative SVG components ── */

function WaterBubbles() {
  const bubbles = [
    { cx: "8%", delay: "0s", size: 6, dur: "4s" },
    { cx: "15%", delay: "1.2s", size: 4, dur: "3.5s" },
    { cx: "28%", delay: "0.6s", size: 8, dur: "5s" },
    { cx: "42%", delay: "2s", size: 5, dur: "3.8s" },
    { cx: "55%", delay: "0.3s", size: 7, dur: "4.5s" },
    { cx: "68%", delay: "1.8s", size: 4, dur: "3.2s" },
    { cx: "78%", delay: "0.9s", size: 6, dur: "4.2s" },
    { cx: "88%", delay: "2.5s", size: 5, dur: "3.6s" },
    { cx: "95%", delay: "1.5s", size: 3, dur: "3s" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="absolute bottom-0 rounded-full bg-white/10 animate-bubble"
          style={{
            left: b.cx,
            width: b.size,
            height: b.size,
            animationDelay: b.delay,
            animationDuration: b.dur,
          }}
        />
      ))}
    </div>
  );
}

function FloatingFish() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07]">
      <svg className="absolute top-[25%] animate-drift" width="44" height="22" viewBox="0 0 40 20" style={{ animationDelay: "0s", animationDuration: "22s" }}>
        <path d="M0,10 Q10,0 20,10 Q10,20 0,10 M20,10 L30,4 L30,16 Z" fill="white" />
      </svg>
      <svg className="absolute top-[50%] animate-drift" width="32" height="16" viewBox="0 0 40 20" style={{ animationDelay: "8s", animationDuration: "26s" }}>
        <path d="M0,10 Q10,0 20,10 Q10,20 0,10 M20,10 L30,4 L30,16 Z" fill="white" />
      </svg>
      <svg className="absolute top-[70%] animate-drift" width="26" height="13" viewBox="0 0 40 20" style={{ animationDelay: "14s", animationDuration: "20s" }}>
        <path d="M0,10 Q10,0 20,10 Q10,20 0,10 M20,10 L30,4 L30,16 Z" fill="white" />
      </svg>
      <svg className="absolute top-[40%] animate-drift" width="20" height="10" viewBox="0 0 40 20" style={{ animationDelay: "5s", animationDuration: "30s" }}>
        <path d="M0,10 Q10,0 20,10 Q10,20 0,10 M20,10 L30,4 L30,16 Z" fill="white" />
      </svg>
    </div>
  );
}

export default function Hero() {
  const { t } = useTranslation();
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="domov"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-0"
    >
      {/* ── Multi-layer background ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#061424] via-[#0A2540] to-[#0E3155]" />

      {/* Organic color blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-river-blue/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-15%] w-[500px] h-[500px] bg-forest-green/10 rounded-full blur-[100px]" />
      <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-amber/5 rounded-full blur-[80px]" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative blob shapes — like O projektu section but for dark bg */}
      <div className="absolute top-[10%] left-[-8%] w-[350px] h-[350px] bg-river-blue/6 blob pointer-events-none blur-[60px]" />
      <div className="absolute bottom-[15%] right-[-5%] w-[280px] h-[280px] bg-forest-green/5 blob-2 pointer-events-none blur-[50px]" />

      <WaterBubbles />
      <FloatingFish />

      {/* ── Main content — vertically centered in viewport ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20">
          {/* Left: Text */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h1
              className="text-[1.65rem] sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-8 whitespace-nowrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              {t.hero.heading}{" "}
              <span className="relative inline-block">
                <span className="text-gradient">{t.hero.headingHighlight}</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                  <path d="M2 8 Q50 2 100 7 T198 5" stroke="#2AABE0" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5" />
                </svg>
              </span>
            </motion.h1>

            <SpeechBubble
              text={t.hero.speechBubble}
              delay={1200}
              speed={28}
              className="mb-10 lg:max-w-lg"
            />

            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <button
                onClick={() => scrollTo("o-projektu")}
                className="group relative px-7 py-3.5 bg-river-blue text-white font-semibold rounded-full overflow-hidden transition-all hover:shadow-xl hover:shadow-river-blue/30 hover:-translate-y-0.5"
              >
                <span className="relative z-10">{t.hero.btnProject}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
              <Link
                href="/sledilniki"
                className="group relative px-7 py-3.5 bg-forest-green text-white font-semibold rounded-full overflow-hidden transition-all hover:shadow-xl hover:shadow-forest-green/30 hover:-translate-y-0.5"
              >
                <span className="relative z-10">{t.hero.btnTrackers}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
              <Link
                href="/galerija"
                className="group relative px-7 py-3.5 bg-amber text-white font-semibold rounded-full overflow-hidden transition-all hover:shadow-xl hover:shadow-amber/30 hover:-translate-y-0.5"
              >
                <span className="relative z-10">{t.hero.btnGallery}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Mascot */}
          <motion.div
            className="flex-shrink-0 relative"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.2 }}
          >
            <div className="absolute inset-0 -m-8 bg-river-blue/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute inset-0 -m-6 rounded-full border-2 border-dashed border-white/10 animate-[spin_30s_linear_infinite]" />
            <div className="absolute -top-2 left-1/2 w-3 h-3 bg-amber rounded-full animate-float" style={{ animationDelay: "0s" }} />
            <div className="absolute top-1/2 -right-2 w-2 h-2 bg-forest-green rounded-full animate-float" style={{ animationDelay: "1s" }} />
            <div className="absolute -bottom-1 left-1/4 w-2.5 h-2.5 bg-river-blue-light rounded-full animate-float" style={{ animationDelay: "2s" }} />
            <div className="relative animate-float-slow">
              <Image
                src="/mascot-opt/happy.webp"
                alt={t.hero.mascotAlt}
                width={380}
                height={380}
                priority
                className="drop-shadow-[0_20px_40px_rgba(42,171,224,0.3)] max-w-[240px] sm:max-w-[300px] lg:max-w-none"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Wave transition ── */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 180" fill="none" className="w-[200%] animate-wave-slow" preserveAspectRatio="none">
          <path d="M0 80 C240 40 480 120 720 80 C960 40 1200 120 1440 80 V180 H0Z" fill="#F5E6C8" fillOpacity="0.06" />
        </svg>
        <svg viewBox="0 0 1440 140" fill="none" className="absolute bottom-0 w-[200%] animate-wave-slow-reverse" preserveAspectRatio="none">
          <path d="M0 60 C360 100 720 20 1080 60 C1260 80 1380 50 1440 60 V140 H0Z" fill="#FFF8ED" fillOpacity="0.8" />
        </svg>
        <svg viewBox="0 0 1440 80" fill="none" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0 30 Q360 60 720 30 T1440 30 V80 H0Z" fill="#FFF8ED" />
        </svg>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-25">
          <path d="M7 13l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  );
}
