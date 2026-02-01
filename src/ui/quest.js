// 任务UI系统
import { k } from "../kaboomCtx";
import { getActiveQuests, getCurrentMainQuest, completeQuest, isQuestComplete } from "../quest/questSystem";

// 任务面板状态
let questPanelOpen = false;

// 创建任务UI
export function createQuestUI() {
  const html = `
    <div id="quest-panel" style="
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 450px;
      max-height: 70vh;
      background: linear-gradient(180deg, #2a1a2a 0%, #1a0a1a 100%);
      border: 3px solid #a855f7;
      border-radius: 12px;
      padding: 20px;
      z-index: 1000;
      color: white;
      font-family: 'Microsoft YaHei', sans-serif;
      box-shadow: 0 0 30px rgba(168, 85, 247, 0.5);
    ">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h2 style="margin: 0; color: #c084fc;">任务日志</h2>
        <button id="btn-quest-close" style="
          padding: 5px 15px;
          background: #6b7280;
          border: none;
          border-radius: 4px;
          color: white;
          cursor: pointer;
        ">关闭 (Q)</button>
      </div>
      
      <!-- 主线任务 -->
      <div style="margin-bottom: 20px;">
        <h4 style="margin: 0 0 10px 0; color: #fbbf24; display: flex; align-items: center;">
          ⭐ 主线任务
        </h4>
        <div id="main-quest" style="
          padding: 12px;
          background: #3a2a3a;
          border-radius: 8px;
          border-left: 4px solid #fbbf24;
        "></div>
      </div>
      
      <!-- 支线任务 -->
      <div>
        <h4 style="margin: 0 0 10px 0; color: #22d3ee;">📋 支线任务</h4>
        <div id="side-quests" style="
          max-height: 200px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        "></div>
      </div>
    </div>
    
    <!-- 任务追踪器 (屏幕角落) -->
    <div id="quest-tracker" style="
      position: fixed;
      top: 120px;
      right: 10px;
      width: 200px;
      background: rgba(30, 20, 40, 0.9);
      border: 2px solid #a855f7;
      border-radius: 8px;
      padding: 10px;
      z-index: 100;
      color: white;
      font-family: 'Microsoft YaHei', sans-serif;
      font-size: 12px;
      display: none;
    ">
      <div style="color: #c084fc; font-weight: bold; margin-bottom: 5px;">当前任务</div>
      <div id="tracker-content"></div>
    </div>
  `;
  
  const container = document.createElement("div");
  container.innerHTML = html;
  document.body.appendChild(container);
  
  // 绑定事件
  document.getElementById("btn-quest-close").addEventListener("click", toggleQuestPanel);
  
  // Q键切换任务面板
  k.onKeyPress("q", () => {
    toggleQuestPanel();
  });
}

// 切换任务面板
export function toggleQuestPanel() {
  questPanelOpen = !questPanelOpen;
  const panel = document.getElementById("quest-panel");
  
  if (panel) {
    panel.style.display = questPanelOpen ? "block" : "none";
    
    if (questPanelOpen) {
      refreshQuestPanel();
    }
  }
}

