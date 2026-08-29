'use client';

import { useState } from 'react';
import MemoriesGallery from '../memories/MemoriesGallery';
import PixelMusicPlayer from '../music/PixelMusicPlayer';
import PixelCanvasWidget from '../canvas/PixelCanvasWidget';
import { useToast } from '../toast/ToastProvider';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

function FeatureCard({ icon, title, description, isActive, onClick }: FeatureCardProps) {
  return (
    <div
      onClick={onClick}
      className={`group relative rounded-lg p-6 sm:p-8 cursor-pointer transition-all duration-200 hover:-translate-y-1 ${
        isActive
          ? 'bg-[#1a2238] border-2 border-[#ffcc44] shadow-xl'
          : 'bg-[#121828] border-2 border-[#2a3050] hover:border-[#3a4468]'
      }`}
    >
      <div className="absolute top-0 left-0 w-2 h-2 bg-[#ffcc44] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-2 h-2 bg-[#ffcc44] opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="mb-4 sm:mb-6 flex justify-center">
        {icon}
      </div>

      <h3
        className="font-pixel text-xs md:text-sm text-center mb-3 tracking-wide transition-colors"
        style={{ color: isActive ? 'var(--text-accent)' : 'var(--text-primary)' }}
      >
        {title}
      </h3>

      <p
        className="text-xs sm:text-sm text-center leading-relaxed mb-4"
        style={{ color: 'var(--text-secondary)' }}
      >
        {description}
      </p>

      <div className="text-center font-pixel text-[9px] sm:text-[10px] text-[#ffcc44]">
        {isActive ? '● VIEWING BELOW' : '▶ CLICK TO EXPLORE'}
      </div>
    </div>
  );
}

function StoryIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" shapeRendering="crispEdges">
      <rect x="10" y="8" width="28" height="32" fill="#2a3050" />
      <rect x="12" y="10" width="24" height="28" fill="#1a2040" />
      <rect x="10" y="8" width="4" height="32" fill="#3a4060" />
      <rect x="16" y="14" width="16" height="2" fill="#4a5070" opacity="0.6" />
      <rect x="16" y="19" width="14" height="2" fill="#4a5070" opacity="0.5" />
      <rect x="16" y="24" width="16" height="2" fill="#4a5070" opacity="0.4" />
      <rect x="22" y="32" width="4" height="3" fill="var(--text-accent)" opacity="0.6" />
    </svg>
  );
}

function MemoriesIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" shapeRendering="crispEdges">
      <rect x="8" y="16" width="32" height="22" fill="#2a3050" />
      <rect x="10" y="18" width="28" height="18" fill="#1a2040" />
      <rect x="18" y="12" width="12" height="4" fill="#2a3050" />
      <rect x="18" y="22" width="12" height="12" fill="#3a4060" />
      <rect x="20" y="24" width="8" height="8" fill="#1e2844" />
      <rect x="32" y="18" width="4" height="4" fill="var(--text-accent)" opacity="0.5" />
      <rect x="12" y="30" width="2" height="2" fill="#cc3333" opacity="0.5" />
    </svg>
  );
}

function LittleThingsIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" shapeRendering="crispEdges">
      <rect x="28" y="8" width="2" height="22" fill="#4a5a80" />
      <rect x="22" y="28" width="8" height="4" fill="#4a5a80" />
      <rect x="30" y="8" width="6" height="2" fill="#4a5a80" />
      <rect x="12" y="14" width="2" height="2" fill="var(--text-accent)" opacity="0.5" />
      <rect x="10" y="16" width="6" height="2" fill="var(--text-accent)" opacity="0.5" />
      <rect x="14" y="34" width="3" height="3" fill="#cc3333" opacity="0.4" />
    </svg>
  );
}

function CanvasIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" shapeRendering="crispEdges">
      <rect x="8" y="8" width="32" height="32" fill="#2a3050" />
      <rect x="10" y="10" width="28" height="28" fill="#0a0e1a" />
      <rect x="14" y="14" width="6" height="6" fill="#ffcc44" />
      <rect x="22" y="14" width="6" height="6" fill="#5cb85c" />
      <rect x="14" y="22" width="6" height="6" fill="#cc3333" />
      <rect x="22" y="22" width="12" height="12" fill="#8ab4f8" />
    </svg>
  );
}

