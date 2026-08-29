'use client';

import React, { useRef, useState, useEffect } from 'react';
import { SCENE_CLICKABLE_OBJECTS } from './sceneObjects';
import { useSceneAudio } from './useSceneAudio';
import { useScreenCoords } from '@/hooks/useScreenCoords';
import { SceneClickableObject } from '@/types/scene';

export interface InteractivePixelCanvasProps {
  onShowToast: (msg: string, icon: string) => void;
}

export const InteractivePixelCanvas: React.FC<InteractivePixelCanvasProps> = ({
  onShowToast,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { playPop, playRadioTune } = useSceneAudio();
  const { getLogicalCoords } = useScreenCoords(containerRef, 1024, 559);

  // Active Hovered Item
  const [hoveredItem, setHoveredItem] = useState<SceneClickableObject | null>(null);
  const [isSceneRendered, setIsSceneRendered] = useState<boolean>(false);

  // --- RENDER HIGH-FIDELITY SCENE & INSCRIBE TEXT DIRECTLY ON CANVAS PIXELS ---
  useEffect(() => {
    let isCancelled = false;

    const loadCanvas = async () => {
      try {
        const res = await fetch('/data/bedroomScene.bin');
        if (!res.ok) throw new Error('Scene buffer fetch failed');
        const buffer = await res.arrayBuffer();

        if (isCancelled || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        ctx.imageSmoothingEnabled = false;

        // 1. Draw native 1024x559 room pixels
        const u8 = new Uint8ClampedArray(buffer);
        const imgData = new ImageData(u8, 1024, 559);
        ctx.putImageData(imgData, 0, 0);

        // 2. Inscribe 'little corner of the internet' directly onto the canvas wooden panel
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Drop shadow for engraved depth
        ctx.fillStyle = 'rgba(10, 8, 6, 0.85)';
        ctx.fillText('little corner of the internet', 486, 413);

        // Warm wood pigment
        ctx.fillStyle = '#cda16e';
        ctx.fillText('little corner of the internet', 485, 412);

        setIsSceneRendered(true);
      } catch (err) {
        console.error('Failed to load canvas:', err);
      }
    };

    loadCanvas();

    return () => {
      isCancelled = true;
    };
  }, []);

  const checkHit = (lx: number, ly: number): SceneClickableObject | null => {
    for (const item of SCENE_CLICKABLE_OBJECTS) {
      const b = item.bounds;
      if (lx >= b.x && lx <= b.x + b.width && ly >= b.y && ly <= b.y + b.height) {
        return item;
      }
    }
    return null;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { lx, ly } = getLogicalCoords(e);
    if (lx < 0 || lx >= 1024 || ly < 0 || ly >= 559) {
      setHoveredItem(null);
      return;
    }
    const hit = checkHit(lx, ly);
    setHoveredItem(hit);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { lx, ly } = getLogicalCoords(e);
    if (lx < 0 || lx >= 1024 || ly < 0 || ly >= 559) return;

    const hit = checkHit(lx, ly);
    if (!hit) return;

    if (hit.soundType === 'book' || hit.soundType === 'page') {
      playRadioTune();
    } else {
      playPop();
    }
    if (hit.toastMsg && hit.toastIcon) {
      onShowToast(hit.toastMsg, hit.toastIcon);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative w-full h-full overflow-hidden select-none bg-[#070b14] ${
        hoveredItem ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      {/* --- 100% PURE HTML5 HIGH-FIDELITY BACKGROUND CANVAS --- */}
      <canvas
        ref={canvasRef}
        width={1024}
        height={559}
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        style={{
          imageRendering: 'pixelated',
          display: 'block',
        }}
      />

      {/* Loading Skeleton */}
      {!isSceneRendered && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#070b14] text-gray-400 font-mono text-xs z-0">
          <span>Loading pixel environment...</span>
        </div>
      )}
    </div>
  );
};
