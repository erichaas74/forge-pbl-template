import { Component, computed, inject, signal } from '@angular/core';

import { JourneyReplayRuntimeService } from '../runtime/journey-replay-runtime.service';

@Component({
  selector: 'app-journey-decision-panel',
  templateUrl: './journey-decision-panel.component.html',
  styleUrl: './journey-decision-panel.component.scss',
})
export class JourneyDecisionPanelComponent {
  readonly runtime = inject(JourneyReplayRuntimeService);
  readonly evidence = computed(() => {
    const ids = this.runtime.choice()?.evidenceIds ?? [];
    return this.runtime.config.evidence.filter((item) => ids.includes(item.id));
  });
  readonly recording = signal(false);
  readonly recordingSupported =
    typeof navigator !== 'undefined' &&
    navigator.mediaDevices !== undefined &&
    typeof MediaRecorder !== 'undefined';
  private mediaRecorder?: MediaRecorder;
  private mediaStream?: MediaStream;
  private chunks: Blob[] = [];

  responseInput(event: Event): void {
    this.runtime.setResponseText((event.target as HTMLTextAreaElement).value);
  }

  transcriptInput(event: Event): void {
    this.runtime.setTranscript((event.target as HTMLTextAreaElement).value);
  }

  async audioFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file !== undefined) await this.runtime.attachAudio(file, file.name);
    input.value = '';
  }

  async startRecording(): Promise<void> {
    if (!this.recordingSupported || this.recording()) return;
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.chunks = [];
      this.mediaRecorder = new MediaRecorder(this.mediaStream);
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) this.chunks.push(event.data);
      };
      this.mediaRecorder.onstop = async () => {
        const type = this.mediaRecorder?.mimeType || 'audio/webm';
        const blob = new Blob(this.chunks, { type });
        this.stopTracks();
        this.recording.set(false);
        await this.runtime.attachAudio(blob);
      };
      this.mediaRecorder.start();
      this.recording.set(true);
    } catch {
      this.stopTracks();
      this.recording.set(false);
      this.runtime.error.set('Microphone access was unavailable. Attach an audio file or use text.');
    }
  }

  stopRecording(): void {
    if (this.mediaRecorder?.state === 'recording') this.mediaRecorder.stop();
  }

  private stopTracks(): void {
    this.mediaStream?.getTracks().forEach((track) => track.stop());
    this.mediaStream = undefined;
  }
}
