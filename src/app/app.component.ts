import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AudioService } from './services/audio.service';
import { Track } from './models/Track';
import { DropdownModule } from 'primeng/dropdown';
import { Sound } from './models/Sound';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, DropdownModule, TableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private audioService: AudioService
  ) {}

  public tracks: Track[] = [];
  public sounds: Sound[] = [{
    duration: 100,
    frequency: 440,
    name: "Sound 1",
    type: "sine",
    volume: 0.5,
  }];

  public addTrack(): void {
    this.tracks.push({
      notes: [],
    });
  }

  public soundMenu = {
    visible: false,
    sound: <Sound | null>null,
    play: (sound: Sound) => {
      this.audioService.play(sound);
    },
    edit: (sound: Sound | null) => {
      this.soundMenu.visible = true;
      this.soundMenu.sound = structuredClone(sound) ?? {
        duration: 100,
        frequency: 440,
        name: `New Sound ${this.sounds.length + 1}`,
        type: "sine",
        volume: 0.5,
      };
    },
    delete: (sound: Sound) => {
      this.sounds = this.sounds.filter(s => s !== sound);
    },
  };
}
