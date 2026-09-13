import { InjectionToken, computed, signal } from '@angular/core';
import {
  blocksOverlap,
  displayObjectEnvelope,
  isBlockDesign,
  type BlockDesign,
  type DesignBlock,
} from './block-design';

export interface DesignTransform {
  dx?: number;
  dy?: number;
  dz?: number;
  turn?: number;
}
export const DESIGN_EDITOR = new InjectionToken<DesignEditor>('DESIGN_EDITOR');
const rounded = (n: number) => Math.round(n * 100000) / 100000;
export function transformBlocks(
  design: BlockDesign,
  ids: readonly string[],
  op: DesignTransform,
): BlockDesign {
  const chosen = design.blocks.filter((b) => ids.includes(b.id));
  if (!chosen.length) return design;
  const cx = chosen.reduce((s, b) => s + b.x, 0) / chosen.length;
  const cz = chosen.reduce((s, b) => s + b.z, 0) / chosen.length;
  const turn = Math.round(op.turn ?? 0);
  const angle = (turn * Math.PI) / 180,
    c = Math.cos(angle),
    s = Math.sin(angle);
  return {
    ...design,
    blocks: design.blocks.map((b) =>
      ids.includes(b.id)
        ? {
            ...b,
            x: rounded(cx + c * (b.x - cx) + s * (b.z - cz) + (op.dx ?? 0)),
            z: rounded(cz - s * (b.x - cx) + c * (b.z - cz) + (op.dz ?? 0)),
            y: rounded(b.y + (op.dy ?? 0)),
            rotation: rounded((((b.rotation + turn) % 360) + 360) % 360) % 360,
          }
        : b,
    ),
  };
}
export function designError(design: BlockDesign): string {
  for (let i = 0; i < design.blocks.length; i++)
    for (let j = i + 1; j < design.blocks.length; j++) {
      if (blocksOverlap(design.blocks[i], design.blocks[j]))
        return `${design.blocks[i].label ?? 'Block ' + (i + 1)} overlaps ${design.blocks[j].label ?? 'block ' + (j + 1)}. Move it to a clear space.`;
    }
  if (
    design.displayObject &&
    design.blocks.some((b) => blocksOverlap(b, displayObjectEnvelope(design.displayObject!)))
  )
    return 'This placement overlaps the sculpture’s reserved space.';
  return isBlockDesign(design)
    ? ''
    : 'Keep blocks inside the court, above the floor, and use valid dimensions and openings.';
}
export function makePart(
  kind: 'pillar' | 'lintel' | 'gate' | 'window',
  width: number,
  height: number,
  depth: number,
): readonly DesignBlock[] {
  const assemblyId = crypto.randomUUID(),
    id = () => crypto.randomUUID();
  if (kind === 'window')
    return [
      {
        id: id(),
        label: 'Standing stone · horizontal opening',
        x: 0,
        y: 0,
        z: 0,
        width,
        height,
        depth,
        rotation: 0,
        aperture: {
          axis: 'z',
          diameter: Math.min(width, height) * 0.3,
          insert: 'open',
          color: 'clear',
        },
      },
    ];
  if (kind === 'pillar' || kind === 'lintel')
    return [
      {
        id: id(),
        label: kind === 'pillar' ? 'Pillar' : 'Lintel',
        x: 0,
        z: 0,
        y: 0,
        width,
        height,
        depth,
        rotation: 0,
      },
    ];
  const post = Math.min(0.2, width / 4),
    beam = Math.min(0.1, height / 4);
  return [
    {
      id: id(),
      assemblyId,
      label: 'Gate · left pillar',
      x: -(width + post) / 2,
      z: 0,
      y: 0,
      width: post,
      height,
      depth,
      rotation: 0,
    },
    {
      id: id(),
      assemblyId,
      label: 'Gate · right pillar',
      x: (width + post) / 2,
      z: 0,
      y: 0,
      width: post,
      height,
      depth,
      rotation: 0,
    },
    {
      id: id(),
      assemblyId,
      label: 'Gate · lintel',
      x: 0,
      z: 0,
      y: height,
      width: width + 2 * post,
      height: beam,
      depth,
      rotation: 0,
    },
  ];
}

