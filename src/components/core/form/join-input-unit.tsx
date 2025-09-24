import { buttonVariants } from '@/components/ui/button';
import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';

import { cn } from '@/lib/utils';

import CormFormLabel from './label';
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
              disabled={disabled}
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
              disabled={disabled}
            />
          ) : (
            <Input
              className={cn(className)}
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
            variant: 'accent',
            className:
              'h-8 max-w-[100px] justify-between truncate rounded bg-gradient-to-r from-accent to-accent capitalize',
          })}
        >
          {unit}
        </span>
      </div>
      <FormMessage />
    </FormItem>
  );
};

export default FormJoinInputUnit;
