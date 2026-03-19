"use client";
import { useEffect, useRef, useState, useCallback } from "react";

// Dynamically determine grid size based on screen
const CELL = 45;
const SPEED_AI = 90;
const SPEED_PLAYER = 110;

// Subtler colors for background integration but keeping the neon pattern
const COLORS = {
  bg: "transparent",
  grid: "rgba(17, 17, 34, 0.2)",
  snakeHead: "rgba(0, 255, 136, 0.8)",
  snakeBody: "rgba(0, 204, 102, 0.6)",
  food: "rgba(255, 51, 102, 0.8)",
  shadowFood: "rgba(255, 51, 102, 0.6)",
  shadowSnake: "rgba(0, 255, 136, 0.5)",
  bgPattern: "#0a0a0f", // Original dark bg
};

function getRandPos(snake, cols, rows) {
  while (true) {
    const pos = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    };
    if (!snake.some((s) => s.x === pos.x && s.y === pos.y)) return pos;
  }
}

function nextPos(pos, dir, cols, rows) {
  return {
    x: ((pos.x + dir.x + cols) % cols),
    y: ((pos.y + dir.y + rows) % rows),
  };
}

function isColliding(pos, snake) {
  return snake.some((s) => s.x === pos.x && s.y === pos.y);
}

function bfsDir(snake, food, cols, rows) {
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
      const np = nextPos(pos, d, cols, rows);
      const key = `${np.x},${np.y}`;
      if (visited.has(key)) continue;
      if (snakeSet.has(key)) continue;
      visited.add(key);
      const newPath = [...path, d];
      if (np.x === food.x && np.y === food.y) return newPath[0] || d;
      queue.push({ pos: np, path: newPath });
    }
  }

  for (const d of dirs) {
    const np = nextPos(head, d, cols, rows);
    if (!snakeSet.has(`${np.x},${np.y}`)) return d;
  }
  return dirs[0];
}

