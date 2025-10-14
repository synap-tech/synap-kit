import React from 'react';

import getDateTime from '@/utils/getDateTime';
import { getYear } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface YearNavigationProps {
  year: number;
  onPrevYear: () => void;
  onNextYear: () => void;
  maxYear?: number;
}

export const YearNavigation: React.FC<YearNavigationProps> = ({
  year,
  onPrevYear,
  onNextYear,
  maxYear = getYear(getDateTime()),
}) => {
  return (
    <div className='flex items-center gap-2'>
      <Button
        variant='outline'
        size='toolbar'
        onClick={onPrevYear}
        aria-label='Previous month'
      >
        <ChevronLeft className='size-4' />
      </Button>

      <span className='min-w-[140px] text-center text-lg text-foreground font-medium'>
        {year}
      </span>

      <Button
        variant='outline'
        size='toolbar'
        disabled={year === maxYear}
        onClick={onNextYear}
        aria-label='Next month'
      >
        <ChevronRight className='size-4' />
      </Button>
    </div>
  );
};
