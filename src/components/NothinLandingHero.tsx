import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface FoamBubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  targetRadius: number;
  alpha: number;
  maxLife: number;
  life: number;
  type: 'foam' | 'splash';
  wobble: number;
  wobbleSpeed: number;
}

interface NothinLandingHeroProps {
  isLoaded?: boolean;
  onOpenRegister?: () => void;
  onExploreEvents: () => void;
}

export const NothinLandingHero: React.FC<NothinLandingHeroProps> = ({
  isLoaded = true,
  onOpenRegister,
  onExploreEvents,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<FoamBubble[]>([]);
  const lastMousePos = useRef<{ x: number; y: number } | null>(null);

  // Dynamic Fluid Foam & Ink Brush Canvas Effect over NIRVAN Typography
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const spawnFoamCluster = (x: number, y: number, speed: number) => {
      // 1. Milky Foam Bubbles
      const count = Math.min(14, Math.floor(speed * 0.8) + 4);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 32;
        const rad = Math.random() * 18 + 6;
        bubblesRef.current.push({
          x: x + Math.cos(angle) * dist,
          y: y + Math.sin(angle) * dist,
          vx: (Math.random() - 0.5) * 1.8 + Math.cos(angle) * (speed * 0.08),
          vy: (Math.random() - 0.5) * 1.8 + Math.sin(angle) * (speed * 0.08) - 0.4,
          radius: 2,
          targetRadius: rad,
          alpha: Math.random() * 0.4 + 0.6,
          maxLife: Math.random() * 90 + 90,
          life: 0,
          type: 'foam',
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: (Math.random() - 0.5) * 0.08,
        });
      }

      // 2. Black Ink Splash Droplets
      if (Math.random() > 0.4) {
        const splashCount = Math.floor(Math.random() * 4) + 1;
        for (let i = 0; i < splashCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * 45;
          const rad = Math.random() * 12 + 3;
          bubblesRef.current.push({
            x: x + Math.cos(angle) * dist,
            y: y + Math.sin(angle) * dist,
            vx: (Math.random() - 0.5) * 2.5,
            vy: (Math.random() - 0.5) * 2.5,
            radius: 1,
            targetRadius: rad,
            alpha: 0.95,
            maxLife: Math.random() * 110 + 100,
            life: 0,
            type: 'splash',
            wobble: 0,
            wobbleSpeed: 0,
          });
        }
      }

      if (bubblesRef.current.length > 280) {
        bubblesRef.current = bubblesRef.current.slice(-280);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || y < 0 || x > width || y > height) return;

      if (lastMousePos.current) {
        const dx = x - lastMousePos.current.x;
        const dy = y - lastMousePos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 6) {
          spawnFoamCluster(x, y, Math.min(dist, 30));
          lastMousePos.current = { x, y };
        }
      } else {
        lastMousePos.current = { x, y };
        spawnFoamCluster(x, y, 10);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initial ambient foam splash
    setTimeout(() => {
      if (width > 0 && height > 0) {
        for (let i = 0; i < 4; i++) {
          spawnFoamCluster(width * (0.3 + i * 0.15), height * 0.6, 15);
        }
      }
    }, 600);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const remaining: FoamBubble[] = [];

      for (let i = 0; i < bubblesRef.current.length; i++) {
        const b = bubblesRef.current[i];
        b.life += 1;
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.96;
        b.vy *= 0.96;
        b.wobble += b.wobbleSpeed;

        b.radius += (b.targetRadius - b.radius) * 0.15;
        const progress = b.life / b.maxLife;
        const currentAlpha = progress > 0.7 ? b.alpha * (1 - (progress - 0.7) / 0.3) : b.alpha;

        if (progress < 1) {
          remaining.push(b);
          ctx.save();
          if (b.type === 'foam') {
            const currentR = b.radius * (1 + Math.sin(b.wobble) * 0.08);
            ctx.beginPath();
            ctx.arc(b.x, b.y, currentR, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(230, 230, 235, ${currentAlpha * 0.85})`;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetY = 2;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(b.x, b.y, currentR * 0.82, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.95})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(
              b.x - currentR * 0.32,
              b.y - currentR * 0.32,
              currentR * 0.28,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(18, 18, 18, ${currentAlpha})`;
            ctx.fill();
          }
          ctx.restore();
        }
      }

      bubblesRef.current = remaining;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 pt-28 sm:pt-32 pb-16 overflow-hidden bg-[#f0f0f2] text-[#121212] select-none"
    >
      {/* 3D Iridescent Inflatable Balloon "NIRVAN" Floating Background with Gentle Bobbing Physics */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.img
          src="/assets/nirvan-3d-bg.jpg"
          alt="NIRVAN 3D Balloons"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{
            opacity: 0.55,
            scale: [1, 1.02, 1],
            y: [-8, 8, -8],
          }}
          transition={{
            opacity: { duration: 1.2 },
            scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="w-full h-full object-cover object-center filter saturate-125 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f0f0f2]/80 via-transparent to-[#f0f0f2]/60" />
        <div className="absolute inset-y-0 left-0 w-full sm:w-[72%] bg-gradient-to-r from-[#f0f0f2]/95 via-[#f0f0f2]/72 to-transparent pointer-events-none" />
      </div>

      {/* Top Narrative, Official Tagline & Action Trigger */}
      <div className="relative z-10 max-w-2xl">
        <p className="text-xs sm:text-sm font-mono-code uppercase tracking-[0.28em] text-zinc-600 mb-4">
          NIRVAN '26 // NATIONAL TECH CRUCIBLE
        </p>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-2xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight leading-tight mb-4 text-[#121212]"
        >
          Where Ideas Become Innovation.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg text-zinc-700 font-medium leading-relaxed mb-8 max-w-xl"
        >
          Where India’s brightest developers, hackers, and creators build the next generation of autonomous intelligence and decentralized systems.
        </motion.p>

        {/* Primary and secondary actions required by the competition brief */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="flex flex-wrap items-center gap-4"
        >
          <button
            onClick={onExploreEvents}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-800 active:scale-95 transition-all shadow-2xl cursor-pointer"
          >
            <span>EXPLORE EVENTS &amp; TRACKS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onOpenRegister}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#f0f0f2]/78 backdrop-blur-md border border-black/15 text-black text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-white/90 active:scale-95 transition-all cursor-pointer shadow-sm"
          >
            REGISTER NOW
          </button>
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-wrap gap-x-6 gap-y-2 w-fit rounded-full border border-black/10 bg-[#f0f0f2]/72 backdrop-blur-sm px-3 py-2 text-[10px] sm:text-xs font-mono-code uppercase tracking-widest text-zinc-700 shadow-sm">
        <span>12-13 OCTOBER 2026</span>
        <span>GEHU CAMPUS</span>
        <span>2-DAY TECHNICAL FEST</span>
      </div>

      {/* Giant Central Vector Wordmark: NIRVAN (Full-Bleed Rising Typography) */}
      <div className="relative z-10 w-full my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex items-center justify-center select-none"
        >
          {/* Custom NIRVAN Full-Bleed Bold Typography */}
          <div className="w-full flex items-center justify-between font-black tracking-tighter text-[13vw] sm:text-[14vw] md:text-[15vw] leading-none text-[#121212] drop-shadow-sm select-none">
            <span>N</span>
            <span>I</span>
            <span>R</span>
            <span>V</span>
            <span>A</span>
            <span>N</span>
          </div>

          {/* Dynamic Interactive Foam & Ink Canvas Overlay */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
          />
        </motion.div>
      </div>
    </section>
  );
};
