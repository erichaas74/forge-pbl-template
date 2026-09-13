import type { Cable, Coordinate, Reflection } from './machine.models';
import { cableLength, mirrorSegment, traceBeam } from './machine.geometry';
import { MachineSurface, round, type MachineRenderer } from './machine-surface';
import { machineReading } from './machine.rules';

export function coordinateRenderer(s: MachineSurface, d: Coordinate): MachineRenderer {
  return {
    settled: () => true,
    destroy: () => s.destroy(),
    draw: (v) => {
      if (v.answer.kind !== 'coordinate') return;
      const a = v.answer,
        g = s.g;
      g.clear();
      const unit = 410 / (d.max - d.min),
        left = 355,
        top = 139;
      const px = (x: number) => left + (x - d.min) * unit,
        py = (y: number) => top + (d.max - y) * unit;
      g.fillStyle(0x102e37, 0.94).fillRoundedRect(left - 38, top - 30, 488, 475, 12);
      g.lineStyle(3, 0xa59162).strokeRoundedRect(left - 38, top - 30, 488, 475, 12);
      for (let n = d.min; n <= d.max; n++) {
        const x = px(n),
          y = py(n);
        g.lineStyle(n === 0 ? 3 : 1, n === 0 ? 0xc1cfc0 : 0x41666b, 0.9)
          .lineBetween(x, top, x, top + 410)
          .lineBetween(left, y, left + 410, y);
        s.text(`x-${n}`, x, top + 436, String(n), 14);
        s.text(`y-${n}`, left - 23, y, String(n), 14);
      }
      s.text('x-title', left + 440, top + 427, 'x', 22);
      s.text('y-title', left - 22, top - 51, 'y', 22);
      if (d.goal.mode === 'intersection')
        d.goal.lines.forEach((line, i) => {
          const points: { x: number; y: number }[] = [];
          for (const x of [d.min, d.max])
            if (line.b !== 0) {
              const y = (line.c - line.a * x) / line.b;
              if (y >= d.min && y <= d.max) points.push({ x: px(x), y: py(y) });
            }
          for (const y of [d.min, d.max])
            if (line.a !== 0) {
              const x = (line.c - line.b * y) / line.a;
              if (x >= d.min && x <= d.max) points.push({ x: px(x), y: py(y) });
            }
          if (points.length >= 2)
            s.bar(points[0].x, points[0].y, points[1].x, points[1].y, 5, i ? 0x82bdb3 : 0xb99e63);
          s.text(
            `line-${i}`,
            944,
            210 + i * 60,
            `${line.a}x + ${line.b}y = ${line.c}`,
            19,
            i ? '#a8e3d5' : '#edd18d',
          );
        });
      const x = px(a.x),
        y = py(a.y);
      s.bar(x, top - 16, x, top + 423, 9, 0xb5a47c);
      s.bar(left - 13, y, left + 425, y, 9, 0x739f9e);
      for (let nx = d.min; nx <= d.max; nx++)
        for (let ny = d.min; ny <= d.max; ny++) {
          g.fillStyle(0x05181f, 0.8).fillCircle(px(nx), py(ny), 3);
        }
      s.bolt(x, y, 14);
      g.lineStyle(3, 0xe6f5dd).strokeCircle(x, y, 24);
      s.zone(
        'head',
        x,
        y,
        64,
        64,
        () => {},
        (mx, my) =>
          s.cb.input({
            type: 'point',
            x: Math.max(d.min, Math.min(d.max, Math.round((mx - left) / unit + d.min))),
            y: Math.max(d.min, Math.min(d.max, Math.round(d.max - (my - top) / unit))),
          }),
      );
      s.plate('point', 563, 88, `PIN POSITION (${a.x}, ${a.y})`, 360);
      s.text('axis-help', 214, 293, 'HORIZONTAL\nx first\n\nVERTICAL\ny second', 20, '#b8d9cf');
      s.text('drag-help', 948, 407, 'Drag the crosshair.\nRails click into grid units.', 18);
      s.bar(left, 604, left + 410, 604, 9, 0x718f86);
      s.bolt(x, 604, 21);
      s.zone('x-crank', x, 604, 60, 50, () =>
        s.cb.input({ type: 'point', x: a.x < d.max ? a.x + 1 : d.min, y: a.y }),
      );
    },
  };
}
export function reflectionRenderer(s: MachineSurface, d: Reflection): MachineRenderer {
  return {
    settled: () => true,
    destroy: () => s.destroy(),
    draw: (v, _dt, time) => {
      if (v.answer.kind !== 'reflection') return;
      const a = v.answer,
        g = s.g;
      g.clear();
      const unit = 55,
        ox = 283,
        oy = 135,
        px = (x: number) => ox + x * unit,
        py = (y: number) => oy + y * unit;
      g.fillStyle(0x071b26, 0.75).fillRoundedRect(ox - 12, oy - 12, 574, 464, 12);
      g.lineStyle(2, 0x728984).strokeRoundedRect(ox - 12, oy - 12, 574, 464, 12);
      for (let x = 0; x <= 10; x++)
        for (let y = 0; y <= 8; y++) {
          g.fillStyle(0x759898, 0.2).fillCircle(px(x), py(y), 1.5);
        }
      const beam = traceBeam(d, a.angles);
      for (let i = 1; i < beam.points.length; i++) {
        const p = beam.points[i - 1],
          q = beam.points[i];
        for (const [width, alpha] of [
          [15, 0.07],
          [8, 0.18],
          [3, 0.9],
        ] as const)
          g.lineStyle(width, 0x8dfff0, alpha).lineBetween(px(p.x), py(p.y), px(q.x), py(q.y));
        g.fillStyle(0xe1fff2, 0.9).fillCircle(px(q.x), py(q.y), 4);
      }
      d.obstacles.forEach((obstacle, i) => {
        s.bar(px(obstacle.a.x), py(obstacle.a.y), px(obstacle.b.x), py(obstacle.b.y), 18, 0x67797a);
        s.text(
          `obstacle-${i}`,
          px((obstacle.a.x + obstacle.b.x) / 2),
          py((obstacle.a.y + obstacle.b.y) / 2) + 26,
          'BLOCKER',
          12,
        );
      });
      d.mirrors.forEach((mirror, i) => {
        const x = px(mirror.center.x),
          y = py(mirror.center.y),
          segment = mirrorSegment(d, i, a.angles[i]);
        g.fillStyle(0x122a31, 0.9).fillCircle(x, y, 47);
        g.lineStyle(3, 0xa38b5e).strokeCircle(x, y, 47);
        for (let n = 0; n < 12; n++) {
          const angle = (n * Math.PI) / 6;
          s.bar(
            x + Math.cos(angle) * 40,
            y + Math.sin(angle) * 40,
            x + Math.cos(angle) * 46,
            y + Math.sin(angle) * 46,
            2,
            0xb2a370,
          );
        }
        s.bar(px(segment.a.x), py(segment.a.y), px(segment.b.x), py(segment.b.y), 10, 0x87c4d2);
        s.bolt(x, y, 7);
        const normal = ((a.angles[i] + 90) * Math.PI) / 180;
        for (let n = -3; n <= 3; n++) {
          const distance = n * 12;
          g.lineStyle(1, 0xffe9a7, 0.65).lineBetween(
            x + Math.cos(normal) * distance,
            y + Math.sin(normal) * distance,
            x + Math.cos(normal) * (distance + 6),
            y + Math.sin(normal) * (distance + 6),
          );
        }
        s.text(`mirror-${i}`, x, y + 67, `${i + 1} · ${a.angles[i]}°`, 18, '#dff8ed');
        s.zone(
          `mirror-${i}`,
          x,
          y,
          96,
          96,
          () => s.cb.input({ type: 'mirror', index: i, angle: (a.angles[i] + mirror.step) % 180 }),
          (mx, my) => {
            const angle = ((Math.atan2(my - y, mx - x) * 180) / Math.PI + 360) % 180;
            s.cb.input({
              type: 'mirror',
              index: i,
              angle: (Math.round(angle / mirror.step) * mirror.step) % 180,
            });
          },
        );
      });
      s.bolt(px(d.emitter.x), py(d.emitter.y), 18);
      g.fillStyle(0xb5fff1).fillCircle(px(d.emitter.x), py(d.emitter.y), 7);
      g.fillStyle(beam.hit ? 0x7ce6b3 : 0x314b53).fillCircle(
        px(d.receiver.x),
        py(d.receiver.y),
        20,
      );
      g.lineStyle(4, 0xd4b477).strokeCircle(px(d.receiver.x), py(d.receiver.y), 24);
      if (beam.hit && !v.reducedMotion)
        g.lineStyle(2, 0xb0f7c5, 0.3 + 0.2 * Math.sin(time * 3)).strokeCircle(
          px(d.receiver.x),
          py(d.receiver.y),
          32,
        );
      s.plate('optics', 573, 84, 'REFLECT LIGHT INTO THE RECEIVER', 440);
      s.text(
        'optics-help',
        976,
        270,
        'Drag a mirror rim\nto rotate its surface.\n\nOr tap to turn one step.',
        18,
      );
      s.text(
        'optics-law',
        580,
        635,
        'Reflection angle is measured from the normal to the mirror.',
        17,
        '#bfdbcf',
      );
      const contact = beam.points[1],
        start = beam.points[0];
      const firstMirror = d.mirrors.findIndex(
        (m) => Math.hypot(m.center.x - contact.x, m.center.y - contact.y) < m.length / 2 + 0.001,
      );
      let measurement = 'Dashed lines show\nthe mirror normals.';
      if (firstMirror >= 0) {
        const ray = Math.atan2(contact.y - start.y, contact.x - start.x),
          normal = ((a.angles[firstMirror] + 90) * Math.PI) / 180;
        const incidence =
          (Math.acos(Math.min(1, Math.abs(Math.cos(ray - normal)))) * 180) / Math.PI;
        measurement = `FIRST BOUNCE\nIncidence ${round(incidence)} degrees\nReflection ${round(incidence)} degrees`;
      }
      s.text('measured-angle', 972, 425, measurement, 17, '#bcddd2');
    },
  };
}
export function cableRenderer(s: MachineSurface, d: Cable): MachineRenderer {
  return {
    settled: () => true,
    destroy: () => s.destroy(),
    draw: (v, _dt, time) => {
      if (v.answer.kind !== 'cable') return;
      const a = v.answer,
        g = s.g;
      g.clear();
      const maxX = Math.max(...d.route.map((p) => p.x), 1),
        maxY = Math.max(...d.route.map((p) => p.y), 1),
        unit = Math.min(600 / (maxX + 1), 340 / (maxY + 1)),
        ox = 270,
        oy = maxY <= 1 ? 310 : 495;
      const pts = d.route.map((p) => ({ x: ox + p.x * unit, y: oy - p.y * unit })),
        first = pts[0],
        last = pts[pts.length - 1],
        required = cableLength(d),
        chosen = d.cables[a.cable],
        solved = machineReading(d, a).solved;
      s.bar(first.x, first.y, last.x, first.y, 2, 0x718786);
      s.bar(last.x, first.y, last.x, last.y, 2, 0x718786);
      if (d.mode === 'diagonal') {
        s.text(
          'horizontal',
          (first.x + last.x) / 2,
          first.y + 29,
          `${round(Math.abs(d.route[1].x - d.route[0].x) * d.scale)} ${d.unit}`,
          20,
        );
        s.text(
          'vertical',
          last.x + 45,
          (first.y + last.y) / 2,
          `${round(Math.abs(d.route[1].y - d.route[0].y) * d.scale)} ${d.unit}`,
          20,
        );
      } else
        d.route
          .slice(1)
          .forEach((p, i) =>
            s.text(
              `span-${i}`,
              (pts[i].x + pts[i + 1].x) / 2 + 25,
              (pts[i].y + pts[i + 1].y) / 2 - 26,
              `${round(Math.hypot(p.x - d.route[i].x, p.y - d.route[i].y))} ${d.scale === 1 ? d.unit : 'drawing units'}`,
              21,
            ),
          );
      if (chosen) {
        let remaining = chosen.length / d.scale;
        g.lineStyle(6, solved ? 0xd3d8b1 : 0xb39460);
        g.beginPath();
        g.moveTo(first.x, first.y);
        for (let i = 1; i < pts.length; i++) {
          const length = Math.hypot(
              d.route[i].x - d.route[i - 1].x,
              d.route[i].y - d.route[i - 1].y,
            ),
            portion = Math.max(0, Math.min(1, remaining / length));
          const start = pts[i - 1],
            end = {
              x: start.x + (pts[i].x - start.x) * portion,
              y: start.y + (pts[i].y - start.y) * portion,
            };
          // Solve the quadratic curve's sampled length for the actual available slack.
          let sag = 0;
          if (chosen.length > required) {
            const targetPixels =
              (Math.hypot(pts[i].x - start.x, pts[i].y - start.y) * chosen.length) / required;
            let lo = 0,
              hi = 700;
            for (let n = 0; n < 18; n++) {
              const h = (lo + hi) / 2;
              let sum = 0,
                prior = start;
              for (let j = 1; j <= 32; j++) {
                const t = j / 32,
                  q = {
                    x: start.x + (end.x - start.x) * t,
                    y: start.y + (end.y - start.y) * t + 4 * h * t * (1 - t),
                  };
                sum += Math.hypot(q.x - prior.x, q.y - prior.y);
                prior = q;
              }
              if (sum < targetPixels) lo = h;
              else hi = h;
            }
            sag = (lo + hi) / 2;
          }
          for (let j = 1; j <= 36; j++) {
            const t = j / 36;
            g.lineTo(
              start.x + (end.x - start.x) * t,
              start.y + (end.y - start.y) * t + 4 * sag * t * (1 - t),
            );
          }
          remaining -= length;
          if (portion < 1) break;
        }
        g.strokePath();
      }
      pts.forEach((p, i) => {
        g.fillStyle(0x203c43).fillRoundedRect(p.x - 23, p.y - 25, 46, 50, 7);
        s.bolt(p.x, p.y, 16);
        s.text(
          `anchor-${i}`,
          p.x,
          p.y - 47,
          i === 0 ? 'SPRING ANCHOR' : i === pts.length - 1 ? 'LATCH ANCHOR' : 'PULLEY',
          15,
        );
      });
      s.plate(
        'cable-title',
        588,
        91,
        d.mode === 'diagonal' ? 'MEASURE THE DIAGONAL SPAN' : 'MEASURE THE MARKED CABLE ROUTE',
        460,
      );
      s.text(
        'map-scale',
        960,
        390,
        d.scale === 1 ? 'Measures in ' + d.unit : `SCALE\n1 drawing unit\n= ${d.scale} ${d.unit}`,
        18,
      );
      d.cables.forEach((c, i) => {
        const x = 218 + i * 156,
          y = 590,
          r = 18 + (c.length / Math.max(...d.cables.map((c) => c.length))) * 20;
        g.lineStyle(a.cable === i ? 5 : 3, a.cable === i ? 0xf5d896 : 0xa99462);
        for (let n = 0; n < 4; n++) g.strokeCircle(x, y, r - n * 5);
        s.text(`cable-${i}`, x, y + 53, c.label, 18);
        s.zone(
          `reel-${i}`,
          x,
          y,
          115,
          100,
          () => s.cb.input({ type: 'cable', index: i }),
          (mx, my) => {
            if (mx > 200 && mx < 1050 && my > 110 && my < 530)
              s.cb.input({ type: 'cable', index: i });
          },
        );
      });
      s.text(
        'tension',
        968,
        245,
        solved
          ? 'SPRING LOADED\nLatch tension aligned'
          : chosen && chosen.length > required
            ? 'SLACK CABLE'
            : chosen
              ? 'HOOK CANNOT REACH'
              : 'CHOOSE A CABLE',
        20,
        solved ? '#c0f2c4' : '#d2c29b',
      );
    },
  };
}
