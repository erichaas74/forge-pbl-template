import { TestBed } from '@angular/core/testing';

import { apparatusArt } from './bench-art.config';
import {
  ReactionBenchComponent,
  requiredDrops,
  targetMassG,
  targetVolumeMl,
} from './reaction-bench.component';
import type { StationCapture } from './station-workspaces';

/** `output()` needs an injection context, so build the bench through TestBed. */
async function createBench(): Promise<ReactionBenchComponent & { host: HTMLElement }> {
  await TestBed.configureTestingModule({ imports: [ReactionBenchComponent] }).compileComponents();
  const fixture = TestBed.createComponent(ReactionBenchComponent);
  fixture.detectChanges();
  return Object.assign(fixture.componentInstance, {
    host: fixture.nativeElement as HTMLElement,
  });
}

/** Opens the tun tap and closes it once the beaker holds `millilitres`. */
async function pourTo(bench: ReactionBenchComponent, millilitres: number): Promise<void> {
  vi.useFakeTimers();
  try {
    bench.toggleTap();
    while (bench.volumeMl() < millilitres) {
      await vi.advanceTimersByTimeAsync(60);
    }
    bench.toggleTap();
  } finally {
    vi.useRealTimers();
  }
}

/** Tips the vial over the pan until the balance reads at least `grams`. */
async function weighTo(bench: ReactionBenchComponent, grams: number): Promise<void> {
  vi.useFakeTimers();
  try {
    bench.toggleTip();
    while (bench.massG() < grams) {
      await vi.advanceTimersByTimeAsync(60);
    }
    bench.toggleTip();
  } finally {
    vi.useRealTimers();
  }
}

/** Runs one whole protocol on a vial and leaves the bench at 'complete'. */
async function runProtocol(bench: ReactionBenchComponent, vialId: string): Promise<void> {
  bench.selectVial(vialId);
  await pourTo(bench, targetVolumeMl);
  bench.confirmVolume();
  await weighTo(bench, targetMassG);

  vi.useFakeTimers();
  try {
    const transferred = bench.transfer();
    await vi.advanceTimersByTimeAsync(7000);
    await transferred;

    for (let drop = 0; drop < requiredDrops; drop += 1) {
      const added = bench.addDrop();
      await vi.advanceTimersByTimeAsync(5000);
      await added;
    }
  } finally {
    vi.useRealTimers();
  }
}

