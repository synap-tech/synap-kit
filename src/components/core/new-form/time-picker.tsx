import { useState } from 'react';

import { formatDate } from '@/utils/formatDate';
import { format } from 'date-fns';
import { Clock8 } from 'lucide-react';
import { useController } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import { cn } from '@/lib/utils';

import DeleteButton from './_helper/delete-button';
import { FormBase } from './_helper/form-base';
import type { FormDatePicker } from './types';

const FormTimePicker: FormDatePicker = ({
  calendarProps,
  className,
  disabled,
  control,
  displayFormat = 'hh:mm aa',

  ...props
}) => {
  const [open, setOpen] = useState(false);

  const { field } = useController({ name: props.name, control });

  function handleTimeChange(type: 'hour' | 'minute' | 'ampm', value: string) {
    const currentDate = field.value || new Date();
    const newDate = new Date(currentDate);

    newDate.setSeconds(0);

    if (type === 'hour') {
      const hour = parseInt(value, 10);
      newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
    } else if (type === 'minute') {
      newDate.setMinutes(parseInt(value, 10));
    } else if (type === 'ampm') {
      const hours = newDate.getHours();
      if (value === 'AM' && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (value === 'PM' && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }

    field.onChange(formatDate(newDate));
  }

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
                  <span>hh:mm aa</span>
                )}

                <Clock8 className='size-4 opacity-50' />
              </Button>
            </PopoverTrigger>
            {field.value && <DeleteButton onClick={() => field.onChange('')} />}
          </ButtonGroup>

          <PopoverContent className='w-auto p-0' align='start'>
            <div className='sm:flex'>
              <div className='flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0'>
                <ScrollArea className='w-64 sm:w-auto'>
                  <div className='flex p-2 sm:flex-col'>
                    {Array.from({ length: 12 }, (_, i) => i + 1)
                      .reverse()
                      .map((hour) => (
                        <Button
                          key={hour}
                          size='icon'
                          variant={
                            field.value &&
                            new Date(field.value).getHours() % 12 === hour % 12
                              ? 'default'
                              : 'ghost'
                          }
                          className='aspect-square shrink-0 sm:w-full'
                          onClick={() =>
                            handleTimeChange('hour', hour.toString())
                          }
                        >
                          {hour}
                        </Button>
                      ))}
                  </div>
                  <ScrollBar orientation='horizontal' className='sm:hidden' />
                </ScrollArea>
                <ScrollArea className='w-64 sm:w-auto'>
                  <div className='flex p-2 sm:flex-col'>
                    {Array.from({ length: 12 }, (_, i) => i * 5).map(
                      (minute) => (
                        <Button
                          key={minute}
                          size='icon'
                          variant={
                            field.value &&
                            new Date(field.value).getMinutes() === minute
                              ? 'default'
                              : 'ghost'
                          }
                          className='aspect-square shrink-0 sm:w-full'
                          onClick={() =>
                            handleTimeChange('minute', minute.toString())
                          }
                        >
                          {minute.toString().padStart(2, '0')}
                        </Button>
                      )
                    )}
                  </div>
                  <ScrollBar orientation='horizontal' className='sm:hidden' />
                </ScrollArea>
                <ScrollArea className=''>
                  <div className='flex p-2 sm:flex-col'>
                    {['AM', 'PM'].map((ampm) => (
                      <Button
                        key={ampm}
                        size='icon'
                        variant={
                          field.value &&
                          ((ampm === 'AM' &&
                            new Date(field.value).getHours() < 12) ||
                            (ampm === 'PM' &&
                              new Date(field.value).getHours() >= 12))
                            ? 'default'
                            : 'ghost'
                        }
                        className='aspect-square shrink-0 sm:w-full'
                        onClick={() => handleTimeChange('ampm', ampm)}
                      >
                        {ampm}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </FormBase>
  );
};

export default FormTimePicker;
