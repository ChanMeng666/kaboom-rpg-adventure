// 室内场景地图数据
import { TILE_TYPES } from "./tileTypes";
import {
  FURNITURE, INTERACTABLES, ITEMS, CHARACTERS, SPECIAL_CHARS,
  MC_FLOORS, MC_FURNITURE, MC_DOORS_WINDOWS, MC_SMALL_ITEMS
} from "../sprites";

const W = TILE_TYPES.WOOD; // 木地板
const S = TILE_TYPES.SAND; // 墙壁

// ===== 村长房屋室内 =====
export const ELDER_HOUSE_INTERIOR = {
  name: "村长的家",
  width: 12,
  height: 10,
  spawnPoint: { x: 6, y: 8 },
  bgColor: "#2a1a0a",
  tiles: [
    [S,S,S,S,S,S,S,S,S,S,S,S],
    [S,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,S],
    [S,S,S,S,S,W,W,S,S,S,S,S],
  ],
  objects: [
    // 家具
    { type: "furniture", x: 2, y: 2, frame: FURNITURE.bed.topLeft },
    { type: "furniture", x: 3, y: 2, frame: FURNITURE.bed.topRight },
    { type: "furniture", x: 2, y: 3, frame: FURNITURE.bed.bottomLeft },
    { type: "furniture", x: 3, y: 3, frame: FURNITURE.bed.bottomRight },
    { type: "furniture", x: 9, y: 2, frame: FURNITURE.cabinet.bookshelf },
    { type: "furniture", x: 10, y: 2, frame: FURNITURE.cabinet.bookshelfFull },
    { type: "furniture", x: 6, y: 2, frame: FURNITURE.table.round },
    { type: "furniture", x: 5, y: 3, frame: FURNITURE.chair.left },
    { type: "furniture", x: 7, y: 3, frame: FURNITURE.chair.right },
    { type: "furniture", x: 2, y: 6, frame: FURNITURE.plant.large },
    { type: "furniture", x: 10, y: 6, frame: FURNITURE.plant.medium },
    { type: "furniture", x: 9, y: 5, frame: FURNITURE.fireplace.on },
    { type: "furniture", x: 2, y: 5, frame: FURNITURE.lamp.floor },
    // 地毯
    { type: "rug", x: 5, y: 5, frame: FURNITURE.rug.topLeft },
    { type: "rug", x: 6, y: 5, frame: FURNITURE.rug.top },
    { type: "rug", x: 7, y: 5, frame: FURNITURE.rug.topRight },
    { type: "rug", x: 5, y: 6, frame: FURNITURE.rug.left },
    { type: "rug", x: 6, y: 6, frame: FURNITURE.rug.center },
    { type: "rug", x: 7, y: 6, frame: FURNITURE.rug.right },
    { type: "rug", x: 5, y: 7, frame: FURNITURE.rug.bottomLeft },
    { type: "rug", x: 6, y: 7, frame: FURNITURE.rug.bottom },
    { type: "rug", x: 7, y: 7, frame: FURNITURE.rug.bottomRight },
    // 装饰
    { type: "furniture", x: 4, y: 1, frame: FURNITURE.painting.medium },
    { type: "furniture", x: 8, y: 1, frame: FURNITURE.clock },
    // 出口
    { type: "exit", x: 5, y: 9, targetArea: "village", targetX: 4, targetY: 6 },
    { type: "exit", x: 6, y: 9, targetArea: "village", targetX: 4, targetY: 6 },
  ],
};

