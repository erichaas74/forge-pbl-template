import { Component, computed, inject, input, signal } from '@angular/core';
import { choiceProgression } from '../../domain/choice-progression';
import { marketPrice, marketStockRemaining } from '../../domain/simulation-decision.engine';
import { tradeWorldPriceBps } from '../../domain/trade-world.engine';
import type { RouteDefinition } from '../../domain/simulation-decision.models';
import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';

@Component({
  selector: 'app-route-economy-panel',
  template: `
    <section class="company-ledger" aria-label="Supplies, prices and profits">
      <div class="ledger-heading">
        <span>YOUR TRADING COMPANY</span>
        <h2>Supplies & profits</h2>
      </div>
      <dl class="company-totals">
        <div>
          <dt>Cash on hand</dt>
          <dd>{{ runtime.money(runtime.cash()) }}</dd>
        </div>
        <div [class.loss]="runtime.results().realizedTradeProfitCents < 0">
          <dt>Profit on goods sold</dt>
          <dd>{{ runtime.money(runtime.results().realizedTradeProfitCents, true) }}</dd>
        </div>
      </dl>
      <div class="cargo-heading">
        <strong>{{ runtime.transport()?.name }} supplies</strong
        ><span>{{ runtime.usedCargo() }} / {{ runtime.capacity() }} spaces</span>
      </div>
      <progress
        [value]="runtime.usedCargo()"
        [max]="runtime.capacity()"
        aria-label="Wagon cargo capacity used"
      ></progress>
      <ul class="cargo-list">
        @for (item of runtime.state().inventory; track item.goodId) {
          <li>
            <span>{{ goodName(item.goodId) }}</span
            ><strong>× {{ item.quantity }}</strong>
          </li>
        } @empty {
          <li class="empty-cargo">Your wagon is empty. Visit a shop to load supplies.</li>
        }
      </ul>
      <details class="profit-breakdown">
        <summary>
          Net profit & costs
          <strong>{{ runtime.money(runtime.results().netProfitCents, true) }}</strong>
        </summary>
        <p>
          Net profit compares your cash with the starting fund. Unsold supplies are listed
          separately.
        </p>
        <dl>
          <div>
            <dt>Goods purchased</dt>
            <dd>{{ runtime.money(runtime.results().goodsPurchasedCents) }}</dd>
          </div>
          <div>
            <dt>Transport & travel</dt>
            <dd>
              {{
                runtime.money(
                  runtime.results().transportCostCents + runtime.results().supplyCostsCents
                )
              }}
            </dd>
          </div>
          <div>
            <dt>Sales revenue</dt>
            <dd>{{ runtime.money(runtime.results().salesRevenueCents) }}</dd>
          </div>
          <div>
            <dt>Unsold cargo resale here</dt>
            <dd>{{ runtime.money(runtime.cargoValue()) }}</dd>
          </div>
        </dl>
      </details>
      <section class="price-board" aria-label="Live market prices">
        <label for="price-town">MARKET BOARD</label>
        <select
          id="price-town"
          [value]="marketLocationId()"
          (change)="chosenMarket.set($any($event.target).value)"
        >
          @for (location of runtime.config.locations; track location.id) {
            <option [value]="location.id">
              {{ location.shortName
              }}{{ location.id === runtime.state().currentLocationId ? ' · you are here' : '' }}
            </option>
          }
        </select>
        <p>Posted price per unit · purchases may earn a quantity discount.</p>
        <table>
          <thead>
            <tr>
              <th>Goods / stock</th>
              <th>Buy</th>
              <th>Sell</th>
            </tr>
          </thead>
          <tbody>
            @for (row of prices(); track row.id) {
              <tr>
                <th scope="row">
                  {{ row.name
                  }}<small
                    >{{ row.stock }} available
                    @if (row.change) {
                      <em [class.relief]="row.change < 0"
                        >{{ row.change > 0 ? '↑ +' : '↓ ' }}{{ row.change }}%</em
                      >
                    }
                  </small>
                </th>
                <td>{{ row.buy === undefined ? '—' : runtime.money(row.buy) }}</td>
                <td>{{ row.sell === undefined ? '—' : runtime.money(row.sell) }}</td>
              </tr>
            }
          </tbody>
        </table>
      </section>
      @if (runtime.world(); as world) {
        <section class="world-brief" aria-label="Latest market report">
          <small>{{ runtime.worldStatus() }} · {{ runtime.worldStepName }} {{ world.tick }}</small>
          <p role="status" aria-atomic="true">{{ latestNews() }}</p>
          <span>Open World in the header for weather, freight and price changes.</span>
        </section>
      }
    </section>
  `,
  styleUrl: './route-economy-panel.component.scss',
})
export class RouteEconomyPanelComponent {
  readonly runtime = inject(SimulationDecisionRuntimeService);
  readonly route = input<RouteDefinition>();
  readonly chosenMarket = signal('');
  readonly marketLocationId = computed(
    () =>
      this.chosenMarket() || this.route()?.toLocationId || this.runtime.state().currentLocationId,
  );
  readonly prices = computed(() => {
    const state = this.runtime.state();
    const locationId = this.marketLocationId();
    const goods = new Set(
      choiceProgression(this.runtime.config, state).currentStage.availableGoodIds,
    );
    state.inventory.forEach((item) => goods.add(item.goodId));
    return this.runtime.config.goods
      .filter((good) => goods.has(good.id))
      .map((good) => ({
        id: good.id,
        name: good.name,
        buy: marketPrice(this.runtime.config, locationId, good.id, 'buy', state),
        sell: marketPrice(this.runtime.config, locationId, good.id, 'sell', state),
        stock: marketStockRemaining(this.runtime.config, state, locationId, good.id),
        change: (tradeWorldPriceBps(state.tradeWorld, locationId, good.id) - 10000) / 100,
      }));
  });
  readonly latestNews = computed(() => {
    const news = this.runtime.world()?.history.at(-1);
    return news
      ? `${news.title} · ${news.locationIds.map((id) => this.runtime.config.locations.find((location) => location.id === id)?.shortName ?? id).join(', ')}`
      : `${this.runtime.config.tradeWorld?.shipments.length ?? 0} freight caravans are on the roads.`;
  });
  goodName(id: string): string {
    return this.runtime.config.goods.find((good) => good.id === id)?.name ?? id;
  }
}
