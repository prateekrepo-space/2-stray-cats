'use client';

import { useState } from 'react';
import { useToast } from '@/components/toast/ToastProvider';

interface StoryMilestone {
  id: string;
  year: string;
  season: string;
  title: string;
  summary: string;
  fullStory: string;
  icon: string;
  badge: string;
}

const MILESTONES: StoryMilestone[] = [
  {
    id: 'm1',
    year: '2023',
    season: 'AUTUMN',
    title: 'Under the Streetlamp',
    summary: 'Two strays cross paths in a quiet rainy alleyway.',
    fullStory: 'It was a cold November evening when the orange tabby sat under the flickering yellow streetlamp. Out of the shadows stepped a gray cat wearing a tiny red bandana. Neither said a word; they just shared the shelter under the warm lamp glow until the rain stopped.',
    icon: '🌧️',
    badge: 'FIRST MEETING',
  },
  {
    id: 'm2',
    year: '2023',
    season: 'WINTER',
    title: 'The Shared Rooftop',
    summary: 'Watching snow fall over the quiet city lights.',
    fullStory: 'As winter settled over the neighborhood, they found a high brick chimney ledge that stayed warm all night. Side by side, they watched snow dust the roofs below and city lights twinkle in the dark.',
    icon: '❄️',
    badge: 'COZY SPOT',
  },
  {
    id: 'm3',
    year: '2024',
    season: 'SPRING',
    title: 'A Room of Their Own',
    summary: 'Finding the window sill with the warm desk lamp.',
    fullStory: 'Spring brought a warm room with an open window. On the wide wooden sill sat two cushions, a bookshelf, and a lamp that stayed lit through long nights. It became their favorite sanctuary.',
    icon: '💡',
    badge: 'SANCTUARY',
  },
  {
    id: 'm4',
    year: 'PRESENT',
    season: 'TODAY',
    title: 'One Corner of the Internet',
    summary: 'Building a shared space for memories and little things.',
    fullStory: 'Now they have their own little corner of the internet — a place to store photos, favorite lo-fi songs, inside jokes, and quiet moments. Still wandering, still together.',
    icon: '🐾',
    badge: 'THE JOURNEY',
  },
];

export default function StoryTimeline() {
  const [activeMilestone, setActiveMilestone] = useState<string | null>('m1');
  const { showToast } = useToast();

  const handleSelect = (m: StoryMilestone) => {
    setActiveMilestone(activeMilestone === m.id ? null : m.id);
    showToast(`Story chapter: ${m.title}`, m.icon);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-4">
      <div className="text-center mb-12">
        <h3 className="font-pixel text-xs sm:text-sm text-[#ffcc44] tracking-widest uppercase mb-2">
          Chronicles of Two Strays
        </h3>
        <p className="text-sm text-[#b0a890]">
          Click any milestone to unfold the story
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-[#2a3050] ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
        {MILESTONES.map((m) => {
          const isSelected = activeMilestone === m.id;
          return (
            <div key={m.id} className="relative group cursor-pointer" onClick={() => handleSelect(m)}>
              {/* Timeline Node Icon */}
              <div
                className={`absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded border-2 flex items-center justify-center text-sm transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#ffcc44] border-[#ffffff] text-black scale-110 shadow-[0_0_10px_rgba(255,204,68,0.5)]'
                    : 'bg-[#121828] border-[#2a3050] text-[#ffcc44] group-hover:border-[#ffcc44]'
                }`}
                style={{ imageRendering: 'pixelated' }}
              >
                {m.icon}
              </div>

              {/* Milestone Card */}
              <div
                className={`p-5 rounded border transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#1a2238] border-[#ffcc44] shadow-lg'
                    : 'bg-[#121828] border-[#2a3050] hover:border-[#3a4468]'
                }`}
              >
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-pixel text-[10px] px-2 py-0.5 bg-[#2a3050] text-[#ffcc44] rounded">
                      {m.year} • {m.season}
                    </span>
                    <span className="font-pixel text-[9px] px-2 py-0.5 bg-black/40 text-gray-400 border border-gray-700/50 rounded">
                      {m.badge}
                    </span>
                  </div>
                  <span className="text-xs text-[#ffcc44] font-pixel">
                    {isSelected ? '▲ HIDE' : '▼ READ'}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-medium text-[#f0ece0] mb-1">
                  {m.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#b0a890]">
                  {m.summary}
                </p>

                {/* Expanded Story */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-[#2a3050]/80 text-xs sm:text-sm text-[#f0ece0]/90 leading-relaxed animate-[fade-up_0.2s_ease-out]">
                    <p className="font-light italic bg-black/20 p-3 rounded border-l-2 border-[#ffcc44]">
                      &quot;{m.fullStory}&quot;
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
