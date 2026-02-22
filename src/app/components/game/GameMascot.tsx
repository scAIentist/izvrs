"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { MascotEmotion } from "./types";
import { EMOTION_IMAGE } from "./constants";

interface Props {
  emotion: MascotEmotion;
  comment: string | null;
  visible: boolean;
}

export default function GameMascot({ emotion, comment, visible }: Props) {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    if (comment) {
      setShowBubble(true);
      const t = setTimeout(() => setShowBubble(false), 2000);
      return () => clearTimeout(t);
    }
  }, [comment]);

  if (!visible) return null;

  return (
    <div className="absolute top-2 left-2 z-20 flex items-start gap-1 pointer-events-none">
      {/* Mascot image — no key swap, just crossfade the src */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
        <Image
          src={EMOTION_IMAGE[emotion]}
          alt="Izvrstna"
          width={48}
          height={48}
          className="object-contain drop-shadow-lg transition-opacity duration-200"
        />
      </div>

      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && comment && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white text-slate-dark px-3 py-2 rounded-xl text-xs sm:text-sm max-w-[140px] shadow-lg"
          >
            <div className="absolute -left-1.5 top-2.5 w-3 h-3 bg-white rotate-45" />
            <span className="relative z-10">{comment}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
