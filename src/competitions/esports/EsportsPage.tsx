import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
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
  Globe,
  ExternalLink,
} from 'lucide-react';
import { ConstellationOrbitalGallery, ConstellationItem } from '../../components/ConstellationOrbitalGallery';
import { TeamMember, ScheduleItem } from '../../types';
import { EventDetailsSummary } from '../../components/EventDetailsSummary';

export const ESPORTS_CONSTELLATION_ITEMS: ConstellationItem[] = [
  {
    id: 'esport-track-1',
    title: 'Valorant Tactical Showdown',
    brand: '5V5 SPIKE DEFUSAL',
    category: 'Valorant',
    year: '2026',
    image: '/image/esports/esports_1.jpg',
    description: 'Double elimination 5v5 tactical tournament on dedicated 128-tick private tournament servers.',
    fullOverview: 'Teams battle across official competitive map pools with custom spectator overlays and live caster analysis.',
    prizePool: '₹45,000 Bounty',
    tags: ['VALORANT', '5V5', 'TACTICAL', 'LAN'],
  },
  {
    id: 'esport-track-2',
    title: 'BGMI Squad Warfare',
    brand: 'BATTLE ROYALE ARENA',
    category: 'BGMI',
    year: '2026',
    image: '/image/esports/esports_2.jpg',
    description: '16 collegiate squads drop into Erangel & Miramar across 6 high-stakes point-multiplier matches.',
    fullOverview: 'Features official point systems, dynamic zone calculations, device performance locks, and aerial replay cams.',
    prizePool: '₹35,000 Bounty',
    tags: ['BGMI', 'SQUAD', 'ESPORTS', 'BATTLE-ROYALE'],
  },
  {
    id: 'esport-track-3',
    title: 'EA FC 26 Championship',
    brand: '1V1 FOOTBALL ARENA',
    category: 'EA FC',
    year: '2026',
    image: '/image/esports/esports_3.jpg',
    description: '1v1 Ultimate Team knockout tournament on calibrated PS5 stage rigs with official controller locks.',
    fullOverview: 'Fast-paced direct knockout matches on giant auditorium LED screens with live play-by-play commentary.',
    prizePool: '₹20,000 Bounty',
    tags: ['EA-FC', '1V1', 'PS5', 'CHAMPIONSHIP'],
  },
  {
    id: 'esport-track-4',
    title: 'Broadcast Stage & Live Casting',
    brand: 'SHOUTCASTING DESK',
    category: 'Broadcast',
    year: '2026',
    image: '/image/esports/esports_4.jpg',
    description: 'Professional shoutcasting desk with multi-cam stage feeds, instant slow-mo replays, and crowd audio.',
    fullOverview: 'Live broadcast streamed to thousands across YouTube and Twitch with collegiate esports scouting partners.',
    prizePool: 'Live Stream Showcase',
    tags: ['BROADCAST', 'CASTING', 'TWITCH', 'OBS'],
  },
  {
    id: 'esport-track-5',
    title: '240Hz Calibrated LAN Rigs',
    brand: 'PRO HARDWARE',
    category: 'LAN Arena',
    year: '2026',
    image: '/image/esports/esports_5.jpg',
    description: 'Zero-latency tournament fiber network with custom mechanical switches and audio isolation headsets.',
    fullOverview: 'All tournament rigs undergo hardware anti-cheat audits and peripheral firmware calibrations.',
    prizePool: 'Pro Spec Arena',
    tags: ['240HZ', 'LAN', 'ZERO-LATENCY', 'RIGS'],
  },
  {
    id: 'esport-track-6',
    title: 'Grand Finale Auditorium Stage',
    brand: 'CHAMPIONSHIP ARENA',
    category: 'Grand Finals',
    year: '2026',
    image: '/image/esports/esports_1.jpg',
    description: 'The final showdown before 1,000+ live spectators with custom championship trophies and MVP gear.',
    fullOverview: 'Culminating in the trophy lift ceremony with direct pro gaming contract referrals for top performers.',
    prizePool: 'Trophy + Hardware',
    tags: ['AUDITORIUM', 'TROPHY', 'MVP', 'STAGE'],
  },
];

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
    id: 'esports-overview',
    badge: '01 // EVENT & DESCRIPTION',
    title: 'Event name + description',
    subtitle: 'NIRVAN Esports Championship Arena 2026',
    description:
      'Compete in India’s most intense collegiate esports showdown featuring Valorant, BGMI, and EA FC 26 on 240Hz low-latency LAN rigs with official referees and live casting.',
    highlights: [
      {
        icon: Gamepad2,
        title: 'Event Overview',
        description: 'NIRVAN Flagship Collegiate Esports LAN Tournament.',
      },
      {
        icon: Tv,
        title: 'Featured Game Titles',
        description: '5v5 Valorant Tactical, 4-Man Squad BGMI Battle Royale & 1v1 EA FC 26.',
      },
      {
        icon: Sparkles,
        title: 'Broadcast & Casting',
        description: 'Auditorium main stage, live caster desks, and spectator audio setup.',
      },
    ],
  },
  {
    id: 'esports-schedule',
    badge: '02 // DATE, TIME & VENUE',
    title: 'Date + time + venue',
    subtitle: 'October 24 - 25, 2026 • Indoor Sports Complex & Esports Stage',
    description:
      'Brackets kick off Saturday morning with hardware device audits, progressing through double-elimination knockouts to Sunday evening live auditorium grand finals.',
    highlights: [
      {
        icon: Calendar,
        title: 'Tournament Dates',
        description: 'October 24 – October 25, 2026 (2-Day Championship)',
      },
      {
        icon: Clock,
        title: 'Check-in & Audit Time',
        description: 'Reporting & Device Audits at 10:00 AM • Brackets Live at 12:00 PM',
      },
      {
        icon: MapPin,
        title: 'Arena Venue',
        description: 'Indoor Sports Complex & Auditorium Esports Arena, NIRVAN Campus.',
      },
    ],
  },
  {
    id: 'esports-eligibility',
    badge: '03 // TEAM SIZE & ELIGIBILITY',
    title: 'Team size + eligibility',
    subtitle: '4 to 5 Players Per Squad • Verified Student & Club Rosters',
    description:
      'Valorant requires 5 main players + 1 substitute. BGMI requires a 4-player squad. EA FC 26 is 1v1 solo entry. All players must complete identity verification.',
    highlights: [
      {
        icon: Users,
        title: 'Squad Size Specs',
        description: 'Valorant (5v5), BGMI (4 Squad), EA FC 26 (1v1 Solo).',
      },
      {
        icon: CheckCircle,
        title: 'Eligibility Requirements',
        description: 'Open to all college students, university esports clubs, and verified squads.',
      },
      {
        icon: Shield,
        title: 'Anti-Cheat & Fair Play',
        description: 'Riot Vanguard & Krafton anti-cheat enforced on audited 240Hz LAN rigs.',
      },
    ],
  },
  {
    id: 'esports-rewards',
    badge: '04 // REGISTRATION FEE & PRIZE POOL',
    title: 'Registration fee + prize pool',
    subtitle: '₹0 Entry Fee (100% Free) • ₹1,00,000+ Prize Pool & Flagship Gaming Gear',
    description:
      'Zero entry fee for all student rosters. Compete for immediate cash disbursements, mechanical gaming keyboards, headsets, and custom MVP trophies.',
    highlights: [
      {
        icon: Flame,
        title: 'Registration Fee',
        description: '₹0 (Free Squad Entry for all verified rosters)',
      },
      {
        icon: Trophy,
        title: 'Tournament Prize Pool',
        description: '₹1,00,000+ Cash Pool + Sponsored Mechanical Keyboards & Headsets',
      },
      {
        icon: Zap,
        title: 'MVP Honors',
        description: 'Custom MVP trophies, gaming peripherals, and pro streaming contracts.',
      },
    ],
  },
];

