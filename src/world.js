// 游戏世界/地图模块 - 使用所有精灵素材
import { k } from "./kaboomCtx";
import { GAME_CONFIG, DIALOGUE_DATA } from "./constants";
import {
  SAND_TILES, GRASS_TILES, BLUE_TILES, GOLD_TILES,
  PLANTS, UI_NUMBERS, SPECIAL_CHARS, UI_HEARTS, ITEMS,
  BUILDINGS, TREES, FURNITURE, FENCES, INTERACTABLES,
  ROCKS, EFFECTS, CHARACTERS, getRandomDecoration
} from "./sprites";
import { displayDialogue, healPlayer, addGold, addExp, updateUI, playerState } from "./utils";

// ========== 大型地图 (35x30) ==========
const MAP_WIDTH = 35;
const MAP_HEIGHT = 30;

// 地图布局: 0=草地, 1=沙地边界, 2=金色路径, 3=浅水, 4=深水, 5=蓝色地面
const MAP_LAYOUT = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,3,3,4,4,4,3,3,0,0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,1],
  [1,0,0,2,2,2,0,0,3,4,4,4,4,4,3,0,0,0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,1],
  [1,0,0,2,5,2,0,0,3,3,4,4,4,3,3,0,0,0,0,0,0,0,0,2,0,0,0,2,2,2,2,0,0,0,1],
  [1,0,0,2,2,2,0,0,0,3,3,3,3,3,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,0,0,0,1],
  [1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,0,0,2,0,0,0,0,0,0,2,0,0,0,1],
  [1,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,0,0,2,2,2,2,2,2,2,2,0,0,0,1],
  [1,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1],
  [1,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1],
  [1,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,1],
  [1,2,0,0,2,2,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,2,0,1],
  [1,2,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,1],
  [1,2,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,1],
  [1,2,2,2,2,2,2,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,1],
  [1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,1],
  [1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,0,0,0,2,0,0,0,1],
  [1,0,0,0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,3,3,4,4,4,3,3,0,0,2,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,3,4,4,4,4,4,3,0,0,2,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,3,3,4,4,4,3,3,2,2,2,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const TILE_FRAMES = {
  0: GRASS_TILES.center,
  1: SAND_TILES.center,
  2: GOLD_TILES.center,
  3: BLUE_TILES.center,  // 浅水 → 蓝色地面 (原 WATER_TILES 是彩虹条纹)
  4: BLUE_TILES.top,     // 深水 → 深蓝色地面
  5: BLUE_TILES.center,
};

// ========== 所有世界对象 ==========
const WORLD_OBJECTS = [
  // ========== NPC角色 (使用所有角色变体) ==========
  { type: "npc", x: 4, y: 4, name: "elder", frame: CHARACTERS.elder.down, dialogue: "elder" },
  { type: "npc", x: 17, y: 7, name: "merchant", frame: CHARACTERS.merchant.down, dialogue: "merchant" },
  { type: "npc", x: 25, y: 5, name: "guard", frame: CHARACTERS.guard.down, dialogue: "guard" },
  { type: "npc", x: 3, y: 15, name: "villager1", frame: CHARACTERS.villager1.down, dialogue: "villager1" },
  { type: "npc", x: 8, y: 17, name: "villager2", frame: CHARACTERS.villager2.down, dialogue: "villager2" },
  { type: "npc", x: 28, y: 10, name: "villager3", frame: CHARACTERS.villager3.down, dialogue: "villager3" },
  { type: "npc", x: 15, y: 23, name: "child", frame: CHARACTERS.child.down, dialogue: "child" },
  { type: "npc", x: 27, y: 4, name: "wizard", frame: CHARACTERS.mage.down, dialogue: "wizard" },
  { type: "npc", x: 12, y: 10, name: "knight", frame: CHARACTERS.knight.down, dialogue: "knight" },
  { type: "npc", x: 20, y: 17, name: "archer", frame: CHARACTERS.archer.down, dialogue: "archer" },
  { type: "npc", x: 6, y: 22, name: "farmer", frame: CHARACTERS.farmer.down, dialogue: "farmer" },
  { type: "npc", x: 10, y: 2, name: "fisher", frame: CHARACTERS.fisher.down, dialogue: "fisher" },
  { type: "npc", x: 30, y: 15, name: "blacksmith", frame: CHARACTERS.blacksmith.down, dialogue: "blacksmith" },
  { type: "npc", x: 18, y: 15, name: "innkeeper", frame: CHARACTERS.innkeeper.down, dialogue: "innkeeper" },
  { type: "npc", x: 32, y: 25, name: "thief", frame: CHARACTERS.thief.down, dialogue: "thief" },
  // 更多NPC颜色变体
  { type: "npc", x: 5, y: 27, name: "npc_blue", frame: CHARACTERS.npc1.down, dialogue: "villager1" },
  { type: "npc", x: 10, y: 27, name: "npc_green", frame: CHARACTERS.npc2.down, dialogue: "villager2" },
  { type: "npc", x: 15, y: 27, name: "npc_purple", frame: CHARACTERS.npc3.down, dialogue: "villager3" },
  { type: "npc", x: 20, y: 27, name: "npc_red", frame: CHARACTERS.npc4.down, dialogue: "villager1" },
  
  // ========== 国王 ==========
  { type: "king", x: 27, y: 6, name: "king", frame: SPECIAL_CHARS.king.front, dialogue: "king" },
  
  // ========== 宝箱 (所有类型) ==========
  { type: "chest", x: 32, y: 2, name: "chest1", frame: INTERACTABLES.chest.closed, gold: 100 },
  { type: "chest", x: 2, y: 27, name: "chest2", frame: INTERACTABLES.chest.golden, gold: 200 },
  { type: "chest", x: 19, y: 8, name: "chest3", frame: INTERACTABLES.chest.small, gold: 50 },
  { type: "chest", x: 30, y: 20, name: "chest4", frame: INTERACTABLES.chest.locked, gold: 300, locked: true },
  
  // ========== 水井 ==========
  { type: "well", x: 7, y: 8, name: "well1" },
  { type: "well", x: 25, y: 15, name: "well2" },
  
  // ========== 告示牌 (所有类型) ==========
  { type: "sign", x: 8, y: 5, frame: INTERACTABLES.sign.wood, dialogue: "sign_village" },
  { type: "sign", x: 22, y: 20, frame: INTERACTABLES.sign.stone, dialogue: "sign_lake" },
  { type: "sign", x: 15, y: 10, frame: INTERACTABLES.sign.arrow, dialogue: "sign_forest" },
  { type: "signpost", x: 12, y: 15, frame: INTERACTABLES.signpost, dialogue: "sign_crossroad" },
  
  // ========== 箱子、桶、罐子 ==========
  { type: "container", x: 17, y: 6, frame: INTERACTABLES.barrel.normal },
  { type: "container", x: 18, y: 6, frame: INTERACTABLES.barrel.open },
  { type: "container", x: 19, y: 6, frame: INTERACTABLES.crate.normal },
  { type: "container", x: 16, y: 17, frame: INTERACTABLES.pot.normal },
  { type: "container", x: 17, y: 17, frame: INTERACTABLES.pot.broken },
  
  // ========== 火把 ==========
  { type: "torch", x: 16, y: 7, frame: INTERACTABLES.torch.wall },
  { type: "torch", x: 20, y: 7, frame: INTERACTABLES.torch.wall },
  { type: "torch", x: 26, y: 5, frame: INTERACTABLES.torch.wall },
  { type: "torch", x: 28, y: 5, frame: INTERACTABLES.torch.wall },
  
  // ========== 旗帜 (所有颜色) ==========
  { type: "flag", x: 26, y: 3, frame: INTERACTABLES.flag.red },
  { type: "flag", x: 28, y: 3, frame: INTERACTABLES.flag.blue },
  { type: "flag", x: 30, y: 3, frame: INTERACTABLES.flag.green },
  { type: "flag", x: 32, y: 3, frame: INTERACTABLES.flag.yellow },
  
  // ========== 道具收集 (所有类型) ==========
  // 药水
  { type: "item", x: 5, y: 10, frame: ITEMS.potionRed, itemType: "hpPotion" },
  { type: "item", x: 22, y: 8, frame: ITEMS.potionBlue, itemType: "mpPotion" },
  { type: "item", x: 30, y: 12, frame: ITEMS.potionGreen, itemType: "speedPotion" },
  { type: "item", x: 8, y: 25, frame: ITEMS.potionYellow, itemType: "expPotion" },
  // 钱币和宝石
  { type: "item", x: 3, y: 8, frame: ITEMS.coin, itemType: "coin" },
  { type: "item", x: 12, y: 3, frame: ITEMS.coinStack, itemType: "coinStack" },
  { type: "item", x: 28, y: 22, frame: ITEMS.gemRed, itemType: "gemRed" },
  { type: "item", x: 5, y: 20, frame: ITEMS.gemBlue, itemType: "gemBlue" },
  { type: "item", x: 33, y: 8, frame: ITEMS.gemGreen, itemType: "gemGreen" },
  { type: "item", x: 25, y: 25, frame: ITEMS.gemYellow, itemType: "gemYellow" },
  // 钥匙
  { type: "item", x: 10, y: 18, frame: ITEMS.keyBronze, itemType: "keyBronze" },
  { type: "item", x: 22, y: 12, frame: ITEMS.keySilver, itemType: "keySilver" },
  { type: "item", x: 2, y: 5, frame: ITEMS.keyGold, itemType: "keyGold" },
  // 武器图标
  { type: "item", x: 32, y: 17, frame: ITEMS.sword, itemType: "sword" },
  { type: "item", x: 15, y: 5, frame: ITEMS.shield, itemType: "shield" },
  // 其他物品
  { type: "item", x: 20, y: 25, frame: ITEMS.scroll, itemType: "scroll" },
  { type: "item", x: 8, y: 12, frame: ITEMS.ring, itemType: "ring" },
  
  // ========== 树木 (所有类型) ==========
  { type: "tree", x: 2, y: 2, variant: "green" },
  { type: "tree", x: 6, y: 3, variant: "brown" },
  { type: "tree", x: 14, y: 2, variant: "pine" },
  { type: "tree", x: 2, y: 12, variant: "dead" },
  { type: "tree", x: 2, y: 20, variant: "fruitTree" },
  { type: "tree", x: 6, y: 26, variant: "green" },
  { type: "tree", x: 12, y: 26, variant: "brown" },
  { type: "tree", x: 22, y: 26, variant: "pine" },
  { type: "tree", x: 28, y: 26, variant: "green" },
  { type: "tree", x: 33, y: 5, variant: "dead" },
  { type: "tree", x: 33, y: 12, variant: "green" },
  { type: "tree", x: 33, y: 20, variant: "fruitTree" },
  // 树苗和树桩
  { type: "sapling", x: 4, y: 25, frame: TREES.sapling.small },
  { type: "sapling", x: 10, y: 25, frame: TREES.sapling.medium },
  { type: "stump", x: 16, y: 26, frame: TREES.stump },
  
  // ========== 花朵 (所有颜色和类型) ==========
  // 普通花
  { type: "flower", x: 6, y: 5, frame: PLANTS.flowers.red },
  { type: "flower", x: 7, y: 6, frame: PLANTS.flowers.orange },
  { type: "flower", x: 8, y: 7, frame: PLANTS.flowers.yellow },
  { type: "flower", x: 9, y: 6, frame: PLANTS.flowers.pink },
  // 郁金香
  { type: "flower", x: 20, y: 2, frame: PLANTS.flowers.tulipRed },
  { type: "flower", x: 21, y: 3, frame: PLANTS.flowers.tulipOrange },
  { type: "flower", x: 22, y: 2, frame: PLANTS.flowers.tulipYellow },
  { type: "flower", x: 23, y: 3, frame: PLANTS.flowers.tulipPink },
  
  // ========== 蛋/彩蛋装饰 (所有颜色) ==========
  { type: "egg", x: 5, y: 15, frame: PLANTS.eggs.red },
  { type: "egg", x: 6, y: 16, frame: PLANTS.eggs.orange },
  { type: "egg", x: 7, y: 15, frame: PLANTS.eggs.yellow },
  { type: "egg", x: 8, y: 16, frame: PLANTS.eggs.green },
  { type: "egg", x: 9, y: 15, frame: PLANTS.eggs.blue },
  { type: "egg", x: 10, y: 16, frame: PLANTS.eggs.purple },
  { type: "egg", x: 11, y: 15, frame: PLANTS.eggs.pink },
  
  // ========== 蘑菇 (所有类型) ==========
  { type: "mushroom", x: 3, y: 18, frame: PLANTS.mushrooms.red },
  { type: "mushroom", x: 4, y: 19, frame: PLANTS.mushrooms.brown },
  { type: "mushroom", x: 31, y: 8, frame: PLANTS.mushrooms.purple },
  { type: "mushroom", x: 32, y: 9, frame: PLANTS.mushrooms.blue },
  { type: "mushroom", x: 25, y: 18, frame: PLANTS.mushrooms.cluster1 },
  { type: "mushroom", x: 26, y: 19, frame: PLANTS.mushrooms.cluster2 },
  
  // ========== 灌木 (所有类型) ==========
  { type: "bush", x: 10, y: 5, frame: PLANTS.bushes.small },
  { type: "bush", x: 12, y: 6, frame: PLANTS.bushes.medium },
  { type: "bush", x: 14, y: 5, frame: PLANTS.bushes.large },
  { type: "bush", x: 30, y: 25, frame: PLANTS.bushes.round1 },
  { type: "bush", x: 31, y: 26, frame: PLANTS.bushes.round2 },
  { type: "bush", x: 32, y: 25, frame: PLANTS.bushes.round3 },
  { type: "bush", x: 33, y: 26, frame: PLANTS.bushes.round4 },
  
  // ========== 草丛 (所有变体) ==========
  { type: "grass", x: 9, y: 10, frame: PLANTS.grass.short1 },
  { type: "grass", x: 10, y: 11, frame: PLANTS.grass.short2 },
  { type: "grass", x: 11, y: 10, frame: PLANTS.grass.short3 },
  { type: "grass", x: 12, y: 11, frame: PLANTS.grass.short4 },
  { type: "grass", x: 25, y: 8, frame: PLANTS.grass.tall1 },
  { type: "grass", x: 26, y: 9, frame: PLANTS.grass.tall2 },
  { type: "grass", x: 27, y: 8, frame: PLANTS.grass.tall3 },
  { type: "grass", x: 28, y: 9, frame: PLANTS.grass.tall4 },
  
  // ========== 石头 (所有大小) ==========
  { type: "rock", x: 14, y: 12, frame: ROCKS.small[0] },
  { type: "rock", x: 15, y: 13, frame: ROCKS.small[1] },
  { type: "rock", x: 16, y: 12, frame: ROCKS.small[2] },
  { type: "rock", x: 7, y: 20, frame: ROCKS.medium[0] },
  { type: "rock", x: 8, y: 21, frame: ROCKS.medium[1] },
  { type: "rock", x: 24, y: 12, frame: ROCKS.large[0] },
  // 矿石
  { type: "ore", x: 31, y: 18, frame: ROCKS.ore.copper },
  { type: "ore", x: 32, y: 19, frame: ROCKS.ore.iron },
  { type: "ore", x: 33, y: 18, frame: ROCKS.ore.gold },
  // 水晶
  { type: "crystal", x: 24, y: 22, frame: ROCKS.crystal.blue },
  { type: "crystal", x: 25, y: 23, frame: ROCKS.crystal.red },
  { type: "crystal", x: 26, y: 22, frame: ROCKS.crystal.green },
  
  // ========== 建筑物 ==========
  { type: "building", x: 4, y: 5, style: "light" },
  { type: "building", x: 17, y: 8, style: "dark" },
  { type: "building", x: 27, y: 7, style: "tower" },
  { type: "building", x: 17, y: 18, style: "light" },
  
  // ========== 室内家具区域 ==========
  // 床
  { type: "furniture", x: 3, y: 16, frame: FURNITURE.bed.topLeft },
  { type: "furniture", x: 4, y: 16, frame: FURNITURE.bed.topRight },
  { type: "furniture", x: 3, y: 17, frame: FURNITURE.bed.bottomLeft },
  { type: "furniture", x: 4, y: 17, frame: FURNITURE.bed.bottomRight },
  // 桌椅
  { type: "furniture", x: 18, y: 16, frame: FURNITURE.table.small },
  { type: "furniture", x: 19, y: 16, frame: FURNITURE.table.round },
  { type: "furniture", x: 17, y: 16, frame: FURNITURE.chair.front },
  { type: "furniture", x: 20, y: 16, frame: FURNITURE.chair.back },
  // 柜子和书架
  { type: "furniture", x: 18, y: 19, frame: FURNITURE.cabinet.small },
  { type: "furniture", x: 19, y: 19, frame: FURNITURE.cabinet.bookshelf },
  { type: "furniture", x: 20, y: 19, frame: FURNITURE.cabinet.bookshelfFull },
  // 盆栽
  { type: "furniture", x: 16, y: 19, frame: FURNITURE.plant.small },
  { type: "furniture", x: 21, y: 19, frame: FURNITURE.plant.medium },
  { type: "furniture", x: 22, y: 19, frame: FURNITURE.plant.cactus },
  // 灯具
  { type: "furniture", x: 16, y: 16, frame: FURNITURE.lamp.table },
  { type: "furniture", x: 21, y: 16, frame: FURNITURE.lamp.floor },
  // 壁炉
  { type: "furniture", x: 19, y: 17, frame: FURNITURE.fireplace.on },
  // 其他
  { type: "furniture", x: 22, y: 17, frame: FURNITURE.clock },
  { type: "furniture", x: 17, y: 19, frame: FURNITURE.vase.flowers },
  { type: "furniture", x: 21, y: 17, frame: FURNITURE.painting.small },
  { type: "furniture", x: 16, y: 17, frame: FURNITURE.mirror },
  // 地毯 (3x3)
  { type: "rug", x: 17, y: 20, frame: FURNITURE.rug.topLeft },
  { type: "rug", x: 18, y: 20, frame: FURNITURE.rug.top },
  { type: "rug", x: 19, y: 20, frame: FURNITURE.rug.topRight },
  { type: "rug", x: 17, y: 21, frame: FURNITURE.rug.left },
  { type: "rug", x: 18, y: 21, frame: FURNITURE.rug.center },
  { type: "rug", x: 19, y: 21, frame: FURNITURE.rug.right },
  { type: "rug", x: 17, y: 22, frame: FURNITURE.rug.bottomLeft },
  { type: "rug", x: 18, y: 22, frame: FURNITURE.rug.bottom },
  { type: "rug", x: 19, y: 22, frame: FURNITURE.rug.bottomRight },
  
  // ========== 栅栏 (所有类型) ==========
  // 木栅栏
  { type: "fence", x: 9, y: 9, frame: FENCES.wood.horizontal },
  { type: "fence", x: 10, y: 9, frame: FENCES.wood.horizontal },
  { type: "fence", x: 11, y: 9, frame: FENCES.wood.horizontal },
  { type: "fence", x: 12, y: 9, frame: FENCES.wood.post },
  { type: "fence", x: 12, y: 10, frame: FENCES.wood.vertical },
  { type: "fence", x: 12, y: 11, frame: FENCES.wood.gate },
  { type: "fence", x: 12, y: 12, frame: FENCES.wood.vertical },
  // 石墙
  { type: "fence", x: 29, y: 14, frame: FENCES.stone.horizontal },
  { type: "fence", x: 30, y: 14, frame: FENCES.stone.horizontal },
  { type: "fence", x: 31, y: 14, frame: FENCES.stone.pillar },
  
  // ========== UI数字展示区 ==========
  { type: "ui", x: 2, y: 28, frame: UI_NUMBERS.version },
  { type: "ui", x: 3, y: 28, frame: UI_NUMBERS.num0 },
  { type: "ui", x: 4, y: 28, frame: UI_NUMBERS.num1 },
  { type: "ui", x: 5, y: 28, frame: UI_NUMBERS.num2 },
  { type: "ui", x: 6, y: 28, frame: UI_NUMBERS.num3 },
  { type: "ui", x: 7, y: 28, frame: UI_NUMBERS.num4 },
  { type: "ui", x: 8, y: 28, frame: UI_NUMBERS.num5 },
  
  // ========== 心形展示 ==========
  { type: "ui", x: 10, y: 28, frame: UI_HEARTS.full },
  { type: "ui", x: 11, y: 28, frame: UI_HEARTS.threeQuarter },
  { type: "ui", x: 12, y: 28, frame: UI_HEARTS.half },
  { type: "ui", x: 13, y: 28, frame: UI_HEARTS.quarter },
  { type: "ui", x: 14, y: 28, frame: UI_HEARTS.empty },
  
  // ========== 特殊装饰 ==========
  { type: "statue", x: 27, y: 8, frame: SPECIAL_CHARS.statue },
];

// 玩家出生点
export const SPAWN_POINT = { x: 12, y: 14 };

// ========== 创建游戏世界 ==========
export function createWorld() {
  const tileSize = GAME_CONFIG.TILE_SIZE;
  const scale = GAME_CONFIG.SCALE_FACTOR;
  
  const mapContainer = k.add([
    k.pos(0, 0),
    k.scale(scale),
    "map",
  ]);

  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      const tileType = MAP_LAYOUT[y][x];
      const tileFrame = TILE_FRAMES[tileType];
      
      mapContainer.add([
        k.sprite("spritesheet", { frame: tileFrame }),
        k.pos(x * tileSize, y * tileSize),
        k.z(0),
      ]);
      
      if (tileType === 1 || tileType === 3 || tileType === 4) {
        mapContainer.add([
          k.area({ shape: new k.Rect(k.vec2(0), tileSize, tileSize) }),
          k.body({ isStatic: true }),
          k.pos(x * tileSize, y * tileSize),
          tileType === 1 ? "wall" : "water",
        ]);
      }
    }
  }

  return mapContainer;
}

