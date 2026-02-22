"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { GameState } from "./types";
import { EMOTION_IMAGE } from "./constants";
import { savePrizeEntry, getSavedPlayer } from "./useLeaderboard";
import { useTranslation } from "@/i18n";
import type { Translations } from "@/i18n";

interface Props {
  state: GameState;
  rank: number;
  onPlayAgain: () => void;
  onBack: () => void;
  onPrizeSubmit: (nickname: string, email: string) => void;
}

function getRankInfo(rank: number, t: Translations) {
  if (rank === 1)
    return { emoji: "\u{1F947}", label: t.game.over.rank1, cls: "bg-gradient-to-br from-amber to-amber-light text-slate-dark" };
  if (rank === 2)
    return { emoji: "\u{1F948}", label: t.game.over.rank2, cls: "bg-gradient-to-r from-gray-300 to-gray-400 text-slate-dark" };
  if (rank === 3)
    return { emoji: "\u{1F949}", label: t.game.over.rank3, cls: "bg-gradient-to-r from-amber-light/80 to-amber/60 text-white" };
  return { emoji: "\u{1F396}\uFE0F", label: `${rank}. ${t.game.over.rankN}`, cls: "bg-white/20 text-white" };
}

function getMascotReaction(score: number, t: Translations): { text: string; emotion: string } {
  if (score >= 400) return { text: t.game.over.reactions.score400, emotion: "happy" };
  if (score >= 250) return { text: t.game.over.reactions.score250, emotion: "happy" };
  if (score >= 150) return { text: t.game.over.reactions.score150, emotion: "satisfied" };
  if (score >= 50) return { text: t.game.over.reactions.score50, emotion: "surprised" };
  if (score >= 0) return { text: t.game.over.reactions.score0, emotion: "sad" };
  return { text: t.game.over.reactions.scoreNeg, emotion: "angry" };
}

/* ─── Prize Form (inline) ─── */
function PrizeForm({
  score,
  onSubmit,
}: {
  score: number;
  onSubmit: (nickname: string, email: string) => void;
}) {
  const { t } = useTranslation();
  const savedPlayer = getSavedPlayer();
  const isReturning = !!savedPlayer;

  const [nickname, setNickname] = useState(savedPlayer?.nickname ?? "");
  const [email, setEmail] = useState(savedPlayer?.email ?? "");
  const [termsOk, setTermsOk] = useState(isReturning);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showTerms, setShowTerms] = useState(false);

  function handleSubmit() {
    const errs: Record<string, string> = {};
    if (!nickname.trim()) errs.nickname = t.game.prize.errorNickname;
    if (!email.trim() || !email.includes("@") || !email.includes("."))
      errs.email = t.game.prize.errorEmail;
    if (!termsOk) errs.terms = t.game.prize.errorTerms;
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    savePrizeEntry({
      nickname: nickname.trim(),
      email: email.trim(),
      score,
      timestamp: new Date().toISOString(),
    });
    onSubmit(nickname.trim(), email.trim());
    setSubmitted(true);
  }

  if (showTerms) {
    return (
      <div className="w-full max-w-[320px] rounded-xl bg-white/10 border border-white/15 p-3 text-xs text-white/80 space-y-1.5">
        <h4 className="text-amber font-bold text-sm">{t.game.prize.termsTitle}</h4>
        <p><strong>Organizator:</strong> {t.game.prize.termsOrganizer}</p>
        <p><strong>Namen:</strong> {t.game.prize.termsPurpose}</p>
        <p><strong>Pogoji:</strong> {t.game.prize.termsConditions}</p>
        <p><strong>Nagrade:</strong> {t.game.prize.termsPrizes}</p>
        <p><strong>Varstvo podatkov:</strong> {t.game.prize.termsPrivacy}</p>
        <p><strong>Kontakt:</strong> info@izvrs.si</p>
        <button
          onClick={() => setShowTerms(false)}
          className="mt-1 px-5 py-1 bg-river-blue text-white rounded-full text-xs font-bold"
        >
          {t.game.prize.termsClose}
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="w-full max-w-[320px] text-center">
        <p className="text-white text-sm">
          {isReturning ? t.game.prize.successReturning : t.game.prize.successNew}
        </p>
        <p className="text-white/50 text-xs mt-1">
          {t.game.prize.unlimitedPlays}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[320px] rounded-xl bg-gradient-to-br from-amber/15 to-amber-light/5 border border-amber/40 p-3">
      <h4 className="text-xs font-bold text-amber mb-2">
        {isReturning ? t.game.prize.titleReturning : t.game.prize.title}
      </h4>

      <div className="space-y-2">
        <div>
          <label className="block text-sage-green-light text-xs font-bold mb-0.5">{t.game.prize.nicknameLabel}</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={50}
            placeholder={t.game.prize.nicknamePlaceholder}
            className="w-full px-2.5 py-1.5 rounded-lg bg-white/95 text-slate-dark text-xs focus:outline-none focus:ring-2 focus:ring-success"
          />
          {errors.nickname && <p className="text-danger text-xs mt-0.5">{errors.nickname}</p>}
        </div>
        <div>
          <label className="block text-sage-green-light text-xs font-bold mb-0.5">{t.game.prize.emailLabel}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={100}
            placeholder={t.game.prize.emailPlaceholder}
            className="w-full px-2.5 py-1.5 rounded-lg bg-white/95 text-slate-dark text-xs focus:outline-none focus:ring-2 focus:ring-success"
          />
          {errors.email && <p className="text-danger text-xs mt-0.5">{errors.email}</p>}
        </div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={termsOk}
            onChange={(e) => setTermsOk(e.target.checked)}
            className="w-3.5 h-3.5 mt-0.5 accent-success"
          />
          <span className="text-xs text-white/70 leading-tight">
            {t.game.prize.termsAgree}
            <button onClick={() => setShowTerms(true)} className="text-sage-green-light underline">
              {t.game.prize.termsLink}
            </button>
            {t.game.prize.termsEnd}
          </span>
        </label>
        {errors.terms && <p className="text-danger text-xs">{errors.terms}</p>}
        <button
          onClick={handleSubmit}
          className="w-full py-1.5 bg-gradient-to-br from-success to-forest-green text-white font-bold rounded-full text-xs shadow-lg hover:-translate-y-0.5 transition-all"
        >
          {isReturning ? t.game.prize.updateButton : t.game.prize.submitButton}
        </button>
        <p className="text-white/40 text-center" style={{ fontSize: "10px" }}>
          {t.game.prize.unlimitedPlays}
        </p>
      </div>
    </div>
  );
}

