import { BrowserEngineeringDesignAdapter } from '../../../infrastructure/persistence/browser-engineering-design.adapter';
import { SolarMonumentComponent } from '../../../plugins/simulations/solar-monument/solar-monument.component';
import {
  DESIGN_CAPTURE,
  DESIGN_CAPTURE_BATCH,
  DESIGN_CHECKS_CHANGE,
  DESIGN_SIMULATIONS,
  DesignSimulationRegistry,
} from '../../../shared/engineering/design-simulation.registry';
import { requireEngineeringConfig } from '../../../templates/engineering-design/domain/engineering-design.models';
import {
  ENGINEERING_CONFIG,
  ENGINEERING_PERSISTENCE,
  ENGINEERING_SESSION,
  EngineeringDesignRuntime,
} from '../../../templates/engineering-design/runtime/engineering-design.runtime';
import type { DesignCapture, DesignCheck } from '../../../shared/engineering/block-design';
import type { TemplateLauncher } from '../project-launch.contracts';
export const engineeringDesignLauncher: TemplateLauncher = {
  templateId: 'engineering-design',
  async load(request) {
    const config = requireEngineeringConfig(request.projectDefinition, request.project.id);
    if (config.version !== request.project.projectVersion)
      throw new Error('CONFIG_INVALID: Project version mismatch.');
    const registry = new DesignSimulationRegistry();
    registry.register('simulation.solar-monument', SolarMonumentComponent);
    registry.require(config.simulationId);
    return {
      integratedHeader: true,
      component: (
        await import('../../../templates/engineering-design/ui/engineering-design-page.component')
      ).EngineeringDesignPageComponent,
      providers: [
        { provide: ENGINEERING_CONFIG, useValue: config },
        { provide: ENGINEERING_SESSION, useValue: request.session },
        {
          provide: ENGINEERING_PERSISTENCE,
          useValue: new BrowserEngineeringDesignAdapter(request.session),
        },
        { provide: DESIGN_SIMULATIONS, useValue: registry },
        EngineeringDesignRuntime,
        {
          provide: DESIGN_CAPTURE_BATCH,
          useFactory: (runtime: EngineeringDesignRuntime) => (captures: readonly DesignCapture[]) =>
            runtime.captureBatch(captures),
          deps: [EngineeringDesignRuntime],
        },
        {
          provide: DESIGN_CHECKS_CHANGE,
          useFactory: (runtime: EngineeringDesignRuntime) => (checks: readonly DesignCheck[]) =>
            runtime.saveChecks(checks),
          deps: [EngineeringDesignRuntime],
        },
        {
          provide: DESIGN_CAPTURE,
          useFactory: (runtime: EngineeringDesignRuntime) => (capture: DesignCapture) =>
            runtime.capture(capture),
          deps: [EngineeringDesignRuntime],
        },
      ],
    };
  },
};
