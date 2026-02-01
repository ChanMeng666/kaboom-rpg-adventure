// 战斗场景模块
import { k } from "../kaboomCtx";
import { gameState } from "../gameState";
import { startBattle, endBattle, playerAction, enemyAction, tryEscape, getBattleState, getPlayerSkills } from "../battle/battleSystem";
import { getScaledEnemy, ENEMY_DATA } from "../battle/enemies";
import { updateUI, showGameUI } from "../utils";
import { CHARACTERS } from "../sprites";

// 战斗UI元素
let battleUI = {
  enemyHpBar: null,
  playerHpBar: null,
  playerMpBar: null,
  battleLog: null,
  actionMenu: null,
  enemySprite: null,
  playerSprite: null,
};

// 创建战斗场景
export function createBattleScene() {
  k.scene("battle", (enemyType, enemyLevel) => {
    // 隐藏世界UI
    showGameUI(false);
    
    // 设置背景
    k.setBackground(k.Color.fromHex("#1a0a2a"));
    
    // 获取敌人数据
    const enemy = getScaledEnemy(enemyType, enemyLevel || gameState.player.level);
    if (!enemy) {
      console.error(`敌人类型 ${enemyType} 不存在`);
      k.go("world");
      return;
    }
    
    // 开始战斗
    const battleState = startBattle(enemy);
    
    // 创建战斗界面
    createBattleUI(enemy);
    
    // 更新显示
    updateBattleDisplay();
    
    // 场景清理
    k.onSceneLeave(() => {
      cleanupBattleUI();
    });
  });
}

// 创建战斗UI
function createBattleUI(enemy) {
  const width = k.width();
  const height = k.height();
  
  // 战斗背景装饰
  k.add([
    k.rect(width, height * 0.4),
    k.pos(0, 0),
    k.color(30, 20, 50),
    k.z(0),
  ]);
  
  k.add([
    k.rect(width, height * 0.6),
    k.pos(0, height * 0.4),
    k.color(20, 15, 35),
    k.z(0),
  ]);
  
  // 敌人精灵
  battleUI.enemySprite = k.add([
    k.sprite("spritesheet", { frame: enemy.frame }),
    k.pos(width / 2, height * 0.2),
    k.anchor("center"),
    k.scale(4),
    k.z(5),
  ]);
  
  // 敌人名称和等级
  k.add([
    k.text(`${enemy.name} Lv.${enemy.level || 1}`, { size: 20 }),
    k.pos(width / 2, height * 0.05),
    k.anchor("center"),
    k.color(255, 200, 100),
    k.z(10),
  ]);
  
  // 敌人HP条背景
  k.add([
    k.rect(200, 20),
    k.pos(width / 2 - 100, height * 0.32),
    k.color(50, 30, 30),
    k.z(9),
  ]);
  
  // 敌人HP条
  battleUI.enemyHpBar = k.add([
    k.rect(200, 20),
    k.pos(width / 2 - 100, height * 0.32),
    k.color(200, 50, 50),
    k.z(10),
  ]);
  
  // 玩家精灵
  battleUI.playerSprite = k.add([
    k.sprite("spritesheet", { anim: "idle-down" }),
    k.pos(width * 0.2, height * 0.55),
    k.anchor("center"),
    k.scale(3),
    k.z(5),
  ]);
  
  // 玩家状态面板
  const playerPanel = k.add([
    k.rect(250, 100),
    k.pos(20, height * 0.42),
    k.color(40, 30, 60),
    k.outline(2, k.Color.fromHex("#8b5cf6")),
    k.z(8),
  ]);
  
  // 玩家名称
  k.add([
    k.text(`勇者 Lv.${gameState.player.level}`, { size: 16 }),
    k.pos(30, height * 0.44),
    k.color(255, 255, 255),
    k.z(10),
  ]);
  
  // 玩家HP标签
  k.add([
    k.text("HP", { size: 14 }),
    k.pos(30, height * 0.48),
    k.color(200, 100, 100),
    k.z(10),
  ]);
  
  // 玩家HP条背景
  k.add([
    k.rect(180, 16),
    k.pos(60, height * 0.48),
    k.color(50, 30, 30),
    k.z(9),
  ]);
  
  // 玩家HP条
  battleUI.playerHpBar = k.add([
    k.rect(180, 16),
    k.pos(60, height * 0.48),
    k.color(100, 200, 100),
    k.z(10),
  ]);
  
  // 玩家MP标签
  k.add([
    k.text("MP", { size: 14 }),
    k.pos(30, height * 0.52),
    k.color(100, 100, 200),
    k.z(10),
  ]);
  
  // 玩家MP条背景
  k.add([
    k.rect(180, 16),
    k.pos(60, height * 0.52),
    k.color(30, 30, 50),
    k.z(9),
  ]);
  
  // 玩家MP条
  battleUI.playerMpBar = k.add([
    k.rect(180, 16),
    k.pos(60, height * 0.52),
    k.color(100, 100, 200),
    k.z(10),
  ]);
  
  // 战斗日志面板
  k.add([
    k.rect(width - 40, 80),
    k.pos(20, height * 0.62),
    k.color(30, 25, 45),
    k.outline(2, k.Color.fromHex("#6b21a8")),
    k.z(8),
  ]);
  
  // 战斗日志文本
  battleUI.battleLog = k.add([
    k.text("", { size: 14, width: width - 60 }),
    k.pos(30, height * 0.64),
    k.color(200, 200, 200),
    k.z(10),
  ]);
  
  // 创建动作菜单
  createActionMenu();
}

