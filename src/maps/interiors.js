// 室内场景地图数据
import { TILE_TYPES } from "./tileTypes";
import { FURNITURE, INTERACTABLES, ITEMS, CHARACTERS } from "../sprites";

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
    { type: "king", x: 10, y: 3, name: "throne_king", frame: 269, dialogue: "king" },
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
    { type: "statue", x: 3, y: 3, frame: 272 },
    { type: "statue", x: 17, y: 3, frame: 272 },
    { type: "statue", x: 3, y: 9, frame: 272 },
    { type: "statue", x: 17, y: 9, frame: 272 },
    // 旗帜
    { type: "flag", x: 2, y: 1, frame: INTERACTABLES.flag.red },
    { type: "flag", x: 4, y: 1, frame: INTERACTABLES.flag.blue },
    { type: "flag", x: 16, y: 1, frame: INTERACTABLES.flag.blue },
    { type: "flag", x: 18, y: 1, frame: INTERACTABLES.flag.red },
    // 火把
    { type: "torch", x: 2, y: 6, frame: 233 },
    { type: "torch", x: 18, y: 6, frame: 233 },
    // 宝箱 (奖励)
    { type: "chest", x: 2, y: 11, name: "throne_chest1", frame: INTERACTABLES.chest.golden, gold: 1000, locked: true },
    { type: "chest", x: 18, y: 11, name: "throne_chest2", frame: INTERACTABLES.chest.golden, gold: 1000, locked: true },
    // 出口
    { type: "exit", x: 9, y: 13, targetArea: "castle", targetX: 15, targetY: 10 },
    { type: "exit", x: 10, y: 13, targetArea: "castle", targetX: 15, targetY: 10 },
  ],
};

// 室内场景映射
export const INTERIOR_MAPS = {
  elder_house: ELDER_HOUSE_INTERIOR,
  shop: SHOP_INTERIOR,
  smithy: SMITHY_INTERIOR,
  inn: INN_INTERIOR,
  throne_room: THRONE_ROOM_INTERIOR,
};
