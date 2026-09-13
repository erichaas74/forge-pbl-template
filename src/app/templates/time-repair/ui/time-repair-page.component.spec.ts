import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import raw from '../../../../../public/projects/exploration-time-repair/project.json';
import { createLocalPreviewSession } from '../../../core/context/project-session-context';
import { requireTimeRepairConfig } from '../domain/time-repair.validation';
import type { TimeRepairState } from '../domain/time-repair.models';
import { BrowserTimeRepairPersistence } from '../runtime/time-repair.persistence';
import {
  TIME_REPAIR_CONFIG,
  TIME_REPAIR_PERSISTENCE,
  TIME_REPAIR_SESSION,
  TimeRepairRuntime,
} from '../runtime/time-repair.runtime';
import { TimeRepairPageComponent } from './time-repair-page.component';
import { timeRepairLauncher } from '../../../runtime/project-launch/template-launchers/time-repair.launcher';
import { projectCatalog } from '../../../projects/project-catalog';

const config = requireTimeRepairConfig(raw);
const session = createLocalPreviewSession(config.projectId, config.projectVersion);

describe('Time Repair playable investigation', () => {
  beforeEach(async () => {
    localStorage.clear();
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: vi.fn(),
    });
    await TestBed.configureTestingModule({
      imports: [TimeRepairPageComponent],
      providers: [
        provideRouter([]),
        { provide: TIME_REPAIR_CONFIG, useValue: config },
        { provide: TIME_REPAIR_SESSION, useValue: session },
        {
          provide: TIME_REPAIR_PERSISTENCE,
          useFactory: () => new BrowserTimeRepairPersistence(config, session, localStorage),
        },
        TimeRepairRuntime,
      ],
    }).compileComponents();
  });
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('keeps timeline navigation keyboard-operable and focuses the opened workspace', async () => {
    const fixture = TestBed.createComponent(TimeRepairPageComponent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelectorAll('.timeline-node')).toHaveLength(7);
    const jump = Array.from(root.querySelectorAll<HTMLButtonElement>('.spaces button')).find((b) =>
      b.textContent?.includes('Time jump'),
    )!;
    expect(jump.disabled).toBe(true);
    root.querySelector<HTMLButtonElement>('[aria-label^="1492:"]')!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.selectedNodeId()).toBe('atlantic-contact');
    expect(document.activeElement).toBe(root.querySelector('.workspace'));
    expect(root.querySelector('.mission-panel')?.textContent).toContain('baseline');
  });

  it('completes evidence collection, defense, scene repair and ripple verification through the UI, then restores it', async () => {
    const fixture = TestBed.createComponent(TimeRepairPageComponent);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const settle = async () => {
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
    };
    const click = async (label: string) => {
      const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('button'));
      const button = buttons.find((b) => b.textContent?.includes(label) && !b.closest('[hidden]'));
      expect(button, label).toBeDefined();
      button!.click();
      await settle();
    };
    const fill = async (name: string, value: string) => {
      const control = root.querySelector<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >(`[name="${name}"]`)!;
      expect(control, name).not.toBeNull();
      control.value = value;
      control.dispatchEvent(
        new Event(control.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }),
      );
      await settle();
    };
    const explanation =
      'The Andean origin and the sixteenth-century cultivation record contradict the European cargo in 1490. The first exact arrival date remains uncertain.';
    await click('Investigate the anomaly');
    await click('Collect evidence card');
    await fill('note', explanation);
    await click('Save evidence connection');
    await click('Follow the dated record');
    await click('Collect evidence card');
    await fill('note', explanation);
    await click('Save evidence connection');
    await click('Defend the repair');
    await fill('category', 'Chronology error');
    await fill('claim', explanation);
    await fill('consequence', explanation);
    await fill('explanation', explanation);
    Array.from(root.querySelectorAll('label.radio'))
      .find((label) => label.textContent?.includes('The 1490 European cargo is too early'))!
      .querySelector('input')!
      .click();
    await settle();
    await click('Request repair authorization');
    expect(root.textContent).toContain('Your evidence has opened a path.');
    await click('Enter time-jump scene');
    expect(root.querySelectorAll('.camera-tabs button')).toHaveLength(2);
    await click('Cargo close-up');
    root.querySelector<HTMLButtonElement>('[aria-label="Inspect Flagged cargo"]')!.click();
    await settle();
    expect(document.activeElement?.textContent).toBe('Flagged cargo');
    Array.from(root.querySelectorAll('label.radio'))
      .find((label) => label.textContent?.includes('Remove the premature cargo'))!
      .querySelector('input')!
      .click();
    await settle();
    await click('Apply repair');
    expect(root.querySelector('.field-overlay')?.textContent).toContain('Premature cargo removed');
    expect(root.querySelector('.object-art')?.getAttribute('src')).toContain('cargo-restored.svg');
    await click('Follow the ripple');
    expect(root.querySelectorAll('.ripple-card')).toHaveLength(3);
    await fill('verificationSource', 'dated-cultivation');
    await fill('verificationExplanation', explanation);
    await click('Record verification');
    expect(root.textContent).toContain('Verification recorded');
    expect(TestBed.inject(TimeRepairRuntime).stability()).toBe(100);
    const restored = new BrowserTimeRepairPersistence(config, session, localStorage).load();
    expect(restored?.missions['early-cargo'].verification?.explanation).toBe(explanation);
    expect(restored?.missions['early-cargo'].attempts).toHaveLength(1);
  });

  it('preserves unsaved actions after a transient storage failure and saves the complete state on recovery', () => {
    let saved: TimeRepairState | undefined;
    let fail = true;
    const versions: number[] = [];
    TestBed.overrideProvider(TIME_REPAIR_PERSISTENCE, {
      useValue: {
        available: true,
        load: () => saved,
        save: (state: TimeRepairState, expectedVersion: number) => {
          versions.push(expectedVersion);
          if (fail) {
            fail = false;
            throw new Error('Quota temporarily unavailable');
          }
          if (expectedVersion !== (saved?.version ?? 0))
            throw new Error('STATE_CONFLICT: stale snapshot');
          saved = state;
        },
      },
    });
    const runtime = TestBed.inject(TimeRepairRuntime);
    expect(runtime.dispatch({ type: 'collect', evidenceId: 'andean-origin' })).toBe(true);
    expect(runtime.storageNotice()).toContain('Save failed');
    expect(runtime.dispatch({ type: 'collect', evidenceId: 'dated-cultivation' })).toBe(true);
    expect(saved?.collectedIds).toEqual(['andean-origin', 'dated-cultivation']);
    expect(versions).toEqual([0, 0]);
    expect(runtime.storageNotice()).toBe('Progress saved on this device');
  });

  it('preserves exportable local work if a storage outage is followed by a different tab winning the write', () => {
    let calls = 0;
    TestBed.overrideProvider(TIME_REPAIR_PERSISTENCE, {
      useValue: {
        available: true,
        load: () => undefined,
        save: () => {
          if (++calls === 1) throw new Error('Storage unavailable');
          throw new Error('STATE_CONFLICT: another tab');
        },
      },
    });
    const runtime = TestBed.inject(TimeRepairRuntime);
    runtime.dispatch({ type: 'collect', evidenceId: 'andean-origin' });
    expect(runtime.dispatch({ type: 'collect', evidenceId: 'dated-cultivation' })).toBe(false);
    expect(runtime.state().collectedIds).toEqual(['andean-origin']);
    expect(runtime.message()).toContain('unsaved local work is still here');
    expect(runtime.caseFile()).toContain('A crop with Andean roots');
  });

  it('does not launch local answer-key or scoring logic in an authoritative classroom session', async () => {
    const project = projectCatalog.find((p) => p.id === config.projectId)!;
    await expect(
      timeRepairLauncher.load({
        project,
        projectDefinition: raw,
        session: { ...session, authorityMode: 'serverAuthoritative' },
      }),
    ).rejects.toThrow('CAPABILITY_NOT_INSTALLED');
    await expect(
      timeRepairLauncher.load({
        project,
        projectDefinition: raw,
        session: { ...session, projectVersion: '2.0.0' },
      }),
    ).rejects.toThrow('PROJECT_ID_MISMATCH');
  });
});
