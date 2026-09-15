import { By } from '@angular/platform-browser';
import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import fixture from '../../../../public/projects/shadow-gallery/versions/2.0.0/project.json';
import { initialRestoration, transitionRestoration } from './restoration.engine';
import type { RestorationAction, RestorationDefinition } from './restoration.models';
import { RestorationEditorComponent } from './restoration-editor.component';
@Component({
  imports: [RestorationEditorComponent],
  template:
    '<app-restoration-editor [definition]="definition" [state]="state()" [sources]="sources" (action)="send($event)" (research)="researchOpened.set(true)" />',
})
class Host {
  readonly definition = fixture.works[0] as RestorationDefinition;
  readonly sources = fixture.sourceGallery.evidence;
  readonly state = signal(initialRestoration());
  readonly researchOpened = signal(false);
  send(action: RestorationAction): void {
    const result = transitionRestoration(this.definition, this.state(), action);
    if (result) this.state.set(result.state);
  }
}
describe('Restoration editor student interactions', () => {
  it('uses keyboard accessible controls to inspect, remove, undo and compare actual layers', async () => {
    const f = TestBed.createComponent(Host);
    await f.whenStable();
    const root: HTMLElement = f.nativeElement;
    const click = async (label: string) => {
      const b = [...root.querySelectorAll('button')].find(
        (b) => b.textContent?.trim() === label || b.getAttribute('aria-label') === label,
      )!;
      expect(b).toBeTruthy();
      b.click();
      await f.whenStable();
    };
    await click('Inspect The added object');
    expect(f.componentInstance.state().selectedRegionId).toBe('detail');
    const removal = [...root.querySelectorAll<HTMLButtonElement>('.repair-option')].find((b) =>
      b.textContent?.includes('Lift out'),
    )!;
    removal.click();
    await f.whenStable();
    expect(root.querySelector('.frame [data-region="detail"] img')).toBeNull();
    await click('Undo repair');
    expect(root.querySelector('.frame [data-region="detail"] img')).toBeTruthy();
    await click('Compare before / after');
    expect(root.querySelectorAll('.comparison figure')).toHaveLength(2);
    expect(root.textContent).toContain('Original forged study');
    expect(root.textContent).toContain('Your reconstruction');
  });
  it('saves unfinished reasoning before research or a different detail is opened', async () => {
    const f = TestBed.createComponent(Host);
    await f.whenStable();
    const root: HTMLElement = f.nativeElement;
    root.querySelector<HTMLButtonElement>('[aria-label="Inspect The added object"]')!.click();
    await f.whenStable();
    const editor = f.debugElement.query(By.directive(RestorationEditorComponent))
      .componentInstance as RestorationEditorComponent;
    expect(root.querySelector('textarea')).toBeNull();
    expect(root.querySelector('.check-panel')).toBeNull();
    root.querySelector<HTMLButtonElement>('.focus-step-actions .save-note')!.click();
    await f.whenStable();
    expect(root.querySelector('.repair-option')).toBeNull();
    const source = root.querySelector<HTMLSelectElement>('.repair-desk select')!;
    source.value = editor.references()[0].id;
    source.dispatchEvent(new Event('change'));
    await f.whenStable();
    root.querySelector<HTMLButtonElement>('.focus-step-actions .save-note')!.click();
    await f.whenStable();
    const relationship = root.querySelector<HTMLSelectElement>('.repair-desk select')!;
    relationship.value = 'contradicts';
    relationship.dispatchEvent(new Event('change'));
    await f.whenStable();
    root.querySelector<HTMLButtonElement>('.focus-step-actions .save-note')!.click();
    await f.whenStable();
    expect(root.querySelectorAll('.repair-desk textarea')).toHaveLength(1);
    expect(document.activeElement).toBe(root.querySelector('textarea'));
    const textarea = root.querySelector('textarea')!;
    textarea.value = 'I need to compare the horse with the exchange reference.';
    textarea.dispatchEvent(new Event('input'));
    await f.whenStable();
    root.querySelector<HTMLButtonElement>('.research')!.click();
    await f.whenStable();
    expect(f.componentInstance.researchOpened()).toBe(true);
    expect(f.componentInstance.state().notes['detail'].explanation).toContain('compare the horse');
    root.querySelector<HTMLButtonElement>('[aria-label="Inspect The supporting detail"]')!.click();
    await f.whenStable();
    expect(editor.explanation()).toBe('');
    expect(editor.step()).toBe('repair');
    root.querySelector<HTMLButtonElement>('[aria-label="Inspect The added object"]')!.click();
    await f.whenStable();
    expect(editor.explanation()).toContain('compare the horse');
    expect(editor.evidenceId()).toBe(f.componentInstance.state().notes['detail'].evidenceId);
  });
  it('blocks checking when a required artwork fails and labels reflections for human review', async () => {
    const f = TestBed.createComponent(Host);
    await f.whenStable();
    const root: HTMLElement = f.nativeElement;
    f.componentInstance.state.update((state) => ({
      ...state,
      notes: Object.fromEntries(
        f.componentInstance.definition.regions.map((region) => [
          region.id,
          {
            evidenceId: region.evidenceIds[0],
            relationship: 'supports' as const,
            explanation: 'A draft explanation that remains for teacher review.',
          },
        ]),
      ),
    }));
    await f.whenStable();
    root.querySelector('img')!.dispatchEvent(new Event('error'));
    await f.whenStable();
    expect(root.querySelector<HTMLButtonElement>('.check-panel .primary')!.disabled).toBe(true);
    expect(root.textContent).toContain('could not load');
    expect(root.textContent).toContain('written reasoning is saved for teacher review');
  });
});
