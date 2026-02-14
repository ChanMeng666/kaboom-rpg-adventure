// 地图管理模块 - 所有区域的地图数据
import { SAND_TILES, GRASS_TILES, BLUE_TILES, GOLD_TILES } from "../sprites";
import { TILE_TYPES } from "./tileTypes";

// 重新导出 TILE_TYPES
export { TILE_TYPES } from "./tileTypes";

// 水面使用 BLUE_TILES (精灵表中无专用水面瓦片，原 WATER_TILES 是彩虹条纹)
export const TILE_FRAMES = {
  [TILE_TYPES.GRASS]: GRASS_TILES.center,     // 157
  [TILE_TYPES.SAND]: SAND_TILES.center,       // 40
  [TILE_TYPES.PATH]: GOLD_TILES.center,       // 67
  [TILE_TYPES.WATER_SHALLOW]: BLUE_TILES.center, // 163 - 蓝色地面作为浅水
  [TILE_TYPES.WATER_DEEP]: BLUE_TILES.top,    // 124 - 深色蓝色作为深水
  [TILE_TYPES.BLUE]: BLUE_TILES.center,       // 163
  [TILE_TYPES.WOOD]: SAND_TILES.center,       // 40
};

// 区域传送点定义
export const AREA_PORTALS = {
  village: [
    { x: 0, y: 12, targetArea: "forest", targetX: 28, targetY: 12, direction: "left" },
    { x: 29, y: 12, targetArea: "castle", targetX: 1, targetY: 12, direction: "right" },
    { x: 15, y: 0, targetArea: "mine", targetX: 15, targetY: 23, direction: "up" },
    { x: 15, y: 24, targetArea: "lake", targetX: 15, targetY: 1, direction: "down" },
  ],
  forest: [
    { x: 29, y: 12, targetArea: "village", targetX: 1, targetY: 12, direction: "right" },
  ],
  lake: [
    { x: 15, y: 0, targetArea: "village", targetX: 15, targetY: 23, direction: "up" },
  ],
  mine: [
    { x: 15, y: 24, targetArea: "village", targetX: 15, targetY: 1, direction: "down" },
  ],
  castle: [
    { x: 0, y: 12, targetArea: "village", targetX: 28, targetY: 12, direction: "left" },
  ],
};

// 导出所有地图
export { VILLAGE_MAP, VILLAGE_OBJECTS } from "./village";
export { FOREST_MAP, FOREST_OBJECTS } from "./forest";
export { LAKE_MAP, LAKE_OBJECTS } from "./lake";
export { MINE_MAP, MINE_OBJECTS } from "./mine";
export { CASTLE_MAP, CASTLE_OBJECTS } from "./castle";
