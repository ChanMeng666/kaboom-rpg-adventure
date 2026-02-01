// 存档读取UI系统
import { k } from "../kaboomCtx";
import { gameState, saveGame, loadGame, hasSaveData, deleteSave, resetGame } from "../gameState";
import { showAchievementPanel } from "./achievements";

// 存档面板状态
let saveMenuOpen = false;

// 创建存档UI
export function createSaveLoadUI() {
  const html = `
    <div id="save-panel" style="
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      background: linear-gradient(180deg, #1a1a2e 0%, #0a0a1a 100%);
      border: 3px solid #3b82f6;
      border-radius: 12px;
      padding: 20px;
      z-index: 1000;
      color: white;
      font-family: 'Microsoft YaHei', sans-serif;
      box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
    ">
      <h2 style="margin: 0 0 20px 0; color: #60a5fa; text-align: center;">存档管理</h2>
      
      <div id="save-slots" style="display: flex; flex-direction: column; gap: 10px;"></div>
      
      <div style="margin-top: 20px; display: flex; gap: 10px;">
        <button id="btn-save-close" style="
          flex: 1;
          padding: 12px;
          background: #6b7280;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 14px;
        ">关闭</button>
      </div>
    </div>
    
    <!-- 游戏菜单 -->
    <div id="game-menu" style="
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      background: linear-gradient(180deg, #2a1a3a 0%, #1a0a2a 100%);
      border: 3px solid #a855f7;
      border-radius: 12px;
      padding: 20px;
      z-index: 999;
      color: white;
      font-family: 'Microsoft YaHei', sans-serif;
    ">
      <h2 style="margin: 0 0 20px 0; color: #c084fc; text-align: center;">游戏菜单</h2>
      
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <button class="menu-btn" id="btn-resume" style="
          padding: 12px;
          background: #22c55e;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 16px;
        ">继续游戏</button>
        
        <button class="menu-btn" id="btn-save" style="
          padding: 12px;
          background: #3b82f6;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 16px;
        ">保存游戏</button>
        
        <button class="menu-btn" id="btn-load" style="
          padding: 12px;
          background: #eab308;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 16px;
        ">读取存档</button>
        
        <button class="menu-btn" id="btn-achievements" style="
          padding: 12px;
          background: #a855f7;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 16px;
        ">成就</button>
        
        <button class="menu-btn" id="btn-quit" style="
          padding: 12px;
          background: #ef4444;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 16px;
        ">返回标题</button>
      </div>
    </div>
  `;
  
  const container = document.createElement("div");
  container.innerHTML = html;
  document.body.appendChild(container);
  
  // 绑定事件
  document.getElementById("btn-save-close").addEventListener("click", closeSavePanel);
  document.getElementById("btn-resume").addEventListener("click", closeGameMenu);
  document.getElementById("btn-save").addEventListener("click", openSavePanel.bind(null, "save"));
  document.getElementById("btn-load").addEventListener("click", openSavePanel.bind(null, "load"));
  document.getElementById("btn-achievements").addEventListener("click", showAchievements);
  document.getElementById("btn-quit").addEventListener("click", quitToTitle);
  
  // ESC 键打开菜单
  k.onKeyPress("escape", () => {
    if (saveMenuOpen) {
      closeSavePanel();
    } else {
      toggleGameMenu();
    }
  });
}

// 打开游戏菜单
export function toggleGameMenu() {
  const menu = document.getElementById("game-menu");
  if (menu) {
    const isOpen = menu.style.display === "block";
    menu.style.display = isOpen ? "none" : "block";
  }
}

// 关闭游戏菜单
export function closeGameMenu() {
  const menu = document.getElementById("game-menu");
  if (menu) {
    menu.style.display = "none";
  }
}

// 打开存档面板
let currentMode = "save";
function openSavePanel(mode) {
  currentMode = mode;
  saveMenuOpen = true;
  closeGameMenu();
  
  const panel = document.getElementById("save-panel");
  if (panel) {
    panel.style.display = "block";
    refreshSaveSlots();
  }
}

// 关闭存档面板
function closeSavePanel() {
  saveMenuOpen = false;
  const panel = document.getElementById("save-panel");
  if (panel) {
    panel.style.display = "none";
  }
}

// 刷新存档槽
function refreshSaveSlots() {
  const container = document.getElementById("save-slots");
  if (!container) return;
  
  container.innerHTML = "";
  
  // 3个存档槽
  for (let i = 0; i < 3; i++) {
    const hasData = hasSaveData(i);
    let saveInfo = "空槽位";
    
    if (hasData) {
      try {
        const data = JSON.parse(localStorage.getItem(`pixelRPG_save_${i}`));
        const date = new Date(data.savedAt).toLocaleString();
        saveInfo = `Lv.${data.player?.level || 1} | ${data.player?.gold || 0}G | ${date}`;
      } catch (e) {
        saveInfo = "数据损坏";
      }
    }
    
    const slot = document.createElement("div");
    slot.style.cssText = `
      padding: 15px;
      background: ${hasData ? "#2a2a4a" : "#1a1a2a"};
      border: 2px solid ${hasData ? "#3b82f6" : "#4a4a6a"};
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
    
    slot.innerHTML = `
      <div>
        <div style="color: #60a5fa; font-weight: bold;">存档 ${i + 1}</div>
        <div style="color: #9ca3af; font-size: 12px; margin-top: 4px;">${saveInfo}</div>
      </div>
      <div style="display: flex; gap: 5px;">
        ${currentMode === "save" ? `
          <button class="slot-btn save-btn" data-slot="${i}" style="
            padding: 8px 15px;
            background: #3b82f6;
            border: none;
            border-radius: 4px;
            color: white;
            cursor: pointer;
          ">保存</button>
        ` : hasData ? `
          <button class="slot-btn load-btn" data-slot="${i}" style="
            padding: 8px 15px;
            background: #22c55e;
            border: none;
            border-radius: 4px;
            color: white;
            cursor: pointer;
          ">读取</button>
          <button class="slot-btn delete-btn" data-slot="${i}" style="
            padding: 8px 10px;
            background: #ef4444;
            border: none;
            border-radius: 4px;
            color: white;
            cursor: pointer;
          ">删除</button>
        ` : `
          <span style="color: #6b7280;">无存档</span>
        `}
      </div>
    `;
    
    container.appendChild(slot);
  }
  
  // 绑定按钮事件
  container.querySelectorAll(".save-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const slot = parseInt(e.target.dataset.slot);
      if (hasSaveData(slot)) {
        if (!confirm("确定要覆盖这个存档吗？")) return;
      }
      saveGame(slot);
      alert("保存成功！");
      refreshSaveSlots();
    });
  });
  
  container.querySelectorAll(".load-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const slot = parseInt(e.target.dataset.slot);
      if (loadGame(slot)) {
        alert("读取成功！");
        closeSavePanel();
        k.go("world");
      } else {
        alert("读取失败！");
      }
    });
  });
  
  container.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const slot = parseInt(e.target.dataset.slot);
      if (confirm("确定要删除这个存档吗？")) {
        deleteSave(slot);
        refreshSaveSlots();
      }
    });
  });
}

// 显示成就
function showAchievements() {
  closeGameMenu();
  showAchievementPanel();
}

// 返回标题
function quitToTitle() {
  if (confirm("确定要返回标题吗？未保存的进度将丢失！")) {
    closeGameMenu();
    k.go("start");
  }
}

// 检查是否打开
export function isSaveMenuOpen() {
  return saveMenuOpen;
}
