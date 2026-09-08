import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { CommandType } from '../domain/automation.models';

// Decorative diagrams always accompany a written command name and description.
const diagrams: Record<CommandType, { detail: string; accent: string; arrow: string }> = {
  'move-distance': {
    detail: 'M12 44h40v10H12z M20 44v5 M28 44v7 M36 44v5 M44 44v7',
    accent: 'M14 24h21v13H14z M18 20v4 M30 20v4 M18 37v3 M30 37v3',
    arrow: 'M38 30h15 M47 24l6 6-6 6',
  },
  'move-rotations': {
    detail: 'M46 34a14 14 0 1 1-28 0 14 14 0 0 1 28 0 M32 20v28 M18 34h28',
    accent: 'M37 34a5 5 0 1 1-10 0 5 5 0 0 1 10 0',
    arrow: 'M12 24a22 22 0 0 1 40-2 M43 21l9 1 1-9',
  },
  'turn-degrees': {
    detail: 'M16 15v35h35 M16 39h11v11',
    accent: 'M12 43h8v10h-8z',
    arrow: 'M25 20c16 0 23 8 23 20 M42 34l6 6 6-6',
  },
  'turn-fraction': {
    detail: 'M32 12a20 20 0 1 0 20 20 M32 32H12 M32 32v20',
    accent: 'M32 32V12a20 20 0 0 1 20 20z',
    arrow: 'M40 8a25 25 0 0 1 17 17 M50 20l7 5 3-8',
  },
  wait: {
    detail: 'M52 34a20 20 0 1 1-40 0 20 20 0 0 1 40 0 M27 8h10 M32 8v6',
    accent: 'M23 27h5v15h-5z M36 27h5v15h-5z',
    arrow: 'M46 13l5 5',
  },
  'pick-up': {
    detail: 'M12 36l14-7 14 7v17l-14 7-14-7z M12 36l14 7 14-7 M26 43v17',
    accent: 'M19 33l14 7v7l-7-4v-7z',
    arrow: 'M49 38V10 M42 17l7-7 7 7',
  },
  'drop-off': {
    detail: 'M10 25l14-7 14 7v17l-14 7-14-7z M10 25l14 7 14-7 M24 32v17 M9 55h47',
    accent: 'M17 21l14 7v7l-7-4v-7z',
    arrow: 'M49 12v31 M42 36l7 7 7-7',
  },
  repeat: {
    detail: 'M21 26h22v13H21z M27 32h10',
    accent: 'M24 43h16v6H24z',
    arrow: 'M13 34V23a9 9 0 0 1 9-9h27 M43 8l6 6-6 6 M51 30v13a9 9 0 0 1-9 9H15 M21 46l-6 6 6 6',
  },
};

@Component({
  selector: 'app-command-graphic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <g [attr.transform]="direction() === 'left' ? 'translate(64 0) scale(-1 1)' : null">
        <path [attr.d]="diagrams[type()].detail" />
        <path [attr.d]="diagrams[type()].accent" fill="currentColor" fill-opacity="0.2" />
        <path [attr.d]="diagrams[type()].arrow" stroke-width="3.5" />
      </g>
    </svg>
  `,
  styles: `
    :host {
      display: block;
      flex: 0 0 auto;
      width: 64px;
      height: 64px;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class CommandGraphicComponent {
  readonly type = input.required<CommandType>();
  readonly direction = input<'left' | 'right'>('right');
  readonly diagrams = diagrams;
}
