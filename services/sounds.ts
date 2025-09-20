// Simple, royalty-free sounds encoded in Base64 to avoid extra file requests.
// Using short, non-intrusive sounds for a better user experience.

// Source: Generated, simple sine wave tones (CC0)
const correctSound = 'data:audio/wav;base64,UklGRkIAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAg/8P/hP+L/4z/jv+Q/5P/l/+b/5//ov+l/6r/rv+w/7X/uv+9/8H/yP/N/8//1f/Z/9v/3//j/+j/7P/v//H/9P/4//z//v8=';

// Source: Generated, simple square wave tones (CC0)
const incorrectSound = 'data:audio/wav;base64,UklGRkgAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YUgAAACg/8L/vv+z/6X/oP+V/5H/i/+D/73/tf+q/6T/nf+V/4v/gv+9/7P/p/+c/5X/i/+C/7z/s/+n/5z/lf+L/4L/vP+z/6f/nP+V/4v/gv+8/7P/p/+c/5X/i/+C/7z/s/+n/5z/lf+L/4L/vP+z/6f/nP+V/4v/gg==';

// Source: Generated, simple click (CC0)
const nextSound = 'data:audio/wav;base64,UklGRlAAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YUIAAABg/4P/gv+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4T/hP+E/4Q=';

// Source: Generated, simple chime (CC0)
const finishSound = 'data:audio/wav;base64,UklGRlIAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAADg/8L/x/+i/5T/iP+A/7r/q/+d/5L/hf+9/7H/of+T/4f/vP+t/5//kv+G/73/sP+h/5P/h/+9/63/n/+S/4b/vf+w/6H/k/+H/73/rf+f/5L/hv+9/7D/of+T/4f/vf+t/5//kv+G/70=';

export const sounds = {
  correct: correctSound,
  incorrect: incorrectSound,
  next: nextSound,
  finish: finishSound,
};
