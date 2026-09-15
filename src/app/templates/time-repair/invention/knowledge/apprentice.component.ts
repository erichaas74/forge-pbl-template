import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { KnowledgeRuntime } from './knowledge.runtime';
import { KnowledgeRoomComponent, SceneButtonDirective } from './scene-tools';

@Component({
  selector: 'g[teaching-object]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (item().startsWith('before') || item().startsWith('after')) {
      <svg:path d="M7 3L93 8 89 91 4 86Z" fill="#ead9ad" stroke="#a38050" stroke-width="2" />
      <svg:g [attr.opacity]="item() === 'before-ink' ? 0.24 : 1">
        <svg:text x="12" y="37" fill="#344f48" font-size="21" font-family="Georgia">
          {{ item() === 'before-type' ? 'LIBRE' : 'LIBER' }}
        </svg:text>
        @for (line of lines; track line) {
          <svg:path
            [attr.d]="
              'M17 ' + (48 + line * 8) + 'h' + (item() === 'before-packing' && line % 2 ? 30 : 57)
            "
            stroke="#405a4d"
            stroke-width="3"
          />
        }
      </svg:g>
    } @else {
      @if (part() === 'ink') {
        <svg:use href="#k-ink" width="100" height="100" />
        @if (item().startsWith('fault')) {
          <svg:ellipse cx="48" cy="64" rx="27" ry="10" fill="#aababa" opacity=".8" />
          <svg:circle cx="25" cy="88" r="5" fill="#688c91" />
          <svg:circle cx="67" cy="92" r="7" fill="#688c91" />
        } @else {
          <svg:ellipse cx="48" cy="63" rx="27" ry="12" fill="#142e30" />
          <svg:path d="M28 55Q48 47 65 56" stroke="#81928a" fill="none" stroke-width="3" />
        }
      } @else if (part() === 'packing') {
        @if (item().startsWith('fault')) {
          <svg:path
            d="M10 59L64 44 92 65 39 82Z"
            fill="#dfc594"
            stroke="#8d764d"
            stroke-width="3"
          />
          <svg:path d="M10 59L35 39 64 44" fill="#b29970" />
        } @else {
          <svg:use href="#k-packing" width="100" height="100" />
        }
      } @else {
        <svg:path d="M3 20H97V77H3Z" fill="#4b645b" stroke="#ccb789" stroke-width="3" />
        @for (letter of (item().startsWith('fault') ? 'ERBIL' : 'REBIL').split(''); track $index) {
          <svg:rect [attr.x]="7 + $index * 17" y="29" width="15" height="37" fill="#a7b7aa" />
          <svg:text
            [attr.x]="14 + $index * 17"
            y="55"
            font-size="16"
            text-anchor="middle"
            fill="#2b4945"
            [attr.transform]="'translate(' + (28 + $index * 34) + ' 0) scale(-1 1)'"
          >
            {{ letter }}
          </svg:text>
        }
      }
    }
  `,
})
export class TeachingObjectComponent {
  readonly item = input.required<string>();
  readonly lines = [0, 1, 2, 3];
  readonly part = computed(() => this.item().split('-')[1]);
}

@Component({
  selector: 'app-knowledge-apprentice',
  imports: [KnowledgeRoomComponent, SceneButtonDirective, TeachingObjectComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './knowledge-scene.scss',
  template: ` <svg
    class="scene"
    viewBox="0 0 1000 660"
    role="group"
    aria-label="Teach the apprentice a repair using physical examples"
  >
    <g knowledge-room />
    <path d="M36 390V129Q87 62 139 129V390Z" fill="#10282d" stroke="#a68a5d" stroke-width="8" />
    <g
      kb
      label="Invite the expert in or send the expert away"
      (activate)="k.act({ type: 'expert' })"
    >
      <use
        href="#k-person"
        [attr.x]="k.state().values['expert'] ? 39 : 5"
        y="210"
        width="103"
        height="168"
        color="#8b8870"
        [attr.opacity]="k.state().values['expert'] ? 1 : 0.15"
      />
      <path d="M101 185h34l-9-10m9 10-9 10" stroke="#dfc587" stroke-width="4" fill="none" />
      <rect class="hit" x="17" y="163" width="139" height="227" fill="transparent" rx="8" />
    </g>
    <g transform="translate(523 38)">
      <path
        d="M15 297V73H298V297M15 78H298M150 28v199"
        fill="none"
        stroke="#b58b55"
        stroke-width="22"
      />
      @for (n of screws; track n) {
        <path [attr.d]="'M133 ' + (43 + n * 15) + 'l35-10'" stroke="#674b31" stroke-width="5" />
      }
      <path d="M79 235H233M83 259H228" stroke="#e2c496" stroke-width="18" />
      <path d="M159 139L289 111" stroke="#ae8b52" stroke-width="15" />
      <g
        kb
        label="Let the apprentice operate the press independently"
        (activate)="k.act({ type: 'run' })"
      >
        <circle class="hit button-face" cx="291" cy="111" r="37" />
        <text class="button-ink" x="291" y="119">↘</text>
      </g>
      <use href="#k-person" x="292" y="124" width="115" height="174" color="#739d90" />
      @if (k.state().values['running']) {
        <g
          [attr.transform]="'translate(180 290) scale(.95)'"
          teaching-object
          [item]="(k.state().values['running'] === 1 ? 'after-' : 'before-') + fault()"
        />
      }
    </g>
    <g transform="translate(182 66)">
      @for (fault of k.config()!.cases!; track fault; let i = $index) {
        <g
          kb
          [label]="'Investigate the ' + fault + ' failure'"
          [pressed]="k.state().values['case'] === i"
          (activate)="k.act({ type: 'case', value: i })"
          [attr.transform]="'translate(' + i * 107 + ' 0)'"
        >
          <g teaching-object [item]="'before-' + fault" />
          <rect class="hit" x="-2" y="-3" width="98" height="103" fill="transparent" />
        </g>
      }
    </g>
    <path d="M170 203H476V369H170Z" fill="#102b2d" stroke="#9a7b52" stroke-width="5" />
    @for (stage of stages; track stage; let i = $index) {
      <g
        kb
        [label]="'Teaching position ' + (i + 1) + '. Place selected example.'"
        (activate)="k.act({ type: 'place', target: '' + i })"
        [attr.transform]="
          'translate(' + (178 + (i % 2) * 152) + ' ' + (209 + Math.floor(i / 2) * 79) + ')'
        "
      >
        <rect class="socket hit" width="138" height="70" rx="4" />
        @if (k.state().placements['' + i]; as item) {
          <g teaching-object [item]="item" transform="translate(37 0) scale(.7)" />
        }
        <text x="14" y="22" class="small">{{ i + 1 }}</text>
      </g>
    }
    <g
      kb
      label="Demonstrate the four examples to the apprentice"
      (activate)="k.act({ type: 'teach' })"
      transform="translate(481 364)"
    >
      <circle class="hit button-face" r="34" />
      <path d="M-10-18L16 0-10 18Z" fill="#375c50" />
    </g>
    @if (k.state().values['demonstration']) {
      <path
        d="M475 286Q601 340 866 256"
        fill="none"
        stroke="#9fdfb9"
        stroke-width="5"
        stroke-dasharray="8 8"
      />
    }
    @for (case of k.config()!.cases!; track case; let row = $index) {
      @for (stage of trayOrder; track stage; let col = $index) {
        @if (stage !== 'after' || row === 0) {
          <g
            kb
            [label]="objectLabel(stage, case)"
            [pressed]="k.state().selected === stage + '-' + case"
            (activate)="k.act({ type: 'select', item: stage + '-' + case })"
            [attr.transform]="
              'translate(' + (58 + col * 230 + row * 8) + ' ' + (425 + row * 70) + ')'
            "
          >
            <g teaching-object [item]="stage + '-' + case" transform="scale(.76)" />
            <rect class="hit" x="-4" y="-3" width="115" height="72" fill="transparent" rx="5" />
          </g>
        }
      }
    }
  </svg>`,
})
export class ApprenticeComponent {
  readonly k = inject(KnowledgeRuntime);
  readonly Math = Math;
  readonly screws = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  readonly stages = ['before', 'fault', 'repair', 'after'];
  readonly trayOrder = ['repair', 'before', 'after', 'fault'];
  readonly fault = computed(() => this.k.config()!.cases![this.k.state().values['case']]);
  objectLabel(stage: string, fault: string): string {
    return stage === 'after'
      ? 'Clean impression'
      : ({ before: 'Failed impression', fault: 'Faulty part', repair: 'Repaired part' }[stage] ??
          stage) +
          ' for ' +
          fault;
  }
}
