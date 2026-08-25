import React from 'react';
import { Mic2 } from 'lucide-react';

const GUESTS = [
  {
    name: 'Tanya Taragi',
    role: 'Lead Convener & Systems Architect',
    organization: 'NIRVAN Core & Open Source Guild',
    bio: 'Opening keynote on building ambitious products under real constraints, followed by a live systems-design clinic.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&h=700&fit=crop&q=85',
  },
  {
    name: 'Devansh Mehta',
    role: 'Director of Esports Operations',
    organization: 'Collegiate Esports League',
    bio: 'Guest mentor covering competitive team strategy, event operations, and designing fair high-pressure experiences.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=700&h=700&fit=crop&q=85',
  },
  {
    name: 'Ananya Roy',
    role: 'Smart Contract Auditor',
    organization: 'Security Research Community',
    bio: 'Security guest session on threat modelling, responsible disclosure, and turning CTF learnings into safer products.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700&h=700&fit=crop&q=85',
  },
];

export const GuestProfiles: React.FC = () => (
  <section id="speakers" className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-black text-white border-t border-zinc-900">
    <div className="max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-3">
          <Mic2 className="w-3.5 h-3.5" />
          <span>STAGE PROGRAMME // 03 PROFILES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">Speakers &amp; Guests</h2>
        <p className="text-sm sm:text-base text-zinc-400">Meet the people bringing the brief, the craft, and the competitive spirit to GEHU Campus.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GUESTS.map((guest) => (
          <article key={guest.name} className="bg-[#0a0a0c] border border-zinc-800 p-5 hover:border-zinc-500 transition-colors">
            <img src={guest.photo} alt={guest.name} className="w-full aspect-[4/3] object-cover grayscale contrast-125 mb-5" />
            <h3 className="text-xl font-bold mb-1">{guest.name}</h3>
            <p className="text-xs font-mono-code uppercase text-zinc-300">{guest.role}</p>
            <p className="text-xs font-mono-code text-zinc-500 mt-1">{guest.organization}</p>
            <p className="text-sm text-zinc-400 leading-relaxed mt-5">{guest.bio}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
