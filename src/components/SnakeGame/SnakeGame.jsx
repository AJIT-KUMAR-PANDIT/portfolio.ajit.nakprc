"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const CELL = 16;
const COLS = 35;
const ROWS = 28;
const WIDTH = COLS * CELL;
const HEIGHT = ROWS * CELL;
const SPEED_AI = 80;
const SPEED_PLAYER = 110;
const COLORS = {
  bg: "#0a0a0f",
  grid: "#111122",
  snakeHead: "#00ff88",
  snakeBody: "#00cc66",
  snakeTail: "#007744",
  food: "#ff3366",
  foodGlow: "rgba(255,51,102,0.6)",
  text: "#ffffff",
  ui: "rgba(0,255,136,0.15)",
  uiBorder: "rgba(0,255,136,0.4)",
  particle: "#ffdd00",
};

function getRandPos(snake) {
  while (true) {
    const pos = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
    if (!snake.some((s) => s.x === pos.x && s.y === pos.y)) return pos;
  }
}

function nextPos(pos, dir) {
  return {
    x: ((pos.x + dir.x + COLS) % COLS),
    y: ((pos.y + dir.y + ROWS) % ROWS),
  };
}

function isColliding(pos, snake) {
  return snake.some((s) => s.x === pos.x && s.y === pos.y);
}

