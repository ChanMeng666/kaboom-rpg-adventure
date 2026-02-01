// 主世界场景模块 - 支持多区域
import { k } from "../kaboomCtx";
import { GAME_CONFIG } from "../constants";
import { createPlayer, setupPlayerControls } from "../player";
import { loadArea, getSpawnPosition, getAreaName } from "../areaManager";
import { gameState } from "../gameState";
import { setCamScale, showGameUI, updateUI } from "../utils";

// 创建主世界场景
export function createWorldScene() {
  k.scene("world", () => {
    // 获取当前区域
    const currentArea = gameState.currentArea || "village";
    
    // 显示游戏 UI
    showGameUI(true);
    updateUI();
    
    // 获取出生点位置
    let spawnPos;
    if (gameState.playerPos.x !== 0 || gameState.playerPos.y !== 0) {
      // 使用保存的位置（区域切换后）
      const tileSize = GAME_CONFIG.TILE_SIZE;
      const scale = GAME_CONFIG.SCALE_FACTOR;
      spawnPos = {
        x: gameState.playerPos.x * tileSize * scale,
        y: gameState.playerPos.y * tileSize * scale,
      };
    } else {
      spawnPos = getSpawnPosition(currentArea);
    }
    
    // 创建玩家
    const player = createPlayer(spawnPos.x, spawnPos.y);
    
    // 加载当前区域
    const areaData = loadArea(currentArea, player);
    
    // 设置玩家控制
    setupPlayerControls(player);
    
    // 设置相机
    setCamScale(k);
    
    // 显示区域名称
    showAreaName(getAreaName(currentArea));
    
    // 相机跟随玩家
    k.onUpdate(() => {
      k.camPos(player.pos.x, player.pos.y - 30);
    });
    
    // 窗口大小改变时调整相机
    k.onResize(() => {
      setCamScale(k);
    });
    
    // 调试模式切换 (F1)
    k.onKeyPress("f1", () => {
      k.debug.inspect = !k.debug.inspect;
    });
    
    // ESC 打开菜单
    k.onKeyPress("escape", () => {
      // TODO: 打开游戏菜单
    });
    
    // 场景清理
    k.onSceneLeave(() => {
      showGameUI(false);
    });
  });
}

// 显示区域名称
function showAreaName(name) {
  const areaLabel = k.add([
    k.text(name, { size: 24 }),
    k.pos(k.width() / 2, 50),
    k.anchor("center"),
    k.color(255, 255, 255),
    k.opacity(1),
    k.fixed(),
    k.z(200),
  ]);
  
  // 淡出动画
  let timer = 2;
  areaLabel.onUpdate(() => {
    timer -= k.dt();
    if (timer < 1) {
      areaLabel.opacity = timer;
    }
    if (timer <= 0) {
      k.destroy(areaLabel);
    }
  });
}
