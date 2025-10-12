import type { FingerConfig, FingerStatus, HandType } from '../_config/types';
import blankFingerImage from '../_images/blank_finger.png';

interface FingerProps {
  config: FingerConfig;
  hand: HandType;
  status: FingerStatus;
  onClick: (hand: HandType, finger: string, status: FingerStatus) => void;
}

export const Finger = ({ config, hand, status, onClick }: FingerProps) => {
  const { name, position, activeImage, inactiveImage } = config;

  // Determine which image to show based on status
  const getFingerImage = () => {
    if (status === 'active' || status === 'enrolled') {
      return activeImage;
    }

    if (status === 'enrolling') return inactiveImage;

    return blankFingerImage;
  };

  const fingerImage = getFingerImage();

  // Don't render if no image is available
  if (!fingerImage) {
    return null;
  }

  const handleClick = () => {
    onClick(hand, name, status);
  };

  return (
    <button
      onClick={handleClick}
      className={`absolute transition-opacity hover:opacity-80 ${hand === 'left' ? 'left__' + name : 'right__' + name}  `}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      aria-label={`${hand} ${name} finger - ${status}`}
    >
      <img
        src={fingerImage || '/placeholder.svg'}
        alt={`${hand} ${name}`}
        className='pointer-events-none'
      />
    </button>
  );
};
