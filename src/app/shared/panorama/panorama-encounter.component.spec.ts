import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import fixtureData from '../../../../public/projects/shadow-gallery/versions/2.0.0/project.json';
import { PanoramaEncounterComponent } from './panorama-encounter.component';
import { initialPanoramaState } from './panorama.models';
import { transitionPanorama } from './panorama.engine';
import { requirePanorama } from './panorama.validation';
import { PANORAMA_INTERVIEW } from './panorama-interview.adapter';
// Keep legacy interview coverage for scenes that still opt into scene-owned questions.
const scene = requirePanorama({ ...fixtureData.previewWeeks.scenes[0], questionOwner: 'scene', viewpoints: undefined });
async function setup() {
  await TestBed.configureTestingModule({ imports: [PanoramaEncounterComponent] }).compileComponents();
  const fixture = TestBed.createComponent(PanoramaEncounterComponent), c = fixture.componentInstance;
  let state = initialPanoramaState();
  fixture.componentRef.setInput('scene', scene); fixture.componentRef.setInput('state', state);
  c.action.subscribe(a => { state = transitionPanorama(scene, state, a) ?? state; fixture.componentRef.setInput('state', state); });
  fixture.detectChanges(); return { fixture, c, root: fixture.nativeElement as HTMLElement };
}
describe('Panorama encounter UI', () => {
  afterEach(() => TestBed.resetTestingModule());
  it('leaves questions to the tutor for the spherical scene', async () => {
    const { fixture, c, root } = await setup();
    fixture.componentRef.setInput('scene', requirePanorama(fixtureData.previewWeeks.scenes[0]));
    fixture.detectChanges(); c.enter(); fixture.detectChanges();
    expect(root.querySelector('app-spherical-view')).not.toBeNull();
    c.selectSphericalPerson('canoe-maker'); fixture.detectChanges();
    expect(c.mode()).toBe('panorama');
    expect(root.querySelector('.question-box')).toBeNull(); expect(root.querySelector('.suggestions')).toBeNull();
    expect(root.textContent).toContain('Open AI box');
  });
  it('enters the correct world without forged layers and returns with the same viewing direction', async () => {
    const { fixture, c, root } = await setup();
    expect(root.querySelectorAll('[data-forgery]')).toHaveLength(3);
    (root.querySelector('.enter-surface') as HTMLButtonElement).click(); fixture.detectChanges();
    expect(root.querySelectorAll('[data-forgery]')).toHaveLength(0);
    expect(root.querySelectorAll('.person-target')).toHaveLength(2);
    c.pan(20); c.saveHeading(); fixture.detectChanges();
    c.approach(scene.people[0]); fixture.detectChanges();
    expect(root.textContent).toContain('character video pending');
    c.talk(); fixture.detectChanges(); expect(root.textContent).toContain('AI disconnected');
    await c.ask('How did you make this canoe?'); fixture.detectChanges();
    expect(root.querySelector('.messages')?.textContent).toContain('one tree trunk');
    c.returnToScene(); fixture.detectChanges(); expect(c.heading()).toBe(70);
    c.leave(); fixture.detectChanges(); c.enter(); fixture.detectChanges(); expect(c.heading()).toBe(70);
    c.approach(scene.people[0]); c.talk(); fixture.detectChanges(); expect(c.conversation()).toHaveLength(2);
  });
  it('repairs each visible layer, undoes, and restores the original for comparison', async () => {
    const { fixture, c, root } = await setup();
    for (const r of scene.repairs) c.action.emit({ type: 'repair', repairId: r.id, applied: true });
    fixture.detectChanges(); expect(root.querySelectorAll('[data-forgery]')).toHaveLength(0);
    c.action.emit({ type: 'undo' }); fixture.detectChanges(); expect(root.querySelectorAll('[data-forgery]')).toHaveLength(1);
    c.original.set(true); fixture.detectChanges(); expect(root.querySelectorAll('[data-forgery]')).toHaveLength(3);
    c.original.set(false); fixture.detectChanges(); expect(root.querySelectorAll('[data-forgery]')).toHaveLength(1);
  });
  it('suppresses a late interview response after the student leaves', async () => {
    let finish!: (value: { role: 'character'; text: string; sourceIds: string[] }) => void;
    TestBed.configureTestingModule({ providers: [{ provide: PANORAMA_INTERVIEW, useValue: { mode: 'ai', answer: () => new Promise(resolve => { finish = resolve; }) } }] });
    const { fixture, c } = await setup(); c.enter(); c.approach(scene.people[0]); c.talk(); fixture.detectChanges();
    const pending = c.ask('How?'); c.returnToScene(); finish({ role: 'character', text: 'Late answer', sourceIds: [] }); await pending;
    fixture.detectChanges(); expect(c.conversation()).toHaveLength(0); expect(c.busy()).toBe(false);
  });
});
