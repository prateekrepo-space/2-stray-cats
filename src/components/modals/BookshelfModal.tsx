'use client';

import React, { useState } from 'react';

interface BookshelfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Book {
  id: string;
  title: string;
  author: string;
  color: string;
  content: string;
  tag: string;
}

const BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Art of Midnight Stargazing',
    author: 'A Cat Sitting on a Sill',
    color: 'bg-amber-600/90 text-amber-100',
    tag: 'Astronomy',
    content: 'Chapter 1: When the street lamps turn on and the city falls quiet, find the highest window sill. The moon always looks brighter when you have a friend beside you.',
  },
  {
    id: '2',
    title: 'Rainy Night Lo-Fi Harmonies',
    author: '2 Stray Cats Music Society',
    color: 'bg-indigo-600/90 text-indigo-100',
    tag: 'Music',
    content: 'Chapter 3: The best beats are 65 BPM with the sound of distant thunder and a warm cup of hot cocoa on the study desk.',
  },
  {
    id: '3',
    title: 'Napping in Sunlight Patches',
    author: 'Milo & Kuro',
    color: 'bg-emerald-600/90 text-emerald-100',
    tag: 'Philosophy',
    content: 'Chapter 7: If a warm beam of afternoon sun moves across the hardwood floor, you must slowly migrate with it until sunset.',
  },
];

export const BookshelfModal: React.FC<BookshelfModalProps> = ({ isOpen, onClose }) => {
  const [selectedBook, setSelectedBook] = useState<Book>(BOOKS[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in font-mono">
      <div
        className="relative w-full max-w-xl bg-[#0c1222] border-2 border-[#ffcc44]/60 rounded-2xl shadow-[0_0_50px_rgba(255,204,68,0.25)] text-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141d36] border-b border-[#24335c]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📚</span>
            <div>
              <h3 className="font-pixel text-xs font-bold text-[#ffcc44]">COZY BOOKSHELF</h3>
              <p className="text-[11px] text-gray-400">Books collected over quiet evenings.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1c294d] text-gray-300 hover:text-white hover:bg-red-500/30 transition-colors font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* Books Spine Selector */}
          <div>
            <span className="text-xs text-gray-400 mb-2 block font-semibold">Pick a Book from the Shelf:</span>
            <div className="grid grid-cols-3 gap-2">
              {BOOKS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBook(b)}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all min-h-[90px] ${
                    selectedBook.id === b.id
                      ? `${b.color} border-white shadow-lg scale-105`
                      : 'bg-[#11182c] border-[#223158] text-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{b.tag}</span>
                  <span className="text-xs font-bold leading-tight line-clamp-2">{b.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Book Open Page Reading Area */}
          <div className="bg-[#fef9eb] text-gray-900 p-5 rounded-xl border border-amber-200 shadow-inner">
            <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-3">
              <h4 className="font-pixel text-xs font-bold text-gray-900">{selectedBook.title}</h4>
              <span className="text-[10px] text-gray-500 italic">by {selectedBook.author}</span>
            </div>
            <p className="text-xs leading-relaxed text-gray-800 italic">
              "{selectedBook.content}"
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#141d36] border-t border-[#24335c] text-[11px] text-gray-400">
          <span>Bookmark saved 🔖</span>
          <span>Click outside or ✕ to close</span>
        </div>
      </div>
    </div>
  );
};
