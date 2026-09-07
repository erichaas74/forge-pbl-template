import { projectCatalog } from './project-catalog';

describe('project catalog', () => {
  it('exposes the configured projects with unique IDs and routes', () => {
    expect(projectCatalog).toHaveLength(9);
    expect(new Set(projectCatalog.map((project) => project.id)).size).toBe(projectCatalog.length);
    expect(new Set(projectCatalog.map((project) => project.route)).size).toBe(
      projectCatalog.length,
    );
    expect(projectCatalog.map((project) => project.route)).toEqual([
      '/projects/robot-delivery-code-lab',
      '/projects/mystery-substance',
      '/projects/frontier-trading-company',
      '/projects/objects-that-changed-us',
      '/projects/history-live-revolutionary-war',
      '/projects/the-fate-of-the-republic',
      '/projects/race-around-the-world',
      '/projects/survival-island-story-lab',
      '/projects/calendar-monument',
    ]);
    expect(
      projectCatalog.find((project) => project.id === 'frontier-trading-company')?.builderRoute,
    ).toBe('/projects/frontier-trading-company/builder-info');
    expect(projectCatalog.every((project) => project.template.id.length > 0)).toBe(true);
    expect(projectCatalog.every((project) => project.packageReference.length > 0)).toBe(true);
    expect(projectCatalog.map((project) => project.status)).not.toContain('Available');
    expect(projectCatalog.find((project) => project.id === 'race-around-the-world')?.status).toBe(
      'Updating',
    );
  });
});
