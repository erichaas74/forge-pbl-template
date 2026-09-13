import { Component, computed, inject } from '@angular/core';
import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';

@Component({
  selector: 'app-trade-world-panel',
  template: `
    @if (runtime.config.tradeWorld; as config) {
      <details class="world-menu">
        <summary>
          World
          {{
            runtime.turnBasedWorld
              ? '· Turn ' + (runtime.world()?.tick ?? 0)
              : runtime.world()?.paused
                ? 'Ⅱ'
                : '◆'
          }}
        </summary>
        <div class="news-body">
          <div class="world-controls">
            <strong
              >◆ {{ runtime.worldStatus() }}
              <small>· {{ runtime.worldStepName }} {{ runtime.world()?.tick ?? 0 }}</small></strong
            >
            @if (!runtime.turnBasedWorld) {
              <button
                type="button"
                (click)="runtime.toggleWorldPause()"
                [attr.aria-pressed]="runtime.world()?.paused"
                [disabled]="
                  !['planning', 'active', 'event_pending'].includes(runtime.state().status)
                "
              >
                {{ runtime.world()?.paused ? 'Resume world' : 'Pause world' }}
              </button>
              <button
                type="button"
                [disabled]="!runtime.worldRunning()"
                (click)="runtime.pulseWorld()"
              >
                Advance world
              </button>
            }
          </div>
          <h2>Market news · {{ runtime.world()?.effects?.length ?? 0 }} active</h2>
          <p class="news-ticker" role="status" aria-atomic="true">{{ latestNews() }}</p>
          <p>
            @if (runtime.turnBasedWorld) {
              Choose your route and buy supplies, then confirm departure to run a turn. Each “Travel
              next day” advances freight, weather and prices once more. Take your time between
              turns: shopping, math and checkpoint decisions hold prices steady.
            } @else {
              Events and freight advance every {{ config.tickIntervalMs / 1000 }} seconds while this
              game is visible. They pause for your math and decisions. Your travel days advance with
              your travel button.
            }
          </p>
          <h3>On the roads</h3>
          <ul>
            @for (shipment of shipments(); track shipment.id) {
              <li>
                <strong>{{ shipment.name }}</strong> → {{ shipment.destination }} ·
                {{ shipment.progress }}% of this leg · {{ shipment.deliveries }} deliveries
              </li>
            }
          </ul>
          <h3>Current price changes</h3>
          @for (effect of runtime.world()?.effects ?? []; track effect.id) {
            <article [attr.data-kind]="effect.kind">
              <strong>{{ effect.kind === 'shipment' ? '↓' : '↑' }} {{ effect.title }}</strong>
              <p>{{ effect.description }}</p>
              <p>
                {{ locations(effect.locationIds) }} · {{ goods(effect.goodIds) }} ·
                {{ effect.priceChangeBps > 0 ? '+' : '' }}{{ effect.priceChangeBps / 100 }}% ·
                {{ effect.expiresTick - (runtime.world()?.tick ?? 0) }}
                {{ runtime.turnBasedWorld ? 'turns' : 'pulses' }} left
              </p>
            </article>
          } @empty {
            <p>No disruptions yet. Watch for weather reports and freight arrivals.</p>
          }
          <details>
            <summary>Recent world events</summary>
            @for (event of history(); track event.id) {
              <p>
                {{ runtime.worldStepName }} {{ event.startedTick }} · {{ event.title }} ·
                {{ locations(event.locationIds) }}
              </p>
            }
          </details>
        </div>
      </details>
    }
  `,
  styleUrl: './trade-world-panel.component.scss',
})
export class TradeWorldPanelComponent {
  readonly runtime = inject(SimulationDecisionRuntimeService);
  readonly history = computed(() => [...(this.runtime.world()?.history ?? [])].reverse());
  readonly latestNews = computed(() => {
    const event = this.history()[0];
    return event
      ? `${event.title} · ${this.locations(event.locationIds)} · ${event.expiresTick <= (this.runtime.world()?.tick ?? 0) ? 'Price effect ended' : `${event.priceChangeBps > 0 ? '+' : ''}${event.priceChangeBps / 100}% on affected goods`}`
      : `${this.runtime.config.tradeWorld?.shipments.length ?? 0} supply caravans are on the roads. Open Market news to follow their deliveries.`;
  });
  readonly shipments = computed(() =>
    (this.runtime.world()?.shipments ?? []).map((shipment) => {
      const spec = this.runtime.config.tradeWorld!.shipments.find(
        (item) => item.id === shipment.id,
      )!;
      const route = this.runtime.config.routes.find((item) => item.id === shipment.routeId)!;
      return {
        ...shipment,
        name: spec.name,
        progress: Math.max(0, Math.round((shipment.progressTicks / spec.travelTicks) * 100)),
        destination: this.locations([
          shipment.direction === 'outbound' ? route.toLocationId : route.fromLocationId,
        ]),
      };
    }),
  );
  locations(ids: readonly string[]): string {
    return ids
      .map((id) => this.runtime.config.locations.find((item) => item.id === id)?.shortName ?? id)
      .join(', ');
  }
  goods(ids: readonly string[]): string {
    return ids
      .map((id) => this.runtime.config.goods.find((item) => item.id === id)?.name ?? id)
      .join(', ');
  }
}
