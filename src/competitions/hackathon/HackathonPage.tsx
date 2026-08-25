import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Shield,
  CheckCircle,
  ExternalLink,
  Globe,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { ConstellationOrbitalGallery, ConstellationItem } from '../../components/ConstellationOrbitalGallery';
import { TeamMember, ScheduleItem } from '../../types';

export const HACKATHON_TRACK_ITEMS: ConstellationItem[] = [
  {
    id: 'hack-track-1',
    title: 'Generative AI & Agent Swarms',
    brand: 'AUTONOMOUS ARCHITECTURES',
    category: 'GenAI',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&h=650&fit=crop&q=80',
    description: 'Build multi-agent autonomous reasoning loops, memory graphs, and custom MCP tool bridges.',
    fullOverview: 'Teams architect autonomous agent workflows using modern LLMs, vector memories, and deterministic code execution sandboxes.',
    prizePool: '₹60,000 Bounty',
    tags: ['AGENTS', 'LLM', 'MEMORY', 'MCP'],
  },
  {
    id: 'hack-track-2',
    title: 'Web3 Protocols & ZK Rollups',
    brand: 'DECENTRALIZED SYSTEMS',
    category: 'Web3',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&h=650&fit=crop&q=80',
    description: 'Architect verifiable state transitions, zero-knowledge proofs, and account abstraction dApps.',
    fullOverview: 'Build high-throughput decentralized protocols on Polygon and EVM-compatible rollups with seamless gasless UX.',
    prizePool: '₹50,000 Bounty',
    tags: ['ZK-PROOFS', 'POLYGON', 'SOLIDITY', 'DEFI'],
  },
  {
    id: 'hack-track-3',
    title: 'Autonomous Robotics & Sensor Fusion',
    brand: 'HARDWARE & EDGE',
    category: 'Robotics',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&h=650&fit=crop&q=80',
    description: 'Hardware hacking with ESP32, Raspberry Pi, camera vision sensors, and drone flight controllers.',
    fullOverview: 'Design embedded hardware MVPs with real-time sensor fusion, edge compute inferencing, and physical testing telemetry.',
    prizePool: '₹40,000 Bounty',
    tags: ['ESP32', 'ROS2', 'HARDWARE', 'SENSORS'],
  },
  {
    id: 'hack-track-4',
    title: 'Fullstack DevTools & Compilers',
    brand: 'DEVELOPER EXPERIENCE',
    category: 'DevTools',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=650&fit=crop&q=80',
    description: 'Next-gen AST manipulation, instant hot-reloading tooling, CLI utilities, and runtime profilers.',
    fullOverview: 'Create blazing-fast developer tooling in Rust, TypeScript, and Go that eliminates developer friction.',
    prizePool: '₹35,000 Bounty',
    tags: ['COMPILERS', 'RUST', 'TYPESCRIPT', 'CLI'],
  },
  {
    id: 'hack-track-5',
    title: 'Spatial 3D & WebGPU Canvas',
    brand: 'CREATIVE TECH',
    category: 'Spatial UI',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&h=650&fit=crop&q=80',
    description: 'Fluid spatial interfaces, WebGPU fragment shaders, glassmorphism UI, and tactile 3D interactions.',
    fullOverview: 'Push the boundaries of web UI/UX with smooth 60fps GPU-accelerated shaders and spatial physics.',
    prizePool: '₹35,000 Bounty',
    tags: ['WEBGPU', 'THREE.JS', 'SHADERS', 'GSAP'],
  },
  {
    id: 'hack-track-6',
    title: 'Cyber Defense & Zero-Trust',
    brand: 'SECURITY CRUCIBLE',
    category: 'Security',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&h=650&fit=crop&q=80',
    description: 'Automated vulnerability patchers, sandboxed runtime monitors, and decentralized identity auth.',
    fullOverview: 'Engineer resilient defense infrastructure capable of thwarting modern automated penetration tools.',
    prizePool: '₹30,000 Bounty',
    tags: ['SECURITY', 'ZERO-TRUST', 'PATCHING', 'AUTH'],
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

interface HackathonPageProps {
  onBackToLanding: () => void;
  onOpenRegister: (trackId?: string) => void;
  onSelectOtherCompetition: (compId: string) => void;
}

const HACKATHON_CAROUSEL_SLIDES = [
  {
    id: 'hack-overview',
    title: 'Flagship National Hackathon',
    subtitle: 'India’s Premier 48-Hour Product & AI Crucible',
    description:
      'Assemble a team of 2 to 4 developers, designers, and domain hackers to build functional, production-ready software. Compete for ₹2,50,000+ in bounties, VC fast-tracks, and $5,000+ in cloud credits.',
  },
  {
    id: 'hack-mentorship',
    title: 'Staff Engineer Mentorship',
    subtitle: '1-on-1 Office Hours with Google, Polygon & AWS Leads',
    description:
      'Never get stuck in dependency hell. Senior architects and protocol contributors will be present on-site and in private Discord voice channels for architecture reviews and bug squashes.',
  },
  {
    id: 'hack-rewards',
    title: '₹2,50,000+ Bounties & Seed Grants',
    subtitle: 'Cash, Venture Fast-Tracks & Hiring Offers',
    description:
      'Winners receive immediate cash disbursements, hardware kits, fast-track partner interviews, and direct entry into top incubator batches with zero equity taken upfront.',
  },
];

const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    id: 's1',
    time: '09:00 AM',
    title: 'Check-in, Badging & Squad Breakfast',
    subtitle: 'MAIN CAMPUS FOYER & REGISTRATION DESK',
    stage: 'ONBOARDING',
    status: 'completed',
  },
  {
    id: 's2',
    time: '11:00 AM',
    title: 'Opening Keynote & Track Reveal',
    subtitle: 'MAIN AUDITORIUM & LIVE BROADCAST',
    stage: 'KICKOFF',
    status: 'completed',
  },
  {
    id: 's3',
    time: '01:00 PM',
    title: 'Hackathon Kickoff: Repositories Unlocked',
    subtitle: 'HACKING HALL A & B // 48-HOUR TIMER STARTS',
    stage: 'BUILD SPRINT',
    status: 'live',
  },
  {
    id: 's4',
    time: '08:30 PM',
    title: 'Midpoint Architecture Review & Dinner',
    subtitle: 'MENTOR AUDIT CLINICS // CATERED DINNER',
    stage: 'MENTORSHIP',
    status: 'upcoming',
  },
  {
    id: 's5',
    time: '12:00 AM',
    title: 'Midnight Energy Fuel & Mini-Games',
    subtitle: 'RED BULL LOUNGE // ESPORTS ARENA',
    stage: 'MIDNIGHT FUEL',
    status: 'upcoming',
  },
  {
    id: 's6',
    time: '09:00 AM',
    title: 'Code Freeze & GitHub Submissions Due',
    subtitle: 'DEVFOLIO SUBMISSION PORTAL LOCKS',
    stage: 'DEADLINE',
    status: 'upcoming',
  },
  {
    id: 's7',
    time: '11:30 AM',
    title: 'Grand Demo Day & Jury Pitch Battles',
    subtitle: 'STAGE 1 // 5-MIN LIVE DEMO PER TEAM',
    stage: 'PITCH STAGE',
    status: 'upcoming',
  },
  {
    id: 's8',
    time: '03:30 PM',
    title: 'Award Ceremony & VC Grant Distribution',
    subtitle: '₹2,50,000+ CASH & CERTIFICATION DISPATCH',
    stage: 'FINALE',
    status: 'upcoming',
  },
];

