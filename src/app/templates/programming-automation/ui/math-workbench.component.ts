import { Component, computed, inject, input, signal } from '@angular/core';
import { AutomationRuntimeService } from '../runtime/automation-runtime.service';
import { calculate, decimalAndFraction, expectedMath, mathTools } from '../core/automation-math';
import type { MathEvidence, MathTool } from '../domain/automation.models';
@Component({
  selector: 'app-math-workbench',
  template: `
    <small>REASON</small>
    <h2>Math workbench</h2>
    <p class="intro">Predict a value. Show your thinking. Then connect your math to a command.</p>
    @if (selectedEvidence(); as selected) {
      <div class="result correct">
        <strong>Linked to your selected command</strong>
        <p>{{ title(selected.tool) }} · {{ format(selected.answer) }} {{ selected.unit }}</p>
        <p>{{ selected.explanation }}</p>
      </div>
    }
    @if (!runtime.sample) {
      <label
        >Calculation<select
          aria-label="Math calculation"
          [value]="toolId()"
          (change)="choose($any($event.target).value)"
        >
          @for (tool of tools; track tool.id) {
            <option [value]="tool.id" [selected]="tool.id === toolId()">{{ tool.title }}</option>
          }
        </select></label
      >
      <p class="formula">{{ tool().formula }}</p>
      @for (label of tool().inputs; track $index; let i = $index) {
        <label
          >{{ label
          }}<input
            [attr.aria-label]="label"
            placeholder="Enter a number or fraction"
            [value]="values().at(i) ?? ''"
            (input)="setValue(i, $any($event.target).value)"
            [disabled]="runtime.sample"
        /></label>
      }
      <label
        >Your answer ({{ tool().unit }})<input
          aria-label="Your math answer"
          placeholder="Calculate before checking"
          [value]="answer()"
          (input)="answer.set($any($event.target).value); result.set(undefined)"
          [disabled]="runtime.sample"
      /></label>
      <label
        >Explain your thinking<textarea
          aria-label="Math explanation"
          placeholder="I multiplied… because…"
          rows="3"
          [value]="explanation()"
          (input)="explanation.set($any($event.target).value); result.set(undefined)"
          [disabled]="runtime.sample"
        ></textarea>
      </label>
      <button class="primary" [disabled]="runtime.sample" (click)="check()">
        Check & save calculation
      </button>
      <p class="feedback" role="status">{{ feedback() }}</p>
      @if (result(); as evidence) {
        <div class="result" [class.correct]="evidence.status === 'correct'">
          <strong>{{
            evidence.status === 'correct' ? '✓ Calculation supported' : 'Revise your calculation'
          }}</strong>
          <p>Expected: {{ format(evidence.expected) }} {{ evidence.unit }}</p>
          <p>Your answer: {{ format(evidence.answer) }} {{ evidence.unit }}</p>
          @if (runtime.selectedCommand() && runtime.canEdit() && allowLink()) {
            <button (click)="link(evidence.id)">Link to selected command</button>
          }
        </div>
      }
    }
    <details class="evidence" [open]="runtime.sample">
      <summary>Saved calculations ({{ runtime.state().math.length }})</summary>
      @for (evidence of runtime.state().math; track evidence.id) {
        <article>
          <strong>{{ title(evidence.tool) }}</strong>
          <p>
            {{ format(evidence.answer) }} {{ evidence.unit }} ·
            {{ evidence.status === 'correct' ? 'Checked' : 'Needs revision' }}
          </p>
          <p>{{ evidence.explanation }}</p>
          <button
            [disabled]="!runtime.selectedCommand() || !runtime.canEdit() || !allowLink()"
            (click)="link(evidence.id)"
          >
            Link to selected command
          </button>
        </article>
      } @empty {
        <p>Your calculations will appear here, including revisions.</p>
      }
    </details>
    <details class="calibration">
      <summary>Robot calibration notebook</summary>
      <p>
        Wheel diameter: {{ runtime.config.robot.wheelDiameterCm }} cm. Use π = 3.14. Test one
        rotation and read the distance in your trial.
      </p>
      <label
        >Measured distance / rotation (cm)<input
          [value]="runtime.state().measuredDistancePerRotation"
          (input)="
            runtime.updateCalibration('measuredDistancePerRotation', $any($event.target).value)
          "
          [disabled]="runtime.sample"
      /></label>
      <label
        >Measured turn rate (° / second)<input
          [value]="runtime.state().measuredTurnRate"
          (input)="runtime.updateCalibration('measuredTurnRate', $any($event.target).value)"
          [disabled]="runtime.sample"
      /></label>
      <label
        >Why might a measurement differ from a calculation?<textarea
          rows="3"
          [value]="runtime.state().measurementExplanation"
          (input)="runtime.updateCalibration('measurementExplanation', $any($event.target).value)"
          [disabled]="runtime.sample"
        ></textarea>
      </label>
    </details>
  `,
  styles: `
    :host {
      display: block;
    }
    small {
      font-size: 10px;
      letter-spacing: 1.6px;
      color: #62707f;
      font-weight: 800;
    }
    h2 {
      font-size: 18px;
      margin: 3px 0;
    }
    .intro {
      font-size: 12px;
      line-height: 1.6;
      color: #546b79;
    }
    label {
      font-size: 11px;
      font-weight: 650;
      display: block;
      margin-top: 12px;
      color: #4b6574;
    }
    input,
    select,
    textarea {
      font: inherit;
      font-size: 12px;
      box-sizing: border-box;
      width: 100%;
      min-width: 0;
      padding: 9px;
      border-radius: 6px;
      border: 1px solid #bdced4;
      background: #fff;
      color: #183748;
      margin-top: 5px;
    }
    textarea {
      resize: vertical;
    }
    .formula {
      padding: 10px;
      background: #edf2fb;
      border-radius: 6px;
      color: #465b7b;
      font-size: 12px;
      line-height: 1.6;
    }
    button {
      font: inherit;
      font-size: 11px;
      padding: 9px;
      border: 1px solid #b7cdd1;
      border-radius: 6px;
      cursor: pointer;
      background: #fff;
      color: #17626b;
    }
    .primary {
      background: #137c7b;
      color: white;
      border: 0;
      margin-top: 14px;
      width: 100%;
      font-weight: 700;
    }
    button:disabled {
      opacity: 0.45;
      cursor: default;
    }
    .feedback {
      font-size: 12px;
      color: #9c4d28;
    }
    .result {
      font-size: 12px;
      border-left: 3px solid #d59036;
      background: #fff3df;
      padding: 12px;
    }
    .result.correct {
      background: #e8f6ec;
      border-color: #318357;
    }
    .result p {
      margin: 6px 0;
    }
    details {
      margin-top: 18px;
      font-size: 12px;
    }
    summary {
      font-weight: 700;
      cursor: pointer;
      color: #294e60;
    }
    article {
      padding: 10px 0;
      border-bottom: 1px solid #dbe6e9;
      line-height: 1.6;
    }
    article p {
      margin: 4px 0;
    }
    .calibration {
      line-height: 1.6;
    }
    input:focus-visible,
    select:focus-visible,
    textarea:focus-visible,
    button:focus-visible,
    summary:focus-visible {
      outline: 3px solid #dda039;
      outline-offset: 2px;
    }
  `,
})
export class MathWorkbenchComponent {
  readonly allowLink = input(true);
  readonly selectedEvidence = computed(() =>
    this.runtime.state().math.find((e) => e.id === this.runtime.selectedCommand()?.mathEvidenceId),
  );
  readonly runtime = inject(AutomationRuntimeService);
  readonly tools = mathTools;
  readonly toolId = signal<MathTool>('distance-rotations');
  readonly values = signal<string[]>([]);
  readonly answer = signal('');
  readonly explanation = signal('');
  readonly result = signal<MathEvidence | undefined>(undefined);
  readonly feedback = signal('');
  readonly tool = computed(() => mathTools.find((t) => t.id === this.toolId())!);
  readonly format = decimalAndFraction;
  link(id: string): void {
    if (this.allowLink()) this.runtime.linkEvidence(id);
  }
  title(id: MathTool): string {
    return mathTools.find((t) => t.id === id)!.title;
  }
  choose(id: MathTool): void {
    this.toolId.set(id);
    this.values.set([]);
    this.result.set(undefined);
    this.answer.set('');
    this.feedback.set('');
  }
  setValue(index: number, value: string): void {
    this.values.update((values) => {
      const next = [...values];
      next[index] = value;
      return next;
    });
    this.result.set(undefined);
  }
  check(): void {
    if (this.runtime.sample) return;
    try {
      if (
        !this.answer().trim() ||
        this.explanation().trim().length < 8 ||
        this.tool().inputs.some((_, i) => !this.values()[i]?.trim())
      )
        throw new Error('Enter the inputs, your answer, and an explanation before checking.');
      const inputs = this.values().map((v) => calculate(v));
      const expected = expectedMath(this.toolId(), inputs);
      const answer = calculate(this.answer());
      const evidence: MathEvidence = {
        id: crypto.randomUUID(),
        studentId: this.runtime.session.actorId,
        tool: this.toolId(),
        inputs,
        answer,
        expected,
        unit: this.tool().unit,
        explanation: this.explanation().trim(),
        status: Math.abs(answer - expected) <= 0.01 ? 'correct' : 'needs-revision',
        timestamp: new Date().toISOString(),
      };
      this.runtime.saveEvidence(evidence);
      this.result.set(evidence);
      this.feedback.set('Calculation saved to your evidence notebook.');
    } catch (error) {
      this.feedback.set(error instanceof Error ? error.message : 'Check your numbers.');
    }
  }
}
