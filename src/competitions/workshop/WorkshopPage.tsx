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
  BookOpen,
  Code2,
  Sparkles,
  Zap,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { ConstellationOrbitalGallery, ConstellationItem } from '../../components/ConstellationOrbitalGallery';
import { TeamMember, ScheduleItem } from '../../types';

export const WORKSHOP_CONSTELLATION_ITEMS: ConstellationItem[] = [
  {
    id: 'workshop-track-1',
    title: 'Autonomous AI Agent Swarms',
    brand: 'LLM REASONING LAB',
    category: 'Agent Swarms',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&h=650&fit=crop&q=80',
    description: 'Hands-on live coding with LangGraph, CrewAI, Ollama, and autonomous reasoning loops.',
    fullOverview: 'Build production multi-agent systems with persistent state, vector memory, and self-correcting code execution.',
    prizePool: 'Verified Credential',
    tags: ['AGENTS', 'LLM', 'LANGGRAPH', 'CREWAI'],
  },
  {
    id: 'workshop-track-2',
    title: 'Zero-Knowledge Proofs & Circom',
    brand: 'ZK-SNARK SYSTEMS',
    category: 'ZK Proofs',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=900&h=650&fit=crop&q=80',
    description: 'Write arithmetic circuits with Circom and verify zk-SNARK proofs on EVM smart contracts.',
    fullOverview: 'Learn privacy-preserving primitives and layer-2 state compression proofs with hands-on starter repos.',
    prizePool: 'ZK Certificate',
    tags: ['ZK-SNARKS', 'CIRCOM', 'SOLIDITY', 'PRIVACY'],
  },
  {
    id: 'workshop-track-3',
    title: 'Three.js & WebGPU Shaders',
    brand: 'SPATIAL WEB CRAFT',
    category: 'Three.js',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1633493763342-998f46ef581f?w=900&h=650&fit=crop&q=80',
    description: 'Build silky 60fps 3D canvas physics, custom GLSL fragment shaders, and GSAP micro-interactions.',
    fullOverview: 'Master modern creative engineering techniques used on top Awwwards-winning web projects.',
    prizePool: 'Creative Tech Pass',
    tags: ['THREE.JS', 'GLSL', 'SHADERS', 'GSAP'],
  },
  {
    id: 'workshop-track-4',
    title: 'Rust Concurrency & Performance',
    brand: 'SYSTEMS ENGINEERING',
    category: 'Rust Systems',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=650&fit=crop&q=80',
    description: 'Zero-cost abstractions, fearless concurrency with Tokio, and WebAssembly compilation.',
    fullOverview: 'Write ultra-low-latency backend microservices capable of processing millions of concurrent requests.',
    prizePool: 'Systems Badge',
    tags: ['RUST', 'TOKIO', 'WASM', 'CONCURRENCY'],
  },
  {
    id: 'workshop-track-5',
    title: 'AI Alignment & Prompt Injection',
    brand: 'RED TEAMING LAB',
    category: 'AI Security',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&h=650&fit=crop&q=80',
    description: 'Jailbreak auditing, indirect prompt injection defenses, and semantic guardrail pipelines.',
    fullOverview: 'Learn how to red-team enterprise LLM architectures and harden agentic applications against exploitation.',
    prizePool: 'Security Audit Pass',
    tags: ['RED-TEAM', 'PROMPT-INJECTION', 'GUARDRAILS', 'SECURITY'],
  },
  {
    id: 'workshop-track-6',
    title: 'Distributed Systems & Observability',
    brand: 'CLOUD ARCHITECTURE',
    category: 'Cloud Arch',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&h=650&fit=crop&q=80',
    description: 'High-availability Kubernetes clustering, OpenTelemetry tracing, and event-driven architectures.',
    fullOverview: 'Deploy distributed microservices with automated failovers and real-time distributed tracing.',
    prizePool: 'Cloud Architect Badge',
    tags: ['K8S', 'OPENTELEMETRY', 'KAFKA', 'DEVOPS'],
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

interface WorkshopPageProps {
  onBackToLanding: () => void;
  onOpenRegister: (trackId?: string) => void;
  onSelectOtherCompetition: (compId: string) => void;
}

const WORKSHOP_CAROUSEL_SLIDES = [
  {
    id: 'workshop-overview',
    badge: '01 // EVENT & DESCRIPTION',
    title: 'Event name + description',
    subtitle: 'NIRVAN Technical Masterclasses & Code-Alongs 2026',
    description:
      'Learn directly from staff researchers and engineering leads. Hands-on deep-dives into GenAI Agents, ZK Proofs, Three.js shaders, and Rust concurrency.',
    highlights: [
      {
        icon: BookOpen,
        title: 'Event Overview',
        description: 'Hands-on technical masterclasses with zero corporate fluff.',
      },
      {
        icon: Code2,
        title: 'Code-Along Format',
        description: 'Pre-configured starter repositories and cloud compute sandboxes.',
      },
      {
        icon: Sparkles,
        title: 'Industry Mentors',
        description: 'Guided by senior engineers from Google, Polygon, and AWS.',
      },
    ],
  },
  {
    id: 'workshop-schedule',
    badge: '02 // DATE, TIME & VENUE',
    title: 'Date + time + venue',
    subtitle: 'October 24 - 25, 2026 • Seminar Halls A, B & C',
    description:
      '3-hour masterclass sessions running across Saturday and Sunday. Attendees can reserve seats for individual tracks or attend full-day bootcamps.',
    highlights: [
      {
        icon: Calendar,
        title: 'Masterclass Dates',
        description: 'October 24 – October 25, 2026 (2-Day Bootcamp)',
      },
      {
        icon: Clock,
        title: 'Session Timings',
        description: 'Morning Sessions (10:00 AM) • Afternoon Deep-Dives (02:00 PM)',
      },
      {
        icon: MapPin,
        title: 'Lab Venue',
        description: 'Seminar Halls A, B & C, NIRVAN Tech Complex.',
      },
    ],
  },
  {
    id: 'workshop-eligibility',
    badge: '03 // TEAM SIZE & ELIGIBILITY',
    title: 'Team size + eligibility',
    subtitle: 'Individual Pass • Open to All Registered Developers & Students',
    description:
      'Individual registration. Bring your laptop with Node.js/Docker installed. All API keys and cloud credits provided upon check-in.',
    highlights: [
      {
        icon: Users,
        title: 'Registration Mode',
        description: 'Individual participant seat reservations.',
      },
      {
        icon: CheckCircle,
        title: 'Eligibility Requirements',
        description: 'Open to all developers, students, and tech enthusiasts.',
      },
      {
        icon: Shield,
        title: 'Prerequisites',
        description: 'Basic programming knowledge; all software starter templates provided.',
      },
    ],
  },
  {
    id: 'workshop-rewards',
    badge: '04 // REGISTRATION FEE & PRIZE POOL',
    title: 'Registration fee + prize pool',
    subtitle: '₹0 Entry Fee (100% Free) • Verifiable Credentials & $1,000+ API Credits',
    description:
      '100% free registration for all attendees. Receive official verifiable certificates of completion, OpenAI/Anthropic API keys, and cloud credit vouchers.',
    highlights: [
      {
        icon: Flame,
        title: 'Registration Fee',
        description: '₹0 (Free Admission for all accepted attendees)',
      },
      {
        icon: Trophy,
        title: 'Verifiable Credentials',
        description: 'On-chain digital certificates of masterclass completion.',
      },
      {
        icon: Zap,
        title: 'API & Cloud Credits',
        description: '$1,000+ cloud credits and AI API access tokens for all attendees.',
      },
    ],
  },
];

const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    id: 'w1',
    time: '02:00 PM',
    title: 'Masterclass 1: Autonomous AI Agent Swarms',
    subtitle: 'SEMINAR HALL A // MULTI-AGENT ORCHESTRATION',
    stage: 'AI AGENTS',
    status: 'completed',
  },
  {
    id: 'w2',
    time: '04:30 PM',
    title: 'Masterclass 2: Zero-Knowledge Circuits & Rollups',
    subtitle: 'SEMINAR HALL B // CIRCOM & EVM VERIFIERS',
    stage: 'ZK-PROOFS',
    status: 'live',
  },
  {
    id: 'w3',
    time: '07:00 PM',
    title: 'Masterclass 3: 3D Spatial Interfaces with Three.js',
    subtitle: 'SEMINAR HALL A // SHADERS & GSAP ANIMATION',
    stage: 'SPATIAL 3D',
    status: 'upcoming',
  },
];

