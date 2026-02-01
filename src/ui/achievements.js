// 成就系统
import { k } from "../kaboomCtx";
import { gameState } from "../gameState";

// 成就定义
const ACHIEVEMENTS = {
  // 战斗成就
  first_blood: {
    id: "first_blood",
    name: "初战告捷",
    desc: "击败第一个敌人",
    icon: "⚔️",
    condition: (stats) => stats.monstersKilled >= 1,
  },
  slayer_10: {
    id: "slayer_10",
    name: "怪物杀手",
    desc: "击败10个敌人",
    icon: "🗡️",
    condition: (stats) => stats.monstersKilled >= 10,
  },
  slayer_50: {
    id: "slayer_50",
    name: "战斗大师",
    desc: "击败50个敌人",
    icon: "🏆",
    condition: (stats) => stats.monstersKilled >= 50,
  },
  
  // 收集成就
  collector_10: {
    id: "collector_10",
    name: "收藏家",
    desc: "收集10个物品",
    icon: "📦",
    condition: (stats) => stats.itemsCollected >= 10,
  },
  collector_50: {
    id: "collector_50",
    name: "囤积者",
    desc: "收集50个物品",
    icon: "🎁",
    condition: (stats) => stats.itemsCollected >= 50,
  },
  
  // 财富成就
  rich_100: {
    id: "rich_100",
    name: "小有积蓄",
    desc: "累计获得100金币",
    icon: "💰",
    condition: (stats) => stats.goldEarned >= 100,
  },
  rich_1000: {
    id: "rich_1000",
    name: "财源滚滚",
    desc: "累计获得1000金币",
    icon: "💎",
    condition: (stats) => stats.goldEarned >= 1000,
  },
  rich_10000: {
    id: "rich_10000",
    name: "富甲一方",
    desc: "累计获得10000金币",
    icon: "👑",
    condition: (stats) => stats.goldEarned >= 10000,
  },
  
  // 等级成就
  level_5: {
    id: "level_5",
    name: "初出茅庐",
    desc: "达到等级5",
    icon: "⭐",
    condition: () => gameState.player.level >= 5,
  },
  level_10: {
    id: "level_10",
    name: "身经百战",
    desc: "达到等级10",
    icon: "🌟",
    condition: () => gameState.player.level >= 10,
  },
  level_20: {
    id: "level_20",
    name: "传奇勇者",
    desc: "达到等级20",
    icon: "✨",
    condition: () => gameState.player.level >= 20,
  },
  
  // 探索成就
  explorer: {
    id: "explorer",
    name: "探索者",
    desc: "访问所有区域",
    icon: "🗺️",
    condition: () => {
      const visited = gameState.visitedAreas || new Set();
      return visited.has("village") && visited.has("forest") && 
             visited.has("lake") && visited.has("mine") && visited.has("castle");
    },
  },
  
  // 特殊成就
  egg_hunter: {
    id: "egg_hunter",
    name: "彩蛋猎人",
    desc: "收集所有彩蛋",
    icon: "🥚",
    condition: () => {
      const eggs = ["egg_blue", "egg_green", "egg_purple", "egg_yellow", "egg_red", "egg_orange"];
      return eggs.every(egg => gameState.collectedItems?.has?.(egg) || 
                               gameState.inventory?.some(i => i.type === egg));
    },
  },
  
  // 完成成就
  game_complete: {
    id: "game_complete",
    name: "世界的救星",
    desc: "击败魔王，完成游戏",
    icon: "🏅",
    condition: () => gameState.defeatedEnemies?.has?.("demon_lord"),
  },
};

// 成就面板状态
let achievementPanelOpen = false;

