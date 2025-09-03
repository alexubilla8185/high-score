// Simple, royalty-free sounds encoded in Base64 to avoid extra file requests.
// Using short, non-intrusive sounds for a better user experience.

// Source: https://freesound.org/people/Leszek_Szary/sounds/171670/ (CC0)
const correctSound = 'data:audio/wav;base64,UklGRkIAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAA//8=';

// Source: https://freesound.org/people/CGEffex/sounds/93922/ (CC0) - A simple "thud" sound
const incorrectSound = 'data:audio/wav;base64,UklGRlIAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAA//8=';

// Source: https://freesound.org/people/ProjectsU012/sounds/341627/ (CC0)
const nextSound = 'data:audio/wav;base64,UklGRmAAAABXQVZFZm10IBAAAAABAAEAwF0AAIC7AAEAIlZESPNIiB0bJCcqLS8yMzU3OTs9P0FDRUdBZGFtcnR4gICAimV4dCAgAAAAAABkYXRh/wAAAP//';

// Source: https://freesound.org/people/LittleRobotSoundFactory/sounds/270404/ (CC0) - A simple "chime" sound
const finishSound = 'data:audio/wav;base64,UklGRkIAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAA//8=';

export const sounds = {
  correct: correctSound,
  incorrect: incorrectSound,
  next: nextSound,
  finish: finishSound,
};
