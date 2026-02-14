// 精灵资源加载模块
// Happy Little Adventure v2 精灵表 - 完整详细索引
// 精灵表: 624x496 像素 = 39列 × 31行 = 1209 瓦片 (每个16x16像素)

import { k } from "./kaboomCtx";

export const SPRITESHEET_CONFIG = {
  path: "./spritesheet.png",
  sliceX: 39,
  sliceY: 31,
  tileSize: 16,
};

// ========== 第0-2行: 橙色/沙地瓦片 ==========
export const SAND_TILES = {
  // 完整的9宫格边缘
  topLeft: 0, top: 1, topRight: 2,
  left: 39, center: 40, right: 41,
  bottomLeft: 78, bottom: 79, bottomRight: 80,
  // 内角
  innerTopLeft: 3, innerTopRight: 4,
  innerBottomLeft: 42, innerBottomRight: 43,
  // 单独瓦片
  single: 5,
  // 变体
  variant1: 44, variant2: 45, variant3: 81, variant4: 82,
};

// ========== 第3-5行: 草地瓦片 ==========
export const GRASS_TILES = {
  topLeft: 117, top: 118, topRight: 119,
  left: 156, center: 157, right: 158,
  bottomLeft: 195, bottom: 196, bottomRight: 197,
  innerTopLeft: 120, innerTopRight: 121,
  innerBottomLeft: 159, innerBottomRight: 160,
  single: 122,
};

// ========== 第3-5行: 蓝色/紫色地面 ==========
export const BLUE_TILES = {
  topLeft: 123, top: 124, topRight: 125,
  left: 162, center: 163, right: 164,
  bottomLeft: 201, bottom: 202, bottomRight: 203,
};

// ========== 第1-2行右侧: 金色路径 ==========
export const GOLD_TILES = {
  topLeft: 27, top: 28, topRight: 29,
  left: 66, center: 67, right: 68,
  bottomLeft: 105, bottom: 106, bottomRight: 107,
  // 额外变体
  corner1: 30, corner2: 31,
  edge1: 69, edge2: 70,
};

// ========== 水面瓦片 ==========
// ⚠️ 重要: 原来的帧 13-16, 52-55 是彩虹条纹瓦片，不是水！
// 本精灵表中不存在专用的水面瓦片。
// 解决方案：使用 BLUE_TILES 作为水面替代品。
// 请用 /debug-atlas.html 验证实际内容。
export const WATER_TILES = {
  // 使用蓝色地面瓦片作为水面替代
  shallow: [BLUE_TILES.center],    // 163 - 蓝色地面中心
  deep: [BLUE_TILES.top],          // 124 - 蓝色地面顶部 (深色变体)
  // 水边缘 - 使用蓝色9宫格边缘
  edgeTop: BLUE_TILES.top,         // 124
  edgeBottom: BLUE_TILES.bottom,   // 202
  edgeLeft: BLUE_TILES.left,       // 162
  edgeRight: BLUE_TILES.right,     // 164
  // 角落
  cornerTopLeft: BLUE_TILES.topLeft,       // 123
  cornerTopRight: BLUE_TILES.topRight,     // 125
  cornerBottomLeft: BLUE_TILES.bottomLeft, // 201
  cornerBottomRight: BLUE_TILES.bottomRight, // 203 (was 132)
  // 瀑布 - 无专用帧，使用蓝色变体
  waterfall: [BLUE_TILES.center, BLUE_TILES.left, BLUE_TILES.right],
};

