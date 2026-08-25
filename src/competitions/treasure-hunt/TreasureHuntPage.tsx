import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Shield,
  CheckCircle,
  Flame,
  ArrowRight,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Compass,
  MapPin,
  Sparkles,
  Zap,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { TeamMember, ScheduleItem } from '../../types';

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

interface TreasureHuntPageProps {
  onBackToLanding: () => void;
  onOpenRegister: (trackId?: string) => void;
  onSelectOtherCompetition: (compId: string) => void;
}

const QUEST_CAROUSEL_SLIDES = [
  {
    id: 'quest-overview',
    badge: '01 // THE CAMPUS ARG QUEST',
    title: 'The Cryptic Treasure Hunt',
    subtitle: 'Cross-Campus Augmented Reality & Cryptographic Clues',
    description:
      'A thrilling race against time. Decode cryptographic riddles, terminal lockboxes, physical QR waypoints, and augmented-reality audio clues scattered across the campus and digital metaverse.',
    highlights: [
      {
        icon: Compass,
        title: 'Multi-Stage Puzzle Boxes',
        description: 'Solve terminal ciphers, steganography images, and hardware lock relays.',
      },
      {
        icon: MapPin,
        title: 'Campus Geolocation Waypoints',
        description: 'Physical clues hidden in secret coordinates across the festival venue.',
      },
      {
        icon: Trophy,
        title: '₹50,000 + Mystery Tech Bundles',
        description: 'Instant bounty prizes and mystery hardware kits for the first 3 squads to escape.',
      },
    ],
  },
  {
    id: 'quest-mechanics',
    badge: '02 // ARG PUZZLE MECHANICS',
    title: 'Real-Time Bot Hints & Dynamic Locks',
    subtitle: 'Discord Bot Oracle & Interactive Augmented Reality',
    description:
      'Squads scan GPS beacons and input encrypted codes into our live Discord Oracle bot to unlock the next campus waypoint sequence.',
    highlights: [
      {
        icon: Zap,
        title: 'Sequential Locks',
        description: 'Every solved cipher unlocks physical coordinates for the next secret checkpoint.',
      },
      {
        icon: Shield,
        title: 'Anti-Brute Force Limits',
        description: 'Cooldown timers on incorrect guesses to reward analytical thinking.',
      },
      {
        icon: Flame,
        title: 'Free Squad Entry (₹0)',
        description: 'Open to all registered attendee squads of 2 to 4 members.',
      },
    ],
  },
  {
    id: 'quest-rewards',
    badge: '03 // FINALE & MYSTERY VAULT',
    title: 'The Vault Opening Ceremony',
    subtitle: 'First 3 Squads to Crack the Final Safe Claim the Grand Prize',
    description:
      'The hunt finishes in front of the live audience with physical key handovers, mechanical puzzle trophies, and mystery tech gadgets.',
    highlights: [
      {
        icon: Trophy,
        title: 'First Place: ₹25,000 + Hardware',
        description: 'Custom puzzle trophy and premium hardware dev boards.',
      },
      {
        icon: Users,
        title: 'Runner-ups: ₹15,000 & ₹10,000',
        description: 'Tech backpacks, mechanical keyboards, and sponsor merchandise.',
      },
      {
        icon: Sparkles,
        title: 'Exclusive Badges',
        description: 'Verified on-chain puzzle master badges for all finishers.',
      },
    ],
  },
];

const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    id: 'q1',
    time: '04:00 PM',
    title: 'Squad Check-in & Discord Oracle Bot Setup',
    subtitle: 'CENTRAL FOUNTAIN PLAZA // BOT DISPATCH',
    stage: 'SETUP',
    status: 'completed',
  },
  {
    id: 'q2',
    time: '05:00 PM',
    title: 'Phase 1: Terminal Cryptography Release',
    subtitle: 'FIRST 10 CIPHERS ACTIVE ON DISCORD',
    stage: 'PHASE 1',
    status: 'live',
  },
  {
    id: 'q3',
    time: '07:30 PM',
    title: 'Phase 2: Campus Geolocation QR Waypoints',
    subtitle: 'NIGHT QUEST ACROSS PHYSICAL CAMPUS',
    stage: 'PHASE 2',
    status: 'upcoming',
  },
  {
    id: 'q4',
    time: '10:00 PM',
    title: 'Phase 3: The Vault Safe Cracking Finale',
    subtitle: 'MAIN STAGE // TIME-BASED PODIUM RANKINGS',
    stage: 'FINALE',
    status: 'upcoming',
  },
];

