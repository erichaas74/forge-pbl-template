/** Small synthesized mechanical cues; no network audio, no autoplay before interaction. */
export class TimingCageSound {
  private context?: AudioContext;
  enabled = true;
  private gone = false;
  private nodes = new Set<OscillatorNode>();
  unlock(): void {
    if (!this.enabled || this.gone) return;
    try {
      this.context ??= new AudioContext();
      void this.context.resume().catch(() => {});
    } catch {
      /* Silent operation remains available. */
    }
  }
  play(kind: 'tick' | 'latch' | 'door' | 'step' | 'free'): void {
    const ctx = this.context;
    if (!ctx || ctx.state !== 'running' || !this.enabled || this.gone) return;
    const frequencies = { tick: 850, latch: 260, door: 95, step: 150, free: 660 };
    const seconds = kind === 'free' ? 0.35 : kind === 'door' ? 0.3 : 0.075;
    const tone = ctx.createOscillator(),
      gain = ctx.createGain();
    tone.type = kind === 'free' ? 'sine' : 'triangle';
    tone.frequency.setValueAtTime(frequencies[kind], ctx.currentTime);
    tone.frequency.exponentialRampToValueAtTime(frequencies[kind] * 0.5, ctx.currentTime + seconds);
    gain.gain.setValueAtTime(kind === 'step' ? 0.018 : 0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + seconds);
    tone.connect(gain);
    gain.connect(ctx.destination);
    this.nodes.add(tone);
    tone.onended = () => {
      tone.disconnect();
      gain.disconnect();
      this.nodes.delete(tone);
    };
    tone.start();
    tone.stop(ctx.currentTime + seconds);
  }
  suspend(): void {
    if (this.context?.state === 'running') void this.context.suspend().catch(() => {});
  }
  resume(): void {
    if (this.context?.state === 'suspended' && this.enabled)
      void this.context.resume().catch(() => {});
  }
  destroy(): void {
    this.gone = true;
    this.nodes.forEach((node) => {
      try {
        node.stop();
      } catch {
        /* Already ended. */
      }
    });
    this.nodes.clear();
    if (this.context) void this.context.close().catch(() => {});
  }
}
