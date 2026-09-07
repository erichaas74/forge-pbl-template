import type { DecisionSceneConfig, OpeningChoice } from './decision-scene.models';

export function cargoTotals(startingCoins: number, choices: readonly OpeningChoice[]) {
  const cost = choices.reduce((sum, choice) => sum + (choice.cargo?.cost ?? 0), 0);
  const sale = choices.reduce((sum, choice) => sum + (choice.cargo?.sale ?? 0), 0);
  return {
    cost,
    sale,
    remaining: startingCoins - cost,
    cash: startingCoins - cost + sale,
    profit: sale - cost,
  };
}

/** Combine configured offers without changing official project resources. */
export function cargoOutcome(
  config: DecisionSceneConfig,
  choices: readonly OpeningChoice[],
): OpeningChoice {
  const totals = cargoTotals(config.cargo!.startingCoins, choices);
  return {
    ...choices[0],
    label: choices.map((choice) => choice.cargo!.name).join(' + '),
    result: {
      ...choices[0].result,
      title: 'Your cargo reached the market.',
      text: choices.map((choice) => choice.result.text).join('\n\n'),
      surprise: 'TWO LOADS. ONE LEDGER.',
      evidence: `Practice trade: ${config.cargo!.startingCoins} − ${totals.cost} + ${totals.sale} = ${totals.cash} coins. ${totals.profit < 0 ? 'Loss' : 'Profit'}: ${Math.abs(totals.profit)} coins.`,
      metrics: [
        { label: 'Total cost', value: String(totals.cost) },
        { label: 'Total sales', value: String(totals.sale) },
        { label: 'Profit / loss', value: String(totals.profit) },
        { label: 'Cash now', value: String(totals.cash) },
      ],
    },
  };
}
