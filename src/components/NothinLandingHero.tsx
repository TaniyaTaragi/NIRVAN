import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Trophy, Flame } from 'lucide-react';

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
  onOpenRegister: () => void;
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
      className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-12 pt-28 sm:pt-32 overflow-hidden bg-white text-[#121212] select-none"
    >
      {/* Background Ambient High-Resolution Video Loop */}
      <video
        src="https://noth-in.b-cdn.net/nothin-sharp-high.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
      />

      {/* Top Narrative, Hinglish Tagline & Action Triggers */}
      <div className="relative z-10 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 border border-black/10 text-xs font-mono-code text-zinc-800 mb-4 shadow-sm"
        >
          <Flame className="w-3.5 h-3.5 text-black animate-pulse" />
          <span>NATIONAL HACKATHON &bull; ₹5,00,000+ PRIZE CRUCIBLE</span>
        </motion.div>

        {/* Hinglish Main Punchline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight leading-tight mb-4 text-[#121212]"
        >
          Code Karo, Innovate Karo, Sab Kuch Jeeto.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-base sm:text-lg text-zinc-700 font-medium leading-relaxed mb-8 max-w-xl"
        >
          Where India’s brightest developers, hackers, and creators build the next generation of autonomous intelligence and decentralized systems.
        </motion.p>

        {/* Action Triggers: Primary Register Button & Explore Events Link */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4"
        >
          <button
            onClick={onOpenRegister}
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-black text-white text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-800 active:scale-95 transition-all shadow-2xl cursor-pointer"
          >
            <span>REGISTER NOW</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreEvents}
            className="px-6 py-3.5 rounded-full border border-black/20 text-xs font-mono-code uppercase tracking-wider text-black hover:bg-black/5 active:scale-95 transition-all cursor-pointer font-semibold"
          >
            EXPLORE EVENTS &amp; TRACKS ↓
          </button>

          <a
            href="#carousel-hero"
            className="inline-flex items-center gap-1.5 text-xs font-mono-code text-zinc-600 hover:text-black uppercase tracking-wider underline underline-offset-4 cursor-pointer ml-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>WHO WE ARE &amp; WHAT WE DO</span>
          </a>
        </motion.div>
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

      {/* Bottom Coordinates & Live Stats Strip */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-xs font-mono-code text-zinc-600 uppercase tracking-widest pt-6 border-t border-zinc-200">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-black font-bold">
            <Trophy className="w-3.5 h-3.5 text-black" />
            ₹5,00,000+ PRIZE POOL
          </span>
          <span>&bull;</span>
          <span>48-HOUR HYBRID CRUCIBLE</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/TaniyaTaragi/NIRVAN"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black transition-colors cursor-pointer font-bold"
          >
            GITHUB // REPO
          </a>
          <span>/</span>
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black transition-colors cursor-pointer font-bold"
          >
            DISCORD LOUNGE
          </a>
          <span className="px-2.5 py-0.5 rounded bg-black text-white font-bold text-[10px]">
            OCT 2026
          </span>
        </div>
      </div>
    </section>
  );
};
