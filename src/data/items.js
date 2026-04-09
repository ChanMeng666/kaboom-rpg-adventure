// Shop item definitions
export const ITEMS = {
  healthPotion: {
    name: "生命药水",
    description: "恢复 30 HP",
    effect: { hp: 30 },
    price: 20,
  },
  manaPotion: {
    name: "魔法药水",
    description: "恢复 20 MP",
    effect: { mp: 20 },
    price: 25,
  },
  superPotion: {
    name: "高级药水",
    description: "恢复 100 HP",
    effect: { hp: 100 },
    price: 80,
  },
  sword: {
    name: "铁剑",
    description: "攻击力 +10",
    effect: { attack: 10 },
    price: 100,
  },
  goldSword: {
    name: "金剑",
    description: "攻击力 +25",
    effect: { attack: 25 },
    price: 300,
  },
  shield: {
    name: "盾牌",
    description: "防御力 +5",
    effect: { defense: 5 },
    price: 80,
  },
  key: {
    name: "钥匙",
    description: "可以打开锁着的宝箱",
    effect: {},
    price: 50,
  },
  gem: {
    name: "魔法宝石",
    description: "蕴含神秘力量的宝石",
    effect: { exp: 50 },
    price: 200,
  },
};
