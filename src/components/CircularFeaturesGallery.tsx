import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Sparkles, Users, Shield, ArrowRight } from 'lucide-react';
import { EventTrack } from '../types';

export const EVENT_TRACKS: EventTrack[] = [
  {
    id: 'event-01',
    code: '001',
    title: '48-HOUR NATIONAL HACKATHON',
    category: 'Hackathon',
    subtitle: 'FLAGSHIP INNOVATION CRUCIBLE & PRODUCT SPRINT',
    description: 'Assemble your team of 2-4 builders to architect, code, and deploy high-impact AI, Web3, and full-stack solutions within 48 continuous hours.',
    fullOverview: 'The flagship event of NIRVAN 2026. Teams conceive, build, and pitch functional software and hardware MVPs. Backed by 1-on-1 industry mentorship from Google, Polygon, and AWS staff engineers, leading to a live pitch demo day.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&h=650&fit=crop&q=80',
    prizePool: '₹2,50,000 + $5,000 Cloud Grants',
    entryFee: '₹0 (Free)',
    teamSize: '2 - 4 Members',
    tags: ['GENAI', 'WEB3', 'FULLSTACK', 'HARDWARE'],
    rules: [
      'Original code authored during the 48-hour sprint only',
      'Public GitHub repository with commits logged from kickoff',
      'Live functional product demonstration required at Demo Day',
    ],
    eligibility: ['Open to undergraduate & postgraduate students globally'],
  },
  {
    id: 'event-02',
    code: '002',
    title: 'ESPORTS ARENA CHAMPIONSHIP',
    category: 'Esports',
    subtitle: 'TACTICAL TOURNAMENTS & LIVE STREAM BATTLES',
    description: 'Compete in high-octane Valorant, BGMI, and EA FC tournaments on ultra-low latency LAN servers with broadcast live casting.',
    fullOverview: 'An adrenaline-fueled competitive gaming showdown featuring multi-bracket knockout rounds, custom spectator stages, and top gaming gear prizes for winning squads.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&h=650&fit=crop&q=80',
    prizePool: '₹1,00,000 + Gaming Gear',
    entryFee: '₹0 (Free)',
    teamSize: '4 - 5 Members (Per Squad)',
    tags: ['VALORANT', 'BGMI', 'LAN ARENA', 'CASTING'],
    rules: [
      'Standard anti-cheat and tournament fair-play regulations apply',
      'Official squad captains must be present for check-in 30 mins prior',
      'Double-elimination bracket format for semifinals and finals',
    ],
    eligibility: ['Open to all registered college students & collegiate esports teams'],
  },
  {
    id: 'event-03',
    code: '003',
    title: 'CTF // CAPTURE THE FLAG',
    category: 'CTF',
    subtitle: 'CYBER SIEGE, REVERSING & CRYPTOGRAPHIC EXPLOITS',
    description: 'Solve jeopardy-style cyber security challenges across web exploitation, binary reversing, cryptography, and digital forensics.',
    fullOverview: 'Test your offensive and defensive hacking mettle. A 24-hour intense cyber siege with real-time dynamic scoreboards, hidden zero-day challenges, and industry recruiting bounties.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&h=650&fit=crop&q=80',
    prizePool: '₹75,000 + Certifications',
    entryFee: '₹0 (Free)',
    teamSize: '1 - 3 Members',
    tags: ['REVERSING', 'PWN', 'CRYPTO', 'FORENSICS'],
    rules: [
      'No DDoS or attacks against CTF infrastructure allowed',
      'Flag sharing between distinct teams leads to instant disqualification',
      'Write-ups required for top 3 teams post-event',
    ],
    eligibility: ['Open to ethical hackers, students, and independent security researchers'],
  },
  {
    id: 'event-04',
    code: '004',
    title: 'THE CRYPTIC TREASURE HUNT',
    category: 'Treasure Hunt',
    subtitle: 'CAMPUS ARG QUEST & LOGICAL CIPHERS',
    description: 'Decode multi-layered ciphers, geolocation puzzles, and augmented-reality clues scattered across physical and digital realms.',
    fullOverview: 'An immersive alternate-reality game (ARG) combining cryptographic riddles, terminal puzzle boxes, campus waypoints, and fast-paced team coordination.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&h=650&fit=crop&q=80',
    prizePool: '₹50,000 + Mystery Tech Bundles',
    entryFee: '₹0 (Free)',
    teamSize: '2 - 4 Members',
    tags: ['CIPHERS', 'ARG QUEST', 'LOGIC', 'GEOLOCATION'],
    rules: [
      'Teams must solve clues in sequential lock order',
      'Smartphone required with Discord connection for bot hints',
      'Fastest verified checkpoint completions determine leaderboard winners',
    ],
    eligibility: ['All enrolled students attending on-campus or virtual hub'],
  },
  {
    id: 'event-05',
    code: '005',
    title: 'TECH WORKSHOPS & MASTERCLASSES',
    category: 'Workshop',
    subtitle: 'HANDS-ON GENAI, WEB3 & SYSTEMS ENGINEERING',
    description: 'Deep-dive masterclasses led by staff engineers and researchers covering Autonomous Agent swarms, Zero-Knowledge proofs, and Spatial 3D UI.',
    fullOverview: 'Interactive 3-hour code-along workshops with starter kits, cloud compute tokens, and verified certifications for all attending developers.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&h=650&fit=crop&q=80',
    prizePool: 'Certifications + Mentorship Retainers',
    entryFee: '₹0 (Free)',
    teamSize: 'Individual / Open',
    tags: ['GENAI AGENTS', 'ZK-PROOFS', 'THREE.JS', 'DEV TOOLS'],
    rules: [
      'Bring your laptop with Node.js / Python installed',
      'Starter repositories provided prior to each masterclass session',
    ],
    eligibility: ['Open to all students, developers, and designers'],
  },
];

