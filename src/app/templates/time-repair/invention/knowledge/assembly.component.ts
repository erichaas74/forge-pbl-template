import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { KnowledgeRuntime } from './knowledge.runtime';
import { KnowledgeRoomComponent, SceneButtonDirective } from './scene-tools';
import { ASSEMBLY_ROLES, assemblyFault } from './object.activities';

@Component({
  selector: 'app-knowledge-assembly',
  imports: [KnowledgeRoomComponent, SceneButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './knowledge-scene.scss',
  template: ` <svg
    class="scene"
    viewBox="0 0 1000 660"
    preserveAspectRatio="xMidYMid meet"
    role="group"
    aria-label="Assemble and operate the contributions of four crafts"
  >
    <g knowledge-room />
    <path
      d="M315 540V121H849V540M315 181H849M355 539H805"
      fill="none"
      stroke="#4b392b"
      stroke-width="43"
    />
    <path d="M315 534V122H849V534M323 181H841" fill="none" stroke="#bc9560" stroke-width="25" />
    <path d="M579 187V342" stroke="#9e7746" stroke-width="24" />
    @for (i of thread; track i) {
      <path [attr.d]="'M561 ' + (191 + i * 18) + 'l38-12'" stroke="#64432f" stroke-width="6" />
    }
    <g class="moved" [attr.transform]="'translate(0 ' + value('screw') * 26 + ')'">
      <path d="M445 315H722V348H445Z" fill="#ac8c5b" stroke="#553e2d" stroke-width="5" />
    </g>
    <path d="M393 459L772 448 786 480 407 495Z" fill="#e6d7b3" />
    <path
      d="M429 394H734V442H429Z"
      [attr.fill]="k.state().values['frame'] ? '#304c46' : '#815c38'"
      stroke="#a0aa91"
      stroke-width="7"
    />
    @for (i of typePieces; track i) {
      <g
        class="moved"
        [attr.transform]="
          'translate(' +
          (453 + i * 64) +
          ' ' +
          (k.state().values['frame'] ? 406 : 401 + (i % 2) * 12) +
          ')'
        "
        [attr.opacity]="value('mold') > i ? 1 : 0.15"
      >
        <rect
          width="43"
          height="27"
          rx="3"
          [attr.fill]="value('ink') >= 2 ? '#1b292a' : '#a9bbae'"
          stroke="#b8c0a3"
        />
        <path d="M9 6h22v16H9Z" fill="none" stroke="#d0c9a5" stroke-width="3" />
      </g>
    }
    @for (role of roles; track role; let i = $index) {
      <g
        kb
        [label]="'Fit selected mechanism to ' + role + ' socket'"
        [attr.transform]="'translate(' + socketX[i] + ' ' + socketY[i] + ')'"
        (activate)="k.act({ type: 'fit', target: role })"
      >
        <rect class="socket hit" width="98" height="96" rx="8" />
        @if (k.state().placements[role]; as item) {
          <use [attr.href]="'#k-' + item" x="10" y="8" width="77" height="77" />
        }
      </g>
      <g
        kb
        [label]="'Operate fitted ' + role"
        [attr.transform]="'translate(' + (socketX[i] + 49) + ' ' + (socketY[i] + 122) + ')'"
        (activate)="k.act({ type: 'operate', target: role })"
      >
        <ellipse class="hit button-face" rx="37" ry="22" />
        <text class="button-ink" y="8">↻</text>
      </g>
    }
    @for (part of k.config()!.parts; track part; let i = $index) {
      <g
        kb
        [label]="'Lift ' + part + ' mechanism'"
        [pressed]="k.state().selected === part"
        (activate)="k.act({ type: 'select', item: part })"
        [attr.transform]="'translate(42 ' + (62 + i * 135) + ')'"
      >
        <rect class="hit wood" width="130" height="115" rx="8" />
        <use [attr.href]="'#k-' + part" x="24" y="8" width="82" height="82" />
        <text x="65" y="103" class="small">{{ part }}</text>
      </g>
    }
    <g
      kb
      label="Test the assembled printing system"
      transform="translate(864 562)"
      (activate)="k.act({ type: 'test' })"
    >
      <circle class="hit button-face" r="48" />
      <text class="button-ink" y="9">Pull</text>
    </g>
    @if (k.state().trials.length) {
      <g transform="translate(550 543) rotate(-3)">
        <path d="M0 0h207v92H0Z" class="paper" />
        @for (i of typePieces; track i) {
          <path
            [attr.d]="'M' + (24 + i * 43) + ' 22v44h22V22Z'"
            fill="none"
            stroke="#294941"
            stroke-width="6"
            [attr.opacity]="
              fault() === 'none'
                ? 1
                : fault() === 'ink'
                  ? 0.2
                  : fault() === 'type' && i >= (printed()?.controls?.['mold'] ?? 0)
                    ? 0
                    : 0.55
            "
            [attr.transform]="fault() === 'loose' ? 'rotate(' + i * 3 + ' 100 40)' : null"
          />
        }
      </g>
    }
  </svg>`,
})
export class AssemblyComponent {
  readonly k = inject(KnowledgeRuntime);
  readonly roles = ASSEMBLY_ROLES;
  readonly socketX = [208, 208, 850, 490];
  readonly socketY = [341, 164, 231, 44];
  readonly thread = [0, 1, 2, 3, 4, 5, 6, 7];
  readonly typePieces = [0, 1, 2, 3];
  readonly printed = computed(() => {
    const trial = this.k.state().trials.at(-1);
    return trial
      ? (JSON.parse(trial.evidence) as { fault: string; controls: Record<string, number> })
      : undefined;
  });
  value(key: string): number {
    return this.k.state().values[key] ?? 0;
  }
  fault(): string {
    return this.printed()?.fault ?? assemblyFault(this.k.state());
  }
}
