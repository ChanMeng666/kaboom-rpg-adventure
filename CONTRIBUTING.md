# Contributing to Kaboom RPG Adventure

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/kaboom-rpg-adventure.git
   cd kaboom-rpg-adventure
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser** at `http://localhost:5173`

## Project Structure

```
src/
  data/           # Game data (config, dialogues, items, monsters)
  battle/         # Battle system and enemy AI
  maps/           # Map layouts and tile definitions
  minigames/      # Fishing, mining minigames
  quest/          # Quest system
  scenes/         # Game scenes (start, world, battle, interior)
  ui/             # UI systems (inventory, shop, achievements, save/load)
  gameState.js    # Centralized state management
  uiHelpers.js    # UI helper functions (dialogue, camera, HUD)
  sprites.js      # Sprite and asset loading
  player.js       # Player entity and controls
  main.js         # Entry point
public/
  tilesets/        # Interior tileset assets
  assets/          # Minigame and UI assets
```

## Coding Conventions

- **Language**: JavaScript (ES modules)
- **Formatting**: Prettier (run `npm run format` before committing)
- **Linting**: ESLint (run `npm run lint` to check)
- **State mutations**: Always use `gameState.js` helper functions (e.g., `healPlayer()`, `addGold()`) instead of mutating `gameState.player` directly
- **Console messages**: Use English with `[Module]` prefix (e.g., `console.log("[Battle] Enemy defeated")`)
- **User-facing text**: Chinese (all dialogue, UI labels)
- **Data vs Logic**: Game data belongs in `src/data/`, game logic in other modules

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |

## Pull Request Process

1. Create a feature branch from `master`
2. Make your changes
3. Ensure `npm run lint` and `npm run build` pass
4. Submit a PR with a clear description of changes

## Adding New Content

### New Area/Map
1. Create map data in `src/maps/newarea.js`
2. Export from `src/maps/index.js`
3. Add portal entries in `AREA_PORTALS`
4. Register in `src/areaManager.js`

### New Enemy
1. Add enemy data to `src/data/monsters.js`
2. Add sprite frame mapping in `src/battle/enemies.js`

### New NPC Dialogue
1. Add dialogue entry in `src/data/dialogues.js`
2. Place NPC in the map's objects array

### New Item
1. Add to `src/data/items.js` (shop definition)
2. Add to `src/ui/inventory.js` `ITEM_DATA` (inventory definition)
