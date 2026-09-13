import {
  afterNextRender,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  signal,
  viewChild,
} from '@angular/core';
import type { MuseumBoardSnapshotData } from '../domain/exhibit-types';
import { museumRoomLayout } from './museum-room';
import { MuseumSceneComponent } from './museum-scene.component';
import type { MuseumSceneContent } from './museum-scene-contracts';

@Component({
  selector: 'app-museum-room-presentation',
  imports: [MuseumSceneComponent],
  template: `
    <section class="room-presentation">
      <header>
        <span>{{ label() }} · CURATED BY {{ board().teamCredit.displayName }}</span>
        <h2>{{ board().title }}</h2>
        <p>{{ board().centralClaim }}</p>
      </header>
      <div class="room-grid" [class.inspecting]="selectedObject()">
        <div class="room-stage">
          <app-museum-scene
            [content]="sceneContent()"
            [activeDisplay]="selectedSlot()"
            (selected)="select($event)"
          />
          <nav aria-label="Explore the room">
            <button type="button" [attr.aria-pressed]="!selectedSlot()" (click)="select()">
              Room overview
            </button>
            @for (slot of slots(); track slot.id) {
              @if (objectFor(slot.id); as object) {
                <button
                  type="button"
                  [attr.aria-pressed]="selectedSlot() === slot.id"
                  (click)="select(slot.id)"
                >
                  {{ slot.label }} · {{ object.title }}
                </button>
              }
            }
          </nav>
        </div>
        @if (selectedObject(); as object) {
          <aside class="artifact-label">
            <span>LOOK CLOSER</span>
            <h3 #labelHeading tabindex="-1">{{ object.title }}</h3>
            <p>{{ object.description }}</p>
            <h4>Why it matters</h4>
            <p>{{ object.evidenceConnection }}</p>
            @for (source of board().sources; track source.id) {
              @if (object.sourceIds.includes(source.id)) {
                <p class="source">
                  @if (source.url) {
                    <a [href]="source.url" target="_blank" rel="noopener noreferrer">{{
                      source.citation
                    }}</a>
                  } @else {
                    {{ source.citation }}
                  }
                </p>
              }
            }
            <button type="button" (click)="select()">Back to room overview</button>
          </aside>
        }
      </div>
      <details class="reading-view">
        <summary>Read all labels and sources</summary>
        @for (object of board().objects; track object.id) {
          <article>
            <h3>{{ object.title }}</h3>
            <p>{{ object.description }}</p>
            <p><strong>Why it matters.</strong> {{ object.evidenceConnection }}</p>
          </article>
        }
        <h3>Sources</h3>
        <ol>
          @for (source of board().sources; track source.id) {
            <li>
              @if (source.url) {
                <a [href]="source.url" target="_blank" rel="noopener noreferrer">{{
                  source.citation
                }}</a>
              } @else {
                {{ source.citation }}
              }
            </li>
          }
        </ol>
      </details>
    </section>
  `,
  styleUrl: './museum-presentation.scss',
})
export class MuseumRoomPresentationComponent {
  readonly board = input.required<MuseumBoardSnapshotData>();
  readonly label = input('Museum room');
  readonly selectedSlot = signal<string | undefined>(undefined);
  readonly slots = computed(
    () => museumRoomLayout(this.board().museumRoom?.layoutId ?? '')?.slots ?? [],
  );
  readonly sceneContent = computed<MuseumSceneContent>(() => ({
    kind: 'room',
    label: this.label(),
    board: this.board(),
  }));
  readonly selectedObject = computed(() => this.objectFor(this.selectedSlot()));
  private readonly injector = inject(Injector);
  private readonly labelHeading = viewChild<ElementRef<HTMLElement>>('labelHeading');
  private readonly roomId = computed(() => this.board().museumRoom?.roomId);
  constructor() {
    effect(() => {
      this.roomId();
      this.selectedSlot.set(undefined);
    });
  }
  objectFor(slotId?: string) {
    const id = this.board().museumRoom?.placements.find((item) => item.slotId === slotId)?.objectId;
    return this.board().objects.find((object) => object.id === id);
  }
  select(id?: string): void {
    this.selectedSlot.set(id);
    if (id)
      afterNextRender(
        () => {
          const heading = this.labelHeading()?.nativeElement;
          heading?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
          heading?.focus({ preventScroll: true });
        },
        { injector: this.injector },
      );
  }
}
