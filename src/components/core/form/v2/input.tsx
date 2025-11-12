import { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';

import { cn } from '@/lib/utils';

import { FormBase } from './_helper/form-base';
import type { FormInput } from './types';

const FormInput: FormInput = ({
  fieldProps,
  disabled,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormBase {...props}>
      {(field) =>
        fieldProps?.type === 'password' ? (
          <InputGroup>
            <InputGroupInput
              {...field}
              {...fieldProps}
              disabled={disabled}
              className={cn('rounded-l', className)}
              type={showPassword ? 'text' : 'password'}
            />
            <InputGroupAddon align={'inline-end'} className='border-l'>
              <InputGroupButton
                aria-label='Toggle password visibility'
                title='Toggle password visibility'
                size='icon-xs'
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              >
                {showPassword ? (
                  <Eye className='size-4' />
                ) : (
                  <EyeOff className='size-4' />
                )}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        ) : fieldProps?.type === 'number' ? (
          <Input
            {...field}
            {...fieldProps}
            disabled={disabled}
            className={className}
            value={
              field.value === null || field.value === '' || field.value === 0
                ? undefined
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
            {...field}
            {...fieldProps}
            disabled={disabled}
            className={className}
            value={field.value === null ? '' : field.value}
          />
        )
      }
    </FormBase>
  );
};

export default FormInput;
