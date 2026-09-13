import { TestBed } from '@angular/core/testing';
import { SolarMonumentComponent } from './solar-monument.component';
import { DESIGN_EDITOR, DesignEditor } from '../../../shared/engineering/design-editor';
import {
  DESIGN_CAPTURE,
  DESIGN_CHANGE,
} from '../../../shared/engineering/design-simulation.registry';
import type { BlockDesign } from '../../../shared/engineering/block-design';

describe('optional monument editor bridge', () => {
  function setup() {
    let design: BlockDesign = {
      blocks: [{ id: 'pillar', x: 0, y: 0, z: 0, width: 0.2, height: 1, depth: 0.2, rotation: 0 }],
      targets: [],
    };
    const changes: BlockDesign[] = [],
      captures: unknown[] = [];
    const editor = new DesignEditor(
      () => design,
      (next) => {
        design = next;
        changes.push(next);
      },
      () => true,
    );
    editor.sync('project');
    TestBed.configureTestingModule({
      providers: [
        { provide: DESIGN_EDITOR, useValue: editor },
        { provide: DESIGN_CAPTURE, useValue: (c: unknown) => captures.push(c) },
        { provide: DESIGN_CHANGE, useValue: (d: BlockDesign) => changes.push(d) },
      ],
    });
    const fixture = TestBed.createComponent(SolarMonumentComponent);
    fixture.componentRef.setInput('design', design);
    fixture.componentRef.setInput('building', true);
    fixture.detectChanges();
    const source = (fixture.nativeElement.querySelector('iframe') as HTMLIFrameElement)
      .contentWindow!;
    const sent: Record<string, unknown>[] = [];
    source.postMessage = ((message: Record<string, unknown>) =>
      sent.push(message)) as typeof source.postMessage;
    const receive = (payload: Record<string, unknown>, origin = window.location.origin) =>
      window.dispatchEvent(
        new MessageEvent('message', {
          source,
          origin,
          data: { channel: 'forge.design-simulation.v1', ...payload },
        }),
      );
    receive({ type: 'ready' });
    fixture.detectChanges();
    return {
      fixture,
      component: fixture.componentInstance,
      editor,
      changes,
      captures,
      sent,
      receive,
    };
  }
  it('shows validated seasonal pictures in a parent-page dialog and restores its close action', () => {
    const t = setup();
    t.receive({ type: 'toolbar-state', state: { ...t.component.ui(), mode: 'explore' } });
    const pictures = [
      { src: 'data:image/png;base64,cGljdHVyZQ==', caption: 'June sunrise' },
      { src: 'data:image/png;base64,cGljdHVyZQ==', caption: 'December sunrise' },
    ];
    t.receive({ type: 'season-pictures', pictures });
    t.fixture.detectChanges();
    expect(t.fixture.nativeElement.querySelector('[role="dialog"] img').getAttribute('src')).toBe(
      pictures[0].src,
    );
    expect(t.fixture.nativeElement.querySelectorAll('[role="dialog"] img')).toHaveLength(2);
    t.component.closePictures();
    t.fixture.detectChanges();
    expect(t.sent.at(-1)?.['action']).toBe('closeSeasonPictures');
    expect(t.fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
    t.receive({
      type: 'season-pictures',
      pictures: [{ ...pictures[0], src: 'https://foreign.example/image.png' }, pictures[1]],
    });
    expect(t.component.seasonPictures()).toEqual([]);
    t.fixture.destroy();
  });
  it('shares selection and accepts one valid transform against the current design', () => {
    const t = setup();
    t.receive({ type: 'editor-select', id: 'pillar', additive: false });
    t.fixture.detectChanges();
    expect(t.editor.selection()).toEqual(['pillar']);
    expect(
      t.sent.some((m) => m['type'] === 'editor-state' && (m['ids'] as string[]).includes('pillar')),
    ).toBe(true);
    const request = {
      type: 'editor-transform',
      ids: ['pillar'],
      operation: { dx: 0.15 },
      expected: JSON.stringify(t.component.design()),
    };
    t.receive(request);
    expect(t.changes).toHaveLength(1);
    expect(t.changes[0].blocks[0].x).toBe(0.15);
    t.fixture.componentRef.setInput('design', t.changes[0]);
    t.fixture.detectChanges();
    t.receive(request);
    expect(t.changes).toHaveLength(1);
    t.editor.undo();
    expect(t.changes.at(-1)!.blocks[0].x).toBe(0);
    t.fixture.destroy();
  });
  it('rejects foreign, unselected, malformed and read-only gestures', () => {
    const t = setup(),
      request = {
        type: 'editor-transform',
        ids: ['pillar'],
        operation: { dx: 0.15 },
        expected: JSON.stringify(t.component.design()),
      };
    t.receive(request);
    expect(t.changes).toHaveLength(0);
    t.receive({ type: 'editor-select', id: 'pillar', additive: false }, 'https://foreign.example');
    expect(t.editor.selection()).toEqual([]);
    t.receive({ type: 'editor-select', id: 'pillar', additive: false });
    for (const operation of [{ dx: NaN }, { dx: 100 }, { width: 2 }])
      t.receive({ ...request, operation });
    t.fixture.componentRef.setInput('readOnly', true);
    t.fixture.detectChanges();
    t.receive(request);
    expect(t.changes).toHaveLength(0);
    t.fixture.destroy();
  });
  it('treats Explore as a preview and validates mode messages with legacy fallback', () => {
    const t = setup();
    t.receive({ type: 'toolbar-state', state: { ...t.component.ui(), mode: 'explore' } });
    t.fixture.detectChanges();
    expect(t.component.canMark()).toBe(false);
    const count = t.sent.length;
    t.component.capture();
    expect(t.sent).toHaveLength(count);
    expect(t.captures).toHaveLength(0);
    t.receive({ type: 'editor-select', id: 'pillar', additive: false });
    expect(t.editor.selection()).toEqual([]);
    t.receive({ type: 'toolbar-state', state: { ...t.component.ui(), mode: 'unexpected' } });
    expect(t.component.ui().mode).toBe('explore');
    const { mode: _mode, ...legacy } = t.component.ui();
    t.receive({ type: 'toolbar-state', state: { ...legacy, sun: false } });
    expect(t.component.ui().mode).toBe('build');
    t.component.chooseMode('test');
    expect(t.sent.at(-1)?.['action']).toBe('showSun');
    t.fixture.destroy();
  });
});
