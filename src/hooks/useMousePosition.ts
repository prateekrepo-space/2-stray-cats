'use client'

import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let timeoutId: number | null = null;
    
    const updateMousePosition = (ev: MouseEvent) => {
      if (!timeoutId) {
        timeoutId = window.setTimeout(() => {
          setMousePosition({ x: ev.clientX, y: ev.clientY });
          timeoutId = null;
        }, 50);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return mousePosition;
}
