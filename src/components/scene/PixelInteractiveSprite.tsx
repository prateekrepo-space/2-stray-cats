'use client';

import React, { useState } from 'react';

export interface PixelInteractiveSpriteProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
  silhouettePath?: string; // Optional custom SVG path for crisp contour
  viewBox?: string;
}

/**
 * Reusable Global Interactive Object Component.
 * Wraps any pixel-art element or SVG sprite with a thin, crisp 1-2px white
 * pixel-art silhouette outline on hover without any tooltips, rectangular boxes, or text.
 */
export const PixelInteractiveSprite: React.FC<PixelInteractiveSpriteProps> = ({
  id,
  className = '',
  style = {},
  onClick,
  children,
  silhouettePath,
  viewBox = '0 0 100 100',
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      id={id}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-block cursor-pointer select-none transition-transform duration-150 ${className}`}
      style={{
        imageRendering: 'pixelated',
        ...style,
      }}
    >
      {/* Target Content */}
      <div
        className="transition-opacity duration-150"
        style={{
          filter: isHovered && !silhouettePath
            ? 'drop-shadow(1px 0 0 #ffffff) drop-shadow(-1px 0 0 #ffffff) drop-shadow(0 1px 0 #ffffff) drop-shadow(0 -1px 0 #ffffff)'
            : 'none',
        }}
      >
        {children}
      </div>

      {/* SVG Silhouette Path Overlay (if provided) */}
      {silhouettePath && (
        <svg
          viewBox={viewBox}
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-150 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          shapeRendering="crispEdges"
        >
          <path
            d={silhouettePath}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      )}
    </div>
  );
};

export default PixelInteractiveSprite;
