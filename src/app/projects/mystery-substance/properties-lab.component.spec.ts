import { TestBed } from '@angular/core/testing';

import { PropertiesLabComponent } from './properties-lab.component';
import type { StationCapture } from './station-workspaces';

async function createLab(): Promise<PropertiesLabComponent> {
  await TestBed.configureTestingModule({ imports: [PropertiesLabComponent] }).compileComponents();
  return TestBed.createComponent(PropertiesLabComponent).componentInstance;
}

async function runTrial(lab: PropertiesLabComponent): Promise<void> {
  vi.useFakeTimers();
  try {
    const finished = lab.run();
    await vi.advanceTimersByTimeAsync(6000);
    await finished;
  } finally {
    vi.useRealTimers();
  }
}

describe('PropertiesLabComponent', () => {
  it('drives the meter and lamp from the conductivity reading', async () => {
    const lab = await createLab();
    lab.selectTest('conductivity');

    // Vial A conducts strongly; vial B does not.
    lab.selectVial('vial-a');
    await runTrial(lab);
    const conducting = lab.conductanceRatio();
    expect(conducting).toBeGreaterThan(0.8);
    expect(lab.lampGlow()).toBeGreaterThan(0.8);
    expect(lab.needleAngle()).toBeGreaterThan(30);

    lab.selectVial('vial-b');
    await runTrial(lab);
    expect(lab.conductanceRatio()).toBeLessThan(0.05);
    expect(lab.lampGlow()).toBeLessThan(0.05);
  });

  it('holds cloudiness for the suspension and clears it for the soluble specimens', async () => {
    const lab = await createLab();
    lab.selectTest('solubility');

    // Vial D holds a suspension and starts a settled layer.
    lab.selectVial('vial-d');
    await runTrial(lab);
    expect(lab.cloudiness()).toBeGreaterThan(0.4);

    // Vial A clears completely.
    lab.selectVial('vial-a');
    await runTrial(lab);
    expect(lab.cloudiness()).toBe(0);
  });

  it('gives each specimen its own particle field', async () => {
    const lab = await createLab();

    lab.selectVial('vial-a');
    const coarse = lab.grainProfile();
    lab.selectVial('vial-d');
    const fine = lab.grainProfile();

    // Coarse sparkling crystals versus fine clumping powder.
    expect(coarse.maxSize).toBeGreaterThan(fine.maxSize);
    expect(coarse.sparkle).toBe(true);
    expect(fine.sparkle).toBe(false);
    expect(fine.clump).toBe(true);
    expect(lab.field().length).toBe(fine.count);
  });

  it('tracks which specimens have been run per test', async () => {
    const lab = await createLab();
    lab.selectTest('conductivity');
    lab.selectVial('vial-c');
    await runTrial(lab);

    expect(lab.hasRun('vial-c', 'conductivity')).toBe(true);
    expect(lab.hasRun('vial-c', 'solubility')).toBe(false);
    expect(lab.coverage('conductivity')).toBe(1);
    expect(lab.coverage('solubility')).toBe(0);
  });

  it('files a trial in the shape the case matrix reads, once described', async () => {
    const lab = await createLab();
    const emitted: StationCapture[] = [];
    lab.captured.subscribe((capture) => emitted.push(capture));

    lab.selectTest('conductivity');
    lab.selectVial('vial-a');
    await runTrial(lab);

    expect(lab.canCapture()).toBe(false);
    lab.capture();
    expect(emitted).toHaveLength(0);

    lab.observation.set('The lamp lit brightly and the needle swung most of the way over.');
    lab.capture();

    expect(emitted).toHaveLength(1);
    expect(emitted[0]).toMatchObject({
      activityId: 'activity-property-comparison',
      evidenceId: 'evidence-property-trials',
      result: { inputs: { specimen: 'vial-a', test: 'conductivity' } },
    });
    // evidenceResultMatrix() reads result.outputs for the cell text.
    const result = emitted[0].result as { outputs?: Record<string, unknown> };
    expect(result.outputs?.['millisiemens']).toBe(8.7);
  });

  it('clears a stale result when the specimen or test changes', async () => {
    const lab = await createLab();
    lab.selectTest('conductivity');
    lab.selectVial('vial-a');
    await runTrial(lab);
    expect(lab.phase()).toBe('settled');

    lab.selectVial('vial-b');
    expect(lab.phase()).toBe('idle');
    expect(lab.result()).toBeUndefined();
  });
});
