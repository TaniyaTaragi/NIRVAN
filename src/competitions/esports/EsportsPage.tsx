import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Users,
  Shield,
  CheckCircle,
  Flame,
  ArrowRight,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Tv,
  Sparkles,
  Zap,
} from 'lucide-react';

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

interface EsportsPageProps {
  onBackToLanding: () => void;
  onOpenRegister: (trackId?: string) => void;
  onSelectOtherCompetition: (compId: string) => void;
}

const ESPORTS_CAROUSEL_SLIDES = [
  {
    id: 'esports-tournaments',
    badge: '01 // THE LAN TOURNAMENT',
    title: 'Esports Championship Arena',
    subtitle: 'Valorant, BGMI & EA FC 26 on 240Hz LAN Rig',
    description:
      'Compete in India’s most intense collegiate esports showdown. Play on dedicated low-latency tournament fiber servers with official refereeing, spectator stages, and live YouTube/Twitch casting.',
    highlights: [
      {
        icon: Gamepad2,
        title: 'Title Lineup',
        description: '5v5 Valorant Tactical, 4-Man Squad BGMI Battle Royale, and 1v1 EA FC 26.',
      },
      {
        icon: Tv,
        title: 'Broadcast Stage & Casting',
        description: 'Main auditorium stage with dual caster desks, replay analysis, and spectator audio.',
      },
      {
        icon: Trophy,
        title: '₹1,00,000+ Prize Pool',
        description: 'Instant cash trophies, official mechanical gaming keyboards, headsets, and MVP awards.',
      },
    ],
  },
  {
    id: 'esports-rules',
    badge: '02 // FAIR PLAY & FORMAT',
    title: 'Double-Elimination Bracket',
    subtitle: 'Zero Tolerance Anti-Cheat & Certified LAN Hardware',
    description:
      'All tournament rigs are pre-configured and audited with hardware locks. Teams battle through double-elimination brackets ensuring only the most tactical squads reach the grand finals.',
    highlights: [
      {
        icon: Shield,
        title: 'Vanguard & Anti-Cheat Audits',
        description: 'Hardware inspection and account verification for all qualified players.',
      },
      {
        icon: Zap,
        title: 'Red Bull Players Lounge',
        description: 'Dedicated warm-up stations, high-refresh monitors, and refreshments for all players.',
      },
      {
        icon: Flame,
        title: 'Free Squad Entry (₹0)',
        description: 'Zero registration fee for all collegiate and student esports rosters.',
      },
    ],
  },
  {
    id: 'esports-casting',
    badge: '03 // COMMUNITY & AWARDS',
    title: 'Grand Finale Showcase',
    subtitle: 'Live Audience Finals in Front of 1,00,0+ Cheering Fans',
    description:
      'The championship culminates on the grand auditorium stage on Sunday evening with live pyrotechnics, trophy presentation, and pro esports scout matchmaking.',
    highlights: [
      {
        icon: Trophy,
        title: 'MVP Custom Trophy',
        description: 'Individual MVP honors with sponsored flagship peripherals and streaming contracts.',
      },
      {
        icon: Users,
        title: 'Inter-College Pride',
        description: 'Represent your university roster on the national collegiate leaderboard.',
      },
      {
        icon: Sparkles,
        title: 'Showmatches & Cosplay',
        description: 'Creator exhibition showmatches and community gaming challenges between brackets.',
      },
    ],
  },
];

