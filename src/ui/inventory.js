// 背包UI系统
import { k } from "../kaboomCtx";
import { gameState, removeFromInventory, equipItem, healPlayer, restoreMana } from "../gameState";
import { updateUI } from "../uiHelpers";

// 背包状态
let inventoryOpen = false;
let selectedSlot = 0;

// 物品数据
const ITEM_DATA = {
  // 消耗品
  hpPotion: { name: "红药水", desc: "恢复30点HP", price: 20, effect: { type: "heal", amount: 30 } },
  mpPotion: { name: "蓝药水", desc: "恢复20点MP", price: 30, effect: { type: "mana", amount: 20 } },
  speedPotion: {
    name: "绿药水",
    desc: "暂时提升移动速度",
    price: 50,
    effect: { type: "speed", duration: 30 },
  },

  // 材料
  mushroom_red: { name: "红蘑菇", desc: "森林中的普通蘑菇", price: 5 },
  mushroom_brown: { name: "棕蘑菇", desc: "森林中的普通蘑菇", price: 5 },
  mushroom_purple: { name: "紫蘑菇", desc: "稀有的蘑菇，有魔力", price: 15 },
  mushroom_blue: { name: "蓝蘑菇", desc: "稀有的蘑菇，有魔力", price: 15 },
  herb_red: { name: "红草药", desc: "制作药水的材料", price: 10 },
  herb_yellow: { name: "黄草药", desc: "制作药水的材料", price: 10 },
  herb_pink: { name: "粉草药", desc: "制作药水的材料", price: 12 },
  herb_orange: { name: "橙草药", desc: "制作药水的材料", price: 12 },

  // 矿石
  ore_copper: { name: "铜矿石", desc: "普通的铜矿", price: 15 },
  ore_iron: { name: "铁矿石", desc: "坚硬的铁矿", price: 30 },
  ore_gold: { name: "金矿石", desc: "珍贵的金矿", price: 80 },
  ore_gem: { name: "宝石矿", desc: "闪耀的宝石原石", price: 150 },

  // 宝石
  gemRed: { name: "红宝石", desc: "美丽的红宝石", price: 100 },
  gemBlue: { name: "蓝宝石", desc: "清澈的蓝宝石", price: 100 },
  gemGreen: { name: "绿宝石", desc: "翠绿的绿宝石", price: 100 },
  gemYellow: { name: "黄宝石", desc: "璀璨的黄宝石", price: 100 },

  // 钥匙
  keyBronze: { name: "铜钥匙", desc: "打开普通宝箱", price: 50 },
  keySilver: { name: "银钥匙", desc: "打开银宝箱", price: 100 },
  keyGold: { name: "金钥匙", desc: "打开金宝箱", price: 200 },

  // 彩蛋
  egg_blue: { name: "蓝色彩蛋", desc: "神秘的彩蛋", price: 30 },
  egg_green: { name: "绿色彩蛋", desc: "神秘的彩蛋", price: 30 },
  egg_purple: { name: "紫色彩蛋", desc: "神秘的彩蛋", price: 30 },
  egg_yellow: { name: "黄色彩蛋", desc: "神秘的彩蛋", price: 30 },
  egg_red: { name: "红色彩蛋", desc: "神秘的彩蛋", price: 30 },
  egg_orange: { name: "橙色彩蛋", desc: "神秘的彩蛋", price: 30 },

  // 武器
  sword: { name: "铁剑", desc: "攻击力 +5", price: 100, equip: { slot: "weapon", atk: 5 } },
  swordGold: { name: "金剑", desc: "攻击力 +15", price: 500, equip: { slot: "weapon", atk: 15 } },
  axe: { name: "战斧", desc: "攻击力 +8", price: 150, equip: { slot: "weapon", atk: 8 } },

  // 防具
  shield: { name: "铁盾", desc: "防御力 +5", price: 100, equip: { slot: "shield", def: 5 } },
  shieldGold: { name: "金盾", desc: "防御力 +15", price: 500, equip: { slot: "shield", def: 15 } },
};

// 获取物品数据
export function getItemData(itemType) {
  return ITEM_DATA[itemType] || { name: "未知物品", desc: "???" };
}

