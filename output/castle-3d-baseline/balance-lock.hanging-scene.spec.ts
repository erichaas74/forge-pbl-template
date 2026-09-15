import { vi } from 'vitest';
import data from '../../../../../../public/projects/castle-archive-rescue/project.json';
import { emptyBalance, type BalanceLockDefinition } from './balance-lock.domain';
import { balancePinTargets } from './balance-lock.motion';
import { mountBalanceScene, type BalanceView } from './balance-lock.hanging-scene';

const lock = data.steps[0].puzzle.lock as BalanceLockDefinition;
describe('Hanging balance pins', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });
  it('keeps a near miss outside the slot, and only exact equality aligns it', () => {
    const answer = emptyBalance(lock);
    expect(balancePinTargets(lock, answer).every((t) => t.offset < 0)).toBe(true);
    answer[0] = 2;
    answer[1] = 2;
    expect(balancePinTargets(lock, answer)[0].offset).toBe(0);
    answer[3] = 2;
    expect(balancePinTargets(lock, answer)[0].offset).toBeGreaterThanOrEqual(19);
    const tiny = {
      ...lock,
      scales: [
        {
          ...lock.scales[0],
          left: [{ ...lock.scales[0].left[0], value: { numerator: 751, denominator: 1000 } }],
        },
      ],
    };
    expect(balancePinTargets(tiny, [2, 2, 0, 0, 0])[0].aligned).toBe(false);
    expect(balancePinTargets(tiny, [2, 2, 0, 0, 0])[0].offset).toBe(-19);
  });
  it('moves the shared bolt only after all pins settle, honors pause and reduced motion, and cleans up', () => {
    let callback: FrameRequestCallback = () => {},
      now = 0;
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      callback = cb;
      return 1;
    });
    const cancel = vi.fn();
    vi.stubGlobal('cancelAnimationFrame', cancel);
    const disconnect = vi.fn();
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        disconnect = disconnect;
      },
    );
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 400,
      bottom: 438,
      width: 400,
      height: 438,
      toJSON: () => ({}),
    });
    const host = document.createElement('div');
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
    const ready = vi.fn(),
      place = vi.fn((index: number, side: number) => {
        state = { ...state, placements: state.placements.map((p, i) => (i === index ? side : p)) };
      }),
      focus = vi.fn();
    const handle = mountBalanceScene(host, lock, () => state, {
      ready,
      failed: vi.fn(),
      focus,
      select: (index) => {
        state = { ...state, selected: index };
      },
      place,
    });
    const tick = () => callback((now += 50));
    expect(ready).toHaveBeenCalledOnce();
    expect(host.querySelectorAll('[data-pin]')).toHaveLength(3);
    const answer = emptyBalance(lock);
    [0, 1, 5, 6, 7].forEach((i) => (answer[i] = 2));
    state = { ...state, placements: answer };
    tick();
    expect(host.querySelector('[data-balance-scene]')?.getAttribute('data-released')).toBe('false');
    state = {
      ...state,
      paused: true,
      placements: answer.map((v, i) => (i === 10 || i === 11 ? 2 : v)),
    };
    tick();
    expect(host.querySelector('[data-bolt]')?.getAttribute('transform')).toBe('translate(0 0)');
    state = { ...state, paused: false };
    tick();
    expect(host.querySelector('[data-balance-scene]')?.getAttribute('data-released')).toBe('true');
    expect(host.querySelector('[data-bolt]')?.getAttribute('transform')).toBe('translate(-64 0)');
    state = { ...state, placements: emptyBalance(lock) };
    tick();
    expect(host.querySelector('[data-balance-scene]')?.getAttribute('data-released')).toBe('false');
    // A drag emits a single meaningful placement at drop, never one per movement frame.
    const root = host.querySelector('[data-balance-scene]')!;
    host
      .querySelector('[data-weight="0"]')!
      .dispatchEvent(new MouseEvent('pointerdown', { bubbles: true, clientX: 60, clientY: 352 }));
    root.dispatchEvent(
      new MouseEvent('pointermove', { bubbles: true, clientX: 304, clientY: 193 }),
    );
    tick();
    expect(place).not.toHaveBeenCalled();
    root.dispatchEvent(new MouseEvent('pointerup', { bubbles: true, clientX: 304, clientY: 193 }));
    expect(place).toHaveBeenCalledExactlyOnceWith(0, 2);
    host
      .querySelector('[data-focus="1"]')!
      .dispatchEvent(new MouseEvent('pointerdown', { bubbles: true }));
    expect(focus).toHaveBeenCalledWith(1);
    handle.destroy();
    expect(host.children).toHaveLength(0);
    expect(disconnect).toHaveBeenCalledOnce();
    expect(cancel).toHaveBeenCalled();
  });
});
