"use client";

import React, { useEffect, useRef } from "react";

interface TopographicContour3DProps {
  className?: string;
}

export const TopographicContour3D: React.FC<TopographicContour3DProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = 360;
    };
    window.addEventListener("resize", handleResize);

    // Grid config
    const cols = 36;
    const rows = 24;
    const spacingX = width / cols;
    const spacingY = height / rows;

    let time = 0;
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse influence
      const targetX = (mouseX / width - 0.5) * 40;
      const targetY = (mouseY / height - 0.5) * 20;

      ctx.save();
      ctx.translate(width / 2, height * 0.25);

      // Draw wireframe isometric mountain lines
      for (let y = 0; y < rows; y++) {
        ctx.beginPath();
        for (let x = 0; x < cols; x++) {
          const worldX = (x - cols / 2) * (spacingX * 1.4);
          const worldY = y * (spacingY * 1.1);

          // Elevation formula simulating two Himalayan peaks
          const dist1 = Math.hypot(x - cols * 0.35, y - rows * 0.4);
          const dist2 = Math.hypot(x - cols * 0.7, y - rows * 0.55);
          const peak1 = Math.exp(-dist1 * 0.18) * 90;
          const peak2 = Math.exp(-dist2 * 0.22) * 75;
          const ripple = Math.sin(x * 0.4 + time * 0.8) * 4;

          const elevation = -(peak1 + peak2 + ripple);

          // Isometric project
          const projX = worldX + targetX;
          const projY = worldY * 0.6 + elevation + targetY;

          if (x === 0) {
            ctx.moveTo(projX, projY);
          } else {
            ctx.lineTo(projX, projY);
          }
        }

        // Color gradient from sand to deep bronze with depth
        const alpha = Math.max(0.12, 0.7 - (y / rows) * 0.5);
        ctx.strokeStyle = `rgba(182, 155, 124, ${alpha})`;
        ctx.lineWidth = y % 3 === 0 ? 1.4 : 0.7;
        ctx.stroke();
      }

      ctx.restore();

      time += 0.015;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={`relative w-full h-[360px] overflow-hidden select-none pointer-events-auto ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-brand-espresso via-transparent to-brand-espresso/80" />
      <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-brand-sand tracking-widest uppercase pointer-events-none">
        <span>Kinnaur - Spiti Crossover Elevation Profile</span>
        <span>Peak: 16,105 ft (Bhaba Pass)</span>
      </div>
    </div>
  );
};
