import type { BroadcastConfig, BroadcastCue } from './broadcast.models';

/** All sound is opt-in. Asset-based stings replace the built-in rehearsal tones. */
export class BroadcastAudio {
  private context?: AudioContext;
  private readonly playing = new Set<HTMLAudioElement>();
  private readonly nodes = new Set<OscillatorNode>();
  private bed?: HTMLAudioElement;
  private bedTones: OscillatorNode[] = [];
  private bedGain?: GainNode;
  enabled = false;
  async enable(): Promise<void> {
    this.context ??= new AudioContext(); await this.context.resume(); this.enabled = true;
  }
  mute(): void {
    this.enabled = false; this.stop();
  }
  stop(): void {
    for (const audio of this.playing) { audio.pause(); audio.currentTime = 0; }
    this.playing.clear(); this.bed = undefined;
    this.stopBed();
    for (const node of this.nodes) { try { node.stop(); } catch { /* already ended */ } }
    this.nodes.clear();
  }
  cue(kind: BroadcastCue, config: BroadcastConfig): void {
    if (!this.enabled) return;
    const src = config.sounds?.[kind];
    if (src) { this.play(src); return; }
    const notes: Record<BroadcastCue, number[]> = {
      entrance: [146.83, 220, 293.66, 440], question: [110, 164.81, 220, 329.63],
      score: [293.66, 369.99, 440], champion: [196, 246.94, 293.66, 392, 493.88, 587.33],
    };
    notes[kind].forEach((frequency, i) => this.tone(frequency, i * .16, kind === 'champion' ? 1.2 : .65));
  }
  tension(config: BroadcastConfig, active: boolean): void {
    if (!active || !this.enabled) { this.stopBed(); return; }
    if (config.sounds?.musicBed) { if (!this.bed) this.bed = this.play(config.sounds.musicBed, true); return; }
    if (this.bedTones.length || !this.context) return;
    const context = this.context; this.bedGain = context.createGain(); this.bedGain.gain.value = .007;
    this.bedGain.connect(context.destination);
    // Quiet original sustained harmony under the final wager; projects may replace it with a music asset.
    for (const frequency of [110, 164.81, 220.4]) {
      const tone = context.createOscillator(); tone.frequency.value = frequency; tone.type = 'sine'; tone.connect(this.bedGain); tone.start(); this.bedTones.push(tone);
    }
  }
  private stopBed(): void {
    if (this.bed) { this.bed.pause(); this.playing.delete(this.bed); this.bed = undefined; }
    for (const tone of this.bedTones) { tone.stop(); tone.disconnect(); }
    this.bedTones = []; this.bedGain?.disconnect(); this.bedGain = undefined;
  }
  private play(src: string, loop = false): HTMLAudioElement {
    const audio = new Audio(src); audio.volume = loop ? .18 : .45; audio.loop = loop;
    this.playing.add(audio); audio.onended = () => this.playing.delete(audio);
    void audio.play().catch(() => this.playing.delete(audio)); return audio;
  }
  private tone(frequency: number, delay: number, duration: number): void {
    const context = this.context; if (!context) return;
    const oscillator = context.createOscillator(); const gain = context.createGain();
    oscillator.type = 'triangle'; oscillator.frequency.value = frequency;
    const start = context.currentTime + delay; gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(.035, start + .025); gain.gain.exponentialRampToValueAtTime(.001, start + duration);
    oscillator.connect(gain); gain.connect(context.destination); this.nodes.add(oscillator);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); this.nodes.delete(oscillator); };
    oscillator.start(start); oscillator.stop(start + duration + .05);
  }
  dispose(): void { this.mute(); void this.context?.close(); }
}
