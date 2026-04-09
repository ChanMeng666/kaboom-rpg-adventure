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
  console.log("[Game] Initializing...");

  try {
    try {
      await loadAllSprites();
      console.log("[Game] Sprites loaded");
    } catch (spriteError) {
      console.warn("[Game] Some sprites failed to load:", spriteError.message);
    }

    createStartScene();
    createWorldScene();
    createBattleScene();
    createInteriorScene();
    createFishingScene();
    createMiningScene();
    console.log("[Game] Scenes registered");

    createInventoryUI();
    createShopUI();
    createQuestUI();
    createSaveLoadUI();
    createAchievementUI();
    console.log("[Game] UI initialized");

    initQuestSystem();
    console.log("[Game] Quest system initialized");

    k.go("start");
    console.log("[Game] Started successfully");
  } catch (error) {
    console.error("[Game] Initialization failed:", error);

    // 显示错误信息
    k.add([
      k.text("游戏加载失败\n请刷新页面重试", {
        size: 24,
        width: k.width() - 40,
        align: "center",
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
