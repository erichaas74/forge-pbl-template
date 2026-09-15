import { afterNextRender, ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, Injector, input, output, signal, untracked, viewChild } from '@angular/core';
import type { JourneyPathChoice, JourneyPathNode } from '../domain/journey-path.models';
import { JOURNEY_WORLD_LOADER } from './game/journey-world.tokens';
import type { JourneyWorldHandle } from './game/journey-world.contracts';

@Component({
  selector: 'app-journey-location-scene',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './journey-location-scene.component.html',
  styleUrl: './journey-location-scene.component.scss',
})
export class JourneyLocationSceneComponent {
  private readonly loader = inject(JOURNEY_WORLD_LOADER);
  private readonly injector = inject(Injector);
  readonly worldHost = viewChild<ElementRef<HTMLElement>>('worldHost');
  readonly worldStatus = signal<'loading'|'ready'|'error'>('loading');
  readonly attempt = signal(0);
  readonly reducedMotion = signal(typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches);
  readonly node = input.required<JourneyPathNode>();
  readonly selections = input<readonly JourneyPathChoice[]>([]);
  readonly activeEventId = input<string>();
  readonly inspected = output<string>();
  readonly paused = signal(false);
  readonly effects = computed(() => new Set(this.selections().map(choice => choice.effect)));
  readonly storm = computed(() => this.node().scene === 'storm' || this.node().scene === 'cape');
  readonly damagedSail = computed(() => this.node().events.some(event => event.object.icon === 'sail'));
  readonly town = computed(() => ['harbor', 'home'].includes(this.node().scene ?? ''));
  readonly inspectedEvent = computed(() => this.node().events.find(event => event.id === this.activeEventId()));
  readonly skyBirds = [0, 1, 2];
  readonly waves = [0, 1, 2, 3, 4, 5];
  readonly buildings = [0, 1, 2, 3, 4, 5, 6];
  readonly barrels = [0, 1, 2, 3];
  reload(): void { this.attempt.update(value => value + 1); }
  resolved(eventId: string): boolean { return this.node().events.find(event=>event.id===eventId)?.choices.some(choice=>this.selections().some(selected=>selected.id===choice.id)) ?? false; }
  constructor() {
    effect(onCleanup => {
      const node = this.node(); this.attempt();
      if (!node.sceneArt) return;
      this.worldStatus.set('loading');
      let disposed = false, handle: JourneyWorldHandle | undefined;
      const scheduled = untracked(() => afterNextRender(() => {
        const parent = this.worldHost()?.nativeElement;
        if (!parent) return;
        void this.loader().then(mount => {
          if (disposed) return;
          handle = mount(parent,node,()=>({effects:this.effects(),paused:this.paused(),reducedMotion:this.reducedMotion(),activeEventId:this.activeEventId()}),{ready:()=>this.worldStatus.set('ready'),failed:()=>this.worldStatus.set('error'),inspect:id=>this.inspected.emit(id)});
        }).catch(()=>{if(!disposed)this.worldStatus.set('error');});
      },{injector:this.injector}));
      onCleanup(()=>{disposed=true;scheduled.destroy();handle?.destroy();});
    });
  }
  symbol(icon: string): string { return ({compass: '⌖', cargo: '▥', sail: '⚑', shore: '⇄', log: '▤'} as Record<string,string>)[icon] ?? '•'; }
}