const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    id: 'e1',
    time: '10:00 AM',
    title: 'Esports Check-in & Hardware Warm-up',
    subtitle: 'LAN ARENA // SQUAD DEVICE AUDITS',
    stage: 'WARM-UP',
    status: 'completed',
  },
  {
    id: 'e2',
    time: '12:00 PM',
    title: 'Valorant & BGMI Group Stage Brackets',
    subtitle: 'SIMULTANEOUS ROUND OF 32 KNOCKOUTS',
    stage: 'GROUPS',
    status: 'live',
  },
  {
    id: 'e3',
    time: '04:30 PM',
    title: 'Quarterfinals & EA FC 26 Semifinals',
    subtitle: 'SPECTATOR LOUNGE // LIVE STREAM CASTING',
    stage: 'PLAYOFFS',
    status: 'upcoming',
  },
  {
    id: 'e4',
    time: '08:00 PM',
    title: 'BGMI Grand Finals: 6 Match Showdown',
    subtitle: 'ERANGEL & MIRAMAR TACTICAL MAPS',
    stage: 'FINALS',
    status: 'upcoming',
  },
  {
    id: 'e5',
    time: '11:00 PM',
    title: 'Valorant Grand Finals (BO3 Series)',
    subtitle: 'MAIN AUDITORIUM STAGE // TROPHY CEREMONY',
    stage: 'CHAMPIONSHIP',
    status: 'upcoming',
  },
];

