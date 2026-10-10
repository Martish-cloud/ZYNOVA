import React, { useEffect, useRef } from "react";

// --- Matrix3 Helper Type & Math ---
interface Matrix3 {
  m00: number; m01: number; m02: number;
  m10: number; m11: number; m12: number;
  m20: number; m21: number; m22: number;
}

// Token Symbol Types
type TokenSymbol =
  | "ethereum"
  | "bitcoin"
  | "solana"
  | "polygon"
  | "binance"
  | "zynova"
  | "ai-sparkle"
  | "infinity";

interface TokenConfig {
  symbol: TokenSymbol;
  color: string;         // Primary vibrant accent (e.g. #10B981)
  glowColor: string;     // Luminous halo glow (e.g. #34D399)
  specularColor: string; // Specular rim reflection (e.g. #A7F3D0)
  darkBase: string;      // Metallic rim body shade
  baseRadius: number;
  thickness: number;
  // Spatial orbit parameters
  orbitAngle: number;
  orbitRadiusX: number;
  orbitRadiusY: number;
  baseZ: number;
  speed: number;
  // Rotation states & angular velocities
  rotX: number;
  rotY: number;
  rotZ: number;
  vx: number;
  vy: number;
  vz: number;
  bobPhase: number;
  bobSpeed: number;
}

interface LightRod {
  x: number;
  y: number;
  z: number;
  length: number;
  radius: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  vx: number;
  vy: number;
  color: string;
  glowColor: string;
  bobPhase: number;
}

interface DustMote {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
  alpha: number;
  pulsePhase: number;
}

// Rotation matrix constructor (Pitch X, Yaw Y, Roll Z)
function createRotationMatrix(ax: number, ay: number, az: number): Matrix3 {
  const cx = Math.cos(ax), sx = Math.sin(ax);
  const cy = Math.cos(ay), sy = Math.sin(ay);
  const cz = Math.cos(az), sz = Math.sin(az);

  return {
    m00: cy * cz,
    m01: sx * sy * cz - cx * sz,
    m02: cx * sy * cz + sx * sz,
    m10: cy * sz,
    m11: sx * sy * sz + cx * cz,
    m12: cx * sy * sz - sx * cz,
    m20: -sy,
    m21: sx * cy,
    m22: cx * cy
  };
}

