import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { KnowledgeRuntime } from './knowledge.runtime';
import { gearPath, KnowledgeRoomComponent, SceneButtonDirective } from './scene-tools';

@Component({
  selector: 'app-knowledge-diagram',
  imports: [KnowledgeRoomComponent, SceneButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './knowledge-scene.scss',
  template: ` <svg
    class="scene"
    viewBox="0 0 1000 660"
    preserveAspectRatio="xMidYMid meet"
    role="group"
    aria-label="Build and test two printed gear diagrams"
  >
    <g knowledge-room />
    <path d="M260 218L779 218 805 490 247 490Z" fill="#604936" stroke="#c09c64" stroke-width="6" />
    <path d="M282 246H755V451H282Z" fill="#223e3e" stroke="#8e9b7c" stroke-width="2" />
    @for (blueprint of [0, 1]; track blueprint) {
      <g
        kb
        [label]="'Build printed diagram ' + (blueprint === 0 ? 'A' : 'B')"
        [pressed]="k.state().values['blueprint'] === blueprint"
        (activate)="k.act({ type: 'blueprint', value: blueprint })"
        [attr.transform]="
          'translate(' +
          (50 + blueprint * 165) +
          ' ' +
          (blueprint ? 67 : 92) +
          ') rotate(' +
          (blueprint ? 4 : -6) +
          ')'
        "
      >
        <rect class="paper hit" width="144" height="124" />
        <g fill="none" stroke="#345b50" stroke-width="2">
          <circle cx="32" cy="60" r="22" />
          <circle [attr.cx]="blueprint ? 71 : 85" cy="60" r="16" />
          <circle cx="110" cy="60" r="22" />
        </g>
        <text x="72" y="107" fill="#8c4d3e" text-anchor="middle" font-size="22">
          {{ blueprint === 0 ? 'A' : 'B' }}
        </text>
      </g>
    }
    @for (slot of slots; track slot) {
      <g
        kb
        [label]="'Fit the lifted wheel onto axle ' + (slot + 1)"
        (activate)="k.act({ type: 'fit', target: '' + slot })"
        [attr.transform]="'translate(' + axle(slot) + ' 346)'"
      >
        <circle r="24" fill="transparent" class="hit" />
        <circle r="13" fill="#cfb784" stroke="#5f725e" stroke-width="4" />
        @if (k.state().placements['' + slot]; as item) {
          <g
            style="pointer-events:none"
            [class.running]="!!k.state().values['running']"
            [class.reverse]="slot === 1"
            [style.animation-duration]="(slot === 1 ? 2.25 : 3) + 's'"
            [attr.transform]="
              slot === 0 ? 'rotate(' + k.state().values['rotation'] * 45 + ')' : null
            "
          >
            <path
              [attr.d]="gear(+item)"
              [attr.fill]="+item === 1 ? '#a3b0a0' : '#bd975c'"
              stroke="#465b4b"
              stroke-width="4"
            />
            <circle r="19" fill="#304846" stroke="#ded0a1" stroke-width="5" />
            <path d="M0-25V-45M25 0H45M0 25V45M-25 0H-45" stroke="#6f6f4e" stroke-width="8" />
          </g>
        }
      </g>
    }
    @for (direction of [-1, 1]; track direction) {
      <g
        kb
        [label]="direction < 0 ? 'Move middle axle left' : 'Move middle axle right'"
        (activate)="k.act({ type: 'shift', value: direction })"
        [attr.transform]="'translate(' + (472 + direction * 54) + ' 471)'"
      >
        <rect class="button-face hit" x="-39" y="-21" width="78" height="44" rx="9" />
        <text class="button-ink" y="9">{{ direction < 0 ? '←' : '→' }}</text>
      </g>
    }
    <path d="M292 346H243V410H220" fill="none" stroke="#ae9567" stroke-width="13" />
    <g
      kb
      label="Turn the crank and test transmission"
      (activate)="k.act({ type: 'crank' })"
      transform="translate(216 412)"
    >
      <circle class="button-face hit" r="43" />
      <text class="button-ink" y="10">↻</text>
    </g>
    <g [class.operate]="!!k.state().values['running']">
      <path d="M665 346H747V427" fill="none" stroke="#c6b581" stroke-width="12" />
      <path d="M713 424h70l-9 45h-52Z" fill="#859f89" stroke="#e0c18b" stroke-width="4" />
    </g>
    @for (part of slots; track part) {
      <g
        kb
        [label]="'Lift wheel ' + (part + 1)"
        [pressed]="k.state().selected === '' + part"
        (activate)="k.act({ type: 'select', item: '' + part })"
        [attr.transform]="'translate(' + (280 + part * 160) + ' 582)'"
      >
        <rect class="hit" x="-76" y="-72" width="152" height="144" rx="12" fill="transparent" />
        <path [attr.d]="gear(part)" fill="#a38b59" stroke="#4d5e4d" stroke-width="4" />
        <circle r="18" fill="#344f48" />
        <text y="7" text-anchor="middle" fill="#f1d8a5" font-size="22">{{ part + 1 }}</text>
      </g>
    }
    <g
      kb
      label="Stamp a revised diagram of the tested arrangement"
      (activate)="k.act({ type: 'print' })"
      transform="translate(856 527)"
    >
      <use href="#k-ink" x="-43" y="-43" width="86" height="86" />
      <rect class="hit" x="-51" y="-51" width="102" height="102" rx="20" fill="transparent" />
    </g>
    @if (k.state().values['revision']) {
      <g transform="translate(790 91) rotate(5)">
        <rect width="152" height="148" class="paper" />
        <g fill="none" stroke="#3d5e52" stroke-width="3">
          <circle cx="29" cy="72" r="22" />
          <circle [attr.cx]="67 + (k.state().values['printed'] - 472) * 0.35" cy="72" r="17" />
          <circle cx="107" cy="72" r="22" />
        </g>
        <text x="76" y="127" text-anchor="middle" fill="#985f46" font-size="19">
          {{ k.state().values['revision'] }} · ↻
        </text>
      </g>
    }
  </svg>`,
})
export class DiagramComponent {
  readonly k = inject(KnowledgeRuntime);
  readonly slots = [0, 1, 2];
  axle(i: number): number {
    return i === 1 ? this.k.state().values['middle'] : this.k.config()!.axles![i];
  }
  gear(i: number): string {
    return gearPath(
      this.k.config()!.gearRadii![i],
      Math.round(this.k.config()!.gearRadii![i] / 3.2),
    );
  }
}
