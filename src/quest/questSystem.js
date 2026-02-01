// 任务系统
import { gameState, addGold, addExp, addToInventory } from "../gameState";

// 任务数据
export const QUEST_DATA = {
  // 主线任务
  main_01: {
    id: "main_01",
    type: "main",
    name: "新手冒险者",
    description: "和村长对话，了解村庄的情况。",
    objectives: [
      { type: "talk", target: "elder", count: 1, current: 0 }
    ],
    rewards: { exp: 50, gold: 20 },
    nextQuest: "main_02",
  },
  
  main_02: {
    id: "main_02",
    type: "main",
    name: "森林的威胁",
    description: "前往森林，消灭5只史莱姆。",
    objectives: [
      { type: "kill", target: "slime", count: 5, current: 0 }
    ],
    rewards: { exp: 100, gold: 50 },
    nextQuest: "main_03",
  },
  
  main_03: {
    id: "main_03",
    type: "main",
    name: "铁匠的请求",
    description: "收集3块铁矿石交给铁匠。",
    objectives: [
      { type: "collect", target: "ore_iron", count: 3, current: 0 },
      { type: "deliver", target: "blacksmith", item: "ore_iron", count: 3, current: 0 }
    ],
    rewards: { exp: 150, gold: 100, item: "sword" },
    nextQuest: "main_04",
  },
  
  main_04: {
    id: "main_04",
    type: "main",
    name: "深入矿洞",
    description: "前往矿山，击败骷髅兵。",
    objectives: [
      { type: "kill", target: "skeleton", count: 3, current: 0 }
    ],
    rewards: { exp: 200, gold: 150 },
    nextQuest: "main_05",
  },
  
  main_05: {
    id: "main_05",
    type: "main",
    name: "王国的召唤",
    description: "前往城堡，觐见国王。",
    objectives: [
      { type: "talk", target: "king", count: 1, current: 0 }
    ],
    rewards: { exp: 300, gold: 200 },
    nextQuest: "main_final",
  },
  
  main_final: {
    id: "main_final",
    type: "main",
    name: "击败魔王",
    description: "击败魔王，拯救王国！",
    objectives: [
      { type: "kill", target: "demon_lord", count: 1, current: 0 }
    ],
    rewards: { exp: 1000, gold: 1000, item: "keyGold" },
    ending: true,
  },
  
  // 支线任务
  side_mushroom: {
    id: "side_mushroom",
    type: "side",
    name: "蘑菇采集",
    description: "收集5个蘑菇。",
    giver: "villager1",
    objectives: [
      { type: "collect", target: "mushroom", count: 5, current: 0 }
    ],
    rewards: { exp: 30, gold: 25 },
  },
  
  side_fishing: {
    id: "side_fishing",
    type: "side",
    name: "钓鱼高手",
    description: "在湖边钓到3条鱼。",
    giver: "fisher",
    objectives: [
      { type: "fish", count: 3, current: 0 }
    ],
    rewards: { exp: 50, gold: 40 },
  },
  
  side_gems: {
    id: "side_gems",
    type: "side",
    name: "宝石收藏家",
    description: "收集4种不同颜色的宝石。",
    giver: "merchant",
    objectives: [
      { type: "collect", target: "gemRed", count: 1, current: 0 },
      { type: "collect", target: "gemBlue", count: 1, current: 0 },
      { type: "collect", target: "gemGreen", count: 1, current: 0 },
      { type: "collect", target: "gemYellow", count: 1, current: 0 },
    ],
    rewards: { exp: 200, gold: 300 },
  },
  
  side_eggs: {
    id: "side_eggs",
    type: "side",
    name: "彩蛋猎人",
    description: "找到所有6种彩蛋。",
    giver: "child",
    objectives: [
      { type: "collect", target: "egg_blue", count: 1, current: 0 },
      { type: "collect", target: "egg_green", count: 1, current: 0 },
      { type: "collect", target: "egg_purple", count: 1, current: 0 },
      { type: "collect", target: "egg_yellow", count: 1, current: 0 },
      { type: "collect", target: "egg_red", count: 1, current: 0 },
      { type: "collect", target: "egg_orange", count: 1, current: 0 },
    ],
    rewards: { exp: 500, gold: 500, item: "keyGold" },
  },
};

