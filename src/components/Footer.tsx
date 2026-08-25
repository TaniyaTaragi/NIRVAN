import React, { useState } from 'react';
import { ArrowUpRight, Check, Send, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenRegister: () => void;
  onNavigateNewspaper: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRegister, onNavigateNewspaper }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer id="contact" className="w-full bg-black text-white pt-24 pb-12 px-6 sm:px-12 border-t border-zinc-900 select-none">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* 1. Pre-Footer Call to Action Banner */}
        <div className="relative border border-zinc-800 bg-[#080808] p-8 sm:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 overflow-hidden group">
          <div className="max-w-xl">
            <div className="text-[11px] font-mono-code uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>INITIATE COLLABORATION &bull; FREE ENTRY (₹0)</span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Ready to Build the Future?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
              Join 1,000+ top developers, hardware hackers, and designers in India’s premier innovation crucible. Compete for ₹5,00,000+ in cash prizes and grants.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              onClick={onOpenRegister}
              className="px-8 py-4 bg-white text-black text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-zinc-200 active:scale-95 transition-all shadow-2xl cursor-pointer"
            >
              REGISTER SQUAD NOW ↗
            </button>
            <button
              onClick={onNavigateNewspaper}
              className="px-6 py-4 border border-zinc-800 hover:border-white text-xs font-mono-code text-zinc-300 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
            >
              READ CHRONICLE
            </button>
          </div>
        </div>

        {/* 2. Newsletter Subscription Box */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-16 border-b border-zinc-900">
          <div className="max-w-md">
            <h4 className="text-2xl font-extrabold text-white tracking-tight mb-2">
              Stay Updated
            </h4>
            <p className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider">
              RECEIVE SCHEDULE ANNOUNCEMENTS, BOUNTY RELEASES &amp; MENTOR DISPATCHES.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 max-w-lg">
            <div className="flex items-center border border-zinc-800 bg-[#09090b] focus-within:border-white transition-colors">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR DEV EMAIL..."
                className="w-full px-5 py-4 bg-transparent text-xs font-mono-code text-white placeholder:text-zinc-600 focus:outline-none"
              />
              <button
                type="submit"
                className={`px-6 py-4 text-xs font-mono-code font-bold uppercase tracking-wider flex items-center justify-center transition-all cursor-pointer ${
                  isSubscribed
                    ? 'bg-zinc-200 text-black'
                    : 'bg-white text-black hover:bg-zinc-200'
                }`}
              >
                {isSubscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
            {isSubscribed && (
              <p className="text-[11px] font-mono-code text-zinc-400 mt-2">
                ✓ You are on the priority dispatch list.
              </p>
            )}
          </form>
        </div>

        {/* 3. 4-Column Directory Layout - Pure Static Informational Text (No Clickable Links) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-xs font-mono-code">
          {/* Column 1: Brand & Manifesto */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white text-black font-extrabold flex items-center justify-center text-xs">
                N
              </div>
              <span className="font-extrabold text-sm text-white tracking-wider">
                NIRVAN // 2026
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed font-normal">
              National hackathon and webathon innovation crucible uniting India’s brightest minds across 12 high-impact tracks.
            </p>
            <div className="text-[11px] text-zinc-500 uppercase tracking-widest pt-2">
              DELHI NCR &bull; HYBRID WORLDWIDE
            </div>
          </div>

          {/* Column 2: Event Tracks (Pure Static Text) */}
          <div className="space-y-3">
            <div className="text-white font-bold tracking-widest uppercase mb-4">
              CRUCIBLE TRACKS
            </div>
            <ul className="space-y-2 text-zinc-400">
              <li>001 // Web3 &amp; Protocols</li>
              <li>002 // Generative AI Agents</li>
              <li>003 // Autonomous Robotics</li>
              <li>004 // Cyber Defense</li>
              <li>005 // FinTech &amp; Algorithmic</li>
              <li>008 // Spatial Computing</li>
            </ul>
          </div>

          {/* Column 3: Organizers & Platform (Pure Static Text) */}
          <div className="space-y-3">
            <div className="text-white font-bold tracking-widest uppercase mb-4">
              ORGANIZERS &amp; CAMPUS
            </div>
            <ul className="space-y-2 text-zinc-400">
              <li>About the Crucible</li>
              <li>Organizing Leadership</li>
              <li>Schedule &amp; Roadmap</li>
              <li>Rules &amp; Code of Conduct</li>
              <li>Past Winner Archives</li>
            </ul>
          </div>

          {/* Column 4: Channels & Socials (Pure Static Text) */}
          <div className="space-y-3">
            <div className="text-white font-bold tracking-widest uppercase mb-4">
              CHANNELS &amp; REPO
            </div>
            <ul className="space-y-2 text-zinc-400">
              <li className="flex items-center gap-1 font-bold text-white">
                <span>GITHUB // OFFICIAL REPO</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-400" />
              </li>
              <li className="flex items-center gap-1">
                <span>DISCORD MATCHMAKING</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </li>
              <li className="flex items-center gap-1">
                <span>X // TWITTER</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </li>
              <li className="flex items-center gap-1">
                <span>LINKEDIN // ALLIANCE</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </li>
            </ul>
          </div>
        </div>

        {/* 4. Bottom Copyright & Status Bar (Pure Static Text) */}
        <div className="pt-12 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-code text-zinc-500">
          <div>
            &copy; 2026 NIRVAN NATIONAL CRUCIBLE &bull; ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>PRIVACY POLICY</span>
            <span>&bull;</span>
            <span>TERMS OF ENTRY</span>
            <span>&bull;</span>
            <span className="text-white font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              STATUS: OPERATIONAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
