import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { ProjectLessonPlan } from './project-lesson.models';

@Component({
  selector: 'app-curriculum-disclosure',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <button
      #trigger
      class="disclosure"
      aria-haspopup="dialog"
      (click)="panel.showModal()"
    >
      <span>Standards · alignment pending</span
      ><span>Week {{ week() }} goals <b aria-hidden="true">↗</b></span>
    </button>
    <dialog #panel aria-label="Standards and weekly learning goals" (close)="trigger.focus()">
      <header>
        <h2>Week {{ week() }} · Standards & learning goals</h2>
        <button (click)="panel.close()" aria-label="Close standards">Close</button>
      </header>
      <p>{{ plan().presentation?.alignmentNote }}</p>
      @for (lesson of lessons(); track lesson.number) {
        <section>
          <h3>{{ lesson.number }} · {{ lesson.title }}</h3>
          @for (criterion of lesson.criteria; track criterion) {
            <p>{{ criterion }}</p>
          }
          <p><strong>Evidence:</strong> {{ lesson.output }}</p>
        </section>
      }
    </dialog>`,
  styles: `
    :host {
      display: block;
      background: #edece5;
      color: #394e4a;
      font:
        12px/1.5 Arial,
        sans-serif;
    }
    .disclosure {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      min-height: 34px;
      padding: 4px 24px;
      background: none;
      color: inherit;
      border: 0;
      font: inherit;
      cursor: pointer;
    }
    b {
      margin-left: 8px;
    }
    button:focus-visible {
      outline: 3px solid #197e91;
      outline-offset: -3px;
    }
    dialog {
      box-sizing: border-box;
      max-width: 720px;
      width: calc(100% - 28px);
      max-height: 85dvh;
      overflow: auto;
      background: #faf8f0;
      color: #263e3c;
      border: 1px solid #b9c4bd;
      border-radius: 12px;
      padding: 22px;
      font:
        14px/1.6 Arial,
        sans-serif;
    }
    dialog::backdrop {
      background: #0d2528b8;
    }
    header {
      display: flex;
      align-items: start;
      gap: 18px;
      justify-content: space-between;
    }
    h2 {
      font:
        22px Georgia,
        serif;
      margin: 0;
    }
    h3 {
      font-size: 15px;
    }
    section {
      border-top: 1px solid #d0d5c9;
      margin-top: 20px;
    }
    header button {
      min-height: 44px;
      background: #183d3c;
      color: white;
      border: 0;
      border-radius: 5px;
      padding: 8px 15px;
      cursor: pointer;
    }
    @media (max-width: 600px) {
      .disclosure {
        padding: 4px 12px;
        font-size: 10px;
        min-height: 36px;
      }
    }
  `,
})
export class CurriculumDisclosureComponent {
  readonly plan = input.required<ProjectLessonPlan>();
  readonly selected = input.required<number>();
  readonly week = computed(() => Math.ceil(this.selected() / 2));
  readonly lessons = computed(() =>
    this.plan().lessons.filter((l) => Math.ceil(l.number / 2) === this.week()),
  );
}
