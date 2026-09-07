import { InvestigationFinalCaseComponent } from '../../templates/investigation/ui/final-investigation.component';
import {
  createInvestigationSample,
  investigationSampleEvidence,
  investigationSampleGuide,
} from '../../projects/completed-samples/investigation.sample-data';
import type { CompletedSample } from './completed-sample';
export function loadSample(): CompletedSample {
  return {
    ...investigationSampleGuide,
    component: InvestigationFinalCaseComponent,
    providers: [],
    inputs: {
      runtime: createInvestigationSample(),
      evidence: structuredClone(investigationSampleEvidence),
      ready: true,
      readOnly: true,
    },
  };
}
