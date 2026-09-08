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
