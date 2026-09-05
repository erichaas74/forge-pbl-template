# Choice Progression Scaffold

The reusable `simulation-decision` template now supports an optional `choiceProgression` configuration. It begins a project with a focused set of goods and routes, then expands both planning spaces as students produce durable evidence of preparation.

## Frontier Trading progression

| Rank               | Supplies | Routes | Unlock condition                                      |
| ------------------ | -------: | -----: | ----------------------------------------------------- |
| Starter Outfitter  |        3 |      2 | Available after company setup                         |
| Regional Outfitter |        7 |      4 | Explore 2 market stalls                               |
| Master Outfitter   |       10 |      5 | Explore 3 market stalls and load 2 different supplies |

A single reviewed transaction containing two different starter supplies satisfies the loading target. Repeated purchases of the same good still count as one supply type. This keeps the activity focused on an accurate manifest instead of repeated clicking.

Market and Route share the same derived rank. Each page shows the current rank, open-choice count, and live next-rank checklist. Future routes remain visible on the atlas as noninteractive locked trails, while future supplies stay outside the trading controls until unlocked.

## Reusable configuration

```ts
interface ChoiceProgressionDefinition {
  stages: readonly {
    id: string;
    title: string;
    description: string;
    requirements?: {
      minimumDiscoveredStalls?: number;
      minimumPurchasedGoodTypes?: number;
    };
    availableGoodIds: readonly string[];
    availableRouteIds: readonly string[];
  }[];
}
```

Projects that omit `choiceProgression` retain the prior behavior: every configured good and route is available. Later stages must retain all choices from earlier stages. Package validation rejects missing good/route references, empty configured stage lists, later stages without a positive requirement, duplicate stage IDs, and stages that remove an earlier choice.

Rank is derived from the append-only ledger and recorded market discoveries. No parallel unlock state or browser-only flag is stored. The domain trade preview and route command reject locked IDs, so direct commands and stale drafts cannot bypass the interface. The registered reusable capability ID is `choiceProgression`.

Frontier Trading uses schema/template version `1.2` and project version `1.1.0`. The project-version change intentionally begins a clean attempt because the available decision space and startup sequence changed.

## Verification

- Domain tests cover starter choices, a two-supply manifest unlocking the full network, command rejection, and compatibility for projects without progression.
- UI tests cover rank guidance, locked atlas routes, and immediate Market/Route updates.
- Package tests cover invalid progression references and noncumulative stages.
