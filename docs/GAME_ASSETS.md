# 游戏资源清单

本文档列出了项目中所有可用的游戏资源，方便后续开发和游戏扩展。

---

## 目录结构

```
public/
├── spritesheet.png          # 主精灵表 (624×496px, 39×31格, 1209瓦片)
├── assets/                   # 小游戏资源
│   ├── rock.webp            # 石头剪刀布 - 石头
│   ├── paper.webp           # 石头剪刀布 - 布
│   ├── scissors.webp        # 石头剪刀布 - 剪刀
│   ├── fish.webp            # 钓鱼小游戏 - 鱼图标
│   ├── tank.webp            # 钓鱼小游戏 - 鱼缸背景
│   ├── quit.webp            # UI - 退出按钮
│   └── home.png             # UI - 主页按钮
└── mi-casa/                  # Mi-Casa 风格资源
    ├── monogram.ttf                      # 像素风格字体
    ├── Itty_Bitty_6_Walk_sprites.png     # 角色精灵表 (240×128px)
    ├── TopDownHouse_FloorsAndWalls.png   # 地板墙壁 (288×144px)
    ├── TopDownHouse_DoorsAndWindows.png  # 门窗 (288×160px)
    ├── TopDownHouse_FurnitureState1.png  # 家具状态1 (208×288px)
    ├── TopDownHouse_FurnitureState2.png  # 家具状态2 (208×288px)
    ├── TopDownHouse_SmallItems.png       # 小物品 (208×288px)
    └── Interiors_free_16x16.png          # 室内装饰集 (256×1424px)
```

---

## 一、主精灵表 (spritesheet.png)

**文件**: `public/spritesheet.png`  
**规格**: 624×496 像素 = 39列 × 31行 = 1209 瓦片 (每个16×16像素)

### 1.1 地面瓦片

| 常量名 | 帧索引 | 用途 |
|--------|--------|------|
| `SAND_TILES` | 0-82 | 沙地/橙色地面，9宫格边缘 |
| `GRASS_TILES` | 117-197 | 草地，9宫格边缘 |
| `BLUE_TILES` | 123-203 | 蓝色/紫色地面 |
| `GOLD_TILES` | 27-107 | 金色路径 |
| `WATER_TILES` | 13-171 | 水面（含动画帧）、水边缘、瀑布 |

### 1.2 植物装饰

| 常量名 | 内容 |
|--------|------|
| `PLANTS.eggs` | 彩色蛋/果实 (7种颜色) |
| `PLANTS.flowers` | 花朵 (红、橙、黄、粉，普通和郁金香) |
| `PLANTS.bushes` | 灌木 (小、中、大、圆形变体) |
| `PLANTS.mushrooms` | 蘑菇 (红、棕、紫、蓝、簇生) |
| `PLANTS.grass` | 草丛 (短草、高草各4种变体) |

### 1.3 建筑瓦片

| 常量名 | 内容 |
|--------|------|
| `BUILDINGS.wallLight` | 浅色墙壁 9宫格 |
| `BUILDINGS.wallDark` | 深色墙壁 9宫格 |
| `BUILDINGS.roof` | 屋顶 (尖顶、边缘) |
| `BUILDINGS.door` | 门 (关闭、打开、双开) |
| `BUILDINGS.window` | 窗户 (小、大、圆、百叶窗) |
| `BUILDINGS.chimney` | 烟囱 |

### 1.4 树木

| 常量名 | 内容 |
|--------|------|
| `TREES.green` | 绿色大树 (顶、中、底) |
| `TREES.brown` | 棕色树 |
| `TREES.dead` | 枯树 |
| `TREES.pine` | 松树 |
| `TREES.sapling` | 树苗 (小、中) |
| `TREES.stump` | 树桩 |
| `TREES.fruitTree` | 果树 |

### 1.5 家具 (原版)

