/* ─── Supabase-backed leaderboard + prize entries (localStorage fallback) ─── */

import { useState, useCallback, useEffect } from "react";
import type { LeaderboardEntry, PrizeEntry } from "./types";
import { DEFAULT_LEADERBOARD } from "./constants";
import { supabase } from "@/lib/supabase";

const LB_KEY = "cistaSocaLeaderboard";
const PRIZE_KEY = "cistaSocaPrizeEntries";
const MAX_ENTRIES = 20;

/* ─── localStorage helpers (kept for offline fallback) ─── */

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

async function fetchSupabaseLeaderboard(): Promise<LeaderboardEntry[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from("leaderboard")
      .select("name, score")
      .order("score", { ascending: false })
      .limit(MAX_ENTRIES);
    if (error) throw error;
    return data as LeaderboardEntry[];
  } catch (err) {
    console.warn("[Leaderboard] Supabase fetch failed:", err);
    return null;
  }
}

async function insertSupabaseScore(name: string, score: number): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from("leaderboard")
      .insert({ name, score });
    if (error) throw error;
    return true;
  } catch (err) {
    console.warn("[Leaderboard] Supabase insert failed:", err);
    return false;
  }
}

async function insertSupabasePrizeEntry(
  entry: Omit<PrizeEntry, "timestamp">
): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from("prize_entries")
      .insert({
        nickname: entry.nickname,
        email: entry.email,
        score: entry.score,
      });
    if (error) throw error;
    return true;
  } catch (err) {
    console.warn("[PrizeEntry] Supabase insert failed:", err);
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
    (name: string, score: number): number => {
      // 1. Optimistic local update (instant UX)
      const next = [...leaderboard, { name, score }]
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_ENTRIES);
      setLeaderboard(next);
      saveLocalLeaderboard(next);
      const rank = next.findIndex((e) => e.name === name && e.score === score) + 1;

      // 2. Background Supabase insert + re-fetch for global state
      insertSupabaseScore(name, score).then((ok) => {
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

/* ─── Prize entries ─── */

export function savePrizeEntry(entry: PrizeEntry) {
  // 1. Always save to localStorage as fallback
  try {
    const raw = localStorage.getItem(PRIZE_KEY);
    const entries: PrizeEntry[] = raw ? JSON.parse(raw) : [];
    entries.push(entry);
    localStorage.setItem(PRIZE_KEY, JSON.stringify(entries));
  } catch { /* quota */ }

  // 2. Background Supabase insert (fire-and-forget)
  insertSupabasePrizeEntry(entry);
}
