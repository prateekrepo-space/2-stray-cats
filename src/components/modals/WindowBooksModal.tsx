'use client';

import React from 'react';

interface WindowBooksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WindowBooksModal: React.FC<WindowBooksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in font-mono">
      <div
        className="relative w-full max-w-lg bg-[#0c1222] border-2 border-[#ffcc44]/60 rounded-2xl shadow-[0_0_50px_rgba(255,204,68,0.25)] text-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141d36] border-b border-[#24335c]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📖</span>
            <div>
              <h3 className="font-pixel text-xs font-bold text-[#ffcc44]">WINDOW SILL JOURNAL</h3>
              <p className="text-[11px] text-gray-400">Notes left next to the window cats.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1c294d] text-gray-300 hover:text-white hover:bg-red-500/30 transition-colors font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4">
          <div className="bg-[#fef9eb] text-gray-900 p-5 rounded-xl border border-amber-200 shadow-inner">
            <span className="text-[10px] uppercase font-bold text-amber-700 block mb-1">Entry #42 • Midnight Observation</span>
            <p className="text-xs leading-relaxed text-gray-800 italic">
              "The rain has started tapping against the outer pane. Milo gave a tiny chirp when a lone taxi drove by down on the wet street. Kuro rested his chin on the wood sill and fell fast asleep. These quiet moments are everything."
            </p>
          </div>

          <div className="bg-[#11182c] border border-[#223158] p-3 rounded-lg flex items-center justify-between text-xs text-gray-300">
            <span>🐾 Cat Mood Tracker:</span>
            <span className="text-emerald-400 font-bold">100% Cozy & Relaxed</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#141d36] border-t border-[#24335c] text-[11px] text-gray-400">
          <span>Stack of 4 leather-bound notebooks</span>
          <span>Click ✕ to close</span>
        </div>
      </div>
    </div>
  );
};
