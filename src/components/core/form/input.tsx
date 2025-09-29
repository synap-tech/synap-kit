import { FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';

import { cn } from '@/lib/utils';

import CormFormLabel from './label';
import { type FormInputProps } from './types';

const FormInput: React.FC<FormInputProps> = ({
  field,
  label,
  subLabel,
  placeholder = 'Write here',
  optional = false,
  type,
  className,
  icon,
  disabled = false,
  disableLabel,
  required,
  info,
}) => {
  return (
    <FormItem className='w-full space-y-1.5 '>
      {!disableLabel && (
        <CormFormLabel
          label={label}
          subLabel={subLabel}
          optional={optional}
          required={required}
          info={info}
        />
      )}

      <FormControl>
        {type === 'password' ? (
          <PasswordInput
            className={cn(className)}
            placeholder={placeholder}
            icon={icon}
            disabled={disabled}
            {...field}
            value={field.value === null ? '' : field.value}
          />
        ) : type === 'number' ? (
          <Input
            className={cn(className, 'min-w-28')}
            placeholder={placeholder}
            icon={icon}
            {...field}
            value={field.value === null ? '' : field.value}
            onBlur={(e) => {
              field.onChange(+e.target.value);
            }}
          />
        ) : (
          <Input
            className={cn(className, 'min-w-48')}
            placeholder={placeholder}
            type={type}
            icon={icon}
            disabled={disabled}
            {...field}
            value={field.value === null ? '' : field.value}
          />
        )}
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default FormInput;