// ========== 第0-5行 列6-12: 装饰植物 ==========
export const PLANTS = {
  // 蛋/果实 (彩色)
  eggs: {
    red: 6, orange: 7, yellow: 8, green: 9, blue: 10, purple: 11, pink: 12,
  },
  // 花朵
  flowers: {
    red: 45, orange: 46, yellow: 47, pink: 48,
    tulipRed: 84, tulipOrange: 85, tulipYellow: 86, tulipPink: 87,
  },
  // 灌木
  bushes: {
    small: 83, medium: 122, large: 161,
    round1: 49, round2: 50, round3: 88, round4: 89,
  },
  // 蘑菇
  mushrooms: {
    red: 51, brown: 90, purple: 129, blue: 168,
    cluster1: 167, cluster2: 206,
  },
  // 草丛
  grass: {
    short1: 126, short2: 127, short3: 165, short4: 166,
    tall1: 204, tall2: 205, tall3: 243, tall4: 244,
  },
};

// ========== 第6行: 版本号和数字 ==========
export const UI_NUMBERS = {
  version: 234, // "v.1"
  num0: 235, num1: 236, num2: 237, num3: 238, num4: 239, num5: 240,
};

// ========== 第6-7行: 国王和特殊角色 ==========
export const SPECIAL_CHARS = {
  king: {
    front: 269, back: 270, side: 308, crown: 271,
  },
  statue: 272,
};

// ========== 第7行: 心形和UI ==========
export const UI_HEARTS = {
  full: 273, threeQuarter: 274, half: 275, quarter: 276, empty: 277,
};

// ========== 第7-8行: 道具图标 ==========
// 帧冲突已修复：树木占据 rows 9-11 cols 0-4，道具使用不同帧。
// 无专用精灵的收集品使用彩蛋帧 (row 0, cols 6-12) 作为视觉替代。
// ⚠️ 用 /debug-atlas.html 验证 axe/bow/key 的实际位置。
export const ITEMS = {
  // 武器 - 已验证区域 (row 7-8, cols 0-6)
  shield: 278, shieldGold: 279,             // row 7, col 5-6
  sword: 316, swordGold: 317, swordFire: 318, // row 8, col 4-6
  axe: 319, axeGold: 320,                   // row 8, col 7-8 ⚠️ 需验证
  bow: 321, bowGold: 322,                   // row 8, col 9-10 ⚠️ 需验证
  // 药水 - 已验证 (row 8, cols 0-3)
  potionRed: 312, potionBlue: 313, potionGreen: 314, potionYellow: 315,
  // 钱币 - 使用彩蛋帧替代 (避免与树木 row 9 冲突)
  coin: 8, coinStack: 7,                    // eggs.yellow, eggs.orange
  // 宝石 - 使用彩蛋帧替代 (避免与树木 row 10 冲突)
  gemRed: 6, gemBlue: 10, gemGreen: 9, gemYellow: 11, // eggs 各色
  // 钥匙 - 移到 row 7 无冲突位置 ⚠️ 需验证
  keyBronze: 280, keySilver: 281, keyGold: 282, // row 7, col 7-9
  // 其他 ⚠️ 需验证
  scroll: 467, book: 468,                   // row 11-12 边缘
  ring: 506, amulet: 507,                   // row 12-13 边缘
};

// ========== 第8-11行: 房屋和建筑 ==========
export const BUILDINGS = {
  // 墙壁 (浅色)
  wallLight: {
    topLeft: 302, top: 303, topRight: 304,
    left: 341, center: 342, right: 343,
    bottomLeft: 380, bottom: 381, bottomRight: 382,
  },
  // 墙壁 (深色)
  wallDark: {
    topLeft: 305, top: 306, topRight: 307,
    left: 344, center: 345, right: 346,
    bottomLeft: 383, bottom: 384, bottomRight: 385,
  },
  // 屋顶
  roof: {
    peakLeft: 224, peak: 225, peakRight: 226,
    left: 263, center: 264, right: 265,
    edgeLeft: 302, edgeRight: 304,
  },
  // 门
  door: {
    closed: 227, open: 266, double: 228,
  },
  // 窗户
  window: {
    small: 229, large: 268, round: 267,
    shutterOpen: 306, shutterClosed: 307,
  },
  // 烟囱
  chimney: 230,
};