// ========== 创建世界对象 ==========
export function createWorldObjects(player, mapContainer) {
  const tileSize = GAME_CONFIG.TILE_SIZE;
  const scale = GAME_CONFIG.SCALE_FACTOR;
  const objectScale = GAME_CONFIG.OBJECT_SCALE || 2;
  const collectedItems = new Set();
  const openedChests = new Set();

  WORLD_OBJECTS.forEach(obj => {
    const worldX = obj.x * tileSize * scale;
    const worldY = obj.y * tileSize * scale;
    
    switch (obj.type) {
      case "npc":
      case "king":
        createNPC(obj, worldX, worldY, objectScale, player);
        break;
      case "chest":
        createChest(obj, worldX, worldY, objectScale, player, openedChests);
        break;
      case "well":
        createWell(obj, worldX, worldY, objectScale, player, tileSize, scale);
        break;
      case "sign":
      case "signpost":
        createSign(obj, worldX, worldY, objectScale, player);
        break;
      case "tree":
        createTree(obj, worldX, worldY, scale, objectScale, tileSize);
        break;
      case "building":
        createBuilding(obj, worldX, worldY, scale, objectScale, tileSize);
        break;
      case "item":
        createItem(obj, worldX, worldY, objectScale, player, collectedItems);
        break;
      case "flower":
      case "egg":
      case "mushroom":
      case "grass":
      case "sapling":
      case "ui":
        createDecoration(obj, worldX, worldY, objectScale * 0.8);
        break;
      case "rock":
      case "ore":
      case "crystal":
      case "bush":
      case "stump":
        createObstacle(obj, worldX, worldY, objectScale * 0.9);
        break;
      case "container":
      case "torch":
      case "flag":
      case "fence":
      case "furniture":
      case "statue":
        createProp(obj, worldX, worldY, objectScale * 0.9);
        break;
      case "rug":
        createFloorDecor(obj, worldX, worldY, scale);
        break;
    }
  });
}

