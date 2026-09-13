import { BALANCE_SCENE_LOADER } from '../balance-lock/balance-lock.component';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import data from '../../../../../../public/projects/castle-archive-rescue/project.json';
import { requireEscapeMission } from '../domain/escape.validation';
import { ESCAPE_MISSION, ESCAPE_PERSISTENCE, EscapeRuntime } from '../runtime/escape-runtime';
import { ExpeditionRuntime } from '../runtime/expedition-runtime';
import type {
  ExpeditionSceneCallbacks,
  MountExpeditionScene,
} from '../game/expedition-scene.models';
import { EXPEDITION_SCENE_LOADER, ExpeditionComponent } from './expedition.component';

// jsdom tests the renderer boundary; real WebGL is exercised in the browser playthrough.
vi.mock('phaser', () => ({}));

describe('Expedition presentation boundary', () => {
  const destroy = vi.fn(),
    focus = vi.fn();
  let callbacks: ExpeditionSceneCallbacks;
  const mount: MountExpeditionScene = (_parent, _mission, _snapshot, cb) => {
    callbacks = cb;
    cb.ready();
    return { destroy, focus, overview: vi.fn(), follow: vi.fn() };
  };
  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [ExpeditionComponent],
      providers: [
        provideRouter([]),
        {
          provide: BALANCE_SCENE_LOADER,
          useValue: async () => ({ mountBalanceScene: () => ({ destroy: vi.fn() }) }),
        },
        EscapeRuntime,
        ExpeditionRuntime,
        { provide: ESCAPE_MISSION, useValue: requireEscapeMission(data) },
        { provide: ESCAPE_PERSISTENCE, useValue: { load: () => [], save: vi.fn() } },
        {
          provide: EXPEDITION_SCENE_LOADER,
          useValue: async () => ({ mountExpeditionScene: mount }),
        },
      ],
    });
  });
  it('connects canvas input to accessible controls, pause, and cleanup', async () => {
    const fixture = TestBed.createComponent(ExpeditionComponent),
      c = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(c.ready()).toBe(true);
    c.start();
    callbacks.frame(0.016, { x: 0, y: 0 });
    callbacks.interact();
    for (let i = 0; c.runtime.phase() === 'explore' && i < 100; i++)
      callbacks.frame(0.05, { x: 0, y: 0 });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.counting-list button')).toHaveLength(0);
    expect(fixture.nativeElement.querySelector('app-balance-lock')).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('The fraction seal');
    callbacks.input({ type: 'balance-place', index: 0, side: 2 });
    fixture.detectChanges();
    expect(c.runtime.draft().placements?.[0]).toBe(2);
    c.openSettings();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.game-content').inert).toBe(true);
    expect(c.runtime.paused()).toBe(true);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(c.runtime.paused()).toBe(false);
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
    fixture.destroy();
    expect(destroy).toHaveBeenCalledOnce();
  });
  it('surfaces renderer and asset failures instead of showing a pretend game', async () => {
    TestBed.overrideProvider(EXPEDITION_SCENE_LOADER, {
      useValue: async () => {
        throw new Error('renderer unavailable');
      },
    });
    const fixture = TestBed.createComponent(ExpeditionComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('The game renderer could not start');
    expect(fixture.nativeElement.textContent).toContain('Reload the game');
    fixture.destroy();
  });
});