// 创建成就UI
export function createAchievementUI() {
  const html = `
    <div id="achievement-panel" style="
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      max-height: 80vh;
      background: linear-gradient(180deg, #2a2a1a 0%, #1a1a0a 100%);
      border: 3px solid #fbbf24;
      border-radius: 12px;
      padding: 20px;
      z-index: 1000;
      color: white;
      font-family: 'Microsoft YaHei', sans-serif;
      box-shadow: 0 0 30px rgba(251, 191, 36, 0.5);
    ">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h2 style="margin: 0; color: #fcd34d;">🏆 成就</h2>
        <span id="achievement-count" style="color: #fbbf24;">0 / ${Object.keys(ACHIEVEMENTS).length}</span>
      </div>
      
      <div id="achievement-list" style="
        max-height: 400px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
      "></div>
      
      <button id="btn-achievement-close" style="
        margin-top: 15px;
        width: 100%;
        padding: 12px;
        background: #6b7280;
        border: none;
        border-radius: 6px;
        color: white;
        cursor: pointer;
        font-size: 14px;
      ">关闭</button>
    </div>
    
    <!-- 成就通知 -->
    <div id="achievement-notification" style="
      display: none;
      position: fixed;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(90deg, #1a1a0a 0%, #2a2a1a 50%, #1a1a0a 100%);
      border: 2px solid #fbbf24;
      border-radius: 8px;
      padding: 15px 30px;
      z-index: 2000;
      color: white;
      font-family: 'Microsoft YaHei', sans-serif;
      animation: slideDown 0.3s ease-out;
    ">
      <div style="display: flex; align-items: center; gap: 15px;">
        <span id="notif-icon" style="font-size: 32px;">🏆</span>
        <div>
          <div style="color: #fcd34d; font-weight: bold;">成就解锁！</div>
          <div id="notif-name" style="font-size: 14px;"></div>
        </div>
      </div>
    </div>
    
    <style>
      @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-50px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
      }
    </style>
  `;
  
  const container = document.createElement("div");
  container.innerHTML = html;
  document.body.appendChild(container);
  
  // 绑定事件
  document.getElementById("btn-achievement-close").addEventListener("click", hideAchievementPanel);
}

// 显示成就面板
export function showAchievementPanel() {
  achievementPanelOpen = true;
  const panel = document.getElementById("achievement-panel");
  if (panel) {
    panel.style.display = "block";
    refreshAchievementList();
  }
}

// 隐藏成就面板
export function hideAchievementPanel() {
  achievementPanelOpen = false;
  const panel = document.getElementById("achievement-panel");
  if (panel) {
    panel.style.display = "none";
  }
}

// 刷新成就列表
function refreshAchievementList() {
  const list = document.getElementById("achievement-list");
  const countEl = document.getElementById("achievement-count");
  
  if (!list) return;
  
  const unlockedAchievements = gameState.achievements || [];
  const unlockedCount = unlockedAchievements.length;
  
  if (countEl) {
    countEl.textContent = `${unlockedCount} / ${Object.keys(ACHIEVEMENTS).length}`;
  }
  
  list.innerHTML = "";
  
  Object.values(ACHIEVEMENTS).forEach(achievement => {
    const unlocked = unlockedAchievements.includes(achievement.id);
    
    const item = document.createElement("div");
    item.style.cssText = `
      padding: 12px;
      background: ${unlocked ? "#3a3a2a" : "#2a2a1a"};
      border: 2px solid ${unlocked ? "#fbbf24" : "#4a4a3a"};
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 15px;
      opacity: ${unlocked ? 1 : 0.6};
    `;
    
    item.innerHTML = `
      <span style="font-size: 28px; ${unlocked ? "" : "filter: grayscale(100%);"}">${achievement.icon}</span>
      <div>
        <div style="color: ${unlocked ? "#fcd34d" : "#9ca3af"}; font-weight: bold;">
          ${achievement.name}
          ${unlocked ? "✓" : ""}
        </div>
        <div style="color: #d1d5db; font-size: 12px; margin-top: 2px;">
          ${unlocked ? achievement.desc : "???"}
        </div>
      </div>
    `;
    
    list.appendChild(item);
  });
}

// 检查成就
export function checkAchievements() {
  const stats = gameState.stats || {};
  const unlocked = gameState.achievements || [];
  
  Object.values(ACHIEVEMENTS).forEach(achievement => {
    if (!unlocked.includes(achievement.id)) {
      try {
        if (achievement.condition(stats)) {
          unlockAchievement(achievement);
        }
      } catch (e) {
        // 条件检查失败，忽略
      }
    }
  });
}

// 解锁成就
function unlockAchievement(achievement) {
  if (!gameState.achievements) {
    gameState.achievements = [];
  }
  
  if (gameState.achievements.includes(achievement.id)) return;
  
  gameState.achievements.push(achievement.id);
  
  // 显示通知
  showAchievementNotification(achievement);
}

// 显示成就通知
function showAchievementNotification(achievement) {
  const notif = document.getElementById("achievement-notification");
  const icon = document.getElementById("notif-icon");
  const name = document.getElementById("notif-name");
  
  if (!notif || !icon || !name) return;
  
  icon.textContent = achievement.icon;
  name.textContent = achievement.name;
  
  notif.style.display = "block";
  
  // 3秒后隐藏
  setTimeout(() => {
    notif.style.display = "none";
  }, 3000);
}

// 检查是否打开
export function isAchievementPanelOpen() {
  return achievementPanelOpen;
}
