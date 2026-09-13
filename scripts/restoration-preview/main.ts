import { bootstrapApplication } from '@angular/platform-browser';
import { createLocalPreviewSession } from '../../src/app/core/context/project-session-context';
import { RestorationCollectionComponent } from '../../src/app/templates/heist/restoration/restoration-collection.component';
import { requireRestorationMission } from '../../src/app/templates/heist/restoration/restoration-collection.validation';
import { LocalRestorationAdapter, RESTORATION_MISSION, RESTORATION_PERSISTENCE, RestorationCollectionRuntime } from '../../src/app/templates/heist/restoration/restoration-collection.runtime';

/** Isolated test/preview host for the real renderer; production uses the Heist launcher. */
async function start(): Promise<void> {
  const url = new URLSearchParams(location.search).get('package') ?? '/projects/shadow-gallery/versions/2.0.0/project.json';
  if (!/^\/projects\/[a-z0-9-]+\/(?:versions\/\d+\.\d+\.\d+\/)?project\.json$/.test(url)) throw new Error('Invalid preview package path.');
  const response = await fetch(url); if (!response.ok) throw new Error('The preview package could not load.');
  const mission = requireRestorationMission(await response.json()), session = createLocalPreviewSession(mission.projectId, mission.projectVersion);
  await bootstrapApplication(RestorationCollectionComponent, { providers: [
    { provide: RESTORATION_MISSION, useValue: mission },
    { provide: RESTORATION_PERSISTENCE, useFactory: () => new LocalRestorationAdapter(session, mission) }, RestorationCollectionRuntime,
  ] });
}
start().catch(error => { document.body.textContent = error instanceof Error ? error.message : 'Preview could not start.'; });
