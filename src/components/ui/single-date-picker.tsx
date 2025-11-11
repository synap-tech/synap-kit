import * as React from 'react';

import {
  addDays,
  format,
  isAfter,
  isSameDay,
  isValid,
  subDays,
} from 'date-fns';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

import { ButtonGroup } from './button-group';

interface IProps {
  toolbar?: boolean;
  selected: Date;
  onSelect: (date: Date) => void;
  disableIcon?: boolean;
  className?: string;
  size?: ButtonProps['size'];
  minDate?: Date;
  maxDate?: Date;
  disabled?: (date: Date) => boolean;
  showAssistant?: boolean;
  displayFormat?: string;
}

const SingleDatePicker: React.FC<IProps> = ({
  toolbar,
  selected,
  onSelect,
  disableIcon = false,
  className,
  size = 'sm',
  minDate,
  maxDate,
  disabled,
  showAssistant = false,
  displayFormat = 'dd MMM, yyyy',
}) => {
  // Create a disabled function that combines minDate, maxDate, and custom disabled
  const isDisabled = React.useCallback(
    (date: Date) => {
      // Check minDate constraint
      if (minDate && date < minDate) return true;

      // Check maxDate constraint
      if (maxDate && date > maxDate) return true;

      // Check custom disabled function
      if (disabled && disabled(date)) return true;

      return false;
    },
    [minDate, maxDate, disabled]
  );

  const leftDisabled = minDate && (isSameDay(selected, minDate) ? true : false);
  const rightDisabled =
    maxDate && (isSameDay(selected, maxDate) ? true : false);

  if (!selected || !isValid(selected)) return null;

  return (
    <Popover>
      {showAssistant === true ? (
        <ButtonGroup className='w-fit'>
          <Button
            disabled={leftDisabled}
            onClick={() => {
              onSelect(subDays(new Date(selected), 1));
            }}
            size={'toolbar'}
            variant={'outline'}
            className='bg-muted text-muted-foreground'
          >
            <ChevronLeft className='size-4' />
          </Button>

          <PopoverTrigger asChild>
            <Button
              size={'toolbar'}
              variant={'outline'}
              className={cn(
                'active:scale-100',
                !selected && 'text-muted-foreground',
                className
              )}
            >
              {!disableIcon && <CalendarIcon className='size-4' />}
              {selected ? (
                <span className='inline'>
                  {format(selected, displayFormat)}
                </span>
              ) : (
                <span className='inline'>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <Button
            disabled={rightDisabled}
            className='bg-muted text-muted-foreground'
            onClick={() => {
              onSelect(addDays(new Date(selected), 1));
            }}
            size={'toolbar'}
            variant={'outline'}
          >
            <ChevronRight className='size-4' />
          </Button>
        </ButtonGroup>
      ) : (
        <PopoverTrigger asChild>
          <Button
            size={toolbar ? 'toolbar' : size}
            variant={toolbar ? 'ghost' : 'outline'}
            className={cn(
              'min-w-[140px] max-w-fit  active:scale-100',
              !selected && 'text-muted-foreground',
              toolbar && 'border ',
              className
            )}
          >
            {!disableIcon && <CalendarIcon className='size-4' />}
            {selected ? (
              <span className='inline'>{format(selected, displayFormat)}</span>
            ) : (
              <span className='inline'>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
      )}

      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={selected}
          onSelect={(date) => {
            if (!date) return;
            onSelect(date);
          }}
          disabled={isDisabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default SingleDatePicker;
