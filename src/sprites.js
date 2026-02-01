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

// ========== 第0-5行 列13-17: 水面瓦片 ==========
export const WATER_TILES = {
  // 浅水 (动画帧)
  shallow: [13, 14, 15, 16],
  // 深水
  deep: [52, 53, 54, 55],
  // 水边缘
  edgeTop: 91, edgeBottom: 130,
  edgeLeft: 129, edgeRight: 131,
  // 角落
  cornerTopLeft: 90, cornerTopRight: 92,
  cornerBottomLeft: 128, cornerBottomRight: 132,
  // 瀑布
  waterfall: [169, 170, 171],
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
export const ITEMS = {
  // 武器
  shield: 278, shieldGold: 279,
  sword: 316, swordGold: 317, swordFire: 318,
  axe: 355, axeGold: 356,
  bow: 394, bowGold: 395,
  // 药水
  potionRed: 312, potionBlue: 313, potionGreen: 314, potionYellow: 315,
  // 宝石和钱币
  coin: 351, coinStack: 352,
  gemRed: 390, gemBlue: 391, gemGreen: 392, gemYellow: 393,
  // 钥匙
  keyBronze: 428, keySilver: 429, keyGold: 430,
  // 其他
  scroll: 467, book: 468,
  ring: 506, amulet: 507,
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
  // 果树
  fruitTree: { top: 355, middle: 394, bottom: 433 },
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
  crate: { normal: 389, broken: 427 },
  barrel: { normal: 426, open: 465 },
  pot: { normal: 350, broken: 389 },
  // 告示牌
  sign: {
    wood: 231, stone: 270, arrow: 309,
  },
  // 水井
  well: { top: 232, bottom: 271 },
  // 火把和光源
  torch: {
    wall: [233, 272, 311], // 动画帧
    stand: [310, 349, 388],
  },
  // 旗帜
  flag: {
    red: 273, blue: 312, green: 351, yellow: 390,
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
  // 水面动画
  water: { from: 13, to: 16, loop: true, speed: 4 },
  // 火把动画
  torch: { from: 233, to: 235, loop: true, speed: 6 },
  // 斩击动画
  slashH: { from: 606, to: 609, loop: false, speed: 12 },
  slashV: { from: 645, to: 648, loop: false, speed: 12 },
};

// ========== 加载所有精灵 ==========
export async function loadAllSprites() {
  k.loadSprite("spritesheet", SPRITESHEET_CONFIG.path, {
    sliceX: SPRITESHEET_CONFIG.sliceX,
    sliceY: SPRITESHEET_CONFIG.sliceY,
    anims: {
      ...ANIMATIONS.player,
      "water": ANIMATIONS.water,
      "torch": ANIMATIONS.torch,
      "slash-h": ANIMATIONS.slashH,
      "slash-v": ANIMATIONS.slashV,
    },
  });

  console.log("✅ 完整精灵表加载完成 (39×31 = 1209 瓦片)");
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
