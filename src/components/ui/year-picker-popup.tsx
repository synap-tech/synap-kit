import { addYears, format, subYears } from 'date-fns';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { ButtonGroup } from './button-group';
import { YearPicker } from './year-picker';

export default function YearPickerPopover({
  date,
  setDate,
  maxDate,
  minDate,
  className,
  displayFormat = 'yyyy',
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
              setDate(subYears(date, 1));
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
              {date ? format(date, displayFormat) : <span>Pick a year</span>}
            </Button>
          </PopoverTrigger>
          <Button
            // disabled={maxDate && date > maxDate}
            className='bg-muted text-muted-foreground'
            onClick={() => {
              setDate(addYears(date, 1));
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
            {date ? format(date, displayFormat) : <span>Pick a year</span>}
          </Button>
        </PopoverTrigger>
      )}
      <PopoverContent className='w-auto p-0'>
        <YearPicker
          className='z-50'
          onYearSelect={setDate}
          selectedYear={date}
          maxDate={maxDate || new Date()}
          minDate={minDate || undefined}
        />
      </PopoverContent>
    </Popover>
  );
}
