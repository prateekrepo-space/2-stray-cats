'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useToast } from '@/components/toast/ToastProvider';

interface Track {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  notes: number[];
  color: string;
}

const TRACKS: Track[] = [
  {
    id: 't1',
    title: 'Starlight Window',
    artist: '2 Stray Cats Lo-Fi',
    bpm: 72,
    notes: [261.63, 329.63, 392.00, 493.88, 392.00, 329.63], // C4, E4, G4, B4
    color: '#ffcc44',
  },
  {
    id: 't2',
    title: 'Midnight Rain & Purrs',
    artist: 'Chill Cat Beats',
    bpm: 65,
    notes: [220.00, 261.63, 329.63, 349.23, 329.63, 261.63], // A3, C4, E4, F4
    color: '#5cb85c',
  },
  {
    id: 't3',
    title: 'Cozy Desk Lamp Ambient',
    artist: 'Window Sill Dreams',
    bpm: 60,
    notes: [196.00, 246.94, 293.66, 392.00, 293.66, 246.94], // G3, B3, D4, G4
    color: '#daa520',
  },
];

export default function PixelMusicPlayer() {
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const { showToast } = useToast();

  const currentTrack = TRACKS[currentTrackIdx];
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Play a smooth lo-fi ambient synth note
  const playSynthNote = useCallback((freq: number) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const volLevel = (volume / 100) * 0.15;
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(volLevel, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.8);
    } catch {
      // Audio fallback
    }
  }, [volume]);

  // Audio loop handler
  useEffect(() => {
    if (!isPlaying) {
      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    let noteStep = 0;
    const intervalMs = Math.round((60 / currentTrack.bpm) * 1000);

    // Synth loop
    synthTimerRef.current = setInterval(() => {
      const note = currentTrack.notes[noteStep % currentTrack.notes.length];
      playSynthNote(note);
      noteStep++;
    }, intervalMs);

    // Progress bar loop
    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 400);

    return () => {
      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, currentTrack, playSynthNote]);

  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    showToast(nextState ? `Playing "${currentTrack.title}"` : 'Music Paused', nextState ? '🎵' : '⏸️');
  };

  const nextTrack = () => {
    const nextIdx = (currentTrackIdx + 1) % TRACKS.length;
    setCurrentTrackIdx(nextIdx);
    setProgress(0);
    showToast(`Next track: ${TRACKS[nextIdx].title}`, '🎶');
  };

  const prevTrack = () => {
    const prevIdx = (currentTrackIdx - 1 + TRACKS.length) % TRACKS.length;
    setCurrentTrackIdx(prevIdx);
    setProgress(0);
    showToast(`Previous track: ${TRACKS[prevIdx].title}`, '🎶');
  };

  return (
    <div id="pixel-music-player" className="w-full max-w-xl mx-auto my-12 p-6 bg-[#121828] border-3 border-[#ffcc44] rounded shadow-2xl relative select-none">
      {/* Cassette Top Display */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2a3050]">
        <div className="flex items-center gap-2">
          <span className="text-xl">📻</span>
          <div>
            <span className="font-pixel text-[10px] text-[#ffcc44] block">LO-FI CASSETTE DECK</span>
            <h3 className="font-pixel text-xs sm:text-sm text-[#f0ece0] truncate max-w-[220px]">
              {currentTrack.title}
            </h3>
          </div>
        </div>
        <span className="font-pixel text-[9px] px-2 py-1 bg-black/40 text-gray-400 border border-gray-700 rounded">
          {isPlaying ? '● PLAYING' : 'OFFLINE'}
        </span>
      </div>

      {/* Track info & Visualizer */}
      <div className="bg-[#0a0e1a] p-4 rounded border border-[#2a3050] mb-6">
        <div className="flex items-center justify-between text-xs text-[#b0a890] mb-3">
          <span>{currentTrack.artist}</span>
          <span>BPM: {currentTrack.bpm}</span>
        </div>

        {/* Animated Pixel Visualizer Bars */}
        <div className="flex items-end justify-between h-12 gap-1.5 px-2 py-1 bg-black/50 rounded border border-gray-800">
          {[...Array(20)].map((_, i) => {
            const heightPct = isPlaying ? Math.sin(i * 0.8 + progress * 0.2) * 40 + 50 : 10;
            return (
              <div
                key={i}
                className="w-full rounded-t transition-all duration-150"
                style={{
                  height: `${heightPct}%`,
                  background: isPlaying ? currentTrack.color : '#2a3050',
                  opacity: isPlaying ? 0.8 : 0.3,
                }}
              />
            );
          })}
        </div>

        {/* Track Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-[9px] font-pixel text-gray-400 mb-1">
            <span>TRACK PROGRESS</span>
            <span>{Math.floor(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-[#1a2238] rounded overflow-hidden border border-[#2a3050]">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: currentTrack.color,
              }}
            />
          </div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Play / Skip Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevTrack}
            className="pixel-btn px-3 py-2 text-xs"
            title="Previous Track"
          >
            ⏮
          </button>

          <button
            onClick={togglePlay}
            className="pixel-btn pixel-btn-accent px-5 py-2 text-xs font-pixel flex items-center gap-2"
          >
            <span>{isPlaying ? '❚❚ PAUSE' : '▶ PLAY'}</span>
          </button>

          <button
            onClick={nextTrack}
            className="pixel-btn px-3 py-2 text-xs"
            title="Next Track"
          >
            ⏭
          </button>
        </div>

        {/* Volume Slider */}
        <div className="flex items-center gap-3">
          <span className="font-pixel text-[10px] text-[#b0a890]">
            🔊 {volume}%
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-24 accent-[#ffcc44] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
