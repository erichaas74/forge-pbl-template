export type SimulationStatus =
  | 'not_started'
  | 'planning'
  | 'active'
  | 'event_pending'
  | 'season_complete'
  | 'submitted'
  | 'paused_by_teacher'
  | 'needs_revision';

export type SimulationView =
  'setup' | 'market' | 'route' | 'cargo' | 'events' | 'ledger' | 'results' | 'report' | 'teacher';

export type RiskLevel = 'low' | 'moderate' | 'high';
export type LedgerEntryType =
  | 'startingCapital'
  | 'transport'
  | 'purchase'
  | 'sale'
  | 'travel'
  | 'eventIncome'
  | 'eventExpense'
  | 'adjustment';

export interface TransportDefinition {
  id: string;
  name: string;
  icon: string;
  costCents: number;
  cargoCapacity: number;
  travelSpeed: number;
  description: string;
  vulnerability: string;
  compatibleTerrain: readonly string[];
}

export interface GoodDefinition {
  id: string;
  name: string;
  icon: string;
  category: string;
  baseBuyPriceCents: number;
  unitCargo: number;
  description: string;
}

export interface LocationDefinition {
  id: string;
  name: string;
  shortName: string;
  kind: 'fort' | 'town' | 'crossing' | 'pass' | 'camp' | 'post';
  mapX: number;
  mapY: number;
  context: string;
}

export interface MarketGoodDefinition {
  goodId: string;
  availableQuantity: number;
  buyMultiplierBps: number;
  sellMultiplierBps: number;
  trend: 'higher' | 'lower' | 'same';
  note: string;
}

export interface MarketDefinition {
  id: string;
  locationId: string;
  name: string;
  statusText: string;
  goods: readonly MarketGoodDefinition[];
}

export interface RouteDefinition {
  id: string;
  fromLocationId: string;
  toLocationId: string;
  name: string;
  distanceMiles: number;
  estimatedDays: number;
  terrain: readonly string[];
  risk: RiskLevel;
  supplyCostCents: number;
  demandClue: string;
  path: string;
}

export interface MathChallengeDefinition {
  prompt: string;
  hint: string;
  answer: number;
  unit: string;
}

export interface EventChoiceDefinition {
  id: string;
  label: string;
  description: string;
  cashChangeCents: number;
  dayChange: number;
  inventoryLossQuantity?: number;
  riskLabel: string;
  outcome: string;
}

export interface SimulationEventDefinition {
  id: string;
  type: 'positive' | 'negative' | 'decision' | 'math';
  title: string;
  icon: string;
  story: string;
  facts: readonly string[];
  choices: readonly EventChoiceDefinition[];
  mathChallenge?: MathChallengeDefinition;
}

export interface ReportSectionDefinition {
  id: string;
  title: string;
  prompt: string;
  evidenceMinimum: number;
  calculationRequired?: boolean;
}

export interface SimulationDecisionConfig {
  schemaVersion: string;
  template: { id: 'simulation-decision'; version: string };
  projectId: string;
  projectVersion: string;
  title: string;
  subtitle: string;
  gradeLabel: string;
  mission: string;
  startingCashCents: number;
  reserveTargetCents: number;
  profitTargetCents: number;
  startingLocationId: string;
  maxSeasonDays: number;
  emblems: readonly { id: string; label: string; symbol: string }[];
  transports: readonly TransportDefinition[];
  goods: readonly GoodDefinition[];
  locations: readonly LocationDefinition[];
  markets: readonly MarketDefinition[];
  routes: readonly RouteDefinition[];
  events: readonly SimulationEventDefinition[];
  reportSections: readonly ReportSectionDefinition[];
}

export interface AcquisitionLot {
  ledgerEntryId: string;
  locationId: string;
  day: number;
  quantity: number;
  unitCostCents: number;
}

export interface InventoryItem {
  goodId: string;
  quantity: number;
  lots: readonly AcquisitionLot[];
}

export interface LedgerLineDetail {
  goodId?: string;
  quantity?: number;
  unitPriceCents?: number;
  costBasisCents?: number;
}

export interface LedgerEntry {
  id: string;
  day: number;
  locationId: string;
  type: LedgerEntryType;
  description: string;
  cashChangeCents: number;
  cashBalanceCents: number;
  cargoDelta: number;
  details?: LedgerLineDetail;
  createdAt: string;
}

export interface RouteHistoryEntry {
  id: string;
  routeId: string;
  dayStarted: number;
  dayArrived?: number;
  rationale: string;
  knownInfoSnapshot: RouteDefinition;
  eventIdsTriggered: readonly string[];
}

