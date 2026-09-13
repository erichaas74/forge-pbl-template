import type { MachineRenderer, MachineView } from './machine-surface';
import { MachineSurface } from './machine-surface';
import type { FractionGear, TimingWheels } from './machine.models';
import { machineReading } from './machine.rules';

export function fractionRenderer(s: MachineSurface, d: FractionGear): MachineRenderer {
  return {
    settled: () => true,
    destroy: () => s.destroy(),
    draw: (v: MachineView, _dt: number, time: number) => {
      if (v.answer.kind !== 'fraction-gear') return;
      const a = v.answer,
        g = s.g;
      g.clear();
      const cx = 530,
        cy = 300,
        r = 170;
      g.fillStyle(0x030e13, 0.6).fillCircle(cx + 6, cy + 10, r + 13);
      g.fillStyle(0x12373c).fillCircle(cx, cy, r + 7);
      g.lineStyle(5, 0xa79363).strokeCircle(cx, cy, r + 8);
      for (let i = 0; i < d.slots; i++) {
        const angle = (i / d.slots) * Math.PI * 2 - Math.PI / 2;
        s.bar(
          cx + Math.cos(angle) * (r + 12),
          cy + Math.sin(angle) * (r + 12),
          cx + Math.cos(angle) * (r + 20),
          cy + Math.sin(angle) * (r + 20),
          2,
          0x698c89,
        );
      }
      const solved = machineReading(d, a).solved,
        spin = solved && v.testing && !v.reducedMotion ? time * 0.4 : 0;
      d.pieces.forEach((piece, i) => {
        const dragging = s.dragging?.key === `sector-${i}` ? s.dragging : null;
        const placed = a.offsets[i] >= 0,
          pr = dragging ? 105 : placed ? r : 61;
        const start = placed
            ? (a.offsets[i] / d.slots) * Math.PI * 2 - Math.PI / 2 + spin
            : -Math.PI / 2,
          arc = (piece.numerator / piece.denominator) * Math.PI * 2;
        const px = dragging
          ? dragging.x - Math.cos(start + arc / 2) * pr * 0.65
          : placed
            ? cx
            : 200 + i * 132;
        const py = dragging
          ? dragging.y - Math.sin(start + arc / 2) * pr * 0.65
          : placed
            ? cy
            : 580;
        g.fillStyle(0x050f13, 0.5)
          .slice(px + 4, py + 5, pr, start, start + arc, false)
          .fillPath();
        g.fillStyle([0xc29a56, 0x71a6a1, 0xb79165, 0x7e9db0][i % 4], 0.96)
          .slice(px, py, pr, start, start + arc, false)
          .fillPath();
        g.lineStyle(v.selected === i ? 4 : 2, v.selected === i ? 0xffedb9 : 0xf2db9d, 0.9)
          .slice(px, py, pr, start, start + arc, false)
          .strokePath();
        const toothCount = (d.teeth * piece.numerator) / piece.denominator;
        for (let n = 0; n < toothCount; n++) {
          const angle = start + ((n + 0.5) / d.teeth) * Math.PI * 2;
          s.bar(
            px + Math.cos(angle) * (pr - 5),
            py + Math.sin(angle) * (pr - 5),
            px + Math.cos(angle) * (pr + 5),
            py + Math.sin(angle) * (pr + 5),
            placed ? 5 : 2,
            0xe6c27d,
          );
        }
        const mid = start + arc / 2,
          lx = px + Math.cos(mid) * pr * 0.65,
          ly = py + Math.sin(mid) * pr * 0.65;
        s.text(
          `fraction-${i}`,
          lx,
          ly,
          `${piece.numerator}/${piece.denominator}`,
          placed ? 24 : 19,
          '#fff2d1',
        );
        s.zone(
          `sector-${i}`,
          placed ? lx : px + 15,
          placed ? ly : py - 15,
          placed ? 80 : 105,
          85,
          () => s.cb.select(i),
          (x, y) => {
            const distance = Math.hypot(x - cx, y - cy);
            if (distance > r + 100) {
              s.cb.input({ type: 'piece', index: i, offset: -1 });
              return;
            }
            const angle =
              (Math.atan2(y - cy, x - cx) - arc / 2 + Math.PI / 2 + Math.PI * 2) % (Math.PI * 2);
            s.cb.input({
              type: 'piece',
              index: i,
              offset: Math.round((angle / (Math.PI * 2)) * d.slots) % d.slots,
            });
          },
        );
      });
      const coverage = Array.from({ length: d.slots }, () => 0);
      d.pieces.forEach((p, i) => {
        if (a.offsets[i] >= 0)
          for (let j = 0; j < (d.slots * p.numerator) / p.denominator; j++)
            coverage[(a.offsets[i] + j) % d.slots]++;
      });
      coverage.forEach((count, i) => {
        if (count > 1) {
          const angle = ((i + 0.5) / d.slots) * Math.PI * 2 - Math.PI / 2;
          g.fillStyle(0xf48b70).fillCircle(
            cx + Math.cos(angle) * (r + 16),
            cy + Math.sin(angle) * (r + 16),
            5,
          );
        }
      });
      s.bolt(cx, cy, 25);
      s.plate('ring-label', cx, 91, `${d.slots} RIM MARKS · BUILD ONE WHOLE`, 400);
      s.plate('tray-label', 550, 654, 'SECTOR TRAY · DRAG / ROTATE / SEAT', 440);
      s.text(
        'help',
        875,
        265,
        'A complete rim\ntransfers the motion.\n\nGaps stop the drive.',
        18,
        '#b9ded1',
      );
      if (solved) {
        g.lineStyle(4, 0x98e8c0).strokeCircle(cx, cy, r + 9);
        s.bar(710, 300, 1085, 300, 7, 0xb6cfa4);
      }
    },
  };
}
export function timingRenderer(s: MachineSurface, d: TimingWheels): MachineRenderer {
  let shown = 0;
  return {
    settled: () => true,
    destroy: () => s.destroy(),
    draw: (v, dt) => {
      if (v.answer.kind !== 'timing-wheels') return;
      const a = v.answer,
        g = s.g;
      g.clear();
      shown = v.reducedMotion ? a.steps : shown + (a.steps - shown) * Math.min(1, dt * 8);
      const spacing = 720 / d.periods.length,
        r = Math.min(130, spacing * 0.4),
        start = 210 + spacing / 2;
      d.periods.forEach((period, i) => {
        const x = start + i * spacing,
          y = 295,
          phase = ((shown + d.phases[i]) / period) * Math.PI * 2;
        g.fillStyle(0x051116, 0.7).fillCircle(x + 8, y + 10, r + 8);
        g.fillGradientStyle(0xe4c887, 0x7a5c38, 0x5e4c32, 0xc6a66b).fillCircle(x, y, r);
        g.lineStyle(4, 0xd4bb80).strokeCircle(x, y, r);
        g.lineStyle(2, 0xffefbd, 0.8).strokeCircle(x + r * 0.48, y, 25);
        for (let n = 0; n < period; n++) {
          const angle = (n / period) * Math.PI * 2 + phase;
          s.bar(x, y, x + Math.cos(angle) * (r - 9), y + Math.sin(angle) * (r - 9), 2, 0x7c714c);
          s.text(
            `wheel-${i}-${n}`,
            x + Math.cos(angle) * (r * 0.74),
            y + Math.sin(angle) * (r * 0.74),
            String(n),
            16,
          );
        }
        const hx = x + Math.cos(phase) * r * 0.48,
          hy = y + Math.sin(phase) * r * 0.48;
        g.fillStyle(0x07191d).fillCircle(hx, hy, 19);
        g.lineStyle(3, 0xc0ede0).strokeCircle(hx, hy, 20);
        s.bolt(x, y, 12);
        s.plate(`period-${i}`, x, 465, `WHEEL ${i + 1} · ${period} STEPS`, 210);
        s.text(`phase-${i}`, x, 502, `Starting offset ${d.phases[i]}`, 15, '#b7d8cf');
        s.zone(`wheel-zone-${i}`, x, y, r * 2, r * 2, () =>
          s.cb.input({ type: 'steps', value: Math.min(d.maxSteps, a.steps + 1) }),
        );
      });
      const reading = machineReading(d, a),
        rod = reading.solved ? 1 : v.testing ? 0.3 : 0;
      s.bar(175, 295, 175 + rod * 805, 295, 11, reading.solved ? 0xb7efcb : 0x90a5a1);
      s.plate('steps', 590, 100, `${a.steps} SHARED CRANK STEPS`, 420);
      s.text(
        'timing-help',
        590,
        560,
        d.firstAlignment
          ? 'Catch the first positive shared opening.'
          : 'Line up every opening at the same step.',
        21,
      );
      s.zone('rewind', 300, 615, 160, 50, () =>
        s.cb.input({ type: 'steps', value: Math.max(0, a.steps - 1) }),
      );
      s.plate('rewind-label', 300, 615, '− REWIND', 160);
      s.zone('forward', 890, 615, 160, 50, () =>
        s.cb.input({ type: 'steps', value: Math.min(d.maxSteps, a.steps + 1) }),
      );
      s.plate('forward-label', 890, 615, 'ADVANCE +', 160);
    },
  };
}
