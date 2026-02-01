// 敌人数据定义
import { CHARACTERS } from "../sprites";

// 怪物类型数据
export const ENEMY_DATA = {
  // 森林怪物
  slime: {
    name: "史莱姆",
    hp: 20,
    maxHp: 20,
    atk: 3,
    def: 1,
    exp: 10,
    gold: 5,
    frame: 155, // 使用精灵表中的适当帧
    skills: ["tackle"],
    drops: [
      { item: "hpPotion", chance: 0.2 },
    ],
  },
  
  goblin: {
    name: "哥布林",
    hp: 35,
    maxHp: 35,
    atk: 6,
    def: 2,
    exp: 20,
    gold: 12,
    frame: 156,
    skills: ["slash", "tackle"],
    drops: [
      { item: "keyBronze", chance: 0.1 },
      { item: "coin", chance: 0.3 },
    ],
  },
  
  wolf: {
    name: "野狼",
    hp: 50,
    maxHp: 50,
    atk: 10,
    def: 3,
    exp: 35,
    gold: 20,
    frame: 157,
    skills: ["bite", "howl"],
    drops: [
      { item: "hpPotion", chance: 0.3 },
    ],
  },
  
  // 矿洞怪物
  bat: {
    name: "蝙蝠",
    hp: 25,
    maxHp: 25,
    atk: 5,
    def: 1,
    exp: 15,
    gold: 8,
    frame: 158,
    skills: ["sonic", "tackle"],
    drops: [
      { item: "mpPotion", chance: 0.15 },
    ],
  },
  
  skeleton: {
    name: "骷髅兵",
    hp: 60,
    maxHp: 60,
    atk: 12,
    def: 5,
    exp: 45,
    gold: 30,
    frame: 159,
    skills: ["slash", "boneshield"],
    drops: [
      { item: "ore_iron", chance: 0.2 },
      { item: "keySilver", chance: 0.05 },
    ],
  },
  
  golem: {
    name: "岩石傀儡",
    hp: 100,
    maxHp: 100,
    atk: 15,
    def: 10,
    exp: 80,
    gold: 50,
    frame: 160,
    skills: ["smash", "harden"],
    drops: [
      { item: "ore_gold", chance: 0.15 },
      { item: "gemRed", chance: 0.05 },
    ],
  },
  
  // BOSS
  demon_lord: {
    name: "魔王",
    hp: 500,
    maxHp: 500,
    atk: 30,
    def: 15,
    exp: 500,
    gold: 1000,
    frame: 269, // 使用国王帧作为BOSS
    skills: ["dark_slash", "hellfire", "shadow_clone"],
    drops: [
      { item: "swordGold", chance: 0.5 },
      { item: "keyGold", chance: 1.0 },
    ],
    isBoss: true,
  },
};

// 技能数据
export const SKILL_DATA = {
  // 物理技能
  tackle: {
    name: "撞击",
    type: "physical",
    power: 1.0,
    accuracy: 95,
    description: "普通的物理攻击",
  },
  slash: {
    name: "斩击",
    type: "physical",
    power: 1.2,
    accuracy: 90,
    description: "锋利的斩击",
  },
  bite: {
    name: "撕咬",
    type: "physical",
    power: 1.3,
    accuracy: 85,
    description: "野性的撕咬攻击",
  },
  smash: {
    name: "重击",
    type: "physical",
    power: 1.5,
    accuracy: 80,
    description: "强力的重击",
  },
  dark_slash: {
    name: "暗黑斩",
    type: "dark",
    power: 2.0,
    accuracy: 90,
    description: "充满黑暗力量的斩击",
  },
  
  // 特殊技能
  sonic: {
    name: "超声波",
    type: "magic",
    power: 0.8,
    accuracy: 100,
    effect: "confuse",
    description: "干扰目标的超声波",
  },
  howl: {
    name: "嚎叫",
    type: "buff",
    effect: "atk_up",
    description: "提升自身攻击力",
  },
  harden: {
    name: "硬化",
    type: "buff",
    effect: "def_up",
    description: "提升自身防御力",
  },
  boneshield: {
    name: "骨盾",
    type: "buff",
    effect: "def_up",
    description: "用骨头形成护盾",
  },
  hellfire: {
    name: "地狱火",
    type: "fire",
    power: 1.8,
    accuracy: 85,
    description: "召唤地狱之火",
  },
  shadow_clone: {
    name: "影分身",
    type: "buff",
    effect: "evasion_up",
    description: "创造分身，提高闪避",
  },
  
  // 玩家技能
  attack: {
    name: "普通攻击",
    type: "physical",
    power: 1.0,
    accuracy: 95,
    mpCost: 0,
    description: "普通的攻击",
  },
  power_strike: {
    name: "强力一击",
    type: "physical",
    power: 1.5,
    accuracy: 85,
    mpCost: 5,
    description: "消耗MP发动强力攻击",
  },
  heal: {
    name: "治愈",
    type: "heal",
    power: 30,
    mpCost: 10,
    description: "恢复30点HP",
  },
  fireball: {
    name: "火球术",
    type: "fire",
    power: 1.3,
    accuracy: 90,
    mpCost: 8,
    description: "发射火球攻击敌人",
  },
};

// 根据等级缩放怪物属性
export function getScaledEnemy(enemyType, level = 1) {
  const base = ENEMY_DATA[enemyType];
  if (!base) return null;
  
  const scale = 1 + (level - 1) * 0.2;
  
  return {
    ...base,
    level,
    hp: Math.floor(base.hp * scale),
    maxHp: Math.floor(base.maxHp * scale),
    atk: Math.floor(base.atk * scale),
    def: Math.floor(base.def * scale),
    exp: Math.floor(base.exp * scale),
    gold: Math.floor(base.gold * scale),
  };
}

// 随机遭遇怪物
export function getRandomEncounter(areaType, playerLevel) {
  const areaEnemies = {
    forest: ["slime", "goblin", "wolf"],
    mine: ["bat", "skeleton", "golem"],
    castle: ["skeleton", "golem"],
  };
  
  const enemies = areaEnemies[areaType] || ["slime"];
  const enemyType = enemies[Math.floor(Math.random() * enemies.length)];
  
  // 等级在玩家等级附近浮动
  const level = Math.max(1, playerLevel + Math.floor(Math.random() * 3) - 1);
  
  return getScaledEnemy(enemyType, level);
}
