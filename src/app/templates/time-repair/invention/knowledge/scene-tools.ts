import { ChangeDetectionStrategy, Component, Directive, input, output } from '@angular/core';

@Directive({
  selector: '[kb]',
  host: {
    role: 'button',
    tabindex: '0',
    '[attr.aria-label]': 'label()',
    '[attr.aria-pressed]': 'pressed()',
    '(click)': 'activate.emit()',
    '(keydown)': 'key($event)',
  },
})
export class SceneButtonDirective {
  readonly label = input.required<string>();
  readonly pressed = input<boolean | null>(null);
  readonly activate = output<void>();
  key(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.activate.emit();
    }
  }
}

@Component({
  selector: 'g[knowledge-room]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg:defs aria-hidden="true">
      <svg:linearGradient id="k-wall" x2="0" y2="1">
        <svg:stop stop-color="#294a49" />
        <svg:stop offset="1" stop-color="#112d34" />
      </svg:linearGradient>
      <svg:linearGradient id="k-wood" x2="0" y2="1">
        <svg:stop stop-color="#b18053" />
        <svg:stop offset="1" stop-color="#634732" />
      </svg:linearGradient>
      <svg:radialGradient id="k-light">
        <svg:stop stop-color="#efdfaa" stop-opacity=".2" />
        <svg:stop offset="1" stop-color="#f2e0b0" stop-opacity="0" />
      </svg:radialGradient>
      <svg:pattern id="k-grain" width="80" height="28" patternUnits="userSpaceOnUse">
        <svg:path
          d="M0 6Q40 12 80 4M0 25Q20 15 80 21"
          fill="none"
          stroke="#e8c995"
          stroke-opacity=".1"
        />
      </svg:pattern>
      <svg:symbol id="k-frame" viewBox="0 0 100 100">
        <svg:path d="M12 16H88V84H12Z" fill="#775033" stroke="#cfb37e" stroke-width="7" />
        <svg:path d="M27 31H73V69H27Z" fill="#253f41" />
        <svg:path d="M34 44v16m16-21v21m16-16v16" stroke="#a6b7a6" stroke-width="9" />
      </svg:symbol>
      <svg:symbol id="k-mold" viewBox="0 0 100 100">
        <svg:path d="M8 27L53 12 90 34 46 50Z" fill="#a3b5ae" stroke="#344e50" stroke-width="4" />
        <svg:path
          d="M8 27V73L46 92V50M46 92L90 75V34"
          fill="#607d7b"
          stroke="#344e50"
          stroke-width="4"
        />
        <svg:path d="M31 33l23-8 18 11-25 8Z" fill="#243c41" />
        <svg:path d="M53 17v19" stroke="#dfc999" stroke-width="5" />
      </svg:symbol>
      <svg:symbol id="k-ink" viewBox="0 0 100 100">
        <svg:path d="M47 15v40" stroke="#b88550" stroke-width="12" />
        <svg:ellipse
          cx="48"
          cy="62"
          rx="37"
          ry="24"
          fill="#20282a"
          stroke="#c9a772"
          stroke-width="7"
        />
        <svg:ellipse cx="48" cy="56" rx="26" ry="12" fill="#464d42" />
      </svg:symbol>
      <svg:symbol id="k-screw" viewBox="0 0 100 100">
        <svg:path d="M44 15h14v65H44Z" fill="#b2874c" />
        <svg:path
          d="M40 24l22-8m-22 22 22-8m-22 22 22-8m-22 22 22-8m-22 22 22-8"
          stroke="#68492d"
          stroke-width="5"
        />
        <svg:path d="M15 14h70M24 84h54" stroke="#d2b57a" stroke-width="12" />
      </svg:symbol>
      <svg:symbol id="k-book" viewBox="0 0 100 100">
        <svg:path
          d="M12 18Q38 9 50 22Q68 9 88 18V82Q66 73 50 87Q34 74 12 82Z"
          fill="#ead9af"
          stroke="#926d45"
          stroke-width="4"
        />
        <svg:path
          d="M50 23V86M22 33h17m-17 12h17m-17 12h17m22-24h16m-16 12h16m-16 12h16"
          stroke="#667963"
          stroke-width="3"
        />
      </svg:symbol>
      <svg:symbol id="k-copy" viewBox="0 0 100 100">
        <svg:path d="M22 9L83 16 77 91 16 86Z" fill="#f1dfb8" stroke="#9b784e" stroke-width="3" />
        <svg:path
          d="M31 28h35m-35 10h35m-35 10h25M30 69l15-15 17 16Z"
          fill="none"
          stroke="#405b53"
          stroke-width="4"
        />
      </svg:symbol>
      <svg:symbol id="k-translation" viewBox="0 0 100 100">
        <svg:use href="#k-book" width="100" height="100" />
        <svg:text x="25" y="64" font-size="33" fill="#8c463d">A</svg:text>
        <svg:text x="59" y="64" font-size="33" fill="#376d69">Ω</svg:text>
      </svg:symbol>
      <svg:symbol id="k-reading" viewBox="0 0 100 100">
        <svg:circle cx="35" cy="27" r="17" fill="#d2a779" />
        <svg:path d="M12 87V58Q34 35 58 58V87" fill="#758a76" />
        <svg:path
          d="M59 22q16 10 0 22m9-29q28 17 0 37"
          fill="none"
          stroke="#e4cc98"
          stroke-width="5"
        />
      </svg:symbol>
      <svg:symbol id="k-loan" viewBox="0 0 100 100">
        <svg:use href="#k-book" width="100" height="100" />
        <svg:path d="M14 91h64l-13-11m13 11-13 8" fill="none" stroke="#69b0a0" stroke-width="7" />
      </svg:symbol>
      <svg:symbol id="k-packing" viewBox="0 0 100 100">
        <svg:path
          d="M10 62l54-12 29 19-52 19Zm0-18 54-12 29 19-52 19Zm0-18L64 14l29 19-52 19Z"
          fill="#d6c28d"
          stroke="#8d764d"
          stroke-width="3"
        />
      </svg:symbol>
      <svg:symbol id="k-type" viewBox="0 0 100 100">
        <svg:path d="M18 14h65v65L66 93 18 79Z" fill="#97aaa2" stroke="#3f5e5c" stroke-width="4" />
        <svg:text x="40" y="67" font-size="53" fill="#273d3e">R</svg:text>
      </svg:symbol>
      <svg:symbol id="k-person" viewBox="0 0 100 150">
        <svg:ellipse cx="50" cy="143" rx="36" ry="6" fill="#142b30" opacity=".3" />
        <svg:path d="M29 91v48m41-48v48" stroke="#493f35" stroke-width="15" />
        <svg:path d="M17 63Q50 39 82 63L78 112H21Z" fill="currentColor" />
        <svg:circle cx="50" cy="31" r="22" fill="#cca078" />
        <svg:path d="M27 31Q20 0 53 6Q79 6 75 25L53 19Z" fill="#554d3c" />
      </svg:symbol>
    </svg:defs>
    <svg:rect width="1000" height="660" fill="url(#k-wall)" />
    <svg:path d="M0 0H1000V30H0ZM0 56H1000M46 0V410M936 0V410" stroke="#1a302f" stroke-width="25" />
    <svg:path d="M74 100Q150 9 226 100V312H74Z" fill="#7eaaa3" stroke="#a58a60" stroke-width="12" />
    <svg:path
      d="M151 50V312M74 176H226M87 99L213 246M209 92L89 248"
      stroke="#425f57"
      stroke-width="6"
    />
    <svg:path d="M74 312L470 515 800 470 226 312" fill="#d9d9ac" opacity=".09" />
    <svg:path d="M720 77h192v16H720Zm0 109h192v14H720Z" fill="#795d40" />
    @for (book of books; track book) {
      <svg:rect
        [attr.x]="737 + book * 25"
        y="35"
        width="19"
        height="42"
        rx="2"
        [attr.fill]="book % 2 ? '#aa8060' : '#7e947d'"
      />
      <svg:path [attr.d]="'M' + (742 + book * 25) + ' 43v26'" stroke="#d1b98c" />
    }
    <svg:rect y="410" width="1000" height="250" fill="url(#k-wood)" />
    <svg:rect y="410" width="1000" height="250" fill="url(#k-grain)" />
    <svg:path d="M0 410H1000M0 615H1000" stroke="#dbb980" stroke-width="8" opacity=".5" />
    <svg:ellipse cx="350" cy="280" rx="460" ry="410" fill="url(#k-light)" />
  `,
})
export class KnowledgeRoomComponent {
  readonly books = [0, 1, 2, 3, 4, 5];
}

@Component({
  selector: 'g[knowledge-drawing]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg:rect
      x="4"
      y="4"
      width="292"
      height="192"
      rx="3"
      fill="#f0ddb2"
      stroke="#aa8657"
      stroke-width="2"
    />
    <svg:circle cx="150" cy="100" r="77" fill="none" stroke="#425e57" stroke-width="3" />
    <svg:circle cx="150" cy="100" r="56" fill="none" stroke="#ac7049" stroke-width="2" />
    <svg:path
      d="M150 10V190M16 100H284M55 22L245 178M55 178L245 22M150 18L169 78 237 100 168 122 150 181 131 122 64 100 131 78Z"
      fill="none"
      stroke="#44685d"
      stroke-width="2.5"
    />
    <svg:path
      d="M150 42L160 89 190 100 160 110 150 157 140 110 110 100 140 89Z"
      fill="#b56e4d"
      opacity=".7"
    />
    <svg:circle cx="150" cy="100" r="8" fill="#294f4b" />
    @for (i of marks; track i) {
      <svg:path
        d="M150 20v7"
        [attr.transform]="'rotate(' + i * 15 + ' 150 100)'"
        stroke="#3a6056"
        stroke-width="2"
      />
    }
    <svg:path
      d="M17 22h22v22H17Zm244 133h23v43h-23ZM17 154l25 25-25 7ZM266 18l14 12-14 12-14-12Z"
      fill="none"
      stroke="#a26645"
      stroke-width="3"
    />
  `,
})
export class KnowledgeDrawingComponent {
  readonly marks = Array.from({ length: 24 }, (_, i) => i);
}

export function gearPath(radius: number, teeth = 20): string {
  const points = Array.from({ length: teeth * 4 }, (_, i) => {
    const r = radius + ([1, 2].includes(i % 4) ? 5 : -5);
    const a = (i * Math.PI * 2) / (teeth * 4);
    return `${Math.cos(a) * r},${Math.sin(a) * r}`;
  });
  return `M${points.join('L')}Z`;
}
