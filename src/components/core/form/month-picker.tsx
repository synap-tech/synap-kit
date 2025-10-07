import { useState } from 'react';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form';
import { MonthPicker } from '@/components/ui/month-picker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

import FormItemWrapper from './form-item-wrapper';
import type { FormMonthPickerProps } from './types';

const FormMonthPicker: React.FC<FormMonthPickerProps> = ({
  field,
  label,
  subLabel,
  optional = false,
  className,
  disableLabel,
  disabled = false,
  required,
  info,
  minDate,
  maxDate,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <FormItemWrapper
      label={label}
      disableLabel={disableLabel}
      subLabel={subLabel}
      optional={optional}
      required={required}
      info={info}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              type='button'
              variant={'form'}
              className={cn(
                'h-9 bg-input rounded-md w-full text-left font-normal transition-none active:scale-100',
                !field.value && 'text-muted-foreground',
                className
              )}
              disabled={disabled}
            >
              {field.value ? (
                format(field.value, 'MMM yyyy')
              ) : (
                <span>Pick a month</span>
              )}
              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0 '>
          <MonthPicker
            className='z-50'
            onMonthSelect={(date) => {
              field.onChange(format(date, 'yyyy-MM-dd HH:mm:ss'));
              setOpen(false);
            }}
            selectedMonth={
              field.value
                ? format(new Date(field.value), 'yyyy-MM-dd HH:mm:ss')
                : format(new Date(), 'yyyy-MM-dd HH:mm:ss')
            }
            maxDate={maxDate || new Date()}
            minDate={minDate || undefined}
          />
        </PopoverContent>
      </Popover>
    </FormItemWrapper>
  );
};

export default FormMonthPicker;
