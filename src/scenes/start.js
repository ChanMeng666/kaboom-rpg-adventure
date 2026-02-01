// 开始场景模块
import { k } from "../kaboomCtx";
import { showStartScreen, hideStartScreen } from "../utils";

// 创建开始场景
export function createStartScene() {
  k.scene("start", () => {
    // 显示开始界面 UI
    showStartScreen();
    
    // 设置背景
    k.setBackground(k.Color.fromHex("#1a1a2e"));
    
    // 添加背景动画效果 - 漂浮的粒子
    for (let i = 0; i < 20; i++) {
      createFloatingParticle();
    }
    
    // 开始按钮点击事件
    const startButton = document.getElementById("start-button");
    const handleStart = () => {
      hideStartScreen();
      k.go("world");
    };
    
    if (startButton) {
      startButton.addEventListener("click", handleStart);
    }
    
    // 空格键开始游戏
    k.onKeyPress("space", () => {
      hideStartScreen();
      k.go("world");
    });
    
    // Enter 键开始游戏
    k.onKeyPress("enter", () => {
      hideStartScreen();
      k.go("world");
    });
    
    // 场景清理
    k.onSceneLeave(() => {
      if (startButton) {
        startButton.removeEventListener("click", handleStart);
      }
    });
  });
}

// 创建漂浮粒子效果
function createFloatingParticle() {
  const colors = [
    k.Color.fromHex("#6366f1"),
    k.Color.fromHex("#818cf8"),
    k.Color.fromHex("#4f46e5"),
    k.Color.fromHex("#a5b4fc"),
  ];
  
  const particle = k.add([
    k.rect(k.rand(2, 6), k.rand(2, 6)),
    k.pos(k.rand(0, k.width()), k.rand(0, k.height())),
    k.color(colors[Math.floor(Math.random() * colors.length)]),
    k.opacity(k.rand(0.2, 0.6)),
    k.z(-1),
    {
      speed: k.rand(10, 30),
      wobble: k.rand(0.5, 2),
      wobbleSpeed: k.rand(1, 3),
      time: k.rand(0, Math.PI * 2),
    },
    "particle",
  ]);
  
  particle.onUpdate(() => {
    particle.time += k.dt() * particle.wobbleSpeed;
    particle.pos.y -= particle.speed * k.dt();
    particle.pos.x += Math.sin(particle.time) * particle.wobble * k.dt() * 10;
    
    // 当粒子移出屏幕顶部时，重置到底部
    if (particle.pos.y < -10) {
      particle.pos.y = k.height() + 10;
      particle.pos.x = k.rand(0, k.width());
    }
  });
}
