import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { CurriculumDisclosureComponent } from './curriculum-disclosure.component';
import { projectLessonRegistry } from '../../runtime/project-launch/project-lesson.registry';

describe('compact pending curriculum review', () => {
  it('opens the selected week’s goals on demand without claiming verified Grade 7 standards', async () => {
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
      configurable: true,
      value: vi.fn(function (this: HTMLDialogElement) {
        this.open = true;
      }),
    });
    await TestBed.configureTestingModule({
      imports: [CurriculumDisclosureComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(CurriculumDisclosureComponent);
    fixture.componentRef.setInput(
      'plan',
      projectLessonRegistry.find('exploration-time-repair', '2.0.0'),
    );
    fixture.componentRef.setInput('selected', 5);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('dialog')!.open).toBe(false);
    const trigger = root.querySelector<HTMLButtonElement>('.disclosure')!;
    expect(trigger.textContent).toContain('alignment pending');
    expect(trigger.textContent).toContain('Week 3');
    trigger.click();
    expect(root.querySelector('dialog')!.open).toBe(true);
    expect(root.querySelector('dialog')!.textContent).toContain(
      'Grade 7 crosswalk has not been supplied',
    );
    expect(root.querySelector('dialog')!.textContent).toContain('The ink that would not hold');
    expect(root.querySelector('dialog')!.textContent).not.toContain('The book that never arrived');
    fixture.componentRef.setInput('selected', 8);
    fixture.detectChanges();
    expect(trigger.textContent).toContain('Week 4');
    expect(root.querySelector('dialog')!.textContent).toContain('The messenger returns');
    vi.restoreAllMocks();
  });
});