// 创建动作菜单
function createActionMenu() {
  const width = k.width();
  const height = k.height();
  const skills = getPlayerSkills();
  
  const menuY = height * 0.78;
  const buttonWidth = 120;
  const buttonHeight = 40;
  const gap = 10;
  const startX = (width - (buttonWidth * 4 + gap * 3)) / 2;
  
  // 技能按钮
  skills.forEach((skill, index) => {
    const x = startX + (buttonWidth + gap) * index;
    
    // 按钮背景
    const btn = k.add([
      k.rect(buttonWidth, buttonHeight),
      k.pos(x, menuY),
      k.color(60, 40, 80),
      k.outline(2, k.Color.fromHex("#8b5cf6")),
      k.area(),
      k.z(10),
      `skill_${skill.id}`,
    ]);
    
    // 按钮文字
    k.add([
      k.text(skill.name, { size: 14 }),
      k.pos(x + buttonWidth / 2, menuY + buttonHeight / 2),
      k.anchor("center"),
      k.color(255, 255, 255),
      k.z(11),
    ]);
    
    // MP消耗
    if (skill.mpCost > 0) {
      k.add([
        k.text(`${skill.mpCost}MP`, { size: 10 }),
        k.pos(x + buttonWidth - 5, menuY + 5),
        k.anchor("topright"),
        k.color(150, 150, 255),
        k.z(11),
      ]);
    }
    
    // 点击事件
    btn.onClick(() => {
      handlePlayerAction(skill.id);
    });
  });
  
  // 逃跑按钮
  const escapeBtn = k.add([
    k.rect(80, buttonHeight),
    k.pos(width - 100, menuY),
    k.color(80, 40, 40),
    k.outline(2, k.Color.fromHex("#ef4444")),
    k.area(),
    k.z(10),
    "escape_btn",
  ]);
  
  k.add([
    k.text("逃跑", { size: 14 }),
    k.pos(width - 60, menuY + buttonHeight / 2),
    k.anchor("center"),
    k.color(255, 200, 200),
    k.z(11),
  ]);
  
  escapeBtn.onClick(() => {
    handleEscape();
  });
}

// 处理玩家行动
async function handlePlayerAction(skillId) {
  const battleState = getBattleState();
  if (battleState.turn !== "player") return;
  
  // 执行玩家行动
  const result = playerAction(skillId);
  
  if (!result.success) {
    updateBattleLog(result.message);
    return;
  }
  
  // 更新显示
  updateBattleDisplay();
  updateBattleLog(result.messages.join("\n"));
  
  // 播放攻击动画
  playAttackAnimation(battleUI.playerSprite, battleUI.enemySprite);
  
  // 检查胜利
  if (result.victory) {
    await k.wait(1);
    showVictoryScreen(result.rewards);
    return;
  }
  
  // 等待后敌人行动
  await k.wait(1);
  handleEnemyAction();
}

// 处理敌人行动
async function handleEnemyAction() {
  const result = enemyAction();
  
  // 更新显示
  updateBattleDisplay();
  updateBattleLog(result.messages.join("\n"));
  
  // 播放攻击动画
  playAttackAnimation(battleUI.enemySprite, battleUI.playerSprite);
  
  // 检查失败
  if (result.defeat) {
    await k.wait(1);
    showDefeatScreen();
  }
}

// 处理逃跑
async function handleEscape() {
  const result = tryEscape();
  
  updateBattleLog(result.message);
  
  if (result.success) {
    await k.wait(0.5);
    endBattle();
    k.go("world");
  } else {
    await k.wait(0.5);
    handleEnemyAction();
  }
}

// 更新战斗显示
function updateBattleDisplay() {
  const battleState = getBattleState();
  
  // 更新敌人HP条
  if (battleUI.enemyHpBar && battleState.enemy) {
    const hpRatio = Math.max(0, battleState.enemy.hp / battleState.enemy.maxHp);
    battleUI.enemyHpBar.width = 200 * hpRatio;
  }
  
  // 更新玩家HP条
  if (battleUI.playerHpBar) {
    const hpRatio = Math.max(0, gameState.player.hp / gameState.player.maxHp);
    battleUI.playerHpBar.width = 180 * hpRatio;
  }
  
  // 更新玩家MP条
  if (battleUI.playerMpBar) {
    const mpRatio = Math.max(0, gameState.player.mp / gameState.player.maxMp);
    battleUI.playerMpBar.width = 180 * mpRatio;
  }
}

// 更新战斗日志
function updateBattleLog(text) {
  if (battleUI.battleLog) {
    battleUI.battleLog.text = text;
  }
}