// ===== 商店室内 =====
export const SHOP_INTERIOR = {
  name: "杂货商店",
  width: 14,
  height: 10,
  spawnPoint: { x: 7, y: 8 },
  bgColor: "#1a2a1a",
  tiles: [
    [S,S,S,S,S,S,S,S,S,S,S,S,S,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,S,S,S,S,S,W,W,S,S,S,S,S,S],
  ],
  objects: [
    // 柜台
    { type: "furniture", x: 3, y: 3, frame: FURNITURE.table.large },
    { type: "furniture", x: 4, y: 3, frame: FURNITURE.table.large },
    { type: "furniture", x: 5, y: 3, frame: FURNITURE.table.large },
    // 商品展示架
    { type: "furniture", x: 2, y: 1, frame: FURNITURE.cabinet.small },
    { type: "furniture", x: 3, y: 1, frame: FURNITURE.cabinet.bookshelf },
    { type: "furniture", x: 4, y: 1, frame: FURNITURE.cabinet.small },
    { type: "furniture", x: 10, y: 1, frame: FURNITURE.cabinet.small },
    { type: "furniture", x: 11, y: 1, frame: FURNITURE.cabinet.bookshelf },
    { type: "furniture", x: 12, y: 1, frame: FURNITURE.cabinet.small },
    // 商品
    { type: "item_display", x: 9, y: 3, frame: ITEMS.potionRed },
    { type: "item_display", x: 10, y: 3, frame: ITEMS.potionBlue },
    { type: "item_display", x: 11, y: 3, frame: ITEMS.potionGreen },
    { type: "item_display", x: 9, y: 5, frame: ITEMS.sword },
    { type: "item_display", x: 10, y: 5, frame: ITEMS.shield },
    { type: "item_display", x: 11, y: 5, frame: ITEMS.keyBronze },
    // 商人
    { type: "npc", x: 4, y: 4, name: "shop_merchant", frame: CHARACTERS.merchant.down, dialogue: "shop_merchant" },
    // 装饰
    { type: "furniture", x: 2, y: 6, frame: FURNITURE.plant.small },
    { type: "furniture", x: 12, y: 6, frame: FURNITURE.plant.cactus },
    { type: "furniture", x: 7, y: 1, frame: FURNITURE.lamp.chandelier },
    // 箱子
    { type: "container", x: 2, y: 7, frame: INTERACTABLES.crate.normal },
    { type: "container", x: 12, y: 7, frame: INTERACTABLES.barrel.normal },
    // 出口
    { type: "exit", x: 6, y: 9, targetArea: "village", targetX: 23, targetY: 6 },
    { type: "exit", x: 7, y: 9, targetArea: "village", targetX: 23, targetY: 6 },
  ],
};

// ===== 铁匠铺室内 =====
export const SMITHY_INTERIOR = {
  name: "铁匠铺",
  width: 12,
  height: 10,
  spawnPoint: { x: 6, y: 8 },
  bgColor: "#2a1a1a",
  tiles: [
    [S,S,S,S,S,S,S,S,S,S,S,S],
    [S,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,S],
    [S,S,S,S,S,W,W,S,S,S,S,S],
  ],
  objects: [
    // 熔炉/壁炉
    { type: "furniture", x: 5, y: 1, frame: FURNITURE.fireplace.on },
    { type: "furniture", x: 6, y: 1, frame: FURNITURE.fireplace.on },
    // 工作台
    { type: "furniture", x: 3, y: 3, frame: FURNITURE.table.large },
    { type: "furniture", x: 4, y: 3, frame: FURNITURE.table.large },
    // 武器展示
    { type: "item_display", x: 9, y: 2, frame: ITEMS.sword },
    { type: "item_display", x: 10, y: 2, frame: ITEMS.swordGold },
    { type: "item_display", x: 9, y: 3, frame: ITEMS.axe },
    { type: "item_display", x: 10, y: 3, frame: ITEMS.shield },
    // 材料
    { type: "container", x: 2, y: 6, frame: INTERACTABLES.barrel.normal },
    { type: "container", x: 2, y: 7, frame: INTERACTABLES.barrel.normal },
    { type: "container", x: 10, y: 6, frame: INTERACTABLES.crate.normal },
    { type: "container", x: 10, y: 7, frame: INTERACTABLES.crate.normal },
    // 铁匠
    { type: "npc", x: 5, y: 4, name: "smithy_blacksmith", frame: CHARACTERS.blacksmith.down, dialogue: "smithy_blacksmith" },
    // 出口
    { type: "exit", x: 5, y: 9, targetArea: "village", targetX: 4, targetY: 17 },
    { type: "exit", x: 6, y: 9, targetArea: "village", targetX: 4, targetY: 17 },
  ],
};

