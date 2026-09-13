import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { cargoMass } from '../domain/academic-locks';
import type { AcademicLock, LockAnswer } from '../domain/gallery.models';

@Component({
  selector: 'app-academic-lock', imports: [FormsModule], templateUrl: './academic-lock.component.html', styleUrl: './academic-lock.component.scss', changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcademicLockComponent {
  readonly lock = input.required<AcademicLock>();
  readonly saved = input<LockAnswer>();
  readonly operate = output<LockAnswer>();
  readonly calculation = signal<number | null>(null);
  readonly setting = signal(0);
  readonly order = signal<string[]>([]);
  readonly selected = signal<string[]>([]);
  readonly placements = signal<Record<string, string>>({});
  readonly held = signal('');
  readonly hint = signal(false);
  readonly matching = computed(() => ['sorting', 'people-placement', 'technology-sort', 'evidence-board'].includes(this.lock().type));
  readonly unplaced = computed(() => this.lock().items?.filter(item => !this.lock().zones?.some(zone => zone.id === this.placements()[item.id])) ?? []);
  readonly canOperate = computed(() => !this.matching() || this.unplaced().length === 0);
  readonly mass = computed(() => cargoMass(this.lock(), this.selected()));
  readonly digits = computed(() => String(Math.round(this.setting())).padStart(this.lock().digits ?? 4, '0').split(''));
  readonly routePoints = computed(() => this.order().map(id => this.lock().items?.find(i => i.id === id)).filter(i => !!i).map(i => `${i!.x},${i!.y}`).join(' '));
  readonly answer = computed<LockAnswer>(() => ({ calculation: this.calculation() ?? undefined, setting: this.setting(), order: this.order(), selected: this.selected(), placements: this.placements() }));
  constructor() { effect(() => {
    const lock = this.lock(), saved = this.saved();
    this.calculation.set(saved?.calculation ?? null); this.setting.set(saved?.setting ?? lock.min ?? 0);
    this.order.set([...(saved?.order ?? (lock.type === 'timeline' ? lock.items?.map(i => i.id) ?? [] : []))]);
    this.selected.set([...(saved?.selected ?? [])]); this.placements.set({ ...saved?.placements }); this.held.set(''); this.hint.set(false);
  }); }
  label(id: string): string { return this.lock().items?.find(i => i.id === id)?.label ?? id; }
  destination(id: string): string { return this.lock().zones?.find(zone => zone.id === this.placements()[id])?.label ?? 'Not placed'; }
  submit(): void { if (this.canOperate()) this.operate.emit(this.answer()); }
  move(index: number, direction: number): void { const next = [...this.order()]; const target = index + direction; if (target < 0 || target >= next.length) return; [next[index], next[target]] = [next[target], next[index]]; this.order.set(next); }
  digit(index: number, direction: number): void { const chars = [...this.digits()]; chars[index] = String((Number(chars[index]) + direction + 10) % 10); this.setting.set(Number(chars.join(''))); }
  toggle(id: string): void { this.selected.update(ids => ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]); }
  place(zone: string): void { if (this.held()) { this.placements.update(p => ({ ...p, [this.held()]: zone })); this.held.set(''); } }
  plot(id: string): void { if (!this.order().includes(id)) this.order.update(order => [...order, id]); }
  turn(event: PointerEvent): void {
    const element = event.currentTarget as SVGElement;
    element.setPointerCapture(event.pointerId);
    const set = (p: PointerEvent) => {
      const rect = element.getBoundingClientRect(), x = p.clientX - rect.left - rect.width / 2, y = p.clientY - rect.top - rect.height / 2;
      const degrees = (Math.atan2(x, -y) * 180 / Math.PI + 360) % 360, step = this.lock().step ?? 1;
      this.setting.set(Math.max(this.lock().min ?? 0, Math.min(this.lock().max ?? 360, Math.round(degrees / step) * step)));
    };
    set(event); element.onpointermove = set; element.onpointerup = () => { element.onpointermove = null; element.onpointerup = null; };
    element.onpointercancel = () => { element.onpointermove = null; element.onpointerup = null; };
  }
}
