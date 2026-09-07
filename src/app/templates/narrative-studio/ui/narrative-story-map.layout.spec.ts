import { survivalIslandStoryLabConfig } from '../../../projects/survival-island-story-lab/survival-island.config';
import { createNarrativeStoryMapLayout } from './narrative-story-map.layout';

describe('Narrative story map layout', () => {
  it('places the story in connected family-tree rows', () => {
    const layout = createNarrativeStoryMapLayout(survivalIslandStoryLabConfig);
    const node = (id: string) => layout.nodes.find((item) => item.node.id === id)!;

    expect(node('shore').depth).toBe(0);
    expect(node('shore').y).toBeGreaterThan(76);
    expect(node('ridge').depth).toBe(1);
    expect(node('lagoon').depth).toBe(1);
    expect(node('eye').depth).toBe(3);
    expect(node('ending-rescue').depth).toBe(4);
    expect(node('ridge').x).toBeLessThan(node('lagoon').x);
    expect(layout.edges).toHaveLength(
      survivalIslandStoryLabConfig.nodes.reduce((total, item) => total + item.choices.length, 0),
    );
  });

  it('labels every connection with its source choice', () => {
    const layout = createNarrativeStoryMapLayout(survivalIslandStoryLabConfig);
    const edge = layout.edges.find((item) => item.id === 'shore:shore-high');

    expect(edge?.destinationId).toBe('ridge');
    expect(edge?.choice.prompt).toBe('Build a fire to signal for help');
    expect(edge?.path).toMatch(/^M /);
    for (const connection of layout.edges) {
      const source = layout.nodes.find((item) => item.node.id === connection.sourceId)!;
      const destination = layout.nodes.find((item) => item.node.id === connection.destinationId)!;
      expect(destination.y - source.y).toBeGreaterThan(152);
    }
    for (const item of layout.nodes) {
      for (const other of layout.nodes.filter(
        (node) => node.depth === item.depth && node.node.id !== item.node.id,
      )) {
        expect(Math.abs(other.x - item.x)).toBeGreaterThan(192);
      }
    }
  });
});