// ========== 第9-11行: 树木 ==========
export const TREES = {
  // 绿色大树
  green: { top: 351, middle: 390, bottom: 429 },
  // 棕色树
  brown: { top: 352, middle: 391, bottom: 430 },
  // 枯树
  dead: { top: 353, middle: 392, bottom: 431 },
  // 松树
  pine: { top: 354, middle: 393, bottom: 432 },
  // 小树苗
  sapling: { small: 433, medium: 434 },
  // 树桩
  stump: 471,
  // 果树 (bottom 使用独立帧，避免与 sapling.small 冲突)
  fruitTree: { top: 355, middle: 394, bottom: 435 },
};

// ========== 第12-15行: 室内家具 (标记为 "interior") ==========
export const FURNITURE = {
  // 床 (2x2)
  bed: {
    topLeft: 463, topRight: 464,
    bottomLeft: 502, bottomRight: 503,
    // 单人床
    singleTop: 465, singleBottom: 504,
  },
  // 桌子
  table: {
    small: 466, medium: 467, large: 505,
    round: 506, fancy: 468,
  },
  // 椅子
  chair: {
    front: 469, back: 508, left: 507, right: 509,
    stool: 470, throne: 510,
  },
  // 柜子和架子
  cabinet: {
    small: 471, large: 472,
    bookshelf: 511, bookshelfFull: 512,
    wardrobe: 473,
  },
  // 地毯 (3x3)
  rug: {
    topLeft: 546, top: 547, topRight: 548,
    left: 585, center: 586, right: 587,
    bottomLeft: 624, bottom: 625, bottomRight: 626,
    // 小地毯
    small: 549,
  },
  // 盆栽
  plant: {
    small: 474, medium: 513, large: 552,
    cactus: 475, flower: 514,
  },
  // 灯具
  lamp: {
    table: 476, floor: 515, chandelier: 554,
  },
  // 壁炉
  fireplace: {
    off: 553, on: 592,
  },
  // 时钟
  clock: 477,
  // 画框
  painting: {
    small: 516, medium: 555, large: 594,
  },
  // 镜子
  mirror: 517,
  // 花瓶
  vase: { empty: 556, flowers: 595 },
};

// ========== 第12-15行右侧: 栅栏和围墙 ==========
export const FENCES = {
  // 木栅栏
  wood: {
    horizontal: 518, vertical: 557,
    cornerTopLeft: 519, cornerTopRight: 520,
    cornerBottomLeft: 558, cornerBottomRight: 559,
    post: 521, gate: 560,
  },
  // 石墙
  stone: {
    horizontal: 596, vertical: 597,
    corner: 598, pillar: 599,
  },
};

// ========== 可交互物品 ==========
export const INTERACTABLES = {
  // 宝箱
  chest: {
    closed: 347, open: 386, locked: 348, golden: 349,
    small: 387, mimic: 388,
  },
  // 箱子和桶
  crate: { normal: 427, broken: 466 },    // 修复: crate 不再与 pot 冲突
  barrel: { normal: 426, open: 465 },
  pot: { normal: 350, broken: 389 },
  // 告示牌
  sign: {
    wood: 231, stone: 270, arrow: 309,
  },
  // 水井
  well: { top: 232, bottom: 271 },
  // 火把和光源 (静态帧，原动画帧跨越不相关区域)
  torch: {
    wall: 233,   // row 5, col 38 ⚠️ 需用 debug-atlas.html 验证
    stand: 310,  // row 7, col 37 ⚠️ 需验证
  },
  // 旗帜 - 移到 row 10 cols 6-9 (避免与 hearts/potions/trees 冲突)
  flag: {
    red: 396, blue: 397, green: 398, yellow: 399,  // ⚠️ 需验证
  },
  // 路牌
  signpost: 274,
};

// ========== 石头和矿物 ==========
export const ROCKS = {
  small: [207, 208, 209],
  medium: [246, 247, 248],
  large: [285, 286, 287],
  ore: { copper: 324, iron: 325, gold: 326, gem: 327 },
  crystal: { blue: 363, red: 364, green: 365 },
};

