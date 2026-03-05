"use client";

import { useRef, useEffect, useCallback } from "react";
import { CANVAS_W, CANVAS_H } from "./constants";
import type { CommentType } from "./constants";
import type { GameState, MascotEmotion } from "./types";
import { createInitialState, tick } from "./GameEngine";
import { renderFrame } from "./GameRenderer";
import { useTranslation } from "@/i18n";

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
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>(createInitialState());
  const keysRef = useRef({ left: false, right: false });
  const rafRef = useRef<number>(0);
  const lastFrameRef = useRef(0);
  const lastCommentRef = useRef(0);
  const commentsRef = useRef(t.game.mascotComments);
  commentsRef.current = t.game.mascotComments;
  const tempEmotionUntilRef = useRef(0);

  const triggerComment = useCallback(
    (type: CommentType) => {
      const now = Date.now();
      if (now - lastCommentRef.current < 1500) return;
      const pool = commentsRef.current[type];
      if (pool.length > 0) {
        onMascotComment(pool[Math.floor(Math.random() * pool.length)]);
        lastCommentRef.current = now;
      }
    },
    [onMascotComment]
  );

  // Temporarily flash a reaction emotion, then revert to lives-based emotion
  const flashEmotion = useCallback(
    (emotion: MascotEmotion) => {
      onEmotionChange(emotion);
      tempEmotionUntilRef.current = Date.now() + 800;
    },
    [onEmotionChange]
  );

  const getBaseEmotion = (lives: number): MascotEmotion => {
    if (lives >= 3) return "happy";
    if (lives === 2) return "satisfied";
    return "angry";
  };

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    stateRef.current = createInitialState();
    lastFrameRef.current = performance.now();

    // Start comment
    setTimeout(() => triggerComment("start"), 500);

    function loop() {
      const state = stateRef.current;
      if (!state.running) {
        onGameOver(state);
        return;
      }

      const frameNow = performance.now();
      const dt = Math.min((frameNow - lastFrameRef.current) / 16.667, 3); // normalize to 60fps, cap at 3x
      lastFrameRef.current = frameNow;

      const now = Date.now();
      const events = tick(state, keysRef.current, now, topScore, dt);

      // Process events for mascot — trigger comments AND temporary emotions
      let hadReaction = false;
      for (const ev of events) {
        if (ev.type === "died") {
          onGameOver(state);
          return;
        }
        if (ev.type in commentsRef.current) {
          triggerComment(ev.type as CommentType);
        }
        // Flash emotion based on event type
        if (!hadReaction) {
          if (ev.type === "fishCaught") {
            flashEmotion("sad");
            hadReaction = true;
          } else if (ev.type === "obstacleHit" || ev.type === "lowHealth") {
            flashEmotion("surprised");
            hadReaction = true;
          } else if (ev.type === "combo" || ev.type === "highScore") {
            flashEmotion("happy");
            hadReaction = true;
          } else if (ev.type === "trashMissed") {
            flashEmotion("sad");
            hadReaction = true;
          }
        }
      }

      // Revert to lives-based emotion after temporary reaction expires
      if (!hadReaction && now > tempEmotionUntilRef.current) {
        onEmotionChange(getBaseEmotion(state.lives));
      }

      renderFrame(ctx, state);
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [topScore, onGameOver, triggerComment, onEmotionChange, flashEmotion]);

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

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvasRef.current!.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      keysRef.current.left = x < rect.width / 2;
      keysRef.current.right = x >= rect.width / 2;
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
      className="block w-full h-full rounded-2xl select-none"
      style={{ touchAction: "none", WebkitUserSelect: "none", userSelect: "none" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label={t.game.canvasAria}
    />
  );
}
