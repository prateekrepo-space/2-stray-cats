'use client';

import React, { useState, useEffect } from 'react';

interface GuestbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Note {
  id: string;
  author: string;
  message: string;
  time: string;
  color: string;
}

const DEFAULT_NOTES: Note[] = [
  {
    id: '1',
    author: 'Elena K.',
    message: 'Such a peaceful little corner of the internet. Milo reminds me of my cat Jasper 🐾',
    time: '2 hours ago',
    color: 'bg-amber-100/90 text-amber-950',
  },
  {
    id: '2',
    author: 'Samir',
    message: 'Listening to the Lo-Fi radio with the rain on... perfect coding vibe!',
    time: 'Yesterday',
    color: 'bg-sky-100/90 text-sky-950',
  },
  {
    id: '3',
    author: 'Aiko',
    message: 'Kuro’s little red bandana is the cutest thing ever. Stay cozy strays ❤️',
    time: '3 days ago',
    color: 'bg-rose-100/90 text-rose-950',
  },
];

export const GuestbookModal: React.FC<GuestbookModalProps> = ({ isOpen, onClose }) => {
  const [notes, setNotes] = useState<Note[]>(DEFAULT_NOTES);
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');

  // Load user notes from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('2cat_guestbook_notes');
      if (saved) {
        setNotes([...JSON.parse(saved), ...DEFAULT_NOTES]);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const colors = [
      'bg-amber-100/90 text-amber-950',
      'bg-emerald-100/90 text-emerald-950',
      'bg-purple-100/90 text-purple-950',
      'bg-rose-100/90 text-rose-950',
      'bg-sky-100/90 text-sky-950',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newNote: Note = {
      id: Date.now().toString(),
      author: author.trim(),
      message: message.trim(),
      time: 'Just now',
      color: randomColor,
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    setAuthor('');
    setMessage('');

    try {
      localStorage.setItem(
        '2cat_guestbook_notes',
        JSON.stringify(updated.filter((n) => !DEFAULT_NOTES.some((d) => d.id === n.id)))
      );
    } catch {
      // Ignore
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#0c1222] border-2 border-[#ffcc44]/60 rounded-2xl shadow-[0_0_50px_rgba(255,204,68,0.25)] text-gray-100 overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141d36] border-b border-[#24335c]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📝</span>
            <div>
              <h3 className="font-pixel text-sm font-bold text-[#ffcc44]">COMMUNITY STICKY NOTES</h3>
              <p className="text-[11px] text-gray-400">Leave a note on the wall for the two cats.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1c294d] text-gray-300 hover:text-white hover:bg-red-500/30 transition-colors font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {/* Notes Board & Submission Form */}
        <div className="p-6 flex flex-col gap-6 max-h-[75vh] overflow-y-auto">
          {/* Add Note Form */}
          <form onSubmit={handleAddNote} className="bg-[#11182c] border border-[#223158] rounded-xl p-4 flex flex-col gap-3">
            <span className="text-xs font-semibold text-[#ffcc44]">📌 Post a Note to the Wall</span>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your Name / Nickname"
                maxLength={30}
                required
                className="w-full sm:w-1/3 bg-[#080d1a] border border-[#232f50] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ffcc44]"
              />
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave a cozy message..."
                maxLength={120}
                required
                className="w-full sm:w-2/3 bg-[#080d1a] border border-[#232f50] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#ffcc44]"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#ffcc44] hover:bg-[#ffe066] text-black font-bold text-xs rounded-lg transition-all shadow active:scale-95 flex items-center gap-1.5"
              >
                <span>📌</span>
                <span>Stick Note</span>
              </button>
            </div>
          </form>

          {/* Sticky Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {notes.map((n) => (
              <div
                key={n.id}
                className={`${n.color} p-3.5 rounded-lg shadow-lg border border-black/10 flex flex-col justify-between transform hover:-translate-y-1 transition-transform min-h-[110px]`}
              >
                <p className="text-xs font-medium leading-relaxed italic">"{n.message}"</p>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-black/10 text-[10px] opacity-75 font-semibold">
                  <span>- {n.author}</span>
                  <span>{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#141d36] border-t border-[#24335c] text-[11px] text-gray-400">
          <span>{notes.length} sticky notes posted</span>
          <span>Click on the wall calendar anytime to open</span>
        </div>
      </div>
    </div>
  );
};
