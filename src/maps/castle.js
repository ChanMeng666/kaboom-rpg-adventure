// 王国城堡地图 - 最终区域
import { TILE_TYPES } from "./tileTypes";
import {
  PLANTS, BUILDINGS, FURNITURE, FENCES, INTERACTABLES,
  ITEMS, CHARACTERS, SPECIAL_CHARS, ROCKS
} from "../sprites";

const G = TILE_TYPES.GRASS;
const S = TILE_TYPES.SAND;
const P = TILE_TYPES.PATH;
const B = TILE_TYPES.BLUE;

// 30x25 城堡地图
export const CASTLE_MAP = {
  name: "王国城堡",
  width: 30,
  height: 25,
  spawnPoint: { x: 2, y: 12 },
  bgColor: "#1a1a2e",
  tiles: [
    [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,B,B,B,B,B,B,B,B,B,B,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,B,B,B,B,B,B,B,B,B,B,B,B,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,B,B,B,B,B,B,B,B,B,B,B,B,B,B,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,B,B,B,B,B,B,B,B,B,B,B,B,B,B,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,B,B,B,B,B,B,B,B,B,B,B,B,B,B,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,B,B,B,B,B,B,B,B,B,B,B,B,B,B,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,B,B,B,B,B,B,B,B,B,B,B,B,B,B,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,B,B,B,B,B,B,B,B,B,B,B,B,B,B,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,B,B,B,B,B,B,B,B,B,B,B,B,B,B,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,B,B,B,B,B,P,P,B,B,B,B,B,G,G,G,G,G,G,G,G,S],
    [P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
  ],
};

// 城堡对象
export const CASTLE_OBJECTS = [
  // ===== 国王 =====
  { type: "king", x: 15, y: 5, name: "king", frame: SPECIAL_CHARS.king.front, dialogue: "king" },
  
  // ===== NPC - 骑士守卫 =====
  { type: "npc", x: 10, y: 10, name: "knight1", frame: CHARACTERS.knight.down, dialogue: "knight" },
  { type: "npc", x: 20, y: 10, name: "knight2", frame: CHARACTERS.knight.down, dialogue: "knight" },
  { type: "npc", x: 12, y: 7, name: "guard1", frame: CHARACTERS.guard.down, dialogue: "guard" },
  { type: "npc", x: 18, y: 7, name: "guard2", frame: CHARACTERS.guard.down, dialogue: "guard" },
  
  // ===== 法师 =====
  { type: "npc", x: 15, y: 8, name: "wizard", frame: CHARACTERS.mage.down, dialogue: "wizard" },
  
  // ===== 城堡建筑 =====
  { type: "building", x: 15, y: 4, name: "throne_room", style: "tower", enterable: true, interior: "throne_room" },
  
  // ===== 王座装饰 =====
  { type: "furniture", x: 15, y: 6, frame: FURNITURE.chair.throne },
  
  // ===== 地毯 (通向王座) =====
  { type: "rug", x: 14, y: 10, frame: FURNITURE.rug.top },
  { type: "rug", x: 15, y: 10, frame: FURNITURE.rug.top },
  { type: "rug", x: 16, y: 10, frame: FURNITURE.rug.top },
  { type: "rug", x: 14, y: 9, frame: FURNITURE.rug.center },
  { type: "rug", x: 15, y: 9, frame: FURNITURE.rug.center },
  { type: "rug", x: 16, y: 9, frame: FURNITURE.rug.center },
  
  // ===== 旗帜 =====
  { type: "flag", x: 10, y: 3, frame: INTERACTABLES.flag.red },
  { type: "flag", x: 12, y: 3, frame: INTERACTABLES.flag.blue },
  { type: "flag", x: 18, y: 3, frame: INTERACTABLES.flag.blue },
  { type: "flag", x: 20, y: 3, frame: INTERACTABLES.flag.red },
  
  // ===== 火把 =====
  { type: "torch", x: 9, y: 5, frame: INTERACTABLES.torch.wall },
  { type: "torch", x: 21, y: 5, frame: INTERACTABLES.torch.wall },
  { type: "torch", x: 9, y: 9, frame: INTERACTABLES.torch.wall },
  { type: "torch", x: 21, y: 9, frame: INTERACTABLES.torch.wall },
  
  // ===== 石栏杆 =====
  { type: "fence", x: 8, y: 11, frame: FENCES.stone.horizontal },
  { type: "fence", x: 9, y: 11, frame: FENCES.stone.horizontal },
  { type: "fence", x: 10, y: 11, frame: FENCES.stone.pillar },
  { type: "fence", x: 20, y: 11, frame: FENCES.stone.pillar },
  { type: "fence", x: 21, y: 11, frame: FENCES.stone.horizontal },
  { type: "fence", x: 22, y: 11, frame: FENCES.stone.horizontal },
  
  // ===== 雕像 =====
  { type: "statue", x: 11, y: 5, frame: SPECIAL_CHARS.statue },
  { type: "statue", x: 19, y: 5, frame: SPECIAL_CHARS.statue },
  
  // ===== 花盆装饰 =====
  { type: "furniture", x: 10, y: 6, frame: FURNITURE.plant.large },
  { type: "furniture", x: 20, y: 6, frame: FURNITURE.plant.large },
  
  // ===== 宝箱 (奖励) =====
  { type: "chest", x: 5, y: 5, name: "castle_chest1", frame: INTERACTABLES.chest.golden, gold: 500, locked: true },
  { type: "chest", x: 25, y: 5, name: "castle_chest2", frame: INTERACTABLES.chest.golden, gold: 500, locked: true },
  
  // ===== 高级物品 =====
  { type: "item", x: 5, y: 20, frame: ITEMS.swordGold, itemType: "swordGold" },
  { type: "item", x: 25, y: 20, frame: ITEMS.shieldGold, itemType: "shieldGold" },
  { type: "item", x: 15, y: 20, frame: ITEMS.keyGold, itemType: "keyGold" },
  
  // ===== 彩蛋 =====
  { type: "egg", x: 3, y: 3, frame: PLANTS.eggs.red, itemType: "egg_red" },
  { type: "egg", x: 27, y: 3, frame: PLANTS.eggs.orange, itemType: "egg_orange" },
  
  // ===== 树木 =====
  { type: "tree", x: 3, y: 15, variant: "pine" },
  { type: "tree", x: 27, y: 15, variant: "pine" },
  { type: "tree", x: 3, y: 21, variant: "green" },
  { type: "tree", x: 27, y: 21, variant: "green" },
  
  // ===== 花朵 =====
  { type: "flower", x: 5, y: 15, frame: PLANTS.flowers.red },
  { type: "flower", x: 25, y: 15, frame: PLANTS.flowers.red },
  { type: "flower", x: 5, y: 21, frame: PLANTS.flowers.yellow },
  { type: "flower", x: 25, y: 21, frame: PLANTS.flowers.yellow },
  
  // ===== BOSS战触发点 =====
  { type: "boss_trigger", x: 15, y: 15, bossType: "demon_lord" },
  
  // ===== 告示牌 =====
  { type: "sign", x: 2, y: 12, frame: INTERACTABLES.sign.arrow, dialogue: "sign_village_back" },
  
  // ===== Mi-Casa 风格建筑 =====
  { type: "building", x: 10, y: 18, name: "library", style: "dark", enterable: true, interior: "library" },

  // ===== 传送点 =====
  { type: "portal", x: 0, y: 12, targetArea: "village", targetX: 28, targetY: 12 },
];
