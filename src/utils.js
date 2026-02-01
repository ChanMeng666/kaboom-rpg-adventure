import { GAME_CONFIG, INITIAL_PLAYER_STATE } from "./constants";
import { gameState } from "./gameState";

// 玩家状态管理 (兼容旧代码，实际使用 gameState)
export const playerState = gameState.player;

// 重置玩家状态
export function resetPlayerState() {
  Object.assign(gameState.player, INITIAL_PLAYER_STATE);
}

// 显示对话
export function displayDialogue(dialogueData, onComplete) {
  const container = document.getElementById("dialogue-container");
  const speakerEl = document.getElementById("dialogue-speaker");
  const textEl = document.getElementById("dialogue-text");
  
  if (!dialogueData || !dialogueData.lines || dialogueData.lines.length === 0) {
    if (onComplete) onComplete();
    return;
  }

  let currentLineIndex = 0;
  const lines = dialogueData.lines;
  
  container.style.display = "block";
  speakerEl.textContent = dialogueData.speaker || "";
  textEl.textContent = lines[currentLineIndex];

  function nextLine() {
    currentLineIndex++;
    if (currentLineIndex < lines.length) {
      textEl.textContent = lines[currentLineIndex];
    } else {
      closeDialogue();
    }
  }

  function closeDialogue() {
    container.style.display = "none";
    document.removeEventListener("keydown", handleKeyDown);
    container.removeEventListener("click", handleClick);
    if (onComplete) onComplete();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      nextLine();
    }
  }

  function handleClick() {
    nextLine();
  }

  document.addEventListener("keydown", handleKeyDown);
  container.addEventListener("click", handleClick);
}

// 设置相机缩放
export function setCamScale(k) {
  const resizeFactor = k.width() / k.height();
  const baseScale = GAME_CONFIG.CAM_SCALE || 1.8;
  
  if (resizeFactor < 1) {
    // 移动端/竖屏模式 - 稍微缩小以显示更多内容
    k.camScale(k.vec2(baseScale * 0.7));
  } else if (resizeFactor < 1.5) {
    // 较窄的横屏
    k.camScale(k.vec2(baseScale * 0.85));
  } else {
    // 桌面端/宽屏模式
    k.camScale(k.vec2(baseScale));
  }
}

// 更新UI显示
export function updateUI() {
  const player = gameState.player;
  const hpBar = document.getElementById("hp-bar");
  const mpBar = document.getElementById("mp-bar");
  const expBar = document.getElementById("exp-bar");
  const goldAmount = document.getElementById("gold-amount");

  if (hpBar) {
    hpBar.style.width = `${(player.hp / player.maxHp) * 100}%`;
  }
  if (mpBar) {
    mpBar.style.width = `${(player.mp / player.maxMp) * 100}%`;
  }
  if (expBar) {
    expBar.style.width = `${(player.exp / player.expToLevel) * 100}%`;
  }
  if (goldAmount) {
    goldAmount.textContent = player.gold;
  }
}

// 显示/隐藏游戏UI
export function showGameUI(show = true) {
  const gameUI = document.getElementById("game-ui");
  const controlsHint = document.getElementById("controls-hint");
  
  if (gameUI) {
    gameUI.style.display = show ? "block" : "none";
  }
  if (controlsHint) {
    controlsHint.style.display = show ? "block" : "none";
  }
}

// 隐藏开始界面
export function hideStartScreen() {
  const startScreen = document.getElementById("start-screen");
  if (startScreen) {
    startScreen.classList.add("hidden");
  }
}

// 显示开始界面
export function showStartScreen() {
  const startScreen = document.getElementById("start-screen");
  if (startScreen) {
    startScreen.classList.remove("hidden");
  }
}

// 恢复HP
export function healPlayer(amount) {
  const player = gameState.player;
  player.hp = Math.min(player.hp + amount, player.maxHp);
  updateUI();
}

// 恢复MP
export function restoreMana(amount) {
  const player = gameState.player;
  player.mp = Math.min(player.mp + amount, player.maxMp);
  updateUI();
}

// 获得金币
export function addGold(amount) {
  gameState.player.gold += amount;
  updateUI();
}

// 获得经验
export function addExp(amount) {
  const player = gameState.player;
  player.exp += amount;
  
  // 检查升级
  while (player.exp >= player.expToLevel) {
    player.exp -= player.expToLevel;
    player.level++;
    player.maxHp += 10;
    player.maxMp += 5;
    player.hp = player.maxHp;
    player.mp = player.maxMp;
    player.expToLevel = Math.floor(player.expToLevel * 1.5);
  }
  
  updateUI();
}

// 获取玩家移动方向的动画名称
export function getDirectionAnim(direction, isMoving) {
  const prefix = isMoving ? "walk" : "idle";
  return `${prefix}-${direction}`;
}

// 根据角度获取方向
export function getDirectionFromAngle(angle) {
  const absAngle = Math.abs(angle);
  
  if (absAngle > 135) {
    return "left";
  } else if (absAngle < 45) {
    return "right";
  } else if (angle > 0) {
    return "up";
  } else {
    return "down";
  }
}

// 计算两点之间的方向
export function getDirectionBetweenPoints(from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  
  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? "right" : "left";
  } else {
    return dy > 0 ? "down" : "up";
  }
}