// ========== 特效 ==========
export const EFFECTS = {
  // 斩击效果 (右下角 "SLASH")
  slash: {
    horizontal: [606, 607, 608, 609],
    vertical: [645, 646, 647, 648],
    diagonal: [684, 685, 686, 687],
  },
  // 爆炸/火花
  explosion: [571, 572, 573, 574],
  spark: [610, 611, 612, 613],
  // 魔法效果
  magic: {
    circle: [575, 576, 577],
    star: [614, 615, 616],
  },
  // 金色光芒 (黄色叶子形状)
  glow: [649, 650, 651, 652],
  // 灰尘/烟雾
  dust: [688, 689, 690, 691],
};

// ========== 角色精灵 (第24-30行) ==========
// 每个角色占4帧横向 (行走动画)，纵向有3行 (下、侧、上)
export const CHARACTERS = {
  // 第24行开始 (帧936起)
  player: {
    down: [936, 937, 938, 939],
    side: [975, 976, 977, 978],
    up: [1014, 1015, 1016, 1017],
  },
  // 不同颜色/样式的角色
  npc1: { down: 940, side: 979, up: 1018 },  // 蓝色
  npc2: { down: 944, side: 983, up: 1022 },  // 绿色
  npc3: { down: 948, side: 987, up: 1026 },  // 紫色
  npc4: { down: 952, side: 991, up: 1030 },  // 红色
  npc5: { down: 956, side: 995, up: 1034 },  // 棕色
  npc6: { down: 960, side: 999, up: 1038 },  // 灰色
  npc7: { down: 964, side: 1003, up: 1042 }, // 金色
  npc8: { down: 968, side: 1007, up: 1046 }, // 黑色
  
  // 第25行 (帧1053起) - 不同服装
  villager1: { down: 1053, side: 1092, up: 1131 },
  villager2: { down: 1057, side: 1096, up: 1135 },
  villager3: { down: 1061, side: 1100, up: 1139 },
  villager4: { down: 1065, side: 1104, up: 1143 },
  
  // 第26行 - 特殊角色
  merchant: { down: 1069, side: 1108, up: 1147 },
  guard: { down: 1073, side: 1112, up: 1151 },
  elder: { down: 1077, side: 1116, up: 1155 },
  child: { down: 1081, side: 1120, up: 1159 },
  
  // 第27行 - 更多角色
  knight: { down: 1085, side: 1124, up: 1163 },
  mage: { down: 1089, side: 1128, up: 1167 },
  archer: { down: 1093, side: 1132, up: 1171 },
  thief: { down: 1097, side: 1136, up: 1175 },
  
  // 第28-30行 - 更多变体
  farmer: { down: 1170, side: 1209, up: 1248 },
  fisher: { down: 1174, side: 1213, up: 1252 },
  blacksmith: { down: 1178, side: 1217, up: 1256 },
  innkeeper: { down: 1182, side: 1221, up: 1260 },
};

// ========== 动画配置 ==========
export const ANIMATIONS = {
  // 玩家动画
  player: {
    "idle-down": 936,
    "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
    "idle-side": 975,
    "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
    "idle-up": 1014,
    "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
  },
  // 水面 - 无动画 (蓝色地面替代品，静态帧)
  // 原 from:13 to:16 是彩虹条纹瓦片，已移除动画
  // 火把 - 无动画 (原 from:233 to:235 跨越了 UI 数字文字区域)
  // 斩击动画
  slashH: { from: 606, to: 609, loop: false, speed: 12 },
  slashV: { from: 645, to: 648, loop: false, speed: 12 },
};

// ========== Mi-Casa 资产配置 ==========
// 角色精灵表 (Itty Bitty 风格)
export const MI_CASA_CHARS_CONFIG = {
  path: "./mi-casa/Itty_Bitty_6_Walk_sprites.png",
  sliceX: 15,
  sliceY: 8,
  tileSize: 16,
};

