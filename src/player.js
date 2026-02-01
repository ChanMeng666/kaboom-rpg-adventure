// 玩家角色模块
import { k } from "./kaboomCtx";
import { GAME_CONFIG } from "./constants";
import { getDirectionBetweenPoints } from "./utils";

// 创建玩家角色
export function createPlayer(x, y) {
  const playerScale = GAME_CONFIG.PLAYER_SCALE || 1.5;
  
  const player = k.add([
    k.sprite("spritesheet", { anim: "idle-down" }),
    k.pos(x, y),
    k.area({ shape: new k.Rect(k.vec2(0, 3), 10, 10) }),
    k.body(),
    k.anchor("center"),
    k.scale(playerScale),
    k.z(10),
    {
      speed: GAME_CONFIG.PLAYER_SPEED,
      direction: "down",
      isInDialogue: false,
      isMoving: false,
      targetPos: null,
    },
    "player",
  ]);

  return player;
}

// 设置玩家控制
export function setupPlayerControls(player) {
  // 键盘控制
  k.onKeyDown("left", () => {
    if (player.isInDialogue) return;
    player.flipX = true;
    movePlayer(player, -1, 0, "left");
  });

  k.onKeyDown("right", () => {
    if (player.isInDialogue) return;
    player.flipX = false;
    movePlayer(player, 1, 0, "right");
  });

  k.onKeyDown("up", () => {
    if (player.isInDialogue) return;
    movePlayer(player, 0, -1, "up");
  });

  k.onKeyDown("down", () => {
    if (player.isInDialogue) return;
    movePlayer(player, 0, 1, "down");
  });

  // WASD 控制
  k.onKeyDown("a", () => {
    if (player.isInDialogue) return;
    player.flipX = true;
    movePlayer(player, -1, 0, "left");
  });

  k.onKeyDown("d", () => {
    if (player.isInDialogue) return;
    player.flipX = false;
    movePlayer(player, 1, 0, "right");
  });

  k.onKeyDown("w", () => {
    if (player.isInDialogue) return;
    movePlayer(player, 0, -1, "up");
  });

  k.onKeyDown("s", () => {
    if (player.isInDialogue) return;
    movePlayer(player, 0, 1, "down");
  });

  // 键盘释放时停止动画
  k.onKeyRelease(() => {
    stopPlayerMovement(player);
  });

  // 鼠标/触摸控制
  k.onMouseDown("left", () => {
    if (player.isInDialogue) return;
    const worldMousePos = k.toWorld(k.mousePos());
    player.targetPos = worldMousePos;
    player.isMoving = true;
  });

  k.onMouseRelease("left", () => {
    player.targetPos = null;
    stopPlayerMovement(player);
  });

  // 更新循环 - 处理鼠标移动
  k.onUpdate(() => {
    if (player.targetPos && player.isMoving && !player.isInDialogue) {
      const dist = player.pos.dist(player.targetPos);
      
      if (dist > 5) {
        const direction = getDirectionBetweenPoints(player.pos, player.targetPos);
        
        // 更新方向和翻转
        if (direction === "left") {
          player.flipX = true;
          if (player.curAnim() !== "walk-side") player.play("walk-side");
          player.direction = "left";
        } else if (direction === "right") {
          player.flipX = false;
          if (player.curAnim() !== "walk-side") player.play("walk-side");
          player.direction = "right";
        } else if (direction === "up") {
          if (player.curAnim() !== "walk-up") player.play("walk-up");
          player.direction = "up";
        } else {
          if (player.curAnim() !== "walk-down") player.play("walk-down");
          player.direction = "down";
        }
        
        player.moveTo(player.targetPos, player.speed);
      } else {
        player.targetPos = null;
        stopPlayerMovement(player);
      }
    }
  });
}

// 移动玩家
function movePlayer(player, dx, dy, direction) {
  player.direction = direction;
  player.isMoving = true;
  player.move(dx * player.speed, dy * player.speed);
  
  // 播放对应方向的行走动画
  if (direction === "left" || direction === "right") {
    if (player.curAnim() !== "walk-side") player.play("walk-side");
  } else if (direction === "up") {
    if (player.curAnim() !== "walk-up") player.play("walk-up");
  } else {
    if (player.curAnim() !== "walk-down") player.play("walk-down");
  }
}

// 停止玩家移动
function stopPlayerMovement(player) {
  player.isMoving = false;
  player.targetPos = null;
  
  // 播放对应方向的待机动画
  if (player.direction === "down") {
    player.play("idle-down");
  } else if (player.direction === "up") {
    player.play("idle-up");
  } else {
    player.play("idle-side");
  }
}

// 获取玩家当前状态
export function getPlayerState(player) {
  return {
    pos: player.pos,
    direction: player.direction,
    isMoving: player.isMoving,
    isInDialogue: player.isInDialogue,
  };
}
