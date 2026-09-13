import { Component, computed, input, output, signal } from '@angular/core';
import type { HallLocationView } from '../domain/exhibit-types';
import { isMuseumBoardSnapshotData } from '../renderers/museum-board/museum-board-renderer';
import { MuseumSceneComponent } from './museum-scene.component';
import { MuseumRoomPresentationComponent } from './museum-room-presentation.component';
import type { MuseumSceneContent } from './museum-scene-contracts';
import type { PublishedMuseumRoom } from './museum-publication';

@Component({
  selector: 'app-museum-walkthrough',
  imports: [MuseumSceneComponent, MuseumRoomPresentationComponent],
  template: `
    <section class="museum-walkthrough">
      <header class="museum-heading">
        <div>
          <span>THE CLASS MUSEUM · {{ rooms().length }} SUBMITTED ROOMS</span>
          <h2>A place for every story.</h2>
          <p>Enter a room. Look closely. Discover what its curators want you to see.</p>
        </div>
        <span class="museum-seal" aria-hidden="true">M</span>
      </header>
      <nav class="museum-directory" aria-label="Museum rooms">
        <button type="button" [attr.aria-pressed]="!activeRoom()" (click)="enter()">
          Museum entrance
        </button>
        @for (room of rooms(); track room.locationId) {
          <button
            type="button"
            [attr.aria-pressed]="activeRoom()?.locationId === room.locationId"
            (click)="enter(room.locationId)"
          >
            <span>{{ number(room.position) }}</span> {{ room.snapshot?.accessibleData?.title }}
          </button>
        }
      </nav>
      @if (activeRoom(); as room) {
        <div class="visitor-navigation">
          <button type="button" (click)="enter()">← Museum entrance</button
          ><span>Room {{ number(room.position) }}</span
          ><button type="button" (click)="nextRoom()">Next room →</button>
        </div>
        @if (activeBoard(); as board) {
          <app-museum-room-presentation [board]="board" [label]="'Room ' + number(room.position)" />
        }
      } @else {
        <app-museum-scene [content]="lobby()" (selected)="enter($event)" />
        @if (!rooms().length) {
          <p class="empty-museum">Rooms will appear here after their curators submit them.</p>
        }
        <p class="museum-note">Choose a door or a room name above. Each room opens on its own.</p>
      }
    </section>
  `,
  styleUrl: './museum-presentation.scss',
})
export class MuseumWalkthroughComponent {
  readonly locations = input<readonly HallLocationView[]>([]);
  readonly publishedRooms = input<readonly PublishedMuseumRoom[] | undefined>(undefined);
  readonly opened = output<string | undefined>();
  readonly activeId = signal<string | undefined>(undefined);
  readonly rooms = computed(
    () =>
      this.publishedRooms()?.map((room) => ({
        locationId: room.room.roomId,
        position: room.position,
        snapshot: { visitorSafeData: room.board, accessibleData: { title: room.board.title } },
        hanging: { id: room.id },
        team: { displayName: room.board.teamCredit.displayName },
      })) ??
      this.locations().filter(
        (location) =>
          location.hanging &&
          isMuseumBoardSnapshotData(location.snapshot?.visitorSafeData) &&
          location.snapshot?.visitorSafeData.museumRoom,
      ),
  );
  readonly activeRoom = computed(() =>
    this.rooms().find((room) => room.locationId === this.activeId()),
  );
  readonly activeBoard = computed(() => {
    const data = this.activeRoom()?.snapshot?.visitorSafeData;
    return isMuseumBoardSnapshotData(data) ? data : undefined;
  });
  readonly lobby = computed<MuseumSceneContent>(() => ({
    kind: 'lobby',
    doors: this.rooms().map((room) => ({
      id: room.locationId,
      number: this.number(room.position),
      title: room.snapshot!.accessibleData.title,
      curator: room.team.displayName,
    })),
  }));
  number(position: number): string {
    return String(position + 1).padStart(2, '0');
  }
  enter(id?: string): void {
    const room = this.rooms().find((item) => item.locationId === id);
    this.activeId.set(room?.locationId);
    this.opened.emit(room?.hanging?.id);
  }
  nextRoom(): void {
    const rooms = this.rooms();
    const index = rooms.findIndex((room) => room.locationId === this.activeId());
    this.enter(rooms[(index + 1) % rooms.length]?.locationId);
  }
}
