import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { MonthPicker } from './month-picker';

export default function MonthPickerPopover({
  date,
  setDate,
  minDate,
  maxDate,
  className,
  displayFormat = 'MMM yyyy',
}: {
  date: Date;
  setDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  displayFormat?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, displayFormat) : <span>Pick a month</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <MonthPicker
          className='z-50'
          onMonthSelect={setDate}
          selectedMonth={date}
          maxDate={maxDate || new Date()}
          minDate={minDate || undefined}
        />
      </PopoverContent>
    </Popover>
  );
}