describe('ReactionBenchComponent', () => {
  it('keeps the globally selected vial loaded when restarting a procedure', async () => {
    await TestBed.configureTestingModule({ imports: [ReactionBenchComponent] }).compileComponents();
    const fixture = TestBed.createComponent(ReactionBenchComponent);
    fixture.componentRef.setInput('selectedVialId', 'vial-b');
    fixture.detectChanges();
    const bench = fixture.componentInstance;
    bench.nudgeVolume();
    bench.observation.set('Discard this draft.');
    bench.abandonRun();
    expect(bench.vialId()).toBe('vial-b');
    expect(bench.step()).toBe('fill');
    expect(bench.volumeMl()).toBe(0);
    expect(bench.observation()).toBe('');
  });
  it('keeps a measured procedure and observation when switching vials', async () => {
    const bench = await createBench();
    bench.selectVial('vial-c');
    await pourTo(bench, targetVolumeMl);
    bench.confirmVolume();
    bench.observation.set('Prepared an equal volume.');
    const volume = bench.volumeMl();
    bench.selectVial('vial-b');
    expect(bench.step()).toBe('fill');
    bench.selectVial('vial-c');
    expect(bench.step()).toBe('weigh');
    expect(bench.volumeMl()).toBe(volume);
    expect(bench.observation()).toBe('Prepared an equal volume.');
  });
  it('swaps the SVG stand-in for a rendered plate when one is configured', async () => {
    const original = apparatusArt.beaker.src;
    try {
      // The component is OnPush and reads the config directly, so the plate has
      // to be in place before the first render.
      apparatusArt.beaker.src = '/bench-art/beaker.webp';
      await TestBed.configureTestingModule({
        imports: [ReactionBenchComponent],
      }).compileComponents();
      const withPlate = TestBed.createComponent(ReactionBenchComponent);
      withPlate.detectChanges();
      const plated = withPlate.nativeElement as HTMLElement;

      const plate = plated.querySelector('img.beaker-plate');
      expect(plate).not.toBeNull();
      expect(plate?.getAttribute('src')).toBe('/bench-art/beaker.webp');
      // Dynamic layers keep drawing on top of the plate.
      expect(plated.querySelector('svg.beaker-svg')).not.toBeNull();

      TestBed.resetTestingModule();
      apparatusArt.beaker.src = undefined;
      const bare = await createBench();
      expect(bare.host.querySelector('img.beaker-plate')).toBeNull();
      expect(bare.host.querySelector('svg.beaker-svg')).not.toBeNull();
    } finally {
      apparatusArt.beaker.src = original;
    }
  });

  it('ships with every apparatus plate wired up', () => {
    for (const [part, slot] of Object.entries(apparatusArt)) {
      expect(slot.src, `${part} has no plate configured`).toBeDefined();
      expect(slot.src).toMatch(/^\/bench-art\/.+\.webp$/);
    }
    // Glass composites by screen over black; opaque metal needs a real cutout.
    expect(apparatusArt.beaker.blend).toBe('screen');
    expect(apparatusArt.balance.blend).toBe('normal');
  });

  it('starts a run when a carried vial is dropped onto the bench', async () => {
    const bench = await createBench();

    expect(bench.step()).toBe('select');
    bench.dockVial();
    expect(bench.step()).toBe('select');

    bench.holdVial('vial-b');
    expect(bench.heldVialId()).toBe('vial-b');
    bench.dockVial();

    expect(bench.vialId()).toBe('vial-b');
    expect(bench.heldVialId()).toBeUndefined();
    expect(bench.step()).toBe('fill');
  });

  it('gates the balance behind a beaker filled inside the target band', async () => {
    const bench = await createBench();
    bench.selectVial('vial-c');

    expect(bench.step()).toBe('fill');

    await pourTo(bench, 3);
    expect(bench.volumeOk()).toBe(false);
    bench.confirmVolume();
    expect(bench.step()).toBe('fill');

    await pourTo(bench, targetVolumeMl);
    expect(bench.volumeOk()).toBe(true);
    bench.confirmVolume();
    expect(bench.step()).toBe('weigh');
  });

  it('refuses the transfer until the balance settles inside the mass band', async () => {
    const bench = await createBench();
    bench.selectVial('vial-c');
    await pourTo(bench, targetVolumeMl);
    bench.confirmVolume();

    await weighTo(bench, 1);
    expect(bench.massOk()).toBe(false);
    expect(bench.canTransfer()).toBe(false);

    await weighTo(bench, targetMassG);
    expect(bench.massOk()).toBe(true);
    expect(bench.canTransfer()).toBe(true);
  });

  it('lets the student take mass back off an overloaded pan', async () => {
    const bench = await createBench();
    bench.selectVial('vial-a');
    await pourTo(bench, targetVolumeMl);
    bench.confirmVolume();
    await weighTo(bench, 2.4);

    expect(bench.massOver()).toBe(true);
    bench.removePinch();
    bench.removePinch();
    bench.removePinch();

    expect(bench.massG()).toBeLessThan(2.4);
  });

  it('drains an overfilled beaker back to zero', async () => {
    const bench = await createBench();
    bench.selectVial('vial-a');
    await pourTo(bench, 6.5);

    expect(bench.volumeOver()).toBe(true);
    bench.drainBeaker();

    expect(bench.volumeMl()).toBe(0);
    expect(bench.tapOpen()).toBe(false);
  });

  it('runs the bicarbonate through both stages, bubbling and cooling on the way', async () => {
    const bench = await createBench();
    await runProtocol(bench, 'vial-c');

    expect(bench.step()).toBe('complete');
    expect(bench.temperature()).toBe(19);
    expect(bench.solutionStage()?.output).toMatchObject({ gas: 'rapid bubbles for 18 s' });
    expect(bench.indicatorStage()?.output).toMatchObject({ colorAfter: 'light tan' });
    // Bubbling stops once the vessel settles.
    expect(bench.bubbling()).toBe(false);
    expect(bench.tightRun()).toBe(true);
  });

  it('turns the starch vessel blue-black at the indicator stage', async () => {
    const bench = await createBench();
    await runProtocol(bench, 'vial-d');

    expect(bench.solutionStage()?.output).toMatchObject({ gas: 'none visible' });
    expect(bench.indicatorStage()?.output).toMatchObject({ colorAfter: 'dark blue-black' });
    expect(bench.procedureLog()[0].headline).toContain('indicator turned dark blue-black');
  });

  it('files both stages as one record only after the student writes an observation', async () => {
    const bench = await createBench();
    const emitted: StationCapture[] = [];
    bench.captured.subscribe((capture) => emitted.push(capture));

    await runProtocol(bench, 'vial-c');

    expect(bench.canCapture()).toBe(false);
    bench.capture();
    expect(emitted).toHaveLength(0);

    bench.observation.set('It fizzed hard and the thermometer dropped, then went pale tan.');
    bench.capture();

    expect(emitted).toHaveLength(1);
    expect(emitted[0]).toMatchObject({
      activityId: 'activity-reaction-comparison',
      evidenceId: 'evidence-reaction-trials',
      result: {
        vialId: 'vial-c',
        procedure: { heldTightly: true, drops: requiredDrops, retries: 0 },
        stages: [
          { reagent: 'solution-a', vialId: 'vial-c' },
          { reagent: 'indicator-b', vialId: 'vial-c' },
        ],
      },
    });
    // The bench resets for the next specimen and remembers what has been screened.
    expect(bench.step()).toBe('select');
    expect(bench.isScreened('vial-c')).toBe(true);
  });

  it('counts a drained beaker as a reset and marks the run untidy', async () => {
    const bench = await createBench();
    bench.selectVial('vial-a');

    await pourTo(bench, 6.5);
    expect(bench.volumeOver()).toBe(true);
    bench.drainBeaker();
    expect(bench.retries()).toBe(1);

    await pourTo(bench, targetVolumeMl);
    bench.confirmVolume();
    await weighTo(bench, targetMassG);

    vi.useFakeTimers();
    try {
      const transferred = bench.transfer();
      await vi.advanceTimersByTimeAsync(7000);
      await transferred;
      for (let drop = 0; drop < requiredDrops; drop += 1) {
        const added = bench.addDrop();
        await vi.advanceTimersByTimeAsync(5000);
        await added;
      }
    } finally {
      vi.useRealTimers();
    }

    expect(bench.step()).toBe('complete');
    expect(bench.drops()).toBe(requiredDrops);
    // The pour landed in the band, but it took a reset to get there.
    expect(bench.tightRun()).toBe(false);
    expect(bench.procedureLog()[0].retries).toBe(1);
  });

  it('stops accepting drops once the protocol dose is in', async () => {
    const bench = await createBench();
    await runProtocol(bench, 'vial-b');

    expect(bench.drops()).toBe(requiredDrops);
    await bench.addDrop();
    expect(bench.drops()).toBe(requiredDrops);
  });
});
