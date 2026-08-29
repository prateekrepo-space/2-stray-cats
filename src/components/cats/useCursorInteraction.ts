'use client'

import { RefObject, useMemo } from 'react';

export function useCursorInteraction(
  catRef: RefObject<HTMLElement | SVGElement | null>,
  mousePosition: { x: number; y: number }
) {
  return useMemo(() => {
    if (!catRef.current || (mousePosition.x === 0 && mousePosition.y === 0)) {
      return { isNear: false, angle: 0 };
    }

    const rect = catRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = mousePosition.x - centerX;
    const dy = mousePosition.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 200) { // increased from 150 for earlier detection
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      return { isNear: true, angle }; // angle can be negative, that's fine
    }

    return { isNear: false, angle: 0 };
  }, [catRef, mousePosition.x, mousePosition.y]); // key: depend on x/y values
}
