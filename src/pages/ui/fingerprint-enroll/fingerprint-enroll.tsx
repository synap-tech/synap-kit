import { useState } from 'react';

import Wrapper from '../wrapper';
import { Hand } from './_components/hand';
import { HAND_CONFIGS } from './_config/fingerprint-config';
import type { FingerStatus, HandType } from './_config/types';

const FingerprintEnroll = () => {
  // State to track status of each finger
  const [fingerStatuses, setFingerStatuses] = useState<
    Record<string, FingerStatus>
  >({
    'left-index': 'active',
    'left-thumb': 'active',
    'right-index': 'active',
    'right-thumb': 'active',
  });

  // Handler for finger clicks
  const handleFingerClick = (
    hand: HandType,
    finger: string,
    currentStatus: FingerStatus
  ) => {
    console.log('Finger clicked:', {
      hand,
      finger,
      status: currentStatus,
    });

    // Example: Toggle status or trigger enrollment process
    const fingerKey = `${hand}-${finger}`;

    // You can implement your enrollment logic here
    // For example, cycle through statuses or trigger an API call
    setFingerStatuses((prev) => ({
      ...prev,
      [fingerKey]: currentStatus === 'active' ? 'active' : 'enrolling',
    }));

    // Call your enrollment API or callback here
    // onEnroll?.({ hand, finger, status: currentStatus });
  };

  return (
    <Wrapper title='Fingerprint Enroll'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-4'>
        {HAND_CONFIGS.map((handConfig) => (
          <Hand
            key={handConfig.type}
            config={handConfig}
            fingerStatuses={fingerStatuses}
            onFingerClick={handleFingerClick}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default FingerprintEnroll;
