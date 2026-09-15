import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { KnowledgeRuntime } from './knowledge.runtime';
import {
  KnowledgeDrawingComponent,
  KnowledgeRoomComponent,
  SceneButtonDirective,
} from './scene-tools';
import type { Fragment } from './knowledge.models';

@Component({
  selector: 'app-knowledge-reconstruction',
  imports: [KnowledgeRoomComponent, KnowledgeDrawingComponent, SceneButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './knowledge-scene.scss',
  template: ` <svg
    class="scene"
    viewBox="0 0 1000 660"
    preserveAspectRatio="xMidYMid meet"
    role="group"
    aria-label="Recover a drawing from two damaged copies"
  >
    <g knowledge-room />
    <path d="M373 72L916 92 897 578 362 562Z" fill="#172d2e" opacity=".4" />
    <path d="M371 62L905 78 894 560 360 548Z" class="paper" />
    <path d="M372 62L360 548M641 76V540" stroke="#ad9366" stroke-width="4" />
    @for (cell of cells; track cell) {
      <g
        [attr.transform]="
          'translate(' + (405 + (cell % 3) * 142) + ' ' + (170 + Math.floor(cell / 3) * 142) + ')'
        "
      >
        <path d="M0 0H142V142H0Z" fill="#c1ab80" stroke="#9c895f" stroke-dasharray="4 6" />
        @if (at(cell); as f) {
          <g [attr.transform]="'rotate(' + k.state().values[f.id] * 90 + ' 71 71)'">
            <svg
              x="0"
              y="0"
              width="142"
              height="142"
              style="overflow:hidden;pointer-events:none"
              [attr.viewBox]="view(f)"
            >
              <g knowledge-drawing />
            </svg>
          </g>
        }
        <rect
          kb
          [label]="'Page position ' + (cell + 1) + '. Place the lifted fragment.'"
          (activate)="k.act({ type: 'place', target: '' + cell })"
          class="hit"
          x="0"
          y="0"
          width="142"
          height="142"
          fill="transparent"
          rx="5"
        />
      </g>
    }
    @for (copy of copies; track copy) {
      <g
        [attr.transform]="
          'translate(' +
          (38 + copy * 158) +
          ' ' +
          (copy ? 276 : 144) +
          ') rotate(' +
          (copy ? 5 : -6) +
          ')'
        "
      >
        <path d="M-5-5H146V240H-5Z" fill="#57463a" stroke="#bd9d6b" stroke-width="5" />
        <path d="M0 0H136V228L109 232 90 212 65 232 45 219 0 232Z" class="paper" />
        <text x="66" y="-20" class="label">{{ copy ? 'II' : 'I' }}</text>
        @for (f of fragments(); track f.id; let i = $index) {
          @if (f.copy === copy) {
            <g
              [attr.transform]="
                'translate(' +
                (i % 3 === 1 ? 66 : 6) +
                ' ' +
                (16 + Math.floor((i % 3) / 2) * 108) +
                ')'
              "
            >
              <g [attr.transform]="'rotate(' + k.state().values[f.id] * 90 + ' 30 40)'">
                <svg
                  width="60"
                  height="80"
                  style="overflow:hidden;pointer-events:none"
                  [attr.viewBox]="view(f)"
                >
                  <g knowledge-drawing />
                </svg>
              </g>
              <rect
                kb
                [label]="'Lift fragment ' + (f.cell + 1) + ' from copy ' + (copy + 1)"
                [pressed]="k.state().selected === f.id"
                (activate)="k.act({ type: 'select', item: f.id })"
                class="hit"
                x="-3"
                y="-3"
                width="63"
                height="87"
                fill="transparent"
                rx="4"
              />
            </g>
          }
        }
      </g>
    }
    <g
      kb
      label="Turn the lifted fragment a quarter turn"
      (activate)="k.act({ type: 'turn' })"
      transform="translate(260 95)"
    >
      <circle class="hit button-face" r="40" />
      <text class="button-ink" y="10" font-size="39">↻</text>
    </g>
    <g
      kb
      label="Examine the reconstructed page and its joins"
      (activate)="k.act({ type: 'inspect' })"
      transform="translate(906 584)"
    >
      <circle class="hit button-face" r="43" />
      <circle r="18" cy="-5" fill="none" stroke="#335c53" stroke-width="5" />
      <path d="M12 9l13 15" stroke="#335c53" stroke-width="7" />
    </g>
    <path d="M47 582q70-20 196 2" fill="none" stroke="#d8c18f" stroke-width="9" />
    <path d="M88 561l99 50" stroke="#a5906b" stroke-width="4" />
  </svg>`,
})
export class ReconstructionComponent {
  readonly k = inject(KnowledgeRuntime);
  readonly cells = [0, 1, 2, 3, 4, 5];
  readonly copies = [0, 1];
  readonly Math = Math;
  readonly fragments = computed(() => this.k.config()!.fragments!);
  at(cell: number): Fragment | undefined {
    return this.fragments().find((f) => f.id === this.k.state().placements[String(cell)]);
  }
  view(f: Fragment): string {
    return `${(f.cell % 3) * 100} ${Math.floor(f.cell / 3) * 100} 100 100`;
  }
}