// ===== 创建函数 =====
function createNPC(obj, x, y, scale, player) {
  k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.area({ shape: new k.Rect(k.vec2(0), 12, 12) }),
    k.body({ isStatic: true }),
    k.anchor("center"),
    k.scale(scale),
    k.z(5),
    obj.name,
    "npc",
  ]);

  player.onCollide(obj.name, () => {
    if (player.isInDialogue) return;
    player.isInDialogue = true;
    const dialogue = DIALOGUE_DATA[obj.dialogue || obj.name] || DIALOGUE_DATA.villager1;
    displayDialogue(dialogue, () => { player.isInDialogue = false; });
  });
}

function createChest(obj, x, y, scale, player, openedChests) {
  const chest = k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.area({ shape: new k.Rect(k.vec2(0), 12, 12) }),
    k.body({ isStatic: true }),
    k.anchor("center"),
    k.scale(scale),
    k.z(5),
    obj.name,
    "chest",
  ]);

  player.onCollide(obj.name, () => {
    if (player.isInDialogue || openedChests.has(obj.name)) return;
    if (obj.locked && playerState.keys < 1) {
      player.isInDialogue = true;
      displayDialogue({
        speaker: "系统",
        lines: ["这个宝箱被锁住了！", "你需要一把钥匙来打开它。"]
      }, () => { player.isInDialogue = false; });
      return;
    }
    player.isInDialogue = true;
    openedChests.add(obj.name);
    chest.frame = INTERACTABLES.chest.open;
    addGold(obj.gold || 50);
    addExp(30);
    // 显示特效
    createCollectEffect(x, y);
    displayDialogue({
      speaker: "系统",
      lines: [`你打开了宝箱！获得了 ${obj.gold || 50} 金币！`]
    }, () => { player.isInDialogue = false; });
  });
}

