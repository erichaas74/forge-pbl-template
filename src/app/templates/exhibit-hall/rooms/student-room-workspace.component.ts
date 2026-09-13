import {
  afterNextRender,
  Component,
  DestroyRef,
  computed,
  ElementRef,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';
import { ExhibitHallRuntimeService } from '../runtime/exhibit-hall-runtime.service';
import { museumRoomLayout } from './museum-room';
import { MuseumSceneComponent } from './museum-scene.component';
import { MuseumWalkthroughComponent } from './museum-walkthrough.component';
import type { MuseumSceneContent } from './museum-scene-contracts';
import { MuseumPublicationService } from './museum-publication.service';

@Component({
  selector: 'app-student-room-workspace',
  imports: [MuseumSceneComponent, MuseumWalkthroughComponent],
  providers: [MuseumPublicationService],
  templateUrl: './student-room-workspace.component.html',
  styleUrl: './student-room-workspace.component.scss',
})
export class StudentRoomWorkspaceComponent {
  readonly runtime = inject(ExhibitHallRuntimeService);
  readonly publication = inject(MuseumPublicationService);
  readonly selectedSlot = signal<string | undefined>(undefined);
  readonly choosing = signal(false);
  readonly preview = signal(false);
  readonly visiting = signal(false);
  readonly showValidation = signal(false);
  readonly editable = computed(() => this.runtime.canEditRoom() && !this.preview());
  readonly draft = this.runtime.composerDraft;
  readonly slots = computed(
    () => museumRoomLayout(this.runtime.assignedRoom()?.layoutId ?? '')?.slots ?? [],
  );
  readonly selectedObject = computed(() => this.objectAt(this.selectedSlot()));
  readonly selectedDisplay = computed(() =>
    this.slots().find((slot) => slot.id === this.selectedSlot()),
  );
  readonly sceneContent = computed<MuseumSceneContent>(() => ({
    kind: 'room',
    label: this.runtime.assignedRoom()?.label ?? 'Your room',
    board: this.draft(),
  }));
  private readonly panelHeading = viewChild<ElementRef<HTMLElement>>('panelHeading');
  private readonly validationPanel = viewChild<ElementRef<HTMLElement>>('validationPanel');
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);

  objectAt(slotId?: string) {
    const objectId = this.draft().museumRoom?.placements.find(
      (item) => item.slotId === slotId,
    )?.objectId;
    return this.draft().objects.find((object) => object.id === objectId);
  }
  used(objectId: string): boolean {
    return (
      this.draft().museumRoom?.placements.some(
        (item) => item.objectId === objectId && item.slotId !== this.selectedSlot(),
      ) ?? false
    );
  }
  select(id?: string): void {
    this.selectedSlot.set(id);
    this.choosing.set(false);
    afterNextRender(
      () => {
        const heading = this.panelHeading()?.nativeElement;
        heading?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
        heading?.focus({ preventScroll: true });
      },
      { injector: this.injector },
    );
  }
  place(objectId: string): void {
    const slot = this.selectedSlot();
    if (slot) this.runtime.placeRoomObject(slot, objectId);
    this.select(slot);
  }
  remove(): void {
    const slot = this.selectedSlot();
    if (slot) this.runtime.placeRoomObject(slot);
    this.select(slot);
  }
  addFirst(): void {
    this.select(this.slots().find((slot) => !this.objectAt(slot.id))?.id ?? this.slots()[0]?.id);
  }
  value(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  updateLabel(field: 'title' | 'description' | 'evidenceConnection', event: Event): void {
    const object = this.selectedObject();
    if (object) this.runtime.updateObject(object.id, field, this.value(event));
  }
  openMuseum(): void {
    this.visiting.set(true);
    void this.publication.refreshCollection();
  }
  async submit(): Promise<void> {
    this.showValidation.set(true);
    const submitted = await this.publication.submit();
    if (this.destroyRef.destroyed) return;
    if (submitted) {
      this.preview.set(true);
      this.showValidation.set(false);
      this.selectedSlot.set(undefined);
    } else
      afterNextRender(
        () => {
          this.validationPanel()?.nativeElement.focus();
        },
        { injector: this.injector },
      );
  }
}