/** Local editor state. Committed designs still pass through the engineering runtime. */
export class DesignEditor {
  readonly selection = signal<readonly string[]>([]);
  readonly snap = signal(0.05);
  readonly assemblies = signal(true);
  readonly draft = signal<BlockDesign | undefined>(undefined);
  readonly message = signal(
    'Select a stone in the scene or plan. Drag to move; Shift-click adds a stone.',
  );
  readonly draftError = computed(() => (this.draft() ? designError(this.draft()!) : ''));
  private readonly history = signal<{ past: BlockDesign[]; future: BlockDesign[] }>({
    past: [],
    future: [],
  });
  readonly canUndo = computed(() => this.history().past.length > 0);
  readonly canRedo = computed(() => this.history().future.length > 0);
  private base?: BlockDesign;
  private known = '';
  private scope = '';
  constructor(
    readonly read: () => BlockDesign,
    private readonly write: (design: BlockDesign) => void,
    readonly editable: () => boolean,
  ) {}
  sync(scope: string): void {
    const key = JSON.stringify(this.read());
    if (scope !== this.scope || (this.known && key !== this.known)) {
      this.history.set({ past: [], future: [] });
      this.selection.set([]);
      this.cancel();
    }
    this.scope = scope;
    this.known = key;
    const ids = this.selection().filter((id) => this.read().blocks.some((b) => b.id === id));
    if (ids.length !== this.selection().length) this.selection.set(ids);
  }
  select(id: string, additive = false): void {
    this.cancel();
    const block = this.read().blocks.find((b) => b.id === id);
    if (!block) {
      this.selection.set([]);
      return;
    }
    const ids =
      this.assemblies() && block.assemblyId
        ? this.read()
            .blocks.filter((b) => b.assemblyId === block.assemblyId)
            .map((b) => b.id)
        : [id];
    this.selection.set(additive ? [...new Set([...this.selection(), ...ids])] : ids);
    this.message.set(
      `${ids.length > 1 ? 'Assembly' : (block.label ?? 'Stone')} selected. Drag to move or use the plan controls.`,
    );
  }
  begin(): void {
    this.base = this.read();
    this.draft.set(undefined);
  }
  preview(op: DesignTransform, snap = true): void {
    if (!this.editable()) return;
    this.base ??= this.read();
    const step = this.snap();
    const adjusted = { ...op };
    if (snap && step > 0) {
      if (op.dx !== undefined) adjusted.dx = rounded(Math.round(op.dx / step) * step);
      if (op.dz !== undefined) adjusted.dz = rounded(Math.round(op.dz / step) * step);
      if (op.turn !== undefined) adjusted.turn = Math.round(op.turn / 15) * 15;
    }
    this.draft.set(transformBlocks(this.base, this.selection(), adjusted));
  }
  commitDraft(): void {
    const next = this.draft();
    if (this.base !== this.read()) {
      this.cancel();
      this.message.set('The design changed. Select the stone and try again.');
      return;
    }
    if (next) this.commit(next);
    this.cancel();
  }
  cancel(): void {
    this.base = undefined;
    this.draft.set(undefined);
  }
  transform(op: DesignTransform): void {
    this.begin();
    this.preview(op, false);
    this.commitDraft();
  }
  commit(next: BlockDesign): boolean {
    if (!this.editable()) return false;
    const error = designError(next);
    if (error) {
      this.message.set(error);
      return false;
    }
    const before = this.read(),
      key = JSON.stringify(next);
    if (key === JSON.stringify(before)) return true;
    try {
      this.known = key;
      this.write(next);
    } catch (e) {
      this.known = JSON.stringify(before);
      this.message.set(e instanceof Error ? e.message : 'Could not save the placement.');
      return false;
    }
    this.history.update((h) => ({
      past: [...h.past.slice(-39), structuredClone(before)],
      future: [],
    }));
    this.message.set('Placement saved. Undo is available.');
    return true;
  }
  undo(): void {
    this.travel('past');
  }
  redo(): void {
    this.travel('future');
  }
  private travel(side: 'past' | 'future'): void {
    if (!this.editable()) return;
    const h = this.history(),
      next = h[side].at(-1);
    if (!next) return;
    const current = structuredClone(this.read());
    this.known = JSON.stringify(next);
    try {
      this.write(next);
    } catch {
      this.known = JSON.stringify(current);
      this.message.set('The change could not be saved.');
      return;
    }
    this.history.set(
      side === 'past'
        ? { past: h.past.slice(0, -1), future: [...h.future, current] }
        : { past: [...h.past, current], future: h.future.slice(0, -1) },
    );
    this.cancel();
    this.selection.set(this.selection().filter((id) => next.blocks.some((b) => b.id === id)));
    this.message.set(side === 'past' ? 'Change undone.' : 'Change restored.');
  }
  duplicate(): void {
    const chosen = this.read().blocks.filter((b) => this.selection().includes(b.id));
    if (!chosen.length) return;
    const groups = new Map<string, string>();
    const copies = chosen.map((b) => {
      if (b.assemblyId && !groups.has(b.assemblyId)) groups.set(b.assemblyId, crypto.randomUUID());
      return {
        ...b,
        id: crypto.randomUUID(),
        ...(b.assemblyId ? { assemblyId: groups.get(b.assemblyId)! } : {}),
      };
    });
    this.place(copies);
  }
  place(parts: readonly DesignBlock[]): void {
    if (!parts.length) return;
    if (!this.editable()) return;
    if (this.read().blocks.length + parts.length > 100) {
      this.message.set('The design already has the maximum number of stones.');
      return;
    }
    if (!isBlockDesign({ blocks: parts, targets: [] })) {
      this.message.set('Check the piece dimensions before adding it.');
      return;
    }
    // Find a clear, nearby position; preserve each assembly's internal measurements.
    for (let ring = 0; ring <= 24; ring++)
      for (let x = -ring; x <= ring; x++)
        for (let z = -ring; z <= ring; z++) {
          if (Math.max(Math.abs(x), Math.abs(z)) !== ring) continue;
          const blocks = parts.map((b) => ({ ...b, x: b.x + x * 0.5, z: b.z + z * 0.5 }));
          const next = { ...this.read(), blocks: [...this.read().blocks, ...blocks] };
          if (isBlockDesign(next)) {
            if (this.commit(next)) this.selection.set(blocks.map((b) => b.id));
            return;
          }
        }
    this.message.set('No clear space for this piece. Move a stone or use smaller dimensions.');
  }
  group(): void {
    if (this.selection().length < 2) return;
    const assemblyId = crypto.randomUUID();
    this.commit({
      ...this.read(),
      blocks: this.read().blocks.map((b) =>
        this.selection().includes(b.id) ? { ...b, assemblyId } : b,
      ),
    });
  }
  ungroup(): void {
    this.commit({
      ...this.read(),
      blocks: this.read().blocks.map((b) => {
        if (!this.selection().includes(b.id)) return b;
        const { assemblyId: _assembly, ...stone } = b;
        return stone;
      }),
    });
  }
  alignTo(id: string, side: 'north' | 'south' | 'east' | 'west' | 'top'): void {
    const chosen = this.read().blocks.filter((b) => this.selection().includes(b.id));
    const support = this.read().blocks.find((b) => b.id === id && !this.selection().includes(id));
    if (!support || !chosen.length) return;
    const bounds = (blocks: readonly DesignBlock[]) => {
      const extent = blocks.map((b) => {
        const a = (b.rotation * Math.PI) / 180;
        return {
          ...b,
          rx: (Math.abs(Math.cos(a)) * b.width + Math.abs(Math.sin(a)) * b.depth) / 2,
          rz: (Math.abs(Math.sin(a)) * b.width + Math.abs(Math.cos(a)) * b.depth) / 2,
        };
      });
      return {
        left: Math.min(...extent.map((b) => b.x - b.rx)),
        right: Math.max(...extent.map((b) => b.x + b.rx)),
        north: Math.min(...extent.map((b) => b.z - b.rz)),
        south: Math.max(...extent.map((b) => b.z + b.rz)),
        base: Math.min(...extent.map((b) => b.y)),
      };
    };
    const a = bounds(chosen),
      b = bounds([support]);
    const dx = support.x - (a.left + a.right) / 2,
      dz = support.z - (a.north + a.south) / 2;
    this.transform(
      side === 'top'
        ? { dx, dz, dy: support.y + support.height - a.base }
        : side === 'north'
          ? { dx, dz: b.north - a.south }
          : side === 'south'
            ? { dx, dz: b.south - a.north }
            : side === 'east'
              ? { dx: b.right - a.left, dz }
              : { dx: b.left - a.right, dz },
    );
  }
}
