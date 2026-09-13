import { CanvasTexture, SRGBColorSpace } from 'three';
import type { BroadcastConfig, StudioTeam, StudioView } from './broadcast.models';

export class StudioScreen {
  readonly canvas = document.createElement('canvas');
  readonly context: CanvasRenderingContext2D;
  readonly texture: CanvasTexture;
  constructor(width: number, height: number) {
    this.canvas.width = width; this.canvas.height = height;
    this.context = this.canvas.getContext('2d')!;
    this.texture = new CanvasTexture(this.canvas); this.texture.colorSpace = SRGBColorSpace;
  }
  clear(background: string): CanvasRenderingContext2D {
    const ctx = this.context; ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = background; ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); return ctx;
  }
  done(): void { this.texture.needsUpdate = true; }
  dispose(): void { this.texture.dispose(); this.canvas.width = 1; this.canvas.height = 1; }
}
function text(ctx: CanvasRenderingContext2D, value: string, x: number, y: number, size: number, color: string, width: number): void {
  ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = `600 ${size}px Arial, sans-serif`;
  while (ctx.measureText(value).width > width && size > 12) ctx.font = `600 ${--size}px Arial, sans-serif`;
  ctx.fillText(value, x, y);
}
function wrap(ctx: CanvasRenderingContext2D, value: string, width: number): string[] {
  const lines: string[] = []; let current = '';
  for (const word of value.split(/\s+/)) {
    if (ctx.measureText((current ? current + ' ' : '') + word).width > width && current) { lines.push(current); current = word; }
    else current += (current ? ' ' : '') + word;
  }
  if (current) lines.push(current); return lines;
}
export function drawQuestion(screen: StudioScreen, view: StudioView, theme: BroadcastConfig, background?: HTMLImageElement): void {
  const ctx = screen.clear(theme.palette.background); const { width, height } = screen.canvas;
  if (background) { ctx.globalAlpha = .35; ctx.drawImage(background, 0, 0, width, height); ctx.globalAlpha = 1; }
  ctx.fillStyle = theme.palette.accent; ctx.fillRect(100, 55, width - 200, 4);
  text(ctx, view.phase === 'champion' ? 'CHAMPIONSHIP WINNER' : view.prompt ? view.roundTitle.toUpperCase() : 'THE CHAMPIONSHIP', width / 2, 105, 36, theme.palette.accent, width - 220);
  if (view.prompt) {
    let size = 70; let lines: string[];
    do { ctx.font = `600 ${size}px Arial, sans-serif`; lines = wrap(ctx, view.prompt, width - 230); if (lines.length * size * 1.35 < height - 280) break; size -= 2; } while (size > 20);
    const lineHeight = size * 1.35;
    lines.forEach((line, i) => text(ctx, line, width / 2, height / 2 - lines.length * lineHeight / 2 + i * lineHeight + 50, size, theme.palette.text, width - 220));
    if (['open', 'paused'].includes(view.phase)) text(ctx, `${view.seconds} SECONDS${view.phase === 'paused' ? ' · PAUSED' : ''}`, width / 2, height - 60, 28, theme.palette.accent, width - 200);
  } else {
    const winner = view.teams.find(t => t.id === view.winnerId);
    text(ctx, winner?.name.toUpperCase() ?? view.title.toUpperCase(), width / 2, height / 2, 102, theme.palette.text, width - 220);
    text(ctx, winner ? 'A PERFORMANCE TO REMEMBER' : 'EVERY TEAM HAS A STORY', width / 2, height / 2 + 120, 30, theme.palette.accent, width - 200);
  }
  screen.done();
}
export function drawPodium(screen: StudioScreen, team: StudioTeam, theme: BroadcastConfig, emblem?: HTMLImageElement): void {
  const ctx = screen.clear('#070e1b'); const width = screen.canvas.width;
  const glow = ctx.createLinearGradient(0, 0, width, 0); glow.addColorStop(0, '#070e1b'); glow.addColorStop(.5, team.color); glow.addColorStop(1, '#070e1b');
  ctx.fillStyle = glow; ctx.fillRect(0, 0, width, 10);
  if (emblem) ctx.drawImage(emblem, width / 2 - 100, 40, 200, 200);
  else {
    ctx.strokeStyle = team.color; ctx.lineWidth = 6; ctx.beginPath();
    for (let i = 0; i < 6; i++) { const angle = Math.PI / 3 * i - Math.PI / 2; const x = width / 2 + Math.cos(angle) * 82; const y = 140 + Math.sin(angle) * 82; if (!i) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
    ctx.closePath(); ctx.stroke(); text(ctx, team.name.slice(0, 2).toUpperCase(), width / 2, 145, 65, team.color, 135);
  }
  text(ctx, team.name.toUpperCase(), width / 2, 280, 48, theme.palette.text, width - 50);
  text(ctx, String(team.score), width / 2, 390, 108, '#ffffff', width - 50);
  text(ctx, `SEED ${team.seed}`, width / 2, 475, 23, team.color, width - 50); screen.done();
}

/** Starburst behind a verdict. Drawn in canvas rather than as art so any palette works. */
function rays(ctx: CanvasRenderingContext2D, cx: number, cy: number, color: string, spin: number): void {
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(spin); ctx.globalAlpha = .16; ctx.fillStyle = color;
  for (let i = 0; i < 24; i++) {
    ctx.rotate(Math.PI / 12); ctx.beginPath(); ctx.moveTo(0, 0);
    ctx.lineTo(2600, -110); ctx.lineTo(2600, 110); ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}
function stamp(ctx: CanvasRenderingContext2D, label: string, x: number, y: number, color: string, scale: number): void {
  ctx.save(); ctx.translate(x, y); ctx.rotate(-.06); ctx.scale(scale, scale);
  ctx.lineWidth = 9; ctx.strokeStyle = color; ctx.globalAlpha = .9;
  const w = 30 + label.length * 46;
  ctx.beginPath(); ctx.roundRect(-w / 2, -62, w, 124, 14); ctx.stroke();
  text(ctx, label, 0, 2, 86, color, w - 30); ctx.restore();
}
/**
 * The moment the points land. One answering team gets the full-bleed treatment;
 * a field of teams gets a results board so nobody has to hunt for their own score.
 */
export function drawVerdict(screen: StudioScreen, view: StudioView, theme: BroadcastConfig, spin: number, reveal: number): void {
  const ctx = screen.clear(theme.palette.background); const { width, height } = screen.canvas;
  const scored = view.teams.filter(t => t.verdict !== null);
  const hero = scored.length === 1 ? scored[0] : undefined;
  const winner = hero ?? scored.find(t => t.verdict === 'correct');
  const glowColor = hero ? (hero.verdict === 'correct' ? hero.color : '#e0736b') : theme.palette.accent;
  rays(ctx, width / 2, height / 2, glowColor, spin);
  const wash = ctx.createRadialGradient(width / 2, height / 2, 40, width / 2, height / 2, width * .62);
  wash.addColorStop(0, `${glowColor}2e`); wash.addColorStop(1, '#00000000');
  ctx.fillStyle = wash; ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = theme.palette.accent; ctx.fillRect(100, 55, (width - 200) * reveal, 4);
  text(ctx, 'THE SCORES ARE IN', width / 2, 105, 34, theme.palette.accent, width - 220);

  if (hero) {
    const correct = hero.verdict === 'correct';
    stamp(ctx, correct ? 'CORRECT' : 'NOT THIS TIME', width / 2, 300, correct ? hero.color : '#e0736b', .8 + reveal * .35);
    text(ctx, hero.name.toUpperCase(), width / 2, 470, 84, theme.palette.text, width - 260);
    const delta = hero.award ?? 0;
    text(ctx, `${delta >= 0 ? '+' : '−'}${Math.abs(delta)} POINTS`, width / 2, 610,
      Math.round(96 * (.7 + reveal * .3)), correct ? hero.color : '#e0736b', width - 260);
    text(ctx, `${hero.score} TOTAL`, width / 2, 730, 40, theme.palette.text, width - 260);
    screen.done(); return;
  }
  const rows = scored.slice(0, 8);
  const top = 210; const rowHeight = Math.min(92, (height - top - 90) / Math.max(1, rows.length));
  rows.forEach((team, i) => {
    const y = top + i * rowHeight; const correct = team.verdict === 'correct';
    const appeared = Math.max(0, Math.min(1, reveal * rows.length - i));
    if (appeared <= 0) return;
    ctx.save(); ctx.globalAlpha = appeared;
    ctx.fillStyle = team.id === winner?.id ? `${team.color}26` : '#0c1526cc';
    ctx.fillRect(150, y, width - 300, rowHeight - 12);
    ctx.fillStyle = correct ? team.color : '#e0736b'; ctx.fillRect(150, y, 8, rowHeight - 12);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.font = `600 ${Math.round(rowHeight * .42)}px Arial, sans-serif`;
    ctx.fillStyle = theme.palette.text; ctx.fillText(team.name, 200, y + (rowHeight - 12) / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = correct ? team.color : '#e0736b';
    ctx.fillText(correct ? '✓' : '✗', width - 620, y + (rowHeight - 12) / 2);
    const delta = team.award ?? 0;
    ctx.fillText(`${delta >= 0 ? '+' : '−'}${Math.abs(delta)}`, width - 420, y + (rowHeight - 12) / 2);
    ctx.fillStyle = theme.palette.text; ctx.fillText(String(team.score), width - 200, y + (rowHeight - 12) / 2);
    ctx.restore();
  });
  screen.done();
}