// 刷新任务面板
function refreshQuestPanel() {
  const mainQuestEl = document.getElementById("main-quest");
  const sideQuestsEl = document.getElementById("side-quests");
  
  // 主线任务
  if (mainQuestEl) {
    const mainQuest = getCurrentMainQuest();
    if (mainQuest) {
      const complete = isQuestComplete(mainQuest.id);
      mainQuestEl.innerHTML = `
        <div style="font-weight: bold; color: ${complete ? "#22c55e" : "#fbbf24"}; margin-bottom: 5px;">
          ${mainQuest.name} ${complete ? "✓" : ""}
        </div>
        <div style="color: #d1d5db; font-size: 13px; margin-bottom: 8px;">
          ${mainQuest.description}
        </div>
        <div style="font-size: 12px;">
          ${renderObjectives(mainQuest)}
        </div>
        ${complete ? `
          <button onclick="window.completeMainQuest('${mainQuest.id}')" style="
            margin-top: 10px;
            padding: 5px 15px;
            background: #22c55e;
            border: none;
            border-radius: 4px;
            color: white;
            cursor: pointer;
          ">完成任务</button>
        ` : ""}
      `;
    } else {
      mainQuestEl.innerHTML = `<div style="color: #9ca3af;">已完成所有主线任务！</div>`;
    }
  }
  
  // 支线任务
  if (sideQuestsEl) {
    const quests = getActiveQuests().filter(q => q.type === "side");
    
    if (quests.length === 0) {
      sideQuestsEl.innerHTML = `<div style="color: #9ca3af; text-align: center;">暂无支线任务</div>`;
    } else {
      sideQuestsEl.innerHTML = quests.map(quest => {
        const complete = quest.progress.every(p => p.completed);
        return `
          <div style="
            padding: 10px;
            background: #2a2a3a;
            border-radius: 6px;
            border-left: 3px solid ${complete ? "#22c55e" : "#22d3ee"};
          ">
            <div style="font-weight: bold; color: ${complete ? "#22c55e" : "#22d3ee"};">
              ${quest.name} ${complete ? "✓" : ""}
            </div>
            <div style="color: #d1d5db; font-size: 12px; margin: 5px 0;">
              ${quest.description}
            </div>
            <div style="font-size: 11px;">
              ${renderObjectives(quest)}
            </div>
          </div>
        `;
      }).join("");
    }
  }
}

// 渲染任务目标
function renderObjectives(quest) {
  if (!quest.objectives) return "";
  
  return quest.objectives.map(obj => {
    const current = obj.current || 0;
    const complete = current >= obj.count;
    const color = complete ? "#22c55e" : "#9ca3af";
    
    let text = "";
    switch (obj.type) {
      case "talk":
        text = `与 ${obj.target} 对话`;
        break;
      case "kill":
        text = `击败 ${obj.target}`;
        break;
      case "collect":
        text = `收集 ${obj.target}`;
        break;
      case "deliver":
        text = `交付给 ${obj.target}`;
        break;
      case "fish":
        text = `钓鱼`;
        break;
      default:
        text = obj.type;
    }
    
    return `<div style="color: ${color};">${complete ? "✓" : "○"} ${text} (${current}/${obj.count})</div>`;
  }).join("");
}

// 显示任务追踪器
export function showQuestTracker() {
  const tracker = document.getElementById("quest-tracker");
  if (tracker) {
    tracker.style.display = "block";
    updateQuestTracker();
  }
}

// 隐藏任务追踪器
export function hideQuestTracker() {
  const tracker = document.getElementById("quest-tracker");
  if (tracker) {
    tracker.style.display = "none";
  }
}

// 更新任务追踪器
export function updateQuestTracker() {
  const content = document.getElementById("tracker-content");
  if (!content) return;
  
  const mainQuest = getCurrentMainQuest();
  if (!mainQuest) {
    content.innerHTML = `<div style="color: #9ca3af;">无活跃任务</div>`;
    return;
  }
  
  content.innerHTML = `
    <div style="color: #fbbf24; margin-bottom: 3px;">${mainQuest.name}</div>
    ${mainQuest.objectives.map(obj => {
      const current = obj.current || 0;
      const complete = current >= obj.count;
      return `<div style="color: ${complete ? "#22c55e" : "#d1d5db"};">
        ${complete ? "✓" : "•"} ${current}/${obj.count}
      </div>`;
    }).join("")}
  `;
}

// 全局函数 - 完成主线任务
window.completeMainQuest = function(questId) {
  const rewards = completeQuest(questId);
  if (rewards) {
    alert(`任务完成！\n获得: ${rewards.exp} 经验, ${rewards.gold} 金币`);
    refreshQuestPanel();
    updateQuestTracker();
  }
};

// 检查任务面板是否打开
export function isQuestPanelOpen() {
  return questPanelOpen;
}