// Mi-Casa 角色动画配置
export const MI_CASA_CHAR_ANIMS = {
  // 主角色 (帧索引基于15x8网格)
  char1: {
    "idle-down": 66,
    "walk-down": { from: 66, to: 68, loop: true, speed: 6 },
    "idle-side": 96,
    "walk-side": { from: 96, to: 98, loop: true, speed: 6 },
    "idle-up": 111,
    "walk-up": { from: 111, to: 113, loop: true, speed: 6 },
  },
  // 其他角色可以根据需要添加
};

// 室内 Tileset 配置
export const INTERIOR_TILESETS = {
  floorsAndWalls: {
    path: "./mi-casa/TopDownHouse_FloorsAndWalls.png",
    sliceX: 18,  // 288px / 16px
    sliceY: 9,   // 144px / 16px
    tileSize: 16,
  },
  doorsAndWindows: {
    path: "./mi-casa/TopDownHouse_DoorsAndWindows.png",
    sliceX: 18,  // 288px / 16px
    sliceY: 10,  // 160px / 16px
    tileSize: 16,
  },
  furnitureState1: {
    path: "./mi-casa/TopDownHouse_FurnitureState1.png",
    sliceX: 13,  // 208px / 16px
    sliceY: 18,  // 288px / 16px
    tileSize: 16,
  },
  furnitureState2: {
    path: "./mi-casa/TopDownHouse_FurnitureState2.png",
    sliceX: 13,
    sliceY: 18,
    tileSize: 16,
  },
  smallItems: {
    path: "./mi-casa/TopDownHouse_SmallItems.png",
    sliceX: 13,
    sliceY: 18,
    tileSize: 16,
  },
  interiorsFree: {
    path: "./mi-casa/Interiors_free_16x16.png",
    sliceX: 16,  // 256px / 16px
    sliceY: 89,  // 1424px / 16px
    tileSize: 16,
  },
};

// ========== Mi-Casa 室内家具索引 ==========
// FloorsAndWalls tileset 索引
export const MC_FLOORS = {
  // 木地板
  woodLight: { center: 0, variant1: 1, variant2: 2 },
  woodDark: { center: 18, variant1: 19, variant2: 20 },
  // 石板地板
  stone: { center: 36, variant1: 37, variant2: 38 },
  tile: { center: 54, variant1: 55, variant2: 56 },
  // 墙壁
  wallTop: { left: 3, center: 4, right: 5 },
  wallMid: { left: 21, center: 22, right: 23 },
  wallBot: { left: 39, center: 40, right: 41 },
};

// FurnitureState1 tileset 索引
export const MC_FURNITURE = {
  // 床
  bedSingle: { top: 0, bottom: 13 },
  bedDouble: { topLeft: 1, topRight: 2, bottomLeft: 14, bottomRight: 15 },
  bedFancy: { topLeft: 3, topRight: 4, bottomLeft: 16, bottomRight: 17 },
  // 桌子
  tableSmall: 26,
  tableMedium: { left: 27, right: 28 },
  tableLarge: { left: 29, center: 30, right: 31 },
  tableRound: 39,
  // 椅子
  chairFront: 52,
  chairBack: 53,
  chairLeft: 54,
  chairRight: 55,
  stool: 56,
  // 柜子
  cabinetSmall: 65,
  cabinetTall: { top: 66, bottom: 79 },
  bookshelf: { top: 67, bottom: 80 },
  wardrobe: { topLeft: 68, topRight: 69, bottomLeft: 81, bottomRight: 82 },
  // 沙发
  sofaLeft: 91,
  sofaCenter: 92,
  sofaRight: 93,
  // 厨房
  stove: 104,
  sink: 105,
  counter: { left: 106, center: 107, right: 108 },
  // 壁炉
  fireplaceOff: { topLeft: 117, topRight: 118, bottomLeft: 130, bottomRight: 131 },
  fireplaceOn: { topLeft: 119, topRight: 120, bottomLeft: 132, bottomRight: 133 },
  // 浴室
  bathtub: { left: 143, center: 144, right: 145 },
  toilet: 156,
  // 地毯 (3x3)
  rug: {
    topLeft: 169, top: 170, topRight: 171,
    left: 182, center: 183, right: 184,
    bottomLeft: 195, bottom: 196, bottomRight: 197,
  },
  rugSmall: 172,
  // 植物
  plantSmall: 208,
  plantMedium: 209,
  plantLarge: 210,
  cactus: 221,
  // 灯具
  lampTable: 222,
  lampFloor: 223,
  // 装饰
  clock: 234,
  mirror: 235,
  paintingSmall: 236,
  paintingLarge: { left: 237, right: 238 },
};