export const EsportsPage: React.FC<EsportsPageProps> = ({
  onBackToLanding,
  onOpenRegister,
  onSelectOtherCompetition,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<FoamBubble[]>([]);
  const lastMousePos = useRef<{ x: number; y: number } | null>(null);

  const [currentSlide, setCurrentSlide] = useState(0);

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
          const currentR = b.radius * (1 + Math.sin(b.wobble) * 0.08);
          ctx.beginPath();
          ctx.arc(b.x, b.y, currentR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(230, 230, 235, ${currentAlpha * 0.85})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(b.x, b.y, currentR * 0.82, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.95})`;
          ctx.fill();
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

  const slide = ESPORTS_CAROUSEL_SLIDES[currentSlide];

  return (
    <div className="w-full min-h-screen bg-[#070709] text-white selection:bg-white selection:text-black select-none">
      <div className="pt-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between py-4 border-b border-zinc-800">
          <button
            onClick={onBackToLanding}
            className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>← RETURN TO 360° ORBIT LANDING</span>
          </button>

          <div className="text-xs font-mono-code text-zinc-500 uppercase tracking-widest hidden sm:block">
            NIRVAN 2026 // 002 ESPORTS ARENA
          </div>
        </div>
      </div>

      {/* Dedicated ESPORTS Hero */}
      <section className="relative min-h-[92vh] w-full flex flex-col justify-between p-6 sm:p-12 pt-16 overflow-hidden bg-[#f0f0f2] text-[#121212] my-6 select-none border-y border-zinc-300">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.img
            src="/assets/esports-3d-bg.jpg"
            alt="ESPORTS 3D Balloons"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 0.6,
              scale: [1, 1.02, 1],
              y: [-6, 6, -6],
            }}
            transition={{
              opacity: { duration: 1.2 },
              scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="w-full h-full object-cover object-center filter saturate-125 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f0f0f2]/85 via-transparent to-[#f0f0f2]/60" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 border border-black/10 text-xs font-mono-code text-zinc-800 mb-4 shadow-sm backdrop-blur-sm"
          >
            <Flame className="w-3.5 h-3.5 text-black animate-pulse" />
            <span>002 // ESPORTS CHAMPIONSHIP &bull; ₹1,00,000+ BOUNTIES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-[#121212]"
          >
            LAN Arena, Low Latency, Full Clutch Action.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base sm:text-lg text-zinc-700 font-medium leading-relaxed mb-8 max-w-2xl"
          >
            Compete in high-octane Valorant, BGMI, and EA FC tournaments on ultra-low latency LAN servers with broadcast live casting.
          </motion.p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenRegister('event-02')}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-black text-white text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-800 active:scale-95 transition-all shadow-2xl cursor-pointer"
            >
              <span>REGISTER SQUAD FOR ESPORTS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative z-10 w-full my-auto py-8">
          <div className="relative w-full flex items-center justify-center select-none">
            <div className="w-full flex items-center justify-between font-black tracking-tighter text-[12vw] sm:text-[13vw] md:text-[14vw] leading-none text-[#121212] drop-shadow-sm select-none">
              <span>E</span>
              <span>S</span>
              <span>P</span>
              <span>O</span>
              <span>R</span>
              <span>T</span>
              <span>S</span>
            </div>
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
            />
          </div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-xs font-mono-code text-zinc-600 uppercase tracking-widest pt-6 border-t border-zinc-300">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-black font-bold">
              <Trophy className="w-3.5 h-3.5 text-black" />
              ₹1,00,000 + GAMING GEAR
            </span>
            <span>&bull;</span>
            <span>ENTRY FEE: ₹0 (FREE)</span>
          </div>
          <span className="px-2.5 py-0.5 rounded bg-black text-white font-bold text-[10px]">
            OCTOBER 2026 // LAN ARENA
          </span>
        </div>
      </section>

      {/* Narrative Carousel */}
      <section className="relative w-full py-24 px-6 sm:px-12 bg-black text-white border-t border-zinc-900 select-none">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-2">
                ESPORTS DEEP-DIVE // PERSPECTIVE &bull; 03 PILLARS
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Tournament Architecture
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 mr-2">
                {ESPORTS_CAROUSEL_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center text-[10px] font-mono-code font-bold ${
                      currentSlide === idx ? 'w-10 bg-white text-black' : 'w-6 bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() =>
                  setCurrentSlide((prev) =>
                    prev === 0 ? ESPORTS_CAROUSEL_SLIDES.length - 1 : prev - 1
                  )
                }
                className="w-10 h-10 border border-zinc-800 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % ESPORTS_CAROUSEL_SLIDES.length)
                }
                className="w-10 h-10 border border-zinc-800 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative border border-zinc-800 bg-[#080808] p-8 sm:p-14 overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-[11px] font-mono-code text-zinc-400 uppercase tracking-widest mb-6">
                    <Sparkles className="w-3 h-3 text-white" />
                    <span>{slide.badge}</span>
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
                    {slide.title}
                  </h3>
                  <h4 className="text-base sm:text-lg font-semibold text-zinc-300 mb-6">
                    {slide.subtitle}
                  </h4>
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8 max-w-xl">
                    {slide.description}
                  </p>
                  <button
                    onClick={() => onOpenRegister('event-02')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
                  >
                    <span>JOIN ESPORTS BRACKET</span>
                    <span>↗</span>
                  </button>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-4">
                  {slide.highlights.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={index}
                        className="p-5 border border-zinc-800/80 bg-zinc-900/40 flex items-start gap-4"
                      >
                        <div className="p-2.5 bg-black border border-zinc-800 text-white shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white mb-1">{item.title}</h5>
                          <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Broadsheet & Rules */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-zinc-800/80">
          <span className="text-xs font-mono-code uppercase tracking-wider text-zinc-500 mr-2">
            SWITCH ARENA:
          </span>
          {['Hackathon', 'Esports', 'CTF', 'Treasure Hunt', 'Workshop'].map((arena) => (
            <button
              key={arena}
              onClick={() => onSelectOtherCompetition(arena)}
              className={`px-4 py-1.5 text-xs font-mono-code uppercase tracking-wider transition-all cursor-pointer border ${
                arena === 'Esports'
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
              }`}
            >
              {arena}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          <div className="p-8 bg-[#0a0a0c] border border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-800">
              <Shield className="w-4 h-4 text-white" />
              <span>RULES &amp; CODE OF CONDUCT</span>
            </div>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <span>Standard anti-cheat and tournament fair-play regulations apply.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <span>Squad captains must check-in 30 minutes prior to match schedule.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <span>Personal peripherals permitted after referee hardware verification.</span>
              </li>
            </ul>
          </div>

          <div className="p-8 bg-[#0a0a0c] border border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-800">
              <Users className="w-4 h-4 text-white" />
              <span>ELIGIBILITY &amp; ROSTER</span>
            </div>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <span>Open to all registered college students &amp; collegiate esports rosters.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                <span>Valorant (5v5), BGMI (4-player squad), EA FC 26 (1v1 Solo).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
