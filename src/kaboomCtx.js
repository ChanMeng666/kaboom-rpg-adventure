import kaboom from "kaboom";

export const k = kaboom({
  global: false,
  touchToMouse: true,
  canvas: document.getElementById("game"),
  debug: false,
  background: [49, 16, 71], // 紫色背景 #311047 (与示例项目一致)
});
