// Isolated verification harness. The implementation remains in the registered template.
import { Component, computed, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { calendarMonumentConfig } from '../src/app/projects/calendar-monument/calendar-monument.config';
import { solsticeGatesSample } from '../src/app/projects/calendar-monument/calendar-monument.solstice-sample';
import { EngineeringWeekWorkspaceComponent } from '../src/app/templates/engineering-design/ui/engineering-week-workspace.component';
import { EngineeringFinalDemoComponent } from '../src/app/templates/engineering-design/ui/engineering-final-demo.component';
import { ENGINEERING_CONFIG, ENGINEERING_PERSISTENCE, ENGINEERING_SESSION, EngineeringDesignRuntime } from '../src/app/templates/engineering-design/runtime/engineering-design.runtime';
import { BrowserEngineeringDesignAdapter } from '../src/app/infrastructure/persistence/browser-engineering-design.adapter';
import { createLocalPreviewSession } from '../src/app/core/context/project-session-context';
import { PROJECT_LESSON_FOCUS } from '../src/app/shared/project-lessons/project-lesson-focus';
import type { ProjectLesson } from '../src/app/shared/project-lessons/project-lesson.models';
import { DesignSimulationRegistry, DESIGN_SIMULATIONS } from '../src/app/shared/engineering/design-simulation.registry';
import { SolarMonumentComponent } from '../src/app/plugins/simulations/solar-monument/solar-monument.component';
const session = createLocalPreviewSession('calendar-monument', '1.0.0', { attemptId: 'solar-week-verification' });
const number = signal(Math.min(8, Math.max(1, Number(new URL(location.href).searchParams.get('lesson')) || 1)));
const focus = computed(() => ({ number: number() }) as ProjectLesson);
const registry = new DesignSimulationRegistry(); registry.register('simulation.solar-monument', SolarMonumentComponent);
@Component({
  selector: 'app-root', imports: [EngineeringWeekWorkspaceComponent, EngineeringFinalDemoComponent],
  template: `<header class="harness-header"><strong>Solar Monument</strong><span>Local authoring preview</span><button (click)="example.set(!example())">{{ example() ? 'Weekly workspace' : 'Final example' }}</button></header>
  <nav aria-label="Weeks and sessions">@for (week of weeks; track week.id; let i = $index) { <div><b>Week {{ i + 1 }} · {{ week.buildType }}</b>@for (session of week.sessions; track session.title; let j = $index) { <button [attr.aria-current]="number() === i * 2 + j + 1 ? 'step' : null" (click)="select(i * 2 + j + 1)">{{ j + 1 }} · {{ session.title }}</button> }</div> }</nav>
  @if (example()) { <app-engineering-final-demo [title]="'Solstice Windows'" [projectId]="'calendar-monument'" [snapshot]="sample" [simulationId]="'simulation.solar-monument'" /> } @else { <app-engineering-week-workspace /> }`,
  styles: [`:host { display:block; padding:20px; max-width:1500px; margin:auto; color:#243e43; font-family:system-ui,sans-serif; } .harness-header { display:flex; gap:16px; align-items:center; margin-bottom:14px; flex-wrap:wrap; } .harness-header strong { font:26px Georgia,serif; } .harness-header span { font-size:12px; } nav { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:10px; margin-bottom:16px; } nav div { display:grid; gap:6px; min-width:0; padding:10px; border:1px solid #cbd6c9; border-radius:10px; } b { font-size:12px; } button { padding:8px; min-height:38px; border:1px solid #a4b5a7; background:#f9faf4; color:#244d46; border-radius:7px; cursor:pointer; text-align:left; } button[aria-current] { background:#295e52; color:white; } :focus-visible { outline:3px solid #b37320; outline-offset:2px; } @media(max-width:800px) { nav {grid-template-columns:1fr 1fr;} :host {padding:12px;} } @media(max-width:450px) { nav {grid-template-columns:1fr;} }`],
})
class SolarPreviewHarness {
  readonly number = number;
  readonly weeks = calendarMonumentConfig.previewWeeks!;
  readonly example = signal(false);
  readonly sample = solsticeGatesSample;
  select(value: number) { this.example.set(false); number.set(value); history.replaceState(null, '', '?lesson=' + value); }
}
bootstrapApplication(SolarPreviewHarness, { providers: [
  provideRouter([]), { provide: ENGINEERING_CONFIG, useValue: calendarMonumentConfig },
  { provide: ENGINEERING_SESSION, useValue: session },
  { provide: ENGINEERING_PERSISTENCE, useValue: new BrowserEngineeringDesignAdapter(session) },
  { provide: DESIGN_SIMULATIONS, useValue: registry }, { provide: PROJECT_LESSON_FOCUS, useValue: focus },
  EngineeringDesignRuntime,
] }).catch(console.error);
