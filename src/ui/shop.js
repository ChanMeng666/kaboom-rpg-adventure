// 商店UI系统
import { gameState, addToInventory, spendGold, fullRestore, addGold } from "../gameState";
import { updateUI } from "../uiHelpers";
import { getItemData } from "./inventory";

// 商店状态
let shopOpen = false;
let shopType = "general";
let selectedItem = null;

// 商店商品定义
const SHOP_INVENTORY = {
  // 杂货店
  general: [
    { type: "hpPotion", price: 20, stock: 99 },
    { type: "mpPotion", price: 30, stock: 99 },
    { type: "speedPotion", price: 50, stock: 20 },
    { type: "keyBronze", price: 50, stock: 10 },
    { type: "keySilver", price: 100, stock: 5 },
  ],

  // 铁匠铺
  smithy: [
    { type: "sword", price: 100, stock: 5 },
    { type: "shield", price: 100, stock: 5 },
    { type: "axe", price: 150, stock: 3 },
    { type: "swordGold", price: 500, stock: 1 },
    { type: "shieldGold", price: 500, stock: 1 },
  ],

  // 旅店
  inn: [
    { type: "rest", price: 10, stock: 99, special: true, name: "休息", desc: "完全恢复HP和MP" },
  ],
};

// 创建商店UI
export function createShopUI() {
  const html = `
    <div id="shop-panel" style="
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      max-height: 80vh;
      background: linear-gradient(180deg, #1a2a1a 0%, #0a150a 100%);
      border: 3px solid #22c55e;
      border-radius: 12px;
      padding: 20px;
      z-index: 1000;
      color: white;
      font-family: 'Microsoft YaHei', sans-serif;
      box-shadow: 0 0 30px rgba(34, 197, 94, 0.5);
    ">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h2 id="shop-title" style="margin: 0; color: #4ade80;">商店</h2>
        <span id="shop-gold" style="color: #fcd34d;">💰 0 金币</span>
      </div>
      
      <div style="display: flex; gap: 20px;">
        <!-- 商品列表 -->
        <div style="flex: 1;">
          <h4 style="margin: 0 0 10px 0; color: #86efac;">商品</h4>
          <div id="shop-items" style="
            max-height: 300px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 8px;
          "></div>
        </div>
        
        <!-- 商品详情 -->
        <div style="width: 200px;">
          <h4 style="margin: 0 0 10px 0; color: #86efac;">详情</h4>
          <div id="shop-detail" style="
            padding: 10px;
            background: #2a3a2a;
            border-radius: 8px;
            min-height: 120px;
          ">
            <p style="margin: 0; color: #9ca3af;">选择商品查看详情</p>
          </div>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div style="margin-top: 15px; display: flex; gap: 10px;">
        <button id="btn-buy" style="
          flex: 1;
          padding: 12px;
          background: #22c55e;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
        " disabled>购买</button>
        <button id="btn-sell" style="
          flex: 1;
          padding: 12px;
          background: #eab308;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
        ">出售物品</button>
        <button id="btn-shop-close" style="
          padding: 12px 24px;
          background: #6b7280;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 16px;
        ">关闭</button>
      </div>
    </div>
    
    <!-- 出售面板 -->
    <div id="sell-panel" style="
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      max-height: 70vh;
      background: linear-gradient(180deg, #2a2a1a 0%, #151510 100%);
      border: 3px solid #eab308;
      border-radius: 12px;
      padding: 20px;
      z-index: 1001;
      color: white;
      font-family: 'Microsoft YaHei', sans-serif;
    ">
      <h3 style="margin: 0 0 15px 0; color: #fcd34d;">出售物品</h3>
      <div id="sell-items" style="
        max-height: 250px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 8px;
      "></div>
      <button id="btn-sell-close" style="
        margin-top: 15px;
        width: 100%;
        padding: 10px;
        background: #6b7280;
        border: none;
        border-radius: 6px;
        color: white;
        cursor: pointer;
      ">返回</button>
    </div>
  `;

  const container = document.createElement("div");
  container.innerHTML = html;
  document.body.appendChild(container);

  // 绑定事件
  document.getElementById("btn-shop-close").addEventListener("click", closeShop);
  document.getElementById("btn-buy").addEventListener("click", buySelectedItem);
  document.getElementById("btn-sell").addEventListener("click", openSellPanel);
  document.getElementById("btn-sell-close").addEventListener("click", closeSellPanel);
}

// 打开商店
export function openShop(type = "general", title = "商店") {
  shopType = type;
  shopOpen = true;
  selectedItem = null;

  const panel = document.getElementById("shop-panel");
  const titleEl = document.getElementById("shop-title");

  if (panel) {
    panel.style.display = "block";
  }
  if (titleEl) {
    titleEl.textContent = title;
  }

  refreshShopUI();
}

// 关闭商店
export function closeShop() {
  shopOpen = false;
  selectedItem = null;

  const panel = document.getElementById("shop-panel");
  if (panel) {
    panel.style.display = "none";
  }
}

