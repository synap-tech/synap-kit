import { buttonVariants } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';

import { cn } from '@/lib/utils';

import FormItemWrapper from './form-item-wrapper';
import type { FormJoinInputUnitProps } from './types';

const FormJoinInputUnit: React.FC<FormJoinInputUnitProps> = ({
  field,
  label,
  subLabel,
  placeholder = 'Write here',
  optional = false,
  type,
  className = 'border-0 w-8 bg-transparent',
  icon,
  unit,
  disableLabel,
  disabled = false,
  required,
  info,
}) => {
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
      <div className='bg-input/30 flex h-9 items-center  rounded border border-border p-0.5'>
        <FormControl className='h-full flex-1'>
          {type === 'password' ? (
            <PasswordInput
              className={cn(inputClass, className)}
              placeholder={placeholder}
              icon={icon}
              disabled={disabled}
              {...field}
            />
          ) : type === 'number' ? (
            <Input
              className={cn(inputClass, className)}
              placeholder={placeholder}
              icon={icon}
              disabled={disabled}
              {...field}
              value={
                field.value === null || field.value === ''
                  ? ''
                  : Number(field.value)
              }
              onChange={(e) => {
                field.onChange(Number(e.target.value));
              }}
              onBlur={(e) => {
                field.onChange(Number(e.target.value));
              }}
            />
          ) : (
            <Input
              className={cn(inputClass, className)}
              placeholder={placeholder}
              type={type}
              icon={icon}
              disabled={disabled}
              {...field}
            />
          )}
        </FormControl>

        <span
          className={buttonVariants({
            variant: 'default',
            className:
              '!h-8 max-w-[100px] justify-between truncate rounded capitalize',
          })}
        >
          {unit}
        </span>
      </div>
    </FormItemWrapper>
  );
};

export default FormJoinInputUnit;