// ===== 旅店室内 =====
export const INN_INTERIOR = {
  name: "温馨旅店",
  width: 16,
  height: 12,
  spawnPoint: { x: 8, y: 10 },
  bgColor: "#2a2a1a",
  tiles: [
    [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,S,S,S,S,S,S,W,W,S,S,S,S,S,S,S],
  ],
  objects: [
    // 前台
    { type: "furniture", x: 3, y: 3, frame: FURNITURE.table.large },
    { type: "furniture", x: 4, y: 3, frame: FURNITURE.table.large },
    { type: "furniture", x: 5, y: 3, frame: FURNITURE.table.large },
    // 旅店老板
    { type: "npc", x: 4, y: 4, name: "inn_keeper", frame: CHARACTERS.innkeeper.down, dialogue: "inn_keeper" },
    // 床铺区 (左侧)
    { type: "furniture", x: 2, y: 7, frame: FURNITURE.bed.topLeft },
    { type: "furniture", x: 3, y: 7, frame: FURNITURE.bed.topRight },
    { type: "furniture", x: 2, y: 8, frame: FURNITURE.bed.bottomLeft },
    { type: "furniture", x: 3, y: 8, frame: FURNITURE.bed.bottomRight },
    // 床铺区 (右侧)
    { type: "furniture", x: 12, y: 7, frame: FURNITURE.bed.topLeft },
    { type: "furniture", x: 13, y: 7, frame: FURNITURE.bed.topRight },
    { type: "furniture", x: 12, y: 8, frame: FURNITURE.bed.bottomLeft },
    { type: "furniture", x: 13, y: 8, frame: FURNITURE.bed.bottomRight },
    // 餐桌区
    { type: "furniture", x: 8, y: 5, frame: FURNITURE.table.round },
    { type: "furniture", x: 7, y: 5, frame: FURNITURE.chair.left },
    { type: "furniture", x: 9, y: 5, frame: FURNITURE.chair.right },
    { type: "furniture", x: 8, y: 4, frame: FURNITURE.chair.back },
    { type: "furniture", x: 8, y: 6, frame: FURNITURE.chair.front },
    { type: "furniture", x: 11, y: 5, frame: FURNITURE.table.round },
    { type: "furniture", x: 10, y: 5, frame: FURNITURE.chair.left },
    { type: "furniture", x: 12, y: 5, frame: FURNITURE.chair.right },
    // 壁炉
    { type: "furniture", x: 8, y: 1, frame: FURNITURE.fireplace.on },
    // 装饰
    { type: "furniture", x: 2, y: 1, frame: FURNITURE.painting.large },
    { type: "furniture", x: 14, y: 1, frame: FURNITURE.clock },
    { type: "furniture", x: 2, y: 5, frame: FURNITURE.plant.medium },
    { type: "furniture", x: 14, y: 5, frame: FURNITURE.plant.large },
    { type: "furniture", x: 6, y: 1, frame: FURNITURE.lamp.chandelier },
    { type: "furniture", x: 10, y: 1, frame: FURNITURE.lamp.chandelier },
    // 地毯
    { type: "rug", x: 7, y: 8, frame: FURNITURE.rug.topLeft },
    { type: "rug", x: 8, y: 8, frame: FURNITURE.rug.top },
    { type: "rug", x: 9, y: 8, frame: FURNITURE.rug.topRight },
    { type: "rug", x: 7, y: 9, frame: FURNITURE.rug.bottomLeft },
    { type: "rug", x: 8, y: 9, frame: FURNITURE.rug.bottom },
    { type: "rug", x: 9, y: 9, frame: FURNITURE.rug.bottomRight },
    // 休息点 (存档)
    { type: "save_point", x: 2, y: 7, name: "inn_bed" },
    // 出口
    { type: "exit", x: 7, y: 11, targetArea: "village", targetX: 23, targetY: 17 },
    { type: "exit", x: 8, y: 11, targetArea: "village", targetX: 23, targetY: 17 },
  ],
};

