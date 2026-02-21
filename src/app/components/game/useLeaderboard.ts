/* ─── localStorage hook for leaderboard + prize entries ─── */

import { useState, useCallback } from "react";
import type { LeaderboardEntry, PrizeEntry } from "./types";
import { DEFAULT_LEADERBOARD } from "./constants";

const LB_KEY = "cistaSocaLeaderboard";
const PRIZE_KEY = "cistaSocaPrizeEntries";

function loadLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return DEFAULT_LEADERBOARD;
  try {
    const raw = localStorage.getItem(LB_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [...DEFAULT_LEADERBOARD];
}

function saveLeaderboard(lb: LeaderboardEntry[]) {
  try {
    localStorage.setItem(LB_KEY, JSON.stringify(lb));
  } catch { /* quota etc. */ }
}

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(loadLeaderboard);

  const addScore = useCallback(
    (name: string, score: number): number => {
      const next = [...leaderboard, { name, score }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);
      setLeaderboard(next);
      saveLeaderboard(next);
      // Return rank (1-indexed)
      return next.findIndex((e) => e.name === name && e.score === score) + 1;
    },
    [leaderboard]
  );

  const topScore = leaderboard.length > 0 ? leaderboard[0].score : 0;

  return { leaderboard, addScore, topScore };
}

/* ─── Prize entries (separate from leaderboard) ─── */

export function savePrizeEntry(entry: PrizeEntry) {
  try {
    const raw = localStorage.getItem(PRIZE_KEY);
    const entries: PrizeEntry[] = raw ? JSON.parse(raw) : [];
    entries.push(entry);
    localStorage.setItem(PRIZE_KEY, JSON.stringify(entries));
  } catch { /* quota */ }
}
