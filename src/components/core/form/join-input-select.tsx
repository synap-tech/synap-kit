import { useFormContext } from 'react-hook-form';

import { buttonVariants } from '@/components/ui/button';
import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';

import CormFormLabel from './label';
import type { FormJoinInputSelectProps } from './types';

const FormJoinInputSelect: React.FC<FormJoinInputSelectProps> = ({
  field,
  label,
  subLabel,
  placeholder = 'Write here',
  optional = false,
  type,
  className = 'border-0 w-8 bg-transparent',
  icon,
  selectField,
  disableLabel,
  required,
  info,
}) => {
  const { register, getValues, setValue } = useFormContext();

  return (
    <FormItem className='w-full space-y-1.5'>
      {!disableLabel && (
        <CormFormLabel
          label={label}
          subLabel={subLabel}
          optional={optional}
          required={required}
          info={info}
        />
      )}
      <div className='bg-base flex h-10 items-center overflow-hidden rounded-md border border-input p-0.5'>
        <FormControl className='h-8 flex-1'>
          {type === 'password' ? (
            <PasswordInput
              className={cn(className)}
              placeholder={placeholder}
              icon={icon}
              {...field}
            />
          ) : type === 'number' ? (
            <Input
              className={cn(className)}
              placeholder={placeholder}
              icon={icon}
              {...field}
              onBlur={(e) => {
                field.onChange(+e.target.value);
              }}
            />
          ) : (
            <Input
              className={cn(className)}
              placeholder={placeholder}
              type={type}
              icon={icon}
              {...field}
            />
          )}
        </FormControl>

        <Select
          onValueChange={(value) => {
            setValue(selectField.name, value, {
              shouldDirty: true,
            });
          }}
          defaultValue={getValues(selectField.name)}
          disabled={selectField?.isDisabled}
          {...register(selectField.name)}
        >
          <FormControl>
            <SelectTrigger
              className={buttonVariants({
                variant: 'accent',
                className:
                  'h-8 max-w-[100px] justify-between truncate rounded bg-base capitalize transition-none active:scale-100',
              })}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {selectField?.options?.map((option) => (
              <SelectItem
                className='capitalize'
                key={option.value}
                value={option.value.toString()}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <FormMessage />
    </FormItem>
  );
};

export default FormJoinInputSelect;