// 刷新商店UI
function refreshShopUI() {
  const itemsContainer = document.getElementById("shop-items");
  const goldDisplay = document.getElementById("shop-gold");
  const buyBtn = document.getElementById("btn-buy");

  if (goldDisplay) {
    goldDisplay.textContent = `💰 ${gameState.player.gold} 金币`;
  }

  if (!itemsContainer) return;

  itemsContainer.innerHTML = "";

  const items = SHOP_INVENTORY[shopType] || [];

  items.forEach((item, index) => {
    const itemData = item.special ? item : getItemData(item.type);
    const canAfford = gameState.player.gold >= item.price;

    const itemEl = document.createElement("div");
    itemEl.className = "shop-item";
    itemEl.dataset.index = index;
    itemEl.style.cssText = `
      padding: 10px;
      background: ${selectedItem === index ? "#3a4a3a" : "#2a3a2a"};
      border: 2px solid ${selectedItem === index ? "#22c55e" : "#1a2a1a"};
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      opacity: ${canAfford ? 1 : 0.5};
    `;

    itemEl.innerHTML = `
      <span style="color: ${canAfford ? "#4ade80" : "#9ca3af"};">${itemData.name}</span>
      <span style="color: #fcd34d;">${item.price} 💰</span>
    `;

    itemEl.addEventListener("click", () => selectShopItem(index));
    itemsContainer.appendChild(itemEl);
  });

  // 更新购买按钮状态
  if (buyBtn) {
    buyBtn.disabled = selectedItem === null;
  }

  updateShopDetail();
}

// 选择商品
function selectShopItem(index) {
  selectedItem = index;
  refreshShopUI();
}

// 更新商品详情
function updateShopDetail() {
  const detail = document.getElementById("shop-detail");
  if (!detail) return;

  if (selectedItem === null) {
    detail.innerHTML = `<p style="margin: 0; color: #9ca3af;">选择商品查看详情</p>`;
    return;
  }

  const items = SHOP_INVENTORY[shopType] || [];
  const item = items[selectedItem];
  if (!item) return;

  const itemData = item.special ? item : getItemData(item.type);
  const canAfford = gameState.player.gold >= item.price;

  detail.innerHTML = `
    <h4 style="margin: 0 0 8px 0; color: #4ade80;">${itemData.name}</h4>
    <p style="margin: 0 0 8px 0; color: #d1d5db; font-size: 13px;">${itemData.desc}</p>
    <p style="margin: 0; color: #fcd34d;">价格: ${item.price} 金币</p>
    <p style="margin: 5px 0 0 0; color: ${canAfford ? "#4ade80" : "#ef4444"}; font-size: 12px;">
      ${canAfford ? "可以购买" : "金币不足"}
    </p>
  `;
}

// 购买选中商品
function buySelectedItem() {
  if (selectedItem === null) return;

  const items = SHOP_INVENTORY[shopType] || [];
  const item = items[selectedItem];
  if (!item) return;

  // 检查金币
  if (!spendGold(item.price)) {
    alert("金币不足！");
    return;
  }

  // 处理特殊商品
  if (item.special) {
    if (item.type === "rest") {
      fullRestore();
      alert("HP和MP已完全恢复！");
    }
  } else {
    // 添加到背包
    if (!addToInventory({ type: item.type, name: item.type })) {
      // 背包满了，退回金币
      addGold(item.price);
      alert("背包已满！");
      return;
    }
  }

  // 减少库存
  if (item.stock !== 99) {
    item.stock--;
  }

  refreshShopUI();
  updateUI();
}

// 打开出售面板
function openSellPanel() {
  const panel = document.getElementById("sell-panel");
  if (panel) {
    panel.style.display = "block";
    refreshSellPanel();
  }
}

// 关闭出售面板
function closeSellPanel() {
  const panel = document.getElementById("sell-panel");
  if (panel) {
    panel.style.display = "none";
  }
}

// 刷新出售面板
function refreshSellPanel() {
  const container = document.getElementById("sell-items");
  if (!container) return;

  container.innerHTML = "";

  if (gameState.inventory.length === 0) {
    container.innerHTML = `<p style="color: #9ca3af; text-align: center;">背包为空</p>`;
    return;
  }

  gameState.inventory.forEach((item, index) => {
    const itemData = getItemData(item.type);
    const sellPrice = Math.floor((itemData.price || 10) * 0.5);

    const itemEl = document.createElement("div");
    itemEl.style.cssText = `
      padding: 10px;
      background: #3a3a2a;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;

    itemEl.innerHTML = `
      <span style="color: #fcd34d;">${itemData.name}</span>
      <div>
        <span style="color: #9ca3af; margin-right: 10px;">${sellPrice} 💰</span>
        <button class="sell-btn" data-index="${index}" style="
          padding: 5px 10px;
          background: #eab308;
          border: none;
          border-radius: 4px;
          color: white;
          cursor: pointer;
        ">出售</button>
      </div>
    `;

    container.appendChild(itemEl);
  });

  // 绑定出售按钮事件
  container.querySelectorAll(".sell-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.target.dataset.index);
      sellItem(index);
    });
  });
}

// 出售物品
function sellItem(index) {
  const item = gameState.inventory[index];
  if (!item) return;

  const itemData = getItemData(item.type);
  const sellPrice = Math.floor((itemData.price || 10) * 0.5);

  // 移除物品
  gameState.inventory.splice(index, 1);

  // 获得金币
  addGold(sellPrice);

  refreshSellPanel();
  refreshShopUI();
  updateUI();
}

// 检查商店是否打开
export function isShopOpen() {
  return shopOpen;
}
