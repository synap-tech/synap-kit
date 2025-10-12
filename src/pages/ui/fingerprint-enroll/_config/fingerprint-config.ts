// LEFT HAND
import leftHandGreenIndex from '../_images/left/green/left_index_green.png';
import leftHandGreenMiddle from '../_images/left/green/left_middle_green.png';
import leftHandGreenPinky from '../_images/left/green/left_pinky_green.png';
import leftHandGreenRing from '../_images/left/green/left_ring_green.png';
import leftHandGreenThumb from '../_images/left/green/left_thumb_green.png';
import leftHand from '../_images/left/left_hand.png';
import leftHandOrangeIndex from '../_images/left/orange/left_index_orange.png';
import leftHandOrangeMiddle from '../_images/left/orange/left_middle_orange.png';
import leftHandOrangePinky from '../_images/left/orange/left_pinky_orange.png';
import leftHandOrangeRing from '../_images/left/orange/left_ring_orange.png';
import leftHandOrangeThumb from '../_images/left/orange/left_thumb_orange.png';
// RIGHT HAND
import rightHandGreenIndex from '../_images/right/green/right_index_green.png';
import rightHandGreenMiddle from '../_images/right/green/right_middle_green.png';
import rightHandGreenPinky from '../_images/right/green/right_pinky_green.png';
import rightHandGreenRing from '../_images/right/green/right_ring_green.png';
import rightHandGreenThumb from '../_images/right/green/right_thumb_green.png';
import rightHandOrangeIndex from '../_images/right/orange/right_index_orange.png';
import rightHandOrangeMiddle from '../_images/right/orange/right_middle_orange.png';
import rightHandOrangePinky from '../_images/right/orange/right_pinky_orange.png';
import rightHandOrangeRing from '../_images/right/orange/right_ring_orange.png';
import rightHandOrangeThumb from '../_images/right/orange/right_thumb_orange.png';
import rightHand from '../_images/right/right_hand.png';
import type { HandConfig } from './types';

export const HAND_CONFIGS: HandConfig[] = [
  {
    type: 'left',
    baseImage: leftHand,
    fingers: [
      {
        name: 'index',
        position: { top: 25, left: 247 },
        activeImage: leftHandGreenIndex,
        inactiveImage: leftHandOrangeIndex,
      },
      {
        name: 'thumb',
        position: { top: 189, left: 324 },
        activeImage: leftHandGreenThumb,
        inactiveImage: leftHandOrangeThumb,
      },
      {
        name: 'middle',
        position: { top: 6, left: 153 },
        activeImage: leftHandGreenMiddle,
        inactiveImage: leftHandOrangeMiddle,
      },
      {
        name: 'ring',
        position: { top: 37, left: 63 },
        activeImage: leftHandGreenRing,
        inactiveImage: leftHandOrangeRing,
      },
      {
        name: 'pinky',
        position: { top: 110, left: 7 },
        activeImage: leftHandGreenPinky,
        inactiveImage: leftHandOrangePinky,
      },
    ],
  },
  {
    type: 'right',
    baseImage: rightHand,
    fingers: [
      {
        name: 'index',
        position: { top: 26, left: 85 },
        activeImage: rightHandGreenIndex,
        inactiveImage: rightHandOrangeIndex,
      },
      {
        name: 'thumb',
        position: { top: 188, left: 8 },
        activeImage: rightHandGreenThumb,
        inactiveImage: rightHandOrangeThumb,
      },
      {
        name: 'middle',
        position: { top: 6, left: 180 },
        activeImage: rightHandGreenMiddle,
        inactiveImage: rightHandOrangeMiddle,
      },
      {
        name: 'ring',
        position: { top: 34, left: 269 },
        activeImage: rightHandGreenRing,
        inactiveImage: rightHandOrangeRing,
      },
      {
        name: 'pinky',
        position: { top: 110, left: 324 },
        activeImage: rightHandGreenPinky,
        inactiveImage: rightHandOrangePinky,
      },
    ],
  },
];
