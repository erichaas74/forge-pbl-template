import type { Mixing, Volume } from './machine.models';
import { MachineSurface, round, type MachineRenderer } from './machine-surface';

function tank(
  s: MachineSurface,
  x: number,
  y: number,
  width: number,
  height: number,
  level: number,
  color: number,
  time: number,
  target: number,
): void {
  const g = s.g,
    bottom = y + height,
    fill = Math.max(0, Math.min(1, level)) * height;
  g.fillStyle(0x020c12, 0.6).fillRoundedRect(x + 8, y + 9, width, height, 22);
  g.fillGradientStyle(0x1c5568, 0x0a2635, 0x143c49, 0x081923, 0.7).fillRoundedRect(
    x,
    y,
    width,
    height,
    22,
  );
  if (fill > 1) {
    g.fillStyle(color, 0.75).fillRoundedRect(
      x + 6,
      bottom - fill,
      width - 12,
      Math.max(10, fill - 5),
      10,
    );
    g.lineStyle(3, 0xc9f8ec, 0.6);
    g.beginPath();
    for (let i = 0; i <= 30; i++) {
      const px = x + 8 + ((width - 16) * i) / 30,
        py = bottom - fill + Math.sin(time * 2 + i * 0.7) * 3;
      i ? g.lineTo(px, py) : g.moveTo(px, py);
    }
    g.strokePath();
    for (let i = 0; i < 12; i++) {
      const bx = x + 17 + ((i * 47) % (width - 34)),
        by = bottom - ((time * 21 + i * 27) % Math.max(1, fill));
      g.lineStyle(1, 0xc9f8e7, 0.35).strokeCircle(bx, by, 2 + (i % 3));
    }
  }
  g.lineStyle(5, 0x9cbfba, 0.9).strokeRoundedRect(x, y, width, height, 22);
  g.lineStyle(10, 0xefffff, 0.12).lineBetween(x + 16, y + 27, x + 16, bottom - 24);
  for (let i = 0; i <= 10; i++) {
    const ty = bottom - (height * i) / 10;
    g.lineStyle(i % 5 === 0 ? 3 : 1, 0xebeee0, 0.65).lineBetween(
      x + width - 20,
      ty,
      x + width - 5,
      ty,
    );
  }
  const targetY = bottom - target * height;
  s.bar(x - 14, targetY, x + width + 14, targetY, 2, 0xe8c67c);
  // Floating brass piston follows volume, rather than an arbitrary success flag.
  s.bar(x + width / 2, bottom - fill - 15, x + width / 2, y - 35, 5, 0xaaa88c);
  g.fillStyle(0xd1af64).fillEllipse(x + width / 2, bottom - fill - 7, width * 0.62, 18);
  g.lineStyle(2, 0xffe6aa).strokeEllipse(x + width / 2, bottom - fill - 7, width * 0.62, 18);
  s.bar(x - 5, bottom + 6, x + width + 5, bottom + 6, 12, 0xa98951);
}
export function volumeRenderer(s: MachineSurface, d: Volume): MachineRenderer {
  let shown = 0,
    target = 0;
  return {
    settled: () => Math.abs(shown - target) < 0.0005,
    destroy: () => s.destroy(),
    draw: (v, dt, time) => {
      if (v.answer.kind !== 'volume') return;
      const a = v.answer,
        g = s.g;
      g.clear();
      const total = a.pours.reduce((sum, n, i) => sum + n * d.vessels[i].amount, 0);
      target = total / d.capacity;
      shown = v.reducedMotion ? target : shown + (target - shown) * Math.min(1, dt * 4);
      tank(s, 470, 175, 235, 320, shown, 0x37b2b5, time, d.target / d.capacity);
      s.plate(
        'target',
        585,
        95,
        `RELEASE AT ${d.targetLabel ?? `${round(d.target / d.unitTicks)} ${d.unit}`}`,
        350,
      );
      s.text(
        'capacity',
        827,
        233,
        `CAPACITY\n${round(d.capacity / d.unitTicks)} ${d.unit}`,
        20,
        '#b7d7ce',
      );
      s.text(
        'fill',
        585,
        360,
        `${round((Math.min(shown, 1) * d.capacity) / d.unitTicks)} ${d.unit}`,
        30,
        '#f6fff3',
      );
      s.bar(710, 430, 1040, 430, 15, 0x5b8f87);
      s.bar(1040, 430, 1040, 320, 15, 0x5b8f87);
      s.bolt(885, 430, 20);
      if (total > d.capacity) {
        g.fillStyle(0x40bac4, 0.5).fillRect(714, 480, 190, 26);
        s.text(
          'overflow',
          820,
          527,
          `OVERFLOW ${round((total - d.capacity) / d.unitTicks)} ${d.unit}`,
          17,
          '#f7c37e',
        );
      }
      d.vessels.forEach((vessel, i) => {
        const x = 205 + i * 157,
          y = 584,
          remaining = vessel.uses - a.pours[i],
          fill = (0.6 * vessel.amount) / Math.max(...d.vessels.map((b) => b.amount));
        g.fillStyle(0x163846).fillRoundedRect(x - 35, y - 54, 70, 88, 10);
        g.fillStyle(0x3d9ea8, remaining ? 0.7 : 0.12).fillRoundedRect(
          x - 29,
          y + 28 - fill * 85,
          58,
          Math.max(4, fill * 85),
          6,
        );
        g.lineStyle(3, 0xb4d8d0).strokeRoundedRect(x - 35, y - 54, 70, 88, 10);
        s.bar(x - 20, y - 55, x + 20, y - 55, 7, 0xb49d6b);
        s.text(`vessel-${i}`, x, y - 8, vessel.label, 19);
        s.text(`uses-${i}`, x, y + 52, `${remaining} pours`, 14, '#c1d8ca');
        s.zone(
          `pour-${i}`,
          x,
          y - 10,
          90,
          110,
          () => s.cb.input({ type: 'pour', index: i, delta: 1 }),
          (px, py) => {
            if (px > 410 && px < 760 && py > 110 && py < 500)
              s.cb.input({ type: 'pour', index: i, delta: 1 });
          },
        );
      });
      if (Math.abs(shown - target) > 0.001) {
        g.lineStyle(6, 0x8be5dd, 0.75).lineBetween(583, 136, 583, 495 - Math.min(shown, 1) * 320);
        s.text('pouring', 827, 318, 'TRANSFERRING', 17);
      } else s.text('pouring', 827, 318, '', 17);
    },
  };
}
export function mixingRenderer(s: MachineSurface, d: Mixing): MachineRenderer {
  let shown = 0,
    target = 0;
  return {
    settled: () => Math.abs(shown - target) < 0.0005,
    destroy: () => s.destroy(),
    draw: (v, dt, time) => {
      if (v.answer.kind !== 'mixing') return;
      const a = v.answer,
        g = s.g;
      g.clear();
      const amounts = a.measures.map((n, i) => n * d.ingredients[i].measure),
        total = amounts.reduce((sum, n) => sum + n, 0);
      target = total / d.capacity;
      shown = v.reducedMotion ? target : shown + (target - shown) * Math.min(1, dt * 4);
      const rgb = [0, 0, 0];
      d.ingredients.forEach((ingredient, i) => {
        const color = parseInt(ingredient.color.slice(1), 16),
          share = total ? amounts[i] / total : 1 / d.ingredients.length;
        rgb[0] += ((color >> 16) & 255) * share;
        rgb[1] += ((color >> 8) & 255) * share;
        rgb[2] += (color & 255) * share;
      });
      const color = (Math.round(rgb[0]) << 16) + (Math.round(rgb[1]) << 8) + Math.round(rgb[2]);
      tank(s, 505, 195, 235, 310, shown, color, time, d.total ? d.total / d.capacity : 0.5);
      s.plate(
        'recipe',
        595,
        95,
        `TARGET PARTS ${d.ingredients.map((i) => i.parts).join(' : ')}`,
        360,
      );
      d.ingredients.forEach((ingredient, i) => {
        const x = 265,
          y = 180 + i * 135,
          c = parseInt(ingredient.color.slice(1), 16),
          remaining = ingredient.supply - amounts[i];
        g.fillStyle(0x112d37).fillRoundedRect(x - 50, y - 40, 100, 85, 12);
        g.fillStyle(c, 0.7).fillRoundedRect(
          x - 44,
          y + 35 - (remaining / ingredient.supply) * 67,
          88,
          Math.max(3, (remaining / ingredient.supply) * 67),
          8,
        );
        g.lineStyle(3, 0xa3c8be).strokeRoundedRect(x - 50, y - 40, 100, 85, 12);
        s.bar(x + 52, y, 485, y, 9, 0x819d8d);
        s.bar(485, y, 485, 210, 9, 0x819d8d);
        s.bolt(390, y, 17);
        s.text(`ingredient-${i}`, x, y - 64, `${i + 1}. ${ingredient.label}`, 18);
        s.text(`amount-${i}`, x, y + 64, `${round(amounts[i] / d.unitTicks)} ${d.unit} added`, 16);
        s.zone(`pump-${i}`, 390, y, 60, 60, () =>
          s.cb.input({ type: 'measure', index: i, delta: 1 }),
        );
      });
      s.bar(745, 433, 935, 433, 13, 0x648b8a);
      g.fillStyle(color, 0.8).fillRoundedRect(893, 297, 74, 124, 12);
      g.lineStyle(4, 0xb2d3c2).strokeRoundedRect(893, 297, 74, 124, 12);
      const parts = d.ingredients.reduce((n, i) => n + i.parts, 0),
        actual = total ? amounts[0] / total : 0,
        desired = d.ingredients[0].parts / parts;
      g.fillStyle(0x0a2029).fillRoundedRect(827, 178, 210, 83, 12);
      g.lineStyle(2, 0xae915d).strokeRoundedRect(827, 178, 210, 83, 12);
      s.bar(846, 239, 1018, 239, 4, 0x426f72);
      s.bar(846 + desired * 172, 218, 846 + desired * 172, 245, 4, 0xf2d197);
      s.bar(846 + actual * 172, 230, 846 + actual * 172, 251, 5, 0x93e2d3);
      s.text('sensor', 932, 204, 'COMPOSITION SENSOR', 15);
      s.text('mixture-total', 622, 366, `${round(total / d.unitTicks)} ${d.unit}`, 29, '#efffea');
      s.text(
        'mix-help',
        935,
        491,
        '',
        16,
      );
      const angle = v.reducedMotion ? 0 : time * 1.5;
      s.bar(622, 147, 622, 390, 7, 0x9ba69a);
      s.bar(622 - Math.cos(angle) * 75, 405, 622 + Math.cos(angle) * 75, 405, 8, 0xe4c080);

    },
  };
}