function createWell(obj, x, y, scale, player, tileSize, mapScale) {
  const offset = tileSize * mapScale * 0.4;
  k.add([
    k.sprite("spritesheet", { frame: INTERACTABLES.well.top }),
    k.pos(x, y - offset),
    k.anchor("center"),
    k.scale(scale),
    k.z(6),
  ]);
  k.add([
    k.sprite("spritesheet", { frame: INTERACTABLES.well.bottom }),
    k.pos(x, y + offset),
    k.area({ shape: new k.Rect(k.vec2(0), 12, 12) }),
    k.body({ isStatic: true }),
    k.anchor("center"),
    k.scale(scale),
    k.z(5),
    obj.name,
    "well",
  ]);

  player.onCollide(obj.name, () => {
    if (player.isInDialogue) return;
    player.isInDialogue = true;
    healPlayer(100);
    displayDialogue({
      speaker: "系统",
      lines: ["你在井边休息了一会儿...", "HP 已完全恢复！"]
    }, () => { player.isInDialogue = false; });
  });
}

function createSign(obj, x, y, scale, player) {
  const signObj = k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.area({ shape: new k.Rect(k.vec2(0), 10, 10) }),
    k.body({ isStatic: true }),
    k.anchor("center"),
    k.scale(scale),
    k.z(5),
    "sign_" + obj.x + "_" + obj.y,
    "sign",
  ]);

  player.onCollide("sign_" + obj.x + "_" + obj.y, () => {
    if (player.isInDialogue) return;
    player.isInDialogue = true;
    const dialogue = DIALOGUE_DATA[obj.dialogue] || DIALOGUE_DATA.sign;
    displayDialogue(dialogue, () => { player.isInDialogue = false; });
  });
}

