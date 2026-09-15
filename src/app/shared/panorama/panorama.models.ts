export interface SceneRect { readonly x: number; readonly y: number; readonly width: number; readonly height: number }
export interface PanoramaSource {
  readonly id: string; readonly title: string; readonly text: string; readonly url: string;
  readonly provenance: string; readonly rect?: SceneRect;
}
export interface PanoramaTopic {
  readonly id: string; readonly question: string; readonly keywords: readonly string[];
  readonly reply: string; readonly sourceIds: readonly string[];
}
export interface PanoramaPerson {
  readonly id: string; readonly name: string; readonly activity: string; readonly rect: SceneRect;
  readonly welcome: string; readonly topics: readonly PanoramaTopic[];
  readonly approach?: { readonly src: string; readonly captions: string; readonly transcript: string };
}
export interface PanoramaRepair {
  readonly id: string; readonly title: string; readonly rect: SceneRect;
  readonly action: string; readonly sourceIds: readonly string[];
}
export interface PanoramaDefinition {
  readonly questionOwner?: 'scene' | 'tutor';
  readonly viewpoints?: readonly PanoramaViewpoint[];
  readonly capability: 'panorama.encounter.v1'; readonly id: string; readonly version: 1;
  readonly workId: string; readonly title: string; readonly setting: string; readonly invitation: string;
  readonly panorama: string; readonly forgery: string; readonly imageAlt: string;
  readonly attribution: string; readonly people: readonly PanoramaPerson[];
  readonly sources: readonly PanoramaSource[]; readonly repairs: readonly PanoramaRepair[];
}
export interface PanoramaViewpoint {
  readonly inspection?: import('../spatial-inspection/spatial-inspection.definition').SpatialInspectionDefinition;
  readonly places?: readonly { readonly targetId: string; readonly label: string; readonly yaw: number; readonly pitch: number }[];
  readonly id: string; readonly title: string; readonly image: string;
  readonly yaw: number; readonly pitch: number;
  readonly people: readonly { readonly personId: string; readonly rect: SceneRect }[];
}
export interface SphericalView { readonly viewpointId: string; readonly yaw: number; readonly pitch: number; readonly fov: number }
export interface PanoramaMessage {
  readonly role: 'student' | 'character'; readonly text: string; readonly sourceIds: readonly string[];
}
export interface PanoramaState {
  readonly sphericalView?: SphericalView;
  readonly selectedPersonId?: string;
  readonly heading: number; readonly visited: readonly string[]; readonly collected: readonly string[];
  readonly conversations: Readonly<Record<string, readonly PanoramaMessage[]>>;
  readonly repairs: Readonly<Record<string, boolean>>;
  readonly undo: readonly { readonly id: string; readonly previous: boolean }[];
}
export const initialPanoramaState = (): PanoramaState => ({ heading: 50, visited: [], collected: [], conversations: {}, repairs: {}, undo: [] });
export type PanoramaAction =
  | { readonly type: 'spherical-view'; readonly view: SphericalView }
  | { readonly type: 'view'; readonly heading: number }
  | { readonly type: 'visit'; readonly personId: string }
  | { readonly type: 'collect'; readonly sourceId: string }
  | { readonly type: 'conversation'; readonly personId: string; readonly question: string; readonly answer: PanoramaMessage }
  | { readonly type: 'repair'; readonly repairId: string; readonly applied: boolean }
  | { readonly type: 'undo' };
