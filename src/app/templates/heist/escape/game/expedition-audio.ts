/** Small original synthesized soundscape. Started only by a player gesture; no downloaded audio. */
export class ExpeditionAudio {
  private context?: AudioContext;
  private master?: GainNode;
  private wind?: AudioBufferSourceNode;
  private enabled = true;
  private lastStep = 0;
  start(): void {
    try {
      this.context ??= new AudioContext();
      void this.context.resume();
      if (this.master) return;
      const c = this.context;
      this.master = c.createGain();
      this.master.gain.value = this.enabled ? 0.2 : 0;
      this.master.connect(c.destination);
      const buffer = c.createBuffer(1, c.sampleRate * 3, c.sampleRate),
        channel = buffer.getChannelData(0);
      let previous = 0;
      for (let i = 0; i < channel.length; i++) {
        previous = (previous + (Math.random() * 2 - 1) * 0.015) / 1.02;
        channel[i] = previous;
      }
      this.wind = c.createBufferSource();
      this.wind.buffer = buffer;
      this.wind.loop = true;
      const filter = c.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 340;
      this.wind.connect(filter);
      filter.connect(this.master);
      this.wind.start();
    } catch {
      /* Audio is optional; every cue also has visual feedback. */
    }
  }
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (this.master && this.context)
      this.master.gain.setTargetAtTime(enabled ? 0.2 : 0, this.context.currentTime, 0.1);
  }
  cue(kind: 'turn' | 'open' | 'wrong' | 'finish'): void {
    const notes = {
      turn: [520],
      open: [392, 523.25, 659.25],
      wrong: [196, 164.81],
      finish: [261.63, 329.63, 392, 523.25, 659.25, 783.99],
    }[kind];
    notes.forEach((hz, i) =>
      this.tone(
        hz,
        i * 0.11,
        kind === 'turn' ? 0.045 : 0.32,
        kind === 'wrong' ? 'triangle' : 'sine',
      ),
    );
  }
  step(time: number): void {
    if (time - this.lastStep > 0.3) {
      this.lastStep = time;
      this.tone(100 + Math.random() * 30, 0, 0.04, 'triangle', 0.09);
    }
  }
  private tone(
    hz: number,
    delay: number,
    duration: number,
    type: OscillatorType,
    volume = 0.38,
  ): void {
    const c = this.context;
    if (!c || !this.master || !this.enabled) return;
    const osc = c.createOscillator(),
      gain = c.createGain(),
      t = c.currentTime + delay;
    osc.type = type;
    osc.frequency.setValueAtTime(hz, t);
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.exponentialRampToValueAtTime(volume, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(t);
    osc.stop(t + duration + 0.05);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  }
  destroy(): void {
    try {
      this.wind?.stop();
      void this.context?.close();
    } catch {
      /* Already closed. */
    }
  }
}
