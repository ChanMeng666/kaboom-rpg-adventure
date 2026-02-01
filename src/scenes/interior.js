// 室内场景模块
import { k } from "../kaboomCtx";
import { GAME_CONFIG, DIALOGUE_DATA } from "../constants";
import { INTERIOR_MAPS } from "../maps/interiors";
import { TILE_FRAMES } from "../maps/index";
import { gameState } from "../gameState";
import { createPlayer, setupPlayerControls } from "../player";
import { setCamScale, showGameUI, updateUI, displayDialogue } from "../utils";
import { CHARACTERS, SPECIAL_CHARS, INTERACTABLES, FURNITURE } from "../sprites";
import { markChestOpened, isChestOpened, addGold, addExp, healPlayer, saveGame } from "../gameState";

// 当前室内对象
let currentInteriorObjects = [];

// 创建室内场景
export function createInteriorScene() {
  k.scene("interior", (interiorName, returnArea, returnX, returnY) => {
    const interior = INTERIOR_MAPS[interiorName];
    
    if (!interior) {
      console.error(`室内场景 ${interiorName} 不存在`);
      k.go("world");
      return;
    }
    
    // 保存返回信息
    gameState.returnInfo = { area: returnArea, x: returnX, y: returnY };
    
    // 显示UI
    showGameUI(true);
    updateUI();
    
    // 设置背景
    k.setBackground(k.Color.fromHex(interior.bgColor || "#2a1a0a"));
    
    // 配置
    const tileSize = GAME_CONFIG.TILE_SIZE;
    const scale = GAME_CONFIG.SCALE_FACTOR;
    const objScale = GAME_CONFIG.OBJECT_SCALE || 2;
    
    // 清除旧对象
    clearInteriorObjects();
    
    // 创建地图容器
    const mapContainer = k.add([
      k.pos(0, 0),
      k.scale(scale),
      "interior-map",
    ]);
    
    // 渲染地图瓦片
    for (let y = 0; y < interior.height; y++) {
      for (let x = 0; x < interior.width; x++) {
        const tileType = interior.tiles[y][x];
        const tileFrame = TILE_FRAMES[tileType];
        
        mapContainer.add([
          k.sprite("spritesheet", { frame: tileFrame }),
          k.pos(x * tileSize, y * tileSize),
          k.z(0),
        ]);
        
        // 墙壁碰撞
        if (tileType === 1) { // SAND 用作墙壁
          mapContainer.add([
            k.area({ shape: new k.Rect(k.vec2(0), tileSize, tileSize) }),
            k.body({ isStatic: true }),
            k.pos(x * tileSize, y * tileSize),
            "wall",
          ]);
        }
      }
    }
    
    // 计算出生点
    const spawnX = interior.spawnPoint.x * tileSize * scale;
    const spawnY = interior.spawnPoint.y * tileSize * scale;
    
    // 创建玩家
    const player = createPlayer(spawnX, spawnY);
    
    // 加载室内对象
    loadInteriorObjects(interior.objects, player, scale, tileSize, objScale, interiorName);
    
    // 创建边界
    createInteriorBoundaries(interior.width, interior.height, tileSize, scale);
    
    // 设置玩家控制
    setupPlayerControls(player);
    
    // 设置相机
    setCamScale(k);
    
    // 显示场景名称
    showInteriorName(interior.name);
    
    // 相机跟随玩家
    k.onUpdate(() => {
      k.camPos(player.pos.x, player.pos.y);
    });
    
    // F1 调试
    k.onKeyPress("f1", () => {
      k.debug.inspect = !k.debug.inspect;
    });
    
    // ESC 返回
    k.onKeyPress("escape", () => {
      exitInterior();
    });
    
    // 场景清理
    k.onSceneLeave(() => {
      showGameUI(false);
      clearInteriorObjects();
    });
  });
}

