import { SceneClickableObject } from '@/types/scene';

/**
 * Clickable Interactive Objects Registry (Native 1024x559 space):
 * 1. Books on Window Sill (Journal reading sound)
 * 2. Wooden Bookshelf (Upper shelves only - strictly above the sofa backrest)
 * 3. Front Wall Calendar (Calendar page flip sound)
 * 4. Front Wall Botanical Frame (Picture frame tap sound)
 */
export const SCENE_CLICKABLE_OBJECTS: SceneClickableObject[] = [
  {
    id: 'books_window',
    name: 'Books on the Window',
    bounds: { x: 680, y: 260, width: 130, height: 100 },
    soundType: 'book',
    toastMsg: 'Flipped a page in the window journal 📖',
    toastIcon: '📖',
  },
  {
    id: 'bookshelf',
    name: 'Bookshelf',
    // Strictly restricted to the upper visible shelves above the sofa cushion (y: 145 to 285)
    bounds: { x: 135, y: 145, width: 120, height: 140 },
    soundType: 'book',
    toastMsg: 'Browsed the wooden bookshelf 📚',
    toastIcon: '📚',
  },
  {
    id: 'front_calendar',
    name: 'Calendar on Front Wall',
    bounds: { x: 270, y: 170, width: 55, height: 95 },
    soundType: 'page',
    toastMsg: 'Checked the wall calendar 📅',
    toastIcon: '📅',
  },
  {
    id: 'front_photo_frame',
    name: 'Photo Frame on Front Wall',
    bounds: { x: 230, y: 45, width: 70, height: 90 },
    soundType: 'pop',
    toastMsg: 'Admired the botanical picture frame 🌿',
    toastIcon: '🌿',
  },
];
