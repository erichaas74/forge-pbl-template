import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import data from '../../../../../../public/projects/shadow-gallery/project.json';
import { requireGalleryMission } from '../domain/gallery.validation';
import { GALLERY_MISSION, GALLERY_PERSISTENCE, GalleryRuntime } from '../runtime/gallery-runtime';
import { GALLERY_SCENE_LOADER, GalleryComponent } from './gallery.component';
import { AcademicLockComponent } from './academic-lock.component';
import { evaluateLock } from '../domain/academic-locks';
vi.mock('phaser', () => ({}));
const mission = requireGalleryMission(data), destroy = vi.fn();
let sceneInspect: (id: string) => void;
const loader = async () => ({ mountGallery: (_parent: unknown, _mission: unknown, _view: unknown, inspect: (id: string) => void, ready: () => void) => { sceneInspect = inspect; ready(); return { destroy }; } });
describe('Gallery student workspace', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [GalleryComponent], providers: [provideRouter([]), GalleryRuntime, { provide: GALLERY_MISSION, useValue: mission }, { provide: GALLERY_PERSISTENCE, useValue: { load: () => [], save: vi.fn() } }, { provide: GALLERY_SCENE_LOADER, useValue: loader }] }));
  async function mounted() {
    const fixture = TestBed.createComponent(GalleryComponent); fixture.detectChanges(); await fixture.whenStable(); fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement, dialog = root.querySelector('dialog')!;
    dialog.showModal = () => dialog.setAttribute('open', ''); dialog.close = () => dialog.removeAttribute('open');
    return { fixture, root, c: fixture.componentInstance };
  }
  it('provides a non-canvas path from painting inspection through fraud classification', async () => {
    const { fixture, root, c } = await mounted();
    expect(root.querySelectorAll('.painting-controls button')).toHaveLength(3);
    (root.querySelector('.painting-controls button') as HTMLButtonElement).click(); fixture.detectChanges();
    expect(c.panel()).toBe('inspect'); expect(root.querySelector('dialog')!.open).toBe(true);
    const choose = root.querySelector('dialog .primary') as HTMLButtonElement; expect(choose.disabled).toBe(true);
    (root.querySelector('.detail-studies button') as HTMLButtonElement).click(); fixture.detectChanges();
    expect(choose.disabled).toBe(false); choose.click(); fixture.detectChanges();
    expect(c.engine().phase).toBe('fraud'); expect(root.querySelectorAll('.fraud-categories button')).toHaveLength(4);
    c.category.set('animal-plant'); c.classify(); fixture.detectChanges(); expect(c.panel()).toBe('lock'); expect(root.querySelector('app-academic-lock')).not.toBeNull();
    fixture.destroy(); expect(destroy).toHaveBeenCalled();
  });
  it('restores current gameplay after inspecting an earlier replay decision', async () => {
    const { fixture, c } = await mounted(); const p = mission.chambers[0].paintings[1];
    c.inspect(p.id); c.inspectHotspot(p.hotspots[0].id); c.choose();
    const state = c.engine().snapshot(); c.open('replay'); c.replayIndex.set(0); expect(c.displaySnapshot().phase).toBe('recon');
    c.close(); expect(c.displaySnapshot()).toEqual(state); fixture.destroy();
  });
  it('opens the audit from its visible control and updates the running list without advancing practice', async () => {
    const { fixture, root, c } = await mounted();
    (root.querySelector('.audit-tools button') as HTMLButtonElement).click(); fixture.detectChanges();
    expect(root.querySelector('app-gallery-audit')?.textContent).toContain('No clues inspected yet');
    expect(c.engine().events).toHaveLength(0);
    expect(root.querySelector('.clue-guide')?.hasAttribute('open')).toBe(true);
    c.returnFromAudit();
    const p = mission.chambers[0].paintings[0];
    c.inspect(p.id); c.inspectHotspot(p.hotspots[0].id); c.open('audit'); fixture.detectChanges();
    expect(root.querySelectorAll('.clue-entry')).toHaveLength(1);
    expect(root.querySelector('.clue-entry')?.textContent).toContain('Inspected · unverified');
    expect(root.querySelector('.fraud-explanation')).toBeNull();
    c.inspect(p.id); c.inspectHotspot(p.hotspots[0].id); c.choose(); c.category.set('animal-plant'); c.classify();
    c.open('audit'); fixture.detectChanges();
    expect(root.querySelector('.clue-entry')?.textContent).toContain('Fraud identified · repair pending');
    expect(root.querySelector('.fraud-explanation')?.textContent).toContain(p.fraud!.explanation);
    c.returnFromAudit(); fixture.detectChanges();
    expect(c.panel()).toBe('lock'); expect(c.engine().phase).toBe('recovery');
    c.reset(); c.open('audit'); fixture.detectChanges();
    expect(root.querySelectorAll('.clue-entry')).toHaveLength(0); fixture.destroy();
  });
  it('ignores canvas clicks beneath an open workspace panel', async () => {
    const { fixture, c } = await mounted();
    const [first, second] = mission.chambers[0].paintings;
    sceneInspect(first.id); expect(c.selectedPainting()).toBe(first.id);
    sceneInspect(second.id); expect(c.selectedPainting()).toBe(first.id);
    c.close(); sceneInspect(second.id); expect(c.selectedPainting()).toBe(second.id); fixture.destroy();
  });
  it('shows readable loading failures and blocks passage selection until the scene is ready', async () => {
    const { fixture, root, c } = await mounted(); c.ready.set(false); c.artError.set('Art unavailable.'); fixture.detectChanges();
    expect(root.textContent).toContain('Reload artwork'); expect((root.querySelector('.painting-controls button') as HTMLButtonElement).disabled).toBe(true); fixture.destroy();
  });
  it('keeps unsubmitted placements and dial settings when consulting evidence, then clears drafts for a new practice', async () => {
    const { fixture, root, c } = await mounted(), painting = mission.chambers[0].paintings.find(p => p.authentic)!;
    c.inspect(painting.id); c.inspectHotspot(painting.hotspots[0].id); c.choose(); fixture.detectChanges();
    const click = (selector: string, label: string) => {
      const button = [...root.querySelectorAll<HTMLButtonElement>(selector)].find(b => b.textContent?.includes(label))!;
      button.click(); fixture.detectChanges();
    };
    click('.sort-items button', 'Wheat'); click('.sort-zones button', 'Old World');
    const attempts = c.engine().events.filter(e => e.type === 'operate').length;
    c.open('audit'); fixture.detectChanges(); c.returnFromAudit(); fixture.detectChanges();
    expect(root.querySelector('.placement-status')?.textContent).toContain('1 of 4 placed');
    c.open('notes'); fixture.detectChanges();
    const note = root.querySelector('details')!; note.open = true; note.dispatchEvent(new Event('toggle')); fixture.detectChanges();
    c.resume(); fixture.detectChanges();
    expect(root.querySelector('.placement-status')?.textContent).toContain('1 of 4 placed');
    expect(root.querySelector('.sort-zones button')?.textContent).toContain('Wheat');
    expect(c.engine().events.filter(e => e.type === 'operate')).toHaveLength(attempts);
    for (const [item, destination] of [['Potato', 'Americas'], ['Maize', 'Americas'], ['Horse', 'Old World']]) {
      click('.sort-items button', item); click('.sort-zones button', destination);
    }
    click('.operate', 'Operate mechanism');
    expect(c.currentLock()?.type).toBe('rotation');
    expect(c.lockDrafts.size).toBe(0);
    const calculation = root.querySelector<HTMLInputElement>('input[type=number]')!;
    calculation.value = '135'; calculation.dispatchEvent(new Event('input'));
    const slider = root.querySelector<HTMLInputElement>('input[type=range]')!;
    slider.value = '90'; slider.dispatchEvent(new Event('input')); fixture.detectChanges();
    c.open('notes'); fixture.detectChanges(); c.resume(); fixture.detectChanges(); await fixture.whenStable();
    expect(root.querySelector<HTMLInputElement>('input[type=number]')!.value).toBe('135');
    expect(root.querySelector<HTMLInputElement>('input[type=range]')!.value).toBe('90');
    c.reset(); fixture.detectChanges(); expect(c.lockDrafts.size).toBe(0); fixture.destroy();
  });
});
describe('Academic mechanism keyboard controls', () => {
  it('keeps calculation separate from physical rotation and emits both', async () => {
    TestBed.configureTestingModule({ imports: [AcademicLockComponent] });
    const fixture = TestBed.createComponent(AcademicLockComponent), lock = mission.locks.find(l => l.type === 'rotation')!;
    fixture.componentRef.setInput('lock', lock); fixture.detectChanges(); await fixture.whenStable();
    const c = fixture.componentInstance, operate = vi.fn(); c.operate.subscribe(operate);
    c.calculation.set(135); c.setting.set(90); fixture.detectChanges();
    (fixture.nativeElement.querySelector('.operate') as HTMLButtonElement).click(); expect(operate).toHaveBeenLastCalledWith(expect.objectContaining({ calculation: 135, setting: 90 }));
    const range = fixture.nativeElement.querySelector('input[type=range]') as HTMLInputElement;
    range.value = '135'; range.dispatchEvent(new Event('input')); fixture.detectChanges();
    expect(c.setting()).toBe(135); fixture.destroy();
  });
  it('requires every object to be placed, checks destinations instead of click order, and allows corrections', async () => {
    TestBed.configureTestingModule({ imports: [AcademicLockComponent] });
    const fixture = TestBed.createComponent(AcademicLockComponent), lock = mission.locks.find(l => l.id === 'shore-crates')!;
    fixture.componentRef.setInput('lock', lock); fixture.detectChanges(); await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement, operate = vi.fn(); fixture.componentInstance.operate.subscribe(operate);
    const click = (selector: string, label: string) => {
      [...root.querySelectorAll<HTMLButtonElement>(selector)].find(b => b.textContent?.includes(label))!.click(); fixture.detectChanges();
    };
    const submit = root.querySelector<HTMLButtonElement>('.operate')!;
    // Clicking object names alone must not look like a completed combination.
    for (const label of ['Wheat', 'Potato', 'Maize', 'Horse']) click('.sort-items button', label);
    expect(root.querySelector('.placement-status')?.textContent).toContain('0 of 4 placed');
    expect(root.querySelector('.placement-status')?.textContent).toContain('choose a destination for Horse');
    expect(submit.disabled).toBe(true); submit.click(); expect(operate).not.toHaveBeenCalled();
    for (const [item, destination] of [['Wheat', 'Old World'], ['Potato', 'Americas'], ['Maize', 'Americas']]) {
      click('.sort-items button', item); click('.sort-zones button', destination);
      expect(submit.disabled).toBe(true);
    }
    click('.sort-items button', 'Horse'); click('.sort-zones button', 'Americas');
    expect(submit.disabled).toBe(false); submit.click();
    expect(evaluateLock(lock, operate.mock.calls.at(-1)![0])).toBe(false);
    click('.sort-items button', 'Horse'); click('.sort-zones button', 'Old World'); submit.click();
    expect(evaluateLock(lock, operate.mock.calls.at(-1)![0])).toBe(true);
    expect(root.querySelector('.placement-status')?.textContent).toContain('4 of 4 placed');
    expect(root.querySelector('.sort-items button')?.textContent).toContain('Old World'); fixture.destroy();
  });
});
