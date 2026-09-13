import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { DesignEditor, makePart, transformBlocks } from './design-editor';
import { isBlockDesign, type BlockDesign } from './block-design';
import { BlockPlanComponent } from '../../templates/engineering-design/ui/block-plan.component';

describe('shared measured design editor', () => {
  const initial = (): BlockDesign => ({
    blocks: [
      {
        id: 'a',
        label: 'Pillar',
        x: 0,
        y: 0,
        z: 0,
        width: 0.2,
        height: 0.8,
        depth: 0.2,
        rotation: 0,
      },
      {
        id: 'b',
        label: 'Support',
        x: 1,
        y: 0,
        z: 0,
        width: 0.4,
        height: 0.4,
        depth: 0.4,
        rotation: 0,
      },
    ],
    targets: [],
  });
  function setup() {
    const design = signal(initial()),
      editable = signal(true),
      writes: BlockDesign[] = [];
    const editor = new DesignEditor(
      design,
      (next) => {
        writes.push(next);
        design.set(next);
      },
      editable,
    );
    editor.sync('project');
    editor.select('a');
    return { editor, design, editable, writes };
  }
  it('keeps drag previews separate and commits a complete gesture as one undoable change', () => {
    const { editor, design, writes } = setup();
    const savedEvidence = structuredClone(design());
    editor.begin();
    editor.preview({ dz: 0.126 });
    editor.preview({ dz: 0.274 });
    expect(editor.draft()!.blocks[0].z).toBe(0.25);
    expect(design().blocks[0].z).toBe(0);
    expect(writes).toHaveLength(0);
    editor.commitDraft();
    editor.sync('project');
    expect(writes).toHaveLength(1);
    expect(editor.canUndo()).toBe(true);
    editor.undo();
    expect(design()).toEqual(savedEvidence);
    editor.redo();
    expect(design().blocks[0].z).toBe(0.25);
    expect(savedEvidence.blocks[0].z).toBe(0);
  });
  it('rejects overlaps with a named explanation and does not add invalid changes to history', () => {
    const { editor, design } = setup();
    editor.begin();
    editor.preview({ dx: 1 });
    expect(editor.draftError()).toContain('Pillar overlaps Support');
    editor.commitDraft();
    expect(design()).toEqual(initial());
    expect(editor.canUndo()).toBe(false);
  });
  it('rejects stale gestures and clears history when an external design or scope changes', () => {
    const { editor, design } = setup();
    editor.transform({ dz: 0.2 });
    editor.sync('project');
    expect(editor.canUndo()).toBe(true);
    editor.begin();
    editor.preview({ dx: 0.1 });
    const external = initial();
    design.set(external);
    editor.commitDraft();
    expect(design()).toBe(external);
    expect(editor.message()).toContain('design changed');
    editor.sync('project');
    expect(editor.canUndo()).toBe(false);
    editor.select('a');
    editor.transform({ dz: 0.2 });
    editor.sync('practice');
    expect(editor.canUndo()).toBe(false);
    expect(editor.selection()).toEqual([]);
  });
  it('moves, rotates and duplicates a gate as an independent assembly with unchanged openings', () => {
    const { editor, design } = setup();
    editor.place(
      makePart('gate', 0.6, 0.8, 0.25).map((b, i) =>
        i === 2
          ? {
              ...b,
              aperture: {
                axis: 'z' as const,
                diameter: 0.06,
                insert: 'open' as const,
                color: 'clear' as const,
              },
            }
          : b,
      ),
    );
    const ids = [...editor.selection()],
      gate = design().blocks.filter((b) => ids.includes(b.id));
    expect(ids).toHaveLength(3);
    expect(new Set(gate.map((b) => b.assemblyId)).size).toBe(1);
    const aperture = gate[2].aperture;
    editor.transform({ turn: 90 });
    expect(isBlockDesign(design())).toBe(true);
    expect(design().blocks.find((b) => b.id === gate[2].id)!.aperture).toEqual(aperture);
    editor.select(gate[0].id);
    expect(editor.selection()).toHaveLength(3);
    editor.duplicate();
    const copies = design().blocks.filter((b) => editor.selection().includes(b.id));
    expect(copies).toHaveLength(3);
    expect(copies[0].assemblyId).not.toBe(gate[0].assemblyId);
    editor.undo();
    expect(design().blocks).toHaveLength(5);
    editor.redo();
    expect(design().blocks).toHaveLength(8);
  });
  it('creates an upright window with a horizontal empty bore', () => {
    const parts = makePart('window', 0.6, 0.8, 0.25);
    expect(parts).toHaveLength(1);
    expect(parts[0].aperture).toEqual({
      axis: 'z',
      diameter: 0.18,
      insert: 'open',
      color: 'clear',
    });
    expect(isBlockDesign({ blocks: parts, targets: [] })).toBe(true);
  });
  it('aligns measured edges and stacks on a chosen top face without penetrating it', () => {
    const { editor, design } = setup();
    editor.alignTo('b', 'north');
    expect(design().blocks[0].x).toBe(1);
    expect(design().blocks[0].z).toBe(-0.3);
    editor.alignTo('b', 'top');
    expect(design().blocks[0].y).toBe(0.4);
    expect(design().blocks[0].z).toBe(0);
    expect(isBlockDesign(design())).toBe(true);
    editor.undo();
    expect(design().blocks[0].z).toBe(-0.3);
  });
  it('protects read-only designs and preserves valid fractional rotations during translations', () => {
    const { editor, design, editable } = setup();
    editable.set(false);
    editor.transform({ dx: 0.1 });
    editor.place(makePart('gate', 0.6, 0.8, 0.25));
    expect(design()).toEqual(initial());
    const fractional = { ...initial(), blocks: [{ ...initial().blocks[0], rotation: 359.5 }] };
    const next = transformBlocks(fractional, ['a'], { dx: 0.1 });
    expect(next.blocks[0].rotation).toBe(359.5);
    expect(isBlockDesign(next)).toBe(true);
    expect(transformBlocks(next, ['a'], { turn: 15 }).blocks[0].rotation).toBe(14.5);
  });
  it('accepts legacy blocks and validates optional assembly metadata', () => {
    const legacy = { ...initial(), blocks: [{ ...initial().blocks[0], label: undefined }] };
    expect(isBlockDesign(legacy)).toBe(true);
    expect(
      isBlockDesign({
        ...legacy,
        blocks: [{ ...legacy.blocks[0], assemblyId: 'gate', label: 'East pillar' }],
      }),
    ).toBe(true);
    expect(isBlockDesign({ ...legacy, blocks: [{ ...legacy.blocks[0], assemblyId: '' }] })).toBe(
      false,
    );
    expect(
      isBlockDesign({ ...legacy, blocks: [{ ...legacy.blocks[0], label: 'x'.repeat(81) }] }),
    ).toBe(false);
  });
  it('links keyboard selection in the plan with measured moves and history', () => {
    const { editor, design } = setup();
    const fixture = TestBed.createComponent(BlockPlanComponent);
    fixture.componentRef.setInput('design', design());
    fixture.componentRef.setInput('editor', editor);
    fixture.detectChanges();
    const stone = fixture.nativeElement.querySelector('[aria-label="Pillar"]') as SVGElement;
    stone.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, shiftKey: true }),
    );
    expect(design().blocks[0].z).toBe(-0.05);
    expect(editor.selection()).toEqual(['a']);
    editor.undo();
    expect(design().blocks[0].z).toBe(0);
    fixture.destroy();
  });
});
