// 像素村地图 - 主城区域
import { TILE_TYPES } from "./tileTypes";
import {
  PLANTS, TREES, BUILDINGS, FURNITURE, FENCES, INTERACTABLES,
  ITEMS, CHARACTERS, SPECIAL_CHARS, UI_HEARTS, ROCKS
} from "../sprites";

const G = TILE_TYPES.GRASS;
const S = TILE_TYPES.SAND;
const P = TILE_TYPES.PATH;

// 30x25 村庄地图
export const VILLAGE_MAP = {
  name: "像素村",
  width: 30,
  height: 25,
  spawnPoint: { x: 15, y: 12 },
  bgColor: "#311047",
  tiles: [
    [S,S,S,S,S,S,S,S,S,S,S,S,S,S,P,P,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,P,P,P,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,P,P,P,P,G,G,G,G,S],
    [S,G,G,P,G,P,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,P,G,G,P,G,G,G,G,S],
    [S,G,G,P,P,P,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,P,G,G,P,G,G,G,G,S],
    [S,G,G,G,P,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,P,P,P,P,G,G,G,G,S],
    [S,G,G,G,P,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,P,G,G,G,G,G,S],
    [S,G,G,G,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,P,P,P,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,P,P,P,P,G,G,G,G,S],
    [S,G,G,P,G,P,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,P,G,G,P,G,G,G,G,S],
    [S,G,G,P,P,P,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,P,G,G,P,G,G,G,G,S],
    [S,G,G,G,P,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,P,P,P,P,G,G,G,G,S],
    [S,G,G,G,P,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,P,G,G,G,G,G,S],
    [S,G,G,G,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,S,S,S,S,S,S,S,S,S,S,S,S,S,P,P,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
  ],
};

// 村庄对象
export const VILLAGE_OBJECTS = [
  // ===== NPC =====
  { type: "npc", x: 4, y: 4, name: "elder", frame: CHARACTERS.elder.down, dialogue: "elder" },
  { type: "npc", x: 23, y: 4, name: "merchant", frame: CHARACTERS.merchant.down, dialogue: "merchant" },
  { type: "npc", x: 4, y: 15, name: "blacksmith", frame: CHARACTERS.blacksmith.down, dialogue: "blacksmith" },
  { type: "npc", x: 23, y: 15, name: "innkeeper", frame: CHARACTERS.innkeeper.down, dialogue: "innkeeper" },
  { type: "npc", x: 10, y: 10, name: "villager1", frame: CHARACTERS.villager1.down, dialogue: "villager1" },
  { type: "npc", x: 20, y: 10, name: "villager2", frame: CHARACTERS.villager2.down, dialogue: "villager2" },
  { type: "npc", x: 8, y: 20, name: "child", frame: CHARACTERS.child.down, dialogue: "child" },
  
  // ===== 建筑 (可进入) =====
  { type: "building", x: 4, y: 5, name: "elder_house", style: "light", enterable: true, interior: "elder_house" },
  { type: "building", x: 23, y: 5, name: "shop", style: "dark", enterable: true, interior: "shop" },
  { type: "building", x: 4, y: 16, name: "smithy", style: "dark", enterable: true, interior: "smithy" },
  { type: "building", x: 23, y: 16, name: "inn", style: "light", enterable: true, interior: "inn" },
  
  // ===== 水井 =====
  { type: "well", x: 15, y: 8, name: "village_well" },
  
  // ===== 告示牌 =====
  { type: "sign", x: 14, y: 11, frame: INTERACTABLES.sign.wood, dialogue: "sign_village" },
  { type: "sign", x: 1, y: 12, frame: INTERACTABLES.sign.arrow, dialogue: "sign_forest" },
  { type: "sign", x: 28, y: 12, frame: INTERACTABLES.sign.arrow, dialogue: "sign_castle" },
  { type: "sign", x: 15, y: 1, frame: INTERACTABLES.sign.arrow, dialogue: "sign_mine" },
  { type: "sign", x: 15, y: 23, frame: INTERACTABLES.sign.arrow, dialogue: "sign_lake" },
  
  // ===== 树木装饰 =====
  { type: "tree", x: 2, y: 2, variant: "green" },
  { type: "tree", x: 8, y: 2, variant: "brown" },
  { type: "tree", x: 27, y: 2, variant: "green" },
  { type: "tree", x: 2, y: 22, variant: "pine" },
  { type: "tree", x: 27, y: 22, variant: "fruitTree" },
  
  // ===== 花朵装饰 =====
  { type: "flower", x: 6, y: 3, frame: PLANTS.flowers.red },
  { type: "flower", x: 7, y: 4, frame: PLANTS.flowers.orange },
  { type: "flower", x: 25, y: 3, frame: PLANTS.flowers.yellow },
  { type: "flower", x: 26, y: 4, frame: PLANTS.flowers.pink },
  { type: "flower", x: 6, y: 14, frame: PLANTS.flowers.tulipRed },
  { type: "flower", x: 7, y: 15, frame: PLANTS.flowers.tulipOrange },
  { type: "flower", x: 25, y: 14, frame: PLANTS.flowers.tulipYellow },
  { type: "flower", x: 26, y: 15, frame: PLANTS.flowers.tulipPink },
  
  // ===== 物品收集 =====
  { type: "item", x: 3, y: 10, frame: ITEMS.coin, itemType: "coin", respawn: false },
  { type: "item", x: 26, y: 10, frame: ITEMS.potionRed, itemType: "hpPotion", respawn: false },
  
  // ===== 栅栏 =====
  { type: "fence", x: 9, y: 8, frame: FENCES.wood.horizontal },
  { type: "fence", x: 10, y: 8, frame: FENCES.wood.horizontal },
  { type: "fence", x: 11, y: 8, frame: FENCES.wood.post },
  { type: "fence", x: 19, y: 8, frame: FENCES.wood.post },
  { type: "fence", x: 20, y: 8, frame: FENCES.wood.horizontal },
  { type: "fence", x: 21, y: 8, frame: FENCES.wood.horizontal },
  
  // ===== Mi-Casa 风格建筑 =====
  { type: "building", x: 10, y: 5, name: "cozy_house", style: "light", enterable: true, interior: "cozy_house" },
  { type: "building", x: 16, y: 16, name: "restaurant", style: "dark", enterable: true, interior: "restaurant" },

  // ===== 传送点标记 =====
  { type: "portal", x: 0, y: 12, targetArea: "forest", targetX: 28, targetY: 12 },
  { type: "portal", x: 29, y: 12, targetArea: "castle", targetX: 1, targetY: 12 },
  { type: "portal", x: 14, y: 0, targetArea: "mine", targetX: 15, targetY: 23 },
  { type: "portal", x: 15, y: 0, targetArea: "mine", targetX: 15, targetY: 23 },
  { type: "portal", x: 14, y: 24, targetArea: "lake", targetX: 15, targetY: 1 },
  { type: "portal", x: 15, y: 24, targetArea: "lake", targetX: 15, targetY: 1 },
];
