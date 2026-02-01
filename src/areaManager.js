// 区域管理器 - 处理地图加载和区域切换
import { k } from "./kaboomCtx";
import { GAME_CONFIG, DIALOGUE_DATA } from "./constants";
import { TILE_FRAMES } from "./maps/index";
import {
  VILLAGE_MAP, VILLAGE_OBJECTS,
  FOREST_MAP, FOREST_OBJECTS,
  LAKE_MAP, LAKE_OBJECTS,
  MINE_MAP, MINE_OBJECTS,
  CASTLE_MAP, CASTLE_OBJECTS,
} from "./maps/index";
import {
  TREES, PLANTS, FENCES, INTERACTABLES, ITEMS,
  CHARACTERS, SPECIAL_CHARS, FURNITURE, ROCKS
} from "./sprites";
import { gameState, markItemCollected, isItemCollected, markChestOpened, isChestOpened, addGold, addExp, healPlayer, addToInventory } from "./gameState";
import { displayDialogue } from "./utils";
import { enterInterior } from "./scenes/interior";

// 区域数据映射
const AREA_DATA = {
  village: { map: VILLAGE_MAP, objects: VILLAGE_OBJECTS },
  forest: { map: FOREST_MAP, objects: FOREST_OBJECTS },
  lake: { map: LAKE_MAP, objects: LAKE_OBJECTS },
  mine: { map: MINE_MAP, objects: MINE_OBJECTS },
  castle: { map: CASTLE_MAP, objects: CASTLE_OBJECTS },
};

// 当前加载的区域对象
let currentAreaObjects = [];

// ===== 加载区域 =====
export function loadArea(areaName, player) {
  const areaData = AREA_DATA[areaName];
  if (!areaData) {
    console.error(`区域 ${areaName} 不存在`);
    return null;
  }

  const { map, objects } = areaData;
  const tileSize = GAME_CONFIG.TILE_SIZE;
  const scale = GAME_CONFIG.SCALE_FACTOR;

  // 清除旧对象
  clearAreaObjects();

  // 设置背景色
  k.setBackground(k.Color.fromHex(map.bgColor || "#311047"));

  // 创建地图容器
  const mapContainer = k.add([
    k.pos(0, 0),
    k.scale(scale),
    "map",
  ]);

  // 渲染地图瓦片
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      const tileType = map.tiles[y][x];
      const tileFrame = TILE_FRAMES[tileType];

      mapContainer.add([
        k.sprite("spritesheet", { frame: tileFrame }),
        k.pos(x * tileSize, y * tileSize),
        k.z(0),
      ]);

      // 碰撞 (边界=1, 浅水=3, 深水=4)
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

  // 加载区域对象
  loadAreaObjects(objects, player, scale, tileSize);

  // 创建地图边界
  createMapBoundaries(map.width, map.height, tileSize, scale);

  return { mapContainer, spawnPoint: map.spawnPoint };
}

// ===== 加载区域对象 =====
function loadAreaObjects(objects, player, scale, tileSize) {
  const objectScale = GAME_CONFIG.OBJECT_SCALE || 2;

  objects.forEach(obj => {
    const worldX = obj.x * tileSize * scale;
    const worldY = obj.y * tileSize * scale;
    const objId = `${gameState.currentArea}_${obj.type}_${obj.x}_${obj.y}`;

    switch (obj.type) {
      case "npc":
      case "king":
        createNPC(obj, worldX, worldY, objectScale, player);
        break;
      case "chest":
        createChest(obj, worldX, worldY, objectScale, player, objId);
        break;
      case "well":
        createWell(obj, worldX, worldY, objectScale, player, scale, tileSize);
        break;
      case "sign":
      case "signpost":
        createSign(obj, worldX, worldY, objectScale, player);
        break;
      case "tree":
        createTree(obj, worldX, worldY, scale, objectScale, tileSize);
        break;
      case "building":
        createBuilding(obj, worldX, worldY, scale, objectScale, tileSize, player);
        break;
      case "item":
      case "collectible":
        createItem(obj, worldX, worldY, objectScale, player, objId);
        break;
      case "portal":
        createPortal(obj, worldX, worldY, scale, tileSize, player);
        break;
      case "flower":
      case "egg":
      case "mushroom":
      case "grass":
        createDecoration(obj, worldX, worldY, objectScale * 0.8);
        break;
      case "rock":
      case "ore":
      case "crystal":
      case "bush":
        createObstacle(obj, worldX, worldY, objectScale * 0.9);
        break;
      case "torch":
      case "flag":
      case "fence":
      case "furniture":
      case "statue":
      case "container":
        createProp(obj, worldX, worldY, objectScale * 0.9);
        break;
      case "rug":
        createFloorDecor(obj, worldX, worldY, scale);
        break;
      case "enemy_spawn":
        createEnemySpawn(obj, worldX, worldY, player);
        break;
      case "fishing_spot":
        createFishingSpot(obj, worldX, worldY, objectScale, player);
        break;
    }
  });
}