| 常量名 | 内容 |
|--------|------|
| `FURNITURE.bed` | 床 (2×2双人床、单人床) |
| `FURNITURE.table` | 桌子 (小、中、大、圆、华丽) |
| `FURNITURE.chair` | 椅子 (前、后、左、右、凳子、王座) |
| `FURNITURE.cabinet` | 柜子 (小、大、书架、衣柜) |
| `FURNITURE.rug` | 地毯 (3×3、小) |
| `FURNITURE.plant` | 盆栽 (小、中、大、仙人掌、花) |
| `FURNITURE.lamp` | 灯 (台灯、落地灯、吊灯) |
| `FURNITURE.fireplace` | 壁炉 (开、关) |
| `FURNITURE.clock` | 时钟 |
| `FURNITURE.painting` | 画框 (小、中、大) |
| `FURNITURE.mirror` | 镜子 |
| `FURNITURE.vase` | 花瓶 (空、有花) |

### 1.6 栅栏围墙

| 常量名 | 内容 |
|--------|------|
| `FENCES.wood` | 木栅栏 (水平、垂直、角落、柱子、门) |
| `FENCES.stone` | 石墙 (水平、垂直、角落、柱子) |

### 1.7 可交互物品

| 常量名 | 内容 |
|--------|------|
| `INTERACTABLES.chest` | 宝箱 (关闭、打开、锁住、金色、小、宝箱怪) |
| `INTERACTABLES.crate` | 箱子 (正常、破损) |
| `INTERACTABLES.barrel` | 桶 (正常、打开) |
| `INTERACTABLES.pot` | 罐子 (正常、破损) |
| `INTERACTABLES.sign` | 告示牌 (木、石、箭头) |
| `INTERACTABLES.well` | 水井 (顶、底) |
| `INTERACTABLES.torch` | 火把 (墙上3帧动画、立式3帧动画) |
| `INTERACTABLES.flag` | 旗帜 (红、蓝、绿、黄) |
| `INTERACTABLES.signpost` | 路牌 |

### 1.8 石头矿物

| 常量名 | 内容 |
|--------|------|
| `ROCKS.small` | 小石头 (3种) |
| `ROCKS.medium` | 中石头 (3种) |
| `ROCKS.large` | 大石头 (3种) |
| `ROCKS.ore` | 矿石 (铜、铁、金、宝石) |
| `ROCKS.crystal` | 水晶 (蓝、红、绿) |

### 1.9 道具图标

| 常量名 | 内容 |
|--------|------|
| `ITEMS.shield` | 盾牌 (普通、金) |
| `ITEMS.sword` | 剑 (普通、金、火焰) |
| `ITEMS.axe` | 斧头 (普通、金) |
| `ITEMS.bow` | 弓 (普通、金) |
| `ITEMS.potion*` | 药水 (红、蓝、绿、黄) |
| `ITEMS.coin` | 金币 (单个、堆叠) |
| `ITEMS.gem*` | 宝石 (红、蓝、绿、黄) |
| `ITEMS.key*` | 钥匙 (铜、银、金) |
| `ITEMS.scroll` | 卷轴 |
| `ITEMS.book` | 书 |
| `ITEMS.ring` | 戒指 |
| `ITEMS.amulet` | 护身符 |

### 1.10 特效

| 常量名 | 内容 |
|--------|------|
| `EFFECTS.slash` | 斩击 (水平、垂直、对角各4帧) |
| `EFFECTS.explosion` | 爆炸 (4帧) |
| `EFFECTS.spark` | 火花 (4帧) |
| `EFFECTS.magic` | 魔法 (圆形、星形) |
| `EFFECTS.glow` | 金色光芒 (4帧) |
| `EFFECTS.dust` | 灰尘/烟雾 (4帧) |

### 1.11 角色精灵

