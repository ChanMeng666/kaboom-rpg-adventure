// 钓鱼小游戏
import { k } from "../kaboomCtx";
import { addToInventory, addGold, addExp } from "../gameState";
import { updateQuestProgress } from "../quest/questSystem";

// 钓鱼奖励
const FISH_REWARDS = [
  { name: "小鱼", exp: 5, gold: 5, chance: 0.5 },
  { name: "大鱼", exp: 15, gold: 15, chance: 0.3 },
  { name: "珍稀鱼", exp: 50, gold: 50, chance: 0.1 },
  { name: "宝物", exp: 100, gold: 100, item: "gemBlue", chance: 0.05 },
  { name: "靴子", exp: 0, gold: 1, chance: 0.05 },
];

// 钓鱼游戏状态
let fishingState = {
  active: false,
  phase: "waiting", // waiting, hooking, reeling
  timer: 0,
  targetZone: { min: 0, max: 0 },
  marker: 0,
  markerSpeed: 0,
  catches: 0,
  result: null,
};

// 创建钓鱼场景
export function createFishingScene() {
  k.scene("fishing", () => {
    // 设置背景
    k.setBackground(k.Color.fromHex("#1a2e3e"));

    const width = k.width();
    const height = k.height();

    // 背景装饰 - 水面
    k.add([k.rect(width, height * 0.6), k.pos(0, height * 0.4), k.color(30, 80, 120), k.z(0)]);

    // 波浪动画
    for (let i = 0; i < 5; i++) {
      const wave = k.add([
        k.rect(width, 3),
        k.pos(0, height * 0.4 + i * 30),
        k.color(50, 100, 140),
        k.opacity(0.5),
        k.z(1),
        { offset: (i * Math.PI) / 2 },
      ]);
      wave.onUpdate(() => {
        wave.pos.x = Math.sin(k.time() * 2 + wave.offset) * 20;
      });
    }

    // 标题
    k.add([
      k.text("🎣 钓鱼", { size: 32 }),
      k.pos(width / 2, 40),
      k.anchor("center"),
      k.color(255, 255, 255),
      k.z(10),
    ]);

    // 说明
    const instructions = k.add([
      k.text("按空格键开始钓鱼", { size: 18 }),
      k.pos(width / 2, height * 0.25),
      k.anchor("center"),
      k.color(200, 200, 200),
      k.z(10),
    ]);

    // 钓鱼进度条背景
    const barWidth = 300;
    const barHeight = 30;
    const barX = (width - barWidth) / 2;
    const barY = height * 0.55;

    k.add([
      k.rect(barWidth, barHeight),
      k.pos(barX, barY),
      k.color(30, 30, 50),
      k.outline(2, k.Color.WHITE),
      k.z(5),
    ]);

    // 目标区域
    const targetZone = k.add([
      k.rect(60, barHeight - 4),
      k.pos(barX + 100, barY + 2),
      k.color(50, 200, 50),
      k.opacity(0.7),
      k.z(6),
    ]);

    // 标记
    const marker = k.add([
      k.rect(8, barHeight - 4),
      k.pos(barX + 2, barY + 2),
      k.color(255, 200, 50),
      k.z(7),
    ]);

    // 结果文本
    const resultText = k.add([
      k.text("", { size: 24 }),
      k.pos(width / 2, height * 0.7),
      k.anchor("center"),
      k.color(255, 255, 100),
      k.z(10),
    ]);

    // 捕获计数
    const catchCount = k.add([
      k.text(`捕获: ${fishingState.catches}`, { size: 16 }),
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
      resetFishing();
      k.go("world");
    });

    // 初始化游戏状态
    fishingState.phase = "waiting";
    fishingState.marker = 0;
    fishingState.markerSpeed = 3;

    // 随机目标区域
    function setNewTarget() {
      const zoneWidth = 60;
      fishingState.targetZone.min = 50 + Math.random() * (barWidth - 100 - zoneWidth);
      fishingState.targetZone.max = fishingState.targetZone.min + zoneWidth;
      targetZone.pos.x = barX + fishingState.targetZone.min;
    }

    setNewTarget();

    // 空格键处理
    k.onKeyPress("space", () => {
      if (fishingState.phase === "waiting") {
        fishingState.phase = "reeling";
        instructions.text = "在绿色区域按空格！";
        fishingState.markerSpeed = 3 + Math.random() * 2;
      } else if (fishingState.phase === "reeling") {
        checkCatch();
      }
    });

    // 检查是否钓到
    function checkCatch() {
      const markerPos = fishingState.marker;

      if (markerPos >= fishingState.targetZone.min && markerPos <= fishingState.targetZone.max) {
        // 成功钓到
        const reward = getRandomReward();
        fishingState.catches++;
        catchCount.text = `捕获: ${fishingState.catches}`;

        // 发放奖励
        addExp(reward.exp);
        addGold(reward.gold);
        if (reward.item) {
          addToInventory({ type: reward.item, name: reward.item });
        }

        // 更新任务进度
        updateQuestProgress("fish", "fish", 1);

        resultText.text = `🎉 钓到了${reward.name}！`;
        resultText.color = k.Color.fromHex("#22c55e");
      } else {
        // 失败
        resultText.text = "💨 鱼跑掉了...";
        resultText.color = k.Color.fromHex("#ef4444");
      }

      // 重置
      fishingState.phase = "waiting";
      fishingState.marker = 0;
      setNewTarget();

      // 清除结果文本
      k.wait(1.5).then(() => {
        resultText.text = "";
        instructions.text = "按空格键继续钓鱼";
      });
    }

    // 更新循环
    k.onUpdate(() => {
      if (fishingState.phase === "reeling") {
        // 移动标记
        fishingState.marker += fishingState.markerSpeed;
        if (fishingState.marker > barWidth - 10) {
          fishingState.marker = barWidth - 10;
          fishingState.markerSpeed = -Math.abs(fishingState.markerSpeed);
        } else if (fishingState.marker < 0) {
          fishingState.marker = 0;
          fishingState.markerSpeed = Math.abs(fishingState.markerSpeed);
        }

        marker.pos.x = barX + fishingState.marker;
      }
    });

    // ESC 退出
    k.onKeyPress("escape", () => {
      resetFishing();
      k.go("world");
    });
  });
}

// 获取随机奖励
function getRandomReward() {
  const roll = Math.random();
  let cumulative = 0;

  for (const reward of FISH_REWARDS) {
    cumulative += reward.chance;
    if (roll <= cumulative) {
      return reward;
    }
  }

  return FISH_REWARDS[0];
}

// 重置钓鱼状态
function resetFishing() {
  fishingState = {
    active: false,
    phase: "waiting",
    timer: 0,
    targetZone: { min: 0, max: 0 },
    marker: 0,
    markerSpeed: 0,
    catches: fishingState.catches,
    result: null,
  };
}

// 开始钓鱼
export function startFishing() {
  k.go("fishing");
}
