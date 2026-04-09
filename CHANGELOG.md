# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.1.0] - 2026-04-09

### Added
- ESLint + Prettier for code quality enforcement
- `.editorconfig` and `jsconfig.json` for IDE consistency
- `src/data/` module for separated game data (config, dialogues, items, monsters)
- New `gameState.js` helper functions: `applyDeathPenalty()`, `spendMana()`, `takeDamage()`, `fullRestore()`
- Lint step in CI/CD pipeline
- `CONTRIBUTING.md` with development guidelines

### Changed
- Renamed `src/utils.js` to `src/uiHelpers.js` for clarity
- Renamed `public/mi-casa/` to `public/tilesets/interior/` for discoverability
- Split `src/constants.js` (563 lines) into focused data modules under `src/data/`
- All state mutations now go through `gameState.js` helper functions
- Console messages standardized to English with `[Module]` prefix
- Level-up stats and death penalty now use `GAME_CONFIG` constants
- Fixed package.json name to match repository (`kaboom-rpg-adventure`)

### Removed
- Dead `src/world.js` (736 unused lines)
- Duplicate functions in `src/utils.js` (`healPlayer`, `addGold`, `addExp`, `restoreMana`)
- Legacy `playerState` alias
- `public/debug-atlas.html` (dev-only tool shipped in production)
- Redundant `terser` devDependency (Vite handles minification natively)
- Duplicate `sign_forest` dialogue key in constants

### Fixed
- ESLint errors: duplicate object key, useless assignments
- 50+ unused imports across the codebase
- Direct state mutations bypassing `gameState.js` in 6 files

## [1.0.0] - Initial Release

### Features
- Pixel-art RPG with Kaboom.js engine
- 5 explorable areas: Village, Forest, Lake, Mine, Castle
- Turn-based battle system with skills
- NPC dialogue system
- Quest system (main + side quests)
- Inventory and equipment system
- Shop and trading
- Achievement system
- Save/load system (3 slots)
- Fishing and mining minigames
- Interior scenes with Mi-Casa tilesets
