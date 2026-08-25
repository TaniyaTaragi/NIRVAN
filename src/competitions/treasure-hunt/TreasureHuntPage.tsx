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
  Compass,
  Key,
  Sparkles,
  Zap,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { ConstellationOrbitalGallery, ConstellationItem } from '../../components/ConstellationOrbitalGallery';
import { TeamMember, ScheduleItem } from '../../types';

export const QUEST_CONSTELLATION_ITEMS: ConstellationItem[] = [
  {
    id: 'quest-track-1',
    title: 'Cryptographic Terminal Vault',
    brand: 'CIPHER TERMINAL',
    category: 'Terminal',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&h=650&fit=crop&q=80',
    description: 'Solve interactive CLI riddle terminals, base conversions, and multi-layered puzzle scripts.',
    fullOverview: 'Teams ssh into encrypted challenge bastions to decrypt clues unlocking the next geo-sector.',
    prizePool: '₹15,000 Bounty',
    tags: ['CIPHER', 'TERMINAL', 'CLI', 'VAULT'],
  },
  {
    id: 'quest-track-2',
    title: 'Radio Frequency Beacon Hunt',
    brand: 'SDR SIGNAL DECODING',
    category: 'Signals',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=900&h=650&fit=crop&q=80',
    description: 'Use Software Defined Radios (SDR) and directional antennas to locate hidden RF transmitters.',
    fullOverview: 'Sweep radio bands across campus to triangulate hidden signal nodes broadcasting audio coordinates.',
    prizePool: '₹12,000 Bounty',
    tags: ['SDR', 'RADIO', 'BEACON', 'ANTENNA'],
  },
  {
    id: 'quest-track-3',
    title: 'Campus Geolocation Waypoints',
    brand: 'PHYSICAL ARG NODES',
    category: 'Waypoints',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=900&h=650&fit=crop&q=80',
    description: 'Physical hidden markers, laser reflectors, and encrypted micro-dots concealed in campus architecture.',
    fullOverview: 'Traverse campus quadrants discovering physical checkpoint keys required for the final gate.',
    prizePool: '₹10,000 Bounty',
    tags: ['GEOLOCATION', 'PHYSICAL', 'CAMPUS', 'MAP'],
  },
  {
    id: 'quest-track-4',
    title: 'Steganographic Audio & Spectrograms',
    brand: 'AUDIO WATERMARKS',
    category: 'Audio Log',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&h=650&fit=crop&q=80',
    description: 'Extract hidden images, QR payloads, and text strings embedded inside sound waveform spectrograms.',
    fullOverview: 'Analyze audio streams broadcast during the event using Audacity and spectral visualizers.',
    prizePool: '₹8,000 Bounty',
    tags: ['STEGANOGRAPHY', 'AUDIO', 'SPECTROGRAM', 'WAVEFORM'],
  },
  {
    id: 'quest-track-5',
    title: 'Augmented Reality Visual Markers',
    brand: 'AR LENS OVERLAYS',
    category: 'AR Quest',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=900&h=650&fit=crop&q=80',
    description: 'Scan physical campus landmarks with our custom WebAR portal to reveal floating 3D hints.',
    fullOverview: 'Interact with spatial 3D puzzle dials projected in real-time onto physical festival buildings.',
    prizePool: '₹8,000 Bounty',
    tags: ['AR', 'WEBAR', 'CAMERA', '3D-PUZZLE'],
  },
  {
    id: 'quest-track-6',
    title: 'The Master Vault Finale',
    brand: 'FINAL CRYPTIC LOCK',
    category: 'Master Vault',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=650&fit=crop&q=80',
    description: 'The ultimate collaborative lock challenge requiring all 5 previous keys to unlock the grand bounty.',
    fullOverview: 'A live race on stage where the top 3 speedrun squads battle head-to-head to crack the master combination.',
    prizePool: 'Grand Trophy',
    tags: ['FINALE', 'VAULT', 'SPEEDRUN', 'TROPHY'],
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

interface TreasureHuntPageProps {
  onBackToLanding: () => void;
  onOpenRegister: (trackId?: string) => void;
  onSelectOtherCompetition: (compId: string) => void;
}

const QUEST_CAROUSEL_SLIDES = [
  {
    id: 'quest-overview',
    badge: '01 // EVENT & DESCRIPTION',
    title: 'Event name + description',
    subtitle: 'NIRVAN Cryptic Cross-Campus Treasure Hunt 2026',
    description:
      'A high-speed race across campus. Decode cryptographic ciphers, terminal lockboxes, physical QR markers, and WebAR clues to unlock the master vault.',
    highlights: [
      {
        icon: Compass,
        title: 'Event Overview',
        description: 'Cross-Campus Alternate Reality & Cipher Hunt.',
      },
      {
        icon: Key,
        title: 'Puzzle Mechanics',
        description: 'WebAR Overlays, Radio Frequency SDR Beacons & Physical Micro-Dots.',
      },
      {
        icon: Sparkles,
        title: 'Master Vault Sprint',
        description: 'First squad to crack the final combination wins the grand trophy.',
      },
    ],
  },
  {
    id: 'quest-schedule',
    badge: '02 // DATE, TIME & VENUE',
    title: 'Date + time + venue',
    subtitle: 'October 25, 2026 • Campus Quadrangle & WebAR Portal',
    description:
      'The hunt begins Sunday morning at 10:00 AM with the release of Gate 1 ciphers, concluding at 04:00 PM with the auditorium master lock ceremony.',
    highlights: [
      {
        icon: Calendar,
        title: 'Event Date',
        description: 'Sunday, October 25, 2026 (Single-Day Quest)',
      },
      {
        icon: Clock,
        title: 'Flagoff & Vault Lock',
        description: 'Briefing at 09:30 AM • Cipher Release at 10:00 AM • Vault Closes at 04:00 PM',
      },
      {
        icon: MapPin,
        title: 'Starting Checkpoint',
        description: 'Main Campus Quadrangle & Interactive WebAR Portal.',
      },
    ],
  },
  {
    id: 'quest-eligibility',
    badge: '03 // TEAM SIZE & ELIGIBILITY',
    title: 'Team size + eligibility',
    subtitle: '2 to 4 Explorers Per Squad • Open to All Registered Participants',
    description:
      'Form a squad of 2 to 4 members. Each team requires at least one mobile device with a camera and internet connectivity for WebAR portal access.',
    highlights: [
      {
        icon: Users,
        title: 'Squad Size',
        description: 'Min 2, Max 4 members per team.',
      },
      {
        icon: CheckCircle,
        title: 'Eligibility Requirements',
        description: 'Open to all NIRVAN festival attendees and college students.',
      },
      {
        icon: Shield,
        title: 'Fair Play Rules',
        description: 'No damaging physical campus infrastructure or sharing cipher keys.',
      },
    ],
  },
  {
    id: 'quest-rewards',
    badge: '04 // REGISTRATION FEE & PRIZE POOL',
    title: 'Registration fee + prize pool',
    subtitle: '₹0 Entry Fee (100% Free) • ₹50,000 Cash Bounties & Mystery Hardware Kits',
    description:
      'Zero entry fees for all teams. Compete for immediate cash rewards, flagship tech gadget mystery boxes, smart accessories, and champion trophies.',
    highlights: [
      {
        icon: Flame,
        title: 'Registration Fee',
        description: '₹0 (Free Squad Entry for all participants)',
      },
      {
        icon: Trophy,
        title: 'Cash Prize Pool',
        description: '₹50,000 Cash Pool (₹25,000 Grand Champion + Category Bounties)',
      },
      {
        icon: Zap,
        title: 'Mystery Hardware Bundles',
        description: 'Developer smart gadgets, custom gear boxes, and champion plaques.',
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
              href="#quest-constellation"
              className="px-6 py-3.5 rounded-full border border-black/20 text-xs font-mono-code uppercase tracking-wider text-black hover:bg-black/5 active:scale-95 transition-all cursor-pointer font-semibold"
            >
              EXPLORE WAYPOINTS &amp; SCHEDULE ↓
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
      </section>

      {/* 2. Narrative 3-Pillar Carousel */}
      <section className="relative w-full py-24 px-6 sm:px-12 bg-black text-white border-t border-zinc-900 select-none">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-zinc-800/80">
            <div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                About Cryptic Quest
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 mr-2">
                {QUEST_CAROUSEL_SLIDES.map((_, idx) => (
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
                    prev === 0 ? QUEST_CAROUSEL_SLIDES.length - 1 : prev - 1
                  )
                }
                className="w-10 h-10 border border-zinc-800 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % QUEST_CAROUSEL_SLIDES.length)
                }
                className="w-10 h-10 border border-zinc-800 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carousel Card */}
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
                    onClick={() => onOpenRegister('event-04')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
                  >
                    <span>ENTER TREASURE HUNT</span>
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

      {/* 2.5 3D Constellation Orbital Gallery of Quest Stages */}
      <div id="quest-constellation">
        <ConstellationOrbitalGallery
          items={QUEST_CONSTELLATION_ITEMS}
          title="CRYPTIC QUEST WAYPOINTS"
          subtitle="06 ARG PUZZLE VECTORS"
          centerSymbol="Q"
          onSelectArena={onSelectOtherCompetition}
          onOpenRegister={onOpenRegister}
        />
      </div>

      {/* 3. Schedule & Organizers Section */}
      <div id="quest-schedule" className="max-w-7xl mx-auto px-6 sm:px-12 py-20">
        {/* Schedule Flowchart */}
        <div className="mb-24">
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
