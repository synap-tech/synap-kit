import { ChevronDown, CirclePlus, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import TooltipWrapper from '@/components/ui/tooltip-wrapper';

export const CreateButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      aria-label='Create new entry'
      variant='default'
      size='toolbar'
      onClick={onClick}
    >
      <CirclePlus className='size-4' />
      New
    </Button>
  );
};

export const ResetButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <TooltipWrapper message='Reset filters'>
      <Button
        aria-label='Reset filters'
        variant='outline-toolbar'
        size={'toolbar'}
        className='text-destructive'
        onClick={onClick}
      >
        <X className='size-4' />
      </Button>
    </TooltipWrapper>
  );
};

{
  /* <Button
                aria-label='Reset filters'
                variant='outline-toolbar'
                size={'toolbar'}
                className='text-destructive'
                onClick={resetColumnFilters}
              >
                Reset Filters
                <X className='size-4' />
              </Button> */
}

export const MoreOptionButton = () => {
  return (
    <TooltipWrapper message='More options'>
      <Button
        aria-label='More options'
        variant='outline'
        size='icon'
        className='rounded'
      >
        <ChevronDown className='size-4' />
      </Button>
    </TooltipWrapper>
  );
};
