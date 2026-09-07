/** Playback only: static, caption-matched clips. Cancellation resolves outstanding playback. */
export class TeaserAudioPlayer {
  private clip?: HTMLAudioElement;
  private finish?: (played: boolean) => void;
  constructor(private readonly createAudio: () => HTMLAudioElement = () => new Audio()) {}

  play(url: string): Promise<boolean> {
    this.stop();
    return new Promise((resolve) => {
      try {
        const clip = this.createAudio();
        this.clip = clip;
        const timeout = setTimeout(() => complete(false), 45_000);
        const complete = (played: boolean) => {
          clearTimeout(timeout);
          clip.onended = null;
          clip.onerror = null;
          clip.pause();
          if (this.clip === clip) {
            this.clip = undefined;
            this.finish = undefined;
          }
          resolve(played);
        };
        this.finish = complete;
        clip.onended = () => complete(true);
        clip.onerror = () => complete(false);
        clip.src = url;
        void clip.play().catch(() => complete(false));
      } catch {
        this.finish = undefined;
        resolve(false);
      }
    });
  }

  stop(): void {
    this.finish?.(false);
    this.clip?.pause();
    this.clip = undefined;
  }
}