export default function FeatureCards() {
  const [activeTab, setActiveTab] = useState<'story' | 'memories' | 'music' | 'canvas'>('memories');
  const { showToast } = useToast();

  const handleSelectTab = (tab: 'story' | 'memories' | 'music' | 'canvas', name: string) => {
    setActiveTab(tab);
    showToast(`Switched view to ${name}`, '🐾');
  };

  return (
    <section
      id="features"
      className="relative py-20 md:py-28 px-6 border-t border-[#2a3050]/60"
      style={{ background: 'var(--background)' }}
    >
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h2
          className="font-pixel text-sm md:text-base tracking-wider mb-4"
          style={{ color: 'var(--text-accent)' }}
        >
          EXPLORE THE WORLD
        </h2>
        <p
          className="text-sm md:text-base"
          style={{ color: 'var(--text-secondary)' }}
        >
          Select a category below to explore memories, lo-fi music, story chronicles, or draw your own pixel cat!
        </p>
      </div>

      {/* Feature cards grid — 4 columns */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <FeatureCard
          icon={<MemoriesIcon />}
          title="MEMORIES"
          description="Photo Bento gallery & memorable moments."
          isActive={activeTab === 'memories'}
          onClick={() => handleSelectTab('memories', 'Memories Gallery')}
        />
        <FeatureCard
          icon={<CanvasIcon />}
          title="PIXEL CANVAS"
          description="Draw your own stray cat & post to gallery!"
          isActive={activeTab === 'canvas'}
          onClick={() => handleSelectTab('canvas', 'Pixel Canvas Studio')}
        />
        <FeatureCard
          icon={<LittleThingsIcon />}
          title="LITTLE THINGS"
          description="Lo-Fi cassette audio player & ambient beats."
          isActive={activeTab === 'music'}
          onClick={() => handleSelectTab('music', 'Little Things Music Player')}
        />
        <FeatureCard
          icon={<StoryIcon />}
          title="OUR STORY"
          description="Milestone timeline of the two strays."
          isActive={activeTab === 'story'}
          onClick={() => handleSelectTab('story', 'Our Story Timeline')}
        />
      </div>

      {/* Dynamic Tab Display */}
      <div className="max-w-5xl mx-auto transition-all duration-300">
        {activeTab === 'memories' && (
          <div>
            <div className="text-center mb-8">
              <span className="font-pixel text-xs text-[#ffcc44] tracking-widest uppercase">
                📸 MEMORIES PHOTO BENTO GALLERY
              </span>
            </div>
            <MemoriesGallery />
          </div>
        )}

        {activeTab === 'canvas' && (
          <div>
            <div className="text-center mb-6">
              <span className="font-pixel text-xs text-[#ffcc44] tracking-widest uppercase">
                🎨 PIXEL ART STUDIO — DRAW YOUR STRAY CAT
              </span>
            </div>
            <PixelCanvasWidget />
          </div>
        )}

        {activeTab === 'music' && (
          <div>
            <div className="text-center mb-8">
              <span className="font-pixel text-xs text-[#ffcc44] tracking-widest uppercase">
                📻 LO-FI CASSETTE PLAYER & AMBIENT BEATS
              </span>
            </div>
            <PixelMusicPlayer />
          </div>
        )}

        {activeTab === 'story' && (
          <div className="text-center py-12 bg-[#121828] border-2 border-[#ffcc44] rounded max-w-xl mx-auto p-8">
            <span className="text-4xl mb-4 block">📖</span>
            <h3 className="font-pixel text-sm text-[#ffcc44] mb-3">OUR STORY TIMELINE</h3>
            <p className="text-sm text-[#b0a890] mb-6">
              The complete milestone timeline is featured right above in the intro section!
            </p>
            <a href="#intro" className="pixel-btn pixel-btn-accent inline-block px-6 py-3">
              ↑ JUMP TO STORY TIMELINE
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
