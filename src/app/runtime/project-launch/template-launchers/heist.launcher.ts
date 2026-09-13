import type { TemplateLauncher } from '../project-launch.contracts';
import { requireMission } from '../../../templates/heist/domain/heist.validation';
import { gameplayFingerprint } from '../../../templates/heist/domain/heist.fingerprint';
import { HEIST_MISSION, HeistRuntime } from '../../../templates/heist/runtime/heist-runtime.service';
import { HEIST_PERSISTENCE, LocalHeistAdapter } from '../../../templates/heist/runtime/heist.persistence';
export const heistLauncher: TemplateLauncher = {
  templateId: 'heist',
  async load(request) {
    if (request.session.authorityMode !== 'localDemo') throw new Error('CAPABILITY_NOT_INSTALLED: Heist currently supports local practice. Official shared attempts require an authoritative Heist adapter.');
    if (request.projectDefinition && typeof request.projectDefinition === 'object' && 'experience' in request.projectDefinition && request.projectDefinition.experience === 'escape') {
      const { requireEscapeMission } = await import('../../../templates/heist/escape/domain/escape.validation');
      const { ESCAPE_MISSION, ESCAPE_PERSISTENCE, EscapeRuntime, LocalEscapeAdapter } = await import('../../../templates/heist/escape/runtime/escape-runtime');
      const mission = requireEscapeMission(request.projectDefinition);
      if (mission.projectId !== request.project.id || mission.projectVersion !== request.project.projectVersion) throw new Error('PROJECT_ID_MISMATCH: Escape package does not match this project.');
      if (mission.world) {
        const { ExpeditionComponent } = await import('../../../templates/heist/escape/expedition/expedition.component');
        const { ExpeditionRuntime, EXPEDITION_PLAYER } = await import('../../../templates/heist/escape/runtime/expedition-runtime');
        return { component: ExpeditionComponent, integratedHeader: true, providers: [
          { provide: ESCAPE_MISSION, useValue: mission },
          { provide: ESCAPE_PERSISTENCE, useFactory: () => new LocalEscapeAdapter(request.session, mission) },
          { provide: EXPEDITION_PLAYER, useValue: { id: request.session.actorId, name: 'You', color: 0x82e6d2 } },
          EscapeRuntime, ExpeditionRuntime,
        ] };
      }
      const { EscapeComponent } = await import('../../../templates/heist/escape/ui/escape.component');
      return { component: EscapeComponent, integratedHeader: true, providers: [
        { provide: ESCAPE_MISSION, useValue: mission },
        { provide: ESCAPE_PERSISTENCE, useFactory: () => new LocalEscapeAdapter(request.session, mission) }, EscapeRuntime,
      ] };
    }
    if (request.projectDefinition && typeof request.projectDefinition === 'object' && 'experience' in request.projectDefinition && request.projectDefinition.experience === 'gallery') {
      const { requireGalleryMission } = await import('../../../templates/heist/gallery/domain/gallery.validation');
      const { GALLERY_MISSION, GALLERY_PERSISTENCE, GalleryRuntime, LocalGalleryAdapter } = await import('../../../templates/heist/gallery/runtime/gallery-runtime');
      const mission = requireGalleryMission(request.projectDefinition);
      if (mission.projectId !== request.project.id || mission.projectVersion !== request.project.projectVersion) throw new Error('PROJECT_ID_MISMATCH: Heist gallery package does not match this project.');
      const { GalleryComponent } = await import('../../../templates/heist/gallery/ui/gallery.component');
      return { component: GalleryComponent, integratedHeader: true, providers: [
        { provide: GALLERY_MISSION, useValue: mission },
        { provide: GALLERY_PERSISTENCE, useFactory: () => new LocalGalleryAdapter(request.session, mission) }, GalleryRuntime,
      ] };
    }
    const mission = requireMission(request.projectDefinition);
    if (mission.projectId !== request.project.id || mission.projectVersion !== request.project.projectVersion) throw new Error('PROJECT_ID_MISMATCH: Heist package does not match this project.');
    const { HeistComponent } = await import('../../../templates/heist/ui/heist.component');
    return { component: HeistComponent, integratedHeader: true, providers: [
      { provide: HEIST_MISSION, useValue: mission },
      { provide: HEIST_PERSISTENCE, useFactory: () => new LocalHeistAdapter(request.session, gameplayFingerprint(mission)) }, HeistRuntime,
    ] };
  },
};
