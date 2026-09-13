import { selectedRepair } from './restoration.engine';
import type { RestorationDefinition, RestorationState } from './restoration.models';

const images = new Map<string, Promise<HTMLImageElement>>();
function loadImage(src: string): Promise<HTMLImageElement> {
  let promise = images.get(src);
  if (!promise) { promise = new Promise((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = () => { images.delete(src); reject(new Error('A painting layer could not load. Retry the download when it is available.')); }; img.src = src; }); images.set(src, promise); }
  return promise;
}
function wrap(ctx: CanvasRenderingContext2D, text: string, width: number): string[] {
  return text.split('\n').flatMap(paragraph => { const lines: string[] = []; let line = ''; for (const word of paragraph.split(/\s+/)) { const next = line ? line + ' ' + word : word; if (ctx.measureText(next).width > width && line) { lines.push(line); line = word; } else line = next; } return [...lines, line]; });
}
export async function renderRestoration(definition: RestorationDefinition, state: RestorationState, original = false, size = 1024): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas'); canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('Image export is not available in this browser.');
  const base = await loadImage(definition.image.src), { frame, grid } = definition.image;
  const sw = base.naturalWidth / grid, sh = base.naturalHeight / grid;
  ctx.drawImage(base, frame % grid * sw, Math.floor(frame / grid) * sh, sw, sh, 0, 0, size, size);
  for (const region of definition.regions) {
    const option = original ? region.options.find(o => o.id === region.originalOptionId)! : selectedRepair(region, state);
    const x = size * region.x / 100, y = size * region.y / 100, w = size * region.width / 100, h = size * region.height / 100;
    if (option.image) { const img = await loadImage(option.image), scale = Math.min(w / img.naturalWidth, h / img.naturalHeight); const dw = img.naturalWidth * scale, dh = img.naturalHeight * scale; ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh); }
    if (option.text) {
      ctx.fillStyle = '#e8d5a4'; ctx.fillRect(x, y, w, h); ctx.strokeStyle = '#755d2f'; ctx.lineWidth = size / 350; ctx.strokeRect(x, y, w, h);
      let font = Math.round(size / 32); ctx.font = `${font}px Georgia`; let lines = wrap(ctx, option.text, w - 24);
      while (lines.length * font * 1.25 > h - 8 && font > 10) { font--; ctx.font = `${font}px Georgia`; lines = wrap(ctx, option.text, w - 24); }
      ctx.fillStyle = '#302513'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; lines.forEach((line, i) => ctx.fillText(line, x + w / 2, y + h / 2 + (i - (lines.length - 1) / 2) * font * 1.25));
    }
  }
  return canvas;
}
export async function comparisonImage(definition: RestorationDefinition, state: RestorationState): Promise<Blob> {
  const before = await renderRestoration(definition, state, true), after = await renderRestoration(definition, state);
  const canvas = document.createElement('canvas'); canvas.width = 2108; canvas.height = 1136; const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#16251f'; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = '#f2dfb3'; ctx.font = '24px Georgia';
  ctx.fillText('Original forged study', 20, 36); ctx.fillText('Student reconstruction', 1064, 36); ctx.drawImage(before, 20, 52); ctx.drawImage(after, 1064, 52);
  ctx.font = '20px Arial'; ctx.fillText(`${definition.title} · ${definition.location} · ${definition.date}`, 20, 1112);
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Could not create the comparison image.')), 'image/png'));
}
export function downloadFile(blob: Blob, filename: string): void { const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
export const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