// ===== 创建函数 =====

function createNPC(obj, x, y, scale, player) {
  const npc = k.add([
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
  currentAreaObjects.push(npc);

  player.onCollide(obj.name, () => {
    if (player.isInDialogue) return;
    player.isInDialogue = true;
    
    const dialogue = DIALOGUE_DATA[obj.dialogue || obj.name];
    
    if (dialogue) {
      displayDialogue(dialogue, () => { player.isInDialogue = false; });
    } else {
      player.isInDialogue = false;
    }
  });
}

function createChest(obj, x, y, scale, player, objId) {
  if (isChestOpened(objId)) return; // 已打开的宝箱不再显示

  const chest = k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.area({ shape: new k.Rect(k.vec2(0), 12, 12) }),
    k.body({ isStatic: true }),
    k.anchor("center"),
    k.scale(scale),
    k.z(5),
    objId,
    "chest",
  ]);
  currentAreaObjects.push(chest);

  player.onCollide(objId, () => {
    if (player.isInDialogue || isChestOpened(objId)) return;
    
    // 检查是否需要钥匙
    if (obj.locked) {
      const keyType = obj.frame === INTERACTABLES.chest.golden ? "keyGold" : "keyBronze";
      if (!gameState.inventory.some(item => item.type === keyType)) {
        player.isInDialogue = true;
        displayDialogue({
          speaker: "系统",
          lines: ["这个宝箱被锁住了！", `你需要一把${keyType === "keyGold" ? "金" : "铜"}钥匙来打开它。`]
        }, () => { player.isInDialogue = false; });
        return;
      }
    }

    player.isInDialogue = true;
    markChestOpened(objId);
    chest.frame = INTERACTABLES.chest.open;
    addGold(obj.gold || 50);
    addExp(30);
    
    showFloatingText(x, y, `+${obj.gold || 50} 金币`);
    createCollectEffect(x, y);
    
    displayDialogue({
      speaker: "系统",
      lines: [`你打开了宝箱！获得了 ${obj.gold || 50} 金币！`]
    }, () => { player.isInDialogue = false; });
  });
}

function createWell(obj, x, y, scale, player, mapScale, tileSize) {
  const offset = tileSize * mapScale * 0.4;
  
  const wellTop = k.add([
    k.sprite("spritesheet", { frame: INTERACTABLES.well.top }),
    k.pos(x, y - offset),
    k.anchor("center"),
    k.scale(scale),
    k.z(6),
  ]);
  
  const wellBottom = k.add([
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
  
  currentAreaObjects.push(wellTop, wellBottom);

  player.onCollide(obj.name, () => {
    if (player.isInDialogue) return;
    player.isInDialogue = true;
    healPlayer(gameState.player.maxHp);
    showFloatingText(x, y, "HP 完全恢复！");
    displayDialogue({
      speaker: "系统",
      lines: ["你在井边休息了一会儿...", "HP 已完全恢复！"]
    }, () => { player.isInDialogue = false; });
  });
}

function createSign(obj, x, y, scale, player) {
  const signId = `sign_${obj.x}_${obj.y}`;
  const sign = k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.area({ shape: new k.Rect(k.vec2(0), 10, 10) }),
    k.body({ isStatic: true }),
    k.anchor("center"),
    k.scale(scale),
    k.z(5),
    signId,
    "sign",
  ]);
  currentAreaObjects.push(sign);

  player.onCollide(signId, () => {
    if (player.isInDialogue) return;
    player.isInDialogue = true;
    
    const dialogue = DIALOGUE_DATA[obj.dialogue] || DIALOGUE_DATA.sign;
    
    displayDialogue(dialogue, () => { player.isInDialogue = false; });
  });
}

