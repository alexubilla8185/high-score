import { sounds } from './sounds';

type SoundType = keyof typeof sounds;

let audio: HTMLAudioElement | null = null;

// Ensure this code only runs in the browser
if (typeof window !== 'undefined') {
  audio = new Audio();
}

export const playSound = (sound: SoundType) => {
  if (audio && sounds[sound]) {
    audio.src = sounds[sound];
    audio.play().catch(error => {
      // Autoplay can be blocked by the browser, log error if it happens.
      // FIX: Explicitly convert `sound` to a string to prevent potential runtime errors with symbols.
      console.error(`Audio play failed for sound: ${String(sound)}`, error);
    });
  }
};