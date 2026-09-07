import { ExhibitCollectionPresentationComponent } from '../../templates/exhibit-hall/ui/exhibit-collection-presentation.component';
import { MuseumBoardComponent } from '../../templates/exhibit-hall/ui/museum-board.component';
import { EXHIBIT_RENDERER_COMPONENTS } from '../../templates/exhibit-hall/runtime/exhibit-hall.tokens';
import {
  createExhibitSample,
  exhibitCurators,
  exhibitSampleGuide,
} from '../../projects/completed-samples/exhibit.sample-data';
import type { CompletedSample } from './completed-sample';
export function loadSample(): CompletedSample {
  return {
    ...exhibitSampleGuide,
    component: ExhibitCollectionPresentationComponent,
    inputs: { locations: createExhibitSample(), curators: structuredClone(exhibitCurators) },
    providers: [
      {
        provide: EXHIBIT_RENDERER_COMPONENTS,
        useValue: [{ rendererType: 'museum-board', component: MuseumBoardComponent }],
      },
    ],
  };
}