const ORGANIZERS: TeamMember[] = [
  {
    id: 't1',
    name: 'Tanya Taragi',
    role: 'Lead Convener & Systems Architect',
    organization: 'NIRVAN Core & Open Source Guild',
    bio: 'Pioneering decentralized hackathons and open-source infrastructure. Scaling high-velocity engineering sprints.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&q=80',
    socials: {
      github: 'https://github.com/TaniyaTaragi',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 't2',
    name: 'Vikram Malhotra',
    role: 'Head of Technical Mentorship',
    organization: 'Google Cloud Developer Expert',
    bio: 'Distributed systems engineer advising tier-1 teams on real-time neural agent architectures.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&q=80',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 't3',
    name: 'Ananya Roy',
    role: 'Web3 & Cyber Security Lead',
    organization: 'Polygon Core Contributor',
    bio: 'ZK-rollups researcher and smart contract security auditor. Mentoring CTF & blockchain arenas.',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop&q=80',
    socials: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 't4',
    name: 'Devansh Mehta',
    role: 'Director of Hackathon & Esports Operations',
    organization: 'Devfolio Community Fellow',
    bio: 'Organized 15+ national hackathons and LAN tournaments. Ensuring zero friction, 24/7 food & Red Bull.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&q=80',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
];

export const HackathonPage: React.FC<HackathonPageProps> = ({
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

  // Countdown timer
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

  // Foam & Ink brush canvas engine
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
    }, 500);

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

  const slide = HACKATHON_CAROUSEL_SLIDES[currentSlide];

  return (
    <div className="w-full min-h-screen bg-[#070709] text-white selection:bg-white selection:text-black select-none">
      {/* 0. Top Back Navigation Bar */}
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
            NIRVAN 2026 // 001 HACKATHON ARENA
          </div>
        </div>
      </div>

      {/* 1. Dedicated HACKATHON Hero with 3D Inflatable Background & Fluid Foam Canvas (1:1 with Main Landing) */}
      <section className="relative min-h-[92vh] w-full flex flex-col justify-between p-6 sm:p-12 pt-16 overflow-hidden bg-[#f0f0f2] text-[#121212] my-6 select-none border-y border-zinc-300">
        {/* 3D Iridescent Inflatable Balloon Background for HACKATHON */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.img
            src="/assets/hackathon-3d-bg.jpg"
            alt="HACKATHON 3D Balloons"
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

        {/* Top Narrative & Hinglish Punchline */}
        <div className="relative z-10 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-[#121212]"
          >
            48 Ghante, 1000+ Hackers, Ek Ultimate Champion.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-700 font-medium leading-relaxed mb-8 max-w-2xl"
          >
            Assemble your team of 2-4 builders to architect, code, and deploy high-impact AI, Web3, and full-stack solutions within 48 continuous hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => onOpenRegister('event-01')}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-black text-white text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-800 active:scale-95 transition-all shadow-2xl cursor-pointer"
            >
              <span>REGISTER FOR HACKATHON</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#hackathon-perspective"
              className="px-6 py-3.5 rounded-full border border-black/20 text-xs font-mono-code uppercase tracking-wider text-black hover:bg-black/5 active:scale-95 transition-all cursor-pointer font-semibold"
            >
              EXPLORE CRUCIBLE PERSPECTIVE ↓
            </a>
          </motion.div>
        </div>

        {/* Giant Central Vector Wordmark with Fluid Foam Canvas Overlay */}
        <div className="relative z-10 w-full my-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full flex items-center justify-center select-none"
          >
            <div className="w-full flex items-center justify-between font-black tracking-tighter text-[11vw] sm:text-[12vw] md:text-[13vw] leading-none text-[#121212] drop-shadow-sm select-none">
              <span>H</span>
              <span>A</span>
              <span>C</span>
              <span>K</span>
              <span>A</span>
              <span>T</span>
              <span>H</span>
              <span>O</span>
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

      {/* 2. Dedicated 3-Slide Narrative Perspective Carousel for HACKATHON */}
      <section
        id="hackathon-perspective"
        className="relative w-full py-24 px-6 sm:px-12 bg-black text-white border-t border-zinc-900 select-none"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-zinc-800/80">
            <div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                About Hackathon
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 mr-2">
                {HACKATHON_CAROUSEL_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center text-[10px] font-mono-code font-bold ${
                      currentSlide === idx
                        ? 'w-10 bg-white text-black'
                        : 'w-6 bg-zinc-800 text-zinc-500 hover:bg-zinc-700 hover:text-white'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentSlide((prev) =>
                    prev === 0 ? HACKATHON_CAROUSEL_SLIDES.length - 1 : prev - 1
                  )
                }
                className="w-10 h-10 border border-zinc-800 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % HACKATHON_CAROUSEL_SLIDES.length)
                }
                className="w-10 h-10 border border-zinc-800 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carousel Card */}
          <div className="relative border border-zinc-800 bg-[#080808] p-8 sm:p-16 md:p-20 overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="max-w-4xl"
              >
                <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                  {slide.title}
                </h3>

                <h4 className="text-lg sm:text-2xl font-semibold text-zinc-300 mb-6 leading-snug">
                  {slide.subtitle}
                </h4>

                <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-10 max-w-3xl font-normal">
                  {slide.description}
                </p>

                <button
                  onClick={() => onOpenRegister('event-01')}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-200 active:scale-95 transition-all shadow-xl cursor-pointer"
                >
                  <span>CLAIM HACKATHON SPOT</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 2.5 3D Constellation Orbital Gallery of Hackathon Tracks */}
      <div id="hackathon-tracks">
        <ConstellationOrbitalGallery
          items={HACKATHON_TRACK_ITEMS}
          title="HACKATHON TRACKS"
          subtitle="06 INNOVATION DOMAINS"
          centerSymbol="H"
          onOpenRegister={onOpenRegister}
        />
      </div>

      {/* 3. Newspaper Broadsheet & Rules Breakdown Section */}
      <div id="hackathon-broadsheet" className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        {/* Broadsheet Masthead */}
        <div className="text-center pb-8 mb-10 border-b-2 border-white/20">
          <div className="flex items-center justify-between text-[10px] font-mono-code uppercase tracking-widest text-zinc-400 pb-2 border-b border-zinc-800 mb-6">
            <span>VOL. XXVI // NO. 01</span>
            <span className="font-bold text-white">THE NIRVAN HACKATHON GAZETTE</span>
            <span>OCTOBER 2026 // HACKATHON EDITION</span>
          </div>

          <h2 className="font-newspaper-serif text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase mb-3">
            The Hackathon Dispatch
          </h2>

          <p className="text-xs sm:text-sm font-mono-code uppercase tracking-widest text-zinc-400 max-w-2xl mx-auto">
            OFFICIAL BLUEPRINT &bull; 48-HOUR SPRINT &bull; ₹2,50,000+ IN CASH &amp; GRANTS &bull; FREE ENTRY
          </p>
        </div>

        {/* Competition Switcher Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-zinc-800/80">
          <span className="text-xs font-mono-code uppercase tracking-wider text-zinc-500 mr-2">
            SWITCH ARENA:
          </span>
          {['Hackathon', 'Esports', 'CTF', 'Treasure Hunt', 'Workshop'].map((arena) => (
            <button
              key={arena}
              onClick={() => onSelectOtherCompetition(arena)}
              className={`px-4 py-1.5 text-xs font-mono-code uppercase tracking-wider transition-all cursor-pointer border ${
                arena === 'Hackathon'
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
              }`}
            >
              {arena}
            </button>
          ))}
        </div>

        {/* 2-Column Broadsheet Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24">
          <div className="lg:col-span-8 space-y-10">
            {/* Overview & Photo */}
            <div className="bg-[#0c0c0e] border border-zinc-800 p-8 sm:p-10 relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-0.5 bg-white text-black text-xs font-mono-code font-bold uppercase">
                  001 // HACKATHON
                </span>
                <span className="text-xs font-mono-code text-zinc-500 uppercase tracking-widest">
                  SPECIAL FEATURE
                </span>
              </div>

              <h3 className="font-newspaper-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
                48-Hour National Hackathon
              </h3>

              <p className="text-sm font-mono-code uppercase tracking-wider text-zinc-300 mb-6">
                FLAGSHIP INNOVATION CRUCIBLE &amp; PRODUCT SPRINT
              </p>

              <div className="aspect-[16/9] w-full bg-zinc-900 border border-zinc-800 overflow-hidden mb-8 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&h=650&fit=crop&q=80"
                  alt="Hackathon Arena"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-zinc-300 leading-relaxed text-sm sm:text-base border-t border-zinc-800 pt-6">
                <p>
                  The flagship event of NIRVAN 2026. Teams conceive, build, and pitch functional software and hardware MVPs. Backed by 1-on-1 industry mentorship from Google, Polygon, and AWS staff engineers, leading to a live pitch demo day.
                </p>
                <p className="text-zinc-400">
                  Assemble your team of 2-4 builders to architect, code, and deploy high-impact AI, Web3, and full-stack solutions within 48 continuous hours.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-zinc-800">
                {['GENAI', 'WEB3', 'FULLSTACK', 'HARDWARE', 'DEVFOLIO'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[10px] font-mono-code text-zinc-400 uppercase"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Rules & Eligibility */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 sm:p-8 bg-[#0a0a0c] border border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-800">
                  <Shield className="w-4 h-4 text-white" />
                  <span>RULES &amp; CODE OF CONDUCT</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>Original code authored during the 48-hour sprint only.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>Public GitHub repository with commits logged from kickoff.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>Live functional product demonstration required at Demo Day.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 sm:p-8 bg-[#0a0a0c] border border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-800">
                  <Users className="w-4 h-4 text-white" />
                  <span>ELIGIBILITY &amp; SQUAD SPECS</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>Open to undergraduate &amp; postgraduate students globally.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>Squad size: 2 to 4 registered members.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>Individual registrations matched via Discord matchmaking.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Sticky Summary Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 bg-[#0a0a0c] border-2 border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="text-xs font-mono-code uppercase tracking-widest text-zinc-500 pb-3 border-b border-zinc-800">
                HACKATHON SUMMARY // DISPATCH
              </div>

              {/* Countdown Timer */}
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono-code text-zinc-400 uppercase tracking-widest mb-2">
                  <Clock className="w-3 h-3 text-white" />
                  <span>HACKATHON COUNTDOWN</span>
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

              {/* Core Metrics */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 bg-black border border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-mono-code text-zinc-400">ENTRY FEE</span>
                  <span className="text-sm font-bold text-white font-mono-code">₹0 (Free)</span>
                </div>
                <div className="p-3.5 bg-black border border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-mono-code text-zinc-400">TRACK BOUNTY</span>
                  <span className="text-sm font-bold text-white font-mono-code">
                    ₹2,50,000 + $5K Grants
                  </span>
                </div>
                <div className="p-3.5 bg-black border border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-mono-code text-zinc-400">SQUAD SIZE</span>
                  <span className="text-sm font-bold text-white font-mono-code">2 - 4 Members</span>
                </div>
              </div>

              <button
                onClick={() => onOpenRegister('event-01')}
                className="w-full py-4 bg-white text-black text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-200 active:scale-95 transition-all shadow-xl cursor-pointer"
              >
                REGISTER SQUAD NOW ↗
              </button>

              <div className="text-center pt-2">
                <a
                  href="https://discord.gg"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono-code text-zinc-400 hover:text-white uppercase tracking-wider underline underline-offset-4"
                >
                  JOIN DISCORD FOR TEAM FINDER
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Schedule Flowchart */}
        <div className="mb-24 pt-12 border-t-2 border-zinc-800">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-2">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>CHRONOLOGY // 48-HOUR HACKATHON TIMELINE</span>
            </div>
            <h3 className="font-newspaper-serif text-4xl sm:text-6xl font-bold text-white uppercase">
              Schedule of Events
            </h3>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800 -translate-x-1/2" />

            <div className="space-y-8">
              {SCHEDULE_ITEMS.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 ${
                      isEven ? 'sm:flex-row-reverse text-left sm:text-right' : 'text-left'
                    }`}
                  >
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-20 w-4 h-4 rounded-full bg-black border-2 border-white flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>

                    <div className="ml-10 sm:ml-0 sm:w-1/2 p-6 bg-[#0c0c0e] border border-zinc-800 hover:border-zinc-600 transition-colors shadow-lg">
                      <div className="flex items-center gap-2 text-[10px] font-mono-code text-zinc-500 uppercase tracking-widest mb-1">
                        <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-white font-bold">
                          {item.time}
                        </span>
                        <span>&bull; {item.stage}</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs font-mono-code text-zinc-400 uppercase">
                        {item.subtitle}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5. Organizers Spotlight */}
        <div className="pt-12 border-t-2 border-zinc-800">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-2">
              <Users className="w-3.5 h-3.5 text-zinc-400" />
              <span>LEADERSHIP // HACKATHON JURY &amp; CONVENERS</span>
            </div>
            <h3 className="font-newspaper-serif text-4xl sm:text-6xl font-bold text-white uppercase">
              Meet The Organizers
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ORGANIZERS.map((org) => (
              <motion.div
                key={org.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#09090b] border border-zinc-800 p-6 flex flex-col justify-between hover:border-zinc-500 transition-all duration-300 group"
              >
                <div>
                  <div className="aspect-square w-full bg-zinc-900 border border-zinc-800 overflow-hidden mb-4 shadow-md">
                    <img
                      src={org.photo}
                      alt={org.name}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1">{org.name}</h4>
                  <div className="text-xs font-mono-code text-zinc-400 uppercase mb-2">
                    {org.role}
                  </div>
                  <div className="text-[11px] font-mono-code text-zinc-500 uppercase tracking-wider mb-4">
                    {org.organization}
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-normal">
                    {org.bio}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-zinc-800 text-zinc-400">
                  {org.socials.github && (
                    <a
                      href={org.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-colors p-1"
                      aria-label="GitHub"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                  {org.socials.linkedin && (
                    <a
                      href={org.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-colors p-1"
                      aria-label="LinkedIn"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
