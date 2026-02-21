"use client";

import { useState, useEffect } from "react";

interface SpeechBubbleProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

export default function SpeechBubble({
  text,
  delay = 800,
  speed = 35,
  className = "",
}: SpeechBubbleProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [started, displayed, text, speed]);

  const isDone = displayed.length >= text.length;

  return (
    <div
      className={`relative ${className}`}
    >
      {/* Bubble */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-5 shadow-xl shadow-black/5 border border-white/80">
        {/* Tail pointing right toward mascot */}
        <div className="absolute -right-3 top-6 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[14px] border-l-white/95" />

        <p className="text-deep-navy text-base leading-relaxed">
          {displayed}
          {!isDone && (
            <span className="inline-block w-0.5 h-5 bg-river-blue ml-0.5 animate-pulse align-middle rounded-full" />
          )}
        </p>
      </div>
    </div>
  );
}
