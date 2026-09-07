import { createLocalPreviewSession } from '../../core/context/project-session-context';
import { robotDeliveryConfig } from '../../projects/robot-delivery/robot-delivery.config';
import {
  createRobotSampleState,
  robotSampleGuide,
  robotSampleStudent,
} from '../../projects/robot-delivery/robot-delivery.sample';
import { AutomationLabComponent } from '../../templates/programming-automation/ui/automation-lab.component';
import { AutomationRuntimeService } from '../../templates/programming-automation/runtime/automation-runtime.service';
import {
  AUTOMATION_CONFIG,
  AUTOMATION_SAMPLE,
  AUTOMATION_SESSION,
} from '../../templates/programming-automation/runtime/automation.tokens';
import { AUTOMATION_PERSISTENCE } from '../../templates/programming-automation/persistence/automation.persistence';
import { samplePersistence, type CompletedSample } from './completed-sample';
export function loadSample(): CompletedSample {
  return {
    ...robotSampleGuide,
    component: AutomationLabComponent,
    providers: [
      { provide: AUTOMATION_CONFIG, useValue: robotDeliveryConfig },
      { provide: AUTOMATION_SAMPLE, useValue: true },
      {
        provide: AUTOMATION_SESSION,
        useValue: createLocalPreviewSession(
          robotDeliveryConfig.projectId,
          robotDeliveryConfig.projectVersion,
          { actorId: robotSampleStudent.id, actorDisplayName: robotSampleStudent.name },
        ),
      },
      { provide: AUTOMATION_PERSISTENCE, useValue: samplePersistence(createRobotSampleState()) },
      AutomationRuntimeService,
    ],
  };
}
