import React from 'react';
import { Mic2, Award } from 'lucide-react';

const GUESTS = [
  {
    name: 'Dr. MC Lohani',
    role: 'Director',
    department: 'Institutional Leadership & Governance',
    organization: 'Graphic Era Hill University, Haldwani Campus',
    bio: 'Guiding NIRVAN 2026 with institutional vision and patron leadership—championing technological innovation, research incubation, and industry-grade engineering excellence.',
    photo: '/assets/guests/dr-mc-lohani.png',
    badge: 'Patron & Keynote',
  },
  {
    name: 'Mr. Ishwari Singh Rajput',
    role: 'Head of Department (CSE)',
    department: 'Department of Computer Science & Engineering',
    organization: 'Graphic Era Hill University, Haldwani Campus',
    bio: 'Spearheading advanced computing and hackathon mentorship—fostering high-performance software engineering, algorithmic design, and full-stack technical initiatives.',
    photo: '/assets/guests/mr-ishwari-singh-rajput.png',
    badge: 'Honorary Mentor',
  },
  {
    name: 'Mr. KS Bumrah',
    role: 'Head of Department (CSA)',
    department: 'Department of Computer Science & Applications',
    organization: 'Graphic Era Hill University, Haldwani Campus',
    bio: 'Championing applied computer science, cloud infrastructure, and experiential development—empowering student teams across competitive arenas and digital challenges.',
    photo: '/assets/guests/mr-ks-bumrah.png',
    badge: 'Distinguished Guest',
  },
];

export const GuestProfiles: React.FC = () => (
  <section id="speakers" className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-black text-white border-t border-zinc-900 select-none">
    <div className="max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-3">
          <Mic2 className="w-3.5 h-3.5" />
          <span>03B // SPEAKERS &amp; DISTINGUISHED GUESTS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">Speakers &amp; Guests</h2>
        <p className="text-sm sm:text-base text-zinc-400">
          Esteemed leadership and academic visionaries guiding the innovation, craft, and competitive spirit at NIRVAN '26.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {GUESTS.map((guest) => (
          <article
            key={guest.name}
            className="group bg-[#0a0a0c] border border-zinc-800/90 hover:border-white/40 p-6 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative overflow-hidden mb-6 bg-zinc-900 aspect-[4/5]">
                <img
                  src={guest.photo}
                  alt={guest.name}
                  className="w-full h-full object-cover object-top grayscale contrast-115 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono-code uppercase tracking-wider text-zinc-200 inline-flex items-center gap-1.5">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>{guest.badge}</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-zinc-100 transition-colors">
                {guest.name}
              </h3>
              <p className="text-xs font-mono-code font-bold uppercase tracking-wider text-zinc-300">
                {guest.role}
              </p>
              <p className="text-[11px] font-mono-code text-zinc-400 mt-1">
                {guest.department}
              </p>
              <p className="text-[10px] font-mono-code text-zinc-500 mt-0.5">
                {guest.organization}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-6 pt-5 border-t border-zinc-800/80">
              {guest.bio}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
