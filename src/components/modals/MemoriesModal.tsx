'use client';

import React, { useState } from 'react';

interface MemoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MemoryPhoto {
  id: string;
  title: string;
  date: string;
  caption: string;
  tag: string;
  emoji: string;
}

const MEMORIES: MemoryPhoto[] = [
  {
    id: '1',
    title: 'Rain on the Window Sill',
    date: 'November 12, 11:42 PM',
    caption: 'Milo watching raindrops race down the glass pane while the radio played soft jazz.',
    tag: 'Cozy Rain',
    emoji: '🌧️',
  },
  {
    id: '2',
    title: 'First Snowfall in the City',
    date: 'December 04, 02:15 AM',
    caption: 'The whole neighborhood went completely silent. Kuro sat mesmerized by falling snowflakes.',
    tag: 'Winter Night',
    emoji: '❄️',
  },
  {
    id: '3',
    title: 'Warm Blanket Afternoon',
    date: 'January 18, 04:30 PM',
    caption: 'Freshly laundered fleece blanket straight from the dryer. Both cats claimed it in 3 seconds.',
    tag: 'Nap Time',
    emoji: '🛏️',
  },
  {
    id: '4',
    title: 'Midnight Stargazing',
    date: 'February 22, 01:05 AM',
    caption: 'A clear crescent moon above the skyline towers. Two little silhouettes sitting shoulder-to-shoulder.',
    tag: 'Starlight',
    emoji: '🌙',
  },
];

export const MemoriesModal: React.FC<MemoriesModalProps> = ({ isOpen, onClose }) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  if (!isOpen) return null;

  const current = MEMORIES[selectedIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#0c1222] border-2 border-[#ffcc44]/60 rounded-2xl shadow-[0_0_50px_rgba(255,204,68,0.25)] text-gray-100 overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141d36] border-b border-[#24335c]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📸</span>
            <div>
              <h3 className="font-pixel text-sm font-bold text-[#ffcc44]">COZY MEMORIES ALBUM</h3>
              <p className="text-[11px] text-gray-400">Polaroid snapshots of quiet moments.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1c294d] text-gray-300 hover:text-white hover:bg-red-500/30 transition-colors font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Polaroid Display */}
        <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
          {/* Main Polaroid Frame */}
          <div className="w-full md:w-1/2 bg-amber-50/95 text-gray-900 p-4 rounded-lg shadow-2xl flex flex-col items-center border border-amber-200/80">
            <div className="w-full h-44 bg-[#10162a] rounded flex flex-col items-center justify-center border border-gray-800 relative overflow-hidden">
              <span className="text-6xl">{current.emoji}</span>
              <span className="absolute top-2 right-2 text-[10px] font-mono bg-black/60 text-amber-300 px-2 py-0.5 rounded">
                {current.tag}
              </span>
            </div>
            <div className="w-full mt-3 text-left">
              <h4 className="font-pixel text-xs font-bold text-gray-900">{current.title}</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">{current.date}</p>
            </div>
          </div>

          {/* Memory Description & Selectors */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="bg-[#11182c] border border-[#223158] rounded-xl p-4">
              <span className="text-xs text-amber-400 font-semibold mb-1 block">Diary Note:</span>
              <p className="text-xs text-gray-300 leading-relaxed italic">
                "{current.caption}"
              </p>
            </div>

            {/* Thumbnail Selectors */}
            <div>
              <span className="text-[11px] text-gray-400 mb-2 block font-semibold">Select Memory:</span>
              <div className="grid grid-cols-4 gap-2">
                {MEMORIES.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedIdx(idx)}
                    className={`flex flex-col items-center p-2 rounded-lg border transition-all ${
                      selectedIdx === idx
                        ? 'bg-[#ffcc44] text-black font-bold border-[#ffcc44] scale-105 shadow-md'
                        : 'bg-[#141d36] text-gray-300 border-[#24335c] hover:border-gray-500'
                    }`}
                  >
                    <span className="text-xl mb-1">{m.emoji}</span>
                    <span className="text-[9px] truncate w-full text-center">{m.title.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#141d36] border-t border-[#24335c] text-[11px] text-gray-400">
          <span>Memory {selectedIdx + 1} of {MEMORIES.length}</span>
          <span>Click on the cozy bed anytime to view memories</span>
        </div>
      </div>
    </div>
  );
};
