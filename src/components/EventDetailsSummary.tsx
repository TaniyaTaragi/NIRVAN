import React from 'react';
import { CalendarDays, IndianRupee, MapPin, Users } from 'lucide-react';

interface EventDetailsSummaryProps {
  eventName: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  teamSize: string;
  eligibility: string;
  fee: string;
  prize: string;
  rules: string;
}

const Detail = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) => (
  <div className="border-t border-zinc-800 pt-4">
    <div className="flex items-center gap-2 text-[10px] font-mono-code uppercase tracking-widest text-zinc-500 mb-2">
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </div>
    <p className="text-sm text-white leading-relaxed">{value}</p>
  </div>
);

export const EventDetailsSummary: React.FC<EventDetailsSummaryProps> = ({
  eventName, description, date, time, venue, teamSize, eligibility, fee, prize, rules,
}) => (
  <section className="relative w-full bg-black text-white px-6 sm:px-12 py-16 border-y border-zinc-900">
    <div className="max-w-7xl mx-auto">
      <div className="max-w-3xl mb-10">
        <p className="text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-3">EVENT BRIEF // QUICK READ</p>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">{eventName}</h2>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">{description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
        <Detail icon={CalendarDays} label="Date / Time" value={`${date} • ${time}`} />
        <Detail icon={MapPin} label="Venue" value={venue} />
        <Detail icon={Users} label="Team / Eligibility" value={`${teamSize} • ${eligibility}`} />
        <Detail icon={IndianRupee} label="Fee / Prize" value={`${fee} • ${prize}`} />
      </div>
      <div className="mt-8 border-t border-zinc-800 pt-4">
        <p className="text-[10px] font-mono-code uppercase tracking-widest text-zinc-500 mb-2">Rules</p>
        <p className="text-sm text-zinc-300 leading-relaxed">{rules}</p>
      </div>
    </div>
  </section>
);
