import React from 'react';
import { CalendarDays, Clock3, MapPin } from 'lucide-react';

const SCHEDULE = [
  { day: 'DAY 01 // 12 OCT', time: '09:00', title: 'Opening Ceremony', venue: 'Main Auditorium' },
  { day: 'DAY 01 // 12 OCT', time: '10:00', title: 'Hackathon Begins', venue: 'Computer Lab 1' },
  { day: 'DAY 01 // 12 OCT', time: '11:00', title: 'Treasure Hunt', venue: 'Seminar Hall + Campus Waypoints' },
  { day: 'DAY 01 // 12 OCT', time: '13:00', title: 'Lunch & Community Meet', venue: 'Food Court' },
  { day: 'DAY 01 // 12 OCT', time: '14:00', title: 'Esports Arena', venue: 'Computer Lab 2' },
  { day: 'DAY 01 // 12 OCT', time: '16:00', title: 'CTF // Capture the Flag', venue: 'Cyber Lab' },
  { day: 'DAY 02 // 13 OCT', time: '10:00', title: 'HackSprint Continues', venue: 'Innovation Lab' },
  { day: 'DAY 02 // 13 OCT', time: '14:00', title: 'Workshops & Masterclasses', venue: 'Innovation Lab' },
  { day: 'DAY 02 // 13 OCT', time: '18:00', title: 'Demos, Jury & Closing', venue: 'Main Auditorium' },
];

export const FestSchedule: React.FC = () => (
  <section id="schedule" className="relative w-full bg-[#f0f0f2] text-[#121212] px-6 sm:px-12 py-24 sm:py-32 border-t border-zinc-300">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12 pb-6 border-b border-zinc-300">
        <div>
          <p className="text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-3">03 // SCHEDULE &amp; SPEAKERS</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Fest Schedule</h2>
        </div>
        <p className="max-w-md text-sm text-zinc-600 leading-relaxed">
          Two days, five arenas, one scan-friendly plan. Find every major moment and its venue before you arrive at GEHU Campus.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {SCHEDULE.map((item) => (
          <article key={`${item.day}-${item.time}-${item.title}`} className="border border-zinc-300 bg-white/70 p-5 sm:p-6 hover:bg-white transition-colors">
            <p className="text-[10px] font-mono-code uppercase tracking-widest text-zinc-500 mb-5">{item.day}</p>
            <div className="flex items-start gap-4">
              <div className="text-2xl font-black tracking-tight min-w-16">{item.time}</div>
              <div>
                <h3 className="text-lg font-bold leading-tight mb-3">{item.title}</h3>
                <div className="space-y-1.5 text-xs font-mono-code text-zinc-600">
                  <p className="flex items-center gap-2"><Clock3 className="w-3.5 h-3.5" /> {item.time} HOURS</p>
                  <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {item.venue}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-zinc-500">
        <CalendarDays className="w-3.5 h-3.5" /> 12–13 October 2026 // GEHU Campus
      </div>
    </div>
  </section>
);
