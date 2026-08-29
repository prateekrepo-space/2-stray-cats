export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type SoundEffectType = 'switch' | 'book' | 'page' | 'pop' | 'chime' | 'purr';

export interface SceneClickableObject {
  id: string;
  name: string;
  bounds: Bounds;
  soundType: SoundEffectType;
  toastMsg?: string;
  toastIcon?: string;
}

export interface LogicalPoint {
  lx: number;
  ly: number;
}
