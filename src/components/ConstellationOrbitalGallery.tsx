import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

export interface ConstellationItem {
  id: string | number;
  title: string;
  brand?: string;
  category: string;
  year?: string;
  image: string;
  video?: string;
  aspect?: string;
  description: string;
  fullOverview?: string;
  prizePool?: string;
  entryFee?: string;
  teamSize?: string;
  tags?: string[];
  rules?: string[];
  eligibility?: string[];
  arenaRoute?: string;
}

interface ConstellationOrbitalGalleryProps {
  items: ConstellationItem[];
  title?: string;
  subtitle?: string;
  centerSymbol?: string;
  onSelectArena?: (arena: string) => void;
  onOpenRegister?: (id?: string) => void;
}

export const ConstellationOrbitalGallery: React.FC<ConstellationOrbitalGalleryProps> = ({
  items,
  title = 'EVENT ARENAS',
  subtitle = '05 CORE CRUCIBLES',
  centerSymbol = 'N',
  onSelectArena,
  onOpenRegister,
}) => {
  const [isGridView, setIsGridView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeItem, setActiveItem] = useState<ConstellationItem | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Physics state refs
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ x: 12, y: 0 });
  const targetRotRef = useRef({ x: 12, y: 0 });
  const velRef = useRef({ x: 0, y: 0.15 });
  const animFrameIdRef = useRef<number | null>(null);

  // Extract unique categories for grid filter
  const categories = ['ALL', ...Array.from(new Set(items.map((it) => it.category)))];

  // 3D Constellation Orbital Physics Loop
  useEffect(() => {
    if (isGridView) return;

    const ringEl = ringRef.current;
    const container = containerRef.current;
    if (!ringEl || !container) return;

    const total = items.length;
    const isMobile = window.innerWidth < 640;
    const radiusX = isMobile ? (total <= 6 ? 220 : 280) : (total <= 6 ? 480 : 560);
    const radiusZ = isMobile ? (total <= 6 ? 160 : 200) : (total <= 6 ? 320 : 380);

    // Position cards initially in 3D ellipse with multi-wave vertical dispersion
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const angle = (i / total) * Math.PI * 2;
      const x = Math.cos(angle) * radiusX;
      const z = Math.sin(angle) * radiusZ;
      const y = Math.sin(angle * 2) * 70 + Math.cos(angle * 3) * 30;

      card.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
      card.setAttribute('data-base-x', x.toString());
      card.setAttribute('data-base-y', y.toString());
      card.setAttribute('data-base-z', z.toString());
    });

    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - prevMouseRef.current.x;
      const deltaY = e.clientY - prevMouseRef.current.y;

      velRef.current = {
        x: -deltaY * 0.15,
        y: deltaX * 0.15,
      };

      targetRotRef.current.y += velRef.current.y;
      targetRotRef.current.x += velRef.current.x;

      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch events for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseRef.current.x;
      const deltaY = e.touches[0].clientY - prevMouseRef.current.y;

      velRef.current = {
        x: -deltaY * 0.2,
        y: deltaX * 0.2,
      };

      targetRotRef.current.y += velRef.current.y;
      targetRotRef.current.x += velRef.current.x;

      prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      targetRotRef.current.y += e.deltaY * 0.08;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    container.addEventListener('wheel', onWheel, { passive: true });

    // Animation Loop
    const animate = () => {
      // Damping
      rotRef.current.x += (targetRotRef.current.x - rotRef.current.x) * 0.08;
      rotRef.current.y += (targetRotRef.current.y - rotRef.current.y) * 0.08;

      // Constant gentle background drift when idle
      if (!isDraggingRef.current) {
        targetRotRef.current.y += 0.06;
      }

      // Limit X tilt
      rotRef.current.x = Math.max(-32, Math.min(32, rotRef.current.x));

      if (ringRef.current) {
        ringRef.current.style.transform = `rotateX(${rotRef.current.x}deg) rotateY(${rotRef.current.y}deg)`;
      }

      // Dynamic depth sorting & opacity fading
      const radY = rotRef.current.y * (Math.PI / 180);
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const baseX = parseFloat(card.getAttribute('data-base-x') || '0');
        const baseZ = parseFloat(card.getAttribute('data-base-z') || '0');

        const rotZ = baseX * Math.sin(radY) + baseZ * Math.cos(radY);
        card.style.zIndex = `${Math.round(rotZ + 1000)}`;

        const depthFactor = (rotZ + radiusZ) / (radiusZ * 2);
        const opacity = 0.45 + Math.max(0, Math.min(1, depthFactor)) * 0.55;
        card.style.opacity = `${opacity.toFixed(2)}`;
      });

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('wheel', onWheel);

      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isGridView, items]);

  const filteredItems =
    selectedCategory === 'ALL'
      ? items
      : items.filter((it) => it.category === selectedCategory);

  return (
    <section className="relative w-full min-h-screen py-20 px-6 sm:px-12 bg-black text-white overflow-hidden select-none flex flex-col justify-between">
      {/* 3D Constellation Main Stage */}
      <div className="relative w-full h-[620px] sm:h-[720px] max-w-7xl mx-auto flex items-center justify-center overflow-hidden my-auto">
        {!isGridView ? (
          <div
            ref={containerRef}
            style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
            className="w-full h-full flex items-center justify-center relative cursor-grab active:cursor-grabbing"
          >
            {/* Center Spinning Monogram Mark */}
            <div className="absolute left-1/2 top-1/2 z-10 pointer-events-none -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
              <div className="w-10 h-10 border border-white/60 flex items-center justify-center bg-black/50 backdrop-blur-md animate-[spin_16s_linear_infinite]">
                <span className="text-xs font-mono-code text-white tracking-widest font-extrabold">
                  {centerSymbol}
                </span>
              </div>
            </div>

            {/* Dynamic 3D Orbital Ring */}
            <div
              ref={ringRef}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-full h-full flex items-center justify-center transition-transform duration-75 ease-linear"
            >
              {items.map((item, i) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    if (el) cardsRef.current[i] = el;
                  }}
                  onClick={() => setActiveItem(item)}
                  style={{
                    position: 'absolute',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                  }}
                  className="w-56 h-36 sm:w-72 sm:h-48 rounded-sm overflow-hidden bg-neutral-950 border border-white/20 hover:border-white transition-all duration-300 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.9)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] hover:scale-105 group"
                >
                  <div className="relative w-full h-full overflow-hidden bg-neutral-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition duration-500 pointer-events-none"
                    />

                    {/* Top Category Badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 pointer-events-none z-10">
                      <span className="px-2 py-0.5 bg-black/90 text-[9px] font-mono-code font-bold uppercase tracking-wider text-white border border-white/20">
                        {item.category}
                      </span>
                    </div>

                    {/* Permanent Subtle Bottom Bar + Rich Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-3 sm:p-4 flex flex-col justify-end pointer-events-none transition-all duration-300">
                      <span className="text-[9px] font-mono-code text-white/70 tracking-widest uppercase">
                        {item.brand || item.category}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase line-clamp-1 group-hover:text-white">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Grid View Matrix */
          <div className="w-full h-full overflow-y-auto px-2 sm:px-6 pt-6 pb-20">
            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono-code tracking-widest text-white/50 uppercase">
                  {subtitle}
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-white uppercase">
                  {title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono-code tracking-widest uppercase">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`pb-1 transition-colors cursor-pointer border-b ${
                      selectedCategory === cat
                        ? 'text-white border-white font-bold'
                        : 'text-white/40 border-transparent hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className="space-y-3 cursor-pointer group p-3 bg-zinc-950 border border-zinc-800 hover:border-white transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/90 text-[9px] font-mono-code font-bold uppercase tracking-wider text-white border border-white/20">
                      {item.category}
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline text-xs font-mono-code">
                    <div>
                      <span className="text-white/40 block text-[10px] uppercase">
                        {item.brand || item.category}
                      </span>
                      <h4 className="text-white font-bold text-sm uppercase tracking-wide group-hover:text-zinc-200 line-clamp-1">
                        {item.title}
                      </h4>
                    </div>
                    {item.prizePool && (
                      <span className="text-white/60 text-[10px]">{item.prizePool}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Toggle Bar: CONSTELLATION / GRID Toggle Button */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-center z-20 pt-4 border-t border-white/5">
        <button
          onClick={() => setIsGridView((prev) => !prev)}
          className="px-6 py-2.5 rounded-full border border-white/20 bg-black/80 hover:bg-white hover:text-black hover:border-white text-white transition-all duration-300 font-mono-code text-[11px] tracking-widest uppercase flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
        >
          <span>{isGridView ? '❖' : '✦'}</span>
          <span>{isGridView ? 'CONSTELLATION VIEW' : 'GRID VIEW'}</span>
        </button>
      </div>

      {/* Item Detail Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl overflow-y-auto px-4 sm:px-12 py-16 flex flex-col justify-between"
          >
            <button
              onClick={() => setActiveItem(null)}
              className="fixed top-8 right-8 z-[110] text-white/70 hover:text-white text-2xl p-2 transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-5xl mx-auto w-full space-y-8 my-auto">
              {/* Media Viewport */}
              <div className="relative w-full aspect-video sm:aspect-[21/9] bg-neutral-950 border border-white/10 overflow-hidden shadow-2xl">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-black/90 text-xs font-mono-code font-bold uppercase tracking-wider text-white border border-white/20">
                    {activeItem.category}
                  </span>
                  {activeItem.prizePool && (
                    <span className="px-3 py-1 bg-white text-black text-xs font-mono-code font-extrabold uppercase tracking-wider">
                      {activeItem.prizePool}
                    </span>
                  )}
                </div>
              </div>

              {/* Details Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
                <div>
                  <span className="text-xs font-mono-code text-white/50 tracking-widest uppercase">
                    {activeItem.brand || 'NIRVAN CRUCIBLE TRACK'}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                    {activeItem.title}
                  </h2>
                </div>

                <div className="flex flex-wrap gap-4 shrink-0">
                  {activeItem.arenaRoute && onSelectArena && (
                    <button
                      onClick={() => {
                        const route = activeItem.arenaRoute!;
                        setActiveItem(null);
                        onSelectArena(route);
                      }}
                      className="px-6 py-3.5 bg-white text-black font-mono-code text-xs font-bold tracking-wider hover:bg-zinc-200 transition uppercase cursor-pointer flex items-center gap-2"
                    >
                      <span>ENTER {activeItem.category} ARENA</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                  {onOpenRegister && (
                    <button
                      onClick={() => {
                        setActiveItem(null);
                        onOpenRegister(String(activeItem.id));
                      }}
                      className="px-6 py-3.5 border border-white/30 text-white font-mono-code text-xs font-bold tracking-wider hover:bg-white/10 transition uppercase cursor-pointer"
                    >
                      REGISTER NOW
                    </button>
                  )}
                </div>
              </div>

              <p className="text-base text-zinc-300 font-normal leading-relaxed max-w-3xl">
                {activeItem.fullOverview || activeItem.description}
              </p>

              {/* Tags & Meta */}
              {activeItem.tags && activeItem.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeItem.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-[11px] font-mono-code text-zinc-400 uppercase"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
