export interface ObjectBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface InteractiveSceneObject {
  id: string;
  name: string;
  category: 'lighting' | 'audio' | 'modal' | 'weather' | 'easter_egg';
  icon: string;
  bounds: ObjectBounds[];
  tooltip: string;
  actionHint: string;
}

/**
 * Logical 512x279 Coordinate bounding boxes for all clickable elements in the bedroom scene.
 */
export const INTERACTIVE_SCENE_OBJECTS: InteractiveSceneObject[] = [
  {
    id: 'fairy_lights',
    name: 'Ceiling Fairy / Rice Lights',
    category: 'lighting',
    icon: '✨',
    bounds: [
      { x: 0, y: 0, width: 110, height: 50 },     // Left ceiling string
      { x: 410, y: 0, width: 102, height: 60 },   // Right ceiling string
    ],
    tooltip: 'Ceiling Fairy Lights',
    actionHint: 'Click to cycle twinkle & color modes',
  },
  {
    id: 'window_cats',
    name: 'The Window Cats',
    category: 'modal',
    icon: '🐱',
    bounds: [
      { x: 235, y: 120, width: 110, height: 65 },  // Window sill cats (scaled coords)
    ],
    tooltip: '2 Stray Cats',
    actionHint: 'Click to meet the strays & hear them meow',
  },
  {
    id: 'desk_lamp',
    name: 'Left Study Desk Lamp',
    category: 'lighting',
    icon: '💡',
    bounds: [
      { x: 35, y: 105, width: 45, height: 65 },
    ],
    tooltip: 'Desk Lamp',
    actionHint: 'Click to toggle study lamp light',
  },
  {
    id: 'bedside_lamp',
    name: 'Right Bedside Lamp',
    category: 'lighting',
    icon: '🕯️',
    bounds: [
      { x: 440, y: 135, width: 35, height: 55 },
    ],
    tooltip: 'Bedside Lamp',
    actionHint: 'Click to toggle cozy nightstand lamp',
  },
  {
    id: 'lofi_radio',
    name: 'Lo-Fi Desk Radio',
    category: 'audio',
    icon: '📻',
    bounds: [
      { x: 0, y: 110, width: 45, height: 60 },
    ],
    tooltip: 'Lo-Fi Radio',
    actionHint: 'Click to Play / Pause chill beats',
  },
  {
    id: 'night_window',
    name: 'Night Sky & Moon Window',
    category: 'weather',
    icon: '🪟',
    bounds: [
      { x: 190, y: 25, width: 200, height: 110 },
    ],
    tooltip: 'Night Sky Window',
    actionHint: 'Click to toggle weather (Clear ↔ Rain ↔ Snow)',
  },
  {
    id: 'cozy_bed',
    name: 'Cozy Bed & Blanket',
    category: 'modal',
    icon: '🛏️',
    bounds: [
      { x: 295, y: 180, width: 215, height: 95 },
    ],
    tooltip: 'Cozy Bed',
    actionHint: 'Click to open Memories & Photo Album',
  },
  {
    id: 'wall_calendar',
    name: 'Wall Calendar & Notes',
    category: 'modal',
    icon: '📅',
    bounds: [
      { x: 425, y: 65, width: 45, height: 65 },
    ],
    tooltip: 'Community Calendar',
    actionHint: 'Click to open Notes & Visitor Guestbook',
  },
  {
    id: 'window_plant',
    name: 'Window Sill Plant & Coffee Mug',
    category: 'easter_egg',
    icon: '🌱',
    bounds: [
      { x: 170, y: 125, width: 40, height: 55 },
    ],
    tooltip: 'Potted Plant',
    actionHint: 'Click to water the plant',
  },
  {
    id: 'wall_art',
    name: 'Wall Picture Frames',
    category: 'easter_egg',
    icon: '🖼️',
    bounds: [
      { x: 0, y: 40, width: 65, height: 65 },
    ],
    tooltip: 'Art Frames',
    actionHint: 'Click to admire pixel artwork',
  },
];
