/* ─── Game type definitions ─── */

export type ItemCategory = "trash" | "fish" | "obstacle";

export interface ItemDef {
  emoji: string;
  name: string;
  points?: number;   // trash & fish
  damage?: number;    // obstacle
}

export interface GameItem {
  id: number;
  x: number;
  y: number;
  type: ItemCategory;
  emoji: string;
  name: string;
  points: number;
  damage: number;
  speed: number;
  wobble: number;
  size: number;
}

export interface FloatingText {
  text: string;
  x: number;
  y: number;
  color: string;
  alpha: number;
  vy: number;
}

export interface Kayaker {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GameState {
  running: boolean;
  score: number;
  lives: number;
  items: GameItem[];
  floatingTexts: FloatingText[];
  kayaker: Kayaker;
  riverOffset: number;
  spawnTimer: number;
  difficulty: number;
  gameTime: number;
  comboCount: number;
  lastTrashTime: number;
  trashCollected: number;
  fishCaught: number;
  obstaclesHit: number;
}

export type MascotEmotion = "happy" | "satisfied" | "sad" | "surprised" | "angry";

export interface LeaderboardEntry {
  name: string;
  score: number;
}

export interface PrizeEntry {
  nickname: string;
  email: string;
  score: number;
  timestamp: string;
}

export type GamePhase = "lobby" | "playing" | "gameover";
