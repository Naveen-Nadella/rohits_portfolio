import React, { useEffect, useRef } from 'react';

interface ParticleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

interface CodeGlyph {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  swaySpeed: number;
  swayOffset: number;
  swayAmp: number;
}

export const InkCanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for interactive developer network
    const mouse = {
      x: -1000,
      y: -1000,
      active: false
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Portfolio Tech Glyphs / Code Tokens
    const codeTokens = [
      '</>', '{ }', '=>', 'const', '0101', 'git', 'fn()',
      '[]', 'async', 'return', '<div/>', 'API', 'SQL',
      'npm', 'state', 'λ', 'true', 'interface'
    ];

    const glyphs: CodeGlyph[] = [];
    const glyphCount = Math.min(18, Math.max(8, Math.floor(width / 95)));

    for (let i = 0; i < glyphCount; i++) {
      glyphs.push({
        text: codeTokens[i % codeTokens.length],
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.15 - Math.random() * 0.25,
        size: Math.floor(Math.random() * 3) + 11,
        alpha: Math.random() * 0.12 + 0.08,
        swaySpeed: 0.015 + Math.random() * 0.02,
        swayOffset: Math.random() * Math.PI * 2,
        swayAmp: 12 + Math.random() * 15
      });
    }

    // Interactive Constellation Network Nodes
    const nodeCount = Math.min(48, Math.max(22, Math.floor(width / 42)));
    const nodes: ParticleNode[] = [];
    const nodeColors = ['#1E293B', '#334155', '#475569', '#64748B'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1.2,
        color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
        alpha: Math.random() * 0.35 + 0.25
      });
    }

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      // 1. Draw Connected Tech Constellation Lines
      const maxConnectDist = Math.min(125, width / 10);
      const mouseConnectDist = 150;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.14;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(51, 65, 85, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }

        // Mouse interactive connection
        if (mouse.active) {
          const mdx = nodes[i].x - mouse.x;
          const mdy = nodes[i].y - mouse.y;
          const mDist = Math.hypot(mdx, mdy);

          if (mDist < mouseConnectDist) {
            const mAlpha = (1 - mDist / mouseConnectDist) * 0.28;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(15, 23, 42, ${mAlpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // 2. Draw Network Nodes
      nodes.forEach((n) => {
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < -10) n.x = width + 10;
          if (n.x > width + 10) n.x = -10;
          if (n.y < -10) n.y = height + 10;
          if (n.y > height + 10) n.y = -10;
        }

        ctx.save();
        ctx.globalAlpha = n.alpha;
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 3. Draw Floating Developer Code Glyphs
      glyphs.forEach((g) => {
        if (!prefersReducedMotion) {
          g.y += g.vy;
          g.x += g.vx + Math.sin(tick * g.swaySpeed + g.swayOffset) * 0.25;

          if (g.y < -30) {
            g.y = height + 20;
            g.x = Math.random() * width;
          }
          if (g.x < -30) g.x = width + 20;
          if (g.x > width + 30) g.x = -20;
        }

        ctx.save();
        ctx.globalAlpha = g.alpha;
        ctx.font = `600 ${g.size}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = '#334155';
        ctx.fillText(g.text, g.x, g.y);
        ctx.restore();
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
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Soft Shaded Ambient Vignette & Depth Orbs (Eliminates Glare) */}
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-slate-300/35 blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-amber-200/20 blur-3xl" />
      <div className="absolute -bottom-40 left-1/4 w-[640px] h-[640px] rounded-full bg-stone-300/35 blur-3xl" />

      {/* Engineering Blueprint Fine Dot Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: 'radial-gradient(rgba(30, 41, 59, 0.12) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Interactive Developer Constellation & Code Glyphs Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Bottom Shaded Elevation Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#EAEAE7] via-[#EAEAE7]/60 to-transparent" />
    </div>
  );
};
