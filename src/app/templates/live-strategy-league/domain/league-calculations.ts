import type { LeagueCalculationModel } from './league.models';

const money = (value: number) => Math.round(value * 100) / 100;
const market: LeagueCalculationModel = {
  id: 'market-v1',
  cost: (d, world) => money(d['production'] * world['cost'] + d['marketing']),
  budget: state => state['cash'],
  validate: c => ['price', 'production', 'marketing'].every(id => c.decisions.some(d => d.id === id)) &&
    ['cash', 'sold', 'profit'].every(id => Number.isFinite(c.initialState[id])) &&
    c.decisions.every(d => d.min >= 0) && c.rounds.every(r => r.world['demand'] > 0 && r.world['cost'] >= 0),
  calculate(state, d, world) {
    const demand = Math.max(0, world['demand'] - d['price'] * 12 + d['marketing'] / 8);
    const sold = Math.floor(Math.min(d['production'], demand));
    const profit = money(sold * d['price'] - d['production'] * world['cost'] - d['marketing']);
    return { state: { cash: money(state['cash'] + profit), sold, profit }, scoreDelta: profit,
      explanation: `${sold} sold × $${d['price']} − ${d['production']} produced × $${world['cost']} − $${d['marketing']} marketing = $${profit} profit.` };
  },
};
const resource: LeagueCalculationModel = {
  id: 'resource-v1',
  cost: d => d['water'] + d['food'] + d['shelter'],
  budget: state => state['reserve'],
  validate: c => ['water', 'food', 'shelter'].every(id => c.decisions.some(d => d.id === id)) &&
    ['reserve', 'wellbeing', 'protected'].every(id => Number.isFinite(c.initialState[id])) &&
    c.decisions.every(d => d.min >= 0) && c.rounds.every(r => r.world['rainfall'] >= 0 && r.world['exposure'] >= 0),
  calculate(state, d, world) {
    const protectedCount = Math.min(100, d['shelter'] * 5);
    const wellbeing = Math.round(Math.max(0, Math.min(100,
      Math.min(d['water'] * world['rainfall'], d['food']) * 4 - world['exposure'] * (1 - protectedCount / 100))));
    const reserve = state['reserve'] - d['water'] - d['food'] - d['shelter'];
    return { state: { reserve, wellbeing, protected: protectedCount }, scoreDelta: wellbeing,
      explanation: `Wellbeing ${wellbeing}: food and rain-adjusted water support the community; shelter reduces exposure. ${reserve} supplies remain.` };
  },
};

const models = new Map([market, resource].map(model => [model.id, model]));
export function requireLeagueModel(id: string): LeagueCalculationModel {
  const model = models.get(id);
  if (!model) throw new Error(`CAPABILITY_NOT_INSTALLED: Calculation model ${id}.`);
  return model;
}

export function decisionCost(modelId: string, d: Record<string, number>, world: Record<string, number>): number {
  return requireLeagueModel(modelId).cost(d, world);
}
export function availableBudget(modelId: string, state: Record<string, number>): number {
  return requireLeagueModel(modelId).budget(state);
}
