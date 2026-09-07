import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { vi } from 'vitest';
import { ResearchPanelComponent } from './research-panel.component';
import { ResearchShelfState } from './research-shelf-state';
import { HistoryLiveRuntimeService } from '../runtime/history-live-runtime.service';
import { historyLiveRevolutionaryWarConfig as config } from '../../../projects/history-live-revolutionary-war/history-live-revolutionary-war.config';
import { createInitialHistoryLiveState } from '../core/history-live-state';

describe('persistent research panels', () => {
  it('opens factual lists, pins through the runtime, and keeps selections across work stages', () => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
    const state = signal(createInitialHistoryLiveState(config));
    const toggleSource = vi.fn((id: string) =>
      state.update((value) => ({ ...value, savedSourceIds: [id] })),
    );
    TestBed.configureTestingModule({
      providers: [
        ResearchShelfState,
        {
          provide: HistoryLiveRuntimeService,
          useValue: {
            config,
            state,
            toggleSource,
            savedSources: () =>
              config.sources.filter((source) => state().savedSourceIds.includes(source.id)),
          },
        },
      ],
    });
    const fixture = TestBed.createComponent(ResearchPanelComponent);
    fixture.componentRef.setInput('side', 'left');
    fixture.detectChanges();
    const shelf = TestBed.inject(ResearchShelfState);
    const element = fixture.nativeElement as HTMLElement;
    element.querySelector<HTMLButtonElement>('#research-witnesses-button')!.click();
    fixture.detectChanges();
    element.querySelector<HTMLButtonElement>('.resource-button')!.click();
    fixture.detectChanges();
    expect(element.textContent).toContain('Parker describes ordering');
    expect(element.textContent).not.toContain(
      config.sources.find((source) => source.id === 'source-parker')!.context,
    );
    element.querySelector<HTMLButtonElement>('.pin-button')!.click();
    expect(toggleSource).toHaveBeenCalledWith('source-parker');
    for (const stage of [
      'pitch',
      'sources',
      'script',
      'production',
      'broadcast',
      'showcase',
    ] as const) {
      state.update((value) => ({ ...value, stage }));
      fixture.detectChanges();
      expect(shelf.categories()).toContain('witnesses');
      expect(shelf.items()).toContain('source-parker');
      expect(element.querySelector('.pin-button')?.getAttribute('aria-pressed')).toBe('true');
    }
    shelf.open('documents');
    fixture.detectChanges();
    expect(document.activeElement).toBe(element.querySelector('#research-documents-button'));
    fixture.destroy();
  });
});
