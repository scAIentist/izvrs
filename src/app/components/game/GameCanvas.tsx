"use client";

import { useRef, useEffect, useCallback } from "react";
import { CANVAS_W, CANVAS_H, MASCOT_COMMENTS } from "./constants";
import type { CommentType } from "./constants";
import type { GameState, MascotEmotion } from "./types";
import { createInitialState, tick } from "./GameEngine";
import { renderFrame } from "./GameRenderer";

interface Props {
  topScore: number;
  onGameOver: (state: GameState) => void;
  onMascotComment: (text: string) => void;
  onEmotionChange: (emotion: MascotEmotion) => void;
}

export default function GameCanvas({
  topScore,
  onGameOver,
  onMascotComment,
  onEmotionChange,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(createInitialState());
  const keysRef = useRef({ left: false, right: false });
  const rafRef = useRef<number>(0);
  const lastCommentRef = useRef(0);

  const triggerComment = useCallback(
    (type: CommentType) => {
      const now = Date.now();
      if (now - lastCommentRef.current < 1500) return;
      const pool = MASCOT_COMMENTS[type];
      if (pool.length > 0) {
        onMascotComment(pool[Math.floor(Math.random() * pool.length)]);
        lastCommentRef.current = now;
      }
    },
    [onMascotComment]
  );

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    stateRef.current = createInitialState();

    // Start comment
    setTimeout(() => triggerComment("start"), 500);

    function loop() {
      const state = stateRef.current;
      if (!state.running) {
        onGameOver(state);
        return;
      }

      const events = tick(state, keysRef.current, Date.now(), topScore);

      // Process events for mascot
      for (const ev of events) {
        if (ev.type === "died") {
          onGameOver(state);
          return;
        }
        if (ev.type in MASCOT_COMMENTS) {
          triggerComment(ev.type as CommentType);
        }
      }

      // Update mascot emotion based on lives
      if (state.lives >= 3) onEmotionChange("happy");
      else if (state.lives === 2) onEmotionChange("satisfied");
      else if (state.lives === 1) onEmotionChange("angry");

      renderFrame(ctx, state);
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [topScore, onGameOver, triggerComment, onEmotionChange]);

  // Keyboard input
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")
        keysRef.current.left = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D")
        keysRef.current.right = true;
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")
        keysRef.current.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D")
        keysRef.current.right = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Touch input
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvasRef.current!.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      if (x < rect.width / 2) keysRef.current.left = true;
      else keysRef.current.right = true;
    },
    []
  );

  const handleTouchEnd = useCallback(() => {
    keysRef.current.left = false;
    keysRef.current.right = false;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_W}
      height={CANVAS_H}
      className="block w-full h-auto rounded-2xl"
      style={{ touchAction: "manipulation", maxHeight: "70vh" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label={"Igra Čista Soča — premikaj kajakarja levo in desno"}
    />
  );
}