// 加载室内对象
function loadInteriorObjects(objects, player, scale, tileSize, objScale, interiorName) {
  objects.forEach(obj => {
    const worldX = obj.x * tileSize * scale;
    const worldY = obj.y * tileSize * scale;
    const objId = `${interiorName}_${obj.type}_${obj.x}_${obj.y}`;
    
    switch (obj.type) {
      case "npc":
      case "king":
        createInteriorNPC(obj, worldX, worldY, objScale, player);
        break;
      case "chest":
        createInteriorChest(obj, worldX, worldY, objScale, player, objId);
        break;
      case "furniture":
        createFurniture(obj, worldX, worldY, objScale);
        break;
      case "rug":
        createRug(obj, worldX, worldY, scale);
        break;
      case "item_display":
        createItemDisplay(obj, worldX, worldY, objScale * 0.7);
        break;
      case "container":
        createContainer(obj, worldX, worldY, objScale * 0.8);
        break;
      case "torch":
      case "flag":
      case "statue":
        createDecorProp(obj, worldX, worldY, objScale * 0.8);
        break;
      case "exit":
        createExit(obj, worldX, worldY, scale, tileSize, player);
        break;
      case "save_point":
        createSavePoint(obj, worldX, worldY, player);
        break;
    }
  });
}

// 创建室内NPC
function createInteriorNPC(obj, x, y, scale, player) {
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
  currentInteriorObjects.push(npc);
  
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

// 创建室内宝箱
function createInteriorChest(obj, x, y, scale, player, objId) {
  if (isChestOpened(objId)) return;
  
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
  currentInteriorObjects.push(chest);
  
  player.onCollide(objId, () => {
    if (player.isInDialogue || isChestOpened(objId)) return;
    
    // 检查是否需要钥匙
    if (obj.locked) {
      const hasKey = gameState.inventory.some(item => item.type === "keyGold");
      if (!hasKey) {
        player.isInDialogue = true;
        displayDialogue({
          speaker: "系统",
          lines: ["这个宝箱被锁住了！", "你需要一把金钥匙来打开它。"]
        }, () => { player.isInDialogue = false; });
        return;
      }
    }
    
    player.isInDialogue = true;
    markChestOpened(objId);
    chest.frame = INTERACTABLES.chest.open;
    addGold(obj.gold || 50);
    addExp(50);
    
    showFloatingText(x, y, `+${obj.gold || 50} 金币`);
    
    displayDialogue({
      speaker: "系统",
      lines: [`你打开了宝箱！获得了 ${obj.gold || 50} 金币！`]
    }, () => { player.isInDialogue = false; });
  });
}

// 创建家具
function createFurniture(obj, x, y, scale) {
  const furniture = k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.area({ shape: new k.Rect(k.vec2(0), 10, 10) }),
    k.body({ isStatic: true }),
    k.anchor("center"),
    k.scale(scale * 0.9),
    k.z(4),
    "furniture",
  ]);
  currentInteriorObjects.push(furniture);
}

// 创建地毯
function createRug(obj, x, y, scale) {
  const rug = k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.anchor("center"),
    k.scale(scale),
    k.z(1),
    "rug",
  ]);
  currentInteriorObjects.push(rug);
}

// 创建商品展示
function createItemDisplay(obj, x, y, scale) {
  const item = k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.anchor("center"),
    k.scale(scale),
    k.z(6),
    "item-display",
  ]);
  currentInteriorObjects.push(item);
  
  // 浮动效果
  let time = Math.random() * Math.PI * 2;
  const originalY = y;
  item.onUpdate(() => {
    time += k.dt() * 2;
    item.pos.y = originalY + Math.sin(time) * 2;
  });
}

// 创建容器
function createContainer(obj, x, y, scale) {
  const container = k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.area({ shape: new k.Rect(k.vec2(0), 10, 10) }),
    k.body({ isStatic: true }),
    k.anchor("center"),
    k.scale(scale),
    k.z(4),
    "container",
  ]);
  currentInteriorObjects.push(container);
}

