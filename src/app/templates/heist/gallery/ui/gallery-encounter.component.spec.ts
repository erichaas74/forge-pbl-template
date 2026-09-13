import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import data from '../../../../../../public/projects/shadow-gallery/versions/1.1.0/project.json';
import { requireGalleryMission } from '../domain/gallery.validation';
import { GALLERY_MISSION, GALLERY_PERSISTENCE, GalleryRuntime } from '../runtime/gallery-runtime';
import { GALLERY_SCENE_LOADER, GalleryComponent } from './gallery.component';
vi.mock('phaser', () => ({}));
const mission = requireGalleryMission(data), scene = mission.encounters![0];
const loader = async () => ({ mountGallery: (_parent: unknown, _mission: unknown, _view: unknown, _inspect: unknown, ready: () => void) => { ready(); return { destroy: vi.fn() }; } });

describe('Gallery encounter workspace', () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    TestBed.configureTestingModule({ imports: [GalleryComponent], providers: [provideRouter([]), GalleryRuntime, { provide: GALLERY_MISSION, useValue: mission }, { provide: GALLERY_PERSISTENCE, useValue: { load: () => [], save: vi.fn() } }, { provide: GALLERY_SCENE_LOADER, useValue: loader }] });
  });
  afterEach(() => vi.restoreAllMocks());
  async function mounted() {
    const fixture = TestBed.createComponent(GalleryComponent);
    const root = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    const dialog = root.querySelector('dialog')!;
    dialog.showModal = () => dialog.setAttribute('open', ''); dialog.close = () => dialog.removeAttribute('open');
    await fixture.whenStable(); fixture.detectChanges();
    const click = (selector: string, label: string) => {
      const button = [...root.querySelectorAll<HTMLButtonElement>(selector)].find(b => b.textContent?.includes(label));
      expect(button, `${selector}: ${label}`).toBeDefined(); button!.click(); fixture.detectChanges();
    };
    return { fixture, root, dialog, click, c: fixture.componentInstance };
  }
  it('uses the visible story, interview and inspection controls before permitting an insight', async () => {
    const { fixture, root, c, click, dialog } = await mounted();
    click('.scene-invitation button', 'Step into');
    expect(dialog.classList.contains('encounter-workspace')).toBe(true);
    click('.encounter-notebook button', 'Keep an insight');
    expect(root.querySelector<HTMLButtonElement>('.encounter-panel .primary')!.disabled).toBe(true);
    click('.viewpoints button', 'Sit');
    expect(root.querySelector('.transcript')?.textContent).toContain(scene.chapters[0].text);
    const audio = root.querySelector('audio')!;
    expect(audio.autoplay).toBe(false); audio.dispatchEvent(new Event('error')); fixture.detectChanges();
    expect(root.textContent).toContain('The complete account is readable below');
    click('.viewpoints button', 'Ask');
    const followup = scene.questions.find(q => q.requiresQuestionId)!;
    const prerequisite = scene.questions.find(q => q.id === followup.requiresQuestionId)!;
    const followupButton = [...root.querySelectorAll<HTMLButtonElement>('.question-choices button')].find(b => b.textContent?.includes(followup.title))!;
    expect(followupButton.disabled).toBe(true);
    click('.question-choices button', prerequisite.title); expect(followupButton.disabled).toBe(false);
    click('.question-choices button', followup.title);
    click('.viewpoints button', 'Explore'); click('.encounter-panel button', scene.object.features[0].label);
    expect(c.encounterState()?.features).toHaveLength(1);
    expect(c.engine().frauds).toEqual([]); expect(c.engine().phase).toBe('recon');
    click('.return-button', 'Return');
    expect(dialog.open).toBe(false); expect(c.engine().activeEncounterId).toBeUndefined();
    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled(); fixture.destroy();
  });
  it('returns to the same inspected detail on Escape without committing a painting choice', async () => {
    const { fixture, c, click, dialog } = await mounted(), painting = mission.chambers[0].paintings[0];
    c.inspect(painting.id); c.inspectHotspot(painting.hotspots[0].id); fixture.detectChanges();
    click('dialog button', 'Enter the scene');
    const cancel = new Event('cancel', { cancelable: true }); dialog.dispatchEvent(cancel); fixture.detectChanges();
    expect(cancel.defaultPrevented).toBe(true); expect(dialog.open).toBe(true);
    expect(c.panel()).toBe('inspect'); expect(c.selectedPainting()).toBe(painting.id); expect(c.hotspot()).toBe(painting.hotspots[0].id);
    expect(c.engine().phase).toBe('recon'); expect(c.engine().activeEncounterId).toBeUndefined(); fixture.destroy();
  });
  it('preserves an unfinished lock across a notebook encounter and return', async () => {
    const { fixture, root, c, click } = await mounted(), painting = mission.chambers[0].paintings.find(p => p.authentic)!;
    c.inspect(painting.id); c.inspectHotspot(painting.hotspots[0].id); c.choose(); fixture.detectChanges();
    click('.sort-items button', 'Wheat'); click('.sort-zones button', 'Old World');
    click('dialog button', 'Open evidence & field notes'); click('.notebook-group button', scene.title);
    click('.return-button', 'Return'); expect(c.panel()).toBe('notes');
    click('dialog button', 'Return to the mechanism');
    expect(root.querySelector('.placement-status')?.textContent).toContain('1 of 4 placed');
    expect(c.engine().solved).toHaveLength(0); fixture.destroy();
  });
});
