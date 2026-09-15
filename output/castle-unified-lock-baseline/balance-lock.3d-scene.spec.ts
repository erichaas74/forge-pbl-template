import { vi } from 'vitest';
const gpu = vi.hoisted(() => ({ render: vi.fn(), dispose: vi.fn(), lost: vi.fn() }));
vi.mock('three', async (original) => {
  const three = await original<typeof import('three')>();
  return Object.assign({}, three, {
    WebGLRenderer: class {
      domElement = document.createElement('canvas');
      shadowMap = {};
      setPixelRatio() {}
      setClearColor() {}
      setSize() {}
      render = gpu.render;
      dispose = gpu.dispose;
      forceContextLoss = gpu.lost;
    },
    PMREMGenerator: class {
      fromScene() {
        return { texture: new three.Texture(), dispose() {} };
      }
      dispose() {}
    },
  });
});
import data from '../../../../../../public/projects/castle-archive-rescue/project.json';
import { mountBalanceScene } from './balance-lock.3d-scene';
import { emptyBalance, type BalanceLockDefinition } from './balance-lock.domain';
import type { BalanceView } from './balance-lock.scene-contract';

describe('3D workshop interaction and lifecycle', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
    document.body.replaceChildren();
  });
  it('keeps views separate, accepts keyboard placement, pauses release and disposes the renderer', () => {
    let callback: FrameRequestCallback = () => {},
      now = performance.now();
    vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) => {
      callback = fn;
      return 1;
    });
    const cancel = vi.fn(),
      disconnect = vi.fn();
    vi.stubGlobal('cancelAnimationFrame', cancel);
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        disconnect = disconnect;
      },
    );
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      fillText() {},
    } as unknown as ReturnType<HTMLCanvasElement['getContext']>);
    const lock = data.steps[0].puzzle.lock as BalanceLockDefinition,
      host = document.createElement('div');
    document.body.append(host);
    let state: BalanceView = {
      active: 0,
      placements: emptyBalance(lock),
      selected: null,
      sealed: [],
      completed: false,
      reducedMotion: true,
      paused: false,
      attempt: 0,
    };
    const select = vi.fn((index: number) => {
      state = { ...state, selected: index };
    });
    const place = vi.fn((index: number, side: number) => {
      state = {
        ...state,
        selected: null,
        placements: state.placements.map((v, i) => (i === index ? side : v)),
      };
    });
    const ready = vi.fn(),
      failed = vi.fn();
    const handle = mountBalanceScene(host, lock, () => state, { select, place, ready, failed });
    const tick = () => callback((now += 50));
    const root = host.querySelector<HTMLElement>('[data-balance-3d]')!;
    expect(ready).toHaveBeenCalledOnce();
    expect(root.dataset['view']).toBe('working');
    expect(host.querySelectorAll('canvas')).toHaveLength(1);
    expect(host.querySelectorAll('.b3d-weight')).toHaveLength(5);
    Object.assign(root, {
      setPointerCapture() {},
      hasPointerCapture() {
        return false;
      },
    });
    host
      .querySelector('[data-weight="0"]')!
      .dispatchEvent(new MouseEvent('pointerdown', { bubbles: true, clientX: 40, clientY: 450 }));
    tick();
    expect(select).not.toHaveBeenCalled();
    root.dispatchEvent(new MouseEvent('pointerup', { bubbles: true, clientX: 40, clientY: 450 }));
    expect(select).toHaveBeenCalledExactlyOnceWith(0);
    expect(place).not.toHaveBeenCalled();
    select.mockClear();
    host.querySelector<HTMLButtonElement>('[data-view="overview"]')!.click();
    tick();
    expect(root.dataset['view']).toBe('overview');
    host.querySelector<HTMLButtonElement>('[data-view="working"]')!.click();
    host.querySelector<HTMLButtonElement>('[data-weight="0"]')!.click();
    tick();
    expect(select).toHaveBeenCalledExactlyOnceWith(0);
    expect(host.querySelector<HTMLElement>('.b3d-placement')!.hidden).toBe(false);
    host.querySelector<HTMLButtonElement>('[data-place="2"]')!.click();
    tick();
    expect(place).toHaveBeenCalledExactlyOnceWith(0, 2);
    expect(root.dataset['released']).toBe('false');
    const balanced = emptyBalance(lock);
    [0, 1, 5, 6, 7, 10, 11].forEach((i) => (balanced[i] = 2));
    state = { ...state, placements: balanced, paused: true };
    tick();
    expect(root.dataset['released']).toBe('false');
    expect(host.querySelector<HTMLButtonElement>('[data-weight="0"]')!.disabled).toBe(true);
    state = { ...state, paused: false };
    tick();
    expect(root.dataset['released']).toBe('true');
    state = { ...state, placements: balanced.map((v, i) => (i === 0 ? 0 : v)) };
    tick();
    expect(root.dataset['released']).toBe('false');
    state = { ...state, active: 2 };
    tick();
    expect(host.querySelector('[data-focus-label]')!.textContent).toBe('STATION 3 / 3');
    expect(host.querySelector('[data-weight="10"]')).not.toBeNull();
    // Throttled/background rendering must use elapsed time, not require dozens of frames.
    state = { ...state, placements: balanced, reducedMotion: false };
    callback((now += 1000));
    callback((now += 1000));
    expect(root.dataset['released']).toBe('true');
    host
      .querySelector('canvas')!
      .dispatchEvent(new Event('webglcontextlost', { cancelable: true }));
    expect(failed).toHaveBeenCalledOnce();
    handle.destroy();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(gpu.dispose).toHaveBeenCalledOnce();
    expect(gpu.lost).toHaveBeenCalledOnce();
    expect(host.children).toHaveLength(0);
  });
});
