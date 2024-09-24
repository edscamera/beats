import { Injectable } from '@angular/core';
import { Sound } from '../models/Sound';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audioCtx: AudioContext = new AudioContext();
  constructor() {}

  play(options: Sound): void {
    // Ensure the audio context is running
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const oscillator = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();

    // Set oscillator properties
    oscillator.type = options.type ?? 'sine';
    oscillator.frequency.value = options.frequency ?? 440;

    // Connect the oscillator to the gain node and then to the destination
    oscillator.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    // Set the gain (volume) and create an envelope
    gainNode.gain.setValueAtTime(options.volume ?? 1, this.audioCtx.currentTime); // Start at full volume
    gainNode.gain.linearRampToValueAtTime(
      0,
      this.audioCtx.currentTime + (options.duration ?? 0) / 1000,
    ); // Quick decay

    // Start and stop the oscillator
    oscillator.start();
    oscillator.stop(this.audioCtx.currentTime + (options.duration ?? 0) / 1000);

    // Optionally adjust frequency over time
    oscillator.frequency.setValueAtTime(150, this.audioCtx.currentTime); // Initial frequency
    oscillator.frequency.linearRampToValueAtTime(
      0,
      this.audioCtx.currentTime + (options.duration ?? 0) / 1000,
    ); // Drop in frequency for punch
  }
}
