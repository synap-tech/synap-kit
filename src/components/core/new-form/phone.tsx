import { useFormContext } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';

import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

import { FormBase } from './_helper/form-base';
import type { FormPhone } from './types';

const FormPhone: FormPhone = ({
  fieldProps,
  disabled,
  className,
  ...props
}) => {
  const { register } = useFormContext();
  const registerWithMask = useHookFormMask(register);

  const mask = '99999-999999';
  const maskOptions = {
    placeholder: 'X',
    autoUnmask: true,
  };

  return (
    <FormBase {...props}>
      {(field) => (
        <Input
          {...field}
          {...fieldProps}
          type='text'
          disabled={disabled}
          className={cn(className, 'min-w-28')}
          {...registerWithMask(field.name, mask, {
            required: true,
            ...maskOptions,
          })}
        />
      )}
    </FormBase>
  );
};

export default FormPhone;