export default function BackgroundSnake() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, cols: 0, rows: 0 });
  const [status, setStatus] = useState("AI");
  const imgRef = useRef(null);
  
  const gameRef = useRef({
    snake: [{ x: 10, y: 10 }],
    food: { x: 20, y: 10 },
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    score: 0,
    isAI: true,
    alive: true,
    particles: [],
    foodAnim: 0,
    frameCount: 0,
  });
  
  const animRef = useRef(null);
  const lastTickRef = useRef(0);

  // Load Image
  useEffect(() => {
    const img = new Image();
    img.src = "/assets/aurabrain.gif";
    imgRef.current = img;
  }, []);

  // Handle Resize
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const c = Math.floor(w / CELL);
      const r = Math.floor(h / CELL);
      setDimensions({ width: w, height: h, cols: c, rows: r });
      
      const g = gameRef.current;
      if (!g.alive) resetGame(c, r);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const resetGame = useCallback((cols = dimensions.cols, rows = dimensions.rows) => {
    if (cols === 0 || rows === 0) return;
    const g = gameRef.current;
    
    // Start snake roughly in middle
    const startX = Math.floor(cols / 2);
    const startY = Math.floor(rows / 2);
    
    g.snake = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY },
    ];
    g.food = getRandPos(g.snake, cols, rows);
    g.dir = { x: 1, y: 0 };
    g.nextDir = { x: 1, y: 0 };
    g.score = 0;
    g.isAI = true;
    g.alive = true;
    g.particles = [];
    setStatus("AI");
  }, [dimensions]);

  useEffect(() => {
    if (dimensions.cols > 0 && dimensions.rows > 0) {
      resetGame(dimensions.cols, dimensions.rows);
    }
  }, [dimensions, resetGame]);

  const switchToPlayer = useCallback(() => {
    const g = gameRef.current;
    g.isAI = false;
    setStatus("PLAYER");
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
      Escape: "ESC"
    };
    const handle = (e) => {
      const g = gameRef.current;
      const mapped = dirMap[e.key];
      if (!mapped) return;

      if (mapped === "ESC") {
         g.isAI = true;
         setStatus("AI");
         return;
      }

      // Only prevent default if they are actively playing the snake game
      const isPlayerIntendingToPlay = Object.keys(dirMap).includes(e.key) && mapped !== "ESC";
      if (isPlayerIntendingToPlay) {
         // Auto-restart if dead
         if (!g.alive) resetGame();
         
         switchToPlayer();
         if (mapped.x !== -g.dir.x || mapped.y !== -g.dir.y) {
           g.nextDir = mapped;
         }
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [resetGame, switchToPlayer]);

  // Game loop
  useEffect(() => {
    if (dimensions.cols === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let running = true;
    const { cols, rows, width, height } = dimensions;

    const spawnParticles = (x, y) => {
      const g = gameRef.current;
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.5;
        const speed = 1 + Math.random() * 2;
        g.particles.push({
          x: x * CELL + CELL / 2,
          y: y * CELL + CELL / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.05 + Math.random() * 0.05,
          size: 2 + Math.random() * 3,
          color: [`#ff3366`, `#ffdd00`, `#00ff88`, `#ff9900`][Math.floor(Math.random() * 4)],
        });
      }
    };

    const tick = () => {
      const g = gameRef.current;
      if (!g.alive) {
        // Auto-restart seamlessly after a delay
        if (g.frameCount % 60 === 0) {
           resetGame(cols, rows);
        }
        return;
      }
      g.dir = g.nextDir;

      if (g.isAI) {
        const aiDir = bfsDir(g.snake, g.food, cols, rows);
        g.dir = aiDir;
        g.nextDir = aiDir;
      }

      const newHead = nextPos(g.snake[0], g.dir, cols, rows);
      
      if (isColliding(newHead, g.snake)) {
        g.alive = false;
        return;
      }

      g.snake.unshift(newHead);
      if (newHead.x === g.food.x && newHead.y === g.food.y) {
        g.score += 10;
        spawnParticles(g.food.x, g.food.y);
        g.food = getRandPos(g.snake, cols, rows);
      } else {
        g.snake.pop();
      }
    };

    const draw = (now) => {
      if (!running) return;
      animRef.current = requestAnimationFrame(draw);
      const g = gameRef.current;
      g.frameCount++;
      g.foodAnim = (g.foodAnim + 0.1) % (Math.PI * 2);

      const speed = g.isAI ? SPEED_AI : SPEED_PLAYER;
      if (now - lastTickRef.current > speed) {
        lastTickRef.current = now;
        tick();
      }

      ctx.clearRect(0, 0, width, height);

      // Subtle Grid
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= cols; x++) {
        ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, height); ctx.stroke();
      }
      for (let y = 0; y <= rows; y++) {
        ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(width, y * CELL); ctx.stroke();
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

      if (!g.alive) return; // Hide snake momentarily on death

      // Food
      const pulse = Math.sin(g.foodAnim) * 0.2 + 1;
      const fx = g.food.x * CELL + CELL / 2;
      const fy = g.food.y * CELL + CELL / 2;
      ctx.save();
      ctx.shadowColor = COLORS.shadowFood;
      ctx.shadowBlur = 15 * pulse;
      
      // outer glow ring
      ctx.strokeStyle = `rgba(255,51,102,${0.3 * pulse})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(fx, fy, CELL * 0.45 * pulse, 0, Math.PI * 2);
      ctx.stroke();

      // pixel square food
      const fs = CELL * 0.55 * pulse;
      ctx.fillStyle = COLORS.food;
      ctx.fillRect(fx - fs / 2, fy - fs / 2, fs, fs);
      ctx.restore();

      // Snake Masking & Drawing
      const snake = g.snake;
      const img = imgRef.current;
      
      ctx.save();
      // Calculate snake head shadow BEFORE clipping so it radiates outwards perfectly
      ctx.shadowColor = COLORS.shadowSnake;
      ctx.shadowBlur = 15;
      ctx.fillStyle = COLORS.snakeHead; 
      // we only want strong shadow on the head to keep it performant
      ctx.fillRect(snake[0].x * CELL - 0.5, snake[0].y * CELL - 0.5, CELL + 1, CELL + 1);
      ctx.restore();

      ctx.save();
      // Create clip path for the whole snake
      // Overlap by 0.5px to fix anti-aliasing seams at pixel interaction points
      ctx.beginPath();
      for (let i = 0; i < snake.length; i++) {
        ctx.rect(snake[i].x * CELL - 0.5, snake[i].y * CELL - 0.5, CELL + 1, CELL + 1);
      }
      ctx.clip(); 

      // Draw the single big image capturing whole screen
      if (img && img.complete) {
        // Use object-fit: cover logic mathematically
        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;
        let drawW = width;
        let drawH = height;
        let offsetX = 0;
        let offsetY = 0;
        
        if (canvasRatio > imgRatio) {
            drawH = width / imgRatio;
            offsetY = (height - drawH) / 2;
        } else {
            drawW = height * imgRatio;
            offsetX = (width - drawW) / 2;
        }
        // Draw the image filling the background, visible only inside the snake body
        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      } else {
        ctx.fillStyle = COLORS.snakeBody;
        ctx.fill();
      }

      // Draw the green tints over the clipped area
      for (let i = snake.length - 1; i >= 0; i--) {
        const s = snake[i];
        const t = i / snake.length;
        
        // Fading tail effect
        ctx.globalAlpha = 1 - (t * 0.6); 
        ctx.fillStyle = i === 0 
            ? "rgba(0, 255, 136, 0.4)" 
            : `rgba(0, ${Math.round(255 * (1 - t * 0.6))}, 102, 0.5)`;
        ctx.fillRect(s.x * CELL - 0.5, s.y * CELL - 0.5, CELL + 1, CELL + 1);
      }
      
      ctx.restore(); // Remove clipping

      // Draw eyes on the head
      ctx.save();
      const ex = g.dir.x, ey = g.dir.y;
      const eyeSize = 2.5;
      const head = snake[0];
      ctx.fillStyle = COLORS.bgPattern;
      
      if (ex === 1) {
        ctx.fillRect(head.x * CELL + CELL - 5, head.y * CELL + 3, eyeSize, eyeSize);
        ctx.fillRect(head.x * CELL + CELL - 5, head.y * CELL + CELL - 6, eyeSize, eyeSize);
      } else if (ex === -1) {
        ctx.fillRect(head.x * CELL + 2, head.y * CELL + 3, eyeSize, eyeSize);
        ctx.fillRect(head.x * CELL + 2, head.y * CELL + CELL - 6, eyeSize, eyeSize);
      } else if (ey === -1) {
        ctx.fillRect(head.x * CELL + 3, head.y * CELL + 2, eyeSize, eyeSize);
        ctx.fillRect(head.x * CELL + CELL - 6, head.y * CELL + 2, eyeSize, eyeSize);
      } else {
        ctx.fillRect(head.x * CELL + 3, head.y * CELL + CELL - 5, eyeSize, eyeSize);
        ctx.fillRect(head.x * CELL + CELL - 6, head.y * CELL + CELL - 5, eyeSize, eyeSize);
      }
      ctx.restore();
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      running = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [dimensions, resetGame]);

  return (
    <div ref={wrapperRef} className="background-snake-wrapper">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
      />
      <div className="background-snake-ui">
        {status === "PLAYER" ? (
          <div className="status active">🎮 KEYBOARD TAKEOVER ACTIVE • Press ESC for AI</div>
        ) : (
          <div className="status">🤖 BACKGROUND AI MODE (Press WASD to play)</div>
        )}
      </div>

      <style>{`
        .background-snake-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -2; /* Behind the Avatar Canvas */
          pointer-events: none; /* Let clicks pass through to portfolio */
          opacity: 0.45; /* Blend into background heavily */
          transition: opacity 0.5s ease;
        }
        
        /* Make it slightly more visible when player takes over */
        .background-snake-wrapper:has(.status.active) {
            opacity: 0.7;
        }

        .background-snake-ui {
          position: absolute;
          bottom: 20px;
          right: 20px;
          font-family: 'Courier New', monospace;
          font-size: 11px;
          color: rgba(0, 255, 136, 0.5);
          text-align: right;
          letter-spacing: 1px;
        }
        
        .status.active {
            color: rgba(255, 220, 0, 0.8);
            font-weight: bold;
        }
      `}</style>
    </div>
  );
}
