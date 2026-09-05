import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';
import { IllustratedWagonComponent } from '../art/illustrated-wagon.component';

@Component({
  selector: 'app-simulation-company-setup',
  imports: [FormsModule, IllustratedWagonComponent],
  templateUrl: './company-setup.component.html',
  styleUrl: './company-setup.component.scss',
})
export class SimulationCompanySetupComponent {
  readonly runtime = inject(SimulationDecisionRuntimeService);
  readonly companyName = signal(this.randomCompanyName());
  readonly emblemId = signal(this.runtime.config.emblems[0]?.id ?? '');
  readonly transportId = signal(this.runtime.config.transports[0]?.id ?? '');
  readonly selectedTransport = computed(() =>
    this.runtime.config.transports.find((item) => item.id === this.transportId()),
  );
  readonly remainingBudget = computed(
    () => this.runtime.config.startingCashCents - (this.selectedTransport()?.costCents ?? 0),
  );

  start(): void {
    this.runtime.startCompany(this.companyName(), this.emblemId(), this.transportId());
  }

  randomizeCompanyName(): void {
    this.companyName.set(this.randomCompanyName());
  }

  private randomCompanyName(): string {
    const suggestions = this.runtime.config.companyNameSuggestions ?? [];
    return suggestions[Math.floor(Math.random() * suggestions.length)] ?? '';
  }
}