function createTree(obj, x, y, mapScale, objScale, tileSize) {
  const offset = tileSize * mapScale * 0.7;
  const treeType = TREES[obj.variant] || TREES.green;
  
  const treeTop = k.add([
    k.sprite("spritesheet", { frame: treeType.top }),
    k.pos(x, y - offset),
    k.anchor("center"),
    k.scale(objScale),
    k.z(7),
  ]);
  
  const treeMid = k.add([
    k.sprite("spritesheet", { frame: treeType.middle }),
    k.pos(x, y),
    k.anchor("center"),
    k.scale(objScale),
    k.z(6),
  ]);
  
  const treeBottom = k.add([
    k.sprite("spritesheet", { frame: treeType.bottom }),
    k.pos(x, y + offset),
    k.area({ shape: new k.Rect(k.vec2(0), 10, 10) }),
    k.body({ isStatic: true }),
    k.anchor("center"),
    k.scale(objScale),
    k.z(5),
    "tree",
  ]);
  
  currentAreaObjects.push(treeTop, treeMid, treeBottom);
}

function createBuilding(obj, x, y, mapScale, objScale, tileSize, player) {
  const offset = tileSize * mapScale;
  const wall = obj.style === "dark" ? 
    { topLeft: 305, top: 306, topRight: 307, bottomLeft: 383, bottom: 384, bottomRight: 385 } :
    { topLeft: 302, top: 303, topRight: 304, bottomLeft: 380, bottom: 381, bottomRight: 382 };
  
  const buildingParts = [];
  const buildingId = `building_${obj.name}`;
  
  // 屋顶
  [-1, 0, 1].forEach(dx => {
    const part = k.add([
      k.sprite("spritesheet", { frame: dx === -1 ? 224 : dx === 1 ? 226 : 225 }),
      k.pos(x + dx * offset, y - offset * 2),
      k.anchor("center"),
      k.scale(objScale * 0.9),
      k.z(6),
    ]);
    buildingParts.push(part);
  });
  
  // 墙壁
  const wallParts = [
    { frame: wall.topLeft, dx: -1, dy: -1 },
    { frame: 227, dx: 0, dy: -1 }, // 门上部
    { frame: wall.topRight, dx: 1, dy: -1 },
    { frame: wall.bottomLeft, dx: -1, dy: 0 },
    { frame: 266, dx: 0, dy: 0 }, // 门
    { frame: wall.bottomRight, dx: 1, dy: 0 },
  ];
  
  wallParts.forEach(p => {
    const part = k.add([
      k.sprite("spritesheet", { frame: p.frame }),
      k.pos(x + p.dx * offset, y + p.dy * offset),
      k.anchor("center"),
      k.scale(objScale * 0.9),
      k.z(5),
    ]);
    buildingParts.push(part);
  });
  
  // 门口入口区域
  if (obj.enterable && obj.interior) {
    const doorArea = k.add([
      k.area({ shape: new k.Rect(k.vec2(0), offset * 0.8, offset * 0.5) }),
      k.pos(x, y + offset * 0.5),
      k.anchor("center"),
      buildingId,
      "door",
    ]);
    buildingParts.push(doorArea);
    
    // 进入建筑
    player.onCollide(buildingId, () => {
      if (player.isInDialogue) return;
      player.isInDialogue = true;
      
      displayDialogue({
        speaker: "系统",
        lines: ["按空格键进入建筑"]
      }, () => { player.isInDialogue = false; });
      
      // 监听空格键进入
      const enterHandler = k.onKeyPress("space", () => {
        enterHandler.cancel();
        enterInterior(obj.interior, gameState.currentArea, obj.x, obj.y + 2);
      });
      
      // 离开时取消监听
      setTimeout(() => enterHandler.cancel(), 3000);
    });
  }
  
  // 墙壁碰撞
  const collision = k.add([
    k.area({ shape: new k.Rect(k.vec2(0), offset * 2.5, offset * 1.5) }),
    k.body({ isStatic: true }),
    k.pos(x, y - offset * 0.7),
    k.anchor("center"),
    "building-wall",
  ]);
  buildingParts.push(collision);
  
  currentAreaObjects.push(...buildingParts);
}

