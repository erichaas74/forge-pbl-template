import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DebateExchangeRuntime } from './debate-exchange-runtime.service';
import { DebateRecordingComponent } from './debate-recording.component';

@Component({
  selector: 'app-debate-author',
  imports: [FormsModule, DebateRecordingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>Manual authoring · Session {{ runtime.lesson().number }} · {{ runtime.lesson().product }}</p>
    <label>Debate point<input maxlength="600" [ngModel]="point()" (ngModelChange)="point.set($event)" /></label>
    <button type="button" (click)="addPoint()" [disabled]="!point().trim()">Add point</button>
    <ol>@for (point of runtime.draft().points; track $index) {
      <li>{{ point }} <button type="button" [attr.aria-label]="'Remove point ' + ($index + 1)" (click)="removePoint($index)">Remove</button></li>
    }</ol>
    <label>Speech / transcript<textarea rows="8" maxlength="12000" [ngModel]="runtime.draft().speech" (ngModelChange)="runtime.updateDraft({speech: $event})"></textarea></label>
    <fieldset><legend>Sources used</legend>@for (source of runtime.config.evidence; track source.id) {
      <label class="check"><input type="checkbox" [checked]="runtime.draft().evidenceIds.includes(source.id)" (change)="runtime.toggleSource(source.id)" />{{ source.title }}</label>
    }</fieldset>
    @if (runtime.lesson().number % 2 === 0) {
      <label>Group name (leave empty for individual exchange)<input maxlength="100" [ngModel]="runtime.draft().group" (ngModelChange)="runtime.updateDraft({group: $event})" /></label>
      <small>Each performer submits their own contribution, even when working in a group.</small>
    }
    @if (runtime.draft().revises) {
      <label>What changed and why?<textarea rows="3" maxlength="2000" [ngModel]="runtime.draft().changeNote" (ngModelChange)="runtime.updateDraft({changeNote: $event})"></textarea></label>
      <fieldset><legend>Feedback used in this revision</legend>
        @for (review of runtime.received(); track review.id) {
          @if (review.contributionId === runtime.draft().revises) {
            <label class="check"><input type="checkbox" [checked]="runtime.draft().reviewIds.includes(review.id)" (change)="toggleFeedback(review.id)" />{{ review.name }}: {{ review.suggestion }}</label>
          }
        }
      </fieldset>
    }
    <details><summary>Record or attach a performance</summary>
      <app-debate-recording [editable]="true" [mediaId]="runtime.draft().mediaId" [reviewed]="!!runtime.draft().mediaReviewed" (changed)="runtime.updateDraft($event)" />
    </details>
    <p role="status">{{ runtime.message() }}</p>
    <button class="primary" type="button" (click)="submit()">Submit {{ runtime.lesson().mode === 'refine' ? 'revision' : 'argument' }}</button>
  `,
  styles: [`:host{display:grid;gap:12px}label{display:grid;gap:6px;font-weight:600}input,textarea,button{font:inherit}input,textarea{width:100%;box-sizing:border-box;padding:10px;border:1px solid #91a49f;border-radius:6px}button{padding:9px 14px;cursor:pointer}.check{display:flex;align-items:baseline;font-weight:400;margin:8px 0}.check input{width:auto}fieldset{border:1px solid #b2c0ba;border-radius:6px}.primary{background:#20574e;color:white;border:0}small{color:#425751}li{margin:8px 0}p:empty{display:none}`],
})
export class DebateAuthorComponent {
  readonly runtime = inject(DebateExchangeRuntime);
  readonly submitted = output<void>();
  readonly point = signal('');
  addPoint(): void { if (this.point().trim()) { this.runtime.updateDraft({ points: [...this.runtime.draft().points, this.point().trim()] }); this.point.set(''); } }
  removePoint(index: number): void { this.runtime.updateDraft({ points: this.runtime.draft().points.filter((_, at) => at !== index) }); }
  toggleFeedback(id: string): void { const ids = this.runtime.draft().reviewIds; this.runtime.updateDraft({ reviewIds: ids.includes(id) ? ids.filter(value => value !== id) : [...ids, id] }); }
  submit(): void { if (this.runtime.submit()) this.submitted.emit(); }
}