function createTree(obj, x, y, mapScale, objScale, tileSize) {
  const offset = tileSize * mapScale * 0.7;
  const treeType = TREES[obj.variant] || TREES.green;
  
  k.add([
    k.sprite("spritesheet", { frame: treeType.top }),
    k.pos(x, y - offset),
    k.anchor("center"),
    k.scale(objScale),
    k.z(7),
  ]);
  k.add([
    k.sprite("spritesheet", { frame: treeType.middle }),
    k.pos(x, y),
    k.anchor("center"),
    k.scale(objScale),
    k.z(6),
  ]);
  k.add([
    k.sprite("spritesheet", { frame: treeType.bottom }),
    k.pos(x, y + offset),
    k.area({ shape: new k.Rect(k.vec2(0), 10, 10) }),
    k.body({ isStatic: true }),
    k.anchor("center"),
    k.scale(objScale),
    k.z(5),
    "tree",
  ]);
}

function createBuilding(obj, x, y, mapScale, objScale, tileSize) {
  const offset = tileSize * mapScale;
  const wall = obj.style === "dark" ? BUILDINGS.wallDark : BUILDINGS.wallLight;
  const roof = BUILDINGS.roof;
  
  // 屋顶
  [-1, 0, 1].forEach(dx => {
    k.add([
      k.sprite("spritesheet", { frame: dx === -1 ? roof.peakLeft : dx === 1 ? roof.peakRight : roof.peak }),
      k.pos(x + dx * offset, y - offset * 2),
      k.anchor("center"), k.scale(objScale * 0.9), k.z(6),
    ]);
  });
  
  // 墙壁
  k.add([k.sprite("spritesheet", { frame: wall.topLeft }), k.pos(x - offset, y - offset), k.anchor("center"), k.scale(objScale * 0.9), k.z(5)]);
  k.add([k.sprite("spritesheet", { frame: BUILDINGS.door.closed }), k.pos(x, y - offset), k.anchor("center"), k.scale(objScale * 0.9), k.z(5)]);
  k.add([k.sprite("spritesheet", { frame: wall.topRight }), k.pos(x + offset, y - offset), k.anchor("center"), k.scale(objScale * 0.9), k.z(5)]);
  k.add([k.sprite("spritesheet", { frame: wall.bottomLeft }), k.pos(x - offset, y), k.anchor("center"), k.scale(objScale * 0.9), k.z(5)]);
  k.add([k.sprite("spritesheet", { frame: BUILDINGS.door.open }), k.pos(x, y), k.anchor("center"), k.scale(objScale * 0.9), k.z(5)]);
  k.add([k.sprite("spritesheet", { frame: wall.bottomRight }), k.pos(x + offset, y), k.anchor("center"), k.scale(objScale * 0.9), k.z(5)]);
  
  // 窗户
  k.add([k.sprite("spritesheet", { frame: BUILDINGS.window.small }), k.pos(x - offset, y - offset), k.anchor("center"), k.scale(objScale * 0.5), k.z(6)]);
  
  k.add([
    k.area({ shape: new k.Rect(k.vec2(0), offset * 2.5, offset * 2) }),
    k.body({ isStatic: true }),
    k.pos(x, y - offset * 0.5),
    k.anchor("center"),
    "building",
  ]);
}

