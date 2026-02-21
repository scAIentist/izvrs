"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  onStart: () => void;
}

export default function GameLobby({ onStart }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 bg-deep-navy/[.97] text-white p-6 rounded-2xl"
    >
      {/* Mascot */}
      <div className="w-24 h-24 animate-float-slow">
        <Image
          src="/mascot-opt/happy.webp"
          alt="Izvrstna"
          width={96}
          height={96}
          className="object-contain drop-shadow-xl"
        />
      </div>

      {/* Short greeting */}
      <div className="text-center max-w-[280px]">
        <h3 className="text-lg font-bold text-sage-green-light mb-2">
          {"Živjo! Jaz sem Izvrstna 🐟"}
        </h3>
        <p className="text-sm text-white/70 leading-relaxed">
          {"Pomoč potrebujem — v moji reki Soči je polno smeti! Pomagaj mi jo očistiti!"}
        </p>
      </div>

      {/* Big IGRAJ button */}
      <button
        onClick={onStart}
        className="px-12 py-4 bg-gradient-to-br from-success to-forest-green text-white text-xl font-bold rounded-full uppercase tracking-widest shadow-xl shadow-success/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-success/40 transition-all active:scale-95"
      >
        IGRAJ
      </button>
    </motion.div>
  );
}
