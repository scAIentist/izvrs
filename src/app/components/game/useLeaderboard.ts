/* ─── Single-table leaderboard (prize_entries) + localStorage fallback ─── */

import { useState, useCallback, useEffect } from "react";
import type { LeaderboardEntry, PrizeEntry } from "./types";
import { DEFAULT_LEADERBOARD } from "./constants";
import { supabase } from "@/lib/supabase";

const LB_KEY = "cistaSocaLeaderboard";
const PRIZE_KEY = "cistaSocaPrizeEntries";
const PLAYER_KEY = "cistaSocaPlayer";
const MAX_ENTRIES = 20;

/* ─── localStorage helpers ─── */

function loadLocalLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return DEFAULT_LEADERBOARD;
  try {
    const raw = localStorage.getItem(LB_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [...DEFAULT_LEADERBOARD];
}

function saveLocalLeaderboard(lb: LeaderboardEntry[]) {
  try {
    localStorage.setItem(LB_KEY, JSON.stringify(lb));
  } catch { /* quota */ }
}

/* ─── Supabase helpers ─── */

/** Fetch leaderboard via RPC (returns nickname+score only, emails stay hidden) */
async function fetchSupabaseLeaderboard(): Promise<LeaderboardEntry[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.rpc("get_leaderboard");
    if (error) throw error;
    return (data ?? []).map((r: { nickname: string; score: number }) => ({
      name: r.nickname,
      score: r.score,
    }));
  } catch (err) {
    console.warn("[Leaderboard] Supabase fetch failed:", err);
    return null;
  }
}

/** Upsert a player into prize_entries (keeps best score per email) */
async function upsertSupabasePrizeEntry(
  entry: Omit<PrizeEntry, "timestamp">
): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.rpc("upsert_prize_entry", {
      p_nickname: entry.nickname,
      p_email: entry.email,
      p_score: entry.score,
    });
    if (error) throw error;
    return true;
  } catch (err) {
    console.warn("[PrizeEntry] Supabase upsert failed:", err);
    return false;
  }
}

/* ─── Hook ─── */

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(loadLocalLeaderboard);

  // On mount: fetch from Supabase in background, update if successful
  useEffect(() => {
    let cancelled = false;
    fetchSupabaseLeaderboard().then((remote) => {
      if (!cancelled && remote && remote.length > 0) {
        setLeaderboard(remote);
        saveLocalLeaderboard(remote);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const addScore = useCallback(
    (nickname: string, email: string, score: number): number => {
      // 1. Optimistic local update — upsert by nickname (keep best score)
      const existing = leaderboard.find((e) => e.name === nickname);
      let next: LeaderboardEntry[];
      if (existing) {
        next = leaderboard.map((e) =>
          e.name === nickname ? { ...e, score: Math.max(e.score, score) } : e
        );
      } else {
        next = [...leaderboard, { name: nickname, score }];
      }
      next = next.sort((a, b) => b.score - a.score).slice(0, MAX_ENTRIES);
      setLeaderboard(next);
      saveLocalLeaderboard(next);
      const bestScore = existing ? Math.max(existing.score, score) : score;
      const rank = next.findIndex((e) => e.name === nickname && e.score === bestScore) + 1;

      // 2. Supabase upsert to prize_entries + re-fetch for global state
      upsertSupabasePrizeEntry({ nickname, email, score }).then((ok) => {
        if (ok) {
          fetchSupabaseLeaderboard().then((remote) => {
            if (remote && remote.length > 0) {
              setLeaderboard(remote);
              saveLocalLeaderboard(remote);
            }
          });
        }
      });

      return rank;
    },
    [leaderboard]
  );

  const topScore = leaderboard.length > 0 ? leaderboard[0].score : 0;

  return { leaderboard, addScore, topScore };
}

/* ─── Player memory (for pre-fill on replay) ─── */

export function getSavedPlayer(): { nickname: string; email: string } | null {
  try {
    const raw = localStorage.getItem(PLAYER_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
}

/** Save prize entry to localStorage (Supabase handled by addScore) */
export function savePrizeEntry(entry: PrizeEntry) {
  // 1. Remember player for next time
  try {
    localStorage.setItem(PLAYER_KEY, JSON.stringify({
      nickname: entry.nickname,
      email: entry.email,
    }));
  } catch { /* quota */ }

  // 2. Save to localStorage as fallback
  try {
    const raw = localStorage.getItem(PRIZE_KEY);
    const entries: PrizeEntry[] = raw ? JSON.parse(raw) : [];
    // Upsert locally: replace if same email exists
    const idx = entries.findIndex((e) => e.email === entry.email);
    if (idx >= 0) {
      entries[idx] = { ...entry, score: Math.max(entries[idx].score, entry.score) };
    } else {
      entries.push(entry);
    }
    localStorage.setItem(PRIZE_KEY, JSON.stringify(entries));
  } catch { /* quota */ }
}
