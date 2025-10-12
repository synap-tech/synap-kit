export type HandType = 'left' | 'right';

export type FingerName = 'thumb' | 'index' | 'middle' | 'ring' | 'pinky';

export type FingerStatus =
  | 'inactive'
  | 'enrolling'
  | 'active'
  | 'enrolled'
  | 'error';

export interface FingerData {
  hand: HandType;
  finger: FingerName;
  status: FingerStatus;
}

export interface FingerConfig {
  name: FingerName;
  position: {
    top: number;
    left: number;
  };
  activeImage?: string;
  inactiveImage?: string;
}

export interface HandConfig {
  type: HandType;
  baseImage: string;
  fingers: FingerConfig[];
}
