import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { KnowledgeRuntime } from './knowledge.runtime';
import { KnowledgeRoomComponent, SceneButtonDirective } from './scene-tools';
import { ACCESS_TOOLS } from './people.activities';

@Component({
  selector: 'app-knowledge-access',
  imports: [KnowledgeRoomComponent, SceneButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './knowledge-scene.scss',
  template: ` <svg
    class="scene"
    viewBox="0 0 1000 660"
    role="group"
    aria-label="A shared workshop: make a printed plan usable for three people"
  >
    <g knowledge-room />
    <path d="M18 207H976V432H18Z" fill="#152f33" opacity=".7" />
    @for (reader of k.config()!.readers!; track reader.id; let i = $index) {
      <g
        kb
        [label]="'Offer the selected resource to ' + reader.name"
        (activate)="k.act({ type: 'offer', target: reader.id })"
        [attr.transform]="'translate(' + (55 + i * 312) + ' 165)'"
      >
        <ellipse cx="135" cy="299" rx="136" ry="22" fill="#183433" opacity=".35" />
        <use href="#k-person" x="94" y="-37" width="114" height="174" [attr.color]="colors[i]" />
        <path d="M3 173L220 159 270 217 32 232Z" fill="#bd9460" stroke="#4b4233" stroke-width="5" />
        <path d="M32 232v69m221-85v72M9 175v104" stroke="#684a32" stroke-width="15" />
        <g [class.operate]="using(reader.id)">
          @if (using(reader.id)) {
            <path
              d="M66 183L117 84 197 179ZM117 84V191M83 152H172"
              fill="none"
              stroke="#e4c286"
              stroke-width="9"
            />
            <circle cx="117" cy="144" r="9" fill="#51847b" />
            <path d="M169 48l15 14 27-32" fill="none" stroke="#a1e1bd" stroke-width="5" />
          } @else {
            <path d="M65 190l114-12m-107-8 122 22M91 202l87-41" stroke="#d6b37c" stroke-width="8" />
            @if (reader.barrier === 'cost') {
              <path
                d="M36 63q-22 29 4 42q37 9 38-20L65 64Z"
                fill="#73513f"
                stroke="#c5a175"
                stroke-width="3"
              />
              <path d="M36 64H65" stroke="#e9cc92" stroke-width="3" />
              <text x="55" y="92" class="small">0</text>
            } @else if (reader.barrier === 'language') {
              <path d="M12 30H98V89H47L36 107V89H12Z" fill="#e8d3a4" />
              <text x="54" y="68" fill="#405e51" font-size="31" text-anchor="middle">Ω ≠ A</text>
            } @else {
              <path
                d="M21 44q22-25 44 0q10 15-4 25l-9 17q-8 8-15-1"
                fill="none"
                stroke="#e6c98e"
                stroke-width="7"
              />
              <path d="M76 35q22 20 0 39" fill="none" stroke="#95b4a0" stroke-width="3" />
            }
          }
        </g>
        @if (k.state().values['copy-' + reader.id]) {
          <use
            href="#k-copy"
            x="12"
            y="127"
            width="74"
            height="90"
            [attr.opacity]="reader.barrier === 'cost' && !using(reader.id) ? 0.45 : 1"
          />
        }
        @if (k.state().placements[reader.id]; as helper) {
          <use [attr.href]="'#k-' + helper" x="185" y="82" width="84" height="87" />
        }
        <rect class="hit" x="-6" y="-51" width="284" height="355" fill="transparent" rx="12" />
      </g>
    }
    <path
      d="M61 523Q485 491 941 525L927 629H77Z"
      fill="#473c30"
      stroke="#c3a16c"
      stroke-width="5"
    />
    @for (tool of tools; track tool; let i = $index) {
      <g
        kb
        [label]="labels[tool]"
        [pressed]="k.state().selected === tool"
        (activate)="k.act({ type: 'select', item: tool })"
        [attr.transform]="'translate(' + (127 + i * 220) + ' 498)'"
      >
        <ellipse cx="45" cy="97" rx="65" ry="13" fill="#172d2e" opacity=".3" />
        <use [attr.href]="'#k-' + tool" width="100" height="105" />
        <text x="50" y="126" class="label">{{ short[tool] }}</text>
        <rect class="hit" x="-24" y="-8" width="151" height="143" rx="8" fill="transparent" />
      </g>
    }
  </svg>`,
})
export class AccessComponent {
  readonly k = inject(KnowledgeRuntime);
  readonly tools = ACCESS_TOOLS;
  readonly colors = ['#a58d60', '#628c8c', '#a66e52'];
  readonly short = {
    copy: 'Copy',
    loan: 'Lend',
    translation: 'Translate',
    reading: 'Read together',
  };
  readonly labels = {
    copy: 'Offer another printed copy',
    loan: 'Arrange a shared book loan',
    translation: 'Bring a translation',
    reading: 'Bring a reader to explain aloud',
  };
  using(id: string): boolean {
    return !!this.k.state().values['using-' + id];
  }
}
