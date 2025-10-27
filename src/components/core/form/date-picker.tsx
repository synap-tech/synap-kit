import { useState } from 'react';

import { formatDate } from '@/utils/formatDate';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

import FormItemWrapper from './form-item-wrapper';
import type { FormDatePickerProps } from './types';

const FormDatePicker: React.FC<FormDatePickerProps> = ({
  field,
  label,
  subLabel,
  optional = false,
  className,
  disableLabel,
  calendarProps,
  disabled = false,
  required,
  info,
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
                'h-9 bg-input/30 w-full text-left font-normal transition-none active:scale-100 rounded relative',
                !field.value && 'text-muted-foreground',
                className
              )}
              disabled={disabled} // Disable the button when the field is disabled
            >
              {field.value ? (
                format(new Date(field.value), 'PPP')
              ) : (
                <span>Pick a date</span>
              )}

              {field.value ? (
                <X
                  className='ml-auto size-4  text-destructive'
                  onClick={(e) => {
                    e.stopPropagation();
                    field.onChange('');
                  }}
                />
              ) : (
                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
              )}
            </Button>
          </FormControl>
        </PopoverTrigger>
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
    </FormItemWrapper>
  );
};

export default FormDatePicker;