export default function GameOver({ state, rank, onPlayAgain, onBack, onPrizeSubmit }: Props) {
  const { t } = useTranslation();
  const reaction = getMascotReaction(state.score, t);
  const rankInfo = getRankInfo(rank, t);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-deep-navy/[.97] text-white p-4 rounded-2xl overflow-y-auto"
    >
      {/* Mascot reaction */}
      <div className="w-16 h-16 shrink-0">
        <Image
          src={EMOTION_IMAGE[reaction.emotion]}
          alt="Izvrstna"
          width={64}
          height={64}
          className="object-contain drop-shadow-xl"
        />
      </div>

      {/* Mascot text */}
      <p className="text-sm text-white/80 text-center max-w-[250px]">
        {reaction.text}
      </p>

      {/* Score */}
      <div className="text-center">
        <p className="text-xs text-sage-green-light mb-1">{t.game.over.yourScore}</p>
        <p className="text-4xl font-bold text-amber">{state.score}</p>
      </div>

      {/* Rank badge */}
      <span className={`px-4 py-1 rounded-full font-bold text-sm ${rankInfo.cls}`}>
        {rankInfo.emoji} {rankInfo.label}
      </span>

      {/* Prize form (only when score >= 50) */}
      {state.score >= 50 && (
        <PrizeForm score={state.score} onSubmit={onPrizeSubmit} />
      )}

      {/* Buttons */}
      <div className="flex gap-3 mt-1 shrink-0">
        <button
          onClick={onPlayAgain}
          className="px-8 py-2.5 bg-gradient-to-br from-success to-forest-green text-white font-bold rounded-full uppercase tracking-wider shadow-lg text-sm hover:-translate-y-1 transition-all"
        >
          {t.game.over.playAgain}
        </button>
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-gradient-to-br from-river-blue to-river-blue-dark text-white font-bold rounded-full shadow-lg text-sm hover:-translate-y-1 transition-all"
        >
          {t.game.over.back}
        </button>
      </div>
    </motion.div>
  );
}
