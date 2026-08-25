import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Shield,
  CheckCircle,
  ExternalLink,
  Globe,
} from 'lucide-react';
import { EventTrack, TeamMember, ScheduleItem } from '../types';
import { EVENT_TRACKS } from './CircularFeaturesGallery';

interface NewspaperEventPageProps {
  initialTrack?: EventTrack | null;
  onBackToLanding: () => void;
  onOpenRegister: (trackId?: string) => void;
}

const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    id: 's1',
    time: '09:00 AM',
    title: 'Check-in, Badging & Breakfast',
    subtitle: 'CAMPUS FOYER & DISCORD REGISTRATION DESK',
    stage: 'ONBOARDING',
    status: 'completed',
  },
  {
    id: 's2',
    time: '11:00 AM',
    title: 'Opening Keynote & Track Problem Reveal',
    subtitle: 'MAIN AUDITORIUM & LIVE STREAM',
    stage: 'KICKOFF',
    status: 'completed',
  },
  {
    id: 's3',
    time: '01:00 PM',
    title: 'Hacking Commences & Mentor Round 1',
    subtitle: 'HACKING HALLS & VIRTUAL BREAKOUT ROOMS',
    stage: 'BUILD PHASE',
    status: 'live',
  },
  {
    id: 's4',
    time: '08:30 PM',
    title: 'Mid-Sprint Architecture Review',
    subtitle: 'TECHNICAL JURY MENTORSHIP AUDIT',
    stage: 'CHECKPOINT',
    status: 'upcoming',
  },
  {
    id: 's5',
    time: '12:00 AM',
    title: 'Midnight Esports Blitz & Red Bull Fuel Break',
    subtitle: 'GAMING ARENA & SNACK STATION',
    stage: 'ENERGY & PLAY',
    status: 'upcoming',
  },
  {
    id: 's6',
    time: '09:00 AM',
    title: 'Code Freeze & GitHub Submissions Due',
    subtitle: 'DEVFOLIO SUBMISSION PORTAL CLOSES',
    stage: 'DEADLINE',
    status: 'upcoming',
  },
  {
    id: 's7',
    time: '11:30 AM',
    title: 'Grand Demo Day & Jury Pitch Battles',
    subtitle: 'LIVE 5-MIN PRODUCT DEMONSTRATIONS',
    stage: 'PITCH STAGE',
    status: 'upcoming',
  },
  {
    id: 's8',
    time: '03:00 PM',
    title: 'Award Ceremony & VC Grant Distribution',
    subtitle: 'STAGE 1 // ₹5,00,000+ CASH & INCUBATION',
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
    role: 'Web3 & Security Lead',
    organization: 'Polygon Core Contributor',
    bio: 'ZK-rollups researcher and smart contract security auditor. Mentoring decentralized finance tracks.',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop&q=80',
    socials: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 't4',
    name: 'Devansh Mehta',
    role: 'Director of Hackathon Operations',
    organization: 'Devfolio Community Fellow',
    bio: 'Organized 15+ national hackathons. Ensuring zero friction, 24/7 food, red bull, and live streaming.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&q=80',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
];

