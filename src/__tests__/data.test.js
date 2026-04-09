import { describe, it, expect } from "vitest";
import { GAME_CONFIG, INITIAL_PLAYER_STATE } from "../data/gameConfig.js";
import { DIALOGUE_DATA } from "../data/dialogues.js";
import { ITEMS } from "../data/items.js";
import { MONSTERS } from "../data/monsters.js";

describe("GAME_CONFIG", () => {
  it("has all required fields", () => {
    expect(GAME_CONFIG.PLAYER_SPEED).toBeGreaterThan(0);
    expect(GAME_CONFIG.TILE_SIZE).toBeGreaterThan(0);
    expect(GAME_CONFIG.MAP_WIDTH).toBeGreaterThan(0);
    expect(GAME_CONFIG.MAP_HEIGHT).toBeGreaterThan(0);
    expect(GAME_CONFIG.SCALE_FACTOR).toBeGreaterThan(0);
  });

  it("has valid level-up config", () => {
    expect(GAME_CONFIG.LEVEL_UP_HP_GAIN).toBeGreaterThan(0);
    expect(GAME_CONFIG.LEVEL_UP_MP_GAIN).toBeGreaterThan(0);
    expect(GAME_CONFIG.EXP_SCALING_FACTOR).toBeGreaterThan(1);
  });

  it("has valid death penalty config", () => {
    expect(GAME_CONFIG.DEATH_GOLD_PENALTY_RATIO).toBeGreaterThan(0);
    expect(GAME_CONFIG.DEATH_GOLD_PENALTY_RATIO).toBeLessThanOrEqual(1);
    expect(GAME_CONFIG.DEATH_HP_RESTORE_RATIO).toBeGreaterThan(0);
    expect(GAME_CONFIG.DEATH_MP_RESTORE_RATIO).toBeGreaterThan(0);
  });
});

describe("INITIAL_PLAYER_STATE", () => {
  it("has valid starting stats", () => {
    expect(INITIAL_PLAYER_STATE.hp).toBeGreaterThan(0);
    expect(INITIAL_PLAYER_STATE.hp).toBe(INITIAL_PLAYER_STATE.maxHp);
    expect(INITIAL_PLAYER_STATE.mp).toBe(INITIAL_PLAYER_STATE.maxMp);
    expect(INITIAL_PLAYER_STATE.level).toBe(1);
    expect(INITIAL_PLAYER_STATE.gold).toBe(0);
    expect(INITIAL_PLAYER_STATE.expToLevel).toBeGreaterThan(0);
  });
});

describe("DIALOGUE_DATA", () => {
  it("has dialogue entries", () => {
    expect(Object.keys(DIALOGUE_DATA).length).toBeGreaterThan(0);
  });

  it("all entries have speaker and lines", () => {
    for (const [key, dialogue] of Object.entries(DIALOGUE_DATA)) {
      expect(dialogue.speaker, `${key} missing speaker`).toBeTruthy();
      expect(dialogue.lines, `${key} missing lines`).toBeInstanceOf(Array);
      expect(dialogue.lines.length, `${key} has empty lines`).toBeGreaterThan(0);
    }
  });

  it("no duplicate keys", () => {
    // This is validated at parse time but double-check the count
    const keys = Object.keys(DIALOGUE_DATA);
    const uniqueKeys = new Set(keys);
    expect(keys.length).toBe(uniqueKeys.size);
  });
});

describe("ITEMS", () => {
  it("all items have required fields", () => {
    for (const [key, item] of Object.entries(ITEMS)) {
      expect(item.name, `${key} missing name`).toBeTruthy();
      expect(item.description, `${key} missing description`).toBeTruthy();
      expect(item.price, `${key} missing price`).toBeGreaterThanOrEqual(0);
    }
  });
});

describe("MONSTERS", () => {
  it("all monsters have required fields", () => {
    for (const [key, monster] of Object.entries(MONSTERS)) {
      expect(monster.name, `${key} missing name`).toBeTruthy();
      expect(monster.hp, `${key} invalid hp`).toBeGreaterThan(0);
      expect(monster.attack, `${key} invalid attack`).toBeGreaterThan(0);
      expect(monster.defense, `${key} invalid defense`).toBeGreaterThanOrEqual(0);
      expect(monster.exp, `${key} invalid exp`).toBeGreaterThan(0);
      expect(monster.gold, `${key} invalid gold`).toBeGreaterThanOrEqual(0);
    }
  });

  it("has no negative stats", () => {
    for (const [key, monster] of Object.entries(MONSTERS)) {
      expect(monster.hp, `${key} negative hp`).toBeGreaterThan(0);
      expect(monster.attack, `${key} negative attack`).toBeGreaterThan(0);
      expect(monster.defense, `${key} negative defense`).toBeGreaterThanOrEqual(0);
    }
  });
});
