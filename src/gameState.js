// 游戏状态管理器 - 管理全局游戏状态
import { INITIAL_PLAYER_STATE } from "./constants";

// 游戏状态
export const gameState = {
  // 当前区域
  currentArea: "village",
  
  // 玩家状态
  player: { ...INITIAL_PLAYER_STATE },
  
  // 玩家位置
  playerPos: { x: 0, y: 0 },
  
  // 背包
  inventory: [],
  maxInventorySize: 20,
  
  // 装备
  equipment: {
    weapon: null,
    shield: null,
    accessory: null,
  },
  
  // 已收集的物品 (防止重复拾取)
  collectedItems: new Set(),
  
  // 已打开的宝箱
  openedChests: new Set(),
  
  // 已击败的敌人
  defeatedEnemies: new Set(),
  
  // 任务进度
  quests: {
    main: { current: 0, completed: [] },
    side: [],
  },
  
  // 成就
  achievements: [],
  
  // 统计数据
  stats: {
    monstersKilled: 0,
    itemsCollected: 0,
    goldEarned: 0,
    distanceTraveled: 0,
    timePlayed: 0,
  },
  
  // 游戏设置
  settings: {
    musicVolume: 0.5,
    sfxVolume: 0.7,
    showDamageNumbers: true,
  },
};

// ===== 玩家相关操作 =====

export function healPlayer(amount) {
  gameState.player.hp = Math.min(
    gameState.player.hp + amount,
    gameState.player.maxHp
  );
  return gameState.player.hp;
}

export function restoreMana(amount) {
  gameState.player.mp = Math.min(
    gameState.player.mp + amount,
    gameState.player.maxMp
  );
  return gameState.player.mp;
}

export function addGold(amount) {
  gameState.player.gold += amount;
  gameState.stats.goldEarned += amount;
  return gameState.player.gold;
}

export function spendGold(amount) {
  if (gameState.player.gold >= amount) {
    gameState.player.gold -= amount;
    return true;
  }
  return false;
}

export function addExp(amount) {
  gameState.player.exp += amount;
  
  // 检查升级
  while (gameState.player.exp >= gameState.player.expToLevel) {
    levelUp();
  }
  
  return gameState.player;
}

function levelUp() {
  gameState.player.exp -= gameState.player.expToLevel;
  gameState.player.level++;
  
  // 属性提升
  gameState.player.maxHp += 10;
  gameState.player.maxMp += 5;
  gameState.player.hp = gameState.player.maxHp;
  gameState.player.mp = gameState.player.maxMp;
  
  // 经验需求增加
  gameState.player.expToLevel = Math.floor(gameState.player.expToLevel * 1.5);
  
  return gameState.player.level;
}

// ===== 背包操作 =====

export function addToInventory(item) {
  if (gameState.inventory.length < gameState.maxInventorySize) {
    gameState.inventory.push(item);
    gameState.stats.itemsCollected++;
    return true;
  }
  return false; // 背包已满
}

export function removeFromInventory(itemIndex) {
  if (itemIndex >= 0 && itemIndex < gameState.inventory.length) {
    return gameState.inventory.splice(itemIndex, 1)[0];
  }
  return null;
}

export function getInventoryItem(itemType) {
  return gameState.inventory.find(item => item.type === itemType);
}

export function hasItem(itemType) {
  return gameState.inventory.some(item => item.type === itemType);
}

export function countItem(itemType) {
  return gameState.inventory.filter(item => item.type === itemType).length;
}

// ===== 装备操作 =====

export function equipItem(item, slot) {
  const oldItem = gameState.equipment[slot];
  gameState.equipment[slot] = item;
  
  // 如果有旧装备，放回背包
  if (oldItem) {
    addToInventory(oldItem);
  }
  
  return oldItem;
}

export function unequipItem(slot) {
  const item = gameState.equipment[slot];
  if (item && addToInventory(item)) {
    gameState.equipment[slot] = null;
    return item;
  }
  return null;
}

// ===== 区域切换 =====

export function setCurrentArea(areaName, playerX, playerY) {
  gameState.currentArea = areaName;
  gameState.playerPos = { x: playerX, y: playerY };
}

export function getCurrentArea() {
  return gameState.currentArea;
}

// ===== 物品和宝箱追踪 =====

export function markItemCollected(itemId) {
  gameState.collectedItems.add(itemId);
}

export function isItemCollected(itemId) {
  return gameState.collectedItems.has(itemId);
}

export function markChestOpened(chestId) {
  gameState.openedChests.add(chestId);
}

export function isChestOpened(chestId) {
  return gameState.openedChests.has(chestId);
}

// ===== 存档和读取 =====

export function saveGame(slot = 0) {
  const saveData = {
    ...gameState,
    collectedItems: Array.from(gameState.collectedItems),
    openedChests: Array.from(gameState.openedChests),
    defeatedEnemies: Array.from(gameState.defeatedEnemies),
    savedAt: Date.now(),
  };
  
  localStorage.setItem(`pixelRPG_save_${slot}`, JSON.stringify(saveData));
  return true;
}

export function loadGame(slot = 0) {
  const saveData = localStorage.getItem(`pixelRPG_save_${slot}`);
  
  if (saveData) {
    const data = JSON.parse(saveData);
    
    Object.assign(gameState, data);
    gameState.collectedItems = new Set(data.collectedItems);
    gameState.openedChests = new Set(data.openedChests);
    gameState.defeatedEnemies = new Set(data.defeatedEnemies);
    
    return true;
  }
  
  return false;
}

export function hasSaveData(slot = 0) {
  return localStorage.getItem(`pixelRPG_save_${slot}`) !== null;
}

export function deleteSave(slot = 0) {
  localStorage.removeItem(`pixelRPG_save_${slot}`);
}

// ===== 重置游戏 =====

export function resetGame() {
  gameState.currentArea = "village";
  gameState.player = { ...INITIAL_PLAYER_STATE };
  gameState.playerPos = { x: 0, y: 0 };
  gameState.inventory = [];
  gameState.equipment = { weapon: null, shield: null, accessory: null };
  gameState.collectedItems = new Set();
  gameState.openedChests = new Set();
  gameState.defeatedEnemies = new Set();
  gameState.quests = { main: { current: 0, completed: [] }, side: [] };
  gameState.achievements = [];
  gameState.stats = {
    monstersKilled: 0,
    itemsCollected: 0,
    goldEarned: 0,
    distanceTraveled: 0,
    timePlayed: 0,
  };
}
