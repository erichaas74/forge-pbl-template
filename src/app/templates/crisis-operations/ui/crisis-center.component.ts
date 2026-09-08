import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CrisisRuntimeService } from '../runtime/crisis-runtime.service';
import type { CrisisView, MapLayer } from '../domain/crisis.models';
import { CrisisIconComponent } from './crisis-icon.component';
import {
  CrisisRoomSceneComponent,
  CRISIS_CAMERA_TRANSITION_MS,
} from './crisis-room-scene.component';
import { CrisisTableControlsComponent } from './crisis-table-controls.component';
import { CrisisConsoleComponent } from './crisis-console.component';
import { CrisisCompanionBriefingComponent } from './crisis-companion-briefing.component';
import { CrisisRobotComponent } from './crisis-robot.component';
import { CrisisWorkstationsComponent } from './crisis-workstations.component';
import { CrisisConferenceComponent } from './crisis-conference.component';
import { CrisisWeatherScreenComponent } from './crisis-weather-screen.component';

@Component({
  selector: 'app-crisis-center',
  imports: [
    RouterLink,
    CrisisIconComponent,
    CrisisTableControlsComponent,
    CrisisConsoleComponent,
    CrisisRoomSceneComponent,
    CrisisCompanionBriefingComponent,
    CrisisRobotComponent,
    CrisisWorkstationsComponent,
    CrisisConferenceComponent,
    CrisisWeatherScreenComponent,
  ],
  templateUrl: './crisis-center.component.html',
  styleUrls: [
    './crisis-center.component.scss',
    './crisis-simplified-shell.scss',
    './crisis-station-shell.scss',
  ],
})
export class CrisisCenterComponent implements OnDestroy {
  readonly runtime = inject(CrisisRuntimeService);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly view = signal<CrisisView>('room');
  readonly layer = signal<MapLayer>('hazard');
  readonly selectedLocation = signal(this.runtime.config.locations[0].id);
  readonly zoom = signal(1);
  readonly running = signal(false);
  readonly audioEnabled = signal(false);
  readonly fullscreen = signal(false);
  readonly resetOpen = signal(false);
  readonly imageFailed = signal(false);
  readonly robotRoaming = signal(true);
  readonly suggestedActionId = signal('');
  readonly workstationId = signal('');
  readonly stationReports = signal(false);
  readonly selectedWorkstation = computed(() =>
    this.runtime.config.workstations?.find((station) => station.id === this.workstationId()),
  );
  readonly conference = computed(() =>
    this.view() === 'station' && !this.stationReports()
      ? this.selectedWorkstation()?.conference
      : undefined,
  );
  readonly weather = computed(() =>
    this.view() === 'station' && !this.stationReports()
      ? this.selectedWorkstation()?.weather
      : undefined,
  );
  readonly specializedStation = computed(() => !!this.conference() || !!this.weather());
  readonly locations = this.runtime.config.locations;
  readonly views: readonly { id: CrisisView; name: string; title: string; code: string }[] = [
    { id: 'room', name: 'Room', title: 'Operations room', code: '01' },
    { id: 'map', name: 'Table', title: 'Situation table', code: '02' },
    { id: 'news', name: 'Wall', title: 'Monitor wall', code: '03' },
    { id: 'station', name: 'Reports', title: 'My station', code: '04' },
    { id: 'argus', name: 'ARGUS', title: 'Call ARGUS', code: '05' },
    { id: 'command', name: 'Command', title: 'Command console', code: '06' },
  ];
  readonly viewTitle = computed(() =>
    this.view() === 'station' && this.selectedWorkstation()
      ? this.selectedWorkstation()!.name
      : this.views.find((v) => v.id === this.view())!.title,
  );
  private timer?: ReturnType<typeof setInterval>;
  private focusTimer?: ReturnType<typeof setTimeout>;
  private audio?: AudioContext;
  private previousFocus?: HTMLElement;
  private previousRoomSurface?: 'map' | 'news';
  private readonly onFullscreen = () =>
    this.fullscreen.set(document.fullscreenElement === this.element.nativeElement);

