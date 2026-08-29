'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useToast } from '@/components/toast/ToastProvider';

const GRID_SIZE = 32;

const DEFAULT_PALETTE = [
  '#000000', '#ffffff', '#ffcc44', '#c07830', '#484858',
  '#cc3333', '#5cb85c', '#8ab4f8', '#a06020', '#e0b060',
  '#daa520', '#907878', '#121828', '#2a3050', '#b0a890',
];

export interface PixelCanvasWidgetProps {
  onPublishToMemories?: (dataUrl: string, title: string) => void;
}

export default function PixelCanvasWidget({ onPublishToMemories }: PixelCanvasWidgetProps) {
  const [selectedColor, setSelectedColor] = useState('#ffcc44');
  const [activeTool, setActiveTool] = useState<'pencil' | 'eraser' | 'bucket' | 'picker'>('pencil');
  const [showGrid, setShowGrid] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [drawingTitle, setDrawingTitle] = useState('My Pixel Cat');
  const { showToast } = useToast();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Initialize empty canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0a0e1a';
    ctx.fillRect(0, 0, GRID_SIZE, GRID_SIZE);

    // Save initial state to history
    setHistory([canvas.toDataURL()]);
  }, []);

  const saveHistoryState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setHistory((prev) => [...prev.slice(-15), canvas.toDataURL()]);
  }, []);

  // Bresenham's Line Algorithm for pixel-perfect line drawing
  const drawPixelLine = useCallback((x0: number, y0: number, x1: number, y1: number, color: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    let currX = x0;
    let currY = y0;

    while (true) {
      if (currX >= 0 && currX < GRID_SIZE && currY >= 0 && currY < GRID_SIZE) {
        ctx.fillStyle = color;
        ctx.fillRect(currX, currY, 1, 1);
      }

      if (currX === x1 && currY === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        currX += sx;
      }
      if (e2 < dx) {
        err += dx;
        currY += sy;
      }
    }
  }, []);

  // Flood Fill Bucket Algorithm
  const floodFill = useCallback((startX: number, startY: number, fillColor: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, GRID_SIZE, GRID_SIZE);
    const data = imgData.data;

    const getPixelColor = (x: number, y: number) => {
      const idx = (y * GRID_SIZE + x) * 4;
      return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
    };

    // Convert hex color to RGBA
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 1;
    tempCanvas.height = 1;
    const tempCtx = tempCanvas.getContext('2d')!;
    tempCtx.fillStyle = fillColor;
    tempCtx.fillRect(0, 0, 1, 1);
    const fillRgba = Array.from(tempCtx.getImageData(0, 0, 1, 1).data);

    const targetColor = getPixelColor(startX, startY);

    if (
      targetColor[0] === fillRgba[0] &&
      targetColor[1] === fillRgba[1] &&
      targetColor[2] === fillRgba[2] &&
      targetColor[3] === fillRgba[3]
    ) {
      return;
    }

    const queue: [number, number][] = [[startX, startY]];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const [x, y] = queue.shift()!;
      const key = `${x},${y}`;

      if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE || visited.has(key)) {
        continue;
      }

      const currentColor = getPixelColor(x, y);
      if (
        currentColor[0] === targetColor[0] &&
        currentColor[1] === targetColor[1] &&
        currentColor[2] === targetColor[2] &&
        currentColor[3] === targetColor[3]
      ) {
        visited.add(key);
        const idx = (y * GRID_SIZE + x) * 4;
        data[idx] = fillRgba[0];
        data[idx + 1] = fillRgba[1];
        data[idx + 2] = fillRgba[2];
        data[idx + 3] = fillRgba[3];

        queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
      }
    }

    ctx.putImageData(imgData, 0, 0);
    saveHistoryState();
  }, [saveHistoryState]);

  // Convert client mouse coordinates to grid cell (0-31)
  const getGridCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = Math.floor(((clientX - rect.left) / rect.width) * GRID_SIZE);
    const y = Math.floor(((clientY - rect.top) / rect.height) * GRID_SIZE);

    return {
      x: Math.max(0, Math.min(GRID_SIZE - 1, x)),
      y: Math.max(0, Math.min(GRID_SIZE - 1, y)),
    };
  };

  const handlePointerDown = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const coords = getGridCoords(e);
    if (!coords) return;

    if (activeTool === 'picker') {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const p = ctx.getImageData(coords.x, coords.y, 1, 1).data;
      const hex = `#${((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1)}`;
      setSelectedColor(hex);
      setActiveTool('pencil');
      showToast(`Sampled color ${hex}`, '👁️');
      return;
    }

    if (activeTool === 'bucket') {
      floodFill(coords.x, coords.y, selectedColor);
      return;
    }

    isDrawingRef.current = true;
    lastPosRef.current = coords;

    const drawColor = activeTool === 'eraser' ? '#0a0e1a' : selectedColor;
    drawPixelLine(coords.x, coords.y, coords.x, coords.y, drawColor);
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !lastPosRef.current) return;
    const coords = getGridCoords(e);
    if (!coords) return;

    const drawColor = activeTool === 'eraser' ? '#0a0e1a' : selectedColor;
    drawPixelLine(lastPosRef.current.x, lastPosRef.current.y, coords.x, coords.y, drawColor);
    lastPosRef.current = coords;
  };

  const handlePointerUp = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      lastPosRef.current = null;
      saveHistoryState();
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#0a0e1a';
    ctx.fillRect(0, 0, GRID_SIZE, GRID_SIZE);
    saveHistoryState();
    showToast('Canvas cleared', '🧹');
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const previous = history[history.length - 2];
    const img = new Image();
    img.src = previous;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, GRID_SIZE, GRID_SIZE);
      ctx.drawImage(img, 0, 0);
      setHistory((prev) => prev.slice(0, -1));
      showToast('Undo performed', '↩️');
    };
  };

  // Export high resolution crisp pixel art PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create high-res 512x512 export canvas
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 512;
    exportCanvas.height = 512;
    const exportCtx = exportCanvas.getContext('2d')!;
    exportCtx.imageSmoothingEnabled = false;
    exportCtx.drawImage(canvas, 0, 0, 512, 512);

    const link = document.createElement('a');
    link.download = `${drawingTitle.toLowerCase().replace(/\s+/g, '-')}-pixel-art.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
    showToast(`Downloaded "${drawingTitle}.png" 📥`, '🎨');
  };

  const handlePublish = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    if (onPublishToMemories) {
      onPublishToMemories(dataUrl, drawingTitle);
    }
    showToast(`Published "${drawingTitle}" to Memories! ✨`, '🐾');
  };

  return (
    <div id="pixel-canvas-widget" className="w-full max-w-xl mx-auto my-10 p-6 bg-[#121828] border-3 border-[#ffcc44] rounded shadow-2xl relative select-none">
      {/* Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#2a3050]">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎨</span>
          <div>
            <span className="font-pixel text-[10px] text-[#ffcc44] block">DRAW YOUR OWN STRAY CAT</span>
            <input
              type="text"
              value={drawingTitle}
              onChange={(e) => setDrawingTitle(e.target.value)}
              className="font-pixel text-xs bg-black/40 text-[#f0ece0] border border-[#2a3050] px-2 py-1 rounded focus:border-[#ffcc44] outline-none"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`font-pixel text-[9px] px-2.5 py-1.5 rounded border ${
              showGrid ? 'bg-[#ffcc44] text-black border-[#ffcc44]' : 'bg-[#2a3050] text-gray-300 border-gray-700'
            }`}
          >
            GRID {showGrid ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={handleUndo}
            disabled={history.length <= 1}
            className="font-pixel text-[9px] px-2.5 py-1.5 bg-[#2a3050] hover:bg-[#3a4468] disabled:opacity-40 text-[#f0ece0] border border-gray-700 rounded"
          >
            ↩ UNDO
          </button>
          <button
            onClick={handleClear}
            className="font-pixel text-[9px] px-2.5 py-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-200 border border-red-800 rounded"
          >
            🧹 CLEAR
          </button>
        </div>
      </div>

      {/* Main Canvas & Tools Container */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
        {/* Tool Palette */}
        <div className="flex sm:flex-col gap-2 bg-[#0a0e1a] p-2 rounded border border-[#2a3050]">
          {[
            { id: 'pencil', label: '✏️ Pencil' },
            { id: 'bucket', label: '🪣 Bucket' },
            { id: 'eraser', label: '🧹 Eraser' },
            { id: 'picker', label: '👁️ Picker' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTool(t.id as typeof activeTool)}
              className={`font-pixel text-[10px] px-3 py-2 rounded text-left transition-colors ${
                activeTool === t.id
                  ? 'bg-[#ffcc44] text-black font-bold'
                  : 'text-gray-300 hover:bg-[#1a2238] hover:text-[#ffcc44]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Pixel Canvas Display */}
        <div className="relative border-4 border-[#2a3050] rounded bg-[#0a0e1a] shadow-inner overflow-hidden">
          <canvas
            ref={canvasRef}
            width={GRID_SIZE}
            height={GRID_SIZE}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
            className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] cursor-crosshair block"
            style={{ imageRendering: 'pixelated' }}
          />

          {/* Grid Overlay Lines */}
          {showGrid && (
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                backgroundSize: `${320 / GRID_SIZE}px ${320 / GRID_SIZE}px`,
              }}
            />
          )}
        </div>
      </div>

      {/* Color Palette Selector Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-[10px] font-pixel text-[#b0a890] mb-2">
          <span>COLOR PALETTE</span>
          <div className="flex items-center gap-2">
            <span>CUSTOM:</span>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-6 h-6 rounded cursor-pointer border border-[#2a3050] bg-transparent"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 bg-[#0a0e1a] p-3 rounded border border-[#2a3050] justify-center">
          {DEFAULT_PALETTE.map((hex) => (
            <button
              key={hex}
              onClick={() => setSelectedColor(hex)}
              className={`w-6 h-6 rounded border-2 transition-transform ${
                selectedColor === hex ? 'scale-125 border-white shadow-md z-10' : 'border-gray-800 hover:scale-110'
              }`}
              style={{ background: hex }}
              title={hex}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#2a3050]">
        <button
          onClick={handleDownload}
          className="pixel-btn px-4 py-2 text-[10px]"
        >
          📥 DOWNLOAD PNG
        </button>

        <button
          onClick={handlePublish}
          className="pixel-btn pixel-btn-accent px-5 py-2 text-[10px] flex items-center gap-2"
        >
          <span>✨ POST TO MEMORIES</span>
        </button>
      </div>
    </div>
  );
}
