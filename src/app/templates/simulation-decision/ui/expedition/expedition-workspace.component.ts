import {
  Component,
  ElementRef,
  afterRenderEffect,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PROJECT_LESSON_FOCUS } from '../../../../shared/project-lessons/project-lesson-focus';
import { SimulationDecisionRuntimeService } from '../../runtime/simulation-decision-runtime.service';
import {
  createExpedition,
  expeditionCargo,
  expeditionPrice,
  expeditionTotals,
  reduceExpedition,
} from '../../domain/expedition-course.engine';
import { exampleExpedition } from '../../domain/expedition-course.example';
import type { ExpeditionAction, ExpeditionState } from '../../domain/expedition-course.models';
import { RouteAtlasComponent, type AtlasTrail } from '../map/route-atlas.component';
import type { CanvasTradeWorld } from '../map/route-canvas.models';
import { ExpeditionLedgerComponent } from './expedition-ledger.component';

@Component({
  selector: 'app-expedition-workspace',
  imports: [FormsModule, RouteAtlasComponent, ExpeditionLedgerComponent],
  templateUrl: './expedition-workspace.component.html',
  styleUrl: './expedition-workspace.component.scss',
})
export class ExpeditionWorkspaceComponent {
  readonly exampleMode = input(false);
  readonly hostGuide = input<() => void>();
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly runtime = inject(SimulationDecisionRuntimeService);
  readonly focus = inject(PROJECT_LESSON_FOCUS, { optional: true });
  readonly lesson = computed(() => this.focus?.());
  readonly week = computed(() => this.lesson()?.number ?? 1);
  readonly cycle = computed(
    () => this.runtime.config.expeditionCourse!.cycles[Math.floor((this.week() - 1) / 2)]!,
  );
  readonly ownState = computed(
    () =>
      this.runtime.state().expeditions?.[this.cycle().id] ??
      createExpedition(this.runtime.config, this.cycle()),
  );
  readonly surface = signal<'map' | 'shop' | 'ledger'>('map');
  readonly practice = signal(false);
  readonly examples = signal<Readonly<Record<string, ExpeditionState>>>({});
  readonly state = computed(() =>
    this.practice()
      ? (this.examples()[this.cycle().id] ?? exampleExpedition(this.runtime.config, this.cycle()))
      : this.ownState(),
  );
  readonly selectedRoute = signal('');
  readonly quantity = signal(1);
  readonly selectedGood = signal('');
  readonly reflectionDraft = signal('');
  readonly localError = signal('');
  readonly atlas = viewChild(RouteAtlasComponent);
  readonly money = this.runtime.money.bind(this.runtime);
  readonly goods = computed(() =>
    this.runtime.config.goods.filter((g) => this.cycle().goodIds.includes(g.id)),
  );
  readonly good = computed(
    () => this.goods().find((g) => g.id === this.selectedGood()) ?? this.goods()[0]!,
  );
  readonly cargo = computed(() => expeditionCargo(this.runtime.config, this.state()));
  readonly totals = computed(() => expeditionTotals(this.cycle(), this.state()));
  readonly location = computed(() =>
    this.runtime.config.locations.find((l) => l.id === this.state().locationId)!,
  );
  readonly roads = computed(() =>
    this.cycle().legs.map((leg) => ({
      ...this.runtime.config.routes.find((r) => r.id === leg.routeId)!,
      estimatedDays: leg.days,
      supplyCostCents: leg.costCents,
    })),
  );
  readonly locations = computed(() =>
    this.runtime.config.locations.filter((l) =>
      this.roads().some((r) => r.fromLocationId === l.id || r.toLocationId === l.id),
    ),
  );
  readonly route = computed(() =>
    this.roads().find((r) => r.id === (this.state().travel?.routeId ?? this.selectedRoute())),
  );
  readonly trails = computed<readonly AtlasTrail[]>(() =>
    this.roads().map((route) => ({
      route,
      compared: false,
      costLabel: this.money(route.supplyCostCents),
      state:
        this.state().travel?.routeId === route.id
          ? 'traveling'
          : !this.state().travel &&
              !this.state().returned &&
              route.fromLocationId === this.state().locationId
            ? 'available'
            : this.state().completedRoutes.includes(route.id)
              ? 'completed'
              : 'inactive',
    })),
  );
  readonly travel = computed(() => {
    const t = this.state().travel;
    return t ? { routeId: t.routeId, progress: t.elapsed / t.days, icon: 'wagon' } : undefined;
  });
  readonly hazard = computed(() =>
    this.cycle().hazards.find((h) => h.id === this.state().pendingHazardId),
  );
  readonly world = computed<CanvasTradeWorld>(() => {
    const h = this.hazard();
    const road = this.route();
    const a = this.locations().find((l) => l.id === road?.fromLocationId);
    const b = this.locations().find((l) => l.id === road?.toLocationId);
    return {
      tick: this.state().day,
      running: true,
      freight: [],
      conditions:
        h && a && b
          ? [
              {
                id: h.id,
                kind: h.kind,
                locations: [{ x: (a.mapX + b.mapX) / 2, y: (a.mapY + b.mapY) / 2 }],
              },
            ]
          : [],
    };
  });
  readonly visitedGoal = computed(() =>
    this.cycle().requiredLocationIds.map((id) => ({
      name: this.runtime.config.locations.find((l) => l.id === id)!.shortName,
      visited: this.state().visited.includes(id),
    })),
  );
  readonly packageAsset = computed(
    () =>
      this.runtime.config.visualTheme?.cargoPackageAssets?.[this.good().cargoPackage ?? 'crate'],
  );
  readonly buyPrice = computed(() =>
    expeditionPrice(this.runtime.config, this.state(), this.good().id, 'buy'),
  );
  readonly sellPrice = computed(() =>
    expeditionPrice(this.runtime.config, this.state(), this.good().id, 'sell'),
  );
  readonly held = computed(() => this.state().inventory[this.good().id]?.quantity ?? 0);
  readonly destinationPrices = computed(() => {
    const road = this.route();
    return road
      ? this.goods().map((g) => ({
          name: g.name,
          price: expeditionPrice(
            this.runtime.config,
            { ...this.state(), locationId: road.toLocationId },
            g.id,
            'sell',
          ),
        }))
      : [];
  });