  constructor() {
    document.addEventListener('fullscreenchange', this.onFullscreen);
  }
  openWorkstation(id: string): void {
    const station = this.runtime.config.workstations?.find((item) => item.id === id);
    if (!station) return;
    this.stationReports.set(false);
    this.workstationId.set(id);
    if (!station.roleIds.includes(this.runtime.state().roleId))
      this.runtime.selectRole(station.roleIds[0]);
    this.showView('station');
  }
  navigate(view: CrisisView): void {
    if (view === 'station') this.workstationId.set('');
    this.showView(view);
  }
  openStationReports(): void {
    this.stationReports.set(true);
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(
      () =>
        this.element.nativeElement
          .querySelector<HTMLElement>('[data-panel-heading]')
          ?.focus({ preventScroll: true }),
      0,
    );
  }
  showView(view: CrisisView): void {
    if (this.view() === view) return;
    const sourceFocus = document.activeElement;
    if (this.view() === 'room' && document.activeElement instanceof HTMLElement) {
      this.previousFocus = document.activeElement;
      const surface =
        this.previousFocus.closest<HTMLElement>('[data-room-entry]')?.dataset['roomEntry'];
      this.previousRoomSurface = surface === 'map' || surface === 'news' ? surface : undefined;
    }
    this.view.set(view);
    if (view !== 'command') this.suggestedActionId.set('');
    this.runtime.message.set('');
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(
      () => {
        // An interrupted camera move must never steal focus from an instrument already in use.
        if (
          this.view() !== view ||
          (document.activeElement !== sourceFocus && document.activeElement !== document.body)
        )
          return;
        if (view !== 'room')
          this.element.nativeElement
            .querySelector<HTMLElement>('[data-panel-heading]')
            ?.focus({ preventScroll: true });
        else if (this.previousFocus?.isConnected) this.previousFocus.focus({ preventScroll: true });
        else
          this.element.nativeElement
            .querySelector<HTMLElement>(
              this.previousRoomSurface
                ? `[data-room-entry="${this.previousRoomSurface}"]`
                : '.view-button[data-view="room"]',
            )
            ?.focus({ preventScroll: true });
      },
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 0
        : CRISIS_CAMERA_TRANSITION_MS,
    );
  }
  locate(id: string): void {
    this.selectedLocation.set(id);
    this.showView('map');
  }
  reviewSuggestedAction(id: string): void {
    this.suggestedActionId.set(id);
    this.showView('command');
  }
  selectLocation(id: string): void {
    this.selectedLocation.set(id);
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => {
      const heading =
        this.element.nativeElement.querySelector<HTMLElement>('.location-inspector h2');
      heading?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
      heading?.focus({ preventScroll: true });
    }, 0);
  }
  advance(): void {
    if (this.runtime.advance() && this.audioEnabled()) this.chime();
    if (this.runtime.finished()) {
      this.running.set(false);
      clearInterval(this.timer);
    }
  }
  toggleRunning(): void {
    this.running.update((value) => !value);
    clearInterval(this.timer);
    if (this.running())
      this.timer = setInterval(
        () => this.advance(),
        this.runtime.config.bulletinIntervalSeconds * 1000,
      );
  }
  async toggleAudio(): Promise<void> {
    if (this.audioEnabled()) {
      this.audioEnabled.set(false);
      return;
    }
    try {
      this.audio ??= new AudioContext();
      await this.audio.resume();
      this.audioEnabled.set(true);
      this.chime();
    } catch {
      this.runtime.message.set('Audio alerts are unavailable in this browser.');
    }
  }
  private chime(): void {
    if (!this.audio) return;
    const oscillator = this.audio.createOscillator(),
      gain = this.audio.createGain(),
      start = this.audio.currentTime;
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(540, start);
    oscillator.frequency.setValueAtTime(720, start + 0.12);
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.055, start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);
    oscillator.connect(gain);
    gain.connect(this.audio.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.55);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
    };
  }
  async toggleFullscreen(): Promise<void> {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await this.element.nativeElement.requestFullscreen();
    } catch {
      this.runtime.message.set('Full screen is unavailable. The room still works in this view.');
    }
  }
  changeZoom(delta: number): void {
    this.zoom.update((n) => Math.min(1.45, Math.max(1, Math.round((n + delta) * 10) / 10)));
  }
  resetExercise(): void {
    clearInterval(this.timer);
    this.running.set(false);
    this.runtime.reset();
    this.resetOpen.set(false);
    this.selectedLocation.set(this.locations[0].id);
    this.showView('room');
  }
  @HostListener('document:keydown', ['$event'])
  shortcut(event: KeyboardEvent): void {
    if (event.key === 'Escape' && !this.resetOpen() && this.view() !== 'room') {
      event.preventDefault();
      this.showView('room');
      return;
    }
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      this.resetOpen() ||
      (event.target instanceof HTMLElement &&
        (event.target.isContentEditable ||
          ['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON'].includes(event.target.tagName)))
    )
      return;
    if (event.key === 'Escape' && this.view() !== 'room') {
      event.preventDefault();
      this.showView('room');
    }
    const position = Number(event.key) - 1;
    if (position >= 0 && position < this.views.length && /^\d$/.test(event.key)) {
      event.preventDefault();
      this.navigate(this.views[position].id);
    }
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
    clearTimeout(this.focusTimer);
    document.removeEventListener('fullscreenchange', this.onFullscreen);
    void this.audio?.close();
  }
}