export interface EventHistoryEntry {
  id: string;
  eventId: string;
  routeId?: string;
  locationId: string;
  day: number;
  choiceId: string;
  reasoning: string;
  mathAnswer?: number;
  mathCorrect?: boolean;
  cashBeforeCents: number;
  cashAfterCents: number;
  cargoBefore: number;
  cargoAfter: number;
  outcome: string;
}

export interface ActiveTravel {
  routeId: string;
  progressDays: number;
  eventIds: readonly string[];
  resolvedEventIds: readonly string[];
}

export interface EvidenceReference {
  id: string;
  sourceType: 'ledger' | 'route' | 'event' | 'result' | 'notebook';
  sourceId: string;
  title: string;
  summary: string;
  pinnedAt: string;
}

export interface ReportSectionState {
  response: string;
  evidenceIds: readonly string[];
  calculation: string;
}

export interface FinalStrategyReportState {
  status: 'draft' | 'ready_to_submit' | 'submitted' | 'needs_revision';
  sections: Readonly<Record<string, ReportSectionState>>;
  revisionNumber: number;
  submittedAt?: string;
}

export interface SimulationDecisionState {
  simulationId: string;
  projectId: string;
  projectVersion: string;
  version: number;
  seed: number;
  difficulty: 'support' | 'standard' | 'challenge';
  status: SimulationStatus;
  lastView: SimulationView;
  pausedFromStatus?: Exclude<SimulationStatus, 'paused_by_teacher'>;
  companyName: string;
  emblemId: string;
  transportId?: string;
  currentLocationId: string;
  currentDay: number;
  ledger: readonly LedgerEntry[];
  inventory: readonly InventoryItem[];
  routeHistory: readonly RouteHistoryEntry[];
  activeTravel?: ActiveTravel;
  pendingEventId?: string;
  eventHistory: readonly EventHistoryEntry[];
  evidence: readonly EvidenceReference[];
  ledgerAnnotations: Readonly<Record<string, string>>;
  report: FinalStrategyReportState;
  lastSavedAt: string;
  completedAt?: string;
}

export interface TradeLineInput {
  goodId: string;
  direction: 'buy' | 'sell';
  quantity: number;
}

export interface TradePreview {
  valid: boolean;
  errors: readonly string[];
  cashBeforeCents: number;
  cashAfterCents: number;
  cargoBefore: number;
  cargoAfter: number;
  netCashChangeCents: number;
}

export interface TradingSeasonResults {
  startingCashCents: number;
  endingCashCents: number;
  transportCostCents: number;
  goodsPurchasedCents: number;
  supplyCostsCents: number;
  eventIncomeCents: number;
  eventExpensesCents: number;
  salesRevenueCents: number;
  realizedCostBasisCents: number;
  realizedTradeProfitCents: number;
  netProfitCents: number;
  unsoldInventoryValueCents: number;
  distanceTraveled: number;
  tradeCount: number;
  score: number;
  performanceLabel: string;
}

export type SimulationDecisionAction =
  | { type: 'view.changed'; view: SimulationView }
  | { type: 'company.started'; companyName: string; emblemId: string; transportId: string }
  | { type: 'trade.committed'; lines: readonly TradeLineInput[] }
  | { type: 'route.committed'; routeId: string; rationale: string }
  | { type: 'travel.advanced' }
  | {
      type: 'event.resolved';
      choiceId: string;
      reasoning: string;
      mathAnswer?: number;
    }
  | { type: 'season.completed' }
  | { type: 'evidence.pinned'; reference: Omit<EvidenceReference, 'pinnedAt'> }
  | { type: 'evidence.unpinned'; evidenceId: string }
  | { type: 'ledger.annotated'; ledgerEntryId: string; note: string }
  | {
      type: 'report.sectionUpdated';
      sectionId: string;
      response: string;
      evidenceIds: readonly string[];
      calculation: string;
    }
  | { type: 'report.submitted' }
  | { type: 'teacher.pauseToggled' }
  | { type: 'teacher.eventInjected'; eventId: string }
  | { type: 'teacher.eventSkipped' }
  | { type: 'teacher.seedChanged'; seed: number }
  | { type: 'teacher.difficultyChanged'; difficulty: SimulationDecisionState['difficulty'] }
  | { type: 'simulation.restarted' };

export interface SimulationDecisionResult {
  state: SimulationDecisionState;
  errors: readonly string[];
}