// Simple AI: BFS toward food, fallback to open space
function bfsDir(snake, food) {
  const head = snake[0];
  const dirs = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ];

  const snakeSet = new Set(snake.map((s) => `${s.x},${s.y}`));
  const queue = [{ pos: head, path: [] }];
  const visited = new Set([`${head.x},${head.y}`]);

  while (queue.length > 0) {
    const { pos, path } = queue.shift();
    for (const d of dirs) {
      const np = nextPos(pos, d);
      const key = `${np.x},${np.y}`;
      if (visited.has(key)) continue;
      if (snakeSet.has(key)) continue;
      visited.add(key);
      const newPath = [...path, d];
      if (np.x === food.x && np.y === food.y) return newPath[0] || d;
      queue.push({ pos: np, path: newPath });
    }
  }

  // Fallback: pick any safe direction
  for (const d of dirs) {
    const np = nextPos(head, d);
    if (!snakeSet.has(`${np.x},${np.y}`)) return d;
  }
  return dirs[0];
}

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const gameRef = useRef({
    snake: [
      { x: 17, y: 14 },
      { x: 16, y: 14 },
      { x: 15, y: 14 },
    ],
    food: { x: 25, y: 14 },
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    score: 0,
    highScore: 0,
    isAI: true,
    alive: true,
    particles: [],
    foodAnim: 0,
    frameCount: 0,
  });
  const animRef = useRef(null);
  const lastTickRef = useRef(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isAI, setIsAI] = useState(true);
  const [alive, setAlive] = useState(true);
  const [mode, setMode] = useState("AI");

  const resetGame = useCallback(() => {
    const g = gameRef.current;
    g.snake = [
      { x: 17, y: 14 },
      { x: 16, y: 14 },
      { x: 15, y: 14 },
    ];
    g.food = getRandPos(g.snake);
    g.dir = { x: 1, y: 0 };
    g.nextDir = { x: 1, y: 0 };
    g.score = 0;
    g.isAI = true;
    g.alive = true;
    g.particles = [];
    g.frameCount = 0;
    setScore(0);
    setIsAI(true);
    setMode("AI");
    setAlive(true);
  }, []);

  const switchToPlayer = useCallback(() => {
    const g = gameRef.current;
    g.isAI = false;
    setIsAI(false);
    setMode("YOU");
  }, []);

  // Keyboard handler
  useEffect(() => {
    const dirMap = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      w: { x: 0, y: -1 },
      s: { x: 0, y: 1 },
      a: { x: -1, y: 0 },
      d: { x: 1, y: 0 },
    };
    const handle = (e) => {
      const g = gameRef.current;
      if (!g.alive) {
        if (e.key === "r" || e.key === "R") resetGame();
        return;
      }
      if (e.key === "r" || e.key === "R") { resetGame(); return; }
      const newDir = dirMap[e.key];
      if (!newDir) return;
      e.preventDefault();
      switchToPlayer();
      // Prevent reversing
      if (newDir.x !== -g.dir.x || newDir.y !== -g.dir.y) {
        g.nextDir = newDir;
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [resetGame, switchToPlayer]);

  // Mouse / touch click on canvas → set direction toward click
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handle = (e) => {
      const g = gameRef.current;
      if (!g.alive) return;
      switchToPlayer();
      const rect = canvas.getBoundingClientRect();
      const scaleX = WIDTH / rect.width;
      const scaleY = HEIGHT / rect.height;
      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top) * scaleY;
      const head = g.snake[0];
      const dx = mx / CELL - head.x;
      const dy = my / CELL - head.y;
      let newDir;
      if (Math.abs(dx) >= Math.abs(dy)) {
        newDir = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 };
      } else {
        newDir = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 };
      }
      if (newDir.x !== -g.dir.x || newDir.y !== -g.dir.y) {
        g.nextDir = newDir;
      }
    };
    canvas.addEventListener("mousedown", handle);
    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      handle(e.touches[0]);
    }, { passive: false });
    return () => {
      canvas.removeEventListener("mousedown", handle);
    };
  }, [switchToPlayer]);

  // Swipe support
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let touchStartX = 0, touchStartY = 0;
    const ts = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    const te = (e) => {
      const g = gameRef.current;
      if (!g.alive) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      switchToPlayer();
      let newDir;
      if (Math.abs(dx) >= Math.abs(dy)) {
        newDir = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 };
      } else {
        newDir = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 };
      }
      const cur = g.dir;
      if (newDir.x !== -cur.x || newDir.y !== -cur.y) g.nextDir = newDir;
    };
    canvas.addEventListener("touchstart", ts, { passive: true });
    canvas.addEventListener("touchend", te, { passive: true });
    return () => {
      canvas.removeEventListener("touchstart", ts);
      canvas.removeEventListener("touchend", te);
    };
  }, [switchToPlayer]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let running = true;

    const spawnParticles = (x, y) => {
      const g = gameRef.current;
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.5;
        const speed = 1.5 + Math.random() * 2;
        g.particles.push({
          x: x * CELL + CELL / 2,
          y: y * CELL + CELL / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.04 + Math.random() * 0.04,
          size: 3 + Math.random() * 4,
          color: [`#ff3366`, `#ffdd00`, `#00ff88`, `#ff9900`][Math.floor(Math.random() * 4)],
        });
      }
    };

    const tick = () => {
      const g = gameRef.current;
      if (!g.alive) return;
      g.dir = g.nextDir;

      if (g.isAI) {
        const aiDir = bfsDir(g.snake, g.food);
        g.dir = aiDir;
        g.nextDir = aiDir;
      }

      const newHead = nextPos(g.snake[0], g.dir);
      // Self-collision (wrapping, so only self)
      if (isColliding(newHead, g.snake)) {
        g.alive = false;
        if (g.score > g.highScore) g.highScore = g.score;
        setAlive(false);
        setHighScore(g.highScore);
        return;
      }

      g.snake.unshift(newHead);
      if (newHead.x === g.food.x && newHead.y === g.food.y) {
        g.score += 10;
        setScore(g.score);
        spawnParticles(g.food.x, g.food.y);
        g.food = getRandPos(g.snake);
      } else {
        g.snake.pop();
      }
    };

    const draw = (now) => {
      if (!running) return;
      animRef.current = requestAnimationFrame(draw);
      const g = gameRef.current;
      g.frameCount++;
      g.foodAnim = (g.foodAnim + 0.08) % (Math.PI * 2);

      const speed = g.isAI ? SPEED_AI : SPEED_PLAYER;
      if (now - lastTickRef.current > speed) {
        lastTickRef.current = now;
        tick();
      }

      // --- Draw ---
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Grid
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= COLS; x++) {
        ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, HEIGHT); ctx.stroke();
      }
      for (let y = 0; y <= ROWS; y++) {
        ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(WIDTH, y * CELL); ctx.stroke();
      }

      // Particles
      g.particles = g.particles.filter((p) => {
        p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        if (p.life <= 0) return false;
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      });

      // Food
      const pulse = Math.sin(g.foodAnim) * 0.3 + 1;
      const fx = g.food.x * CELL + CELL / 2;
      const fy = g.food.y * CELL + CELL / 2;
      ctx.save();
      ctx.shadowColor = COLORS.food;
      ctx.shadowBlur = 20 * pulse;
      // outer glow ring
      ctx.strokeStyle = `rgba(255,51,102,${0.4 * pulse})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(fx, fy, CELL * 0.45 * pulse, 0, Math.PI * 2);
      ctx.stroke();
      // pixel square food
      const fs = CELL * 0.55 * pulse;
      ctx.fillStyle = COLORS.food;
      ctx.fillRect(fx - fs / 2, fy - fs / 2, fs, fs);
      ctx.restore();

      // Snake
      const snake = g.snake;
      for (let i = snake.length - 1; i >= 0; i--) {
        const s = snake[i];
        const t = i / snake.length;
        const r = `${Math.round(0 + t * 0)}`;
        if (i === 0) {
          // Head
          ctx.save();
          ctx.shadowColor = COLORS.snakeHead;
          ctx.shadowBlur = 18;
          ctx.fillStyle = COLORS.snakeHead;
          const hs = CELL - 2;
          ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, hs, hs);
          // Eyes
          ctx.fillStyle = COLORS.bg;
          const ex = g.dir.x, ey = g.dir.y;
          const eyeOff = 3;
          const eyeSize = 2.5;
          if (ex === 1) {
            ctx.fillRect(s.x * CELL + CELL - 5, s.y * CELL + 3, eyeSize, eyeSize);
            ctx.fillRect(s.x * CELL + CELL - 5, s.y * CELL + CELL - 6, eyeSize, eyeSize);
          } else if (ex === -1) {
            ctx.fillRect(s.x * CELL + 2, s.y * CELL + 3, eyeSize, eyeSize);
            ctx.fillRect(s.x * CELL + 2, s.y * CELL + CELL - 6, eyeSize, eyeSize);
          } else if (ey === -1) {
            ctx.fillRect(s.x * CELL + 3, s.y * CELL + 2, eyeSize, eyeSize);
            ctx.fillRect(s.x * CELL + CELL - 6, s.y * CELL + 2, eyeSize, eyeSize);
          } else {
            ctx.fillRect(s.x * CELL + 3, s.y * CELL + CELL - 5, eyeSize, eyeSize);
            ctx.fillRect(s.x * CELL + CELL - 6, s.y * CELL + CELL - 5, eyeSize, eyeSize);
          }
          ctx.restore();
        } else {
          // Body gradient
          const green = Math.round(255 * (1 - t * 0.6));
          ctx.fillStyle = `rgb(0, ${green}, ${Math.round(green * 0.5)})`;
          const pad = 1 + t * 2;
          ctx.fillRect(
            s.x * CELL + pad,
            s.y * CELL + pad,
            CELL - pad * 2,
            CELL - pad * 2
          );
        }
      }

      // Game Over
      if (!g.alive) {
        ctx.save();
        ctx.fillStyle = "rgba(10,10,15,0.78)";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.font = "bold 42px 'Courier New', monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = COLORS.food;
        ctx.shadowColor = COLORS.food;
        ctx.shadowBlur = 30;
        ctx.fillText("GAME OVER", WIDTH / 2, HEIGHT / 2 - 40);
        ctx.font = "20px 'Courier New', monospace";
        ctx.fillStyle = COLORS.text;
        ctx.shadowBlur = 0;
        ctx.fillText(`Score: ${g.score}`, WIDTH / 2, HEIGHT / 2);
        ctx.fillText(`High: ${g.highScore}`, WIDTH / 2, HEIGHT / 2 + 30);
        ctx.font = "16px 'Courier New', monospace";
        ctx.fillStyle = COLORS.snakeHead;
        ctx.shadowColor = COLORS.snakeHead;
        ctx.shadowBlur = 10;
        ctx.fillText("Press R to restart", WIDTH / 2, HEIGHT / 2 + 70);
        ctx.restore();
      }
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      running = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="snake-wrapper">
      <div className="snake-header">
        <div className="snake-title">
          <span className="pixel-dot" />
          PIXEL SNAKE
        </div>
        <div className="snake-stats">
          <div className="stat-box">
            <span className="stat-label">SCORE</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">BEST</span>
            <span className="stat-value">{highScore}</span>
          </div>
          <div className={`mode-badge ${isAI ? "ai" : "player"}`}>
            {isAI ? "🤖 AI AUTO" : "🎮 YOU"}
          </div>
        </div>
      </div>

      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          id="snake-canvas"
        />
        {!alive && (
          <button className="restart-btn" onClick={resetGame}>
            ↺ RESTART
          </button>
        )}
      </div>

      <div className="snake-controls">
        <div className="control-group">
          <span className="ctrl-key">↑↓←→</span>
          <span className="ctrl-desc">or WASD to take control</span>
        </div>
        <div className="control-group">
          <span className="ctrl-key">Click</span>
          <span className="ctrl-desc">canvas to steer</span>
        </div>
        <div className="control-group">
          <span className="ctrl-key">R</span>
          <span className="ctrl-desc">restart</span>
        </div>
        {!isAI && (
          <button className="ai-btn" onClick={() => {
            const g = gameRef.current;
            g.isAI = true;
            setIsAI(true);
            setMode("AI");
          }}>
            Let AI play
          </button>
        )}
      </div>

      <style>{`
        .snake-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 24px 16px;
          background: transparent;
          min-height: 100vh;
          font-family: 'Courier New', Courier, monospace;
        }
        .snake-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: ${WIDTH}px;
        }
        .snake-title {
          font-size: 22px;
          font-weight: 900;
          color: #00ff88;
          letter-spacing: 4px;
          text-shadow: 0 0 20px #00ff88, 0 0 40px #00ff8855;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .pixel-dot {
          width: 12px; height: 12px;
          background: #ff3366;
          display: inline-block;
          box-shadow: 0 0 10px #ff3366;
          animation: blink 1s infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .snake-stats {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .stat-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px) saturate(150%);
          -webkit-backdrop-filter: blur(10px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 6px 16px;
          border-radius: 8px;
        }
        .stat-label {
          font-size: 10px;
          color: #00ff8888;
          letter-spacing: 2px;
        }
        .stat-value {
          font-size: 20px;
          font-weight: bold;
          color: #00ff88;
          text-shadow: 0 0 10px #00ff88;
        }
        .mode-badge {
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: bold;
          letter-spacing: 1px;
          transition: all 0.3s;
        }
        .mode-badge.ai {
          background: rgba(0,200,255,0.15);
          border: 1px solid rgba(0,200,255,0.5);
          color: #00ccff;
          text-shadow: 0 0 10px #00ccff;
          box-shadow: 0 0 15px rgba(0,200,255,0.2);
        }
        .mode-badge.player {
          background: rgba(255,220,0,0.15);
          border: 1px solid rgba(255,220,0,0.5);
          color: #ffdd00;
          text-shadow: 0 0 10px #ffdd00;
          box-shadow: 0 0 15px rgba(255,220,0,0.2);
          animation: pulse-badge 0.8s ease infinite;
        }
        @keyframes pulse-badge { 0%,100%{box-shadow:0 0 15px rgba(255,220,0,0.2)} 50%{box-shadow:0 0 30px rgba(255,220,0,0.5)} }
        .canvas-container {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 8px 32px 0 rgba(31, 38, 135, 0.1),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        }
        #snake-canvas {
          display: block;
          cursor: crosshair;
          max-width: 100%;
          height: auto;
        }
        .restart-btn {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255,51,102,0.2);
          border: 2px solid #ff3366;
          color: #ff3366;
          font-family: 'Courier New', monospace;
          font-size: 16px;
          font-weight: bold;
          padding: 12px 32px;
          border-radius: 6px;
          cursor: pointer;
          letter-spacing: 2px;
          text-shadow: 0 0 10px #ff3366;
          box-shadow: 0 0 20px rgba(255,51,102,0.3);
          transition: all 0.2s;
          animation: fadeIn 0.5s ease;
        }
        .restart-btn:hover {
          background: rgba(255,51,102,0.4);
          box-shadow: 0 0 40px rgba(255,51,102,0.5);
          transform: translateX(-50%) scale(1.05);
        }
        @keyframes fadeIn { from{opacity:0; transform:translateX(-50%) translateY(10px)} to{opacity:1; transform:translateX(-50%) translateY(0)} }
        .snake-controls {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .control-group {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #ffffff88;
          font-size: 13px;
        }
        .ctrl-key {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 3px 8px;
          border-radius: 4px;
          color: #fff;
          font-size: 12px;
        }
        .ai-btn {
          background: rgba(0,200,255,0.15);
          border: 1px solid rgba(0,200,255,0.5);
          color: #00ccff;
          font-family: 'Courier New', monospace;
          font-size: 13px;
          padding: 6px 16px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 1px;
        }
        .ai-btn:hover {
          background: rgba(0,200,255,0.3);
          box-shadow: 0 0 20px rgba(0,200,255,0.3);
        }
      `}</style>
    </div>
  );
}