export const NewspaperEventPage: React.FC<NewspaperEventPageProps> = ({
  initialTrack,
  onBackToLanding,
  onOpenRegister,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Tracks');
  const [activeTrack, setActiveTrack] = useState<EventTrack>(
    initialTrack || EVENT_TRACKS[0]
  );

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
    if (initialTrack) {
      setActiveTrack(initialTrack);
    }
  }, [initialTrack]);

  const categories = ['All Tracks', 'Hackathon', 'Workshop', 'Esports', 'Fest'];

  const filteredTracks =
    selectedCategory === 'All Tracks'
      ? EVENT_TRACKS
      : EVENT_TRACKS.filter((t) => t.category === selectedCategory);

  return (
    <div className="w-full min-h-screen bg-[#070709] text-white pt-24 pb-32 px-6 sm:px-12 select-none">
      <div className="max-w-7xl mx-auto">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between py-4 mb-8 border-b border-zinc-800">
          <button
            onClick={onBackToLanding}
            className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>← RETURN TO 360° ORBIT LANDING</span>
          </button>

          <div className="text-xs font-mono-code text-zinc-500 uppercase tracking-widest hidden sm:block">
            NIRVAN CHRONICLE // SPECIAL BROADSHEET EDITION
          </div>
        </div>

        {/* 1. Broadsheet Masthead Header */}
        <div className="text-center pb-8 mb-10 border-b-2 border-white/20">
          <div className="flex items-center justify-between text-[10px] font-mono-code uppercase tracking-widest text-zinc-400 pb-2 border-b border-zinc-800 mb-6">
            <span>VOL. XXVI // NO. 04</span>
            <span className="font-bold text-white">THE NIRVAN HACKATHON GAZETTE</span>
            <span>OCTOBER 2026 // EDITION</span>
          </div>

          <h1 className="font-newspaper-serif text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase mb-3">
            The Nirvan Chronicle
          </h1>

          <p className="text-xs sm:text-sm font-mono-code uppercase tracking-widest text-zinc-400 max-w-2xl mx-auto">
            OFFICIAL BLUEPRINT &bull; CRUCIBLE RULES &bull; 12 EVENT TRACKS &bull; ₹5,00,000+ IN PRIZES
          </p>
        </div>

        {/* 2. Category Selection Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-zinc-800/80">
          <span className="text-xs font-mono-code uppercase tracking-wider text-zinc-500 mr-2">
            FILTER CATEGORIES:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 text-xs font-mono-code uppercase tracking-wider transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3. Newspaper-Style Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24">
          {/* Left Main Editorial & Rules Breakdown (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Active Track Banner & Headline */}
            <div className="bg-[#0c0c0e] border border-zinc-800 p-8 sm:p-10 relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-0.5 bg-white text-black text-xs font-mono-code font-bold uppercase">
                  {activeTrack.code} // {activeTrack.category}
                </span>
                <span className="text-xs font-mono-code text-zinc-500 uppercase tracking-widest">
                  FEATURED DISPATCH
                </span>
              </div>

              <h2 className="font-newspaper-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
                {activeTrack.title}
              </h2>

              <p className="text-sm font-mono-code uppercase tracking-wider text-zinc-300 mb-6">
                {activeTrack.subtitle}
              </p>

              {/* Hero Photo Banner */}
              <div className="aspect-[16/9] w-full bg-zinc-900 border border-zinc-800 overflow-hidden mb-8 shadow-2xl">
                <img
                  src={activeTrack.image}
                  alt={activeTrack.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-zinc-300 leading-relaxed text-sm sm:text-base border-t border-zinc-800 pt-6">
                <p>{activeTrack.fullOverview}</p>
                <p className="text-zinc-400">{activeTrack.description}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-zinc-800">
                {activeTrack.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[10px] font-mono-code text-zinc-400 uppercase"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Rules & Eligibility Broadsheet Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 sm:p-8 bg-[#0a0a0c] border border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-800">
                  <Shield className="w-4 h-4 text-white" />
                  <span>RULES &amp; CODE OF CONDUCT</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
                  {activeTrack.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>Plagiarism or pre-built projects result in immediate disqualification.</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 sm:p-8 bg-[#0a0a0c] border border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-mono-code text-zinc-400 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-800">
                  <Users className="w-4 h-4 text-white" />
                  <span>ELIGIBILITY &amp; TEAM SPECS</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
                  {activeTrack.eligibility.map((el, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                      <span>{el}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>Teams must consist of 2 to 4 registered members.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Track Switcher */}
            <div>
              <div className="text-xs font-mono-code text-zinc-500 uppercase tracking-widest mb-4">
                EXPLORE OTHER CRUCIBLE TRACKS:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredTracks.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTrack(t)}
                    className={`p-4 text-left border transition-all cursor-pointer ${
                      activeTrack.id === t.id
                        ? 'bg-white text-black border-white shadow-lg'
                        : 'bg-[#09090b] text-zinc-300 border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    <div className="text-[10px] font-mono-code uppercase opacity-70 mb-1">
                      {t.code} // {t.category}
                    </div>
                    <div className="text-xs font-bold leading-snug line-clamp-2">
                      {t.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sticky Summary Panel (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 bg-[#0a0a0c] border-2 border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="text-xs font-mono-code uppercase tracking-widest text-zinc-500 pb-3 border-b border-zinc-800">
                CRUCIBLE SUMMARY // DISPATCH
              </div>

              {/* Countdown Timer */}
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono-code text-zinc-400 uppercase tracking-widest mb-2">
                  <Clock className="w-3 h-3 text-white" />
                  <span>KICKOFF COUNTDOWN</span>
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
                  <span className="text-sm font-bold text-white font-mono-code">
                    {activeTrack.entryFee}
                  </span>
                </div>
                <div className="p-3.5 bg-black border border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-mono-code text-zinc-400">TRACK PRIZE</span>
                  <span className="text-sm font-bold text-white font-mono-code">
                    {activeTrack.prizePool}
                  </span>
                </div>
                <div className="p-3.5 bg-black border border-zinc-800 flex items-center justify-between">
                  <span className="text-xs font-mono-code text-zinc-400">TOTAL BOUNTIES</span>
                  <span className="text-sm font-bold text-white font-mono-code">₹5,00,000+</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenRegister(activeTrack.id)}
                className="w-full py-4 bg-white text-black text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-200 active:scale-95 transition-all shadow-xl cursor-pointer"
              >
                REGISTER FOR THIS TRACK ↗
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

        {/* 4. Interactive Schedule Timeline */}
        <div className="mb-24 pt-12 border-t-2 border-zinc-800">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-2">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>CHRONOLOGY // 48-HOUR MILESTONES</span>
            </div>
            <h2 className="font-newspaper-serif text-4xl sm:text-6xl font-bold text-white uppercase">
              Schedule of Events
            </h2>
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

        {/* 5. Team & Organizer Spotlight */}
        <div className="pt-12 border-t-2 border-zinc-800">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-2">
              <Users className="w-3.5 h-3.5 text-zinc-400" />
              <span>LEADERSHIP // ORGANIZERS &amp; JURY</span>
            </div>
            <h2 className="font-newspaper-serif text-4xl sm:text-6xl font-bold text-white uppercase">
              Meet The Organizers
            </h2>
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