export const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isLoopRunning = false;
    let isIntersecting = true;
    let isHidden = typeof document !== "undefined" ? document.hidden : false;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let isMobile = width < 768;
    let dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.6);

    const setCanvasSize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      isMobile = width < 768;
      dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.6);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize, { passive: true });

    // Interactive mouse parallax
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    };

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = width / 2;
      const centerY = height / 2;
      mouse.targetX = (e.clientX - centerX) * 0.04;
      mouse.targetY = (e.clientY - centerY) * 0.04;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // --- Master Palette inspired by reference video ---
    // Emerald Green, Electric Cyan, Imperial Gold, Violet Amethyst, Coral Rose, Lime Mint
    const PALETTE = [
      { color: "#10B981", glow: "#34D399", specular: "#A7F3D0", darkBase: "#052016" }, // Emerald
      { color: "#06B6D4", glow: "#38BDF8", specular: "#BAE6FD", darkBase: "#072031" }, // Cyan
      { color: "#F59E0B", glow: "#FBBF24", specular: "#FEF08A", darkBase: "#2A1A05" }, // Gold
      { color: "#8B5CF6", glow: "#A855F7", specular: "#E9D5FF", darkBase: "#1D0F38" }, // Violet
      { color: "#F43F5E", glow: "#FB7185", specular: "#FECDD3", darkBase: "#300817" }, // Rose / Magenta
      { color: "#10E7A0", glow: "#6EE7B7", specular: "#D1FAE5", darkBase: "#062A1F" }, // Mint Lime
      { color: "#3B82F6", glow: "#60A5FA", specular: "#BFDBFE", darkBase: "#0A1D3D" }, // Royal Blue
      { color: "#EC4899", glow: "#F472B6", specular: "#FBCFE8", darkBase: "#2E0A21" }  // Hot Pink
    ];

    const SYMBOLS: TokenSymbol[] = [
      "ethereum",
      "bitcoin",
      "solana",
      "polygon",
      "binance",
      "zynova",
      "ai-sparkle",
      "infinity"
    ];

    // --- Initialize 3D Floating Coins (Tokens) ---
    // Token count: Desktop 13, Mobile 7
    const tokenCount = isMobile ? 7 : 13;

    // Distribute tokens in an elliptical perimeter halo around center
    const tokens: TokenConfig[] = Array.from({ length: tokenCount }, (_, i) => {
      const pal = PALETTE[i % PALETTE.length];
      const sym = SYMBOLS[i % SYMBOLS.length];

      // Normalized angle around the ellipse
      const angle = (i / tokenCount) * Math.PI * 2 + (Math.random() * 0.3 - 0.15);

      // Orbital ellipse radii: keeps tokens safely outside center headline
      const rx = width * (isMobile ? 0.44 : 0.42) + (Math.random() * 60 - 30);
      const ry = height * (isMobile ? 0.38 : 0.36) + (Math.random() * 60 - 30);

      const rad = isMobile ? 26 + (i % 3) * 6 : 38 + (i % 4) * 8;
      const thick = isMobile ? 8 : 12;

      return {
        symbol: sym,
        color: pal.color,
        glowColor: pal.glow,
        specularColor: pal.specular,
        darkBase: pal.darkBase,
        baseRadius: rad,
        thickness: thick,
        orbitAngle: angle,
        orbitRadiusX: rx,
        orbitRadiusY: ry,
        baseZ: (i % 5 - 2) * 50,
        speed: (0.04 + (i % 4) * 0.015) * (i % 2 === 0 ? 1 : -1) * 0.5,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        vx: 0.18 + (i % 3) * 0.12,
        vy: 0.28 + (i % 3) * 0.15,
        vz: 0.15 + (i % 2) * 0.1,
        bobPhase: Math.random() * Math.PI * 2,
        bobSpeed: 0.6 + Math.random() * 0.5
      };
    });

    // --- Initialize Floating 3D Luminous Rods (Light Cylinders from Video 00:05) ---
    const rodCount = isMobile ? 2 : 4;
    const lightRods: LightRod[] = Array.from({ length: rodCount }, (_, i) => {
      const pal = PALETTE[(i * 2 + 1) % PALETTE.length];
      const angle = ((i + 0.5) / rodCount) * Math.PI * 2;
      return {
        x: Math.cos(angle) * (width * 0.48),
        y: Math.sin(angle) * (height * 0.42),
        z: -80 + i * 40,
        length: isMobile ? 80 : 130 + i * 20,
        radius: isMobile ? 3 : 5,
        rotX: Math.random() * Math.PI,
        rotY: Math.random() * Math.PI,
        rotZ: Math.random() * Math.PI,
        vx: 0.2 + i * 0.1,
        vy: 0.15 + i * 0.08,
        color: pal.color,
        glowColor: pal.glow,
        bobPhase: Math.random() * Math.PI * 2
      };
    });

    // --- Initialize Ambient Specular Dust / Motes ---
    const moteCount = isMobile ? 22 : 42;
    const dustMotes: DustMote[] = Array.from({ length: moteCount }, () => {
      const pal = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      return {
        x: (Math.random() - 0.5) * width * 1.3,
        y: (Math.random() - 0.5) * height * 1.3,
        z: (Math.random() - 0.5) * 400,
        vx: (Math.random() - 0.5) * 12,
        vy: -15 - Math.random() * 15,
        vz: (Math.random() - 0.5) * 10,
        radius: Math.random() * 1.6 + 0.6,
        color: pal.glow,
        alpha: Math.random() * 0.5 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2
      };
    });

    // --- Draw Vector Emblem/Symbol inside rotated 2D context ---
    const drawTokenSymbol = (
      c: CanvasRenderingContext2D,
      symbol: TokenSymbol,
      r: number,
      accent: string,
      specular: string
    ) => {
      const s = r * 0.44;
      c.save();
      c.fillStyle = specular;
      c.strokeStyle = accent;
      c.lineWidth = Math.max(1.2, r * 0.04);
      c.lineCap = "round";
      c.lineJoin = "round";

      switch (symbol) {
        case "ethereum": {
          // Top pyramid
          c.beginPath();
          c.moveTo(0, -s);
          c.lineTo(s * 0.65, -s * 0.08);
          c.lineTo(0, s * 0.32);
          c.lineTo(-s * 0.65, -s * 0.08);
          c.closePath();
          c.fillStyle = specular;
          c.globalAlpha = 0.9;
          c.fill();
          c.stroke();

          // Left facet shade
          c.beginPath();
          c.moveTo(0, -s);
          c.lineTo(0, s * 0.32);
          c.lineTo(-s * 0.65, -s * 0.08);
          c.closePath();
          c.fillStyle = accent;
          c.globalAlpha = 0.5;
          c.fill();

          // Bottom inverted pyramid
          c.beginPath();
          c.moveTo(0, s * 0.44);
          c.lineTo(s * 0.65, s * 0.08);
          c.lineTo(0, s);
          c.lineTo(-s * 0.65, s * 0.08);
          c.closePath();
          c.fillStyle = specular;
          c.globalAlpha = 0.85;
          c.fill();
          c.stroke();
          break;
        }

        case "bitcoin": {
          c.font = `bold ${Math.round(s * 1.55)}px sans-serif`;
          c.textAlign = "center";
          c.textBaseline = "middle";
          c.fillStyle = specular;
          c.globalAlpha = 0.95;
          c.shadowColor = accent;
          c.shadowBlur = 8;
          c.fillText("₿", 0, s * 0.05);
          break;
        }

        case "solana": {
          // 3 parallel horizontal sheared bars
          const barH = s * 0.32;
          const barW = s * 1.25;
          const shear = s * 0.28;
          const ys = [-s * 0.62, 0, s * 0.62];

          ys.forEach((y, idx) => {
            c.beginPath();
            if (idx === 1) {
              // Reversed middle bar
              c.moveTo(-barW / 2 + shear, y - barH / 2);
              c.lineTo(barW / 2, y - barH / 2);
              c.lineTo(barW / 2 - shear, y + barH / 2);
              c.lineTo(-barW / 2, y + barH / 2);
            } else {
              c.moveTo(-barW / 2, y - barH / 2);
              c.lineTo(barW / 2 - shear, y - barH / 2);
              c.lineTo(barW / 2, y + barH / 2);
              c.lineTo(-barW / 2 + shear, y + barH / 2);
            }
            c.closePath();
            c.fillStyle = idx === 1 ? specular : accent;
            c.globalAlpha = 0.9;
            c.fill();
          });
          break;
        }

        case "polygon": {
          // Polygon interconnected nodes
          c.beginPath();
          for (let k = 0; k < 6; k++) {
            const th = (k / 6) * Math.PI * 2 - Math.PI / 6;
            const px = Math.cos(th) * s * 0.9;
            const py = Math.sin(th) * s * 0.9;
            if (k === 0) c.moveTo(px, py);
            else c.lineTo(px, py);
          }
          c.closePath();
          c.lineWidth = Math.max(1.5, r * 0.06);
          c.strokeStyle = specular;
          c.stroke();

          // Center node
          c.beginPath();
          c.arc(0, 0, s * 0.26, 0, Math.PI * 2);
          c.fillStyle = accent;
          c.fill();
          break;
        }

        case "binance": {
          // Rotated central diamond
          c.save();
          c.rotate(Math.PI / 4);
          const dSize = s * 0.6;
          c.strokeRect(-dSize / 2, -dSize / 2, dSize, dSize);

          // 4 outer corner triangles
          const off = s * 0.68;
          const tri = s * 0.22;
          const pts = [
            [0, -off],
            [off, 0],
            [0, off],
            [-off, 0]
          ];
          pts.forEach(([ox, oy]) => {
            c.beginPath();
            c.arc(ox, oy, tri, 0, Math.PI * 2);
            c.fillStyle = specular;
            c.fill();
          });
          c.restore();
          break;
        }

        case "zynova": {
          // Luxury geometric Z monogram
          c.beginPath();
          c.moveTo(-s * 0.75, -s * 0.7);
          c.lineTo(s * 0.75, -s * 0.7);
          c.lineTo(-s * 0.65, s * 0.7);
          c.lineTo(s * 0.75, s * 0.7);
          c.lineWidth = Math.max(2.5, r * 0.1);
          c.strokeStyle = specular;
          c.shadowColor = accent;
          c.shadowBlur = 10;
          c.stroke();
          break;
        }

        case "ai-sparkle": {
          // 4-point star node
          c.beginPath();
          c.moveTo(0, -s);
          c.quadraticCurveTo(0, 0, s, 0);
          c.quadraticCurveTo(0, 0, 0, s);
          c.quadraticCurveTo(0, 0, -s, 0);
          c.quadraticCurveTo(0, 0, 0, -s);
          c.closePath();
          c.fillStyle = specular;
          c.fill();
          c.strokeStyle = accent;
          c.stroke();

          // Center micro gem
          c.beginPath();
          c.arc(0, 0, s * 0.2, 0, Math.PI * 2);
          c.fillStyle = "#ffffff";
          c.fill();
          break;
        }

        case "infinity": {
          // Figure 8 infinity loop
          c.beginPath();
          const iw = s * 0.65;
          c.arc(-iw, 0, s * 0.38, 0, Math.PI * 2);
          c.arc(iw, 0, s * 0.38, 0, Math.PI * 2);
          c.lineWidth = Math.max(2, r * 0.08);
          c.strokeStyle = specular;
          c.stroke();
          break;
        }
      }

      c.restore();
    };

    // --- Main Render Loop with Delta Time ---
    let lastTime = performance.now();

    const render = (now: number) => {
      if (!isLoopRunning) return;

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + mouse.x;
      const centerY = height / 2 + mouse.y;
      const focalLength = 750;

      // Safe exclusion ellipse radius around hero headline
      const safeRadiusX = Math.min(width * 0.32, 400);
      const safeRadiusY = Math.min(height * 0.32, 300);

      // Collect renderable items for depth sorting (Painter's Algorithm)
      type RenderItem =
        | { type: "token"; depth: number; index: number }
        | { type: "rod"; depth: number; index: number }
        | { type: "mote"; depth: number; index: number };

      const renderQueue: RenderItem[] = [];

      // 1. Update Tokens
      for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        t.orbitAngle += t.speed * dt;
        t.rotX += t.vx * dt;
        t.rotY += t.vy * dt;
        t.rotZ += t.vz * dt;
        t.bobPhase += t.bobSpeed * dt;

        // Position on 3D orbit
        let px = Math.cos(t.orbitAngle) * t.orbitRadiusX;
        let py = Math.sin(t.orbitAngle) * t.orbitRadiusY + Math.sin(t.bobPhase) * 16;
        let pz = t.baseZ + Math.cos(t.bobPhase * 0.8) * 35;

        // Soft repulsion from center headline area
        const distNorm = Math.pow(px / safeRadiusX, 2) + Math.pow(py / safeRadiusY, 2);
        if (distNorm < 1.0) {
          const push = (1.0 - distNorm) * 80;
          const ang = Math.atan2(py, px);
          px += Math.cos(ang) * push;
          py += Math.sin(ang) * push;
        }

        renderQueue.push({ type: "token", depth: pz, index: i });
      }

      // 2. Update Light Rods
      for (let i = 0; i < lightRods.length; i++) {
        const rod = lightRods[i];
        rod.rotX += rod.vx * dt;
        rod.rotY += rod.vy * dt;
        rod.bobPhase += dt * 0.5;
        renderQueue.push({ type: "rod", depth: rod.z, index: i });
      }

      // 3. Update Dust Motes
      for (let i = 0; i < dustMotes.length; i++) {
        const m = dustMotes[i];
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        m.z += m.vz * dt;
        m.pulsePhase += dt * 2;

        // Wrap around boundaries
        if (m.y < -height * 0.7) m.y = height * 0.7;
        if (m.x < -width * 0.7) m.x = width * 0.7;
        if (m.x > width * 0.7) m.x = -width * 0.7;

        renderQueue.push({ type: "mote", depth: m.z, index: i });
      }

      // Depth sort: back items (lower depth) drawn first, front items on top
      renderQueue.sort((a, b) => a.depth - b.depth);

      // --- Render Sorted Queue ---
      for (const item of renderQueue) {
        if (item.type === "mote") {
          const m = dustMotes[item.index];
          const zCam = m.z + focalLength;
          if (zCam < 20) continue;
          const scale = focalLength / zCam;
          const sx = centerX + m.x * scale;
          const sy = centerY + m.y * scale;

          if (sx < -20 || sx > width + 20 || sy < -20 || sy > height + 20) continue;

          const currentAlpha = Math.max(0.1, m.alpha + Math.sin(m.pulsePhase) * 0.2);
          ctx.save();
          ctx.beginPath();
          ctx.arc(sx, sy, Math.max(0.8, m.radius * scale), 0, Math.PI * 2);
          ctx.fillStyle = m.color;
          ctx.globalAlpha = currentAlpha;
          ctx.shadowColor = m.color;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.restore();
        } else if (item.type === "rod") {
          const rod = lightRods[item.index];
          const zCam = rod.z + focalLength;
          if (zCam < 50) continue;
          const scale = focalLength / zCam;

          const cx = centerX + rod.x * scale;
          const cy = centerY + rod.y * scale + Math.sin(rod.bobPhase) * 15;

          // Rod orientation vectors in 3D
          const mat = createRotationMatrix(rod.rotX, rod.rotY, rod.rotZ);
          const halfL = (rod.length / 2) * scale;
          const p1x = cx - mat.m00 * halfL;
          const p1y = cy - mat.m10 * halfL;
          const p2x = cx + mat.m00 * halfL;
          const p2y = cy + mat.m10 * halfL;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(p1x, p1y);
          ctx.lineTo(p2x, p2y);

          const grad = ctx.createLinearGradient(p1x, p1y, p2x, p2y);
          grad.addColorStop(0, "rgba(255,255,255,0.9)");
          grad.addColorStop(0.3, rod.color);
          grad.addColorStop(0.7, rod.glowColor);
          grad.addColorStop(1, "rgba(255,255,255,0.1)");

          ctx.strokeStyle = grad;
          ctx.lineWidth = Math.max(2, rod.radius * scale);
          ctx.lineCap = "round";
          ctx.shadowColor = rod.glowColor;
          ctx.shadowBlur = 14;
          ctx.stroke();
          ctx.restore();
        } else if (item.type === "token") {
          const t = tokens[item.index];

          // 3D position
          const px = Math.cos(t.orbitAngle) * t.orbitRadiusX;
          const py = Math.sin(t.orbitAngle) * t.orbitRadiusY + Math.sin(t.bobPhase) * 16;
          const pz = t.baseZ + Math.cos(t.bobPhase * 0.8) * 35;

          const zCam = pz + focalLength;
          if (zCam < 40) continue;
          const scale = focalLength / zCam;

          const projX = centerX + px * scale;
          const projY = centerY + py * scale;

          if (
            projX < -150 ||
            projX > width + 150 ||
            projY < -150 ||
            projY > height + 150
          ) {
            continue;
          }

          const r = t.baseRadius * scale;
          const thick = t.thickness * scale;

          // Rotation matrix for orientation
          const mat = createRotationMatrix(t.rotX, t.rotY, t.rotZ);

          // Basis vectors
          // u: local X, v: local Y, n: normal vector
          const ux = mat.m00, uy = mat.m10, uz = mat.m20;
          const vx = mat.m01, vy = mat.m11, vz = mat.m21;
          const nx = mat.m02, ny = mat.m12, nz = mat.m22;

          // Front face center and back face center in 2D
          const halfT = thick / 2;
          const frontX = projX + nx * halfT;
          const frontY = projY + ny * halfT;
          const backX = projX - nx * halfT;
          const backY = projY - ny * halfT;

          // Facing factor: positive means front face is facing camera
          const isFrontFacing = nz >= 0;

          // --- 1. Soft Ambient Color Halo Behind Token ---
          ctx.save();
          const haloGrad = ctx.createRadialGradient(
            projX, projY, r * 0.2,
            projX, projY, r * 2.2
          );
          haloGrad.addColorStop(0, t.glowColor + "22");
          haloGrad.addColorStop(0.5, t.color + "11");
          haloGrad.addColorStop(1, "transparent");
          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(projX, projY, r * 2.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // --- 2. Render 3D Cylindrical Rim (Edge of the Coin) ---
          // Sample vertices along the circumference
          const segments = isMobile ? 18 : 28;
          const step = (Math.PI * 2) / segments;

          // Light vector pointing from top-left toward scene
          const lx = -0.4, ly = -0.8, lz = 0.45;
          const lLen = Math.hypot(lx, ly, lz);
          const nlx = lx / lLen, nly = ly / lLen, nlz = lz / lLen;

          for (let k = 0; k < segments; k++) {
            const a1 = k * step;
            const a2 = (k + 1) * step;

            const c1 = Math.cos(a1), s1 = Math.sin(a1);
            const c2 = Math.cos(a2), s2 = Math.sin(a2);

            // Unit circle points in local space
            const ex1 = c1 * ux + s1 * vx;
            const ey1 = c1 * uy + s1 * vy;
            const ez1 = c1 * uz + s1 * vz;

            const ex2 = c2 * ux + s2 * vx;
            const ey2 = c2 * uy + s2 * vy;

            // Average edge normal for this segment
            const segNx = (ex1 + ex2) * 0.5;
            const segNy = (ey1 + ey2) * 0.5;
            const segNz = (ez1 + (c2 * uz + s2 * vz)) * 0.5;

            // Only draw edge quads facing the camera in 2D
            // In screen space, normal component pointing towards viewer (positive Z)
            if (segNz < -0.15 && Math.abs(nz) > 0.96) {
              // Nearly flat facing, hide back edge
              continue;
            }

            // Projected 4 corners of edge segment
            const f1x = frontX + ex1 * r;
            const f1y = frontY + ey1 * r;
            const f2x = frontX + ex2 * r;
            const f2y = frontY + ey2 * r;

            const b1x = backX + ex1 * r;
            const b1y = backY + ey1 * r;
            const b2x = backX + ex2 * r;
            const b2y = backY + ey2 * r;

            // Cross product in 2D to check winding order (backface culling of edge)
            const edgeWinding = (f2x - f1x) * (b1y - f1y) - (f2y - f1y) * (b1x - f1x);
            if (edgeWinding <= 0 && Math.abs(nz) > 0.1) continue;

            // Diffuse lighting
            const dotL = Math.max(0, segNx * nlx + segNy * nly + segNz * nlz);
            // Specular reflection glint
            const spec = Math.pow(dotL, 12);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(f1x, f1y);
            ctx.lineTo(f2x, f2y);
            ctx.lineTo(b2x, b2y);
            ctx.lineTo(b1x, b1y);
            ctx.closePath();

            // Edge gradient shading
            const edgeGrad = ctx.createLinearGradient(f1x, f1y, b1x, b1y);
            edgeGrad.addColorStop(0, t.darkBase);
            edgeGrad.addColorStop(
              0.5,
              dotL > 0.4 ? t.color : "#12151D"
            );
            edgeGrad.addColorStop(1, "#0A0C12");

            ctx.fillStyle = edgeGrad;
            ctx.fill();

            // Bright specular neon streak on upper/reflective edge
            if (spec > 0.2 || dotL > 0.6) {
              ctx.strokeStyle = t.specularColor;
              ctx.globalAlpha = Math.min(1, spec * 1.5 + 0.3);
              ctx.lineWidth = 1;
              ctx.stroke();
            }
            ctx.restore();
          }

          // --- 3. Render Coin Face (Front or Back) ---
          const faceX = isFrontFacing ? frontX : backX;
          const faceY = isFrontFacing ? frontY : backY;

          ctx.save();
          // Transform context using projection matrix of the face circle
          // Local unit vector X maps to (ux, uy), Local Y maps to (vx, vy)
          ctx.transform(ux, uy, vx, vy, faceX, faceY);

          // Face Disc base
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);

          // Metallic Gunmetal & Obsidian face gradient
          const faceGrad = ctx.createRadialGradient(
            -r * 0.25, -r * 0.25, r * 0.1,
            0, 0, r
          );
          faceGrad.addColorStop(0, "#222736");
          faceGrad.addColorStop(0.4, "#131722");
          faceGrad.addColorStop(0.85, "#0A0D14");
          faceGrad.addColorStop(1, t.darkBase);

          ctx.fillStyle = faceGrad;
          ctx.fill();

          // Subtle inner groove ring
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.82, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
          ctx.lineWidth = Math.max(1, r * 0.025);
          ctx.stroke();

          // Outer luminous neon rim ring
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.97, 0, Math.PI * 2);
          ctx.strokeStyle = t.glowColor;
          ctx.lineWidth = Math.max(1.5, r * 0.04);
          ctx.shadowColor = t.color;
          ctx.shadowBlur = 12;
          ctx.stroke();

          // Draw the token's embossed vector symbol
          drawTokenSymbol(ctx, t.symbol, r, t.color, t.specularColor);

          // Specular crescent light reflection across the glass/metallic surface
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.94, -Math.PI * 0.7, -Math.PI * 0.1);
          ctx.strokeStyle = t.specularColor;
          ctx.lineWidth = Math.max(1.5, r * 0.04);
          ctx.globalAlpha = 0.8;
          ctx.shadowColor = t.specularColor;
          ctx.shadowBlur = 8;
          ctx.stroke();

          ctx.restore();
        }
      }

      // --- 4. Subtle Central Readability Pillow ---
      ctx.save();
      const centerFade = ctx.createRadialGradient(
        width / 2, height / 2, 60,
        width / 2, height / 2, Math.max(width, height) * 0.55
      );
      centerFade.addColorStop(0, "rgba(5, 6, 9, 0.28)");
      centerFade.addColorStop(0.5, "rgba(5, 6, 9, 0.10)");
      centerFade.addColorStop(1, "transparent");
      ctx.fillStyle = centerFade;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      if (isLoopRunning) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const startLoop = () => {
      if (isLoopRunning) return;
      isLoopRunning = true;
      lastTime = performance.now();
      if (prefersReducedMotion) {
        // Render single frame for reduced motion
        render(performance.now());
        isLoopRunning = false;
      } else {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      isLoopRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };

    // IntersectionObserver to pause loop when scrolled out of hero view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && !isHidden) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    // Tab visibility handling
    const handleVisibilityChange = () => {
      isHidden = document.hidden;
      if (!isHidden && isIntersecting) {
        startLoop();
      } else {
        stopLoop();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    startLoop();

    return () => {
      stopLoop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* 3D Floating Tokens, Neon Rims & Specular Beams Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};
