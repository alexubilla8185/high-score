# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.6.1] - 2024-08-02

### Added
- A new `CHANGELOG.md` file to track project history.
- A comprehensive `README.md` file.
- A "How It Works" button and modal to provide users with app information.

### Changed
- Replaced static header icons with dynamic, animated versions that change color and scale when active, improving visual feedback.
- Made the background of header icons translucent for a cleaner look.

## [2.6.0] - 2024-08-01

### Added
- Themed "Spirit Guide" levels: Bob Marley, Willie Nelson, and Snoop Dogg, each with a unique vibe, question style, and content focus.
- Dynamic question type generation based on the selected "vibe," creating more varied and appropriate challenges for each level.
- "Coming Soon" buttons for planned features like Achievements and Mini-Games, with stoner-themed toast notifications.
- Subtle, rewarding animations to the results screen, including a score that counts up and staggered fade-in effects for text elements.
- Informational toast type (`info`) with a distinct blue style.

### Changed
- Refactored the start screen to merge "Vibe" and "AI Personality" into a single, thematic choice.
- Enhanced the Gemini API prompts with detailed instructions for each personality and vibe to generate more relevant and creative content.

## [2.5.0]

### Changed
- Implemented a "True Black" dark mode for higher contrast and better aesthetics on OLED screens.
- Revamped the main CTA button with a unique, animated gradient flow effect.
- Unified component styling for a more cohesive look and feel across the application.

## [2.0.0]

### Added
- Focus-visible states for all interactive elements to improve accessibility.
- Retry logic for image generation to gracefully handle API failures.

### Changed
- Major architectural refactor to use a centralized state reducer (`useReducer` & Context API) for more predictable and manageable state.
- Optimized performance by using `useMemo` for expensive calculations on the results screen.