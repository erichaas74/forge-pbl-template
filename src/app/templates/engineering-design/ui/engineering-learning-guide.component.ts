import { Component, input, output } from '@angular/core';
import type { EngineeringLearningStep } from '../domain/engineering-design.models';

@Component({
  selector: 'app-engineering-learning-guide',
  template: `
    <section aria-label="Current learning step">
      <div class="heading">
        <div>
          <p class="eyebrow">STEP {{ index() + 1 }} OF {{ steps().length }}</p>
          <h2>{{ step().title }}</h2>
          <p>{{ step().introduction }}</p>
        </div>
      </div>
      <ol>
        @for (instruction of step().instructions; track instruction) {
          <li>{{ instruction }}</li>
        }
      </ol>
      @if (step().explanation; as explanation) {
        <p>{{ explanation }}</p>
      }
      @if (step().question; as question) {
        <label for="learning-answer">{{ question.prompt }}</label>
        <textarea
          id="learning-answer"
          rows="2"
          maxlength="10000"
          [value]="answer()"
          (change)="answered.emit($any($event.target).value)"
          placeholder="I noticed… I think…"
        ></textarea>
      }
    </section>
  `,
  styles: [`
    :host { display:block; color:#393c30; }
    .eyebrow { font-size:10px; letter-spacing:.1em; margin:4px 0; }
    h2 { font:700 23px Georgia,serif; margin:4px 0; }
    p,li { font-size:14px; line-height:1.55; }
    ol { padding-left:20px; }
    li { margin-bottom:8px; }
    label { display:block; margin-top:12px; font-size:14px; font-weight:650; }
    textarea { box-sizing:border-box; width:100%; font:inherit; font-size:14px; margin:6px 0 12px; padding:8px; border:1px solid #bdb49b; border-radius:6px; background:#fffdf7; resize:vertical; }
    textarea:focus-visible { outline:3px solid #bc812c; outline-offset:2px; }
  `],
})
export class EngineeringLearningGuideComponent {
  readonly steps = input.required<readonly EngineeringLearningStep[]>();
  readonly step = input.required<EngineeringLearningStep>();
  readonly index = input(0);
  readonly answer = input('');
  readonly answered = output<string>();
}
