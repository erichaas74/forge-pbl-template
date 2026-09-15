import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { PressProof } from './invention.models';

@Component({
  selector: 'app-press-proof',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <svg viewBox="0 0 260 310" role="img" [attr.aria-label]="description()">
    <path d="M10 5 L251 9 247 303 6 307Z" fill="#f4e6c6" stroke="#b8a27c" stroke-width="1.5" />
    <path d="M17 13L243 17M18 293L236 289" stroke="#dbc9a1" />
    @if (proof(); as p) {
      <g fill="#b95b43" [attr.opacity]="hasImpression() ? 1 : 0">
        <path d="M30 34h200v2H30zM30 252h200v2H30z" />
        <path
          d="M30 46v-12h12M218 34h12v12M30 241v12h12M218 253h12v-12"
          fill="none"
          stroke="#b95b43"
          stroke-width="2"
        />
      </g>
      @for (letter of p.text; track $index; let i = $index) {
        <g
          [attr.opacity]="coverage(i)"
          fill="#28262a"
          [attr.stroke]="p.spread > 0.2 ? '#28262a' : 'none'"
          [attr.stroke-width]="p.spread * 2.8"
        >
          <text
            [attr.x]="36 + i * 39"
            y="111"
            font-family="Georgia,serif"
            font-size="41"
            font-weight="700"
          >
            {{ letter }}
          </text>
          @for (row of rows; track row) {
            <path
              [attr.d]="line(i, row)"
              stroke="#28262a"
              [attr.stroke-width]="2.8 + p.spread * 3"
              stroke-linecap="square"
            />
          }
        </g>
        @if (coverage(i) < 0.6) {
          <g fill="#f4e6c6">
            <rect [attr.x]="35 + i * 39" y="87" width="36" height="3" />
            <rect [attr.x]="42 + i * 39" y="100" width="23" height="4" />
            <rect [attr.x]="37 + i * 39" y="143" width="28" height="4" />
            <rect [attr.x]="47 + i * 39" y="182" width="20" height="3" />
          </g>
        }
      }
      <path
        d="M109 268l21-8 21 8-21 8zM130 256v24"
        [attr.opacity]="hasImpression() ? 1 : 0"
        fill="none"
        stroke="#a76042"
        stroke-width="1.5"
      />
      <text
        x="229"
        y="287"
        text-anchor="end"
        font-family="Georgia,serif"
        font-size="11"
        fill="#8b795e"
      >
        {{ p.id }}
      </text>
    } @else {
      <path d="M117 146h26m-13-13v26" stroke="#ccbc9f" stroke-width="1" />
    }
  </svg>`,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
  `,
})
export class PressProofComponent {
  readonly proof = input<PressProof>();
  readonly rows = [0, 1, 2, 3, 4, 5, 6];
  hasImpression(): boolean {
    return this.proof()?.coverage.some((c) => c > 0) ?? false;
  }
  description(): string {
    const p = this.proof();
    return !p
      ? 'Unprinted sheet'
      : !this.hasImpression()
        ? `Proof ${p.id}, blank sheet`
        : `Proof ${p.id}, reads ${p.text}, ${p.usable ? 'even impression' : 'uneven or incorrect impression'}`;
  }
  coverage(i: number): number {
    return this.proof()?.coverage[Math.min(2, Math.floor((i * 3) / 5))] ?? 1;
  }
  line(i: number, row: number): string {
    const x = 38 + i * 39,
      y = 137 + row * 13;
    return `M${x} ${y}h${row % 2 ? 11 : 8}m3 0h${row % 3 ? 7 : 9}m3 0h${row % 2 ? 6 : 8}`;
  }
}