// DoorsAndWindows tileset 索引
export const MC_DOORS_WINDOWS = {
  // 门
  doorClosed: { top: 0, bottom: 18 },
  doorOpen: { top: 1, bottom: 19 },
  doorDouble: { topLeft: 2, topRight: 3, bottomLeft: 20, bottomRight: 21 },
  // 窗户
  windowSmall: 36,
  windowLarge: { left: 37, right: 38 },
  windowRound: 54,
  // 窗帘
  curtainOpen: { left: 72, right: 73 },
  curtainClosed: { left: 90, right: 91 },
};

// SmallItems tileset 索引
export const MC_SMALL_ITEMS = {
  // 厨房物品
  pot: 0,
  pan: 1,
  plate: 2,
  cup: 3,
  bowl: 4,
  // 书籍
  bookOpen: 13,
  bookClosed: 14,
  bookStack: 15,
  // 瓶子
  bottleBlue: 26,
  bottleRed: 27,
  bottleGreen: 28,
  // 食物
  bread: 39,
  cheese: 40,
  apple: 41,
  meat: 42,
  // 蜡烛
  candleLit: 52,
  candleOut: 53,
  candelabra: 54,
  // 花瓶
  vaseEmpty: 65,
  vaseFlowers: 66,
  // 箱子
  crateSmall: 78,
  crateLarge: 79,
  barrel: 91,
  // 宝箱
  chestClosed: 104,
  chestOpen: 105,
};

// Mi-Casa 宝箱帧映射 (使用 mc-small-items tileset 中已验证的宝箱精灵)
export const MC_CHEST = {
  closed: MC_SMALL_ITEMS.chestClosed, // 104
  open: MC_SMALL_ITEMS.chestOpen,     // 105
};

// ========== 加载所有精灵 ==========
export async function loadAllSprites() {
  // 加载主精灵表
  k.loadSprite("spritesheet", SPRITESHEET_CONFIG.path, {
    sliceX: SPRITESHEET_CONFIG.sliceX,
    sliceY: SPRITESHEET_CONFIG.sliceY,
    anims: {
      ...ANIMATIONS.player,
      // 水面和火把动画已移除 (原帧映射错误)
      "slash-h": ANIMATIONS.slashH,
      "slash-v": ANIMATIONS.slashV,
    },
  });

  console.log("✅ 完整精灵表加载完成 (39×31 = 1209 瓦片)");
  
  // 加载 Mi-Casa 资产
  await loadMiCasaAssets();

  // 加载小游戏资产
  await loadMinigameAssets();
}