// 创建背包UI
export function createInventoryUI() {
  // 使用HTML创建背包界面
  const html = `
    <div id="inventory-panel" style="
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      max-height: 80vh;
      background: linear-gradient(180deg, #2a1a3a 0%, #1a0a2a 100%);
      border: 3px solid #8b5cf6;
      border-radius: 12px;
      padding: 20px;
      z-index: 1000;
      color: white;
      font-family: 'Microsoft YaHei', sans-serif;
      box-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
    ">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h2 style="margin: 0; color: #fbbf24;">背包</h2>
        <span id="inventory-gold" style="color: #fcd34d;">💰 0 金币</span>
      </div>
      
      <div style="display: flex; gap: 20px;">
        <!-- 物品格子区 -->
        <div style="flex: 1;">
          <div id="inventory-grid" style="
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 8px;
          "></div>
        </div>
        
        <!-- 装备区 -->
        <div style="width: 140px;">
          <h4 style="margin: 0 0 10px 0; color: #a78bfa;">装备栏</h4>
          <div id="equipment-slots" style="display: flex; flex-direction: column; gap: 8px;">
            <div class="equip-slot" data-slot="weapon" style="
              width: 100%;
              height: 50px;
              background: #3a2a4a;
              border: 2px solid #6b21a8;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              color: #9ca3af;
            ">武器: 无</div>
            <div class="equip-slot" data-slot="shield" style="
              width: 100%;
              height: 50px;
              background: #3a2a4a;
              border: 2px solid #6b21a8;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              color: #9ca3af;
            ">盾牌: 无</div>
            <div class="equip-slot" data-slot="accessory" style="
              width: 100%;
              height: 50px;
              background: #3a2a4a;
              border: 2px solid #6b21a8;
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              color: #9ca3af;
            ">饰品: 无</div>
          </div>
        </div>
      </div>
      
      <!-- 物品详情 -->
      <div id="item-detail" style="
        margin-top: 15px;
        padding: 10px;
        background: #3a2a4a;
        border-radius: 8px;
        min-height: 60px;
      ">
        <p style="margin: 0; color: #9ca3af;">选择物品查看详情</p>
      </div>
      
      <!-- 操作按钮 -->
      <div style="margin-top: 15px; display: flex; gap: 10px;">
        <button id="btn-use" style="
          flex: 1;
          padding: 10px;
          background: #22c55e;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 14px;
        ">使用</button>
        <button id="btn-drop" style="
          flex: 1;
          padding: 10px;
          background: #ef4444;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 14px;
        ">丢弃</button>
        <button id="btn-close" style="
          flex: 1;
          padding: 10px;
          background: #6b7280;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 14px;
        ">关闭 (I)</button>
      </div>
    </div>
  `;

  // 添加到页面
  const container = document.createElement("div");
  container.innerHTML = html;
  document.body.appendChild(container);

  // 绑定事件
  document.getElementById("btn-close").addEventListener("click", toggleInventory);
  document.getElementById("btn-use").addEventListener("click", useSelectedItem);
  document.getElementById("btn-drop").addEventListener("click", dropSelectedItem);

  // 键盘事件
  k.onKeyPress("i", () => {
    toggleInventory();
  });

  k.onKeyPress("tab", () => {
    toggleInventory();
  });
}

// 切换背包显示
export function toggleInventory() {
  inventoryOpen = !inventoryOpen;
  const panel = document.getElementById("inventory-panel");

  if (panel) {
    panel.style.display = inventoryOpen ? "block" : "none";

    if (inventoryOpen) {
      refreshInventoryUI();
    }
  }
}

// 刷新背包UI
export function refreshInventoryUI() {
  const grid = document.getElementById("inventory-grid");
  const goldDisplay = document.getElementById("inventory-gold");

  if (!grid) return;

  // 更新金币
  if (goldDisplay) {
    goldDisplay.textContent = `💰 ${gameState.player.gold} 金币`;
  }

  // 清空格子
  grid.innerHTML = "";

  // 创建20个格子
  for (let i = 0; i < 20; i++) {
    const slot = document.createElement("div");
    slot.className = "inventory-slot";
    slot.dataset.index = i;
    slot.style.cssText = `
      width: 50px;
      height: 50px;
      background: ${i === selectedSlot ? "#4a3a6a" : "#3a2a4a"};
      border: 2px solid ${i === selectedSlot ? "#8b5cf6" : "#6b21a8"};
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 12px;
      color: #9ca3af;
    `;

    const item = gameState.inventory[i];
    if (item) {
      const itemData = getItemData(item.type);
      slot.innerHTML = `<span title="${itemData.name}">${getItemEmoji(item.type)}</span>`;
      slot.style.color = "#fbbf24";
    }

    slot.addEventListener("click", () => selectSlot(i));
    grid.appendChild(slot);
  }

  // 更新装备栏
  updateEquipmentUI();

  // 更新物品详情
  updateItemDetail();
}