| 常量名 | 描述 | 帧索引范围 |
|--------|------|------------|
| `CHARACTERS.player` | 玩家 (下、侧、上各4帧动画) | 936-1017 |
| `CHARACTERS.npc1-8` | 8种颜色NPC | 940-1046 |
| `CHARACTERS.villager1-4` | 4种村民 | 1053-1143 |
| `CHARACTERS.merchant` | 商人 | 1069-1147 |
| `CHARACTERS.guard` | 守卫 | 1073-1151 |
| `CHARACTERS.elder` | 长老 | 1077-1155 |
| `CHARACTERS.child` | 小孩 | 1081-1159 |
| `CHARACTERS.knight` | 骑士 | 1085-1163 |
| `CHARACTERS.mage` | 法师 | 1089-1167 |
| `CHARACTERS.archer` | 弓箭手 | 1093-1171 |
| `CHARACTERS.thief` | 盗贼 | 1097-1175 |
| `CHARACTERS.farmer` | 农夫 | 1170-1248 |
| `CHARACTERS.fisher` | 渔夫 | 1174-1252 |
| `CHARACTERS.blacksmith` | 铁匠 | 1178-1256 |
| `CHARACTERS.innkeeper` | 旅店老板 | 1182-1260 |

### 1.12 UI元素

| 常量名 | 内容 |
|--------|------|
| `UI_NUMBERS` | 版本号、数字0-5 |
| `UI_HEARTS` | 心形 (满、3/4、半、1/4、空) |
| `SPECIAL_CHARS.king` | 国王 (前、后、侧、皇冠) |
| `SPECIAL_CHARS.statue` | 雕像 |

### 1.13 动画配置

```javascript
ANIMATIONS = {
  player: {
    "idle-down", "walk-down",   // 向下
    "idle-side", "walk-side",   // 侧面
    "idle-up", "walk-up"        // 向上
  },
  water: { from: 13, to: 16, loop: true, speed: 4 },
  torch: { from: 233, to: 235, loop: true, speed: 6 },
  slashH: { from: 606, to: 609, loop: false, speed: 12 },
  slashV: { from: 645, to: 648, loop: false, speed: 12 },
}
```

---

## 二、Mi-Casa 风格资源

### 2.1 角色精灵表

**文件**: `public/mi-casa/Itty_Bitty_6_Walk_sprites.png`  
**精灵名**: `mi-casa-chars`  
**规格**: 240×128px = 15列 × 8行 = 120帧 (每个16×16px)

**已定义动画**:
| 动画名 | 帧索引 | 描述 |
|--------|--------|------|
| `mc-idle-down` | 66 | 角色1向下静止 |
| `mc-walk-down` | 66-68 | 角色1向下行走 |
| `mc-idle-side` | 96 | 角色1侧面静止 |
| `mc-walk-side` | 96-98 | 角色1侧面行走 |
| `mc-idle-up` | 111 | 角色1向上静止 |
| `mc-walk-up` | 111-113 | 角色1向上行走 |
| `mc2-idle-down` | 69 | 角色2向下静止 |
| `mc2-walk-down` | 69-71 | 角色2向下行走 |

**扩展提示**: 精灵表中还有更多角色，可根据需要添加动画定义。

---

### 2.2 地板墙壁 Tileset

**文件**: `public/mi-casa/TopDownHouse_FloorsAndWalls.png`  
**精灵名**: `mc-floors-walls`  
**规格**: 288×144px = 18列 × 9行 = 162帧

**常量**: `MC_FLOORS`

| 类型 | 索引 | 用途 |
|------|------|------|
| `woodLight` | 0-2 | 浅色木地板 (中心、变体1、变体2) |
| `woodDark` | 18-20 | 深色木地板 |
| `stone` | 36-38 | 石板地板 |
| `tile` | 54-56 | 瓷砖地板 |
| `wallTop` | 3-5 | 顶部墙壁 (左、中、右) |
| `wallMid` | 21-23 | 中部墙壁 (左、中、右) |
| `wallBot` | 39-41 | 底部墙壁 (左、中、右) |

---

### 2.3 门窗 Tileset

**文件**: `public/mi-casa/TopDownHouse_DoorsAndWindows.png`  
**精灵名**: `mc-doors-windows`  
**规格**: 288×160px = 18列 × 10行 = 180帧

**常量**: `MC_DOORS_WINDOWS`

