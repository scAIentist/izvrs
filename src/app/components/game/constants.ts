/* ─── Game constants extracted from standalone HTML ─── */

import type { ItemDef } from "./types";

export const CANVAS_W = 450;
export const CANVAS_H = 700;

/* ─── Item definitions ─── */

export const TRASH_ITEMS: ItemDef[] = [
  { emoji: "\u{1F37E}", name: "steklenica", points: 10 },
  { emoji: "\u{1F9F4}", name: "plastenka", points: 10 },
  { emoji: "\u{1F6CD}\uFE0F", name: "vre\u010Dka", points: 10 },
  { emoji: "\u{1F96B}", name: "plo\u010Devinka", points: 10 },
  { emoji: "\u{1F4E6}", name: "\u0161katla", points: 15 },
  { emoji: "\u{1F45F}", name: "\u010Develj", points: 10 },
  { emoji: "\u{1F6AC}", name: "ogorek", points: 5 },
  { emoji: "\u{1F964}", name: "kozarec", points: 10 },
  { emoji: "\u{1F4F0}", name: "\u010Dasopis", points: 5 },
  { emoji: "\u{1F388}", name: "balon", points: 10 },
  { emoji: "\u{1FAA5}", name: "\u0161\u010Detka", points: 5 },
  { emoji: "\u{1F9FD}", name: "goba", points: 5 },
  { emoji: "\u{1FA79}", name: "obli\u017E", points: 5 },
  { emoji: "\u{1F50B}", name: "baterija", points: 20 },
  { emoji: "\u{1F48A}", name: "zdravila", points: 15 },
  { emoji: "\u{1F6DE}", name: "pnevmatika", points: 25 },
];

export const FISH_ITEMS: ItemDef[] = [
  { emoji: "\u{1F41F}", name: "postrv", points: -15 },
  { emoji: "\u{1F420}", name: "ribica", points: -15 },
  { emoji: "\u{1F421}", name: "riba", points: -15 },
];

export const OBSTACLE_ITEMS: ItemDef[] = [
  { emoji: "\u{1F6A3}", name: "raft", damage: 1 },
  { emoji: "\u{1F6F6}", name: "kanu", damage: 1 },
  { emoji: "\u{1FAA8}", name: "skala", damage: 1 },
];

/* ─── Mascot comments ─── */

export const MASCOT_COMMENTS = {
  start: ["Gremo! \u{1F4AA}", "O\u010Distimo So\u010Do!", "Pomagaj mi! \u{1F41F}"],
  trashCollected: ["Super! \u267B\uFE0F", "Odli\u010Dno!", "Tako je!", "Bravo! \u{1F44F}", "Hvala! \u{1F49A}"],
  combo: ["COMBO! \u{1F525}", "Neustavljiv/a!", "Na ognju! \u{1F525}", "Fantasti\u010Dno!"],
  fishCaught: ["Oj ne, ribica! \u{1F622}", "To je moj prijatelj!", "Ribe ne! \u{1F41F}", "Pazi na ribe!"],
  obstacleHit: ["Av\u010D! \u{1F635}", "Pazi! \u26A0\uFE0F", "Ovira!", "Ouch!"],
  trashMissed: ["U\u0161la je smeti!", "\u0160koda! \u{1F615}", "Poberi vse!"],
  encouragement: ["Samo naprej!", "Gre ti dobro!", "\u0160e naprej! \u{1F4AA}", "Odli\u010Dno gre\u0161!"],
  lowHealth: ["Pazi, malo sr\u010Dkov!", "\u0160e eno \u017Eivljenje!", "Bodi previden/a!"],
  highScore: ["WOW! \u{1F31F}", "Neverjetno!", "Rekord?! \u{1F3C6}"],
} as const;

export type CommentType = keyof typeof MASCOT_COMMENTS;

/* ─── Canvas colors matching site palette ─── */

export const COLORS = {
  river: "#20B2AA",
  riverDark: "#008B8B",
  riverLight: "#40E0D0",
  bank: "#228B22",
  bankDark: "#006400",
  kayakYellow: "#FFD700",
  kayakOrange: "#FFA500",
  sky1: "#87CEEB",
  sky2: "#E0F7FA",
} as const;

/* ─── Fishermen positions ─── */

export const FISHERMEN = [
  { x: 20, y: 200, flip: false },
  { x: 400, y: 450, flip: true },
] as const;

/* ─── Default leaderboard ─── */

export const DEFAULT_LEADERBOARD = [
  { name: "Izvrstna", score: 500 },
  { name: "Re\u010DniCistac", score: 420 },
  { name: "EkoBojevnik", score: 380 },
  { name: "ZelenaSoca", score: 320 },
  { name: "Kajakar99", score: 280 },
  { name: "PodvodniJunak", score: 250 },
  { name: "CistilecRek", score: 200 },
  { name: "ZeleniVal", score: 150 },
];

/* ─── Mascot emotion → image mapping ─── */

export const EMOTION_IMAGE: Record<string, string> = {
  happy: "/mascot-opt/happy.webp",
  satisfied: "/mascot-opt/satisfied.webp",
  sad: "/mascot-opt/sad.webp",
  surprised: "/mascot-opt/surprised.webp",
  angry: "/mascot-opt/angry.webp",
};
