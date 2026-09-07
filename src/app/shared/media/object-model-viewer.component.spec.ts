import { TestBed } from '@angular/core/testing';
import { egyptianObjectModels } from '../../projects/class-exhibit-hall/egyptian-object-models';
import {
  LOAD_OBJECT_MODEL_VIEWER,
  ObjectModelViewerComponent,
} from './object-model-viewer.component';

describe('ObjectModelViewerComponent', () => {
  async function setup(loader = () => Promise.resolve()) {
    await TestBed.configureTestingModule({
      imports: [ObjectModelViewerComponent],
      providers: [{ provide: LOAD_OBJECT_MODEL_VIEWER, useValue: loader }],
    }).compileComponents();
    const fixture = TestBed.createComponent(ObjectModelViewerComponent);
    fixture.componentRef.setInput('model', egyptianObjectModels[0].model);
    fixture.detectChanges();
    return fixture;
  }
  it('does not load the viewer or GLB until requested and preserves model credits', async () => {
    let calls = 0;
    const fixture = await setup(() => {
      calls++;
      return Promise.resolve();
    });
    expect(calls).toBe(0);
    expect(fixture.nativeElement.querySelector('model-viewer')).toBeNull();
    fixture.nativeElement.querySelector('button').click();
    await fixture.whenStable();
    fixture.detectChanges();
    const viewer = fixture.nativeElement.querySelector('model-viewer');
    expect(calls).toBe(1);
    expect(viewer.getAttribute('src')).toBe(egyptianObjectModels[0].model!.src);
    expect(viewer.hasAttribute('camera-controls')).toBe(true);
    expect(viewer.hasAttribute('auto-rotate')).toBe(false);
    viewer.dispatchEvent(new Event('load'));
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Reset view');
    expect(fixture.nativeElement.textContent).toContain('The Watt Institution');
  });
  it('automatically reveals the configured object view without moving keyboard focus', async () => {
    const fixture = await setup();
    fixture.componentRef.setInput('autoLoad', true);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const viewer = fixture.nativeElement.querySelector('model-viewer') as HTMLElement;
    expect(viewer.getAttribute('camera-orbit')).toBe('75deg 45deg 85%');
    const focus = vi.spyOn(viewer, 'focus');
    viewer.dispatchEvent(new Event('load'));
    expect(focus).not.toHaveBeenCalled();
  });
  it('offers retry after a failed module load', async () => {
    let calls = 0;
    const fixture = await setup(() =>
      ++calls === 1 ? Promise.reject(new Error('offline')) : Promise.resolve(),
    );
    await fixture.componentInstance.load();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Try again');
    await fixture.componentInstance.load();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('model-viewer')).not.toBeNull();
  });
  it('unloads a previous object and ignores its pending module request when switching wings', async () => {
    let resolve!: () => void;
    const fixture = await setup(
      () =>
        new Promise<void>((done) => {
          resolve = done;
        }),
    );
    const pending = fixture.componentInstance.load();
    fixture.componentRef.setInput('model', egyptianObjectModels[1].model);
    fixture.detectChanges();
    resolve();
    await pending;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('model-viewer')).toBeNull();
    expect(fixture.componentInstance.loading()).toBe(false);
  });
  it('shows a recoverable error when the model asset fails', async () => {
    const fixture = await setup();
    await fixture.componentInstance.load();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('model-viewer').dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('could not load');
    expect(fixture.nativeElement.querySelector('model-viewer')).toBeNull();
  });
});
