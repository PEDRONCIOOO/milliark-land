"use client";
import React, { useEffect, useRef } from "react";

interface ParticleBackgroundProps {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  rw: number;
  size: number;
  color: string;
}

const hexToRgba = (hex: string, alpha: number): string => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const int = parseInt(hex, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

const defaultColors = ["#ffffff", "#ffffff", "#ffffff"];

export default function ParticleBackground({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  className,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) { return; }

    const ctx = canvas.getContext("2d");
    if (!ctx) { return; }

    const palette =
      particleColors && particleColors.length > 0
        ? particleColors
        : defaultColors;

    // Generate particles with spherical distribution
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      let x: number, y: number, z: number, len: number;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      particles.push({
        x: x * r,
        y: y * r,
        z: z * r,
        rx: Math.random(),
        ry: Math.random(),
        rz: Math.random(),
        rw: Math.random(),
        size: particleBaseSize * (1 + sizeRandomness * (Math.random() - 0.5)),
        color: palette[Math.floor(Math.random() * palette.length)],
      });
    }

    let animationId: number;
    let lastTime = performance.now();
    let elapsed = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) { return; }
      canvas.width = parent.clientWidth * window.devicePixelRatio;
      canvas.height = parent.clientHeight * window.devicePixelRatio;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
      };
    };

    window.addEventListener("resize", resize);
    if (moveParticlesOnHover) {
      canvas.addEventListener("mousemove", handleMouseMove);
    }
    resize();

    const draw = (t: number) => {
      animationId = requestAnimationFrame(draw);
      const delta = t - lastTime;
      lastTime = t;
      elapsed += delta * speed;

      const time = elapsed * 0.001;
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, w, h);

      const offsetX = moveParticlesOnHover
        ? -mouseRef.current.x * particleHoverFactor * 50
        : 0;
      const offsetY = moveParticlesOnHover
        ? -mouseRef.current.y * particleHoverFactor * 50
        : 0;

      for (const p of particles) {
        // Sinusoidal movement matching OGL shader behavior
        const px =
          p.x * particleSpread +
          Math.sin(time * p.rz + 6.28 * p.rw) * (0.1 + 1.4 * p.rx);
        const py =
          p.y * particleSpread +
          Math.sin(time * p.ry + 6.28 * p.rx) * (0.1 + 1.4 * p.rw);
        const pz = p.z * particleSpread * 10;

        // Simple perspective projection
        const fov = 15;
        const cameraZ = 20;
        const scale = fov / (cameraZ - pz * 0.1);

        const screenX = w / 2 + (px * scale * w) / 10 + offsetX;
        const screenY = h / 2 - (py * scale * h) / 10 + offsetY;
        const radius = Math.max(0.5, (p.size * scale) / 80);

        // Color variation with time (matching GLSL fragment shader)
        const alpha = alphaParticles ? 0.6 + 0.2 * Math.sin(time + p.ry * 6.28) : 1;

        ctx.beginPath();
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(p.color, alpha);
        ctx.fill();
      }
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (moveParticlesOnHover) {
        canvas.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(animationId);
    };
  }, [
    particleCount,
    particleSpread,
    speed,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    particleColors,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className ?? ""}`}
      style={{ display: "block" }}
    />
  );
}
