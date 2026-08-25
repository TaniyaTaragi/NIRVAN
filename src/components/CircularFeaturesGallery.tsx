import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Sparkles, Users, Shield, ArrowRight } from 'lucide-react';
import { EventTrack } from '../types';

export const EVENT_TRACKS: EventTrack[] = [
  {
    id: 'track-01',
    code: '001',
    title: 'WEB3 & DECENTRALIZED PROTOCOLS',
    category: 'Hackathon',
    subtitle: 'SMART CONTRACTS & ZERO-KNOWLEDGE PROOFS',
    description: 'Engineer unstoppable dApps, account abstraction protocols, and decentralized compute networks.',
    fullOverview: 'Build next-generation decentralized infrastructure using EVM, Solana, or ZK-rollups. Projects should address real liquidity, privacy, or verifiable credential challenges.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop&q=80',
    prizePool: '₹1,25,000 + $2,000 Grants',
    entryFee: '₹0 (Free)',
    teamSize: '2 - 4 Members',
    tags: ['ETHEREUM', 'POLYGON', 'ZK-SNARKS', 'DEFI'],
    rules: ['Must deploy on public testnet/mainnet', 'Smart contracts must be verified on block explorer', 'Original repository initialized at kickoff'],
    eligibility: ['Open to all students & independent builders worldwide'],
  },
  {
    id: 'track-02',
    code: '002',
    title: 'GENERATIVE AI & AUTONOMOUS AGENTS',
    category: 'Hackathon',
    subtitle: 'MULTI-AGENT ORCHESTRATION & LLM SYSTEMS',
    description: 'Deploy self-healing autonomous agent swarms, context-aware reasoning engines, and multimodal pipelines.',
    fullOverview: 'Create multi-agent architectures that autonomously plan, execute tools, and verify complex domain tasks. Focus on agent collaboration, memory persistence, and sub-second latency.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop&q=80',
    prizePool: '₹1,50,000 + GPU Cloud Compute',
    entryFee: '₹0 (Free)',
    teamSize: '2 - 4 Members',
    tags: ['AGENTIC AI', 'LANGCHAIN', 'RAG', 'OPENAI'],
    rules: ['Must feature live working demo with interactive prompt loop', 'No wrapper apps without unique orchestration logic', 'Open-source on GitHub'],
    eligibility: ['All enrolled students and recent graduates'],
  },
  {
    id: 'track-03',
    code: '003',
    title: 'AUTONOMOUS ROBOTICS & EMBEDDED IOT',
    category: 'Hackathon',
    subtitle: 'EDGE COMPUTING & REAL-TIME HARDWARE',
    description: 'Integrate computer vision with physical microcontrollers, drones, and autonomous rover teleoperation.',
    fullOverview: 'Bridge physical hardware with real-time telemetry pipelines. Hardware kits (Raspberry Pi / ESP32) will be available on-campus for shortlisted teams.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&q=80',
    prizePool: '₹1,00,000 + Hardware Bounties',
    entryFee: '₹0 (Free)',
    teamSize: '2 - 4 Members',
    tags: ['ROS2', 'ESP32', 'COMPUTER VISION', 'TELEMETRY'],
    rules: ['Physical hardware or Gazebo simulator demonstration required', 'Live telemetry dashboard must stream data in real time'],
    eligibility: ['Engineering & science students'],
  },
  {
    id: 'track-04',
    code: '004',
    title: 'CYBER DEFENSE & ZERO-TRUST SECURITY',
    category: 'Hackathon',
    subtitle: 'CRYPTOGRAPHIC AUDITING & RED-TEAM PROTOCOLS',
    description: 'Build predictive threat intelligence systems, post-quantum encryption vaults, and automated vulnerability scanners.',
    fullOverview: 'Tackle high-impact security challenges: supply-chain security, automated AST parsing for zero-day detection, and cryptographic access control for cloud clusters.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&q=80',
    prizePool: '₹90,000 + Certifications',
    entryFee: '₹0 (Free)',
    teamSize: '2 - 4 Members',
    tags: ['ZERO-TRUST', 'EBPF', 'CRYPTOGRAPHY', 'SIEM'],
    rules: ['Ethical hacking and security tooling only', 'Detailed threat model document required'],
    eligibility: ['Open globally to undergraduate & postgraduate students'],
  },
  {
    id: 'track-05',
    code: '005',
    title: 'FINTECH & ALGORITHMIC INTELLIGENCE',
    category: 'Hackathon',
    subtitle: 'HIGH-FREQUENCY DATA & FRAUD DEFENSE',
    description: 'Architect low-latency financial settlement engines, synthetic asset trading bots, and anti-money laundering telemetry.',
    fullOverview: 'Revolutionize modern finance with sub-millisecond execution, AI-driven credit scoring, and open banking protocols connecting Indian and global rails.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&q=80',
    prizePool: '₹1,00,000 + Fast-track Interviews',
    entryFee: '₹0 (Free)',
    teamSize: '2 - 4 Members',
    tags: ['FINTECH', 'UPI', 'ALGO-TRADING', 'RISK ENGINES'],
    rules: ['Must integrate with sandbox banking APIs or real-time market feeds', 'Compliance & security rubric applies'],
    eligibility: ['All college students'],
  },
  {
    id: 'track-06',
    code: '006',
    title: 'CLIMATE TECH & RENEWABLE ENERGY',
    category: 'Hackathon',
    subtitle: 'CARBON AUDITING & GRID OPTIMIZATION',
    description: 'Develop intelligent power dispatch algorithms, carbon credit verification protocols, and urban sustainability models.',
    fullOverview: 'Deploy data-driven solutions for renewable microgrids, battery health forecasting, and satellite-based deforestation and carbon sequestration monitoring.',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&h=600&fit=crop&q=80',
    prizePool: '₹80,000 + Sustainability Grant',
    entryFee: '₹0 (Free)',
    teamSize: '2 - 4 Members',
    tags: ['GREEN TECH', 'GIS', 'SOLAR IOT', 'CARBON DATA'],
    rules: ['Must cite verified ecological or energy data sources', 'Measurable sustainability impact score'],
    eligibility: ['Open to all students & researchers'],
  },
  {
    id: 'track-07',
    code: '007',
    title: 'HEALTHCARE & BIOMEDICAL INTELLIGENCE',
    category: 'Hackathon',
    subtitle: 'DIAGNOSTIC TELEMETRY & GENOMIC COMPUTATION',
    description: 'Build privacy-preserving federated health models, real-time vital telemetry monitors, and clinical workflow accelerators.',
    fullOverview: 'Transform patient outcomes with offline-first rural clinic tools, diagnostic image segmentation, and EHR interoperability systems compliant with ABDM standards.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&q=80',
    prizePool: '₹90,000 + MedTech Incubator',
    entryFee: '₹0 (Free)',
    teamSize: '2 - 4 Members',
    tags: ['MEDTECH', 'HIPAA/ABDM', 'FEDERATED AI', 'DICOM'],
    rules: ['Synthetic or anonymized clinical datasets only', 'Clear safety & verification documentation'],
    eligibility: ['Open globally'],
  },
  {
    id: 'track-08',
    code: '008',
    title: 'SPATIAL COMPUTING & AR/VR WORLDS',
    category: 'Workshop',
    subtitle: '3D WEBGL & IMMERSIVE ENVIRONMENTS',
    description: 'Design weightless spatial web experiences, WebXR simulations, and physical interaction choreography.',
    fullOverview: 'Hands-on masterclass and 24-hour sprint in spatial computing using Three.js, WebGL shaders, GSAP, and Apple Vision Pro / Quest WebXR frameworks.',
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&h=600&fit=crop&q=80',
    prizePool: '₹75,000 + VR Hardware Kits',
    entryFee: '₹0 (Free)',
    teamSize: '1 - 3 Members',
    tags: ['THREE.JS', 'WEBXR', 'GLSL', 'SPATIAL UI'],
    rules: ['Interactive 3D browser or headset experience', 'Target 60fps performance on standard browsers'],
    eligibility: ['All creative coders & 3D artists'],
  },
  {
    id: 'track-09',
    code: '009',
    title: 'GAME DEV & MULTIMEDIA BLITZ',
    category: 'Esports',
    subtitle: 'PROCEDURAL GENERATION & LIVE NETWORKING',
    description: 'Develop fast-paced multiplayer web games, physics-driven platformers, and audio-reactive worlds.',
    fullOverview: 'Ship a complete multiplayer or indie game in 48 hours using Unity, Godot, or Phaser. Focus on fluid gameplay feel, dynamic shaders, and low-ping netcode.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop&q=80',
    prizePool: '₹80,000 + Gaming Gear',
    entryFee: '₹0 (Free)',
    teamSize: '2 - 4 Members',
    tags: ['UNITY', 'GODOT', 'WEBSOCKETS', 'SHADERS'],
    rules: ['Playable build must be submitted on itch.io or web link', 'Custom audio and game mechanics evaluated'],
    eligibility: ['Students & indie game devs'],
  },
  {
    id: 'track-10',
    code: '010',
    title: 'CLOUD NATIVE & DEVOPS ORCHESTRATION',
    category: 'Hackathon',
    subtitle: 'KUBERNETES & DISTRIBUTED EDGE SYSTEMS',
    description: 'Build zero-downtime deployment pipelines, ephemeral dev environments, and self-healing cloud clusters.',
    fullOverview: 'Design developer infrastructure that cuts cloud costs, speeds up CI/CD build times by 10x, or enables sovereign local edge cloud deployments.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
    prizePool: '₹75,000 + Cloud Credits',
    entryFee: '₹0 (Free)',
    teamSize: '2 - 4 Members',
    tags: ['KUBERNETES', 'DOCKER', 'TERRAFORM', 'EDGE'],
    rules: ['Reproducible Dockerfile / helm charts provided', 'Live deployment benchmark demonstration'],
    eligibility: ['College students & cloud enthusiasts'],
  },
  {
    id: 'track-11',
    code: '011',
    title: 'QUANTUM ALGORITHMS & FUTURE TECH',
    category: 'Workshop',
    subtitle: 'CIRCUIT SYNTHESIS & QISKIT WORKFLOWS',
    description: 'Simulate quantum annealing, variational quantum eigensolvers, and quantum encryption protocols.',
    fullOverview: 'Explore the computational paradigm of qubits and superposition. Mentored workshop with IBM Qiskit and PennyLane researchers.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop&q=80',
    prizePool: '₹60,000 + Quantum Research Fellowship',
    entryFee: '₹0 (Free)',
    teamSize: '1 - 3 Members',
    tags: ['QISKIT', 'PENNYLANE', 'QUBITS', 'ALGORITHMS'],
    rules: ['Simulations and algorithm proofs verified by academic panel'],
    eligibility: ['Open to all students interested in physics & CS'],
  },
  {
    id: 'track-12',
    code: '012',
    title: 'PRODUCT DESIGN & TACTILE CRAFT',
    category: 'Fest',
    subtitle: 'EDITORIAL TYPOGRAPHY & DESIGN SYSTEMS',
    description: 'Create museum-grade design systems, micro-interactions, and accessible web experiences.',
    fullOverview: 'Craft an end-to-end digital product design with bespoke typographic rhythm, fluid micro-interactions, Figma component architecture, and live front-end prototype.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop&q=80',
    prizePool: '₹70,000 + Design Agency Retainer',
    entryFee: '₹0 (Free)',
    teamSize: '1 - 3 Members',
    tags: ['FIGMA', 'TAILWIND', 'AWWWARDS CRAFT', 'ACCESSIBILITY'],
    rules: ['Figma file with autolayout + interactive web prototype required'],
    eligibility: ['Design students, self-taught UI/UX creators'],
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
  const velocityRef = useRef(0.2);
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
        const cruiseVelocity = hoveredItemRef.current ? 0.06 : 0.22;
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

  // Drag interaction with velocity injection
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

  // Wheel event adds impulse velocity
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
          EVENT TRACKS // 012 CRUCIBLES
        </div>
        <div className="inline-flex items-center gap-2 text-[11px] font-mono-code uppercase tracking-widest text-zinc-400">
          <Sparkles className="w-3 h-3 text-zinc-300" />
          <span>DRAG &bull; SCROLL SPIN &bull; CLICK TO PREVIEW</span>
        </div>
      </div>

      {/* 360° Circular Orbital Constellation Canvas */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className={`relative w-full max-w-6xl h-[620px] sm:h-[700px] mx-auto flex items-center justify-center my-auto overflow-visible ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Central Cipher Line-Art Emblem */}
        <div className="absolute z-20 pointer-events-none flex items-center justify-center">
          <svg
            viewBox="0 0 100 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-8 text-white opacity-85 drop-shadow-md"
          >
            <ellipse cx="50" cy="20" rx="45" ry="16" stroke="currentColor" strokeWidth="1.2" />
            <ellipse cx="50" cy="20" rx="32" ry="12" stroke="currentColor" strokeWidth="1.2" />
            <ellipse cx="50" cy="20" rx="18" ry="7" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="50" cy="20" r="2.5" fill="currentColor" />
          </svg>
        </div>

        {/* Orbit Ring of 12 Event Cards */}
        {EVENT_TRACKS.map((item, idx) => {
          const count = EVENT_TRACKS.length;
          const baseAngle = idx * (360 / count);
          const currentTotalAngle = (baseAngle + rotationAngle) % 360;
          const radians = (currentTotalAngle * Math.PI) / 180;

          const radiusX = 390;
          const radiusY = 165;
          const x = Math.cos(radians) * radiusX;
          const y = Math.sin(radians) * radiusY;

          const normalizedDepth = (Math.sin(radians) + 1) / 2;
          const isHovered = selectedItem === null && hoveredItem?.id === item.id;
          const isAnyHovered = selectedItem === null && hoveredItem !== null;

          const scale = isHovered ? 1.15 : 0.74 + normalizedDepth * 0.36;
          const zIndex = isHovered ? 40 : Math.round(normalizedDepth * 30);

          let opacity = 0.45 + normalizedDepth * 0.55;
          let filter = 'grayscale(0%)';

          if (isAnyHovered) {
            if (isHovered) {
              opacity = 1;
              filter = 'grayscale(0%) brightness(1.15)';
            } else {
              opacity = 0.22;
              filter = 'grayscale(100%) brightness(0.55)';
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
              className="absolute w-[200px] sm:w-[240px] h-[135px] sm:h-[160px] bg-zinc-900 border border-white/20 hover:border-white transition-all duration-200 cursor-pointer overflow-hidden shadow-2xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              <div className="absolute inset-0 bg-black/30 hover:bg-transparent transition-colors" />

              {/* Minimalist Top Code & Category Badge */}
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="px-1.5 py-0.5 bg-black/85 text-[9px] font-mono-code uppercase tracking-wider text-white border border-white/10">
                  {item.code}
                </span>
                <span className="px-1.5 py-0.5 bg-white/20 backdrop-blur-md text-[8px] font-mono-code uppercase tracking-wider text-zinc-200">
                  {item.category}
                </span>
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
              {/* Top Close Button (Step 2: Modal Dismissal) */}
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

                {/* Track Details & Quick Summary */}
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

                  {/* Modal Action Bridge (Step 3: Page Redirection to Page 2 Newspaper View) */}
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