// ===== 王座室室内 =====
export const THRONE_ROOM_INTERIOR = {
  name: "王座大厅",
  width: 20,
  height: 14,
  spawnPoint: { x: 10, y: 12 },
  bgColor: "#1a1a3a",
  tiles: [
    [S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,S],
    [S,S,S,S,S,S,S,S,S,W,W,S,S,S,S,S,S,S,S,S],
  ],
  objects: [
    // 王座
    { type: "furniture", x: 10, y: 2, frame: FURNITURE.chair.throne },
    // 国王
    { type: "king", x: 10, y: 3, name: "throne_king", frame: SPECIAL_CHARS.king.front, dialogue: "king" },
    // 红地毯 (通向王座)
    { type: "rug", x: 9, y: 4, frame: FURNITURE.rug.topLeft },
    { type: "rug", x: 10, y: 4, frame: FURNITURE.rug.top },
    { type: "rug", x: 11, y: 4, frame: FURNITURE.rug.topRight },
    { type: "rug", x: 9, y: 5, frame: FURNITURE.rug.left },
    { type: "rug", x: 10, y: 5, frame: FURNITURE.rug.center },
    { type: "rug", x: 11, y: 5, frame: FURNITURE.rug.right },
    { type: "rug", x: 9, y: 6, frame: FURNITURE.rug.left },
    { type: "rug", x: 10, y: 6, frame: FURNITURE.rug.center },
    { type: "rug", x: 11, y: 6, frame: FURNITURE.rug.right },
    { type: "rug", x: 9, y: 7, frame: FURNITURE.rug.left },
    { type: "rug", x: 10, y: 7, frame: FURNITURE.rug.center },
    { type: "rug", x: 11, y: 7, frame: FURNITURE.rug.right },
    { type: "rug", x: 9, y: 8, frame: FURNITURE.rug.left },
    { type: "rug", x: 10, y: 8, frame: FURNITURE.rug.center },
    { type: "rug", x: 11, y: 8, frame: FURNITURE.rug.right },
    { type: "rug", x: 9, y: 9, frame: FURNITURE.rug.left },
    { type: "rug", x: 10, y: 9, frame: FURNITURE.rug.center },
    { type: "rug", x: 11, y: 9, frame: FURNITURE.rug.right },
    { type: "rug", x: 9, y: 10, frame: FURNITURE.rug.left },
    { type: "rug", x: 10, y: 10, frame: FURNITURE.rug.center },
    { type: "rug", x: 11, y: 10, frame: FURNITURE.rug.right },
    { type: "rug", x: 9, y: 11, frame: FURNITURE.rug.bottomLeft },
    { type: "rug", x: 10, y: 11, frame: FURNITURE.rug.bottom },
    { type: "rug", x: 11, y: 11, frame: FURNITURE.rug.bottomRight },
    // 骑士守卫
    { type: "npc", x: 5, y: 4, name: "throne_knight1", frame: CHARACTERS.knight.down, dialogue: "knight" },
    { type: "npc", x: 15, y: 4, name: "throne_knight2", frame: CHARACTERS.knight.down, dialogue: "knight" },
    // 法师
    { type: "npc", x: 7, y: 6, name: "throne_wizard", frame: CHARACTERS.mage.down, dialogue: "wizard" },
    // 柱子/雕像
    { type: "statue", x: 3, y: 3, frame: SPECIAL_CHARS.statue },
    { type: "statue", x: 17, y: 3, frame: SPECIAL_CHARS.statue },
    { type: "statue", x: 3, y: 9, frame: SPECIAL_CHARS.statue },
    { type: "statue", x: 17, y: 9, frame: SPECIAL_CHARS.statue },
    // 旗帜
    { type: "flag", x: 2, y: 1, frame: INTERACTABLES.flag.red },
    { type: "flag", x: 4, y: 1, frame: INTERACTABLES.flag.blue },
    { type: "flag", x: 16, y: 1, frame: INTERACTABLES.flag.blue },
    { type: "flag", x: 18, y: 1, frame: INTERACTABLES.flag.red },
    // 火把
    { type: "torch", x: 2, y: 6, frame: INTERACTABLES.torch.wall },
    { type: "torch", x: 18, y: 6, frame: INTERACTABLES.torch.wall },
    // 宝箱 (奖励)
    { type: "chest", x: 2, y: 11, name: "throne_chest1", frame: INTERACTABLES.chest.golden, gold: 1000, locked: true },
    { type: "chest", x: 18, y: 11, name: "throne_chest2", frame: INTERACTABLES.chest.golden, gold: 1000, locked: true },
    // 出口
    { type: "exit", x: 9, y: 13, targetArea: "castle", targetX: 15, targetY: 10 },
    { type: "exit", x: 10, y: 13, targetArea: "castle", targetX: 15, targetY: 10 },
  ],
};

