'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/toast/ToastProvider';

export interface ThemePalette {
  id: string;
  name: string;
  icon: string;
  colors: {
    background: string;
    cardBg: string;
    cardBorder: string;
    textPrimary: string;
    textSecondary: string;
    textAccent: string;
    footerBg: string;
  };
}

export const fontThemePalettes: ThemePalette[] = [
  {
    id: 'cozy-night',
    name: 'Cozy Night',
    icon: '🌙',
    colors: {
      background: '#0a0e1a',
      cardBg: '#121828',
      cardBorder: '#2a3050',
      textPrimary: '#f0ece0',
      textSecondary: '#b0a890',
      textAccent: '#ffcc44',
      footerBg: '#080c18',
    },
  },
  {
    id: 'pico-8',
    name: 'Pico-8',
    icon: '👾',
    colors: {
      background: '#1D2B53',
      cardBg: '#29ADFF',
      cardBorder: '#00E756',
      textPrimary: '#FFF1E8',
      textSecondary: '#C2C3C7',
      textAccent: '#FF004D',
      footerBg: '#000000',
    },
  },
  {
    id: 'gameboy',
    name: 'GameBoy',
    icon: '🍏',
    colors: {
      background: '#0f380f',
      cardBg: '#306230',
      cardBorder: '#8bac0f',
      textPrimary: '#9bbc0f',
      textSecondary: '#8bac0f',
      textAccent: '#9bbc0f',
      footerBg: '#0f380f',
    },
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    icon: '🌆',
    colors: {
      background: '#0d0221',
      cardBg: '#190a38',
      cardBorder: '#ff0055',
      textPrimary: '#00f5d4',
      textSecondary: '#7b2cbf',
      textAccent: '#ff0055',
      footerBg: '#05010d',
    },
  },
  {
    id: 'sunset',
    name: 'Warm Sunset',
    icon: '🌇',
    colors: {
      background: '#2b1020',
      cardBg: '#421732',
      cardBorder: '#d94e34',
      textPrimary: '#ffd166',
      textSecondary: '#f78c6b',
      textAccent: '#d94e34',
      footerBg: '#1a0914',
    },
  },
];

export function applyTheme(palette: ThemePalette) {
  const root = document.documentElement;
  root.style.setProperty('--background', palette.colors.background);
  root.style.setProperty('--card-bg', palette.colors.cardBg);
  root.style.setProperty('--card-border', palette.colors.cardBorder);
  root.style.setProperty('--text-primary', palette.colors.textPrimary);
  root.style.setProperty('--text-secondary', palette.colors.textSecondary);
  root.style.setProperty('--text-accent', palette.colors.textAccent);
  root.style.setProperty('--footer-bg', palette.colors.footerBg);
}

export default function PaletteThemeSwitcher() {
  const [currentThemeId, setCurrentThemeId] = useState('cozy-night');
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('2cat_theme');
    if (saved) {
      const found = fontThemePalettes.find((p) => p.id === saved);
      if (found) {
        setCurrentThemeId(saved);
        applyTheme(found);
      }
    }
  }, []);

  const handleSelectTheme = (palette: ThemePalette) => {
    setCurrentThemeId(palette.id);
    applyTheme(palette);
    localStorage.setItem('2cat_theme', palette.id);
    setIsOpen(false);
    showToast(`Palette theme changed to ${palette.name}`, palette.icon);
  };

  const currentTheme = fontThemePalettes.find((p) => p.id === currentThemeId) || fontThemePalettes[0];

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="font-pixel text-[10px] px-3 py-1.5 bg-[#121828]/90 border border-[#ffcc44] text-[#ffcc44] rounded flex items-center gap-1.5 hover:bg-[#1a2238] transition-colors shadow"
        title="Switch retro color palette theme"
      >
        <span>{currentTheme.icon}</span>
        <span className="hidden sm:inline">{currentTheme.name}</span>
        <span className="text-[8px] opacity-70">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-[#121828] border-2 border-[#ffcc44] rounded shadow-2xl p-2 font-pixel text-xs space-y-1 animate-[fade-up_0.15s_ease-out]">
          <div className="text-[9px] text-[#b0a890] px-2 py-1 border-b border-[#2a3050] uppercase tracking-wider">
            Select Palette Theme
          </div>
          {fontThemePalettes.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectTheme(p)}
              className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between transition-colors text-[10px] ${
                p.id === currentThemeId
                  ? 'bg-[#ffcc44] text-black font-bold'
                  : 'text-[#f0ece0] hover:bg-[#1a2238] hover:text-[#ffcc44]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span>{p.icon}</span>
                <span>{p.name}</span>
              </div>
              <div className="flex gap-0.5">
                <div className="w-2 h-2 rounded-full" style={{ background: p.colors.textAccent }} />
                <div className="w-2 h-2 rounded-full" style={{ background: p.colors.background }} />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
