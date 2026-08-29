'use client';

import { useState } from 'react';
import { useToast } from '@/components/toast/ToastProvider';

export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  location: string;
  category?: string;
  caption: string;
  color: string;
  icon: string;
  likes: number;
}

const MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1',
    title: 'Starlight Window Sill',
    date: 'AUG 2024',
    location: 'ROOM SILL',
    category: 'NIGHTTIME',
    caption: 'Watching the moon rise over the city skyline while sitting together on the warm wooden cushion.',
    color: '#ffcc44',
    icon: '🌙',
    likes: 42,
  },
  {
    id: 'mem-2',
    title: 'Rainy Afternoon Lo-Fi',
    date: 'SEP 2024',
    location: 'DESK CORNER',
    category: 'RAINY DAY',
    caption: 'Listening to rain drops tap against the window glass while lo-fi beats play softly in the background.',
    color: '#5cb85c',
    icon: '🌧️',
    likes: 38,
  },
  {
    id: 'mem-3',
    title: 'Midnight Lamp Glow',
    date: 'OCT 2024',
    location: 'ARMCHAIR',
    caption: 'Curled up on the armchair under the soft amber light of the desk lamp during quiet hours.',
    color: '#daa520',
    icon: '💡',
    likes: 56,
  },
  {
    id: 'mem-4',
    title: 'First Snowfall',
    date: 'DEC 2024',
    location: 'ROOFTOP',
    caption: 'The quiet magic of the first snow dusting the neighborhood roofs below in soft white.',
    color: '#8ab4f8',
    icon: '❄️',
    likes: 64,
  },
  {
    id: 'mem-5',
    title: 'Warm Coffee & Books',
    date: 'JAN 2025',
    location: 'BOOKSHELF',
    caption: 'Exploring old books and cozy nooks near the warm radiator on cold winter mornings.',
    color: '#e08080',
    icon: '☕',
    likes: 29,
  },
  {
    id: 'mem-6',
    title: 'Sunset Cat Nap',
    date: 'FEB 2025',
    location: 'BEDSIDE',
    caption: 'Basking in the golden hour sunlight streaming across the room before dusk.',
    color: '#e0b060',
    icon: '🌅',
    likes: 47,
  },
];

export default function MemoriesGallery() {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [memoryLikes, setMemoryLikes] = useState<Record<string, number>>(() =>
    MEMORIES.reduce((acc, m) => ({ ...acc, [m.id]: m.likes }), {})
  );
  const { showToast } = useToast();

  const handleLike = (e: React.MouseEvent, m: MemoryItem) => {
    e.stopPropagation();
    setMemoryLikes((prev) => {
      const current = prev[m.id] || m.likes;
      return { ...prev, [m.id]: current + 1 };
    });
    showToast(`Liked memory "${m.title}" ❤️`, '🐾');
  };

  return (
    <div id="memories-gallery" className="w-full max-w-5xl mx-auto my-12 px-4">
      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MEMORIES.map((m, idx) => {
          const isFeatured = idx === 0 || idx === 3;
          return (
            <div
              key={m.id}
              onClick={() => setSelectedMemory(m)}
              className={`group relative rounded bg-[#121828] border-2 border-[#2a3050] hover:border-[#ffcc44] p-6 cursor-pointer transition-all duration-200 hover:-translate-y-1 shadow-md ${
                isFeatured ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
              style={{ imageRendering: 'pixelated' }}
            >
              {/* Corner pixel accents */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-[#ffcc44] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#ffcc44] opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Tag ribbons */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="font-pixel text-[9px] px-2 py-0.5 bg-[#2a3050] text-[#ffcc44] rounded">
                  {m.date}
                </span>
                <span className="font-pixel text-[9px] px-2 py-0.5 bg-black/40 text-gray-400 rounded">
                  {m.location}
                </span>
              </div>

              {/* Icon Visual */}
              <div className="w-full h-32 mb-4 rounded bg-[#0a0e1a] border border-[#2a3050] flex flex-col items-center justify-center relative overflow-hidden group-hover:border-[#ffcc44]/40 transition-colors">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-200">
                  {m.icon}
                </span>
                <span className="font-pixel text-[9px] text-[#b0a890] mt-2 tracking-widest">
                  [{m.category}]
                </span>
              </div>

              {/* Title & Caption preview */}
              <h4 className="font-pixel text-xs sm:text-sm text-[#f0ece0] mb-2 group-hover:text-[#ffcc44] transition-colors">
                {m.title}
              </h4>
              <p className="text-xs text-[#b0a890] line-clamp-2 mb-4">
                {m.caption}
              </p>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[#2a3050]/60">
                <span className="text-xs text-gray-500 font-pixel">CLICK TO OPEN</span>
                <button
                  onClick={(e) => handleLike(e, m)}
                  className="flex items-center gap-1.5 font-pixel text-[10px] text-[#ffcc44] hover:text-red-400 px-2 py-1 bg-black/30 rounded border border-gray-700/50 hover:border-red-400/50 transition-colors"
                >
                  <span>❤️</span>
                  <span>{memoryLikes[m.id]}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Pixel Modal */}
      {selectedMemory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fade-up_0.2s_ease-out]">
          <div className="relative w-full max-w-lg bg-[#121828] border-3 border-[#ffcc44] rounded shadow-2xl p-6 sm:p-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-[#2a3050]">
              <div>
                <span className="font-pixel text-[10px] text-[#ffcc44] block mb-1">
                  {selectedMemory.date} • {selectedMemory.location}
                </span>
                <h3 className="font-pixel text-sm sm:text-base text-[#f0ece0]">
                  {selectedMemory.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMemory(null)}
                className="font-pixel text-xs text-gray-400 hover:text-white px-2 py-1 bg-[#2a3050] rounded"
              >
                ✕ ESC
              </button>
            </div>

            {/* Modal Visual */}
            <div className="w-full h-48 rounded bg-[#0a0e1a] border-2 border-[#2a3050] flex flex-col items-center justify-center my-4 relative">
              <span className="text-6xl mb-2">{selectedMemory.icon}</span>
              <span className="font-pixel text-xs text-[#ffcc44]">
                {selectedMemory.category} MEMORY
              </span>
            </div>

            {/* Caption */}
            <p className="text-xs sm:text-sm text-[#b0a890] leading-relaxed mb-6 bg-black/30 p-4 rounded border-l-2 border-[#ffcc44]">
              {selectedMemory.caption}
            </p>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#2a3050]">
              <div className="flex items-center gap-2">
                <span className="font-pixel text-[10px] text-gray-400">TAGS:</span>
                <span className="font-pixel text-[9px] px-2 py-0.5 bg-[#2a3050] text-[#ffcc44] rounded">
                  🐾 2 CATS
                </span>
              </div>
              <button
                onClick={(e) => handleLike(e, selectedMemory)}
                className="pixel-btn pixel-btn-accent text-[10px] px-4 py-2 flex items-center gap-2"
              >
                <span>❤️ LIKE MEMORY</span>
                <span>({memoryLikes[selectedMemory.id]})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