function createItem(obj, x, y, scale, player, collectedItems) {
  const itemName = "item_" + obj.x + "_" + obj.y;
  const item = k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.area({ shape: new k.Rect(k.vec2(0), 10, 10) }),
    k.anchor("center"),
    k.scale(scale * 0.8),
    k.z(4),
    itemName,
    "item",
  ]);

  // 添加浮动动画
  let time = Math.random() * Math.PI * 2;
  item.onUpdate(() => {
    time += k.dt() * 2;
    item.pos.y = y + Math.sin(time) * 3;
  });

  player.onCollide(itemName, () => {
    if (collectedItems.has(itemName)) return;
    collectedItems.add(itemName);
    k.destroy(item);
    createCollectEffect(x, y);
    
    let message = "";
    switch (obj.itemType) {
      case "hpPotion": healPlayer(30); message = "生命药水！+30 HP"; break;
      case "mpPotion": message = "魔法药水！+20 MP"; break;
      case "speedPotion": message = "速度药水！"; break;
      case "expPotion": addExp(50); message = "经验药水！+50 EXP"; break;
      case "coin": addGold(10); message = "+10 金币"; break;
      case "coinStack": addGold(50); message = "+50 金币"; break;
      case "gemRed": case "gemBlue": case "gemGreen": case "gemYellow":
        addGold(100); addExp(30); message = "宝石！+100 金币"; break;
      case "keyBronze": case "keySilver": case "keyGold":
        playerState.keys = (playerState.keys || 0) + 1; message = "获得钥匙！"; break;
      default: message = "获得物品！";
    }
    
    showFloatingText(x, y, message);
  });
}

