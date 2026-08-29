'use client';

import React from 'react';

/**
 * Top-left Title HUD component rendering '🐾 2 STRAY CATS' in pixel typography.
 */
export const TitleBadge: React.FC = () => {
  return (
    <div className="absolute top-6 left-6 z-20 pointer-events-none select-none">
      <h1 className="font-pixel text-sm sm:text-base md:text-lg font-bold text-white tracking-wider drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
        🐾 2 STRAY CATS
      </h1>
    </div>
  );
};

export default TitleBadge;