function createItem(obj, x, y, scale, player, objId) {
  if (isItemCollected(objId)) return;

  const item = k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.area({ shape: new k.Rect(k.vec2(0), 10, 10) }),
    k.anchor("center"),
    k.scale(scale * 0.8),
    k.z(4),
    objId,
    "item",
  ]);
  currentAreaObjects.push(item);

  // 浮动动画
  let time = Math.random() * Math.PI * 2;
  const originalY = y;
  item.onUpdate(() => {
    time += k.dt() * 2;
    item.pos.y = originalY + Math.sin(time) * 3;
  });

  player.onCollide(objId, () => {
    if (isItemCollected(objId)) return;
    markItemCollected(objId);
    k.destroy(item);
    createCollectEffect(x, y);
    
    handleItemPickup(obj, x, y);
  });
}

function handleItemPickup(obj, x, y) {
  let message = "";
  
  switch (obj.itemType) {
    case "hpPotion":
      healPlayer(30);
      message = "+30 HP";
      break;
    case "mpPotion":
      gameState.player.mp = Math.min(gameState.player.mp + 20, gameState.player.maxMp);
      message = "+20 MP";
      break;
    case "coin":
      addGold(10);
      message = "+10 金币";
      break;
    case "coinStack":
      addGold(50);
      message = "+50 金币";
      break;
    case "gemRed":
    case "gemBlue":
    case "gemGreen":
    case "gemYellow":
      addGold(100);
      addExp(30);
      message = "宝石 +100金币";
      break;
    case "keyBronze":
    case "keySilver":
    case "keyGold":
      addToInventory({ type: obj.itemType, name: obj.itemType });
      message = "获得钥匙！";
      break;
    default:
      addToInventory({ type: obj.itemType, name: obj.itemType });
      message = "获得物品！";
  }
  
  showFloatingText(x, y, message);
}

function createPortal(obj, x, y, mapScale, tileSize, player) {
  const portal = k.add([
    k.area({ shape: new k.Rect(k.vec2(0), tileSize * mapScale, tileSize * mapScale) }),
    k.pos(x, y),
    k.anchor("center"),
    `portal_${obj.targetArea}`,
    "portal",
  ]);
  currentAreaObjects.push(portal);

  player.onCollide(`portal_${obj.targetArea}`, () => {
    if (player.isInDialogue) return;
    
    // 切换区域
    gameState.currentArea = obj.targetArea;
    gameState.playerPos = { x: obj.targetX, y: obj.targetY };
    
    // 重新加载场景
    k.go("world");
  });
}

function createDecoration(obj, x, y, scale) {
  const decor = k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.anchor("center"),
    k.scale(scale),
    k.z(2),
    "decoration",
  ]);
  currentAreaObjects.push(decor);
}

function createObstacle(obj, x, y, scale) {
  const obstacle = k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.area({ shape: new k.Rect(k.vec2(0), 10, 10) }),
    k.body({ isStatic: true }),
    k.anchor("center"),
    k.scale(scale),
    k.z(3),
    "obstacle",
  ]);
  currentAreaObjects.push(obstacle);
}

function createProp(obj, x, y, scale) {
  const prop = k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.area({ shape: new k.Rect(k.vec2(0), 8, 8) }),
    k.body({ isStatic: true }),
    k.anchor("center"),
    k.scale(scale),
    k.z(4),
    "prop",
  ]);
  currentAreaObjects.push(prop);
}

function createFloorDecor(obj, x, y, scale) {
  const floor = k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.anchor("center"),
    k.scale(scale),
    k.z(1),
    "floor-decor",
  ]);
  currentAreaObjects.push(floor);
}

