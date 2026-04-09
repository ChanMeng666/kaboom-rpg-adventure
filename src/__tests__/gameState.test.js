import { describe, it, expect, beforeEach } from "vitest";
import {
  gameState,
  healPlayer,
  restoreMana,
  addGold,
  spendGold,
  addExp,
  addToInventory,
  removeFromInventory,
  hasItem,
  countItem,
  equipItem,
  unequipItem,
  applyDeathPenalty,
  spendMana,
  takeDamage,
  fullRestore,
  resetGame,
} from "../gameState.js";

beforeEach(() => {
  resetGame();
});

describe("healPlayer", () => {
  it("heals up to maxHp", () => {
    gameState.player.hp = 50;
    healPlayer(30);
    expect(gameState.player.hp).toBe(80);
  });

  it("does not exceed maxHp", () => {
    gameState.player.hp = 90;
    healPlayer(30);
    expect(gameState.player.hp).toBe(gameState.player.maxHp);
  });
});

describe("restoreMana", () => {
  it("restores up to maxMp", () => {
    gameState.player.mp = 20;
    restoreMana(15);
    expect(gameState.player.mp).toBe(35);
  });

  it("does not exceed maxMp", () => {
    gameState.player.mp = 45;
    restoreMana(20);
    expect(gameState.player.mp).toBe(gameState.player.maxMp);
  });
});

describe("addGold / spendGold", () => {
  it("adds gold and tracks stats", () => {
    addGold(100);
    expect(gameState.player.gold).toBe(100);
    expect(gameState.stats.goldEarned).toBe(100);
  });

  it("spends gold when sufficient", () => {
    addGold(100);
    expect(spendGold(60)).toBe(true);
    expect(gameState.player.gold).toBe(40);
  });

  it("rejects spending when insufficient", () => {
    addGold(30);
    expect(spendGold(50)).toBe(false);
    expect(gameState.player.gold).toBe(30);
  });
});

describe("addExp / leveling", () => {
  it("adds experience", () => {
    addExp(50);
    expect(gameState.player.exp).toBe(50);
  });

  it("levels up when exp exceeds threshold", () => {
    addExp(150); // expToLevel starts at 100
    expect(gameState.player.level).toBe(2);
    expect(gameState.player.exp).toBe(50);
  });

  it("increases stats on level up", () => {
    const prevMaxHp = gameState.player.maxHp;
    const prevMaxMp = gameState.player.maxMp;
    addExp(100);
    expect(gameState.player.maxHp).toBeGreaterThan(prevMaxHp);
    expect(gameState.player.maxMp).toBeGreaterThan(prevMaxMp);
    expect(gameState.player.hp).toBe(gameState.player.maxHp);
    expect(gameState.player.mp).toBe(gameState.player.maxMp);
  });

  it("handles multiple level ups at once", () => {
    addExp(500);
    expect(gameState.player.level).toBeGreaterThan(2);
  });
});

describe("takeDamage / spendMana", () => {
  it("reduces hp to minimum 0", () => {
    takeDamage(200);
    expect(gameState.player.hp).toBe(0);
  });

  it("reduces hp by exact amount", () => {
    takeDamage(30);
    expect(gameState.player.hp).toBe(70);
  });

  it("spends mana when sufficient", () => {
    expect(spendMana(20)).toBe(true);
    expect(gameState.player.mp).toBe(30);
  });

  it("rejects spending mana when insufficient", () => {
    expect(spendMana(100)).toBe(false);
    expect(gameState.player.mp).toBe(50);
  });
});

describe("fullRestore", () => {
  it("restores hp and mp to max", () => {
    gameState.player.hp = 10;
    gameState.player.mp = 5;
    fullRestore();
    expect(gameState.player.hp).toBe(gameState.player.maxHp);
    expect(gameState.player.mp).toBe(gameState.player.maxMp);
  });
});

describe("applyDeathPenalty", () => {
  it("halves gold and sets hp/mp to 30%", () => {
    addGold(200);
    applyDeathPenalty();
    expect(gameState.player.gold).toBe(100);
    expect(gameState.player.hp).toBe(Math.floor(gameState.player.maxHp * 0.3));
    expect(gameState.player.mp).toBe(Math.floor(gameState.player.maxMp * 0.3));
  });
});

describe("inventory", () => {
  it("adds items up to max capacity", () => {
    expect(addToInventory({ type: "sword", name: "sword" })).toBe(true);
    expect(gameState.inventory).toHaveLength(1);
    expect(gameState.stats.itemsCollected).toBe(1);
  });

  it("rejects when inventory is full", () => {
    for (let i = 0; i < 20; i++) {
      addToInventory({ type: `item_${i}`, name: `item_${i}` });
    }
    expect(addToInventory({ type: "extra", name: "extra" })).toBe(false);
    expect(gameState.inventory).toHaveLength(20);
  });

  it("removes items by index", () => {
    addToInventory({ type: "potion", name: "potion" });
    const removed = removeFromInventory(0);
    expect(removed.type).toBe("potion");
    expect(gameState.inventory).toHaveLength(0);
  });

  it("checks item existence", () => {
    addToInventory({ type: "key", name: "key" });
    expect(hasItem("key")).toBe(true);
    expect(hasItem("sword")).toBe(false);
  });

  it("counts items by type", () => {
    addToInventory({ type: "potion", name: "potion" });
    addToInventory({ type: "potion", name: "potion" });
    addToInventory({ type: "key", name: "key" });
    expect(countItem("potion")).toBe(2);
    expect(countItem("key")).toBe(1);
  });
});

describe("equipment", () => {
  it("equips items in slots", () => {
    const item = { type: "sword", name: "Iron Sword" };
    equipItem(item, "weapon");
    expect(gameState.equipment.weapon).toBe(item);
  });

  it("returns old item when replacing", () => {
    const sword1 = { type: "sword", name: "Iron Sword" };
    const sword2 = { type: "goldSword", name: "Gold Sword" };
    equipItem(sword1, "weapon");
    equipItem(sword2, "weapon");
    expect(gameState.equipment.weapon).toBe(sword2);
    // old item should be in inventory
    expect(gameState.inventory.some((i) => i.type === "sword")).toBe(true);
  });

  it("unequips to inventory", () => {
    equipItem({ type: "shield", name: "Shield" }, "shield");
    const removed = unequipItem("shield");
    expect(removed.type).toBe("shield");
    expect(gameState.equipment.shield).toBeNull();
  });
});

describe("resetGame", () => {
  it("resets all state", () => {
    addGold(500);
    addExp(200);
    addToInventory({ type: "item", name: "item" });
    resetGame();

    expect(gameState.player.gold).toBe(0);
    expect(gameState.player.level).toBe(1);
    expect(gameState.inventory).toHaveLength(0);
    expect(gameState.currentArea).toBe("village");
  });
});
