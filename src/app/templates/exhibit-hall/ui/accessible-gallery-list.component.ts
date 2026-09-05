import { Component, input, output } from '@angular/core';

import type { HallLocationView } from '../domain/exhibit-types';

@Component({
  selector: 'app-accessible-gallery-list',
  template: `
    <ol class="gallery-list" aria-label="Class exhibits in corridor order">
      @for (location of locations(); track location.locationId) {
        <li [class.focused]="location.hanging?.id === focusedHangingId()">
          <span class="number">{{ location.position + 1 }}</span>
          <div>
            @if (location.snapshot && location.hanging) {
              <small>{{ location.team.displayName }}</small>
              <h2>{{ location.snapshot.accessibleData.title }}</h2>
              <p>{{ location.snapshot.accessibleData.summary }}</p>
              <span>
                {{ location.snapshot.accessibleData.sections.length }} reading sections · Snapshot
                v{{ location.snapshot.version }}
              </span>
              @if (location.snapshot.corridorPreview?.walkUpAvailable !== false) {
                <button type="button" (click)="opened.emit(location.hanging.id)">
                  Read this exhibit
                </button>
              } @else {
                <strong class="coming-soon">Walk-up coming soon</strong>
              }
            } @else {
              <small>{{ location.team.displayName }}</small>
              <h2>{{ emptyLabel() }}</h2>
              <p>This team has not published an exhibit yet.</p>
            }
          </div>
          @if (location.hanging?.id === focusedHangingId()) {
            <strong class="focus">Class focus</strong>
          }
        </li>
      }
    </ol>
  `,
  styles: `
    :host {
      display: block;
    }
    .gallery-list {
      display: grid;
      gap: 0.65rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    li {
      position: relative;
      display: grid;
      grid-template-columns: 2.8rem 1fr auto;
      gap: 0.85rem;
      align-items: start;
      border: 1px solid #c8bda9;
      border-left: 0.3rem solid #8a6a3c;
      border-radius: 0.5rem;
      padding: 1rem;
      background: #fffdf6;
      box-shadow: 0 0.25rem 0.8rem #261a1014;
    }
    li.focused {
      border-color: #b37c23;
      box-shadow: 0 0 0 0.16rem #e0bd74;
    }
    .number {
      display: grid;
      width: 2.4rem;
      aspect-ratio: 1;
      place-items: center;
      border-radius: 50%;
      color: #fff7e6;
      background: #30271f;
      font:
        800 0.85rem Georgia,
        serif;
    }
    small,
    div > span {
      color: #766857;
      font-size: 0.68rem;
      font-weight: 750;
    }
    h2 {
      margin: 0.15rem 0 0.35rem;
      font:
        800 1.25rem Georgia,
        serif;
    }
    p {
      max-width: 56rem;
      margin: 0 0 0.55rem;
      color: #514a42;
      line-height: 1.45;
    }
    button {
      display: block;
      min-height: 2.5rem;
      margin-top: 0.7rem;
      border: 0;
      border-radius: 0.3rem;
      padding: 0.5rem 0.75rem;
      color: white;
      background: #245c65;
      font-weight: 800;
    }
    .coming-soon {
      display: block;
      width: fit-content;
      margin-top: 0.7rem;
      border: 1px solid #bcae97;
      border-radius: 999px;
      padding: 0.5rem 0.75rem;
      color: #675b4a;
      background: #eee7da;
      font-size: 0.72rem;
    }
    .focus {
      align-self: start;
      border-radius: 999px;
      padding: 0.3rem 0.55rem;
      color: #593c0e;
      background: #f2d897;
      font-size: 0.63rem;
      white-space: nowrap;
    }
    button:focus-visible {
      outline: 3px solid #51aeb9;
      outline-offset: 3px;
    }
    @media (max-width: 600px) {
      li {
        grid-template-columns: 2.4rem 1fr;
      }
      .focus {
        grid-column: 2;
        grid-row: 2;
        justify-self: start;
      }
    }
  `,
})
export class AccessibleGalleryListComponent {
  readonly locations = input.required<readonly HallLocationView[]>();
  readonly focusedHangingId = input<string | undefined>(undefined);
  readonly emptyLabel = input('Empty location');
  readonly opened = output<string>();
}
