// 宁静湖泊地图 - 钓鱼和探索区域
import { TILE_TYPES } from "./tileTypes";
import { PLANTS, TREES, INTERACTABLES, ITEMS, CHARACTERS, ROCKS } from "../sprites";

const G = TILE_TYPES.GRASS;
const S = TILE_TYPES.SAND;
const P = TILE_TYPES.PATH;
const W = TILE_TYPES.WATER_SHALLOW;
const D = TILE_TYPES.WATER_DEEP;

// 30x25 湖泊地图
export const LAKE_MAP = {
  name: "宁静湖泊",
  width: 30,
  height: 25,
  spawnPoint: { x: 15, y: 2 },
  bgColor: "#1a2e3e",
  tiles: [
    [S,S,S,S,S,S,S,S,S,S,S,S,S,S,P,P,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,G,G,G,G,G,G,S],
    [S,G,G,G,G,W,W,W,W,D,D,D,D,D,D,D,D,D,D,W,W,W,W,W,G,G,G,G,G,S],
    [S,G,G,G,G,W,W,W,D,D,D,D,D,D,D,D,D,D,D,D,W,W,W,W,G,G,G,G,G,S],
    [S,G,G,G,G,W,W,D,D,D,D,D,D,D,D,D,D,D,D,D,D,W,W,W,G,G,G,G,G,S],
    [S,G,G,G,G,W,W,D,D,D,D,D,D,D,D,D,D,D,D,D,D,W,W,W,G,G,G,G,G,S],
    [S,G,G,G,G,W,W,D,D,D,D,D,D,D,D,D,D,D,D,D,D,W,W,W,G,G,G,G,G,S],
    [S,G,G,G,G,W,W,D,D,D,D,D,D,D,D,D,D,D,D,D,D,W,W,W,G,G,G,G,G,S],
    [S,G,G,G,G,W,W,D,D,D,D,D,D,D,D,D,D,D,D,D,D,W,W,W,G,G,G,G,G,S],
    [S,G,G,G,G,W,W,D,D,D,D,D,D,D,D,D,D,D,D,D,D,W,W,W,G,G,G,G,G,S],
    [S,G,G,G,G,W,W,W,D,D,D,D,D,D,D,D,D,D,D,D,W,W,W,W,G,G,G,G,G,S],
    [S,G,G,G,G,W,W,W,W,D,D,D,D,D,D,D,D,D,D,W,W,W,W,W,G,G,G,G,G,S],
    [S,G,G,G,G,G,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
  ],
};

// 湖泊对象
export const LAKE_OBJECTS = [
  // ===== NPC - 渔夫 =====
  { type: "npc", x: 5, y: 5, name: "fisher", frame: CHARACTERS.fisher.down, dialogue: "fisher" },
  
  // ===== 钓鱼点 =====
  { type: "fishing_spot", x: 6, y: 6, name: "fishing1" },
  { type: "fishing_spot", x: 24, y: 6, name: "fishing2" },
  { type: "fishing_spot", x: 6, y: 16, name: "fishing3" },
  { type: "fishing_spot", x: 24, y: 16, name: "fishing4" },
  
  // ===== 树木 =====
  { type: "tree", x: 2, y: 2, variant: "green" },
  { type: "tree", x: 27, y: 2, variant: "brown" },
  { type: "tree", x: 2, y: 20, variant: "pine" },
  { type: "tree", x: 27, y: 20, variant: "green" },
  { type: "tree", x: 2, y: 10, variant: "fruitTree" },
  { type: "tree", x: 27, y: 10, variant: "dead" },
  
  // ===== 花朵 =====
  { type: "flower", x: 4, y: 19, frame: PLANTS.flowers.tulipRed },
  { type: "flower", x: 5, y: 20, frame: PLANTS.flowers.tulipOrange },
  { type: "flower", x: 25, y: 19, frame: PLANTS.flowers.tulipYellow },
  { type: "flower", x: 26, y: 20, frame: PLANTS.flowers.tulipPink },
  
  // ===== 石头 =====
  { type: "rock", x: 3, y: 18, frame: ROCKS.large[0] },
  { type: "rock", x: 26, y: 18, frame: ROCKS.medium[0] },
  
  // ===== 水晶 (湖边特产) =====
  { type: "crystal", x: 4, y: 17, frame: ROCKS.crystal.blue },
  { type: "crystal", x: 25, y: 17, frame: ROCKS.crystal.blue },
  
  // ===== 宝箱 (隐藏) =====
  { type: "chest", x: 2, y: 22, name: "lake_chest1", frame: INTERACTABLES.chest.closed, gold: 80 },
  { type: "chest", x: 27, y: 22, name: "lake_chest2", frame: INTERACTABLES.chest.golden, gold: 200, locked: true },
  
  // ===== 彩蛋收集 =====
  { type: "egg", x: 3, y: 21, frame: PLANTS.eggs.blue, itemType: "egg_blue" },
  { type: "egg", x: 26, y: 21, frame: PLANTS.eggs.green, itemType: "egg_green" },
  
  // ===== 物品 =====
  { type: "item", x: 10, y: 20, frame: ITEMS.potionBlue, itemType: "mpPotion" },
  { type: "item", x: 20, y: 20, frame: ITEMS.gemBlue, itemType: "gemBlue" },
  
  // ===== 告示牌 =====
  { type: "sign", x: 14, y: 2, frame: INTERACTABLES.sign.arrow, dialogue: "sign_village_back" },
  { type: "sign", x: 4, y: 4, frame: INTERACTABLES.sign.wood, dialogue: "sign_lake" },
  
  // ===== 传送点 =====
  { type: "portal", x: 14, y: 0, targetArea: "village", targetX: 14, targetY: 23 },
  { type: "portal", x: 15, y: 0, targetArea: "village", targetX: 15, targetY: 23 },
];
