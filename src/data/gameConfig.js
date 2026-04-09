// Game configuration constants
export const GAME_CONFIG = {
  // Player attributes
  PLAYER_SPEED: 180,
  PLAYER_MAX_HP: 100,
  PLAYER_MAX_MP: 50,

  // Scale factors
  SCALE_FACTOR: 2,
  PLAYER_SCALE: 2,
  OBJECT_SCALE: 2,
  CAM_SCALE: 1.8,

  // Map configuration
  TILE_SIZE: 16,
  MAP_WIDTH: 30,
  MAP_HEIGHT: 25,

  // Level-up gains
  LEVEL_UP_HP_GAIN: 10,
  LEVEL_UP_MP_GAIN: 5,

  // EXP scaling
  EXP_SCALING_FACTOR: 1.5,

  // Death penalty
  DEATH_GOLD_PENALTY_RATIO: 0.5,
  DEATH_HP_RESTORE_RATIO: 0.3,
  DEATH_MP_RESTORE_RATIO: 0.3,
};

// Initial player state
export const INITIAL_PLAYER_STATE = {
  hp: 100,
  maxHp: 100,
  mp: 50,
  maxMp: 50,
  exp: 0,
  expToLevel: 100,
  level: 1,
  gold: 0,
  inventory: [],
  keys: 0,
};
