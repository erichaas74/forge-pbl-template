import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  input,
  signal,
  viewChild,
} from '@angular/core';
import type { ExhibitCuratorRecord, HallLocationView } from '../domain/exhibit-types';
import { HallCorridorComponent } from './hall-corridor.component';
import { MuseumBoardComponent } from './museum-board.component';

@Component({
  selector: 'app-exhibit-collection-presentation',
  imports: [HallCorridorComponent, MuseumBoardComponent],
  template: `
    <section class="collection">
      <header>
        <div>
          <span>THE CLASS MUSEUM · {{ locations().length }} COMPLETED WINGS</span>
          <h2>Small objects. Big stories.</h2>
          <p>Step into a wing, inspect its objects, and read the curator’s explanation.</p>
        </div>
        <nav aria-label="Museum audience">
          <button
            type="button"
            [attr.aria-pressed]="!teacherView()"
            (click)="teacherView.set(false)"
          >
            Family view</button
          ><button
            type="button"
            [attr.aria-pressed]="teacherView()"
            (click)="teacherView.set(true)"
          >
            Teacher view
          </button>
        </nav>
      </header>
      <nav class="accessible-list" aria-label="Gallery list — choose a wing">
        @for (location of locations(); track location.locationId) {
          <button
            type="button"
            [attr.aria-pressed]="selected().locationId === location.locationId"
            (click)="open(location.hanging!.id)"
          >
            {{ location.position + 1 }} · {{ location.snapshot?.accessibleData?.title }}
          </button>
        }
      </nav>
      @if (!selectedId()) {
        <app-hall-corridor
          [locations]="locations()"
          [focusedHangingId]="selected().hanging?.id"
          (opened)="open($event)"
        />
      } @else {
        <button class="return-corridor" type="button" (click)="selectedId.set(undefined)">
          ← Return to all wings
        </button>
      }
      @if (selectedId()) {
        @if (selected(); as location) {
          <section class="walkup">
            <h2 #wingHeading tabindex="-1">{{ location.snapshot?.accessibleData?.title }}</h2>
            <app-museum-board [data]="location.snapshot?.visitorSafeData" mode="walkup" />
            @if (curator(); as record) {
              <article class="curator">
                <span>CURATOR TOUR · COMPLETED SAMPLE TRANSCRIPT</span>
                <h3>{{ location.team.displayName }} explains</h3>
                <p>{{ record.transcript }}</p>
              </article>
              @if (teacherView()) {
                <aside class="curator revision">
                  <span>BUILDER GUIDANCE EXAMPLE · CURATOR THINKING</span>
                  <dl>
                    <dt>First claim</dt>
                    <dd>{{ record.initialClaim }}</dd>
                    <dt>Feedback question</dt>
                    <dd>{{ record.feedback }}</dd>
                    <dt>Revision</dt>
                    <dd>{{ record.revision }}</dd>
                    <dt>Individual reflection</dt>
                    <dd>{{ record.reflection }}</dd>
                  </dl>
                </aside>
              }
            }
          </section>
        }
      }
    </section>
  `,
  styles: `
    :host {
      display: block;
      min-width: 0;
    }
    .collection {
      border-radius: 12px;
      overflow: hidden;
      background: #f5ecdd;
      border: 1px solid #b7a78c;
    }
    .collection > header {
      background: #203d3e;
      color: #f6ecda;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      gap: 24px;
      align-items: center;
    }
    .collection > header span,
    .curator > span {
      font-size: 0.64rem;
      letter-spacing: 0.14em;
      font-weight: 700;
    }
    h2 {
      font-family: Georgia, serif;
      font-weight: 500;
      font-size: 2rem;
      margin: 10px 0;
    }
    header p {
      font-size: 0.85rem;
      line-height: 1.6;
    }
    nav {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    button {
      font: inherit;
      font-size: 0.76rem;
      padding: 12px;
      border: 1px solid #b9ad97;
      background: #fff9ec;
      color: #354646;
      border-radius: 5px;
      cursor: pointer;
    }
    button[aria-pressed='true'] {
      background: #c39858;
      color: #1c302f;
      border-color: #c39858;
    }
    .accessible-list {
      padding: 10px 16px;
      background: #e8ddc8;
    }
    .accessible-list button {
      flex: 1;
      min-width: 180px;
    }
    .walkup {
      padding: 24px;
    }
    .walkup > h2 {
      font-size: 1.2rem;
      margin: 0 0 16px;
    }
    .curator {
      padding: 25px;
      background: #fff9ed;
      border: 1px solid #d7c8af;
      margin-top: 18px;
      border-radius: 6px;
    }
    .curator h3 {
      font:
        1.4rem Georgia,
        serif;
    }
    .curator p,
    dd {
      font-size: 0.9rem;
      line-height: 1.85;
      max-width: 1000px;
    }
    .revision {
      background: #e8eee4;
    }
    dt {
      font-weight: 700;
      font-size: 0.75rem;
    }
    dd {
      margin: 5px 0 18px;
    }
    button:focus-visible,
    [tabindex='-1']:focus {
      outline: 3px solid #9b671f;
      outline-offset: 3px;
    }
    @media (max-width: 700px) {
      .collection > header {
        display: block;
        padding: 23px;
      }
      .collection > header nav {
        margin-top: 18px;
      }
      .walkup {
        padding: 12px;
      }
      .curator {
        padding: 18px;
      }
      .accessible-list {
        padding: 12px;
      }
      .accessible-list button {
        min-width: 135px;
      }
      h2 {
        font-size: 1.7rem;
      }
    }
  `,
})
export class ExhibitCollectionPresentationComponent {
  readonly locations = input.required<readonly HallLocationView[]>();
  readonly curators = input.required<readonly ExhibitCuratorRecord[]>();
  readonly selectedId = signal<string | undefined>(undefined);
  readonly teacherView = signal(false);
  readonly selected = computed(
    () =>
      this.locations().find((item) => item.hanging?.id === this.selectedId()) ??
      this.locations()[0],
  );
  readonly curator = computed(() =>
    this.curators().find((item) => item.hangingId === this.selected().hanging?.id),
  );
  private readonly heading = viewChild<ElementRef<HTMLElement>>('wingHeading');
  private readonly injector = inject(Injector);
  open(id: string): void {
    this.selectedId.set(id);
    afterNextRender(
      () => {
        const element = this.heading()?.nativeElement;
        element?.scrollIntoView({ block: 'nearest' });
        element?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
}