  constructor() {
    afterRenderEffect(() => {
      this.cycle();
      const atlas = this.atlas();
      if (atlas) untracked(() => atlas.fitAll());
    });
    effect(() => {
      const week = this.week();
      this.surface.set(week % 2 === 0 ? 'ledger' : 'map');
      this.practice.set(false);
      this.selectedRoute.set('');
      this.localError.set('');
    });
    effect(() => {
      this.reflectionDraft.set(this.ownState().reflection);
    });
  }
  open(surface: 'map' | 'shop' | 'ledger'): void {
    this.surface.set(surface);
    this.localError.set('');
    if (surface !== 'ledger') this.practice.set(false);
    requestAnimationFrame(() =>
      this.element.nativeElement
        .querySelector<HTMLElement>('.shop-sign, .ledger-title, .route-action')
        ?.focus({ preventScroll: true }),
    );
  }
  selectRoute(id: string): void {
    const road = this.roads().find((r) => r.id === id);
    if (
      road?.fromLocationId === this.state().locationId &&
      !this.state().travel &&
      !this.state().returned
    )
      this.selectedRoute.set(id);
  }
  act(action: ExpeditionAction): void {
    this.localError.set('');
    if (this.exampleMode() && !this.practice()) {
      this.localError.set(
        'This is a worked example. Open Practice ledger to try the receipts yourself.',
      );
      return;
    }
    if (this.practice()) {
      const result = reduceExpedition(this.runtime.config, this.cycle(), this.state(), action);
      if (result.error) this.localError.set(result.error);
      else this.examples.update((examples) => ({ ...examples, [this.cycle().id]: result.state }));
    } else {
      this.runtime.actOnExpedition(this.cycle().id, this.ownState().revision, action);
      if (this.runtime.errors().length) this.localError.set(this.runtime.errors().join(' '));
    }
    if (action.type === 'depart') this.selectedRoute.set('');
  }
  saveReflection(): void {
    if (this.exampleMode()) return;
    this.runtime.actOnExpedition(this.cycle().id, this.ownState().revision, {
      type: 'reflect',
      text: this.reflectionDraft(),
    });
  }
  price(id: string): number {
    return expeditionPrice(this.runtime.config, this.state(), id, 'buy');
  }
  loadPractice(): void {
    this.practice.set(true);
    this.localError.set('');
  }
}