interface CircularFeaturesGalleryProps {
  onSelectTrackForNewspaper: (track: EventTrack) => void;
  onOpenRegister: (trackId?: string) => void;
}

export const CircularFeaturesGallery: React.FC<CircularFeaturesGalleryProps> = ({
  onSelectTrackForNewspaper,
  onOpenRegister,
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<EventTrack | null>(null);
  const [selectedItem, setSelectedItem] = useState<EventTrack | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Physics momentum refs
  const angleRef = useRef(0);
  const velocityRef = useRef(0.25);
  const isDraggingRef = useRef(false);
  const lastMouseX = useRef(0);
  const hoveredItemRef = useRef<EventTrack | null>(null);

  useEffect(() => {
    hoveredItemRef.current = hoveredItem;
  }, [hoveredItem]);

  // ESC key dismisses modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 1. Continuous 60fps Momentum Physics Loop
  useEffect(() => {
    let animId: number;
    const updatePhysics = () => {
      if (!isDraggingRef.current) {
        const cruiseVelocity = hoveredItemRef.current ? 0.05 : 0.22;
        velocityRef.current = velocityRef.current * 0.96 + cruiseVelocity * 0.04;
        angleRef.current = (angleRef.current + velocityRef.current) % 360;
        setRotationAngle(angleRef.current);
      }
      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, []);

  // 2. Animated Dot Matrix Particle Wave Canvas Layer
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

    const cols = 45;
    const rows = 24;
    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const spacingX = width / cols;
      const spacingY = height / rows;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacingX + spacingX / 2;
          const y = j * spacingY + spacingY / 2;

          const dx = x - width / 2;
          const dy = y - height / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const wave = Math.sin(dist * 0.015 - time * 2);
          const alpha = Math.max(0.04, Math.min(0.25, (wave + 1) * 0.12));

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Drag interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedItem !== null) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    lastMouseX.current = e.clientX;
    velocityRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || selectedItem !== null) return;
    const delta = e.clientX - lastMouseX.current;
    lastMouseX.current = e.clientX;

    angleRef.current = (angleRef.current + delta * 0.35) % 360;
    velocityRef.current = delta * 0.25;
    setRotationAngle(angleRef.current);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  // Wheel impulse
  const handleWheel = (e: React.WheelEvent) => {
    if (selectedItem !== null) return;
    e.preventDefault();
    const impulse = e.deltaY > 0 ? 1.8 : -1.8;
    velocityRef.current += impulse;
    velocityRef.current = Math.max(-8, Math.min(8, velocityRef.current));
  };

  const activeItem =
    hoveredItem ||
    EVENT_TRACKS[
      Math.floor((((rotationAngle % 360) + 360) % 360) / (360 / EVENT_TRACKS.length)) %
        EVENT_TRACKS.length
    ] ||
    EVENT_TRACKS[0];

  return (
    <section
      id="features"
      className="relative w-full min-h-screen py-24 px-6 sm:px-12 bg-black text-white overflow-hidden select-none flex flex-col justify-between"
    >
      {/* Animated Dot Matrix Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      />

      {/* Top Section Meta (Cipher.tv Style) */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-10 pt-4">
        <div className="text-[11px] font-mono-code uppercase tracking-widest text-zinc-500">
          EVENT ARENAS // 05 CORE CRUCIBLES
        </div>
        <div className="inline-flex items-center gap-2 text-[11px] font-mono-code uppercase tracking-widest text-zinc-400">
          <Sparkles className="w-3 h-3 text-zinc-300" />
          <span>DRAG &bull; SCROLL SPIN &bull; CLICK TO PREVIEW</span>
        </div>
      </div>

      {/* 360° Circular Orbital Constellation Canvas with Scaled Cards (320px x 210px) */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className={`relative w-full max-w-6xl h-[650px] sm:h-[720px] mx-auto flex items-center justify-center my-auto overflow-visible ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Central Emblem */}
        <div className="absolute z-20 pointer-events-none flex items-center justify-center">
          <svg
            viewBox="0 0 100 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-10 text-white opacity-90 drop-shadow-lg"
          >
            <ellipse cx="50" cy="20" rx="45" ry="16" stroke="currentColor" strokeWidth="1.2" />
            <ellipse cx="50" cy="20" rx="32" ry="12" stroke="currentColor" strokeWidth="1.2" />
            <ellipse cx="50" cy="20" rx="18" ry="7" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="50" cy="20" r="2.5" fill="currentColor" />
          </svg>
        </div>

        {/* Orbit Ring of the 5 Core Events (Properly Spaced & Resized) */}
        {EVENT_TRACKS.map((item, idx) => {
          const count = EVENT_TRACKS.length;
          const baseAngle = idx * (360 / count);
          const currentTotalAngle = (baseAngle + rotationAngle) % 360;
          const radians = (currentTotalAngle * Math.PI) / 180;

          // Calibrated Orbit for 5 large cards
          const radiusX = 420;
          const radiusY = 175;
          const x = Math.cos(radians) * radiusX;
          const y = Math.sin(radians) * radiusY;

          const normalizedDepth = (Math.sin(radians) + 1) / 2;
          const isHovered = selectedItem === null && hoveredItem?.id === item.id;
          const isAnyHovered = selectedItem === null && hoveredItem !== null;

          const scale = isHovered ? 1.18 : 0.82 + normalizedDepth * 0.35;
          const zIndex = isHovered ? 40 : Math.round(normalizedDepth * 30);

          let opacity = 0.5 + normalizedDepth * 0.5;
          let filter = 'grayscale(0%)';

          if (isAnyHovered) {
            if (isHovered) {
              opacity = 1;
              filter = 'grayscale(0%) brightness(1.2)';
            } else {
              opacity = 0.25;
              filter = 'grayscale(100%) brightness(0.6)';
            }
          }

          return (
            <motion.div
              key={item.id}
              onMouseEnter={() => {
                if (selectedItem === null) setHoveredItem(item);
              }}
              onMouseLeave={() => {
                if (selectedItem === null) setHoveredItem(null);
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(item);
                setHoveredItem(null);
              }}
              style={{
                transform: `translate3d(${x}px, ${y}px, 0px) scale(${scale})`,
                zIndex,
                opacity,
                filter,
              }}
              className="absolute w-[280px] sm:w-[340px] md:w-[360px] h-[190px] sm:h-[225px] md:h-[240px] bg-zinc-900 border-2 border-white/20 hover:border-white transition-all duration-200 cursor-pointer overflow-hidden shadow-2xl group"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity" />

              {/* Top Code & Category Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-2 py-0.5 bg-black/90 text-[10px] font-mono-code font-bold uppercase tracking-wider text-white border border-white/20">
                  {item.code}
                </span>
                <span className="px-2 py-0.5 bg-white text-black text-[9px] font-mono-code font-extrabold uppercase tracking-wider shadow-md">
                  {item.category}
                </span>
              </div>

              {/* Bottom Card Title Overlay */}
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight drop-shadow-md line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-[10px] font-mono-code text-zinc-300 uppercase tracking-wider drop-shadow-sm">
                  {item.prizePool}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Metadata & Active Track Indicator */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-10 pb-4 pt-6 border-t border-zinc-900 text-xs font-mono-code uppercase tracking-widest text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold">{activeItem.code}</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400 hidden sm:inline">{activeItem.category} &bull; {activeItem.prizePool}</span>
        </div>

        <div className="text-white font-bold tracking-widest text-center text-sm sm:text-base">
          {activeItem.title}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onSelectTrackForNewspaper(activeItem)}
            className="text-white hover:text-zinc-300 font-extrabold flex items-center gap-1 cursor-pointer"
          >
            <span>FULL EDITORIAL</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Modal-to-Page Action Bridge (High-Contrast Dark Preview Modal z-[9999]) */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6 sm:p-10"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-[#09090b] border border-white/20 p-8 sm:p-12 relative overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 w-10 h-10 border border-white/20 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white transition-colors cursor-pointer z-20"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Track Hero Banner */}
                <div className="lg:col-span-5 aspect-[4/3] w-full bg-zinc-900 border border-white/10 overflow-hidden shadow-inner">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Track Details & Summary */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono-code text-zinc-500 uppercase tracking-widest">
                        {selectedItem.code} // {selectedItem.category}
                      </span>
                      <span className="px-2 py-0.5 bg-white text-black text-[10px] font-mono-code font-bold uppercase">
                        {selectedItem.prizePool}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                      {selectedItem.title}
                    </h3>
                    <p className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-4">
                      {selectedItem.subtitle}
                    </p>
                    <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                      {selectedItem.description}
                    </p>

                    {/* Quick Badges */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="p-3 bg-zinc-900/80 border border-zinc-800 flex items-center gap-2">
                        <Users className="w-4 h-4 text-zinc-400" />
                        <div>
                          <div className="text-[9px] font-mono-code text-zinc-500 uppercase">Team Size</div>
                          <div className="text-xs font-bold text-white">{selectedItem.teamSize}</div>
                        </div>
                      </div>
                      <div className="p-3 bg-zinc-900/80 border border-zinc-800 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-zinc-400" />
                        <div>
                          <div className="text-[9px] font-mono-code text-zinc-500 uppercase">Entry Fee</div>
                          <div className="text-xs font-bold text-white">{selectedItem.entryFee}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modal Action Bridge */}
                  <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={() => {
                        const track = selectedItem;
                        setSelectedItem(null);
                        onOpenRegister(track.id);
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono-code uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Quick Register
                    </button>

                    <button
                      onClick={() => {
                        const track = selectedItem;
                        setSelectedItem(null);
                        onSelectTrackForNewspaper(track);
                      }}
                      className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-black text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all cursor-pointer shadow-lg"
                    >
                      <span>VIEW FULL DETAILS</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
