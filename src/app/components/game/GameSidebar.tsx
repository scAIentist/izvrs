"use client";

import type { GamePhase, LeaderboardEntry } from "./types";

interface Props {
  phase: GamePhase;
  leaderboard: LeaderboardEntry[];
  submittedName: string | null;
}

/* ─── Rules Section ─── */
function RulesSection() {
  return (
    <div className="rounded-xl bg-white/8 border border-white/10 p-4">
      <h3 className="text-sm font-bold text-amber mb-3">
        {"📋 Kako igrati"}
      </h3>

      {/* Collect trash */}
      <div className="mb-3">
        <p className="text-xs font-semibold text-success mb-1.5">{"✅ Poberi smeti (+točke)"}</p>
        <div className="flex flex-wrap gap-1.5">
          {[
            ["🍾", "10"], ["🧴", "10"], ["🔋", "20"], ["🛞", "25"],
            ["📦", "15"], ["🚬", "5"], ["💊", "15"], ["🥤", "10"],
          ].map(([e, p]) => (
            <span key={e} className="bg-black/20 px-2 py-0.5 rounded text-xs text-white">
              {e} +{p}
            </span>
          ))}
        </div>
      </div>

      {/* Don't catch fish */}
      <div className="mb-3">
        <p className="text-xs font-semibold text-danger mb-1.5">{"❌ Ne lovi rib!"}</p>
        <div className="flex gap-1.5">
          {["🐟", "🐠", "🐡"].map((e) => (
            <span key={e} className="bg-black/20 px-2 py-0.5 rounded text-xs text-white">
              {e} -15
            </span>
          ))}
        </div>
      </div>

      {/* Obstacles */}
      <div className="mb-3">
        <p className="text-xs font-semibold text-amber mb-1.5">{"⚠️ Pazi na ovire!"}</p>
        <div className="flex gap-1.5">
          {["🚣", "🛶", "🪨"].map((e) => (
            <span key={e} className="bg-black/20 px-2 py-0.5 rounded text-xs text-white">
              {e} -{"❤️"}
            </span>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="pt-2 border-t border-white/10">
        <p className="text-xs text-white/50">
          {"🕹️ Kontrole: ← → puščice ali A/D  •  📱 Dotik levo/desno"}
        </p>
      </div>
    </div>
  );
}

/* ─── Leaderboard Section ─── */
function LeaderboardSection({
  leaderboard,
  highlightName,
}: {
  leaderboard: LeaderboardEntry[];
  highlightName: string | null;
}) {
  return (
    <div className="rounded-xl bg-white/8 border border-white/10 p-4">
      <h3 className="text-sm font-bold text-amber mb-3">
        {"🏆 Najboljši čistilci Soče"}
      </h3>
      <ul className="space-y-1 max-h-72 overflow-y-auto">
        {leaderboard.slice(0, 10).map((entry, i) => {
          const emoji =
            i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`;
          const isCurrent = highlightName !== null && entry.name === highlightName;
          return (
            <li
              key={`${entry.name}-${i}`}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-sm ${
                isCurrent
                  ? "bg-success/25 border border-success"
                  : "bg-white/5"
              }`}
            >
              <span className="text-amber font-bold w-7">{emoji}</span>
              <span className="flex-1 text-white">{entry.name}</span>
              <span className="text-sage-green-light font-bold">{entry.score}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ─── Main Sidebar ─── */
export default function GameSidebar({
  phase,
  leaderboard,
  submittedName,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* Rules — always visible (except during mobile play, handled by parent) */}
      <RulesSection />

      {/* Leaderboard — always visible */}
      <LeaderboardSection
        leaderboard={leaderboard}
        highlightName={submittedName}
      />
    </div>
  );
}