const ORGANIZERS: TeamMember[] = [
  {
    id: 't2',
    name: 'Vikram Malhotra',
    role: 'ARG & Game Master',
    organization: 'NIRVAN Core & Puzzle Guild',
    bio: 'Designed cryptography ARG quests for over 10 national university festivals.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&q=80',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 't1',
    name: 'Tanya Taragi',
    role: 'Lead Convener',
    organization: 'NIRVAN Core',
    bio: 'Overseeing live checkpoint scoring systems and event safety.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&q=80',
    socials: {
      github: 'https://github.com/TaniyaTaragi',
      linkedin: 'https://linkedin.com',
    },
  },
];

export const TreasureHuntPage: React.FC<TreasureHuntPageProps> = ({
  onBackToLanding,
  onOpenRegister,
  onSelectOtherCompetition,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<FoamBubble[]>([]);
  const lastMousePos = useRef<{ x: number; y: number } | null>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: '04',
    hours: '18',
    minutes: '42',
    seconds: '30',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = now + 4 * 24 * 3600 * 1000 + 18 * 3600 * 1000 + 42 * 60 * 1000;
      const diff = target - now;

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: d.toString().padStart(2, '0'),
        hours: h.toString().padStart(2, '0'),
        minutes: m.toString().padStart(2, '0'),
        seconds: s.toString().padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const slide = QUEST_CAROUSEL_SLIDES[currentSlide];

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
            NIRVAN 2026 // 004 TREASURE HUNT QUEST
          </div>
        </div>
      </div>

      {/* 1. Dedicated QUEST Hero */}
      <section className="relative min-h-[92vh] w-full flex flex-col justify-between p-6 sm:p-12 pt-16 overflow-hidden bg-[#f0f0f2] text-[#121212] my-6 select-none border-y border-zinc-300">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.img
            src="/assets/quest-3d-bg.jpg"
            alt="QUEST 3D Balloons"
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
            <span>004 // CRYPTIC TREASURE HUNT &bull; ₹50,000+ MYSTERY BOUNTIES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-[#121212]"
          >
            Cryptic Ciphers, Campus ARG &amp; Mystery Bounties.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base sm:text-lg text-zinc-700 font-medium leading-relaxed mb-8 max-w-2xl"
          >
            Decode multi-layered ciphers, geolocation puzzles, and augmented-reality clues scattered across physical and digital realms.
          </motion.p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenRegister('event-04')}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-black text-white text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-800 active:scale-95 transition-all shadow-2xl cursor-pointer"
            >
              <span>REGISTER SQUAD FOR QUEST</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#quest-broadsheet"
              className="px-6 py-3.5 rounded-full border border-black/20 text-xs font-mono-code uppercase tracking-wider text-black hover:bg-black/5 active:scale-95 transition-all cursor-pointer font-semibold"
            >
              READ BROADSHEET &amp; RULES ↓
            </a>
          </div>
        </div>

        <div className="relative z-10 w-full my-auto py-8">
          <div className="relative w-full flex items-center justify-center select-none">
            <div className="w-full flex items-center justify-between font-black tracking-tighter text-[13vw] sm:text-[14vw] leading-none text-[#121212] drop-shadow-sm select-none">
              <span>Q</span>
              <span>U</span>
              <span>E</span>
              <span>S</span>
              <span>T</span>
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
              ₹50,000 + MYSTERY BUNDLES
            </span>
            <span>&bull;</span>
            <span>ENTRY FEE: ₹0 (FREE)</span>
            <span>&bull;</span>
            <span>SQUAD: 2 - 4 MEMBERS</span>
          </div>
          <span className="px-2.5 py-0.5 rounded bg-black text-white font-bold text-[10px]">
            OCTOBER 2026 // ARG QUEST
          </span>
        </div>
      </section>

      {/* 2. Narrative 3-Pillar Carousel */}
      <section className="relative w-full py-24 px-6 sm:px-12 bg-black text-white border-t border-zinc-900 select-none">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-2">
                QUEST DEEP-DIVE // PERSPECTIVE &bull; 03 PILLARS
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                ARG Quest Architecture
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 mr-2">
                {QUEST_CAROUSEL_SLIDES.map((_, idx) => (
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
                    prev === 0 ? QUEST_CAROUSEL_SLIDES.length - 1 : prev - 1
                  )
                }
                className="w-10 h-10 border border-zinc-800 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % QUEST_CAROUSEL_SLIDES.length)
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
                    onClick={() => onOpenRegister('event-04')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
                  >
                    <span>ENTER TREASURE HUNT</span>
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

      {/* 3. Broadsheet & Rules */}
      <div id="quest-broadsheet" className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        <div className="text-center pb-8 mb-10 border-b-2 border-white/20">
          <div className="flex items-center justify-between text-[10px] font-mono-code uppercase tracking-widest text-zinc-400 pb-2 border-b border-zinc-800 mb-6">
            <span>VOL. XXVI // NO. 04</span>
            <span className="font-bold text-white">THE NIRVAN HACKATHON GAZETTE</span>
            <span>OCTOBER 2026 // TREASURE HUNT EDITION</span>
          </div>

          <h2 className="font-newspaper-serif text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase mb-3">
            The Quest Gazette
          </h2>

          <p className="text-xs sm:text-sm font-mono-code uppercase tracking-widest text-zinc-400 max-w-2xl mx-auto">
            OFFICIAL ARG BLUEPRINT &bull; 4 PHASES &bull; CIPHERS &amp; GEOLOCATION &bull; ₹50,000+ BOUNTIES
          </p>
        </div>

        {/* Competition Switcher */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-zinc-800/80">
          <span className="text-xs font-mono-code uppercase tracking-wider text-zinc-500 mr-2">
            SWITCH ARENA:
          </span>
          {['Hackathon', 'Esports', 'CTF', 'Treasure Hunt', 'Workshop'].map((arena) => (
            <button
              key={arena}
              onClick={() => onSelectOtherCompetition(arena)}
              className={`px-4 py-1.5 text-xs font-mono-code uppercase tracking-wider transition-all cursor-pointer border ${
                arena === 'Treasure Hunt'
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
              }`}
            >
              {arena}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24">
          <div className="lg:col-span-8 space-y-10">
            <div className="bg-[#0c0c0e] border border-zinc-800 p-8 sm:p-10 relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-0.5 bg-white text-black text-xs font-mono-code font-bold uppercase">
                  004 // TREASURE HUNT
                </span>
                <span className="text-xs font-mono-code text-zinc-500 uppercase tracking-widest">
                  CAMPUS ARG
                </span>
              </div>

              <h3 className="font-newspaper-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
                Alternate Reality Cryptic Quest
              </h3>

              <div className="aspect-[16/9] w-full bg-zinc-900 border border-zinc-800 overflow-hidden mb-8 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&h=650&fit=crop&q=80"
                  alt="Treasure Hunt"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base border-t border-zinc-800 pt-6">
                An immersive alternate-reality game combining cryptographic riddles, terminal puzzle boxes, campus waypoints, and fast-paced team coordination.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-[#0a0a0c] border border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-800">
                  <Shield className="w-4 h-4 text-white" />
                  <span>RULES &amp; CODE OF CONDUCT</span>
                </div>
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>Teams must solve clues in sequential lock order.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>Discord integration required for hints and verification.</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-[#0a0a0c] border border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-800">
                  <Users className="w-4 h-4 text-white" />
                  <span>SQUAD SPECS</span>
                </div>
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>Squad size: 2 to 4 members.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>Open to all on-campus attendees.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 bg-[#0a0a0c] border-2 border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="text-xs font-mono-code uppercase tracking-widest text-zinc-500 pb-3 border-b border-zinc-800">
                QUEST DISPATCH // SUMMARY
              </div>

              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono-code text-zinc-400 uppercase tracking-widest mb-2">
                  <Clock className="w-3 h-3 text-white" />
                  <span>COUNTDOWN TO KICKOFF</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 bg-black border border-zinc-800">
                    <div className="text-xl sm:text-2xl font-black font-mono-code text-white">
                      {timeLeft.days}
                    </div>
                    <div className="text-[9px] font-mono-code text-zinc-500 uppercase">DAYS</div>
                  </div>
                  <div className="p-2.5 bg-black border border-zinc-800">
                    <div className="text-xl sm:text-2xl font-black font-mono-code text-white">
                      {timeLeft.hours}
                    </div>
                    <div className="text-[9px] font-mono-code text-zinc-500 uppercase">HRS</div>
                  </div>
                  <div className="p-2.5 bg-black border border-zinc-800">
                    <div className="text-xl sm:text-2xl font-black font-mono-code text-white">
                      {timeLeft.minutes}
                    </div>
                    <div className="text-[9px] font-mono-code text-zinc-500 uppercase">MIN</div>
                  </div>
                  <div className="p-2.5 bg-black border border-zinc-800">
                    <div className="text-xl sm:text-2xl font-black font-mono-code text-white">
                      {timeLeft.seconds}
                    </div>
                    <div className="text-[9px] font-mono-code text-zinc-500 uppercase">SEC</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 bg-black border border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-mono-code text-zinc-400">ENTRY FEE</span>
                  <span className="text-sm font-bold text-white font-mono-code">₹0 (Free)</span>
                </div>
                <div className="p-3.5 bg-black border border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-mono-code text-zinc-400">ARENA PRIZE</span>
                  <span className="text-sm font-bold text-white font-mono-code">₹50,000 + Bundles</span>
                </div>
              </div>

              <button
                onClick={() => onOpenRegister('event-04')}
                className="w-full py-4 bg-white text-black text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-200 active:scale-95 transition-all shadow-xl cursor-pointer"
              >
                REGISTER SQUAD FOR QUEST ↗
              </button>
            </div>
          </div>
        </div>

        {/* 4. Schedule Flowchart */}
        <div className="mb-24 pt-12 border-t-2 border-zinc-800">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-2">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>CHRONOLOGY // QUEST TIMELINE</span>
            </div>
            <h3 className="font-newspaper-serif text-4xl sm:text-6xl font-bold text-white uppercase">
              Schedule of Phases
            </h3>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {SCHEDULE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="p-6 bg-[#0c0c0e] border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="text-[10px] font-mono-code text-zinc-500 uppercase tracking-widest mb-1">
                    <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-white font-bold mr-2">
                      {item.time}
                    </span>
                    <span>{item.stage}</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{item.title}</h4>
                  <p className="text-xs font-mono-code text-zinc-400 uppercase">{item.subtitle}</p>
                </div>
                <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-300">
                  {item.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Organizers Spotlight */}
        <div className="pt-12 border-t-2 border-zinc-800">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-2">
              <Users className="w-3.5 h-3.5 text-zinc-400" />
              <span>LEADERSHIP // GAME MASTERS</span>
            </div>
            <h3 className="font-newspaper-serif text-4xl sm:text-6xl font-bold text-white uppercase">
              Meet The Organizers
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {ORGANIZERS.map((org) => (
              <div
                key={org.id}
                className="bg-[#09090b] border border-zinc-800 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square w-full bg-zinc-900 border border-zinc-800 overflow-hidden mb-4">
                    <img
                      src={org.photo}
                      alt={org.name}
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{org.name}</h4>
                  <div className="text-xs font-mono-code text-zinc-400 uppercase mb-2">
                    {org.role}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">{org.bio}</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-zinc-800 text-zinc-400">
                  {org.socials.github && (
                    <a href={org.socials.github} target="_blank" rel="noreferrer">
                      <Globe className="w-4 h-4 hover:text-white" />
                    </a>
                  )}
                  {org.socials.linkedin && (
                    <a href={org.socials.linkedin} target="_blank" rel="noreferrer">
                      <ExternalLink className="w-4 h-4 hover:text-white" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
