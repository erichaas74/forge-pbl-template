import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { marketAt } from '../../domain/simulation-decision.engine';
import type { ChoiceProgressionRequirement } from '../../domain/simulation-decision.models';
import { SIMULATION_DECISION_CONFIG } from '../../runtime/simulation-decision.tokens';
import type {
  BuilderPathDefinition,
  SimulationDecisionBuilderInfoDefinition,
} from './simulation-decision-builder-info.models';

@Component({
  selector: 'app-simulation-decision-builder-info',
  imports: [FormsModule, RouterLink],
  templateUrl: './simulation-decision-builder-info.component.html',
  styleUrl: './simulation-decision-builder-info.component.scss',
})
export class SimulationDecisionBuilderInfoComponent {
  private readonly route = inject(ActivatedRoute);
  readonly config = inject(SIMULATION_DECISION_CONFIG);
  readonly info = this.route.snapshot.data[
    'builderInfo'
  ] as SimulationDecisionBuilderInfoDefinition;
  readonly pathQuery = signal('');
  readonly copiedPath = signal<string | undefined>(undefined);
  readonly snapshotAligned = computed(
    () => this.info.snapshotVersion === this.config.projectVersion,
  );
  readonly progressionStages = computed(() =>
    (this.config.choiceProgression?.stages ?? []).map((stage, index) => ({
      ...stage,
      number: index + 1,
      requirement: this.requirementLabel(stage.requirements),
    })),
  );
  readonly routeRows = computed(() =>
    this.config.routes.map((route) => ({
      ...route,
      from: this.locationName(route.fromLocationId),
      to: this.locationName(route.toLocationId),
      market: marketAt(this.config, route.toLocationId)?.name ?? 'No market configured',
      firstStage:
        this.config.choiceProgression?.stages.find((stage) =>
          stage.availableRouteIds.includes(route.id),
        )?.title ?? 'Always open',
    })),
  );
  readonly filteredPaths = computed(() => {
    const query = this.pathQuery().trim().toLowerCase();
    return query.length === 0
      ? this.info.paths
      : this.info.paths.filter((item) =>
          `${item.label} ${item.path} ${item.purpose} ${item.kind}`.toLowerCase().includes(query),
        );
  });
  readonly currentSettings = computed(() => [
    { label: 'Project version', value: this.config.projectVersion },
    {
      label: 'Schema / template',
      value: `${this.config.schemaVersion} / ${this.config.template.version}`,
    },
    { label: 'Starting cash', value: this.money(this.config.startingCashCents) },
    { label: 'Profit target', value: this.money(this.config.profitTargetCents) },
    { label: 'Reserve target', value: this.money(this.config.reserveTargetCents) },
    { label: 'Season length', value: `${this.config.maxSeasonDays} days` },
    {
      label: 'Goods / markets',
      value: `${this.config.goods.length} / ${this.config.markets.length}`,
    },
    {
      label: 'Routes / events',
      value: `${this.config.routes.length} / ${this.config.events.length}`,
    },
    { label: 'Transports', value: `${this.config.transports.length}` },
    { label: 'Reflection prompts', value: `${this.config.reportSections.length}` },
    {
      label: 'Forecast gate',
      value: this.config.routeForecastChallenge?.requiredBeforeDeparture
        ? `Required · ±${this.config.routeForecastChallenge.toleranceCents}¢`
        : 'Not required',
    },
    {
      label: 'Transaction math',
      value: this.config.transactionMath?.answerRequired
        ? `Required · ${this.transactionDiscountSummary()}`
        : 'Not required',
    },
    { label: 'Score', value: '40 Trading · 40 Math · 20 Explain' },
  ]);

  async copyPath(item: BuilderPathDefinition): Promise<void> {
    try {
      await navigator.clipboard.writeText(item.path);
      this.copiedPath.set(item.path);
      window.setTimeout(() => {
        if (this.copiedPath() === item.path) this.copiedPath.set(undefined);
      }, 1600);
    } catch {
      this.copiedPath.set(undefined);
    }
  }

  async copySnapshot(): Promise<void> {
    const snapshot = {
      project: `${this.config.projectId}@${this.config.projectVersion}`,
      schemaVersion: this.config.schemaVersion,
      templateVersion: this.config.template.version,
      currentMode: this.info.currentMode,
      studentPath: this.info.studentPath,
      settings: this.currentSettings(),
      progression: this.progressionStages(),
      routes: this.routeRows().map(
        ({ id, from, to, estimatedDays, supplyCostCents, firstStage }) => ({
          id,
          from,
          to,
          estimatedDays,
          supplyCostCents,
          firstStage,
        }),
      ),
      roadmap: this.info.roadmap,
    };
    try {
      await navigator.clipboard.writeText(JSON.stringify(snapshot, null, 2));
      this.copiedPath.set('__snapshot__');
      window.setTimeout(() => {
        if (this.copiedPath() === '__snapshot__') this.copiedPath.set(undefined);
      }, 1600);
    } catch {
      this.copiedPath.set(undefined);
    }
  }

  money(cents: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
      cents / 100,
    );
  }

  private transactionDiscountSummary(): string {
    const tiers = [...(this.config.transactionMath?.purchaseDiscountTiers ?? [])].sort(
      (left, right) => left.minimumQuantity - right.minimumQuantity,
    );
    return tiers
      .map((tier, index) => {
        const next = tiers[index + 1];
        const quantities = next
          ? `${tier.minimumQuantity}–${next.minimumQuantity - 1}`
          : `${tier.minimumQuantity}+`;
        return `${quantities} units: ${tier.discountPercent}%`;
      })
      .join(' · ');
  }

  private locationName(locationId: string): string {
    return (
      this.config.locations.find((location) => location.id === locationId)?.shortName ?? locationId
    );
  }

  private requirementLabel(requirements: ChoiceProgressionRequirement | undefined): string {
    if (requirements === undefined) return 'Starts open';
    const labels: string[] = [];
    if (requirements.minimumDiscoveredStalls !== undefined) {
      labels.push(`Visit ${requirements.minimumDiscoveredStalls} shops`);
    }
    if (requirements.minimumPurchasedGoodTypes !== undefined) {
      labels.push(`Buy ${requirements.minimumPurchasedGoodTypes} kinds of goods`);
    }
    return labels.join(' + ') || 'No gate';
  }
}
