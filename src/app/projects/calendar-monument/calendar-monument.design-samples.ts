import type { EngineeringDesignSample } from '../../templates/engineering-design/domain/engineering-design.models';
import type { DesignBlock } from '../../shared/engineering/block-design';

const block = (
  id: string,
  x: number,
  y: number,
  z: number,
  width: number,
  height: number,
  depth: number,
  rotation = 0,
): DesignBlock => ({ id, x, y, z, width, height, depth, rotation });

/** Curriculum geometry only; rendering and sample loading belong to the engineering template. */
export const calendarMonumentDesignSamples: readonly EngineeringDesignSample[] = [
  {
    id: 'sun-gate',
    title: 'Sun gate',
    description:
      'Two pillars and a lintel frame a bright opening. Move the Sun to stretch the gate’s shadow and watch the gap travel across the ground.',
    design: {
      blocks: [
        block('gate-west', -0.55, 0, 0, 0.22, 1.2, 0.28),
        block('gate-east', 0.55, 0, 0, 0.22, 1.2, 0.28),
        block('gate-lintel', 0, 1.2, 0, 1.32, 0.24, 0.28),
      ],
      targets: [{ id: 'gate-marker', label: 'Gate opening', x: 0, z: -0.65 }],
    },
  },
  {
    id: 'round-portal',
    title: 'Round portal',
    description:
      'A wide wall with an 80 cm cylindrical opening casts a dark frame around a patch of sunlight. Compare the patch at low and high Sun angles.',
    design: {
      blocks: [
        {
          ...block('portal', 0, 0, 0, 1.4, 1.2, 0.12),
          aperture: { axis: 'z', diameter: 0.8, insert: 'open', color: 'clear' },
        },
      ],
      targets: [{ id: 'portal-marker', label: 'Light through the hole', x: 0, z: -0.5 }],
    },
  },
  {
    id: 'color-windows',
    title: 'Three color windows',
    description:
      'Ruby, sapphire and amber windows paint moving patches on the ground. A pale crystal catches the middle beam. Try solar noon, then Inspect sculpture.',
    design: {
      blocks: (['red', 'blue', 'amber'] as const).flatMap((color, i) => {
        const x = (i - 1) * 0.75;
        return [
          block(`${color}-left`, x - 0.25, 0, 0, 0.1, 0.3, 0.14),
          block(`${color}-right`, x + 0.25, 0, 0, 0.1, 0.3, 0.14),
          {
            ...block(`${color}-window`, x, 0.3, 0, 0.6, 1, 0.08),
            aperture: {
              axis: 'z' as const,
              diameter: 0.4,
              insert: i === 1 ? ('jewel' as const) : ('glass' as const),
              color,
            },
          },
        ];
      }),
      targets: [
        { id: 'ruby-marker', label: 'Ruby patch', x: -0.75, z: -0.65 },
        { id: 'amber-marker', label: 'Amber patch', x: 0.75, z: -0.65 },
      ],
      displayObject: {
        model: 'crystal',
        material: 'porcelain',
        x: 0,
        y: 0,
        z: -0.55,
        width: 0.28,
        height: 0.5,
        rotation: 0,
      },
    },
  },
  {
    id: 'pierced-pyramid',
    title: 'Pierced pyramid',
    description:
      'Four terraces share a vertical tunnel. Can a high summer Sun send light all the way down? Use Plan view to inspect the hole and compare June with December.',
    design: {
      blocks: [1.6, 1.2, 0.8, 0.4].map((width, i) => ({
        ...block(`terrace-${i}`, 0, i * 0.2, 0, width, 0.2, width),
        aperture: { axis: 'y', diameter: 0.3, insert: 'open', color: 'clear' },
      })),
      targets: [{ id: 'pyramid-marker', label: 'Inside the tunnel', x: 0, z: -0.1 }],
    },
  },
  {
    id: 'shadow-crown',
    title: 'Shadow crown',
    description:
      'Eight pillars surround a round sculpture. Their long and short shadows form spokes. Tiny holes in the taller pillars admit light only from some directions.',
    design: {
      blocks: Array.from({ length: 8 }, (_, i) => {
        const angle = (i * Math.PI) / 4;
        return {
          ...block(
            `crown-${i}`,
            0.9 * Math.sin(angle),
            0,
            0.9 * Math.cos(angle),
            0.18,
            i % 2 ? 0.7 : 1.1,
            0.26,
            i * 45,
          ),
          ...(i % 2
            ? {}
            : {
                aperture: {
                  axis: 'z' as const,
                  diameter: 0.12,
                  insert: 'open' as const,
                  color: 'clear' as const,
                },
              }),
        };
      }),
      targets: [{ id: 'crown-marker', label: 'Between the spokes', x: 0.35, z: -0.4 }],
      displayObject: {
        model: 'sphere',
        material: 'limestone',
        x: 0,
        y: 0,
        z: 0,
        width: 0.5,
        height: 0.5,
        rotation: 0,
      },
    },
  },
  {
    id: 'twin-tunnels',
    title: 'Twin tunnels',
    description:
      'These blocks have equal 32 cm holes but different depths: 10 cm and 65 cm. Find a Sun angle that lights one hole while the other stays dark.',
    design: {
      blocks: [-0.48, 0.48].map((x, i) => ({
        ...block(`tunnel-${i}`, x, 0, 0, 0.6, 1.1, i ? 0.65 : 0.1),
        aperture: { axis: 'z', diameter: 0.32, insert: 'open', color: 'clear' },
      })),
      targets: [
        { id: 'thin-marker', label: 'Thin wall', x: -0.48, z: -0.5 },
        { id: 'deep-marker', label: 'Deep tunnel', x: 0.48, z: -0.5 },
      ],
    },
  },
];