// 选择格子
function selectSlot(index) {
  selectedSlot = index;
  refreshInventoryUI();
}

// 更新装备栏UI
function updateEquipmentUI() {
  const slots = document.querySelectorAll(".equip-slot");

  slots.forEach((slot) => {
    const slotType = slot.dataset.slot;
    const equipped = gameState.equipment[slotType];

    if (equipped) {
      const itemData = getItemData(equipped.type);
      slot.textContent = `${getSlotName(slotType)}: ${itemData.name}`;
      slot.style.color = "#fbbf24";
    } else {
      slot.textContent = `${getSlotName(slotType)}: 无`;
      slot.style.color = "#9ca3af";
    }
  });
}

// 获取装备栏名称
function getSlotName(slot) {
  const names = { weapon: "武器", shield: "盾牌", accessory: "饰品" };
  return names[slot] || slot;
}

// 更新物品详情
function updateItemDetail() {
  const detail = document.getElementById("item-detail");
  const item = gameState.inventory[selectedSlot];

  if (!detail) return;

  if (item) {
    const itemData = getItemData(item.type);
    detail.innerHTML = `
      <h4 style="margin: 0 0 5px 0; color: #fbbf24;">${itemData.name}</h4>
      <p style="margin: 0; color: #d1d5db; font-size: 13px;">${itemData.desc}</p>
      <p style="margin: 5px 0 0 0; color: #fcd34d; font-size: 12px;">售价: ${itemData.price || 0} 金币</p>
    `;
  } else {
    detail.innerHTML = `<p style="margin: 0; color: #9ca3af;">选择物品查看详情</p>`;
  }
}

// 使用物品
function useSelectedItem() {
  const item = gameState.inventory[selectedSlot];
  if (!item) return;

  const itemData = getItemData(item.type);

  // 如果是装备，则装备它
  if (itemData.equip) {
    const oldItem = equipItem(removeFromInventory(selectedSlot), itemData.equip.slot);
    if (oldItem) {
      // 如果背包有空位，放回旧装备
    }
    refreshInventoryUI();
    return;
  }

  // 如果是消耗品，使用它
  if (itemData.effect) {
    switch (itemData.effect.type) {
      case "heal":
        healPlayer(itemData.effect.amount);
        break;
      case "mana":
        restoreMana(itemData.effect.amount);
        break;
    }

    removeFromInventory(selectedSlot);
    refreshInventoryUI();

    // 更新主UI
    updateUI();
  }
}

// 丢弃物品
function dropSelectedItem() {
  const item = gameState.inventory[selectedSlot];
  if (!item) return;

  if (confirm(`确定要丢弃 ${getItemData(item.type).name} 吗？`)) {
    removeFromInventory(selectedSlot);
    refreshInventoryUI();
  }
}

// 获取物品表情符号 (用于简单显示)
function getItemEmoji(itemType) {
  const emojis = {
    hpPotion: "🧪",
    mpPotion: "🧪",
    speedPotion: "🧪",
    sword: "⚔️",
    swordGold: "⚔️",
    axe: "🪓",
    shield: "🛡️",
    shieldGold: "🛡️",
    keyBronze: "🔑",
    keySilver: "🔑",
    keyGold: "🔑",
    gemRed: "💎",
    gemBlue: "💎",
    gemGreen: "💎",
    gemYellow: "💎",
    coin: "🪙",
    coinStack: "🪙",
    mushroom_red: "🍄",
    mushroom_brown: "🍄",
    mushroom_purple: "🍄",
    mushroom_blue: "🍄",
    herb_red: "🌿",
    herb_yellow: "🌿",
    herb_pink: "🌿",
    herb_orange: "🌿",
    ore_copper: "🪨",
    ore_iron: "🪨",
    ore_gold: "🪨",
    ore_gem: "🪨",
    egg_blue: "🥚",
    egg_green: "🥚",
    egg_purple: "🥚",
    egg_yellow: "🥚",
    egg_red: "🥚",
    egg_orange: "🥚",
  };
  return emojis[itemType] || "📦";
}

// 检查背包是否打开
export function isInventoryOpen() {
  return inventoryOpen;
}
