import { useState } from 'react';

import { formatDate } from '@/utils/formatDate';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

import DeleteButton from './_helper/delete-button';
import { FormBase } from './_helper/form-base';
import type { FormDatePicker } from './types';

const FormDatePicker: FormDatePicker = ({
  calendarProps,
  className,
  disabled,
  displayFormat = 'PPP',
  ...props
}) => {
  const [open, setOpen] = useState(false);

  return (
    <FormBase {...props}>
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
                  <span>Pick a date</span>
                )}

                <CalendarIcon className='size-4 opacity-50' />
              </Button>
            </PopoverTrigger>
            {field.value && (
              <DeleteButton
                disabled={disabled}
                onClick={() => field.onChange('')}
              />
            )}
          </ButtonGroup>

          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              endMonth={new Date(2040, 11)}
              {...calendarProps}
              captionLayout={'dropdown'}
              mode='single'
              selected={field.value ? new Date(field.value) : new Date()}
              onSelect={(selected, triggerDate) => {
                console.log({ selected });
                if (!disabled) {
                  field.onChange(formatDate(triggerDate as Date));
                  setOpen(false);
                }
              }}
              onMonthChange={(date) => {
                if (!disabled) {
                  field.onChange(formatDate(date as Date));
                }
              }}
              month={field.value ? new Date(field.value) : undefined}
            />
          </PopoverContent>
        </Popover>
      )}
    </FormBase>
  );
};

export default FormDatePicker;