function createEnemySpawn(obj, x, y, player) {
  const spawnArea = k.add([
    k.area({ shape: new k.Rect(k.vec2(0), 30, 30) }),
    k.pos(x, y),
    k.anchor("center"),
    `enemy_${obj.x}_${obj.y}`,
    "enemy_spawn",
  ]);
  currentAreaObjects.push(spawnArea);

  player.onCollide(`enemy_${obj.x}_${obj.y}`, () => {
    if (player.isInDialogue) return;
    
    // 随机遭遇战斗
    if (Math.random() < 0.3) {
      player.isInDialogue = true;
      displayDialogue({
        speaker: "系统",
        lines: [`遭遇了敌人！`, "准备战斗！"]
      }, () => {
        player.isInDialogue = false;
        // 进入战斗场景
        k.go("battle", obj.enemyType, obj.level);
      });
    }
  });
}

function createFishingSpot(obj, x, y, scale, player) {
  const spot = k.add([
    k.area({ shape: new k.Rect(k.vec2(0), 20, 20) }),
    k.pos(x, y),
    k.anchor("center"),
    obj.name,
    "fishing_spot",
  ]);
  currentAreaObjects.push(spot);

  player.onCollide(obj.name, () => {
    if (player.isInDialogue) return;
    player.isInDialogue = true;
    displayDialogue({
      speaker: "系统",
      lines: ["这里可以钓鱼！", "按空格键开始钓鱼。"]
    }, () => {
      player.isInDialogue = false;
      // TODO: 进入钓鱼小游戏
    });
  });
}

// ===== 辅助函数 =====

function clearAreaObjects() {
  currentAreaObjects.forEach(obj => {
    if (obj && obj.destroy) {
      k.destroy(obj);
    }
  });
  currentAreaObjects = [];
}

function createMapBoundaries(width, height, tileSize, scale) {
  const mapWidth = width * tileSize * scale;
  const mapHeight = height * tileSize * scale;
  
  const boundaries = [
    k.add([k.area({ shape: new k.Rect(k.vec2(0), mapWidth, 10) }), k.body({ isStatic: true }), k.pos(0, -10), "boundary"]),
    k.add([k.area({ shape: new k.Rect(k.vec2(0), mapWidth, 10) }), k.body({ isStatic: true }), k.pos(0, mapHeight), "boundary"]),
    k.add([k.area({ shape: new k.Rect(k.vec2(0), 10, mapHeight) }), k.body({ isStatic: true }), k.pos(-10, 0), "boundary"]),
    k.add([k.area({ shape: new k.Rect(k.vec2(0), 10, mapHeight) }), k.body({ isStatic: true }), k.pos(mapWidth, 0), "boundary"]),
  ];
  
  currentAreaObjects.push(...boundaries);
}

function createCollectEffect(x, y) {
  for (let i = 0; i < 5; i++) {
    const particle = k.add([
      k.rect(4, 4),
      k.pos(x, y),
      k.anchor("center"),
      k.color(255, 255, 100),
      k.opacity(1),
      k.z(100),
      { vx: (Math.random() - 0.5) * 100, vy: -50 - Math.random() * 50 },
    ]);
    particle.onUpdate(() => {
      particle.pos.x += particle.vx * k.dt();
      particle.pos.y += particle.vy * k.dt();
      particle.vy += 100 * k.dt();
      particle.opacity -= k.dt() * 2;
      if (particle.opacity <= 0) k.destroy(particle);
    });
  }
}

function showFloatingText(x, y, message) {
  const text = k.add([
    k.text(message, { size: 10 }),
    k.pos(x, y - 20),
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

// ===== 导出 =====
export function getSpawnPosition(areaName) {
  const areaData = AREA_DATA[areaName];
  if (areaData) {
    const tileSize = GAME_CONFIG.TILE_SIZE;
    const scale = GAME_CONFIG.SCALE_FACTOR;
    return {
      x: areaData.map.spawnPoint.x * tileSize * scale,
      y: areaData.map.spawnPoint.y * tileSize * scale,
    };
  }
  return { x: 100, y: 100 };
}

export function getAreaName(areaName) {
  const areaData = AREA_DATA[areaName];
  return areaData ? areaData.map.name : "未知区域";
}
