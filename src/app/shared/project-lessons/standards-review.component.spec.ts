import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { StandardsReviewComponent } from './standards-review.component';
import { projectLessonStandards } from '../../projects/project-lesson-standards';
import { projectLessonRegistry } from '../../runtime/project-launch/project-lesson.registry';
import { forgeReviewStandards, curriculumConnections } from '../../runtime/project-launch/project-standards.registry';

describe('StandardsReviewComponent', () => {
  function create(projectId = 'mystery-substance', lesson = 1) {
    const review = projectLessonStandards.find((item) => item.projectId === projectId)!;
    const fixture = TestBed.createComponent(StandardsReviewComponent);
    fixture.componentRef.setInput('review', review);
    fixture.componentRef.setInput('plan', projectLessonRegistry.find(review.projectId, review.projectVersion));
    fixture.componentRef.setInput('selected', lesson);
    fixture.componentRef.setInput('standards', forgeReviewStandards);
    fixture.componentRef.setInput('connections', curriculumConnections);
    fixture.detectChanges();
    return fixture;
  }

  it('shows only the selected week inline and preserves testing checks across navigation', () => {
    const fixture = create();
    const component = fixture.componentInstance;
    const root: HTMLElement = fixture.nativeElement;
    const save = vi.spyOn(Storage.prototype, 'setItem');
    const checkbox = root.querySelector<HTMLInputElement>('input[type=checkbox]')!;
    checkbox.click();
    fixture.detectChanges();
    expect(component.checkedCount()).toBe(1);
    expect(root.querySelector('.week-standards')?.textContent).toContain('1 /');
    expect(root.querySelector('.week-picker')).toBeNull();
    expect(root.querySelector('.week-standards')?.textContent).not.toContain('Lesson 8');
    expect(root.querySelector('dialog')?.open).toBe(false);
    fixture.componentRef.setInput('selected', 5);
    fixture.detectChanges();
    expect(component.week()).toBe(3);
    expect(component.checkedCount()).toBe(0);
    expect(root.querySelector('.week-standards')?.textContent).not.toContain('Lesson 1');
    const ids = new Set(component.lessons().flatMap(entry => entry.targets.map(target => target.standardId)));
    expect(component.weekConnections().every(c => ids.has(c.standardId) && c.projectId !== component.review().projectId)).toBe(true);
    expect(root.textContent).toContain('FF.G5.SCI.02');
    fixture.componentRef.setInput('selected', 1);
    fixture.detectChanges();
    expect(root.querySelector<HTMLInputElement>('input')!.checked).toBe(true);
    expect(save).not.toHaveBeenCalled();
    save.mockRestore();
  });

  it('shows missing instruction, resets tester checks and closes with Escape without dismissing the activity', () => {
    const fixture = create('cascade-bay-crisis', 3);
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('.addition')?.textContent).toContain('water-cycle diagram');
    expect(root.textContent).toContain('not student grades or mastery');
    const panel = root.querySelector<HTMLDialogElement>('dialog')!;
    // jsdom does not implement native dialog methods; verify the component's wiring.
    panel.showModal = vi.fn(() => { panel.open = true; });
    panel.close = vi.fn(() => { panel.open = false; panel.dispatchEvent(new Event('close')); });
    root.querySelector<HTMLButtonElement>('[aria-haspopup=dialog]')!.click();
    expect(panel.showModal).toHaveBeenCalled();
    root.querySelector<HTMLInputElement>('input')!.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.checkedCount()).toBe(1);
    root.querySelector<HTMLButtonElement>('.reset')!.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.checkedCount()).toBe(0);
    panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(panel.open).toBe(false);
    expect(panel.close).toHaveBeenCalled();
    expect(document.activeElement).toBe(root.querySelector('[aria-haspopup=dialog]'));
  });

  it('keeps checks distinct between projects and does not persist them on reload', () => {
    const fixture = create();
    const component = fixture.componentInstance;
    component.toggle(1, 'FF.G5.SCI.03');
    const other = projectLessonStandards.find((item) => item.projectId === 'calendar-monument')!;
    fixture.componentRef.setInput('review', other);
    fixture.componentRef.setInput('plan', projectLessonRegistry.find(other.projectId, other.projectVersion));
    fixture.detectChanges();
    expect(component.checkedCount()).toBe(0);
    fixture.destroy();
    expect(create().componentInstance.checkedCount()).toBe(0);
  });
});
