import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import fixture from '../../../../public/projects/shadow-gallery/versions/2.0.0/project.json';
import { initialRestoration, transitionRestoration } from './restoration.engine';
import type { RestorationAction, RestorationDefinition } from './restoration.models';
import { RestorationEditorComponent } from './restoration-editor.component';
@Component({ imports: [RestorationEditorComponent], template: '<app-restoration-editor [definition]="definition" [state]="state()" [sources]="sources" (action)="send($event)" (research)="researchOpened.set(true)" />' })
class Host {
  readonly definition = fixture.works[0] as RestorationDefinition; readonly sources = fixture.sourceGallery.evidence;
  readonly state = signal(initialRestoration()); readonly researchOpened = signal(false);
  send(action: RestorationAction): void { const result = transitionRestoration(this.definition, this.state(), action); if (result) this.state.set(result.state); }
}
describe('Restoration editor student interactions', () => {
  it('uses keyboard accessible controls to inspect, remove, undo and compare actual layers', async () => {
    const f = TestBed.createComponent(Host); await f.whenStable(); const root: HTMLElement = f.nativeElement;
    const click = async (label: string) => { const b = [...root.querySelectorAll('button')].find(b => b.textContent?.trim() === label || b.getAttribute('aria-label') === label)!; expect(b).toBeTruthy(); b.click(); await f.whenStable(); };
    await click('Inspect The added object'); expect(f.componentInstance.state().selectedRegionId).toBe('detail');
    const removal = [...root.querySelectorAll<HTMLButtonElement>('.repair-option')].find(b => b.textContent?.includes('Lift out'))!; removal.click(); await f.whenStable();
    expect(root.querySelector('.frame [data-region="detail"] img')).toBeNull();
    await click('Undo repair'); expect(root.querySelector('.frame [data-region="detail"] img')).toBeTruthy();
    await click('Compare before / after'); expect(root.querySelectorAll('.comparison figure')).toHaveLength(2);
    expect(root.textContent).toContain('Original forged study'); expect(root.textContent).toContain('Your reconstruction');
  });
  it('saves unfinished reasoning before research or a different detail is opened', async () => {
    const f = TestBed.createComponent(Host); await f.whenStable(); const root: HTMLElement = f.nativeElement;
    root.querySelector<HTMLButtonElement>('[aria-label="Inspect The added object"]')!.click(); await f.whenStable();
    const textarea = root.querySelector('textarea')!; textarea.value = 'I need to compare the horse with the exchange reference.'; textarea.dispatchEvent(new Event('input')); await f.whenStable();
    root.querySelector<HTMLButtonElement>('.research')!.click(); await f.whenStable();
    expect(f.componentInstance.researchOpened()).toBe(true); expect(f.componentInstance.state().notes['detail'].explanation).toContain('compare the horse');
    root.querySelector<HTMLButtonElement>('[aria-label="Inspect The supporting detail"]')!.click(); await f.whenStable();
    expect(root.querySelector('textarea')!.value).toBe('');
    root.querySelector<HTMLButtonElement>('[aria-label="Inspect The added object"]')!.click(); await f.whenStable();
    expect(root.querySelector('textarea')!.value).toContain('compare the horse');
  });
  it('blocks checking when a required artwork fails and labels reflections for human review', async () => {
    const f = TestBed.createComponent(Host); await f.whenStable(); const root: HTMLElement = f.nativeElement;
    root.querySelector('img')!.dispatchEvent(new Event('error')); await f.whenStable();
    expect(root.querySelector<HTMLButtonElement>('.check-panel .primary')!.disabled).toBe(true); expect(root.textContent).toContain('could not load'); expect(root.textContent).toContain('written reasoning is saved for teacher review');
  });
});
