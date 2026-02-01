// 战斗系统核心
import { k } from "../kaboomCtx";
import { gameState, addGold, addExp, addToInventory } from "../gameState";
import { SKILL_DATA, ENEMY_DATA } from "./enemies";
import { updateUI } from "../utils";

// 战斗状态
let battleState = {
  inBattle: false,
  turn: "player", // player or enemy
  enemy: null,
  battleLog: [],
  playerBuffs: {},
  enemyBuffs: {},
  turnCount: 0,
};

// 计算伤害
function calculateDamage(attacker, defender, skill) {
  const skillData = SKILL_DATA[skill];
  if (!skillData) return 0;
  
  // 命中检测
  if (Math.random() * 100 > skillData.accuracy) {
    return -1; // 表示未命中
  }
  
  // 基础伤害 = (攻击力 * 技能倍率 - 防御力 * 0.5) * 随机浮动
  const baseDamage = attacker.atk * (skillData.power || 1);
  const defense = defender.def * 0.5;
  const randomFactor = 0.9 + Math.random() * 0.2;
  
  let damage = Math.floor((baseDamage - defense) * randomFactor);
  
  // 最小伤害为1
  return Math.max(1, damage);
}

// 执行玩家技能
export function playerAction(skillName) {
  if (!battleState.inBattle || battleState.turn !== "player") return null;
  
  const skill = SKILL_DATA[skillName];
  if (!skill) return null;
  
  // 检查MP
  if (skill.mpCost && gameState.player.mp < skill.mpCost) {
    return { success: false, message: "MP不足！" };
  }
  
  // 消耗MP
  if (skill.mpCost) {
    gameState.player.mp -= skill.mpCost;
  }
  
  let result = { success: true, messages: [] };
  
  // 处理不同类型的技能
  if (skill.type === "heal") {
    // 治疗技能
    const healAmount = skill.power;
    gameState.player.hp = Math.min(gameState.player.hp + healAmount, gameState.player.maxHp);
    result.messages.push(`使用了${skill.name}，恢复了${healAmount}点HP！`);
  } else if (skill.type === "buff") {
    // 增益技能
    battleState.playerBuffs[skill.effect] = 3; // 持续3回合
    result.messages.push(`使用了${skill.name}！`);
  } else {
    // 攻击技能
    const damage = calculateDamage(
      { atk: gameState.player.atk || 10 },
      battleState.enemy,
      skillName
    );
    
    if (damage === -1) {
      result.messages.push(`${skill.name}未命中！`);
    } else {
      battleState.enemy.hp -= damage;
      result.messages.push(`使用${skill.name}造成了${damage}点伤害！`);
      
      // 检查敌人是否死亡
      if (battleState.enemy.hp <= 0) {
        result.victory = true;
        result.messages.push(`击败了${battleState.enemy.name}！`);
        result.rewards = calculateRewards();
      }
    }
  }
  
  // 更新回合
  if (!result.victory) {
    battleState.turn = "enemy";
  }
  
  battleState.battleLog.push(...result.messages);
  updateUI();
  
  return result;
}

// 执行敌人行动
export function enemyAction() {
  if (!battleState.inBattle || battleState.turn !== "enemy") return null;
  
  const enemy = battleState.enemy;
  
  // 随机选择技能
  const skillName = enemy.skills[Math.floor(Math.random() * enemy.skills.length)];
  const skill = SKILL_DATA[skillName];
  
  let result = { messages: [] };
  
  if (skill.type === "buff") {
    // 增益技能
    battleState.enemyBuffs[skill.effect] = 3;
    result.messages.push(`${enemy.name}使用了${skill.name}！`);
  } else {
    // 攻击技能
    const playerDef = (gameState.equipment.shield?.def || 0) + 5;
    const damage = calculateDamage(
      enemy,
      { def: playerDef },
      skillName
    );
    
    if (damage === -1) {
      result.messages.push(`${enemy.name}的${skill.name}未命中！`);
    } else {
      gameState.player.hp -= damage;
      result.messages.push(`${enemy.name}使用${skill.name}造成了${damage}点伤害！`);
      
      // 检查玩家是否死亡
      if (gameState.player.hp <= 0) {
        gameState.player.hp = 0;
        result.defeat = true;
        result.messages.push("你被击败了...");
      }
    }
  }
  
  // 更新回合
  battleState.turn = "player";
  battleState.turnCount++;
  
  // 处理增益持续时间
  processBuffs();
  
  battleState.battleLog.push(...result.messages);
  updateUI();
  
  return result;
}

// 处理增益持续时间
function processBuffs() {
  for (const buff in battleState.playerBuffs) {
    battleState.playerBuffs[buff]--;
    if (battleState.playerBuffs[buff] <= 0) {
      delete battleState.playerBuffs[buff];
    }
  }
  
  for (const buff in battleState.enemyBuffs) {
    battleState.enemyBuffs[buff]--;
    if (battleState.enemyBuffs[buff] <= 0) {
      delete battleState.enemyBuffs[buff];
    }
  }
}

// 计算战斗奖励
function calculateRewards() {
  const enemy = battleState.enemy;
  
  // 基础奖励
  const rewards = {
    exp: enemy.exp,
    gold: enemy.gold,
    items: [],
  };
  
  // 掉落物品
  if (enemy.drops) {
    enemy.drops.forEach(drop => {
      if (Math.random() < drop.chance) {
        rewards.items.push(drop.item);
        addToInventory({ type: drop.item, name: drop.item });
      }
    });
  }
  
  // 应用奖励
  addExp(rewards.exp);
  addGold(rewards.gold);
  
  return rewards;
}

// 开始战斗
export function startBattle(enemy) {
  battleState = {
    inBattle: true,
    turn: "player",
    enemy: { ...enemy },
    battleLog: [`遭遇了 ${enemy.name}！`],
    playerBuffs: {},
    enemyBuffs: {},
    turnCount: 0,
  };
  
  return battleState;
}

// 结束战斗
export function endBattle() {
  const result = {
    victory: battleState.enemy.hp <= 0,
    defeat: gameState.player.hp <= 0,
    log: battleState.battleLog,
  };
  
  battleState = {
    inBattle: false,
    turn: "player",
    enemy: null,
    battleLog: [],
    playerBuffs: {},
    enemyBuffs: {},
    turnCount: 0,
  };
  
  return result;
}

// 尝试逃跑
export function tryEscape() {
  if (!battleState.inBattle) return { success: false };
  
  // 逃跑成功率基于速度差异
  const escapeChance = 50 + (battleState.turnCount * 10);
  const success = Math.random() * 100 < escapeChance;
  
  if (success) {
    battleState.battleLog.push("成功逃跑了！");
    return { success: true, message: "成功逃跑了！" };
  } else {
    battleState.battleLog.push("逃跑失败！");
    battleState.turn = "enemy";
    return { success: false, message: "逃跑失败！" };
  }
}

// 获取当前战斗状态
export function getBattleState() {
  return { ...battleState };
}

// 获取玩家可用技能
export function getPlayerSkills() {
  return [
    { id: "attack", ...SKILL_DATA.attack },
    { id: "power_strike", ...SKILL_DATA.power_strike },
    { id: "heal", ...SKILL_DATA.heal },
    { id: "fireball", ...SKILL_DATA.fireball },
  ];
}