function createDecoration(obj, x, y, scale) {
  k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.anchor("center"),
    k.scale(scale),
    k.z(2),
    "decoration",
  ]);
}

function createObstacle(obj, x, y, scale) {
  k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.area({ shape: new k.Rect(k.vec2(0), 10, 10) }),
    k.body({ isStatic: true }),
    k.anchor("center"),
    k.scale(scale),
    k.z(3),
    "obstacle",
  ]);
}

function createProp(obj, x, y, scale) {
  k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.area({ shape: new k.Rect(k.vec2(0), 8, 8) }),
    k.body({ isStatic: true }),
    k.anchor("center"),
    k.scale(scale),
    k.z(4),
    "prop",
  ]);
}

function createFloorDecor(obj, x, y, scale) {
  k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.anchor("center"),
    k.scale(scale),
    k.z(1),
    "floor-decor",
  ]);
}

// ===== 特效 =====
function createCollectEffect(x, y) {
  for (let i = 0; i < 5; i++) {
    const particle = k.add([
      k.sprite("spritesheet", { frame: EFFECTS.spark[i % 4] }),
      k.pos(x, y),
      k.anchor("center"),
      k.scale(0.5),
      k.opacity(1),
      k.z(100),
      { vx: (Math.random() - 0.5) * 100, vy: -50 - Math.random() * 50 },
    ]);
    particle.onUpdate(() => {
      particle.pos.x += particle.vx * k.dt();
      particle.pos.y += particle.vy * k.dt();
      particle.vy += 100 * k.dt();
      particle.opacity -= k.dt();
      if (particle.opacity <= 0) k.destroy(particle);
    });
  }
}

