// 神秘森林地图 - 战斗和采集区域
import { TILE_TYPES } from "./tileTypes";
import { PLANTS, TREES, INTERACTABLES, ITEMS, CHARACTERS, ROCKS } from "../sprites";

const G = TILE_TYPES.GRASS;
const S = TILE_TYPES.SAND;
const P = TILE_TYPES.PATH;

// 30x25 森林地图
export const FOREST_MAP = {
  name: "神秘森林",
  width: 30,
  height: 25,
  spawnPoint: { x: 28, y: 12 },
  bgColor: "#1a2e1a",
  tiles: [
    [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,P,P,P,P,P,P,P,P,P,P,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,P,P,P,P,P,P,P,P,P,P,P],
    [S,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,P,P,P,P,P,P,P,P,P,P,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
  ],
};

// 森林对象 - 大量树木和采集物
export const FOREST_OBJECTS = [
  // ===== 大量树木 (迷宫般的布局) =====
  // 左上区域
  { type: "tree", x: 2, y: 2, variant: "green" },
  { type: "tree", x: 5, y: 2, variant: "brown" },
  { type: "tree", x: 8, y: 2, variant: "green" },
  { type: "tree", x: 2, y: 5, variant: "pine" },
  { type: "tree", x: 5, y: 5, variant: "green" },
  { type: "tree", x: 8, y: 5, variant: "dead" },
  { type: "tree", x: 2, y: 8, variant: "green" },
  { type: "tree", x: 5, y: 8, variant: "brown" },
  
  // 右上区域
  { type: "tree", x: 22, y: 2, variant: "green" },
  { type: "tree", x: 25, y: 2, variant: "pine" },
  { type: "tree", x: 22, y: 5, variant: "brown" },
  { type: "tree", x: 25, y: 5, variant: "green" },
  
  // 左下区域
  { type: "tree", x: 2, y: 17, variant: "green" },
  { type: "tree", x: 5, y: 17, variant: "dead" },
  { type: "tree", x: 8, y: 17, variant: "green" },
  { type: "tree", x: 2, y: 20, variant: "pine" },
  { type: "tree", x: 5, y: 20, variant: "green" },
  { type: "tree", x: 8, y: 20, variant: "brown" },
  { type: "tree", x: 2, y: 23, variant: "green" },
  
  // 右下区域
  { type: "tree", x: 22, y: 17, variant: "green" },
  { type: "tree", x: 25, y: 17, variant: "fruitTree" },
  { type: "tree", x: 22, y: 20, variant: "brown" },
  { type: "tree", x: 25, y: 20, variant: "green" },
  { type: "tree", x: 27, y: 22, variant: "pine" },
  
  // ===== NPC - 弓箭手 =====
  { type: "npc", x: 15, y: 10, name: "archer", frame: CHARACTERS.archer.down, dialogue: "archer" },
  
  // ===== 采集物 - 蘑菇 =====
  { type: "collectible", x: 3, y: 3, frame: PLANTS.mushrooms.red, itemType: "mushroom_red" },
  { type: "collectible", x: 6, y: 4, frame: PLANTS.mushrooms.brown, itemType: "mushroom_brown" },
  { type: "collectible", x: 4, y: 18, frame: PLANTS.mushrooms.purple, itemType: "mushroom_purple" },
  { type: "collectible", x: 7, y: 19, frame: PLANTS.mushrooms.blue, itemType: "mushroom_blue" },
  { type: "collectible", x: 23, y: 3, frame: PLANTS.mushrooms.cluster1, itemType: "mushroom_cluster" },
  { type: "collectible", x: 24, y: 18, frame: PLANTS.mushrooms.cluster2, itemType: "mushroom_cluster" },
  
  // ===== 采集物 - 草药/花朵 =====
  { type: "collectible", x: 12, y: 7, frame: PLANTS.flowers.red, itemType: "herb_red" },
  { type: "collectible", x: 18, y: 7, frame: PLANTS.flowers.yellow, itemType: "herb_yellow" },
  { type: "collectible", x: 12, y: 13, frame: PLANTS.flowers.pink, itemType: "herb_pink" },
  { type: "collectible", x: 18, y: 13, frame: PLANTS.flowers.orange, itemType: "herb_orange" },
  
  // ===== 宝箱 =====
  { type: "chest", x: 15, y: 8, name: "forest_chest1", frame: INTERACTABLES.chest.closed, gold: 50 },
  { type: "chest", x: 3, y: 22, name: "forest_chest2", frame: INTERACTABLES.chest.locked, gold: 150, locked: true },
  
  // ===== 怪物生成点 (战斗触发) =====
  { type: "enemy_spawn", x: 4, y: 10, enemyType: "slime", level: 1 },
  { type: "enemy_spawn", x: 26, y: 8, enemyType: "slime", level: 2 },
  { type: "enemy_spawn", x: 4, y: 15, enemyType: "goblin", level: 3 },
  { type: "enemy_spawn", x: 26, y: 18, enemyType: "wolf", level: 5 },
  
  // ===== 草丛装饰 =====
  { type: "grass", x: 11, y: 8, frame: PLANTS.grass.tall1 },
  { type: "grass", x: 19, y: 8, frame: PLANTS.grass.tall2 },
  { type: "grass", x: 11, y: 12, frame: PLANTS.grass.short1 },
  { type: "grass", x: 19, y: 12, frame: PLANTS.grass.short2 },
  
  // ===== 石头障碍 =====
  { type: "rock", x: 14, y: 6, frame: ROCKS.medium[0] },
  { type: "rock", x: 16, y: 6, frame: ROCKS.medium[1] },
  { type: "rock", x: 14, y: 14, frame: ROCKS.small[0] },
  { type: "rock", x: 16, y: 14, frame: ROCKS.small[1] },
  
  // ===== 告示牌 =====
  { type: "sign", x: 28, y: 11, frame: INTERACTABLES.sign.arrow, dialogue: "sign_village_back" },
  
  // ===== 传送点 =====
  { type: "portal", x: 29, y: 10, targetArea: "village", targetX: 1, targetY: 12 },
  { type: "portal", x: 29, y: 11, targetArea: "village", targetX: 1, targetY: 12 },
  { type: "portal", x: 29, y: 12, targetArea: "village", targetX: 1, targetY: 12 },
];
