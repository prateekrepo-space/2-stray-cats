'use client';

import React from 'react';

interface CatStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMeow: () => void;
}

export const CatStoryModal: React.FC<CatStoryModalProps> = ({ isOpen, onClose, onMeow }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#0c1222] border-2 border-[#ffcc44]/60 rounded-2xl shadow-[0_0_50px_rgba(255,204,68,0.25)] text-gray-100 overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141d36] border-b border-[#24335c]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐾</span>
            <div>
              <h3 className="font-pixel text-sm font-bold text-[#ffcc44]">THE 2 STRAY CATS</h3>
              <p className="text-[11px] text-gray-400">Two strays. One warm window sill.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1c294d] text-gray-300 hover:text-white hover:bg-red-500/30 transition-colors font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Modal Body: Both Cats Profiles */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[75vh] overflow-y-auto">
          {/* Cat 1: Milo */}
          <div className="flex flex-col bg-[#11182c] border border-[#223158] rounded-xl p-4 gap-3 hover:border-amber-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-3xl">🐱</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
                ORANGE TABBY
              </span>
            </div>
            <div>
              <h4 className="font-pixel text-xs font-bold text-amber-300">MILO</h4>
              <p className="text-[11px] text-gray-400 italic">"Always watching the night moon"</p>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Milo wandered in through the fire escape on a rainy October night. Curious and gentle, he loves sitting on the warm cedar wood sill, counting passing headlights in the city below.
            </p>
            <div className="space-y-1.5 text-[11px] bg-black/30 p-2.5 rounded-lg border border-[#1e2a4a]">
              <div className="flex justify-between">
                <span className="text-gray-400">Curiosity:</span>
                <span className="text-amber-300 font-bold">98 / 100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Nap Mastery:</span>
                <span className="text-amber-300 font-bold">14 hrs/day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Favorite Treat:</span>
                <span className="text-gray-200">Warm Salmon Flakes</span>
              </div>
            </div>
          </div>

          {/* Cat 2: Kuro */}
          <div className="flex flex-col bg-[#11182c] border border-[#223158] rounded-xl p-4 gap-3 hover:border-purple-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-3xl">🐈‍⬛</span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full font-bold">
                MIDNIGHT SHADOW
              </span>
            </div>
            <div>
              <h4 className="font-pixel text-xs font-bold text-purple-300">KURO</h4>
              <p className="text-[11px] text-gray-400 italic">"The quiet guardian with a red bandana"</p>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Quiet and observant, Kuro never leaves Milo's side. He wears a faded red bandana found near the old train tracks. When the Lo-Fi radio turns on, he immediately dozes off.
            </p>
            <div className="space-y-1.5 text-[11px] bg-black/30 p-2.5 rounded-lg border border-[#1e2a4a]">
              <div className="flex justify-between">
                <span className="text-gray-400">Purr Volume:</span>
                <span className="text-purple-300 font-bold">Ultra Soft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Bandana Style:</span>
                <span className="text-purple-300 font-bold">100 / 100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Favorite Spot:</span>
                <span className="text-gray-200">Right next to Milo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#141d36] border-t border-[#24335c]">
          <span className="text-[11px] text-gray-400">Press ESC or click outside to close</span>
          <button
            onClick={onMeow}
            className="px-4 py-2 bg-[#ffcc44] hover:bg-[#ffe066] text-black font-bold text-xs rounded-lg transition-all shadow-md active:scale-95 flex items-center gap-1.5"
          >
            <span>🐱</span>
            <span>PET & MEOW</span>
          </button>
        </div>
      </div>
    </div>
  );
};