// 播放攻击动画
function playAttackAnimation(attacker, target) {
  if (!attacker || !target) return;
  
  const originalX = attacker.pos.x;
  const targetX = target.pos.x;
  const direction = targetX > originalX ? 1 : -1;
  
  // 冲向目标
  k.tween(
    attacker.pos.x,
    attacker.pos.x + direction * 30,
    0.1,
    (v) => { attacker.pos.x = v; },
    k.easings.easeOutQuad
  ).then(() => {
    // 返回
    k.tween(
      attacker.pos.x,
      originalX,
      0.15,
      (v) => { attacker.pos.x = v; },
      k.easings.easeInQuad
    );
  });
  
  // 目标闪烁
  k.wait(0.1).then(() => {
    let flashes = 3;
    const flash = () => {
      if (flashes <= 0) return;
      target.color = k.Color.fromHex("#ff0000");
      k.wait(0.05).then(() => {
        target.color = k.Color.WHITE;
        flashes--;
        k.wait(0.05).then(flash);
      });
    };
    flash();
  });
}

// 显示胜利画面
function showVictoryScreen(rewards) {
  const width = k.width();
  const height = k.height();
  
  // 遮罩
  k.add([
    k.rect(width, height),
    k.pos(0, 0),
    k.color(0, 0, 0),
    k.opacity(0.7),
    k.z(50),
  ]);
  
  // 胜利文字
  k.add([
    k.text("胜利！", { size: 48 }),
    k.pos(width / 2, height * 0.3),
    k.anchor("center"),
    k.color(255, 215, 0),
    k.z(51),
  ]);
  
  // 奖励信息
  let rewardText = `获得 ${rewards.exp} 经验值\n获得 ${rewards.gold} 金币`;
  if (rewards.items.length > 0) {
    rewardText += `\n获得物品: ${rewards.items.join(", ")}`;
  }
  
  k.add([
    k.text(rewardText, { size: 20, lineSpacing: 8 }),
    k.pos(width / 2, height * 0.5),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.z(51),
  ]);
  
  // 继续按钮
  const continueBtn = k.add([
    k.rect(150, 50),
    k.pos(width / 2 - 75, height * 0.7),
    k.color(50, 150, 50),
    k.outline(2, k.Color.fromHex("#22c55e")),
    k.area(),
    k.z(51),
  ]);
  
  k.add([
    k.text("继续", { size: 20 }),
    k.pos(width / 2, height * 0.7 + 25),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.z(52),
  ]);
  
  continueBtn.onClick(() => {
    endBattle();
    k.go("world");
  });
  
  // 空格键继续
  k.onKeyPress("space", () => {
    endBattle();
    k.go("world");
  });
}

// 显示失败画面
function showDefeatScreen() {
  const width = k.width();
  const height = k.height();
  
  // 遮罩
  k.add([
    k.rect(width, height),
    k.pos(0, 0),
    k.color(0, 0, 0),
    k.opacity(0.8),
    k.z(50),
  ]);
  
  // 失败文字
  k.add([
    k.text("你被击败了...", { size: 36 }),
    k.pos(width / 2, height * 0.3),
    k.anchor("center"),
    k.color(200, 50, 50),
    k.z(51),
  ]);
  
  k.add([
    k.text("金币减半，返回村庄", { size: 18 }),
    k.pos(width / 2, height * 0.45),
    k.anchor("center"),
    k.color(200, 200, 200),
    k.z(51),
  ]);
  
  // 惩罚
  gameState.player.gold = Math.floor(gameState.player.gold / 2);
  gameState.player.hp = Math.floor(gameState.player.maxHp * 0.3);
  gameState.player.mp = Math.floor(gameState.player.maxMp * 0.3);
  
  // 继续按钮
  const continueBtn = k.add([
    k.rect(150, 50),
    k.pos(width / 2 - 75, height * 0.6),
    k.color(100, 50, 50),
    k.outline(2, k.Color.fromHex("#ef4444")),
    k.area(),
    k.z(51),
  ]);
  
  k.add([
    k.text("返回村庄", { size: 18 }),
    k.pos(width / 2, height * 0.6 + 25),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.z(52),
  ]);
  
  continueBtn.onClick(() => {
    endBattle();
    gameState.currentArea = "village";
    gameState.playerPos = { x: 15, y: 12 };
    k.go("world");
  });
  
  // 空格键继续
  k.onKeyPress("space", () => {
    endBattle();
    gameState.currentArea = "village";
    gameState.playerPos = { x: 15, y: 12 };
    k.go("world");
  });
}

// 清理战斗UI
function cleanupBattleUI() {
  battleUI = {
    enemyHpBar: null,
    playerHpBar: null,
    playerMpBar: null,
    battleLog: null,
    actionMenu: null,
    enemySprite: null,
    playerSprite: null,
  };
}

// 随机遭遇检测
export function checkRandomEncounter(areaType) {
  // 根据区域类型决定遭遇率
  const encounterRates = {
    forest: 0.08,
    mine: 0.10,
    castle: 0.05,
  };
  
  const rate = encounterRates[areaType] || 0;
  
  if (Math.random() < rate) {
    return true;
  }
  
  return false;
}
