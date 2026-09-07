import { Component, computed, inject, input } from '@angular/core';

import { SIMULATION_DECISION_CONFIG } from '../../runtime/simulation-decision.tokens';

export interface WagonCargoItem {
  readonly goodId: string;
  readonly name: string;
  readonly quantity: number;
  readonly packageKind?: 'sack' | 'crate' | 'bale' | 'coil';
}

@Component({
  selector: 'app-illustrated-wagon',
  templateUrl: './illustrated-wagon.component.html',
  styleUrl: './illustrated-wagon.component.scss',
})
export class IllustratedWagonComponent {
  private readonly config = inject(SIMULATION_DECISION_CONFIG);
  readonly loadPercent = input(0);
  readonly cargo = input<readonly WagonCargoItem[]>([]);
  readonly moving = input(false);
  readonly strained = input(false);
  readonly compact = input(false);
  readonly transportName = input('Prairie Wagon');
  readonly vehicleImageUrl = computed(() => this.config.visualTheme?.vehicleImageUrl);
  readonly vehicleImageAlt = computed(
    () => this.config.visualTheme?.vehicleImageAlt ?? `${this.transportName()} carrying cargo`,
  );

  readonly visibleCargo = computed(() => {
    return this.cargo()
      .filter((item) => item.quantity > 0)
      .slice(0, 5)
      .map((item, index) => {
        const packageKind = item.packageKind ?? 'crate';
        const pieceCount =
          item.quantity === 1 ? 1 : item.quantity <= 3 ? 2 : item.quantity <= 6 ? 3 : 4;
        return {
          ...item,
          packageKind,
          asset: this.config.visualTheme?.cargoPackageAssets?.[packageKind],
          pieces: Array.from({ length: pieceCount }, (_, piece) => piece),
          left: 2 + index * 19,
          bottom: index % 2 === 0 ? 0 : 5,
          rotate: ((index % 3) - 1) * 2,
          zIndex: 10 + index,
        };
      });
  });

  readonly bodyDrop = computed(() => Math.min(5, Math.max(0, this.loadPercent()) * 0.05));
  readonly transportClass = computed(() => {
    const name = this.transportName().toLowerCase();
    if (name.includes('handcart')) return 'handcart';
    if (name.includes('mule')) return 'mule';
    if (name.includes('freight')) return 'freight';
    return 'prairie';
  });
}
