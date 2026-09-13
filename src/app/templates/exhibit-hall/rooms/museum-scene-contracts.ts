import type { MuseumBoardSnapshotData } from '../domain/exhibit-types';

export interface MuseumDoor {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly curator: string;
}
export type MuseumSceneContent =
  | { readonly kind: 'room'; readonly label: string; readonly board: MuseumBoardSnapshotData }
  | { readonly kind: 'lobby'; readonly doors: readonly MuseumDoor[] };
export interface MuseumSceneCallbacks {
  selected(id: string): void;
  status(loading: number, errors: readonly string[]): void;
  failed(message: string): void;
}
export interface MuseumScenePort {
  update(content: MuseumSceneContent): void;
  focusDisplay(id?: string): void;
  dispose(): void;
}
export type MuseumSceneFactory = (
  host: HTMLElement,
  callbacks: MuseumSceneCallbacks,
) => MuseumScenePort;
