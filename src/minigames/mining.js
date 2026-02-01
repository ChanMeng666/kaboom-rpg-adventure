// 挖矿小游戏
import { k } from "../kaboomCtx";
import { gameState, addToInventory, addGold, addExp } from "../gameState";
import { updateQuestProgress } from "../quest/questSystem";
import { ROCKS } from "../sprites";

// 矿石类型
const ORE_TYPES = [
  { type: "ore_copper", name: "铜矿", hp: 3, exp: 5, gold: 10, color: "#cd7f32", chance: 0.4 },
  { type: "ore_iron", name: "铁矿", hp: 5, exp: 10, gold: 20, color: "#808080", chance: 0.3 },
  { type: "ore_gold", name: "金矿", hp: 8, exp: 25, gold: 50, color: "#ffd700", chance: 0.2 },
  { type: "ore_gem", name: "宝石矿", hp: 10, exp: 50, gold: 100, color: "#ff69b4", chance: 0.1 },
];

// 挖矿状态
let miningState = {
  active: false,
  ores: [],
  totalMined: 0,
  combo: 0,
  score: 0,
};

// 创建挖矿场景
export function createMiningScene() {
  k.scene("mining", () => {
    // 设置背景
    k.setBackground(k.Color.fromHex("#1a1a2e"));
    
    const width = k.width();
    const height = k.height();
    
    // 标题
    k.add([
      k.text("⛏️ 挖矿", { size: 32 }),
      k.pos(width / 2, 40),
      k.anchor("center"),
      k.color(255, 255, 255),
      k.z(10),
    ]);
    
    // 说明
    k.add([
      k.text("点击矿石进行挖掘！", { size: 16 }),
      k.pos(width / 2, 75),
      k.anchor("center"),
      k.color(180, 180, 180),
      k.z(10),
    ]);
    
    // 分数显示
    const scoreText = k.add([
      k.text(`挖掘: ${miningState.totalMined} | 连击: ${miningState.combo}`, { size: 14 }),
      k.pos(20, 20),
      k.color(255, 255, 255),
      k.z(10),
    ]);
    
    // 退出按钮
    const exitBtn = k.add([
      k.rect(100, 40),
      k.pos(width - 120, 20),
      k.color(100, 50, 50),
      k.outline(2, k.Color.fromHex("#ef4444")),
      k.area(),
      k.z(10),
    ]);
    
    k.add([
      k.text("退出", { size: 16 }),
      k.pos(width - 70, 40),
      k.anchor("center"),
      k.color(255, 255, 255),
      k.z(11),
    ]);
    
    exitBtn.onClick(() => {
      resetMining();
      k.go("world");
    });
    
    // 挖矿区域
    const gridX = 50;
    const gridY = 100;
    const gridCols = 6;
    const gridRows = 4;
    const cellSize = 80;
    
    // 生成矿石
    function generateOres() {
      // 清除旧矿石
      miningState.ores.forEach(ore => {
        if (ore.sprite) k.destroy(ore.sprite);
        if (ore.hpBar) k.destroy(ore.hpBar);
        if (ore.hpBarBg) k.destroy(ore.hpBarBg);
      });
      miningState.ores = [];
      
      // 生成新矿石
      for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
          // 50%概率生成矿石
          if (Math.random() < 0.5) {
            const oreType = getRandomOreType();
            const x = gridX + col * cellSize + cellSize / 2;
            const y = gridY + row * cellSize + cellSize / 2;
            
            const ore = {
              ...oreType,
              currentHp: oreType.hp,
              row,
              col,
            };
            
            // 矿石精灵 (使用矩形代替，因为我们没有特定的矿石帧)
            ore.sprite = k.add([
              k.rect(60, 60),
              k.pos(x, y),
              k.anchor("center"),
              k.color(k.Color.fromHex(oreType.color)),
              k.area(),
              k.z(5),
              `ore_${row}_${col}`,
            ]);
            
            // HP条背景
            ore.hpBarBg = k.add([
              k.rect(50, 6),
              k.pos(x - 25, y + 35),
              k.color(50, 50, 50),
              k.z(6),
            ]);
            
            // HP条
            ore.hpBar = k.add([
              k.rect(50, 6),
              k.pos(x - 25, y + 35),
              k.color(100, 200, 100),
              k.z(7),
            ]);
            
            // 矿石名称
            ore.label = k.add([
              k.text(oreType.name, { size: 10 }),
              k.pos(x, y - 35),
              k.anchor("center"),
              k.color(255, 255, 255),
              k.z(8),
            ]);
            
            // 点击事件
            ore.sprite.onClick(() => {
              mineOre(ore, x, y);
            });
            
            miningState.ores.push(ore);
          }
        }
      }
      
      // 如果没有矿石，至少生成一个
      if (miningState.ores.length === 0) {
        generateOres();
      }
    }
    
    // 挖掘矿石
    function mineOre(ore, x, y) {
      ore.currentHp--;
      
      // 更新HP条
      const hpRatio = ore.currentHp / ore.hp;
      ore.hpBar.width = 50 * hpRatio;
      
      // 颜色变化
      if (hpRatio <= 0.3) {
        ore.hpBar.color = k.Color.fromHex("#ef4444");
      } else if (hpRatio <= 0.6) {
        ore.hpBar.color = k.Color.fromHex("#eab308");
      }
      
      // 震动效果
      const originalX = ore.sprite.pos.x;
      ore.sprite.pos.x += (Math.random() - 0.5) * 10;
      k.wait(0.05).then(() => {
        ore.sprite.pos.x = originalX;
      });
      
      // 粒子效果
      for (let i = 0; i < 3; i++) {
        const particle = k.add([
          k.rect(5, 5),
          k.pos(x + (Math.random() - 0.5) * 40, y + (Math.random() - 0.5) * 40),
          k.color(k.Color.fromHex(ore.color)),
          k.opacity(1),
          k.z(10),
          { vx: (Math.random() - 0.5) * 100, vy: -50 - Math.random() * 50 },
        ]);
        particle.onUpdate(() => {
          particle.pos.x += particle.vx * k.dt();
          particle.pos.y += particle.vy * k.dt();
          particle.vy += 200 * k.dt();
          particle.opacity -= k.dt() * 2;
          if (particle.opacity <= 0) k.destroy(particle);
        });
      }
      
      // 检查是否挖完
      if (ore.currentHp <= 0) {
        // 收集矿石
        miningState.totalMined++;
        miningState.combo++;
        
        // 奖励
        addExp(ore.exp * (1 + miningState.combo * 0.1));
        addGold(ore.gold);
        addToInventory({ type: ore.type, name: ore.type });
        
        // 更新任务进度
        updateQuestProgress("collect", ore.type, 1);
        
        // 显示获得文字
        const getText = k.add([
          k.text(`+${ore.name}`, { size: 14 }),
          k.pos(x, y - 20),
          k.anchor("center"),
          k.color(255, 255, 100),
          k.z(20),
          { vy: -30 },
        ]);
        getText.onUpdate(() => {
          getText.pos.y += getText.vy * k.dt();
          getText.opacity -= k.dt();
          if (getText.opacity <= 0) k.destroy(getText);
        });
        
        // 移除矿石
        k.destroy(ore.sprite);
        k.destroy(ore.hpBar);
        k.destroy(ore.hpBarBg);
        k.destroy(ore.label);
        
        // 从数组移除
        const index = miningState.ores.indexOf(ore);
        if (index > -1) {
          miningState.ores.splice(index, 1);
        }
        
        // 更新显示
        scoreText.text = `挖掘: ${miningState.totalMined} | 连击: ${miningState.combo}`;
        
        // 检查是否需要生成新矿石
        if (miningState.ores.length === 0) {
          k.wait(0.5).then(() => {
            generateOres();
          });
        }
      }
    }
    
    // 初始化矿石
    generateOres();
    
    // 连击重置计时器
    let comboTimer = 0;
    k.onUpdate(() => {
      comboTimer += k.dt();
      if (comboTimer > 2) {
        miningState.combo = 0;
        scoreText.text = `挖掘: ${miningState.totalMined} | 连击: ${miningState.combo}`;
        comboTimer = 0;
      }
    });
    
    // 每次点击重置计时器
    k.onClick(() => {
      comboTimer = 0;
    });
    
    // ESC 退出
    k.onKeyPress("escape", () => {
      resetMining();
      k.go("world");
    });
  });
}

// 获取随机矿石类型
function getRandomOreType() {
  const roll = Math.random();
  let cumulative = 0;
  
  for (const ore of ORE_TYPES) {
    cumulative += ore.chance;
    if (roll <= cumulative) {
      return ore;
    }
  }
  
  return ORE_TYPES[0];
}

// 重置挖矿状态
function resetMining() {
  miningState.ores = [];
  miningState.combo = 0;
}

// 开始挖矿
export function startMining() {
  k.go("mining");
}