function showFloatingText(x, y, message) {
  const text = k.add([
    k.text(message, { size: 10 }),
    k.pos(x, y - 10),
    k.anchor("center"),
    k.color(255, 255, 100),
    k.z(100),
    { vy: -30 },
  ]);
  text.onUpdate(() => {
    text.pos.y += text.vy * k.dt();
    text.opacity -= k.dt() * 0.5;
    if (text.opacity <= 0) k.destroy(text);
  });
}

// ===== 导出函数 =====
export function getSpawnPosition() {
  const tileSize = GAME_CONFIG.TILE_SIZE;
  const scale = GAME_CONFIG.SCALE_FACTOR;
  return { x: SPAWN_POINT.x * tileSize * scale, y: SPAWN_POINT.y * tileSize * scale };
}

export function createMapBoundaries() {
  const tileSize = GAME_CONFIG.TILE_SIZE;
  const scale = GAME_CONFIG.SCALE_FACTOR;
  const mapWidth = MAP_WIDTH * tileSize * scale;
  const mapHeight = MAP_HEIGHT * tileSize * scale;
  
  k.add([k.area({ shape: new k.Rect(k.vec2(0), mapWidth, 10) }), k.body({ isStatic: true }), k.pos(0, -10), "boundary"]);
  k.add([k.area({ shape: new k.Rect(k.vec2(0), mapWidth, 10) }), k.body({ isStatic: true }), k.pos(0, mapHeight), "boundary"]);
  k.add([k.area({ shape: new k.Rect(k.vec2(0), 10, mapHeight) }), k.body({ isStatic: true }), k.pos(-10, 0), "boundary"]);
  k.add([k.area({ shape: new k.Rect(k.vec2(0), 10, mapHeight) }), k.body({ isStatic: true }), k.pos(mapWidth, 0), "boundary"]);
}
