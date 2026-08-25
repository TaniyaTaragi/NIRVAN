import React from 'react';
import { Images } from 'lucide-react';

const ARCHIVE_IMAGES = [
  { src: '/image/hackathon/hackathon_1.jpg', label: 'NIRVAN ARCHIVE // HACKATHON' },
  { src: '/image/esports/esports_1.jpg', label: 'NIRVAN ARCHIVE // ESPORTS' },
  { src: '/image/ctf/ctf_1.jpg', label: 'NIRVAN ARCHIVE // CTF' },
  { src: '/image/techtreasur/techtreasur_1.jpg', label: 'NIRVAN ARCHIVE // TREASURE HUNT' },
  { src: '/image/hackathon/hackathon_2.jpg', label: 'NIRVAN ARCHIVE // BUILD FLOOR' },
  { src: '/image/esports/esports_2.jpg', label: 'NIRVAN ARCHIVE // ARENA NIGHT' },
];

export const ArchiveGallery: React.FC = () => (
  <section id="archive" className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-[#f0f0f2] text-[#121212] border-t border-zinc-300">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12 pb-6 border-b border-zinc-300">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-zinc-500 mb-3">
              <Images className="w-3.5 h-3.5" />
              <span>05 // ARCHIVE // NIRVAN EDITIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Previous Editions</h2>
        </div>
        <p className="max-w-md text-sm text-zinc-600 leading-relaxed">
          A visual record of the arenas, people, and creative energy that make NIRVAN a two-day technical fest.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
        {ARCHIVE_IMAGES.map((image, index) => (
          <figure key={image.src} className={`group relative overflow-hidden bg-zinc-200 ${index === 0 ? 'col-span-2 md:col-span-1' : ''}`}>
            <img src={image.src} alt={image.label} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover grayscale contrast-110 transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-12 text-[10px] font-mono-code tracking-widest text-white">
              {image.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);