// ===== Mi-Casa 风格: 温馨小屋 =====
// 使用 Mi-Casa tileset 的增强版室内场景
export const COZY_HOUSE_INTERIOR = {
  name: "温馨小屋",
  width: 14,
  height: 12,
  spawnPoint: { x: 7, y: 10 },
  bgColor: "#3a2a1a",
  useMiCasaTileset: true, // 标记使用 Mi-Casa tileset
  // 地板和墙壁瓦片 (使用 mc-floors-walls)
  floorTiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,0,0,1,1,1,1,1,1],
  ],
  // 墙壁类型: 0=地板, 1=墙壁
  wallMap: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,0,0,1,1,1,1,1,1],
  ],
  // Mi-Casa 风格对象 (使用 mc-furniture1, mc-small-items 等)
  mcObjects: [
    // 双人床 (左上角)
    { type: "mc-furniture", sprite: "mc-furniture1", x: 2, y: 2, frame: MC_FURNITURE.bedDouble.topLeft },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 3, y: 2, frame: MC_FURNITURE.bedDouble.topRight },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 2, y: 3, frame: MC_FURNITURE.bedDouble.bottomLeft },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 3, y: 3, frame: MC_FURNITURE.bedDouble.bottomRight },
    // 壁炉 (顶部中央)
    { type: "mc-furniture", sprite: "mc-furniture1", x: 6, y: 1, frame: MC_FURNITURE.fireplaceOn.topLeft },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 7, y: 1, frame: MC_FURNITURE.fireplaceOn.topRight },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 6, y: 2, frame: MC_FURNITURE.fireplaceOn.bottomLeft },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 7, y: 2, frame: MC_FURNITURE.fireplaceOn.bottomRight },
    // 书柜 (右上角)
    { type: "mc-furniture", sprite: "mc-furniture1", x: 11, y: 1, frame: MC_FURNITURE.bookshelf.top, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 11, y: 2, frame: MC_FURNITURE.bookshelf.bottom, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 12, y: 1, frame: MC_FURNITURE.cabinetTall.top, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 12, y: 2, frame: MC_FURNITURE.cabinetTall.bottom, solid: true },
    // 圆桌和椅子 (中央)
    { type: "mc-furniture", sprite: "mc-furniture1", x: 7, y: 5, frame: MC_FURNITURE.tableRound, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 6, y: 5, frame: MC_FURNITURE.chairLeft },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 8, y: 5, frame: MC_FURNITURE.chairRight },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 7, y: 4, frame: MC_FURNITURE.chairBack },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 7, y: 6, frame: MC_FURNITURE.chairFront },
    // 沙发 (右侧)
    { type: "mc-furniture", sprite: "mc-furniture1", x: 10, y: 5, frame: MC_FURNITURE.sofaLeft, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 11, y: 5, frame: MC_FURNITURE.sofaCenter, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 12, y: 5, frame: MC_FURNITURE.sofaRight, solid: true },
    // 厨房区域 (左下)
    { type: "mc-furniture", sprite: "mc-furniture1", x: 2, y: 7, frame: MC_FURNITURE.stove, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 3, y: 7, frame: MC_FURNITURE.counter.center, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 4, y: 7, frame: MC_FURNITURE.sink, solid: true },
    // 地毯 (入口处)
    { type: "mc-furniture", sprite: "mc-furniture1", x: 5, y: 9, frame: MC_FURNITURE.rug.topLeft, z: 1 },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 6, y: 9, frame: MC_FURNITURE.rug.top, z: 1 },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 7, y: 9, frame: MC_FURNITURE.rug.top, z: 1 },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 8, y: 9, frame: MC_FURNITURE.rug.topRight, z: 1 },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 5, y: 10, frame: MC_FURNITURE.rug.bottomLeft, z: 1 },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 6, y: 10, frame: MC_FURNITURE.rug.bottom, z: 1 },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 7, y: 10, frame: MC_FURNITURE.rug.bottom, z: 1 },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 8, y: 10, frame: MC_FURNITURE.rug.bottomRight, z: 1 },
    // 植物装饰
    { type: "mc-furniture", sprite: "mc-furniture1", x: 2, y: 5, frame: MC_FURNITURE.plantLarge },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 12, y: 8, frame: MC_FURNITURE.plantMedium },
    // 小物品装饰
    { type: "mc-item", sprite: "mc-small-items", x: 7, y: 5, frame: MC_SMALL_ITEMS.candleLit, z: 10 },
    { type: "mc-item", sprite: "mc-small-items", x: 3, y: 7, frame: MC_SMALL_ITEMS.pot, z: 10 },
    { type: "mc-item", sprite: "mc-small-items", x: 11, y: 2, frame: MC_SMALL_ITEMS.bookStack, z: 10 },
  ],
  // 标准对象 (NPC、出口等)
  objects: [
    // 休息点 (床)
    { type: "save_point", x: 2, y: 2, name: "cozy_bed" },
    // 出口
    { type: "exit", x: 6, y: 11, targetArea: "village", targetX: 14, targetY: 12 },
    { type: "exit", x: 7, y: 11, targetArea: "village", targetX: 14, targetY: 12 },
  ],
};

