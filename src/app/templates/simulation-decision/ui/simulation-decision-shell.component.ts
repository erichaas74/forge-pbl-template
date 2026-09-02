import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { SimulationView } from '../domain/simulation-decision.models';
import { SimulationDecisionRuntimeService } from '../runtime/simulation-decision-runtime.service';
import { SimulationCargoViewComponent } from './pages/cargo-view.component';
import { SimulationCompanySetupComponent } from './pages/company-setup.component';
import { SimulationEventDecisionComponent } from './pages/event-decision.component';
import { SimulationMarketViewComponent } from './pages/market-view.component';
import { SimulationRouteMapComponent } from './pages/route-map.component';
import { SimulationSeasonResultsComponent } from './pages/season-results.component';
import { SimulationStrategyReportComponent } from './pages/strategy-report.component';
import { SimulationTeacherControlComponent } from './pages/teacher-control.component';
import { SimulationTradeLedgerComponent } from './pages/trade-ledger.component';

interface NavigationItem {
  view: SimulationView;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-simulation-decision-shell',
  imports: [
    RouterLink,
    SimulationCargoViewComponent,
    SimulationCompanySetupComponent,
    SimulationEventDecisionComponent,
    SimulationMarketViewComponent,
    SimulationRouteMapComponent,
    SimulationSeasonResultsComponent,
    SimulationStrategyReportComponent,
    SimulationTeacherControlComponent,
    SimulationTradeLedgerComponent,
  ],
  templateUrl: './simulation-decision-shell.component.html',
  styleUrl: './simulation-decision-shell.component.scss',
})
export class SimulationDecisionShellComponent {
  readonly runtime = inject(SimulationDecisionRuntimeService);
  readonly helpOpen = signal(false);
  readonly teacherConfirmOpen = signal(false);
  readonly navigation: readonly NavigationItem[] = [
    { view: 'market', label: 'Market', icon: '▦' },
    { view: 'route', label: 'Route', icon: '⌁' },
    { view: 'cargo', label: 'Cargo', icon: '▣' },
    { view: 'events', label: 'Journey', icon: '!' },
    { view: 'ledger', label: 'Ledger', icon: '≡' },
    { view: 'results', label: 'Results', icon: '★' },
    { view: 'report', label: 'Report', icon: '✎' },
  ];
  readonly phase = computed(() => {
    const day = this.runtime.state().currentDay;
    if (
      this.runtime.state().status === 'season_complete' ||
      this.runtime.state().status === 'submitted'
    ) {
      return 'Season complete';
    }
    if (day <= 3) return 'Planning';
    if (day <= 7) return 'Trading';
    if (day <= 10) return 'Expansion';
    return 'Final push';
  });
  readonly cargoPercent = computed(() =>
    this.runtime.capacity() === 0
      ? 0
      : Math.min(100, Math.round((this.runtime.usedCargo() / this.runtime.capacity()) * 100)),
  );

  navigate(view: SimulationView): void {
    this.runtime.navigate(view);
  }

  locked(view: SimulationView): boolean {
    return (
      view === 'results' &&
      this.runtime.state().status !== 'season_complete' &&
      this.runtime.state().status !== 'submitted'
    );
  }

  teacherTools(): void {
    if (this.runtime.state().lastView === 'teacher') {
      this.runtime.navigate(this.runtime.state().pendingEventId ? 'events' : 'market');
      return;
    }
    this.teacherConfirmOpen.set(true);
  }

  enterTeacherTools(): void {
    this.teacherConfirmOpen.set(false);
    this.runtime.navigate('teacher');
  }

  saveLabel(): string {
    const labels = {
      saved: 'Saved locally',
      saving: 'Saving…',
      offline_local: 'Saved on device',
      save_failed: 'Save failed',
    } as const;
    return labels[this.runtime.saveState()];
  }
}
