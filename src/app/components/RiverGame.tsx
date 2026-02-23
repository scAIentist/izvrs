"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import type { GameState, GamePhase, MascotEmotion } from "./game/types";
import { useLeaderboard } from "./game/useLeaderboard";
import GameCanvas from "./game/GameCanvas";
import GameMascot from "./game/GameMascot";
import GameLobby from "./game/GameLobby";
import GameOver from "./game/GameOver";
import GameSidebar from "./game/GameSidebar";
import { useTranslation } from "@/i18n";

export default function RiverGame() {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<GamePhase>("lobby");
  const [finalState, setFinalState] = useState<GameState | null>(null);
  const [mascotEmotion, setMascotEmotion] = useState<MascotEmotion>("happy");
  const [mascotComment, setMascotComment] = useState<string | null>(null);
  const [gameKey, setGameKey] = useState(0);
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const { leaderboard, addScore, topScore } = useLeaderboard();

  const handleStart = useCallback(() => {
    setPhase("playing");
    setFinalState(null);
    setMascotEmotion("happy");
    setMascotComment(null);
    setSubmittedName(null);
    setGameKey((k) => k + 1);
  }, []);

  const handleGameOver = useCallback((state: GameState) => {
    setFinalState(state);
    setPhase("gameover");
  }, []);

  const handleBack = useCallback(() => {
    setPhase("lobby");
  }, []);

  const handlePrizeSubmit = useCallback((nickname: string, email: string) => {
    addScore(nickname, email, finalState?.score ?? 0);
    setSubmittedName(nickname);
  }, [addScore, finalState]);

  // Compute rank for game-over display
  const currentRank = finalState
    ? leaderboard.filter((e) => e.score > finalState.score).length + 1
    : 0;

  return (
    <section
      id="igra"
      className="relative bg-deep-navy overflow-hidden min-h-screen"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Title */}
        <ScrollReveal className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {t.game.title}
          </h2>
          <p className="text-white/60 text-base max-w-md mx-auto">
            {t.game.subtitle}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-river-blue to-forest-green mx-auto rounded-full mt-3" />
        </ScrollReveal>

        {/* ─── Desktop: two-column grid  |  Mobile: single column ─── */}
        <div className="grid md:grid-cols-[minmax(0,450px)_1fr] gap-6 md:gap-8 items-center justify-center">

          {/* ─── LEFT: Game container ─── */}
          <div>
            <div
              className="relative mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
              style={{ maxWidth: 450, aspectRatio: "450 / 700", maxHeight: "80vh" }}
            >
              {/* Canvas */}
              {phase === "playing" && (
                <>
                  <GameCanvas
                    key={gameKey}
                    topScore={topScore}
                    onGameOver={handleGameOver}
                    onMascotComment={setMascotComment}
                    onEmotionChange={setMascotEmotion}
                  />
                  <GameMascot
                    emotion={mascotEmotion}
                    comment={mascotComment}
                    visible
                  />
                </>
              )}

              {/* Overlay screens */}
              <AnimatePresence mode="wait">
                {phase === "lobby" && (
                  <GameLobby key="lobby" onStart={handleStart} />
                )}
                {phase === "gameover" && finalState && (
                  <GameOver
                    key="gameover"
                    state={finalState}
                    rank={currentRank}
                    onPlayAgain={handleStart}
                    onBack={handleBack}
                    onPrizeSubmit={handlePrizeSubmit}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Controls hint (visible during play) */}
            {phase === "playing" && (
              <p className="text-center text-sage-green-light/60 text-xs mt-3">
                {t.game.controls}
              </p>
            )}
          </div>

          {/* ─── RIGHT: Sidebar (desktop: always visible, mobile: hidden during play) ─── */}
          <div className={`${phase === "playing" ? "hidden md:block" : ""}`}>
            <GameSidebar
              phase={phase}
              leaderboard={leaderboard}
              submittedName={submittedName}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
