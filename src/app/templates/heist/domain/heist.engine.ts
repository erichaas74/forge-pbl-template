import type { Action, Challenge, HeistCommand, HeistEvent, Measurement, Mission, Mode, Plan } from './heist.models';
import { correct, distance, location, measure, position, readiness, routeChallenges, timeline, verified } from './heist.timeline';
import { patrolPosition, sees } from './heist.patrol';

const newPlan = (m: Mission): Plan => ({ nodes: [m.entry], waits: {}, pickup: false, answers: {} });
export class HeistEngine {
  mode: Mode = 'RECON';
  plan: Plan;
  locked?: Readonly<Plan>;
  time = 0;
  response?: string;
  events: HeistEvent[] = [];
  exposure = 0;
  measurement?: Measurement;
  private readonly emitted = new Set<string>();
  private readonly near = new Set<string>();
  private predictedCache?: Action[];
  private actualCache?: Action[];
  constructor(readonly mission: Mission) { this.plan = newPlan(mission); }
  get editable(): boolean { return this.mode === 'RECON' || this.mode === 'PLANNING'; }
  get predicted(): Action[] { return this.locked ? (this.predictedCache ??= timeline(this.mission, this.locked)) : timeline(this.mission, this.plan); }
  get actual(): Action[] { return this.locked ? (this.actualCache ??= timeline(this.mission, this.locked, this.response)) : timeline(this.mission, this.plan, this.response); }
  get measurementChallenge(): Challenge | undefined {
    return this.measurement ? { id: 'field-measurement', type: 'DISTANCE_SCALE', title: 'Your field measurement', prompt: `You measured ${this.measurement.cm.toFixed(2)} cm. Scale: 1 cm = ${this.mission.map.metersPerCm} m. What is the real distance?`, answer: this.measurement.meters, tolerance: this.mission.math.distanceTolerance, unit: 'm', hint: 'Multiply map centimeters by meters per centimeter.' } : undefined;
  }
  get challenges() { return [...routeChallenges(this.mission, this.plan), ...this.mission.math.required, ...(this.measurementChallenge ? [this.measurementChallenge] : [])]; }
  get problems(): string[] { const issues = readiness(this.mission, this.plan); if (this.measurementChallenge && !verified(this.measurementChallenge, this.plan)) issues.push('Verify your field measurement.'); return issues; }
  get secured(): boolean { return this.events.some(e => e.type === 'TARGET_SECURED'); }
  dispatch(command: HeistCommand): void {
    if (!command || typeof command !== 'object') throw new Error('INVALID_HEIST_COMMAND');
    if (command.type === 'reset') {
      this.plan = newPlan(this.mission); this.mode = 'RECON'; this.time = 0; this.response = undefined; this.measurement = undefined;
      this.locked = undefined; this.predictedCache = undefined; this.actualCache = undefined; this.events = []; this.exposure = 0; this.emitted.clear(); this.near.clear(); return;
    }
    if (command.type === 'advance') { this.advance(command.time); return; }
    if (command.type === 'respond') {
      if (this.mode !== 'CRISIS' || !verified(this.mission.crisis.challenge, this.plan)) throw new Error('Verify crisis mathematics first.');
      const choice = this.mission.crisis.choices.find(c => c.id === command.id);
      if (!choice || choice.capacity < this.mission.target.mass) throw new Error('This response cannot carry the target. Compare its capacity with the target mass.');
      this.response = choice.id; this.actualCache = undefined; this.log('CRISIS_RESOLVED', `${choice.label}: ${choice.delay} s delay; speed × ${choice.speedMultiplier}.`); this.mode = 'EXECUTING'; return;
    }
    if (command.type === 'answer') {
      const available = this.mode === 'CRISIS' ? [this.mission.crisis.challenge] : this.editable ? this.challenges : [];
      const q = available.find(c => c.id === command.id);
      if (!q || !Number.isFinite(command.answer) || typeof command.unit !== 'string') throw new Error('Enter a finite number for an available calculation.');
      const pass = correct(q, command.answer, command.unit);
      const attempts = this.plan.answers[q.id] ?? [];
      if (attempts.length >= 100) throw new Error('Practice attempt limit reached. Start a new plan.');
      this.plan.answers[q.id] = [...attempts, { answer: command.answer, unit: command.unit, correct: pass }];
      this.log('MATH_CHECK', `${q.title}: ${command.answer} ${command.unit} — ${pass ? 'verified' : 'retry'}.`); return;
    }
    if (!this.editable) throw new Error('The locked plan cannot be edited.');
    switch (command.type) {
      case 'plan': this.mode = 'PLANNING'; break;
      case 'route': {
        const route = this.mission.guidance?.routes.find(r => r.id === command.id);
        if (!route) throw new Error('Choose one of the available paths.');
        this.plan.nodes = [...route.nodes]; this.plan.waits = {}; this.plan.pickup = true;
        this.mode = 'PLANNING'; break;
      }
      case 'measure': {
        if (![command.from, command.to].every(p => p && Number.isFinite(p.x) && Number.isFinite(p.y) && p.x >= 0 && p.y >= 0 && p.x <= this.mission.map.width && p.y <= this.mission.map.height) || distance(command.from, command.to) < 1) throw new Error('Choose two distinct points inside the map.');
        this.measurement = measure(this.mission, command.from, command.to); delete this.plan.answers['field-measurement']; break;
      }
      case 'node': {
        const last = this.plan.nodes.at(-1)!;
        if (this.plan.nodes.length >= 30) throw new Error('Use at most 30 waypoints.');
        if (!this.mission.routes.some(r => !r.blocked && ((r.from === last && r.to === command.id) || (r.to === last && r.from === command.id)))) throw new Error('Choose a location joined to your last waypoint by an open path.');
        this.plan.nodes.push(command.id); this.mode = 'PLANNING'; break;
      }
      case 'undo': {
        if (this.plan.nodes.length > 1) { const i = this.plan.nodes.length - 1; this.plan.nodes.pop(); delete this.plan.waits[String(i)]; delete this.plan.answers[`distance-${i - 1}`]; delete this.plan.answers[`time-${i - 1}`]; }
        break;
      }
      case 'wait':
        if (!Number.isInteger(command.index) || command.index < 0 || command.index >= this.plan.nodes.length || !Number.isFinite(command.seconds) || command.seconds < 0 || command.seconds > this.mission.deadline) throw new Error('Wait must be between zero and the mission deadline at an existing waypoint.');
        this.plan.waits[String(command.index)] = command.seconds; break;
      case 'pickup': if (typeof command.enabled !== 'boolean') throw new Error('Invalid pickup action.'); this.plan.pickup = command.enabled; break;
      case 'lock':
        if (this.problems.length) throw new Error(this.problems.join(' '));
        // Deep copy + freeze protects the original mathematical prediction through crisis changes.
        this.locked = deepFreeze(structuredClone(this.plan)); this.mode = 'EXECUTING'; this.time = 0;
        this.log('PLAN_LOCKED', 'Route and mathematical evidence locked.'); this.boundaries(); break;
      default: throw new Error('INVALID_HEIST_COMMAND');
    }
  }
  advance(target: number): void {
    if (!Number.isFinite(target) || target < this.time || target > this.mission.deadline + 1) throw new Error('Invalid operation time.');
    // A fixed simulation grid prevents frame rate and playback speed changing detection.
    const targetTick = Math.floor((target + 1e-7) * 10);
    while (this.mode === 'EXECUTING' && Math.round(this.time * 10) < targetTick) {
      this.time = (Math.round(this.time * 10) + 1) / 10;
      this.boundaries();
      if (this.mode !== 'EXECUTING') break;
      const p = position(this.mission, this.actual, this.time);
      const guards = this.mission.guards;
      const visible = guards.some(g => sees(this.mission, g, p, this.time));
      this.exposure = visible ? this.exposure + 0.1 : Math.max(0, this.exposure - 0.2);
      for (const g of guards) {
        const separation = distance(patrolPosition(g, this.time), p);
        if (!visible && separation < g.range + 15 && !this.near.has(g.id)) {
          this.near.add(g.id); this.log('NEAR_MISS', `${g.name}: ${separation.toFixed(1)} map pixels clearance.`, this.actual.find(a => a.start <= this.time && a.end > this.time)?.id);
        }
      }
      if (this.exposure + 1e-8 >= this.mission.detectionGrace) { this.log('DETECTED', 'Patrol exposure exceeded the allowed window.'); this.fail('Patrol detected the team. Adjust your route or waits.'); }
      else if (this.time >= this.mission.deadline) this.fail('The roads closed before extraction. Recalculate elapsed time.');
      else if (this.time + 1e-8 >= (this.actual.at(-1)?.end ?? 0)) {
        if (this.secured && this.plan.nodes.at(-1) === this.mission.extraction) { this.mode = 'SUCCESS'; this.log('EXTRACTED', `${this.mission.target.name} reached safety.`); }
        else this.fail('Extraction requires the target.');
      }
    }
  }
  private boundaries(): void {
    for (const a of this.actual) {
      if (a.start <= this.time + 1e-8 && !this.emitted.has(`${a.id}-start`)) {
        this.emitted.add(`${a.id}-start`);
        if (a.type === 'MOVE') this.log('MOVE_START', `${location(this.mission, a.from).name} → ${location(this.mission, a.to).name}: ${a.distance.toFixed(1)} m at ${a.speed.toFixed(2)} m/s.`, a.id);
        if (a.type === 'WAIT') this.log('WAIT', `Wait ${(a.end - a.start).toFixed(1)} s at ${location(this.mission, a.from).name}.`, a.id);
      }
      if (a.end <= this.time + 1e-8 && !this.emitted.has(`${a.id}-end`)) {
        this.emitted.add(`${a.id}-end`);
        if (a.type === 'MOVE') {
          this.log('MOVE_END', `Reached ${location(this.mission, a.to).name}.`, a.id);
          const gate = this.mission.gate;
          if (a.to === gate.location && a.end % gate.cycle >= gate.openSeconds) { this.fail('Gate closed at arrival. Compare your arrival against the gate cycle.'); return; }
        }
        if (a.type === 'PICKUP') {
          this.log('TARGET_SECURED', `${this.mission.target.name}: ${this.mission.target.mass} kg.`);
          if (!this.response) { this.log('CRISIS', this.mission.crisis.title); this.mode = 'CRISIS'; return; }
        }
      }
    }
  }
  private fail(message: string): void { this.mode = 'FAILURE'; this.log('FAILED', message); }
  private log(type: HeistEvent['type'], message: string, actionId?: string): void { this.events.push({ time: this.time, type, message, actionId }); }
}
function deepFreeze<T>(value: T): T { if (value && typeof value === 'object') { Object.freeze(value); Object.values(value).forEach(deepFreeze); } return value; }
