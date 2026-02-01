// 主入口文件
import { k } from "./kaboomCtx";
import { loadAllSprites } from "./sprites";
import { createStartScene } from "./scenes/start";
import { createWorldScene } from "./scenes/world";
import { createBattleScene } from "./scenes/battle";
import { createInteriorScene } from "./scenes/interior";
import { createInventoryUI } from "./ui/inventory";
import { createShopUI } from "./ui/shop";
import { createQuestUI } from "./ui/quest";
import { initQuestSystem } from "./quest/questSystem";
import { createFishingScene } from "./minigames/fishing";
import { createMiningScene } from "./minigames/mining";
import { createSaveLoadUI } from "./ui/saveLoad";
import { createAchievementUI } from "./ui/achievements";

// 初始化游戏
async function initGame() {
  console.log("🎮 Kaboom RPG 游戏初始化中...");
  
  try {
    // 加载所有精灵资源
    await loadAllSprites();
    console.log("✅ 精灵资源加载完成");
    
    // 注册所有场景
    createStartScene();
    createWorldScene();
    createBattleScene();
    createInteriorScene();
    createFishingScene();
    createMiningScene();
    console.log("✅ 场景注册完成");
    
    // 初始化UI系统
    createInventoryUI();
    createShopUI();
    createQuestUI();
    createSaveLoadUI();
    createAchievementUI();
    console.log("✅ UI系统初始化完成");
    
    // 初始化任务系统
    initQuestSystem();
    console.log("✅ 任务系统初始化完成");
    
    // 启动开始场景
    k.go("start");
    console.log("✅ 游戏启动成功!");
    
  } catch (error) {
    console.error("❌ 游戏初始化失败:", error);
    
    // 显示错误信息
    k.add([
      k.text("游戏加载失败\n请刷新页面重试", { 
        size: 24,
        width: k.width() - 40,
        align: "center"
      }),
      k.pos(k.width() / 2, k.height() / 2),
      k.anchor("center"),
      k.color(255, 100, 100),
    ]);
  }
}

// 当 DOM 加载完成后初始化游戏
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGame);
} else {
  initGame();
}
