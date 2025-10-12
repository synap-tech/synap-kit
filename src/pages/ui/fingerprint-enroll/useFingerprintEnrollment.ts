'use client';

import { useCallback, useState } from 'react';

import type {
  FingerData,
  FingerName,
  FingerStatus,
  HandType,
} from './_config/types';

interface UseFingerprintEnrollmentOptions {
  onEnroll?: (data: FingerData) => void | Promise<void>;
  onError?: (data: FingerData, error: Error) => void;
}

export const useFingerprintEnrollment = (
  options?: UseFingerprintEnrollmentOptions
) => {
  const [fingerStatuses, setFingerStatuses] = useState<
    Record<string, FingerStatus>
  >({});
  const [isEnrolling, setIsEnrolling] = useState(false);

  const updateFingerStatus = useCallback(
    (hand: HandType, finger: FingerName, status: FingerStatus) => {
      const key = `${hand}-${finger}`;
      setFingerStatuses((prev) => ({
        ...prev,
        [key]: status,
      }));
    },
    []
  );

  const enrollFinger = useCallback(
    async (hand: HandType, finger: FingerName) => {
      const key = `${hand}-${finger}`;
      const currentStatus = fingerStatuses[key] || 'inactive';

      const fingerData: FingerData = {
        hand,
        finger,
        status: currentStatus,
      };

      try {
        setIsEnrolling(true);
        updateFingerStatus(hand, finger, 'active');

        // Call the enrollment callback if provided
        if (options?.onEnroll) {
          await options.onEnroll(fingerData);
        }

        // Update to enrolled status on success
        updateFingerStatus(hand, finger, 'enrolled');
      } catch (error) {
        updateFingerStatus(hand, finger, 'error');
        if (options?.onError) {
          options.onError(fingerData, error as Error);
        }
      } finally {
        setIsEnrolling(false);
      }
    },
    [fingerStatuses, options, updateFingerStatus]
  );

  const resetFinger = useCallback(
    (hand: HandType, finger: FingerName) => {
      updateFingerStatus(hand, finger, 'inactive');
    },
    [updateFingerStatus]
  );

  const resetAll = useCallback(() => {
    setFingerStatuses({});
  }, []);

  return {
    fingerStatuses,
    isEnrolling,
    enrollFinger,
    resetFinger,
    resetAll,
    updateFingerStatus,
  };
};
