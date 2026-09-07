import type {
  NarrativeChoiceBlueprint,
  NarrativeNodeBlueprint,
  NarrativeStudioProjectConfig,
} from '../domain/narrative-studio.models';
export interface NarrativeStoryMapNodeLayout {
  readonly node: NarrativeNodeBlueprint;
  readonly depth: number;
  readonly x: number;
  readonly y: number;
}
export interface NarrativeStoryMapEdgeLayout {
  readonly id: string;
  readonly sourceId: string;
  readonly destinationId: string;
  readonly choice: NarrativeChoiceBlueprint;
  readonly choiceIndex: number;
  readonly path: string;
  readonly labelX: number;
  readonly labelY: number;
}
export interface NarrativeStoryMapLayout {
  readonly width: number;
  readonly height: number;
  readonly nodes: readonly NarrativeStoryMapNodeLayout[];
  readonly edges: readonly NarrativeStoryMapEdgeLayout[];
}
/** Fixed-size readable cards; the canvas grows instead of squeezing branches together. */
export function createNarrativeStoryMapLayout(
  config: NarrativeStudioProjectConfig,
  _compact = false,
): NarrativeStoryMapLayout {
  const byId = new Map(config.nodes.map((node) => [node.id, node]));
  const incoming = new Map(config.nodes.map((node) => [node.id, 0]));
  for (const node of config.nodes)
    for (const choice of node.choices)
      incoming.set(choice.nextNodeId, (incoming.get(choice.nextNodeId) ?? 0) + 1);
  const depths = new Map<string, number>([[config.startNodeId, 0]]);
  const pending = config.nodes.filter((node) => !incoming.get(node.id)).map((node) => node.id);
  // Longest incoming path keeps merged scenes below every parent.
  while (pending.length) {
    const id = pending.shift()!;
    for (const choice of byId.get(id)?.choices ?? []) {
      depths.set(
        choice.nextNodeId,
        Math.max(depths.get(choice.nextNodeId) ?? 0, (depths.get(id) ?? 0) + 1),
      );
      incoming.set(choice.nextNodeId, incoming.get(choice.nextNodeId)! - 1);
      if (!incoming.get(choice.nextNodeId)) pending.push(choice.nextNodeId);
    }
  }
  const order = new Map<string, number>();
  const walk = (id: string): void => {
    if (order.has(id)) return;
    order.set(id, order.size);
    for (const choice of byId.get(id)?.choices ?? []) walk(choice.nextNodeId);
  };
  walk(config.startNodeId);
  const rows = new Map<number, NarrativeNodeBlueprint[]>();
  for (const node of config.nodes) {
    const depth = depths.get(node.id) ?? 0;
    rows.set(depth, [...(rows.get(depth) ?? []), node]);
  }
  const width = Math.max(480, ...[...rows.values()].map((row) => row.length * 224 + 32));
  const height = (Math.max(...rows.keys(), 0) + 1) * 228;
  const nodes = [...rows.entries()].flatMap(([depth, row]) =>
    row
      .sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0))
      .map((node, index) => ({
        node,
        depth,
        x: (width * (index + 0.5)) / row.length,
        y: 94 + depth * 228,
      })),
  );
  const positions = new Map(nodes.map((item) => [item.node.id, item]));
  const edges = config.nodes.flatMap((node) =>
    node.choices.flatMap((choice, choiceIndex) => {
      const from = positions.get(node.id),
        to = positions.get(choice.nextNodeId);
      if (!from || !to) return [];
      const x = from.x + (choiceIndex ? 44 : -44),
        y = from.y + 76;
      const endY = to.y - 76,
        middle = (y + endY) / 2;
      return [
        {
          id: `${node.id}:${choice.id}`,
          sourceId: node.id,
          destinationId: choice.nextNodeId,
          choice,
          choiceIndex,
          path: `M ${x} ${y} C ${x} ${middle}, ${to.x} ${middle}, ${to.x} ${endY}`,
          labelX: (x + to.x) / 2,
          labelY: middle,
        },
      ];
    }),
  );
  return { width, height, nodes, edges };
}