// ===== Mi-Casa 风格: 厨师餐厅 =====
export const RESTAURANT_INTERIOR = {
  name: "美味餐厅",
  width: 16,
  height: 12,
  spawnPoint: { x: 8, y: 10 },
  bgColor: "#2a3a2a",
  useMiCasaTileset: true,
  floorTiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
  ],
  wallMap: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
  ],
  mcObjects: [
    // 厨房区 (左上角)
    { type: "mc-furniture", sprite: "mc-furniture1", x: 2, y: 1, frame: MC_FURNITURE.stove, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 3, y: 1, frame: MC_FURNITURE.stove, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 4, y: 1, frame: MC_FURNITURE.counter.left, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 5, y: 1, frame: MC_FURNITURE.counter.center, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 6, y: 1, frame: MC_FURNITURE.sink, solid: true },
    // 长餐桌1
    { type: "mc-furniture", sprite: "mc-furniture1", x: 3, y: 4, frame: MC_FURNITURE.tableLarge.left, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 4, y: 4, frame: MC_FURNITURE.tableLarge.center, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 5, y: 4, frame: MC_FURNITURE.tableLarge.right, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 3, y: 3, frame: MC_FURNITURE.chairBack },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 4, y: 3, frame: MC_FURNITURE.chairBack },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 5, y: 3, frame: MC_FURNITURE.chairBack },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 3, y: 5, frame: MC_FURNITURE.chairFront },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 4, y: 5, frame: MC_FURNITURE.chairFront },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 5, y: 5, frame: MC_FURNITURE.chairFront },
    // 长餐桌2
    { type: "mc-furniture", sprite: "mc-furniture1", x: 10, y: 4, frame: MC_FURNITURE.tableLarge.left, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 11, y: 4, frame: MC_FURNITURE.tableLarge.center, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 12, y: 4, frame: MC_FURNITURE.tableLarge.right, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 10, y: 3, frame: MC_FURNITURE.chairBack },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 11, y: 3, frame: MC_FURNITURE.chairBack },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 12, y: 3, frame: MC_FURNITURE.chairBack },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 10, y: 5, frame: MC_FURNITURE.chairFront },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 11, y: 5, frame: MC_FURNITURE.chairFront },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 12, y: 5, frame: MC_FURNITURE.chairFront },
    // 圆桌
    { type: "mc-furniture", sprite: "mc-furniture1", x: 4, y: 8, frame: MC_FURNITURE.tableRound, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 3, y: 8, frame: MC_FURNITURE.chairLeft },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 5, y: 8, frame: MC_FURNITURE.chairRight },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 11, y: 8, frame: MC_FURNITURE.tableRound, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 10, y: 8, frame: MC_FURNITURE.chairLeft },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 12, y: 8, frame: MC_FURNITURE.chairRight },
    // 柜台
    { type: "mc-furniture", sprite: "mc-furniture1", x: 13, y: 1, frame: MC_FURNITURE.cabinetSmall, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 14, y: 1, frame: MC_FURNITURE.cabinetSmall, solid: true },
    // 植物
    { type: "mc-furniture", sprite: "mc-furniture1", x: 2, y: 9, frame: MC_FURNITURE.plantLarge },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 14, y: 9, frame: MC_FURNITURE.plantLarge },
    // 桌上物品
    { type: "mc-item", sprite: "mc-small-items", x: 4, y: 4, frame: MC_SMALL_ITEMS.candleLit, z: 10 },
    { type: "mc-item", sprite: "mc-small-items", x: 11, y: 4, frame: MC_SMALL_ITEMS.candleLit, z: 10 },
    { type: "mc-item", sprite: "mc-small-items", x: 4, y: 8, frame: MC_SMALL_ITEMS.vaseFlowers, z: 10 },
    { type: "mc-item", sprite: "mc-small-items", x: 11, y: 8, frame: MC_SMALL_ITEMS.vaseFlowers, z: 10 },
    { type: "mc-item", sprite: "mc-small-items", x: 2, y: 1, frame: MC_SMALL_ITEMS.pan, z: 10 },
    { type: "mc-item", sprite: "mc-small-items", x: 3, y: 1, frame: MC_SMALL_ITEMS.pot, z: 10 },
  ],
  objects: [
    // 厨师 NPC
    { type: "npc", x: 4, y: 2, name: "restaurant_chef", frame: CHARACTERS.innkeeper.down, dialogue: "chef" },
    // 出口
    { type: "exit", x: 7, y: 11, targetArea: "village", targetX: 20, targetY: 12 },
    { type: "exit", x: 8, y: 11, targetArea: "village", targetX: 20, targetY: 12 },
  ],
};

