// A simple utility to trigger haptic feedback on supported devices.

const patterns = {
    correct: [100],          // A short, single buzz for a correct answer
    incorrect: [75, 50, 75], // A double buzz for an incorrect answer
    time_up: [200],          // A longer buzz for time expiration
    generic: [50],           // A very short buzz for generic interactions
};

export type HapticPattern = keyof typeof patterns;

/**
 * Triggers a vibration pattern if the browser supports the Vibration API.
 * @param {HapticPattern} pattern - The key for the desired vibration pattern.
 */
export const triggerHaptic = (pattern: HapticPattern) => {
    // Check if the Vibration API is supported by the browser and navigator is available.
    if (typeof window !== 'undefined' && 'vibrate' in window.navigator) {
        try {
            // Vibrate with the selected pattern.
            window.navigator.vibrate(patterns[pattern]);
        } catch (error) {
            console.error("Haptic feedback failed:", error);
        }
    }
};