| 类型 | 索引 | 用途 |
|------|------|------|
| `doorClosed` | 0, 18 | 关闭的门 (顶、底) |
| `doorOpen` | 1, 19 | 打开的门 (顶、底) |
| `doorDouble` | 2-3, 20-21 | 双开门 |
| `windowSmall` | 36 | 小窗户 |
| `windowLarge` | 37-38 | 大窗户 (左、右) |
| `windowRound` | 54 | 圆窗 |
| `curtainOpen` | 72-73 | 打开的窗帘 |
| `curtainClosed` | 90-91 | 关闭的窗帘 |

---

### 2.4 家具 Tileset (状态1)

**文件**: `public/mi-casa/TopDownHouse_FurnitureState1.png`  
**精灵名**: `mc-furniture1`  
**规格**: 208×288px = 13列 × 18行 = 234帧

**常量**: `MC_FURNITURE`

| 类别 | 内容 |
|------|------|
| **床** | 单人床、双人床、华丽床 (各有顶/底部分) |
| **桌子** | 小桌、中桌、大桌 (3格)、圆桌 |
| **椅子** | 前、后、左、右、凳子 |
| **柜子** | 小柜、高柜、书架、衣柜 |
| **沙发** | 左端、中间、右端 |
| **厨房** | 炉灶、水槽、柜台 (左中右) |
| **壁炉** | 熄灭/燃烧 (各2×2) |
| **浴室** | 浴缸 (3格)、马桶 |
| **地毯** | 3×3大地毯、小地毯 |
| **植物** | 小、中、大盆栽、仙人掌 |
| **灯具** | 台灯、落地灯 |
| **装饰** | 时钟、镜子、小画框、大画框 |

---

### 2.5 家具 Tileset (状态2)

**文件**: `public/mi-casa/TopDownHouse_FurnitureState2.png`  
**精灵名**: `mc-furniture2`  
**规格**: 同状态1

用于家具的交互状态变化（如打开的柜子、凌乱的床等）。

---

### 2.6 小物品 Tileset

**文件**: `public/mi-casa/TopDownHouse_SmallItems.png`  
**精灵名**: `mc-small-items`  
**规格**: 208×288px = 13列 × 18行 = 234帧

**常量**: `MC_SMALL_ITEMS`

| 类别 | 内容 |
|------|------|
| **厨具** | 锅、平底锅、盘子、杯子、碗 |
| **书籍** | 打开的书、合上的书、书堆 |
| **瓶子** | 蓝色、红色、绿色药水瓶 |
| **食物** | 面包、奶酪、苹果、肉 |
| **蜡烛** | 点燃的、熄灭的、烛台 |
| **花瓶** | 空花瓶、插花花瓶 |
| **容器** | 小箱子、大箱子、木桶 |
| **宝箱** | 关闭的、打开的 |

---

### 2.7 大型室内装饰集

**文件**: `public/mi-casa/Interiors_free_16x16.png`  
**精灵名**: `mc-interiors-free`  
**规格**: 256×1424px = 16列 × 89行 = 1424帧

包含大量额外的室内装饰瓦片，可用于创建更丰富的场景。

---

### 2.8 像素字体

**文件**: `public/mi-casa/monogram.ttf`  
**字体名**: `monogram`

用法示例：
```javascript
k.loadFont("monogram", "./mi-casa/monogram.ttf");
// 使用
k.text("Hello World", { font: "monogram", size: 16 });
```

---

## 三、小游戏资源

**目录**: `public/assets/`

| 文件 | 精灵名 | 用途 |
|------|--------|------|
| `rock.webp` | `rock` | 石头剪刀布游戏 - 石头 |
| `paper.webp` | `paper` | 石头剪刀布游戏 - 布 |
| `scissors.webp` | `scissors` | 石头剪刀布游戏 - 剪刀 |
| `fish.webp` | `fish-icon` | 钓鱼小游戏 - 鱼图标 |
| `tank.webp` | `tank` | 钓鱼小游戏 - 水族箱背景 |
| `quit.webp` | `quit-btn` | 通用UI - 退出按钮 |
| `home.png` | `home-btn` | 通用UI - 主页按钮 |

加载函数：
```javascript
import { loadMinigameAssets } from "./sprites";
await loadMinigameAssets();
```

---

## 四、已定义的室内场景

### 4.1 传统风格室内