// ===== Mi-Casa 风格: 图书馆 =====
export const LIBRARY_INTERIOR = {
  name: "知识图书馆",
  width: 18,
  height: 14,
  spawnPoint: { x: 9, y: 12 },
  bgColor: "#1a2a3a",
  useMiCasaTileset: true,
  floorTiles: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],
  ],
  wallMap: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1],
  ],
  mcObjects: [
    // 左侧书架墙
    { type: "mc-furniture", sprite: "mc-furniture1", x: 2, y: 1, frame: MC_FURNITURE.bookshelf.top, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 2, y: 2, frame: MC_FURNITURE.bookshelf.bottom, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 3, y: 1, frame: MC_FURNITURE.bookshelf.top, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 3, y: 2, frame: MC_FURNITURE.bookshelf.bottom, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 4, y: 1, frame: MC_FURNITURE.bookshelf.top, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 4, y: 2, frame: MC_FURNITURE.bookshelf.bottom, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 5, y: 1, frame: MC_FURNITURE.bookshelf.top, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 5, y: 2, frame: MC_FURNITURE.bookshelf.bottom, solid: true },
    // 右侧书架墙
    { type: "mc-furniture", sprite: "mc-furniture1", x: 12, y: 1, frame: MC_FURNITURE.bookshelf.top, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 12, y: 2, frame: MC_FURNITURE.bookshelf.bottom, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 13, y: 1, frame: MC_FURNITURE.bookshelf.top, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 13, y: 2, frame: MC_FURNITURE.bookshelf.bottom, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 14, y: 1, frame: MC_FURNITURE.bookshelf.top, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 14, y: 2, frame: MC_FURNITURE.bookshelf.bottom, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 15, y: 1, frame: MC_FURNITURE.bookshelf.top, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 15, y: 2, frame: MC_FURNITURE.bookshelf.bottom, solid: true },
    // 中央书架排
    { type: "mc-furniture", sprite: "mc-furniture1", x: 5, y: 5, frame: MC_FURNITURE.bookshelf.top, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 5, y: 6, frame: MC_FURNITURE.bookshelf.bottom, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 6, y: 5, frame: MC_FURNITURE.bookshelf.top, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 6, y: 6, frame: MC_FURNITURE.bookshelf.bottom, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 11, y: 5, frame: MC_FURNITURE.bookshelf.top, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 11, y: 6, frame: MC_FURNITURE.bookshelf.bottom, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 12, y: 5, frame: MC_FURNITURE.bookshelf.top, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 12, y: 6, frame: MC_FURNITURE.bookshelf.bottom, solid: true },
    // 阅读桌 (左)
    { type: "mc-furniture", sprite: "mc-furniture1", x: 3, y: 9, frame: MC_FURNITURE.tableMedium.left, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 4, y: 9, frame: MC_FURNITURE.tableMedium.right, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 3, y: 8, frame: MC_FURNITURE.chairBack },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 4, y: 8, frame: MC_FURNITURE.chairBack },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 3, y: 10, frame: MC_FURNITURE.chairFront },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 4, y: 10, frame: MC_FURNITURE.chairFront },
    // 阅读桌 (右)
    { type: "mc-furniture", sprite: "mc-furniture1", x: 13, y: 9, frame: MC_FURNITURE.tableMedium.left, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 14, y: 9, frame: MC_FURNITURE.tableMedium.right, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 13, y: 8, frame: MC_FURNITURE.chairBack },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 14, y: 8, frame: MC_FURNITURE.chairBack },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 13, y: 10, frame: MC_FURNITURE.chairFront },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 14, y: 10, frame: MC_FURNITURE.chairFront },
    // 中央阅读区
    { type: "mc-furniture", sprite: "mc-furniture1", x: 8, y: 8, frame: MC_FURNITURE.tableRound, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 9, y: 8, frame: MC_FURNITURE.tableRound, solid: true },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 7, y: 8, frame: MC_FURNITURE.chairLeft },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 10, y: 8, frame: MC_FURNITURE.chairRight },
    // 台灯
    { type: "mc-furniture", sprite: "mc-furniture1", x: 2, y: 9, frame: MC_FURNITURE.lampTable },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 15, y: 9, frame: MC_FURNITURE.lampTable },
    // 植物
    { type: "mc-furniture", sprite: "mc-furniture1", x: 2, y: 11, frame: MC_FURNITURE.plantLarge },
    { type: "mc-furniture", sprite: "mc-furniture1", x: 15, y: 11, frame: MC_FURNITURE.plantLarge },
    // 书籍装饰
    { type: "mc-item", sprite: "mc-small-items", x: 3, y: 9, frame: MC_SMALL_ITEMS.bookOpen, z: 10 },
    { type: "mc-item", sprite: "mc-small-items", x: 4, y: 9, frame: MC_SMALL_ITEMS.bookStack, z: 10 },
    { type: "mc-item", sprite: "mc-small-items", x: 13, y: 9, frame: MC_SMALL_ITEMS.bookOpen, z: 10 },
    { type: "mc-item", sprite: "mc-small-items", x: 8, y: 8, frame: MC_SMALL_ITEMS.candleLit, z: 10 },
    { type: "mc-item", sprite: "mc-small-items", x: 9, y: 8, frame: MC_SMALL_ITEMS.bookStack, z: 10 },
  ],
  objects: [
    // 图书管理员 NPC
    { type: "npc", x: 9, y: 4, name: "librarian", frame: CHARACTERS.elder.down, dialogue: "librarian" },
    // 宝箱 (隐藏知识)
    { type: "chest", x: 8, y: 1, name: "library_chest", frame: INTERACTABLES.chest.closed, gold: 200 },
    // 出口
    { type: "exit", x: 8, y: 13, targetArea: "castle", targetX: 10, targetY: 15 },
    { type: "exit", x: 9, y: 13, targetArea: "castle", targetX: 10, targetY: 15 },
  ],
};

// 室内场景映射
export const INTERIOR_MAPS = {
  elder_house: ELDER_HOUSE_INTERIOR,
  shop: SHOP_INTERIOR,
  smithy: SMITHY_INTERIOR,
  inn: INN_INTERIOR,
  throne_room: THRONE_ROOM_INTERIOR,
  // Mi-Casa 风格室内
  cozy_house: COZY_HOUSE_INTERIOR,
  restaurant: RESTAURANT_INTERIOR,
  library: LIBRARY_INTERIOR,
};
