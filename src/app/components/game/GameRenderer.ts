/* ─── Canvas rendering functions — ported from standalone game ─── */

import type { GameState } from "./types";
import { CANVAS_W, CANVAS_H, COLORS, FISHERMEN } from "./constants";

/* ─── Background: sky gradient + river + banks ─── */

export function drawBackground(ctx: CanvasRenderingContext2D) {
  const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
  gradient.addColorStop(0, COLORS.sky1);
  gradient.addColorStop(0.3, COLORS.sky2);
  gradient.addColorStop(1, COLORS.river);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
}

export function drawBanks(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = COLORS.bank;
  ctx.fillRect(0, 0, 55, CANVAS_H);
  ctx.fillRect(395, 0, 55, CANVAS_H);

  ctx.fillStyle = COLORS.bankDark;
  for (let y = 0; y < CANVAS_H; y += 30) {
    ctx.beginPath();
    ctx.arc(45, y + 15, 8, 0, Math.PI, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(405, y + 15, 8, 0, Math.PI, true);
    ctx.fill();
  }

  drawTree(ctx, 25, 100);
  drawTree(ctx, 420, 300);
  drawTree(ctx, 15, 500);
  drawTree(ctx, 430, 150);
}

function drawTree(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(x - 5, y, 10, 30);
  ctx.fillStyle = "#228B22";
  ctx.beginPath();
  ctx.arc(x, y - 10, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#2E8B2E";
  ctx.beginPath();
  ctx.arc(x - 8, y, 15, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + 8, y, 15, 0, Math.PI * 2);
  ctx.fill();
}

export function drawRiver(
  ctx: CanvasRenderingContext2D,
  riverOffset: number
) {
  ctx.fillStyle = COLORS.river;
  ctx.fillRect(50, 0, 350, CANVAS_H);

  ctx.strokeStyle = COLORS.riverLight;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.4;

  for (let i = 0; i < 8; i++) {
    const x = 80 + i * 45;
    ctx.beginPath();
    for (let y = -40 + riverOffset; y < CANVAS_H; y += 40) {
      ctx.moveTo(x + Math.sin(y * 0.02) * 10, y);
      ctx.lineTo(x + Math.sin((y + 20) * 0.02) * 10, y + 20);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

export function drawFishermen(ctx: CanvasRenderingContext2D) {
  for (const f of FISHERMEN) {
    ctx.save();
    ctx.translate(f.x, f.y);
    if (f.flip) ctx.scale(-1, 1);

    // Head
    ctx.fillStyle = "#FFE4C4";
    ctx.beginPath();
    ctx.arc(10, 0, 8, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.fillStyle = "#4169E1";
    ctx.fillRect(5, 8, 10, 20);

    // Rod
    ctx.strokeStyle = "#8B4513";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(15, 15);
    ctx.lineTo(45, -10);
    ctx.stroke();

    // Line
    ctx.strokeStyle = "#DDD";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(45, -10);
    ctx.lineTo(50, 30);
    ctx.stroke();

    ctx.restore();
  }
}

/* ─── Kayaker ─── */

export function drawKayaker(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) {
  ctx.save();
  ctx.translate(x + width / 2, y + height / 2);

  // Kayak hull
  ctx.fillStyle = COLORS.kayakYellow;
  ctx.beginPath();
  ctx.ellipse(0, 20, 35, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = COLORS.kayakOrange;
  ctx.beginPath();
  ctx.ellipse(0, 20, 35, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cockpit
  ctx.fillStyle = "#FFEC8B";
  ctx.beginPath();
  ctx.ellipse(0, 15, 25, 6, 0, Math.PI, Math.PI * 2);
  ctx.fill();

  // Body (life vest)
  ctx.fillStyle = "#FF6347";
  ctx.beginPath();
  ctx.ellipse(0, 0, 12, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.fillStyle = "#FFE4C4";
  ctx.beginPath();
  ctx.arc(0, -20, 10, 0, Math.PI * 2);
  ctx.fill();

  // Hair / helmet
  ctx.fillStyle = "#FFD700";
  ctx.beginPath();
  ctx.arc(0, -22, 10, Math.PI, Math.PI * 2);
  ctx.fill();

  // Eyes
  ctx.fillStyle = "#333";
  ctx.beginPath();
  ctx.arc(-3, -20, 2, 0, Math.PI * 2);
  ctx.arc(3, -20, 2, 0, Math.PI * 2);
  ctx.fill();

  // Smile
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, -18, 4, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // Paddle (animated)
  const paddleAngle = Math.sin(Date.now() * 0.005) * 0.3;
  ctx.save();
  ctx.rotate(paddleAngle);

  ctx.fillStyle = "#8B4513";
  ctx.fillRect(-40, -5, 80, 6);

  ctx.fillStyle = "#DEB887";
  ctx.beginPath();
  ctx.ellipse(-42, -2, 8, 15, 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(42, -2, 8, 15, -0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
  ctx.restore();
}

/* ─── Items (emoji) ─── */

export function drawItems(
  ctx: CanvasRenderingContext2D,
  state: GameState
) {
  for (const item of state.items) {
    ctx.font = `${item.size}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = 3;
    ctx.fillText(item.emoji, item.x + item.size / 2, item.y + item.size / 2);
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
  }
}

/* ─── Floating score texts ─── */

export function drawFloatingTexts(
  ctx: CanvasRenderingContext2D,
  state: GameState
) {
  for (const ft of state.floatingTexts) {
    ctx.globalAlpha = ft.alpha;
    ctx.font = "bold 24px Arial";
    ctx.fillStyle = ft.color;
    ctx.textAlign = "center";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.strokeText(ft.text, ft.x, ft.y);
    ctx.fillText(ft.text, ft.x, ft.y);
    ctx.globalAlpha = 1;
  }
}

/* ─── HUD (score + lives + combo) ─── */

export function drawHUD(ctx: CanvasRenderingContext2D, state: GameState) {
  ctx.fillStyle = "white";
  ctx.font = "bold 28px Arial";
  ctx.textAlign = "left";
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 4;
  ctx.fillText(`\u{1F3C6} ${state.score}`, 15, 35);

  // Combo
  if (state.comboCount >= 3) {
    ctx.font = "bold 18px Arial";
    ctx.fillStyle = "#FFD700";
    ctx.fillText(`\u{1F525} x${state.comboCount}`, 15, 60);
  }

  // Lives
  ctx.textAlign = "right";
  ctx.font = "bold 28px Arial";
  ctx.fillStyle = "white";
  let hearts = "";
  for (let i = 0; i < 3; i++) {
    hearts += i < state.lives ? "\u2764\uFE0F" : "\u{1F5A4}";
  }
  ctx.fillText(hearts, CANVAS_W - 15, 35);

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
}

/* ─── Main render frame ─── */

export function renderFrame(
  ctx: CanvasRenderingContext2D,
  state: GameState
) {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  drawBackground(ctx);
  drawBanks(ctx);
  drawRiver(ctx, state.riverOffset);
  drawFishermen(ctx);
  drawItems(ctx, state);
  drawKayaker(
    ctx,
    state.kayaker.x,
    state.kayaker.y,
    state.kayaker.width,
    state.kayaker.height
  );
  drawFloatingTexts(ctx, state);
  drawHUD(ctx, state);
}
