import { projectCatalog } from './project-catalog';

describe('project catalog', () => {
  it('exposes the configured projects with unique IDs and routes', () => {
    expect(projectCatalog).toHaveLength(6);
    expect(new Set(projectCatalog.map((project) => project.id)).size).toBe(6);
    expect(new Set(projectCatalog.map((project) => project.route)).size).toBe(6);
    expect(projectCatalog.map((project) => project.route)).toEqual([
      '/mystery-substance',
      '/frontier-trading',
      '/class-exhibit-hall',
      '/history-live',
      '/debate-studio',
      '/journey-replay',
    ]);
    expect(projectCatalog.find((project) => project.id === 'frontier-trading-company')?.builderRoute)
      .toBe('/frontier-trading/builder-info');
  });
});
