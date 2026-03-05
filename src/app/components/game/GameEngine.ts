/* ─── Pure game logic — no DOM, no Canvas, no React ─── */

import type { GameState, GameItem, FloatingText, ItemCategory } from "./types";
import {
  CANVAS_W,
  CANVAS_H,
  TRASH_ITEMS,
  FISH_ITEMS,
  OBSTACLE_ITEMS,
} from "./constants";

let nextId = 0;

export function createInitialState(): GameState {
  return {
    running: true,
    score: 0,
    lives: 3,
    items: [],
    floatingTexts: [],
    kayaker: { x: 200, y: 580, width: 60, height: 80 },
    riverOffset: 0,
    spawnTimer: 0,
    difficulty: 1,
    gameTime: 0,
    comboCount: 0,
    lastTrashTime: 0,
    trashCollected: 0,
    fishCaught: 0,
    obstaclesHit: 0,
  };
}

export function spawnItem(state: GameState): GameItem {
  const rand = Math.random();
  const trashChance = 0.55 - state.difficulty * 0.02;
  const fishChance = 0.25 + state.difficulty * 0.02;

  let type: ItemCategory;
  let def;

  if (rand < trashChance) {
    type = "trash";
    def = TRASH_ITEMS[Math.floor(Math.random() * TRASH_ITEMS.length)];
  } else if (rand < trashChance + fishChance) {
    type = "fish";
    def = FISH_ITEMS[Math.floor(Math.random() * FISH_ITEMS.length)];
  } else {
    type = "obstacle";
    def = OBSTACLE_ITEMS[Math.floor(Math.random() * OBSTACLE_ITEMS.length)];
  }

  return {
    id: nextId++,
    x: 70 + Math.random() * 310,
    y: -50,
    type,
    emoji: def.emoji,
    name: def.name,
    points: def.points ?? 0,
    damage: def.damage ?? 0,
    speed: 2 + Math.random() * 2 + state.difficulty * 0.3,
    wobble: Math.random() * Math.PI * 2,
    size: 40,
  };
}

function addFloatingText(
  state: GameState,
  text: string,
  x: number,
  y: number,
  color: string
) {
  state.floatingTexts.push({ text, x, y, color, alpha: 1, vy: -2 });
}

export interface TickEvent {
  type: "trashCollected" | "fishCaught" | "obstacleHit" | "trashMissed" | "combo" | "highScore" | "lowHealth" | "encouragement" | "died";
}

/**
 * Advance game by one frame.
 * Returns an array of events that occurred this tick (for mascot comments etc.)
 */
export function tick(
  state: GameState,
  keys: { left: boolean; right: boolean },
  now: number,
  topScore: number,
  dt: number = 1
): TickEvent[] {
  const events: TickEvent[] = [];

  state.gameTime += dt;

  // River scroll
  state.riverOffset += 2 * dt;
  if (state.riverOffset > 40) state.riverOffset = 0;

  // Spawning
  state.spawnTimer += dt;
  const spawnRate = Math.max(30, 60 - state.difficulty * 5);
  if (state.spawnTimer > spawnRate) {
    state.items.push(spawnItem(state));
    state.spawnTimer = 0;
  }

  // Difficulty ramp — time-based + score-based (whichever is higher)
  const timeDiff = 1 + state.gameTime / 500;
  const scoreDiff = state.score / 200;
  state.difficulty = Math.min(6, Math.max(timeDiff, scoreDiff));

  // Kayaker movement
  const speed = 6 * dt;
  if (keys.left) state.kayaker.x -= speed;
  if (keys.right) state.kayaker.x += speed;
  state.kayaker.x = Math.max(50, Math.min(CANVAS_W - 100, state.kayaker.x));

  // Combo timeout
  if (now - state.lastTrashTime > 2000) {
    state.comboCount = 0;
  }

  // Update items
  const k = state.kayaker;
  for (let i = state.items.length - 1; i >= 0; i--) {
    const item = state.items[i];
    item.y += item.speed * dt;
    item.wobble += 0.1 * dt;
    item.x += Math.sin(item.wobble) * 0.5 * dt;

    // Collision with kayaker
    if (
      item.y + item.size > k.y &&
      item.y < k.y + k.height &&
      item.x + item.size > k.x &&
      item.x < k.x + k.width
    ) {
      if (item.type === "trash") {
        state.score += item.points;
        state.trashCollected++;
        state.comboCount++;
        state.lastTrashTime = now;
        addFloatingText(state, `+${item.points}`, item.x, item.y, "#00FF00");

        if (state.comboCount >= 5) {
          events.push({ type: "combo" });
        } else if (state.trashCollected % 10 === 0) {
          events.push({ type: "trashCollected" });
        }
        if (state.score > 0 && state.score >= topScore) {
          events.push({ type: "highScore" });
        }
      } else if (item.type === "fish") {
        state.score += item.points;
        state.fishCaught++;
        state.comboCount = 0;
        addFloatingText(state, `${item.points}`, item.x, item.y, "#FF6B6B");
        events.push({ type: "fishCaught" });
      } else if (item.type === "obstacle") {
        state.lives -= item.damage;
        state.obstaclesHit++;
        state.comboCount = 0;
        addFloatingText(state, "-\u2764\uFE0F", item.x, item.y, "#FF0000");
        events.push({ type: "obstacleHit" });

        if (state.lives === 1) {
          events.push({ type: "lowHealth" });
        }
        if (state.lives <= 0) {
          state.running = false;
          events.push({ type: "died" });
          state.items.splice(i, 1);
          break;
        }
      }
      state.items.splice(i, 1);
      continue;
    }

    // Off-screen (missed)
    if (item.y > CANVAS_H + 50) {
      if (item.type === "trash") {
        state.score -= 5;
        state.comboCount = 0;
        addFloatingText(state, "-5", item.x, CANVAS_H - 20, "#FFA500");
        if (Math.random() < 0.3) {
          events.push({ type: "trashMissed" });
        }
      }
      state.items.splice(i, 1);
    }
  }

  // Random encouragement
  if (state.gameTime % 600 === 0 && state.score > 0) {
    events.push({ type: "encouragement" });
  }

  // Update floating texts
  for (let i = state.floatingTexts.length - 1; i >= 0; i--) {
    const ft = state.floatingTexts[i];
    ft.y += ft.vy * dt;
    ft.alpha -= 0.02 * dt;
    if (ft.alpha <= 0) state.floatingTexts.splice(i, 1);
  }

  return events;
}
