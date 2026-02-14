// 矿石山地图 - 挖矿和探索区域
import { TILE_TYPES } from "./tileTypes";
import { PLANTS, INTERACTABLES, ITEMS, CHARACTERS, ROCKS } from "../sprites";

const G = TILE_TYPES.GRASS;
const S = TILE_TYPES.SAND;
const P = TILE_TYPES.PATH;
const B = TILE_TYPES.BLUE;

// 30x25 矿山地图
export const MINE_MAP = {
  name: "矿石山",
  width: 30,
  height: 25,
  spawnPoint: { x: 15, y: 22 },
  bgColor: "#2e1a1a",
  tiles: [
    [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
    [S,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,S],
    [S,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,S],
    [S,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,S],
    [S,B,B,B,B,B,B,B,B,P,P,P,P,P,P,P,P,P,P,P,P,B,B,B,B,B,B,B,B,S],
    [S,B,B,B,B,B,B,B,B,P,B,B,B,B,B,B,B,B,B,B,P,B,B,B,B,B,B,B,B,S],
    [S,B,B,B,B,B,B,B,B,P,B,B,B,B,B,B,B,B,B,B,P,B,B,B,B,B,B,B,B,S],
    [S,B,B,B,B,B,B,B,B,P,B,B,B,B,B,B,B,B,B,B,P,B,B,B,B,B,B,B,B,S],
    [S,B,B,B,P,P,P,P,P,P,B,B,B,B,B,B,B,B,B,B,P,P,P,P,P,P,B,B,B,S],
    [S,B,B,B,P,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,P,B,B,B,S],
    [S,B,B,B,P,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,P,B,B,B,S],
    [S,B,B,B,P,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,P,B,B,B,S],
    [S,B,B,B,P,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,P,B,B,B,S],
    [S,B,B,B,P,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,P,B,B,B,S],
    [S,B,B,B,P,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,P,B,B,B,S],
    [S,B,B,B,P,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,B,P,B,B,B,S],
    [S,B,B,B,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,B,B,B,S],
    [S,B,B,B,B,B,B,B,B,B,B,B,B,B,P,P,B,B,B,B,B,B,B,B,B,B,B,B,B,S],
    [S,B,B,B,B,B,B,B,B,B,B,B,B,B,P,P,B,B,B,B,B,B,B,B,B,B,B,B,B,S],
    [S,B,B,B,B,B,B,B,B,B,B,B,B,B,P,P,B,B,B,B,B,B,B,B,B,B,B,B,B,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,G,G,G,G,G,G,G,G,G,G,G,G,G,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,S],
    [S,S,S,S,S,S,S,S,S,S,S,S,S,S,P,P,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
  ],
};

// 矿山对象
export const MINE_OBJECTS = [
  // ===== NPC =====
  { type: "npc", x: 10, y: 21, name: "miner", frame: CHARACTERS.blacksmith.down, dialogue: "miner" },
  
  // ===== 大量矿石 (可挖掘) =====
  // 铜矿
  { type: "ore", x: 2, y: 2, frame: ROCKS.ore.copper, itemType: "ore_copper" },
  { type: "ore", x: 5, y: 3, frame: ROCKS.ore.copper, itemType: "ore_copper" },
  { type: "ore", x: 27, y: 2, frame: ROCKS.ore.copper, itemType: "ore_copper" },
  { type: "ore", x: 24, y: 3, frame: ROCKS.ore.copper, itemType: "ore_copper" },
  
  // 铁矿
  { type: "ore", x: 3, y: 6, frame: ROCKS.ore.iron, itemType: "ore_iron" },
  { type: "ore", x: 6, y: 7, frame: ROCKS.ore.iron, itemType: "ore_iron" },
  { type: "ore", x: 26, y: 6, frame: ROCKS.ore.iron, itemType: "ore_iron" },
  { type: "ore", x: 23, y: 7, frame: ROCKS.ore.iron, itemType: "ore_iron" },
  
  // 金矿 (稀有)
  { type: "ore", x: 5, y: 10, frame: ROCKS.ore.gold, itemType: "ore_gold" },
  { type: "ore", x: 24, y: 10, frame: ROCKS.ore.gold, itemType: "ore_gold" },
  { type: "ore", x: 15, y: 5, frame: ROCKS.ore.gold, itemType: "ore_gold" },
  
  // 宝石矿 (极稀有)
  { type: "ore", x: 15, y: 10, frame: ROCKS.ore.gem, itemType: "ore_gem" },
  
  // ===== 水晶 =====
  { type: "crystal", x: 6, y: 12, frame: ROCKS.crystal.red },
  { type: "crystal", x: 7, y: 13, frame: ROCKS.crystal.blue },
  { type: "crystal", x: 8, y: 12, frame: ROCKS.crystal.green },
  { type: "crystal", x: 22, y: 12, frame: ROCKS.crystal.red },
  { type: "crystal", x: 23, y: 13, frame: ROCKS.crystal.blue },
  { type: "crystal", x: 24, y: 12, frame: ROCKS.crystal.green },
  
  // ===== 石头障碍 =====
  { type: "rock", x: 11, y: 6, frame: ROCKS.large[0] },
  { type: "rock", x: 19, y: 6, frame: ROCKS.large[1] },
  { type: "rock", x: 11, y: 14, frame: ROCKS.medium[0] },
  { type: "rock", x: 19, y: 14, frame: ROCKS.medium[1] },
  { type: "rock", x: 6, y: 15, frame: ROCKS.small[0] },
  { type: "rock", x: 23, y: 15, frame: ROCKS.small[1] },
  
  // ===== 宝箱 =====
  { type: "chest", x: 15, y: 12, name: "mine_chest1", frame: INTERACTABLES.chest.golden, gold: 300, locked: true },
  { type: "chest", x: 2, y: 15, name: "mine_chest2", frame: INTERACTABLES.chest.closed, gold: 100 },
  { type: "chest", x: 27, y: 15, name: "mine_chest3", frame: INTERACTABLES.chest.closed, gold: 100 },
  
  // ===== 火把照明 =====
  { type: "torch", x: 9, y: 4, frame: INTERACTABLES.torch.wall },
  { type: "torch", x: 20, y: 4, frame: INTERACTABLES.torch.wall },
  { type: "torch", x: 4, y: 8, frame: INTERACTABLES.torch.wall },
  { type: "torch", x: 25, y: 8, frame: INTERACTABLES.torch.wall },
  { type: "torch", x: 4, y: 16, frame: INTERACTABLES.torch.wall },
  { type: "torch", x: 25, y: 16, frame: INTERACTABLES.torch.wall },
  
  // ===== 怪物生成点 =====
  { type: "enemy_spawn", x: 12, y: 8, enemyType: "skeleton", level: 5 },
  { type: "enemy_spawn", x: 18, y: 8, enemyType: "skeleton", level: 5 },
  { type: "enemy_spawn", x: 8, y: 13, enemyType: "bat", level: 3 },
  { type: "enemy_spawn", x: 22, y: 13, enemyType: "bat", level: 3 },
  
  // ===== 彩蛋 =====
  { type: "egg", x: 2, y: 18, frame: PLANTS.eggs.purple, itemType: "egg_purple" },
  { type: "egg", x: 27, y: 18, frame: PLANTS.eggs.yellow, itemType: "egg_yellow" },
  
  // ===== 物品 =====
  { type: "item", x: 20, y: 21, frame: ITEMS.potionGreen, itemType: "speedPotion" },
  { type: "item", x: 5, y: 21, frame: ITEMS.keyBronze, itemType: "keyBronze" },
  
  // ===== 告示牌 =====
  { type: "sign", x: 14, y: 22, frame: INTERACTABLES.sign.arrow, dialogue: "sign_village_back" },
  { type: "sign", x: 9, y: 5, frame: INTERACTABLES.sign.stone, dialogue: "sign_mine_danger" },
  
  // ===== 传送点 =====
  { type: "portal", x: 14, y: 24, targetArea: "village", targetX: 14, targetY: 1 },
  { type: "portal", x: 15, y: 24, targetArea: "village", targetX: 15, targetY: 1 },
];
