import type { PanoramaDefinition, PanoramaState } from './panorama.models';
async function image(src: string) { return new Promise<HTMLImageElement>((resolve, reject) => { const i = new Image(); i.onload = () => resolve(i); i.onerror = () => reject(new Error('Scene artwork could not load.')); i.src = src; }); }
export async function renderPanoramaPainting(d: PanoramaDefinition, s: PanoramaState, original = false): Promise<HTMLCanvasElement> {
  const [base, forged] = await Promise.all([image(d.panorama), image(d.forgery)]);
  const c = document.createElement('canvas'); c.width = base.naturalWidth; c.height = base.naturalHeight;
  const ctx = c.getContext('2d'); if (!ctx) throw new Error('Image export unavailable.');
  ctx.drawImage(base, 0, 0, c.width, c.height);
  for (const r of d.repairs) if (original || !s.repairs[r.id]) {
    const { x, y, width, height } = r.rect;
    ctx.drawImage(forged, forged.naturalWidth * x / 100, forged.naturalHeight * y / 100, forged.naturalWidth * width / 100, forged.naturalHeight * height / 100, c.width * x / 100, c.height * y / 100, c.width * width / 100, c.height * height / 100);
  }
  return c;
}
