import type { FingerStatus, HandConfig, HandType } from '../_config/types';
import { Finger } from './finger';

interface HandProps {
  config: HandConfig;
  fingerStatuses: Record<string, FingerStatus>;
  onFingerClick: (hand: HandType, finger: string, status: FingerStatus) => void;
}

export const Hand = ({ config, fingerStatuses, onFingerClick }: HandProps) => {
  const { type, baseImage, fingers } = config;

  return (
    <div className='flex flex-col items-center'>
      <div
        className='hand relative'
        style={{ width: '378px', height: '375px' }}
      >
        {/* Base hand image */}
        <img
          src={baseImage || '/placeholder.svg'}
          alt={`${type} hand`}
          className='w-full h-full'
        />

        {/* Render all fingers */}
        {fingers.map((fingerConfig) => {
          const fingerKey = `${type}-${fingerConfig.name}`;
          const status = fingerStatuses[fingerKey] || 'inactive';

          return (
            <Finger
              key={fingerKey}
              config={fingerConfig}
              hand={type}
              status={status}
              onClick={onFingerClick}
            />
          );
        })}
      </div>

      <h4 className='text-lg font-medium text-center mt-4 capitalize'>
        {type} Hand
      </h4>
    </div>
  );
};
