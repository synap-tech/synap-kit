import { addMonths, format, subMonths } from 'date-fns';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { ButtonGroup } from './button-group';
import { MonthPicker } from './month-picker';

export default function MonthPickerPopover({
  date,
  setDate,
  minDate,
  maxDate,
  className,
  displayFormat = 'MMM yyyy',
  showAssistant = false,
  disableIcon = false,
}: {
  date: Date;
  setDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  displayFormat?: string;
  showAssistant?: boolean;
  disableIcon?: boolean;
}) {
  return (
    <Popover>
      {showAssistant === true ? (
        <ButtonGroup className='w-fit'>
          <Button
            onClick={() => {
              setDate(subMonths(date, 1));
            }}
            size={'toolbar'}
            variant={'ghost'}
            className='bg-muted text-muted-foreground'
          >
            <ChevronLeft className='size-4' />
          </Button>

          <PopoverTrigger asChild>
            <Button
              size={'toolbar'}
              variant={'ghost'}
              className={cn(
                'active:scale-100',
                !date && 'text-muted-foreground',
                className
              )}
            >
              {!disableIcon && <CalendarIcon className='size-4' />}
              {date ? format(date, displayFormat) : <span>Pick a month</span>}
            </Button>
          </PopoverTrigger>
          <Button
            // disabled={maxDate && date > maxDate}
            className='bg-muted text-muted-foreground'
            onClick={() => {
              setDate(addMonths(date, 1));
            }}
            size={'toolbar'}
            variant={'ghost'}
          >
            <ChevronRight className='size-4' />
          </Button>
        </ButtonGroup>
      ) : (
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              className
            )}
          >
            {!disableIcon && <CalendarIcon className='size-4' />}
            {date ? format(date, displayFormat) : <span>Pick a month</span>}
          </Button>
        </PopoverTrigger>
      )}

      <PopoverContent className='w-auto p-0'>
        <MonthPicker
          className='z-50'
          onMonthSelect={(date) => {
            setDate(date);
            console.log({ date });
          }}
          selectedMonth={date}
          maxDate={maxDate || new Date()}
          minDate={minDate || undefined}
        />
      </PopoverContent>
    </Popover>
  );
}
