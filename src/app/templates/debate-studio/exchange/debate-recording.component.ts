import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, input, output, signal } from '@angular/core';
import { DEBATE_EXCHANGE_PORT } from './debate-exchange.persistence';

@Component({
  selector: 'app-debate-recording',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (editable()) {
      <div class="controls">
        <button type="button" (click)="record()" [disabled]="capturing() || busy()">Record audio</button>
        @if (capturing()) { <button type="button" (click)="stop()">Stop recording</button> }
        <label>Attach audio or video<input type="file" accept="audio/*,video/*" (change)="upload($event)" [disabled]="capturing() || busy()" /></label>
      </div>
    }
    @if (url(); as source) {
      @if (video()) { <video controls playsinline [src]="source" (ended)="played.set(true)" aria-label="Debate recording playback"></video> }
      @else { <audio controls [src]="source" (ended)="played.set(true)" aria-label="Debate recording playback"></audio> }
      @if (editable()) {
        <button type="button" [disabled]="!played() || reviewed()" (click)="review()">{{ reviewed() ? 'Recording reviewed' : 'I reviewed this recording' }}</button>
        <button type="button" (click)="remove()">Remove / retake</button>
        <small>Play to the end, then confirm your review. Keep a transcript for readers.</small>
      }
    }
    <p role="status">{{ status() }}</p>
  `,
  styles: [`:host{display:block} .controls{display:grid;gap:8px} button,input{font:inherit;max-width:100%} button{padding:8px 12px;cursor:pointer} label{display:grid;gap:5px} audio,video{display:block;width:100%;max-height:300px;margin:12px 0} small{display:block;margin:8px 0} p:empty{display:none}`],
})
export class DebateRecordingComponent {
  readonly mediaId = input<string>();
  readonly editable = input(false);
  readonly reviewed = input(false);
  readonly changed = output<{ mediaId?: string; mediaType?: string; mediaReviewed: boolean }>();
  private readonly port = inject(DEBATE_EXCHANGE_PORT);
  private recorder?: MediaRecorder;
  private stream?: MediaStream;
  private disposed = false;
  readonly url = signal('');
  readonly video = signal(false);
  readonly played = signal(false);
  readonly capturing = signal(false);
  readonly busy = signal(false);
  readonly status = signal('');
  constructor() {
    effect(onCleanup => {
      const id = this.mediaId();
      let active = true;
      this.clearUrl(); this.played.set(false); this.status.set('');
      if (id) void this.port.loadMedia(id).then(blob => {
        if (!active) return;
        if (blob) { this.url.set(URL.createObjectURL(blob)); this.video.set(blob.type.startsWith('video/')); }
        else this.status.set('Recording is on the author’s browser. Use the transcript here.');
      }).catch(() => { if (active) this.status.set('Recording unavailable. Use the transcript.'); });
      onCleanup(() => { active = false; this.clearUrl(); });
    });
    inject(DestroyRef).onDestroy(() => { this.disposed = true; this.stop(); this.clearUrl(); });
  }
  private clearUrl(): void { if (this.url()) URL.revokeObjectURL(this.url()); this.url.set(''); }
  async record(): Promise<void> {
    this.busy.set(true);
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') throw new Error('Recording is unavailable in this browser. Attach an audio or video file.');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (this.disposed) { stream.getTracks().forEach(track => track.stop()); return; }
      this.stream = stream;
      const recorder = new MediaRecorder(stream); this.recorder = recorder;
      const chunks: Blob[] = [];
      recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
      recorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop()); this.capturing.set(false);
        if (!this.disposed && chunks.length) void this.save(new Blob(chunks, { type: recorder.mimeType }));
      };
      recorder.onerror = () => { this.status.set('Recording failed. Try again or attach a file.'); this.stop(); };
      recorder.start(); this.capturing.set(true); this.status.set('Recording…');
    } catch (error) { this.stream?.getTracks().forEach(track => track.stop()); this.status.set(error instanceof Error ? error.message : 'Microphone unavailable.'); }
    finally { this.busy.set(false); }
  }
  stop(): void { if (this.recorder?.state === 'recording') this.recorder.stop(); this.stream?.getTracks().forEach(track => track.stop()); }
  async upload(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement; const file = input.files?.[0];
    if (file) await this.save(file);
    input.value = '';
  }
  private async save(blob: Blob): Promise<void> {
    this.busy.set(true);
    try {
      if (!/^(audio|video)\//.test(blob.type) || blob.size === 0 || blob.size > 40_000_000) throw new Error('Choose a playable audio or video file under 40 MB.');
      const id = await this.port.saveMedia(blob);
      if (this.disposed) return;
      this.played.set(false); this.changed.emit({ mediaId: id, mediaType: blob.type, mediaReviewed: false }); this.status.set('Saved locally. Play and review this take.');
    } catch (error) { this.status.set(error instanceof Error ? error.message : 'Recording could not be saved.'); }
    finally { this.busy.set(false); }
  }
  review(): void { if (this.played()) this.changed.emit({ mediaId: this.mediaId(), mediaReviewed: true }); }
  remove(): void { this.changed.emit({ mediaId: undefined, mediaType: undefined, mediaReviewed: false }); }
}