| 场景ID | 名称 | 尺寸 | 特色 |
|--------|------|------|------|
| `elder_house` | 村长的家 | 12×10 | 床、书架、壁炉、地毯 |
| `shop` | 杂货商店 | 14×10 | 柜台、商品展示、商人NPC |
| `smithy` | 铁匠铺 | 12×10 | 熔炉、武器展示、铁匠NPC |
| `inn` | 温馨旅店 | 16×12 | 多床位、餐桌、存档点 |
| `throne_room` | 王座大厅 | 20×14 | 王座、红地毯、国王、守卫 |

### 4.2 Mi-Casa 风格室内

| 场景ID | 名称 | 尺寸 | 特色 |
|--------|------|------|------|
| `cozy_house` | 温馨小屋 | 14×12 | 双人床、壁炉、沙发、厨房、地毯 |
| `restaurant` | 美味餐厅 | 16×12 | 厨房区、长餐桌、圆桌、厨师NPC |
| `library` | 知识图书馆 | 18×14 | 多排书架、阅读桌、图书管理员NPC |

---

## 五、精灵加载 API

### 主精灵表加载
```javascript
import { loadAllSprites } from "./sprites";
await loadAllSprites(); // 自动加载所有精灵
```

### Mi-Casa 资源单独加载
```javascript
import { loadMiCasaAssets } from "./sprites";
await loadMiCasaAssets();
```

### 小游戏资源加载
```javascript
import { loadMinigameAssets } from "./sprites";
await loadMinigameAssets();
```

---

## 六、使用示例

### 创建使用主精灵表的对象
```javascript
import { CHARACTERS, FURNITURE, ITEMS } from "./sprites";

// 创建NPC
k.add([
  k.sprite("spritesheet", { frame: CHARACTERS.merchant.down }),
  k.pos(100, 100),
  k.scale(2),
]);

// 创建家具
k.add([
  k.sprite("spritesheet", { frame: FURNITURE.bed.topLeft }),
  k.pos(200, 100),
]);
```

### 创建使用 Mi-Casa 精灵的对象
```javascript
import { MC_FURNITURE, MC_SMALL_ITEMS } from "./sprites";

// 创建Mi-Casa风格家具
k.add([
  k.sprite("mc-furniture1", { frame: MC_FURNITURE.sofaCenter }),
  k.pos(100, 100),
  k.scale(2),
]);

// 创建小物品装饰
k.add([
  k.sprite("mc-small-items", { frame: MC_SMALL_ITEMS.candleLit }),
  k.pos(150, 100),
  k.scale(2),
]);
```

### 进入室内场景
```javascript
import { enterInterior } from "./scenes/interior";

// 进入Mi-Casa风格的温馨小屋
enterInterior("cozy_house", "village", 14, 12);
```

---

## 七、扩展指南

### 添加新角色动画
在 `src/sprites.js` 的 `loadMiCasaAssets()` 函数中添加新的动画定义：

```javascript
k.loadSprite("mi-casa-chars", MI_CASA_CHARS_CONFIG.path, {
  sliceX: 15,
  sliceY: 8,
  anims: {
    // 现有动画...
    // 添加新角色动画
    "mc3-idle-down": 72,
    "mc3-walk-down": { from: 72, to: 74, loop: true, speed: 6 },
  },
});
```

### 添加新室内场景
在 `src/maps/interiors.js` 中添加新的地图定义：

```javascript
export const NEW_INTERIOR = {
  name: "新场景名称",
  width: 12,
  height: 10,
  spawnPoint: { x: 6, y: 8 },
  bgColor: "#2a2a2a",
  useMiCasaTileset: true, // 使用Mi-Casa资源设为true
  floorTiles: [...],      // 地板布局
  wallMap: [...],         // 墙壁碰撞
  mcObjects: [...],       // Mi-Casa风格对象
  objects: [...],         // 标准对象 (NPC、出口等)
};

// 添加到映射
export const INTERIOR_MAPS = {
  // ...现有场景
  new_scene: NEW_INTERIOR,
};
```

---

*文档最后更新: 2026-02-01*
