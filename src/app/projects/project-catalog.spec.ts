import { projectCatalog } from './project-catalog';

describe('project catalog', () => {
  it('exposes the two configured projects with unique IDs and routes', () => {
    expect(projectCatalog).toHaveLength(2);
    expect(new Set(projectCatalog.map((project) => project.id)).size).toBe(2);
    expect(new Set(projectCatalog.map((project) => project.route)).size).toBe(2);
    expect(projectCatalog.map((project) => project.route)).toEqual([
      '/mystery-substance',
      '/frontier-trading',
    ]);
  });
});
