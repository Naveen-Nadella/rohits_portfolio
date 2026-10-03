// Subtle synthetic acoustic chime using Web Audio API
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleSound(): boolean {
    this.isEnabled = !this.isEnabled;
    if (this.isEnabled) {
      this.initCtx();
      this.playChime(528, 1.2); // Ancient 528Hz Solfeggio / meditative harmonic
    }
    return this.isEnabled;
  }

  public getStatus(): boolean {
    return this.isEnabled;
  }

  public playChime(freq = 432, duration = 1.0) {
    if (!this.isEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      // Gentle pitch decay
      osc.frequency.exponentialRampToValueAtTime(freq * 0.99, this.ctx.currentTime + duration);

      // Volume envelope: soft attack, long decaying ring like a bronze singing bowl
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay restrictions gracefully handled
    }
  }

  public playBrushSwipe() {
    if (!this.isEnabled) return;
    this.playChime(320, 0.4);
  }
}

export const soundEngine = new SoundEngine();
