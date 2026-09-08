import { Component, input } from '@angular/core';
const icons: Record<string, string> = {
  video: 'M3 6h12v12H3V6Zm12 4 6-3v10l-6-3',
  'video-off': 'M3 6h12v12H3V6Zm12 4 6-3v10l-6-3M2 2l20 20',
  'mic-off': 'M9 10V5a3 3 0 0 1 6 0v5M6 10v2a6 6 0 0 0 12 0v-2M12 18v4m-4 0h8M2 2l20 20',
  people:
    'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 21v-3c0-6 14-6 14 0v3m1-18a4 4 0 0 1 0 8m1 3c3 0 4 2 4 4v3',
  'share-screen': 'M3 4h18v14H3V4Zm5 17h8m-4-3v3M12 14V7m-3 3 3-3 3 3',
  grid: 'M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7',
  speaker: 'M3 3h18v12H3V3Zm0 16h5v3H3v-3Zm7 0h4v3h-4v-3Zm6 0h5v3h-5v-3',
  captions: 'M3 4h18v16H3V4Zm7 4H6v8h4m8-8h-4v8h4',
  'phone-down': 'M3 16 2 12c5-6 15-6 20 0l-1 4h-5v-5M8 11v5H3',
  radar: 'M12 2a10 10 0 1 0 10 10M12 6a6 6 0 1 0 6 6M12 10a2 2 0 1 0 2 2M12 12 21 3',
  play: 'm8 4 12 8-12 8V4Z',
  pause: 'M8 4v16M16 4v16',
  room: 'M3 8 12 3l9 5v12H3V8Zm0 0 9 5 9-5M12 13v7',
  map: 'm3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16',
  news: 'M3 4h18v14H3V4Zm5 17h8M12 18v3M6 8h5v6H6V8Zm8 0h4m-4 3h4m-4 3h4',
  station: 'M3 3h18v13H3V3Zm6 17h6m-3-4v4M6 12l4-4 3 3 5-5',
  argus: 'M7 7V4h10v3M5 7h14v12H5V7ZM9 11v3m6-3v3m-6 3h6M2 10v6m20-6v6M12 1v3',
  command: 'M12 3 3 7v6c0 5 9 9 9 9s9-4 9-9V7l-9-4Zm-4 9 3 3 5-6',
  close: 'm6 6 12 12M6 18 18 6',
  expand: 'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5',
  sound: 'M3 9h4l5-5v16l-5-5H3V9Zm13-2a8 8 0 0 1 0 10m3-13a12 12 0 0 1 0 16',
  mute: 'M3 9h4l5-5v16l-5-5H3V9Zm13 0 6 6m-6 0 6-6',
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  pin: 'm8 3 8 0-1 6 4 4v2H5v-2l4-4-1-6Zm4 12v7',
  back: 'M20 12H4m6-6-6 6 6 6',
  clock: 'M12 8v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  check: 'm5 12 4 4L19 6',
  alert: 'm12 3 10 18H2L12 3Zm0 6v5m0 3v1',
  reset: 'M3 4v6h6M3 10a9 9 0 1 1 0 5',
  layers: 'm12 3 10 5-10 5L2 8l10-5Zm-9 9 9 5 9-5M3 16l9 5 9-5',
};
@Component({
  selector: 'app-crisis-icon',
  template:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path [attr.d]="path()" /></svg>',
  styles:
    ':host{display:inline-flex;width:20px;height:20px;flex-shrink:0}svg{width:100%;height:100%}',
})
export class CrisisIconComponent {
  readonly name = input('room');
  path(): string {
    return icons[this.name()] ?? icons['room'];
  }
}
