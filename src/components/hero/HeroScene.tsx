'use client';

import React from 'react';
import { InteractivePixelCanvas } from '@/components/scene/InteractivePixelCanvas';
import { TitleBadge } from '@/components/hud/TitleBadge';
import { useToast } from '@/components/toast/ToastProvider';

export default function HeroScene() {
  const { showToast } = useToast();

  return (
    <section id="hero" className="relative w-full h-full overflow-hidden bg-[#070b14] select-none">
      {/* 100% Full-Screen Interactive Pixel Canvas */}
      <InteractivePixelCanvas onShowToast={showToast} />

      {/* Top-Left Pixel Title Badge */}
      <TitleBadge />
    </section>
  );
}
