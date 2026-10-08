import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxAlpha: number;
  color: string;
}

interface Leaf {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  swaySpeed: number;
  swayOffset: number;
  swayAmplitude: number;
  color: string;
  alpha: number;
}

export const InkCanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Light Theme: Delicate Soft Ink & Ash Mote Particles
    const particleCount = Math.min(30, Math.floor(width / 45));
    const particles: Particle[] = [];
    const colors = ['#18181B', '#3F3F46', '#71717A', '#A1A1AA', '#CBD5E1'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2 + 0.08,
        vy: -0.15 - Math.random() * 0.25,
        size: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.12 + 0.03,
        maxAlpha: Math.random() * 0.15 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Light Theme: Drifting Minimalist Ink Wash Silhouette Leaves
    const leafCount = Math.min(10, Math.max(4, Math.floor(width / 160)));
    const leaves: Leaf[] = [];
    const monochromeLeafColors = ['#52525B', '#71717A', '#A1A1AA', '#CBD5E1'];

    for (let i = 0; i < leafCount; i++) {
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        vx: (Math.random() - 0.5) * 0.35 + 0.15,
        vy: 0.35 + Math.random() * 0.5,
        size: Math.random() * 5 + 6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        swaySpeed: 0.015 + Math.random() * 0.02,
        swayOffset: Math.random() * Math.PI * 2,
        swayAmplitude: 14 + Math.random() * 18,
        color: monochromeLeafColors[Math.floor(Math.random() * monochromeLeafColors.length)],
        alpha: 0.08 + Math.random() * 0.12
      });
    }

    // Draw stylized minimalist leaf path
    const drawMonochromeLeaf = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rot: number,
      color: string,
      alpha: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rot);
      context.globalAlpha = alpha;
      context.fillStyle = color;

      context.beginPath();
      context.moveTo(0, -size);
      context.quadraticCurveTo(size * 0.3, -size * 0.6, size * 0.8, -size * 0.3);
      context.quadraticCurveTo(size * 0.4, 0, size * 0.9, size * 0.4);
      context.quadraticCurveTo(size * 0.3, size * 0.5, 0, size * 0.9);
      context.quadraticCurveTo(-size * 0.3, size * 0.5, -size * 0.9, size * 0.4);
      context.quadraticCurveTo(-size * 0.4, 0, -size * 0.8, -size * 0.3);
      context.quadraticCurveTo(-size * 0.3, -size * 0.6, 0, -size);
      context.closePath();
      context.fill();

      // Subtle leaf spine line
      context.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      context.lineWidth = 0.5;
      context.beginPath();
      context.moveTo(0, size * 0.5);
      context.lineTo(0, size * 1.1);
      context.stroke();

      context.restore();
    };

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render drifting particles
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x > width + 10) {
            p.x = -10;
          }
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Render leaves
      tick += 1;
      leaves.forEach((leaf) => {
        if (!prefersReducedMotion) {
          leaf.y += leaf.vy;
          leaf.x += leaf.vx + Math.sin(tick * leaf.swaySpeed + leaf.swayOffset) * 0.5;
          leaf.rotation += leaf.rotationSpeed;

          if (leaf.y > height + 30) {
            leaf.y = -30;
            leaf.x = Math.random() * width;
          }
          if (leaf.x > width + 30) {
            leaf.x = -30;
          }
        }

        drawMonochromeLeaf(
          ctx,
          leaf.x,
          leaf.y,
          leaf.size,
          leaf.rotation,
          leaf.color,
          leaf.alpha
        );
      });

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
      />

      {/* Light Theme: Subtle Ink Wash Silhouette (Distant mountain peaks & architecture) */}
      <div className="absolute bottom-0 inset-x-0 h-44 md:h-64 opacity-[0.035] select-none text-zinc-900 pointer-events-none">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full fill-current"
        >
          <path d="M0,288L60,260C120,232,240,176,360,180C480,184,600,248,720,240C840,232,960,152,1080,156C1200,160,1320,248,1380,292L1440,320L1440,320L0,320Z" fillOpacity="0.5" />
          
          <g transform="translate(1120, 110) scale(0.65)" fill="currentColor" fillOpacity="0.6">
            <rect x="73" y="10" width="4" height="40" />
            <circle cx="75" cy="18" r="5" />
            <path d="M20,60 Q75,45 130,60 L115,75 Q75,70 35,75 Z" />
            <rect x="55" y="75" width="40" height="20" />
            <path d="M10,105 Q75,90 140,105 L125,120 Q75,115 25,120 Z" />
            <rect x="50" y="120" width="50" height="25" />
            <path d="M0,155 Q75,140 150,155 L135,175 Q75,170 15,175 Z" />
            <rect x="40" y="175" width="70" height="35" />
            <rect x="30" y="210" width="90" height="40" />
          </g>

          <path d="M140,320 L150,220 L160,320 Z M130,270 L150,230 L170,270 Z" fillOpacity="0.6" />
          <path d="M180,320 L190,240 L200,320 Z M172,285 L190,250 L208,285 Z" fillOpacity="0.6" />
        </svg>
      </div>

      {/* Vignette fade to clean white/cream base */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/80 to-transparent" />
    </div>
  );
};
