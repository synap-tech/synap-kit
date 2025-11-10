import { useState } from 'react';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { MonthPicker } from '@/components/ui/month-picker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

import DeleteButton from './_helper/delete-button';
import { FormBase } from './_helper/form-base';
import type { FormMonthPicker } from './types';

const FormMonthPicker: FormMonthPicker = ({
  calendarProps,
  className,
  disabled,
  control,
  displayFormat = 'MMM yyyy',
  minDate,
  maxDate,
  defaultMonth = new Date(),
  ...props
}) => {
  const [open, setOpen] = useState(false);

  return (
    <FormBase control={control} {...props}>
      {(field) => (
        <Popover open={open} onOpenChange={setOpen}>
          <ButtonGroup className='w-full'>
            <PopoverTrigger asChild>
              <Button
                type='button'
                variant={'form'}
                className={cn(
                  'h-9 bg-input/30 flex-1 text-left font-normal transition-none active:scale-100 justify-between',
                  !field.value && 'text-muted-foreground',
                  className
                )}
                disabled={disabled} // Disable the button when the field is disabled
              >
                {field.value ? (
                  format(new Date(field.value), displayFormat)
                ) : (
                  <span>Pick a month</span>
                )}

                <CalendarIcon className='size-4 opacity-50' />
              </Button>
            </PopoverTrigger>
            {field.value && <DeleteButton onClick={() => field.onChange('')} />}
          </ButtonGroup>

          <PopoverContent className='w-auto p-0' align='start'>
            <MonthPicker
              className='z-50'
              onMonthSelect={(date) => {
                field.onChange(format(date, 'yyyy-MM-dd HH:mm:ss'));
                setOpen(false);
              }}
              selectedMonth={
                field.value
                  ? format(new Date(field.value), 'yyyy-MM-dd HH:mm:ss')
                  : format(new Date(defaultMonth), 'yyyy-MM-dd HH:mm:ss')
              }
              maxDate={maxDate || undefined}
              minDate={minDate || undefined}
            />
          </PopoverContent>
        </Popover>
      )}
    </FormBase>
  );
};

export default FormMonthPicker;