const ORGANIZERS: TeamMember[] = [
  {
    id: 't2',
    name: 'Vikram Malhotra',
    role: 'Lead Workshop Instructor',
    organization: 'Google Cloud Developer Expert',
    bio: 'Specializing in neural agent workflows and high-scale Kubernetes clusters.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&q=80',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 't3',
    name: 'Ananya Roy',
    role: 'Web3 Masterclass Lead',
    organization: 'Polygon Core Contributor',
    bio: 'Mentoring builders on smart contract security and ZK rollups.',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop&q=80',
    socials: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
    },
  },
];

export const WorkshopPage: React.FC<WorkshopPageProps> = ({
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

  const slide = WORKSHOP_CAROUSEL_SLIDES[currentSlide];

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
            NIRVAN 2026 // 005 WORKSHOPS &amp; MASTERCLASSES
          </div>
        </div>
      </div>

      {/* 1. Dedicated WORKSHOP Hero */}
      <section className="relative min-h-[92vh] w-full flex flex-col justify-between p-6 sm:p-12 pt-16 overflow-hidden bg-[#f0f0f2] text-[#121212] my-6 select-none border-y border-zinc-300">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.img
            src="/assets/workshop-3d-bg.jpg"
            alt="WORKSHOP 3D Balloons"
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
            Hands-on Code, Staff Mentorship &amp; Certifications.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base sm:text-lg text-zinc-700 font-medium leading-relaxed mb-8 max-w-2xl"
          >
            Deep-dive masterclasses led by staff engineers and researchers covering Autonomous Agent swarms, Zero-Knowledge proofs, and Spatial 3D UI.
          </motion.p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenRegister('event-05')}
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-black text-white text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-800 active:scale-95 transition-all shadow-2xl cursor-pointer"
            >
              <span>REGISTER FOR WORKSHOPS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#workshop-constellation"
              className="px-6 py-3.5 rounded-full border border-black/20 text-xs font-mono-code uppercase tracking-wider text-black hover:bg-black/5 active:scale-95 transition-all cursor-pointer font-semibold"
            >
              EXPLORE MASTERCLASSES &amp; SCHEDULE ↓
            </a>
          </div>
        </div>

        <div className="relative z-10 w-full my-auto py-8">
          <div className="relative w-full flex items-center justify-center select-none">
            <div className="w-full flex items-center justify-between font-black tracking-tighter text-[11vw] sm:text-[12vw] md:text-[13vw] leading-none text-[#121212] drop-shadow-sm select-none">
              <span>W</span>
              <span>O</span>
              <span>R</span>
              <span>K</span>
              <span>S</span>
              <span>H</span>
              <span>O</span>
              <span>P</span>
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
                About Masterclasses
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 mr-2">
                {WORKSHOP_CAROUSEL_SLIDES.map((_, idx) => (
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
                    prev === 0 ? WORKSHOP_CAROUSEL_SLIDES.length - 1 : prev - 1
                  )
                }
                className="w-10 h-10 border border-zinc-800 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % WORKSHOP_CAROUSEL_SLIDES.length)
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
                    onClick={() => onOpenRegister('event-05')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
                  >
                    <span>CLAIM WORKSHOP PASS</span>
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

      {/* 2.5 3D Constellation Orbital Gallery of Workshop Masterclasses */}
      <div id="workshop-constellation">
        <ConstellationOrbitalGallery
          items={WORKSHOP_CONSTELLATION_ITEMS}
          title="WORKSHOP MASTERCLASSES"
          subtitle="06 HANDS-ON LAB TRACKS"
          centerSymbol="W"
          onSelectArena={onSelectOtherCompetition}
          onOpenRegister={onOpenRegister}
        />
      </div>

      {/* 3. Schedule & Organizers Section */}
      <div id="workshop-schedule" className="max-w-7xl mx-auto px-6 sm:px-12 py-20">
        {/* Schedule Flowchart */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-2">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>CHRONOLOGY // MASTERCLASS SESSIONS</span>
            </div>
            <h3 className="font-newspaper-serif text-4xl sm:text-6xl font-bold text-white uppercase">
              Schedule of Masterclasses
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
              <span>LEADERSHIP // INSTRUCTORS</span>
            </div>
            <h3 className="font-newspaper-serif text-4xl sm:text-6xl font-bold text-white uppercase">
              Meet The Instructors
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