// ========== 加载 Mi-Casa 资产 ==========
export async function loadMiCasaAssets() {
  // 加载 Mi-Casa 角色精灵表
  k.loadSprite("mi-casa-chars", MI_CASA_CHARS_CONFIG.path, {
    sliceX: MI_CASA_CHARS_CONFIG.sliceX,
    sliceY: MI_CASA_CHARS_CONFIG.sliceY,
    anims: {
      // 角色1动画
      "mc-idle-down": 66,
      "mc-walk-down": { from: 66, to: 68, loop: true, speed: 6 },
      "mc-idle-side": 96,
      "mc-walk-side": { from: 96, to: 98, loop: true, speed: 6 },
      "mc-idle-up": 111,
      "mc-walk-up": { from: 111, to: 113, loop: true, speed: 6 },
      // 角色2 (不同皮肤)
      "mc2-idle-down": 69,
      "mc2-walk-down": { from: 69, to: 71, loop: true, speed: 6 },
    },
  });
  console.log("✅ Mi-Casa 角色精灵加载完成");

  // 加载室内 Tileset
  k.loadSprite("mc-floors-walls", INTERIOR_TILESETS.floorsAndWalls.path, {
    sliceX: INTERIOR_TILESETS.floorsAndWalls.sliceX,
    sliceY: INTERIOR_TILESETS.floorsAndWalls.sliceY,
  });

  k.loadSprite("mc-doors-windows", INTERIOR_TILESETS.doorsAndWindows.path, {
    sliceX: INTERIOR_TILESETS.doorsAndWindows.sliceX,
    sliceY: INTERIOR_TILESETS.doorsAndWindows.sliceY,
  });

  k.loadSprite("mc-furniture1", INTERIOR_TILESETS.furnitureState1.path, {
    sliceX: INTERIOR_TILESETS.furnitureState1.sliceX,
    sliceY: INTERIOR_TILESETS.furnitureState1.sliceY,
  });

  k.loadSprite("mc-furniture2", INTERIOR_TILESETS.furnitureState2.path, {
    sliceX: INTERIOR_TILESETS.furnitureState2.sliceX,
    sliceY: INTERIOR_TILESETS.furnitureState2.sliceY,
  });

  k.loadSprite("mc-small-items", INTERIOR_TILESETS.smallItems.path, {
    sliceX: INTERIOR_TILESETS.smallItems.sliceX,
    sliceY: INTERIOR_TILESETS.smallItems.sliceY,
  });

  k.loadSprite("mc-interiors-free", INTERIOR_TILESETS.interiorsFree.path, {
    sliceX: INTERIOR_TILESETS.interiorsFree.sliceX,
    sliceY: INTERIOR_TILESETS.interiorsFree.sliceY,
  });

  console.log("✅ Mi-Casa 室内 Tileset 加载完成");
  
  // 加载字体
  k.loadFont("monogram", "./mi-casa/monogram.ttf");
  console.log("✅ Mi-Casa 字体加载完成");
}

// ========== 加载小游戏资产 ==========
export async function loadMinigameAssets() {
  k.loadSprite("rock", "./assets/rock.webp");
  k.loadSprite("paper", "./assets/paper.webp");
  k.loadSprite("scissors", "./assets/scissors.webp");
  k.loadSprite("fish-icon", "./assets/fish.webp");
  k.loadSprite("tank", "./assets/tank.webp");
  k.loadSprite("quit-btn", "./assets/quit.webp");
  k.loadSprite("home-btn", "./assets/home.png");
  
  console.log("✅ 小游戏资产加载完成");
}

// ========== 辅助函数 ==========
// 获取随机装饰物
export function getRandomDecoration() {
  const decorations = [
    ...Object.values(PLANTS.eggs),
    ...Object.values(PLANTS.flowers),
    ...Object.values(PLANTS.mushrooms),
    PLANTS.grass.short1, PLANTS.grass.short2,
  ];
  return decorations[Math.floor(Math.random() * decorations.length)];
}

// 获取随机石头
export function getRandomRock() {
  const rocks = [...ROCKS.small, ...ROCKS.medium];
  return rocks[Math.floor(Math.random() * rocks.length)];
}

// 获取随机树类型
export function getRandomTreeType() {
  const types = ['green', 'brown', 'dead', 'pine', 'fruitTree'];
  return types[Math.floor(Math.random() * types.length)];
}
