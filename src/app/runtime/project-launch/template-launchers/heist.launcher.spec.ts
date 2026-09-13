import { vi } from 'vitest';
import gallery from '../../../../../public/projects/shadow-gallery/versions/1.1.0/project.json';
import legacyGallery from '../../../../../public/projects/shadow-gallery/project.json';
import castle from '../../../../../public/projects/castle-archive-rescue/project.json';
import guided from '../../../templates/heist/testing/castle-guided.fixture.json';
import previousEscape from '../../../templates/heist/testing/castle-escape-v2.fixture.json';
import { createLocalPreviewSession } from '../../../core/context/project-session-context';
import { projectCatalog } from '../../../projects/project-catalog';
import type { ProjectLaunchRequest } from '../project-launch.contracts';
import { heistLauncher } from './heist.launcher';
vi.mock('phaser', () => ({}));
function request(id: string, projectDefinition: unknown): ProjectLaunchRequest { const project = projectCatalog.find(p => p.id === id)!; return { project, projectDefinition, session: createLocalPreviewSession(id, project.projectVersion) }; }
describe('Heist experience launch routing', () => {
  it('loads the gallery, animal escape and previous guided experience', async () => {
    const next = await heistLauncher.load(request('shadow-gallery', gallery)); expect(next.component.name).toContain('Gallery'); expect(next.integratedHeader).toBe(true);
    const legacy = request('shadow-gallery', legacyGallery);
    expect((await heistLauncher.load({ ...legacy, project: { ...legacy.project, projectVersion: legacyGallery.projectVersion }, session: createLocalPreviewSession('shadow-gallery', legacyGallery.projectVersion) })).component.name).toContain('Gallery');
    const escape = await heistLauncher.load(request('castle-archive-rescue', castle)); expect(escape.component.name).toContain('Expedition'); expect(escape.integratedHeader).toBe(true);
    const old = request('castle-archive-rescue', guided);
    const original = await heistLauncher.load({ ...old, project: { ...old.project, projectVersion: guided.projectVersion } }); expect(original.component.name).toContain('Heist');
    const previous = await heistLauncher.load({ ...old, projectDefinition: previousEscape, project: { ...old.project, projectVersion: previousEscape.projectVersion } }); expect(previous.component.name).toContain('Escape');
  });
  it('rejects mismatched gallery packages and unsupported official authority', async () => {
    await expect(heistLauncher.load(request('shadow-gallery', { ...gallery, projectVersion: '2.0.0' }))).rejects.toThrow('PROJECT_ID_MISMATCH');
    const r = request('shadow-gallery', gallery);
    await expect(heistLauncher.load({ ...r, session: { ...r.session, authorityMode: 'serverAuthoritative' } })).rejects.toThrow('CAPABILITY_NOT_INSTALLED');
  });
  it('reports unsupported required lock capabilities before mounting a gallery', async () => {
    await expect(heistLauncher.load(request('shadow-gallery', { ...gallery, locks: [{ ...gallery.locks[0], type: 'missing-shell' }, ...gallery.locks.slice(1)] }))).rejects.toThrow('CAPABILITY_NOT_INSTALLED');
  });
  it('validates escape identity and capabilities before mounting', async () => {
    await expect(heistLauncher.load(request('castle-archive-rescue', { ...castle, projectVersion: '0.0.0' }))).rejects.toThrow('PROJECT_ID_MISMATCH');
    await expect(heistLauncher.load(request('castle-archive-rescue', { ...castle, steps: [{ ...castle.steps[0], puzzle: { ...castle.steps[0].puzzle, type: 'missing' } }] }))).rejects.toThrow('CAPABILITY_NOT_INSTALLED');
  });
});
