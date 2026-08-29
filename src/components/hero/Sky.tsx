'use client';

import { useState, useEffect } from 'react';

interface StarData {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  isSoft: boolean;
}

export default function Sky() {
  const [stars, setStars] = useState<StarData[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
        isSoft: Math.random() > 0.5,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0" style={{
      background: 'linear-gradient(to bottom, var(--sky-top, #070b1a), var(--sky-mid, #0e1538), var(--sky-horizon, #2a3570))'
    }}>
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full bg-white ${star.isSoft ? 'animate-[twinkle-soft_3s_ease-in-out_infinite]' : 'animate-[twinkle_3s_ease-in-out_infinite]'}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Moon */}
      <svg className="absolute top-[10%] right-[10%] w-32 h-32" viewBox="0 0 100 100">
        <defs>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#fdfbd3" stopOpacity="1" />
            <stop offset="100%" stopColor="#fdfbd3" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="40" fill="url(#moonGlow)" className="drop-shadow-[0_0_20px_rgba(253,251,211,0.4)]" />
        {/* Craters */}
        <circle cx="35" cy="40" r="6" fill="#e6e1aa" opacity="0.6" />
        <circle cx="60" cy="30" r="4" fill="#e6e1aa" opacity="0.5" />
        <circle cx="55" cy="60" r="8" fill="#e6e1aa" opacity="0.7" />
        <circle cx="40" cy="65" r="3" fill="#e6e1aa" opacity="0.5" />
      </svg>

      {/* Clouds */}
      <svg className="absolute top-[20%] left-[-20%] w-64 h-32 opacity-20 animate-[cloud-drift_60s_linear_infinite]" viewBox="0 0 100 50">
        <path d="M10,40 Q15,25 30,30 Q40,10 60,25 Q75,15 85,30 Q95,35 90,45 Z" fill="#ffffff" shapeRendering="crispEdges"/>
      </svg>
      <svg className="absolute top-[40%] left-[-30%] w-80 h-40 opacity-15 animate-[cloud-drift_80s_linear_infinite]" style={{ animationDelay: '20s' }} viewBox="0 0 100 50">
        <path d="M10,40 Q15,25 30,30 Q40,10 60,25 Q75,15 85,30 Q95,35 90,45 Z" fill="#ffffff" shapeRendering="crispEdges"/>
      </svg>
    </div>
  );
}