// 创建装饰道具
function createDecorProp(obj, x, y, scale) {
  const prop = k.add([
    k.sprite("spritesheet", { frame: obj.frame }),
    k.pos(x, y),
    k.anchor("center"),
    k.scale(scale),
    k.z(5),
    "decor-prop",
  ]);
  currentInteriorObjects.push(prop);
}

// 创建出口
function createExit(obj, x, y, scale, tileSize, player) {
  const exit = k.add([
    k.area({ shape: new k.Rect(k.vec2(0), tileSize * scale, tileSize * scale) }),
    k.pos(x, y),
    k.anchor("center"),
    `exit_${obj.targetArea}`,
    "exit",
  ]);
  currentInteriorObjects.push(exit);
  
  player.onCollide(`exit_${obj.targetArea}`, () => {
    if (player.isInDialogue) return;
    
    // 返回外部区域
    gameState.currentArea = obj.targetArea;
    gameState.playerPos = { x: obj.targetX, y: obj.targetY };
    k.go("world");
  });
}

// 创建存档点
function createSavePoint(obj, x, y, player) {
  const savePoint = k.add([
    k.area({ shape: new k.Rect(k.vec2(0), 20, 20) }),
    k.pos(x, y),
    k.anchor("center"),
    obj.name,
    "save_point",
  ]);
  currentInteriorObjects.push(savePoint);
  
  player.onCollide(obj.name, () => {
    if (player.isInDialogue) return;
    player.isInDialogue = true;
    
    // 休息并存档
    healPlayer(gameState.player.maxHp);
    gameState.player.mp = gameState.player.maxMp;
    saveGame(0);
    
    displayDialogue({
      speaker: "系统",
      lines: [
        "你舒服地躺在床上休息...",
        "HP和MP完全恢复了！",
        "游戏已自动存档。"
      ]
    }, () => { 
      player.isInDialogue = false;
      updateUI();
    });
  });
}

// 清除室内对象
function clearInteriorObjects() {
  currentInteriorObjects.forEach(obj => {
    if (obj && obj.destroy) {
      k.destroy(obj);
    }
  });
  currentInteriorObjects = [];
}

// 创建边界
function createInteriorBoundaries(width, height, tileSize, scale) {
  const mapWidth = width * tileSize * scale;
  const mapHeight = height * tileSize * scale;
  
  const boundaries = [
    k.add([k.area({ shape: new k.Rect(k.vec2(0), mapWidth, 10) }), k.body({ isStatic: true }), k.pos(0, -10), "boundary"]),
    k.add([k.area({ shape: new k.Rect(k.vec2(0), mapWidth, 10) }), k.body({ isStatic: true }), k.pos(0, mapHeight), "boundary"]),
    k.add([k.area({ shape: new k.Rect(k.vec2(0), 10, mapHeight) }), k.body({ isStatic: true }), k.pos(-10, 0), "boundary"]),
    k.add([k.area({ shape: new k.Rect(k.vec2(0), 10, mapHeight) }), k.body({ isStatic: true }), k.pos(mapWidth, 0), "boundary"]),
  ];
  
  currentInteriorObjects.push(...boundaries);
}

// 显示场景名称
function showInteriorName(name) {
  const label = k.add([
    k.text(name, { size: 20 }),
    k.pos(k.width() / 2, 40),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.opacity(1),
    k.fixed(),
    k.z(200),
  ]);
  
  let timer = 2;
  label.onUpdate(() => {
    timer -= k.dt();
    if (timer < 1) label.opacity = timer;
    if (timer <= 0) k.destroy(label);
  });
}

// 显示浮动文字
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

// 退出室内
function exitInterior() {
  if (gameState.returnInfo) {
    gameState.currentArea = gameState.returnInfo.area;
    gameState.playerPos = { x: gameState.returnInfo.x, y: gameState.returnInfo.y };
    k.go("world");
  }
}

// 进入室内场景的入口函数
export function enterInterior(interiorName, returnArea, returnX, returnY) {
  k.go("interior", interiorName, returnArea, returnX, returnY);
}
