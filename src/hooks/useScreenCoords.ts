import { useCallback, RefObject } from 'react';
import { LogicalPoint } from '@/types/scene';

/**
 * Reusable hook that maps screen client mouse coordinates to
 * the native 1024x559 canvas coordinate space with object-fit: cover offset handling.
 */
export function useScreenCoords(
  containerRef: RefObject<HTMLDivElement | null>,
  nativeWidth: number = 1024,
  nativeHeight: number = 559
) {
  const getLogicalCoords = useCallback(
    (e: React.MouseEvent<HTMLDivElement>): LogicalPoint => {
      if (!containerRef.current) return { lx: -1, ly: -1 };
      const rect = containerRef.current.getBoundingClientRect();
      const containerAspect = rect.width / rect.height;
      const imageAspect = nativeWidth / nativeHeight;

      let renderWidth = rect.width;
      let renderHeight = rect.height;
      let offsetX = 0;
      let offsetY = 0;

      if (containerAspect > imageAspect) {
        renderHeight = rect.width / imageAspect;
        offsetY = (renderHeight - rect.height) / 2;
      } else {
        renderWidth = rect.height * imageAspect;
        offsetX = (renderWidth - rect.width) / 2;
      }

      const mouseCanvasX = e.clientX - rect.left + offsetX;
      const mouseCanvasY = e.clientY - rect.top + offsetY;

      const lx = Math.floor((mouseCanvasX / renderWidth) * nativeWidth);
      const ly = Math.floor((mouseCanvasY / renderHeight) * nativeHeight);

      return { lx, ly };
    },
    [containerRef, nativeWidth, nativeHeight]
  );

  return { getLogicalCoords };
}
