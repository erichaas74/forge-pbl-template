import type { JourneyPathNode } from '../../domain/journey-path.models';
export interface JourneyWorldView {
  readonly effects: ReadonlySet<string | undefined>;
  readonly paused: boolean;
  readonly reducedMotion: boolean;
  readonly activeEventId?: string;
}
export interface JourneyWorldCallbacks { ready():void; failed():void; inspect(id:string):void }
export interface JourneyWorldHandle { destroy():void }
export type JourneyWorldMount = (parent:HTMLElement,node:JourneyPathNode,view:()=>JourneyWorldView,callbacks:JourneyWorldCallbacks)=>JourneyWorldHandle;
