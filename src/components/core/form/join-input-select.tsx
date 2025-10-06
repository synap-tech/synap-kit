import { useFormContext } from 'react-hook-form';

import { buttonVariants } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form';
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

import FormItemWrapper from './form-item-wrapper';
import type { FormJoinInputSelectProps } from './types';

const FormJoinInputSelect: React.FC<FormJoinInputSelectProps> = ({
  field,
  label,
  subLabel,
  placeholder = 'Select',
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

  const inputClass = `rounded-r-none focus:outline-none focus-visible:ring-0`;

  return (
    <FormItemWrapper
      label={label}
      subLabel={subLabel}
      disableLabel={disableLabel}
      info={info}
      optional={optional}
      required={required}
    >
      <div className='bg-base flex h-9 items-center overflow-hidden rounded-toolbar border border-border p-0.5'>
        <FormControl className='h-8 flex-1'>
          {type === 'password' ? (
            <PasswordInput
              className={cn(inputClass, className)}
              placeholder={placeholder}
              icon={icon}
              {...field}
            />
          ) : type === 'number' ? (
            <Input
              className={cn(inputClass, className)}
              placeholder={placeholder}
              icon={icon}
              {...field}
              onBlur={(e) => {
                field.onChange(+e.target.value);
              }}
            />
          ) : (
            <Input
              className={cn(inputClass, className)}
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
                  'h-8 rounded-toolbar max-w-[100px] justify-between truncate  capitalize transition-none active:scale-100',
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
    </FormItemWrapper>
  );
};

export default FormJoinInputSelect;
