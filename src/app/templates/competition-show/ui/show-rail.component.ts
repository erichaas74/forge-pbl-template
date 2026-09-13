import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { railDetail, railIndex, railStops, railWaiting } from '../domain/show-progress';
import type { CompetitionState } from '../domain/competition.models';

/** The one element that persists from the opening bell to the champion. */
@Component({
  selector: 'app-show-rail', changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rail">
      <ol aria-label="Show progress">
        @for (stop of stops; track stop.id; let i = $index) {
          <li [class.done]="i < index()" [class.now]="i === index()" [class.waiting]="i === index() && waiting()"
            [attr.aria-current]="i === index() ? 'step' : null">
            <span class="dot" aria-hidden="true"></span><span class="label">{{ stop.label }}</span>
          </li>
        }
      </ol>
      <p class="detail"><span>{{ detail() }}</span>@if (clock()) { <strong class="clock">{{ clock() }}</strong> }</p>
    </div>`,
  styles: [`
    :host{display:block}
    .rail{border:1px solid #26344a;border-top:2px solid var(--broadcast-accent,#edc875);background:#0b1524;padding:16px 18px 12px}
    ol{display:flex;align-items:flex-start;gap:0;list-style:none;margin:0;padding:0}
    li{flex:1;display:flex;flex-direction:column;align-items:center;gap:7px;position:relative;text-align:center;min-width:0}
    li::before,li::after{content:'';position:absolute;top:6px;height:2px;background:#1b2739}
    li::before{left:0;right:50%;margin-right:7px}li::after{left:50%;right:0;margin-left:7px}
    li:first-child::before,li:last-child::after{display:none}
    li.done::before,li.done::after,li.now::before{background:#6d7f98}
    .dot{width:14px;height:14px;border-radius:50%;border:2px solid #1b2739;background:#0b1524;position:relative;z-index:1;flex:none}
    li.done .dot{background:#6d7f98;border-color:#6d7f98}
    li.now .dot{background:var(--broadcast-accent,#edc875);border-color:var(--broadcast-accent,#edc875);box-shadow:0 0 0 5px #edc8752e}
    li.now.waiting .dot{animation:pulse 1.6s ease-in-out infinite}
    .label{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#6d7f98;overflow-wrap:anywhere}
    li.now .label{color:var(--broadcast-accent,#edc875)}li.done .label{color:#93a6c0}
    .detail{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin:14px 0 0;font-size:13px;color:#93a6c0}
    .clock{font-size:26px;font-variant-numeric:tabular-nums;color:var(--broadcast-accent,#edc875);font-weight:400}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 5px #edc8752e}50%{box-shadow:0 0 0 9px #edc87514}}
    @media(prefers-reduced-motion:reduce){li.now.waiting .dot{animation:none}}
    @media(max-width:640px){.label{font-size:9px;letter-spacing:.04em}.rail{padding:12px 10px 10px}}
  `],
})
export class ShowRailComponent {
  readonly phase = input.required<CompetitionState['phase']>();
  readonly roundTitle = input('');
  readonly roundIndex = input(0);
  readonly roundCount = input(1);
  readonly clock = input('');
  readonly stops = railStops;
  readonly index = computed(() => railIndex(this.phase()));
  readonly waiting = computed(() => railWaiting(this.phase()));
  readonly detail = computed(() => railDetail(this.phase(), this.roundTitle(), this.roundIndex(), this.roundCount()));
}