const ORGANIZERS: TeamMember[] = [
  {
    id: 't4',
    name: 'Devansh Mehta',
    role: 'Director of Esports Operations',
    organization: 'Collegiate Esports League & Devfolio',
    bio: 'Organized 20+ national LAN tournaments with Tier-1 broadcast streaming and competitive anti-cheat.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&q=80',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 't1',
    name: 'Tanya Taragi',
    role: 'Lead Convener & Infrastructure Lead',
    organization: 'NIRVAN Core',
    bio: 'Managing 10Gbps dedicated fiber routing and low-latency tournament server mesh.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&q=80',
    socials: {
      github: 'https://github.com/TaniyaTaragi',
      linkedin: 'https://linkedin.com',
    },
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
            <span>RETURN TO 360° ORBIT LANDING</span>
          </button>

          <div className="text-xs font-mono-code text-zinc-500 uppercase tracking-widest hidden sm:block">
            NIRVAN 2026 // 002 ESPORTS ARENA
          </div>
        </div>
      </div>

      {/* 1. Dedicated ESPORTS Hero */}
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
          <div className="absolute inset-y-0 left-0 w-full sm:w-[74%] bg-gradient-to-r from-[#f0f0f2]/95 via-[#f0f0f2]/72 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-3xl">
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
            <a
              href="#esports-constellation"
              className="px-6 py-3.5 rounded-full bg-[#f0f0f2]/78 backdrop-blur-md border border-black/15 text-xs font-mono-code uppercase tracking-wider text-black hover:bg-white/90 active:scale-95 transition-all cursor-pointer font-semibold shadow-sm"
            >
              EXPLORE TOURNAMENTS &amp; MATCHES ↓
            </a>
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
      </section>

      {/* 2. Narrative 3-Pillar Carousel */}
      <section className="relative w-full py-24 px-6 sm:px-12 bg-black text-white border-t border-zinc-900 select-none">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-zinc-800/80">
            <div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                About Esports Arena
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 mr-2">
                {ESPORTS_CAROUSEL_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center text-[10px] font-mono-code font-bold ${
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
                className="w-10 h-10 border border-zinc-800 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % ESPORTS_CAROUSEL_SLIDES.length)
                }
                className="w-10 h-10 border border-zinc-800 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
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
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-[11px] font-mono-code text-zinc-400 uppercase tracking-widest mb-6">
                    <Sparkles className="w-3 h-3 text-white" />
                    <span>{slide.badge}</span>
                  </div>

                  <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                    {slide.title}
                  </h3>

                  <h4 className="text-base sm:text-lg font-semibold text-zinc-300 mb-6 leading-snug">
                    {slide.subtitle}
                  </h4>

                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8 max-w-xl font-normal">
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
                  {slide.highlights?.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={index}
                        className="p-5 border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all duration-300 flex items-start gap-4 shadow-sm"
                      >
                        <div className="p-2.5 bg-black border border-zinc-800 text-white shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white mb-1">{item.title}</h5>
                          <p className="text-xs text-zinc-400 leading-relaxed font-normal">{item.description}</p>
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

      <EventDetailsSummary eventName="Esports Arena Championship" description="A high-energy competitive gaming arena where strategy, teamwork, reflexes, and skill decide the podium." date="12 October 2026" time="10:00 AM - 11:00 PM" venue="GEHU Campus • Esports Arena" teamSize="4-5 members per squad" eligibility="Registered college students and collegiate teams" fee="₹0 registration" prize="₹1,00,000 + gaming gear" rules="Play on audited tournament rigs, follow the published bracket, respect fair-play and anti-cheat rules, and report disputes to the event desk." />

      {/* 2.5 3D Constellation Orbital Gallery of Esports Tournaments */}
      <div id="esports-constellation">
        <ConstellationOrbitalGallery
          items={ESPORTS_CONSTELLATION_ITEMS}
          title="ESPORTS TOURNAMENTS"
          subtitle="06 LAN ARENAS & STAGES"
          centerSymbol="E"
          onSelectArena={onSelectOtherCompetition}
          onOpenRegister={onOpenRegister}
        />
      </div>

      {/* 3. Schedule & Organizers Section */}
      <div id="esports-schedule" className="max-w-7xl mx-auto px-6 sm:px-12 py-20">
        {/* Schedule Flowchart */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-2">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>CHRONOLOGY // MATCH TIMELINE</span>
            </div>
            <h3 className="font-newspaper-serif text-4xl sm:text-6xl font-bold text-white uppercase">
              Schedule of Matches
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
              <span>LEADERSHIP // ESPORTS DIRECTORS</span>
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