// 任务状态管理
const questState = {
  active: [], // 当前进行中的任务
  completed: [], // 已完成的任务
  currentMainQuest: "main_01", // 当前主线任务
};

// 获取任务信息
export function getQuest(questId) {
  return QUEST_DATA[questId] || null;
}

// 获取当前主线任务
export function getCurrentMainQuest() {
  return QUEST_DATA[questState.currentMainQuest];
}

// 获取所有活跃任务
export function getActiveQuests() {
  return questState.active.map(id => ({
    ...QUEST_DATA[id],
    progress: getQuestProgress(id)
  }));
}

// 获取任务进度
export function getQuestProgress(questId) {
  const quest = QUEST_DATA[questId];
  if (!quest) return null;
  
  const progress = gameState.quests.progress?.[questId] || {};
  
  return quest.objectives.map((obj, index) => ({
    ...obj,
    current: progress[index] || 0,
    completed: (progress[index] || 0) >= obj.count
  }));
}

// 接受任务
export function acceptQuest(questId) {
  if (questState.active.includes(questId)) return false;
  if (questState.completed.includes(questId)) return false;
  
  questState.active.push(questId);
  
  // 初始化进度
  if (!gameState.quests.progress) {
    gameState.quests.progress = {};
  }
  gameState.quests.progress[questId] = {};
  
  return true;
}

// 更新任务进度
export function updateQuestProgress(type, target, amount = 1) {
  let updated = false;
  
  questState.active.forEach(questId => {
    const quest = QUEST_DATA[questId];
    if (!quest) return;
    
    quest.objectives.forEach((obj, index) => {
      if (obj.type === type) {
        // 对于特定目标类型，检查目标是否匹配
        if (obj.target && !target.includes(obj.target)) return;
        
        // 更新进度
        if (!gameState.quests.progress[questId]) {
          gameState.quests.progress[questId] = {};
        }
        
        const current = gameState.quests.progress[questId][index] || 0;
        if (current < obj.count) {
          gameState.quests.progress[questId][index] = Math.min(current + amount, obj.count);
          updated = true;
        }
      }
    });
    
    // 检查任务是否完成
    if (isQuestComplete(questId)) {
      // 自动完成
    }
  });
  
  return updated;
}

// 检查任务是否完成
export function isQuestComplete(questId) {
  const quest = QUEST_DATA[questId];
  if (!quest) return false;
  
  const progress = gameState.quests.progress?.[questId] || {};
  
  return quest.objectives.every((obj, index) => {
    const current = progress[index] || 0;
    return current >= obj.count;
  });
}

// 完成任务
export function completeQuest(questId) {
  const quest = QUEST_DATA[questId];
  if (!quest || !isQuestComplete(questId)) return null;
  
  // 移动到已完成
  const index = questState.active.indexOf(questId);
  if (index > -1) {
    questState.active.splice(index, 1);
  }
  questState.completed.push(questId);
  
  // 发放奖励
  const rewards = quest.rewards;
  if (rewards.exp) addExp(rewards.exp);
  if (rewards.gold) addGold(rewards.gold);
  if (rewards.item) {
    addToInventory({ type: rewards.item, name: rewards.item });
  }
  
  // 如果是主线任务，推进到下一个
  if (quest.type === "main" && quest.nextQuest) {
    questState.currentMainQuest = quest.nextQuest;
    acceptQuest(quest.nextQuest);
  }
  
  return rewards;
}

// 初始化任务系统
export function initQuestSystem() {
  // 自动接受第一个主线任务
  if (!questState.completed.includes("main_01")) {
    acceptQuest("main_01");
  }
}

// 检查是否有任务可以交付
export function canTurnInQuest(npcName) {
  return questState.active.some(questId => {
    const quest = QUEST_DATA[questId];
    if (!quest) return false;
    
    // 检查是否需要与此NPC交付
    const hasDeliverObjective = quest.objectives.some(obj => 
      obj.type === "deliver" && obj.target === npcName
    );
    
    return hasDeliverObjective && isQuestComplete(questId);
  });
}

// 获取NPC可以给予的任务
export function getAvailableQuestFromNPC(npcName) {
  for (const questId in QUEST_DATA) {
    const quest = QUEST_DATA[questId];
    if (quest.giver === npcName && 
        !questState.active.includes(questId) && 
        !questState.completed.includes(questId)) {
      return quest;
    }
  }
  return null;
}
